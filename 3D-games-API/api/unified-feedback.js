/**
 * 统一反馈API - 支持评论和评分合并表方案
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
import express from 'express';

const router = express.Router();
const sql = neon(process.env.DATABASE_URL);

// JWT 密钥配置
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 获取项目前缀，用于表名区分
const PROJECT_PREFIX = process.env.PROJECT_PREFIX || '3d_games';
console.log(`[统一反馈API] 使用项目前缀: ${PROJECT_PREFIX}`);

// 辅助函数：安全引用表名（处理以数字开头的表名）
const getTableName = (prefix) => `"${prefix}_feedback"`;

// --- 项目验证中间件 ---
async function validateProject(projectId) {
  try {
    const project = await sql`
      SELECT id, is_active FROM game_projects 
      WHERE project_id = ${projectId}
    `;
    
    if (project.length === 0) {
      throw new Error(`项目 "${projectId}" 未注册`);
    }
    
    if (!project[0].is_active) {
      throw new Error(`项目 "${projectId}" 已被停用`);
    }
    
    return project[0];
  } catch (error) {
    // 如果项目注册表不存在，说明还没有升级数据库，允许继续使用
    if (error.message.includes('relation "game_projects" does not exist')) {
      console.log(`[项目验证] 项目注册表不存在，跳过验证 (项目: ${projectId})`);
      return { id: null, is_active: true };
    }
    throw error;
  }
}

// --- 管理员权限验证中间件 ---
async function validateAdminPermission(adminId, projectId) {
  try {
    const admin = await sql`
      SELECT gau.id, gau.username, gp.is_active as project_active
      FROM game_admins_users gau
      LEFT JOIN game_projects gp ON gau.project_id = gp.project_id
      WHERE gau.id = ${adminId} AND gau.project_id = ${projectId}
    `;
    
    if (admin.length === 0) {
      throw new Error('管理员无权限访问此项目');
    }
    
    // 如果项目注册表存在且项目被停用
    if (admin[0].project_active === false) {
      throw new Error('项目已被停用，无法操作');
    }
    
    return admin[0];
  } catch (error) {
    // 如果项目注册表不存在，只检查管理员是否存在
    if (error.message.includes('relation "game_projects" does not exist')) {
      const admin = await sql`
        SELECT id, username FROM game_admins_users 
        WHERE id = ${adminId} AND project_id = ${projectId}
      `;
      
      if (admin.length === 0) {
        throw new Error('管理员无权限访问此项目');
      }
      
      return { ...admin[0], project_active: true };
    }
    throw error;
  }
}

// --- 管理员账户初始化函数 ---
const initializeAdmin = async () => {
  try {
    // 检查是否存在 game_projects 表和外键约束
    const hasProjectsTable = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_name = 'game_projects'
    `;
    
    // 如果存在 game_projects 表，先注册项目
    if (hasProjectsTable.length > 0) {
      try {
        await sql`
          INSERT INTO game_projects (project_id, project_name, project_type, feedback_table_name, description)
          VALUES (${PROJECT_PREFIX}, ${PROJECT_PREFIX}, 'game_review', ${PROJECT_PREFIX + '_feedback'}, '3D Games project')
          ON CONFLICT (project_id) DO UPDATE SET
            project_name = EXCLUDED.project_name,
            description = EXCLUDED.description,
            updated_at = CURRENT_TIMESTAMP,
            is_active = true
        `;
        console.log(`[项目注册] 项目 ${PROJECT_PREFIX} 已注册到 game_projects`);
      } catch (error) {
        // 忽略重复注册错误
        if (!error.message.includes('duplicate key')) {
          console.log(`[项目注册] 注册项目时出错: ${error.message}`);
        }
      }
    }
    
    const existingAdmin = await sql`
      SELECT id FROM game_admins_users WHERE username = 'admin' AND project_id = ${PROJECT_PREFIX}
    `;
    
    if (existingAdmin.length === 0) {
      const initialPassword = 'admin123';
      console.log(`[管理员初始化] 为项目 ${PROJECT_PREFIX} 创建默认管理员账户`);
      
      const hashedPassword = await bcrypt.hash(initialPassword, 10);
      
      await sql`
        INSERT INTO game_admins_users (username, password, role, project_id)
        VALUES ('admin', ${hashedPassword}, 'admin', ${PROJECT_PREFIX})
      `;
      
      console.log(`✅ 项目 ${PROJECT_PREFIX} 的默认管理员账户创建成功`);
      console.log(`   用户名: admin`);
      console.log(`   密码: admin123`);
      console.log(`   项目: ${PROJECT_PREFIX}`);
    } else {
      console.log(`ℹ️ 项目 ${PROJECT_PREFIX} 的管理员账户已存在`);
    }
  } catch (error) {
    console.error('初始化管理员账户时出错:', error.message);
    if (error.code === '23503') {
      console.log(`💡 提示: 检测到外键约束错误，请先运行 'npm run init-db' 初始化数据库`);
    }
  }
};

// 启动时初始化管理员账户
initializeAdmin().catch(console.error);

// --- 创建管理员账户 ---
const createAdmin = async (req, res) => {
  try {
    const { username, password, role = 'admin' } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: '用户名和密码是必需的' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: '密码长度至少6位' });
    }

    // 检查用户名是否已存在（在当前项目中）
    const existingAdmin = await sql`
      SELECT id FROM game_admins_users 
      WHERE username = ${username} AND project_id = ${PROJECT_PREFIX}
    `;

    if (existingAdmin.length > 0) {
      return res.status(400).json({ message: '该用户名在当前项目中已存在' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await sql`
      INSERT INTO game_admins_users (username, password, role, project_id)
      VALUES (${username}, ${hashedPassword}, ${role}, ${PROJECT_PREFIX})
      RETURNING id, username, role, project_id, created_at
    `;

    console.log(`[管理员创建] 项目 ${PROJECT_PREFIX} 新增管理员: ${username}`);
    res.status(201).json({
      message: '管理员账户创建成功',
      admin: newAdmin[0]
    });

  } catch (error) {
    console.error('创建管理员账户时出错:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// --- 获取项目管理员列表 ---
const getAdmins = async (req, res) => {
  try {
    const admins = await sql`
      SELECT id, username, role, created_at
      FROM game_admins_users 
      WHERE project_id = ${PROJECT_PREFIX}
      ORDER BY created_at DESC
    `;

    res.json({
      project: PROJECT_PREFIX,
      admins: admins
    });

  } catch (error) {
    console.error('获取管理员列表时出错:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// --- 管理员登录处理函数 ---
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: '请输入用户名和密码' });
    }

    // 验证项目是否有效
    try {
      await validateProject(PROJECT_PREFIX);
    } catch (projectError) {
      console.error(`[管理员登录] 项目验证失败: ${projectError.message}`);
      return res.status(403).json({ message: `项目访问被拒绝: ${projectError.message}` });
    }

    const admin = await sql`
      SELECT id, username, password, role, project_id, created_at
      FROM game_admins_users 
      WHERE username = ${username} AND project_id = ${PROJECT_PREFIX}
    `;

    if (admin.length === 0) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    const adminData = admin[0];
    const isValidPassword = await bcrypt.compare(password, adminData.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: '用户名或密码错误' });
    }

    // 验证管理员权限
    try {
      await validateAdminPermission(adminData.id, PROJECT_PREFIX);
    } catch (permissionError) {
      console.error(`[管理员登录] 权限验证失败: ${permissionError.message}`);
      return res.status(403).json({ message: `权限验证失败: ${permissionError.message}` });
    }

    const token = jwt.sign(
      { 
        id: adminData.id,
        username: adminData.username,
        role: adminData.role,
        project_id: adminData.project_id
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    await sql`
      UPDATE game_admins_users 
      SET last_login_at = CURRENT_TIMESTAMP
      WHERE id = ${adminData.id}
    `;

    console.log(`[管理员登录] 项目 ${PROJECT_PREFIX} 管理员 ${username} 登录成功`);
    res.status(200).json({
      token,
      message: '登录成功',
      user: {
        id: adminData.id,
        username: adminData.username,
        role: adminData.role,
        project_id: adminData.project_id
      }
    });
  } catch (error) {
    console.error('管理员登录出错:', error);
    res.status(500).json({ message: '服务器错误，请稍后重试' });
  }
};

// --- JWT token 验证中间件 ---
export const verifyAdminToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '未提供认证令牌' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 验证项目是否有效
    try {
      await validateProject(PROJECT_PREFIX);
    } catch (projectError) {
      console.error(`[Token验证] 项目验证失败: ${projectError.message}`);
      return res.status(403).json({ message: `项目访问被拒绝: ${projectError.message}` });
    }
    
    const admin = await sql`
      SELECT id, username, role, project_id FROM game_admins_users WHERE id = ${decoded.id} AND project_id = ${PROJECT_PREFIX}
    `;
    
    if (admin.length === 0) {
      return res.status(401).json({ message: '管理员账户不存在或项目不匹配' });
    }

    // 验证管理员权限
    try {
      await validateAdminPermission(admin[0].id, PROJECT_PREFIX);
    } catch (permissionError) {
      console.error(`[Token验证] 权限验证失败: ${permissionError.message}`);
      return res.status(403).json({ message: `权限验证失败: ${permissionError.message}` });
    }

    req.user = {
      id: admin[0].id,
      username: admin[0].username,
      role: admin[0].role,
      project_id: admin[0].project_id
    };
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: '无效的认证令牌' });
    }
    console.error('[Token验证] 验证过程出错:', error);
    return res.status(500).json({ message: '认证验证失败' });
  }
};

// --- 获取所有游戏数据（统一表方案） ---
export const getAllGameData = async (req, res) => {
  try {
    const tableName = getTableName(PROJECT_PREFIX);
    
    // 检查表是否有project_id字段
    const hasProjectIdColumn = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = ${PROJECT_PREFIX + '_feedback'} 
      AND column_name = 'project_id'
    `;

    const projectIdFilter = hasProjectIdColumn.length > 0 ? `AND project_id = '${PROJECT_PREFIX}'` : '';
    
    // 获取所有反馈数据（评论和评分）
    const feedbackData = await sql(`
      SELECT 
        game_address_bar,
        COUNT(*) as total_feedback,
        COUNT(text) as total_comments,
        COUNT(rating) as total_ratings,
        ROUND(AVG(rating), 1) as average_rating,
        COUNT(CASE WHEN rating = 1 THEN 1 END) as rating_1,
        COUNT(CASE WHEN rating = 2 THEN 1 END) as rating_2,
        COUNT(CASE WHEN rating = 3 THEN 1 END) as rating_3,
        COUNT(CASE WHEN rating = 4 THEN 1 END) as rating_4,
        COUNT(CASE WHEN rating = 5 THEN 1 END) as rating_5
      FROM ${tableName}
      WHERE 1=1 ${projectIdFilter}
      GROUP BY game_address_bar
      ORDER BY game_address_bar
    `);

    // 获取所有评论数据
    const comments = await sql(`
      SELECT 
        id,
        game_address_bar,
        name,
        email,
        text,
        rating,
        added_by_admin,
        created_at as timestamp
      FROM ${tableName}
      WHERE text IS NOT NULL ${projectIdFilter}
      ORDER BY created_at DESC
    `);

    // 按游戏组织数据
    const result = {};
    
    // 处理有反馈数据的游戏
    feedbackData.forEach(feedback => {
      result[feedback.game_address_bar] = {
        ratings: {
          '1': feedback.rating_1 || 0,
          '2': feedback.rating_2 || 0,
          '3': feedback.rating_3 || 0,
          '4': feedback.rating_4 || 0,
          '5': feedback.rating_5 || 0
        },
        comments: comments.filter(comment => comment.game_address_bar === feedback.game_address_bar)
      };
    });

    // 处理只有评论没有评分的游戏
    comments.forEach(comment => {
      if (!result[comment.game_address_bar]) {
        result[comment.game_address_bar] = {
          ratings: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
          comments: comments.filter(c => c.game_address_bar === comment.game_address_bar)
        };
      }
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('[管理员] 获取所有游戏数据出错:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// --- 删除反馈 ---
export const deleteFeedback = async (req, res) => {
  try {
    const { pageId, feedbackId } = req.params;
    
    console.log(`[管理员] 收到删除反馈请求 - pageId: ${pageId}, feedbackId: ${feedbackId}`);

    const tableName = getTableName(PROJECT_PREFIX);
    
    const feedback = await sql(`
      SELECT id FROM ${tableName}
      WHERE id = ${feedbackId} AND game_address_bar = '${pageId}'
    `);

    if (feedback.length === 0) {
      console.log(`[管理员] 未找到要删除的反馈 - pageId: ${pageId}, feedbackId: ${feedbackId}`);
      return res.status(404).json({ message: '未找到指定 ID 的反馈' });
    }

    await sql(`
      DELETE FROM ${tableName}
      WHERE id = ${feedbackId} AND game_address_bar = '${pageId}'
    `);

    console.log(`[管理员] 反馈删除成功 - pageId: ${pageId}, feedbackId: ${feedbackId}`);
    res.status(200).json({ message: '反馈删除成功' });

  } catch (error) {
    console.error('删除反馈出错:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// --- 手动添加反馈 ---
const addManualFeedback = async (req, res) => {
  const { pageId, name, text, email, rating, timestamp } = req.body;

  // 输入验证
  const hasName = name && name.trim().length > 0;
  const hasText = text && text.trim().length > 0;
  const hasRating = rating !== null && rating !== undefined && rating > 0;
  
  if (!hasName || (!hasText && !hasRating)) {
    return res.status(400).json({ message: '姓名和至少一个反馈内容（评论或评分）是必需的' });
  }

  if (text && text.trim().length > 1000) {
    return res.status(400).json({ message: '评论内容长度不能超过 1000 个字符' });
  }

  if (rating && (rating < 1 || rating > 5)) {
    return res.status(400).json({ message: '评分必须是1-5之间的整数' });
  }

  if (email && (!email.includes('@') || email.trim().length > 254)) {
    return res.status(400).json({ message: '请提供有效的邮箱地址' });
  }

  // 时间戳处理
  let finalTimestamp = new Date().toISOString();
  if (timestamp) {
    if (typeof timestamp === 'string' && !isNaN(Date.parse(timestamp))) {
      try {
        finalTimestamp = new Date(timestamp).toISOString();
      } catch (dateError) {
        return res.status(400).json({ 
          message: '时间戳格式无效。请使用 ISO 8601 格式' 
        });
      }
    } else {
      return res.status(400).json({ 
        message: '时间戳格式无效。请使用 ISO 8601 格式' 
      });
    }
  }

  try {
    const tableName = getTableName(PROJECT_PREFIX);
    const newFeedback = await sql(`
      INSERT INTO ${tableName} (game_address_bar, name, email, text, rating, added_by_admin, created_at)
      VALUES ('${pageId}', '${name.trim()}', ${email?.trim() ? `'${email.trim()}'` : 'NULL'}, ${text?.trim() ? `'${text.trim()}'` : 'NULL'}, ${rating || 'NULL'}, TRUE, '${finalTimestamp}')
      RETURNING id, name, email, text, rating, added_by_admin, created_at as timestamp
    `);

    console.log(`[API][管理员路由] 管理员手动添加反馈 - pageId: ${pageId} (时间戳: ${finalTimestamp}) - 用户: ${req.user?.username || '未知管理员'}`);
    res.status(201).json(newFeedback[0]);
  } catch (error) {
    console.error(`[API][管理员路由] 手动保存反馈时出错 - pageId: ${pageId}:`, error);
    res.status(500).json({ message: '手动保存反馈时发生内部服务器错误' });
  }
};

// --- 更新反馈 ---
const updateFeedback = async (req, res) => {
  const { pageId, feedbackId } = req.params;
  const { name, text, email, rating, timestamp } = req.body;

  // 输入验证
  const hasName = name && name.trim().length > 0;
  const hasText = text && text.trim().length > 0;
  const hasRating = rating !== null && rating !== undefined && rating > 0;
  
  if (!hasName || (!hasText && !hasRating)) {
    return res.status(400).json({ message: '姓名和至少一个反馈内容（评论或评分）是必需的' });
  }

  // 处理时间戳
  let finalTimestamp = new Date().toISOString();
  if (timestamp && timestamp.trim()) {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ 
          message: '时间戳格式无效。请使用 ISO 8601 格式' 
        });
      }
      finalTimestamp = date.toISOString();
    } catch (dateError) {
      return res.status(400).json({ 
        message: '时间戳格式无效。请使用 ISO 8601 格式' 
      });
    }
  }

  try {
    const tableName = getTableName(PROJECT_PREFIX);
    
    // 检查反馈是否存在
    const existingFeedback = await sql(`
      SELECT id FROM ${tableName}
      WHERE id = ${feedbackId} AND game_address_bar = '${pageId}'
    `);

    if (existingFeedback.length === 0) {
      return res.status(404).json({ message: '未找到指定 ID 的反馈' });
    }

    // 更新反馈
    const updatedFeedback = await sql(`
      UPDATE ${tableName}
      SET 
        name = '${name.trim()}',
        email = ${email?.trim() ? `'${email.trim()}'` : 'NULL'},
        text = ${text?.trim() ? `'${text.trim()}'` : 'NULL'},
        rating = ${rating || 'NULL'},
        created_at = '${finalTimestamp}'
      WHERE id = ${feedbackId} AND game_address_bar = '${pageId}'
      RETURNING id, name, email, text, rating, added_by_admin, created_at as timestamp
    `);

    console.log(`[API][管理员路由] 管理员更新反馈 - pageId: ${pageId}, feedbackId: ${feedbackId} (时间戳: ${finalTimestamp}) - 用户: ${req.user?.username || '未知管理员'}`);
    res.json(updatedFeedback[0]);

  } catch (error) {
    console.error('更新反馈出错:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// --- 更新评分统计 ---
export const updateRatingsByPageId = async (req, res) => {
  const { pageId } = req.params;
  const newCounts = req.body;

  if (!pageId || typeof pageId !== 'string') {
    return res.status(400).json({ message: '需要有效的 pageId 路径参数' });
  }

  // 验证 newCounts 格式和值
  const validatedCounts = {};
  let validationError = null;
  
  for (let i = 1; i <= 5; i++) {
    const key = String(i);
    const count = newCounts[key];
    if (count === undefined || count === null || typeof count !== 'number' || !Number.isInteger(count) || count < 0) {
      validationError = `评分数量 '${key}' 必须是非负整数。收到: ${count}`;
      break;
    }
    validatedCounts[key] = count;
  }

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const tableName = getTableName(PROJECT_PREFIX);
    
    // 开始事务
    await sql.begin(async sql => {
      // 删除现有评分
      await sql(`DELETE FROM ${tableName} WHERE game_address_bar = '${pageId}' AND rating IS NOT NULL`);
      
      // 插入新的评分数据
      for (let rating = 1; rating <= 5; rating++) {
        const count = validatedCounts[String(rating)];
        if (count > 0) {
          for (let i = 0; i < count; i++) {
            await sql(`
              INSERT INTO ${tableName} (game_address_bar, name, rating, added_by_admin)
              VALUES ('${pageId}', '系统评分', ${rating}, TRUE)
            `);
          }
        }
      }
    });

    // 获取更新后的统计
    const stats = await sql(`
      SELECT 
        COALESCE(COUNT(rating), 0) as count,
        COALESCE(ROUND(AVG(rating)::numeric, 1), 0) as average,
        COALESCE(COUNT(CASE WHEN rating = 1 THEN 1 END), 0) as rating_1,
        COALESCE(COUNT(CASE WHEN rating = 2 THEN 1 END), 0) as rating_2,
        COALESCE(COUNT(CASE WHEN rating = 3 THEN 1 END), 0) as rating_3,
        COALESCE(COUNT(CASE WHEN rating = 4 THEN 1 END), 0) as rating_4,
        COALESCE(COUNT(CASE WHEN rating = 5 THEN 1 END), 0) as rating_5
      FROM ${tableName}
      WHERE game_address_bar = '${pageId}' AND rating IS NOT NULL
    `);

    const result = stats[0] || { count: 0, average: 0, rating_1: 0, rating_2: 0, rating_3: 0, rating_4: 0, rating_5: 0 };

    console.log(`[API] 管理员更新了游戏 ${pageId} 的评分 - 用户: ${req.user?.username || '未知管理员'}`);
    res.status(200).json({ 
      message: '评分更新成功', 
      ratings: {
        '1': result.rating_1,
        '2': result.rating_2,
        '3': result.rating_3,
        '4': result.rating_4,
        '5': result.rating_5
      }
    });

  } catch (error) {
    console.error(`[API] 更新游戏 ${pageId} 评分时出错:`, error);
    res.status(500).json({ message: '更新评分时发生内部服务器错误' });
  }
};

// --- 定义路由 ---
// 公开路由
router.post('/login', adminLogin);

// 应用 verifyAdminToken 中间件到所有后续路由
router.use(verifyAdminToken);

// 受保护的路由
router.get('/feedback', getAllGameData); // 获取所有游戏数据
router.delete('/feedback/:pageId/:feedbackId', deleteFeedback);
router.post('/feedback/manual', addManualFeedback);
router.put('/feedback/:pageId/:feedbackId', updateFeedback);
router.put('/ratings/:pageId', updateRatingsByPageId);

// 管理员管理路由
router.get('/admins', getAdmins); // 获取项目管理员列表
router.post('/admins', createAdmin); // 创建新管理员

// 导出路由器
export default router;

