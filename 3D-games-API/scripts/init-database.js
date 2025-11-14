/**
 * 数据库初始化脚本 - 3D Games项目
 * 为新的项目前缀创建必要的数据库表
 */

import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';

const sql = neon(process.env.DATABASE_URL);
const PROJECT_PREFIX = process.env.PROJECT_PREFIX || '3d_games';

async function initializeDatabase() {
  try {
    console.log('🚀 开始初始化数据库...');
    console.log(`📊 项目前缀: ${PROJECT_PREFIX}`);
    
    // 1. 创建反馈表（如果不存在）
    console.log('\n1️⃣ 创建反馈表...');
    
    // 使用双引号包裹表名，避免以数字开头的表名问题
    // PostgreSQL要求以数字开头的标识符必须用双引号包裹
    const tableName = `"${PROJECT_PREFIX}_feedback"`;
    const createFeedbackTableSQL = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        game_address_bar VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100),
        text TEXT,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        added_by_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await sql(createFeedbackTableSQL);
    console.log(`✅ 创建反馈表 ${PROJECT_PREFIX}_feedback`);
    
    // 2. 创建索引（如果不存在）
    console.log('\n2️⃣ 创建索引...');
    
    // 索引名也需要双引号包裹（如果以数字开头）
    const indexName1 = `"idx_${PROJECT_PREFIX}_feedback_game_address_bar"`;
    const indexName2 = `"idx_${PROJECT_PREFIX}_feedback_created_at"`;
    
    await sql(`CREATE INDEX IF NOT EXISTS ${indexName1} ON ${tableName}(game_address_bar)`);
    console.log(`✅ 创建游戏地址索引`);
    
    await sql(`CREATE INDEX IF NOT EXISTS ${indexName2} ON ${tableName}(created_at)`);
    console.log(`✅ 创建时间索引`);
    
    // 3. 检查是否存在 game_projects 表（可能已有其他项目创建）
    console.log('\n3️⃣ 检查项目注册表...');
    
    const projectsTableExists = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_name = 'game_projects'
    `;
    
    let hasProjectRegistration = false;
    if (projectsTableExists.length > 0) {
      hasProjectRegistration = true;
      console.log('ℹ️ 检测到 game_projects 表存在，将注册项目');
      
      // 创建 game_projects 表（如果不存在，虽然应该已存在）
      await sql`
        CREATE TABLE IF NOT EXISTS game_projects (
          id SERIAL PRIMARY KEY,
          project_id VARCHAR(50) NOT NULL UNIQUE,
          project_name VARCHAR(100) NOT NULL,
          project_type VARCHAR(50) DEFAULT 'game_review',
          feedback_table_name VARCHAR(100) NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          is_active BOOLEAN DEFAULT TRUE
        )
      `;
      
      // 注册当前项目
      await sql`
        INSERT INTO game_projects (project_id, project_name, project_type, feedback_table_name, description)
        VALUES (${PROJECT_PREFIX}, ${PROJECT_PREFIX}, 'game_review', ${PROJECT_PREFIX + '_feedback'}, '3D Games project')
        ON CONFLICT (project_id) DO UPDATE SET
          project_name = EXCLUDED.project_name,
          description = EXCLUDED.description,
          updated_at = CURRENT_TIMESTAMP,
          is_active = true
      `;
      console.log(`✅ 项目 ${PROJECT_PREFIX} 已注册到 game_projects`);
    } else {
      console.log('ℹ️ game_projects 表不存在，使用简化模式');
    }
    
    // 4. 创建管理员表（全局共享，如果不存在）
    console.log('\n4️⃣ 创建管理员表...');
    
    // 检查是否有外键约束
    const hasForeignKey = await sql`
      SELECT constraint_name 
      FROM information_schema.table_constraints 
      WHERE table_name = 'game_admins_users' 
      AND constraint_type = 'FOREIGN KEY'
      AND constraint_name = 'fk_admin_project'
    `;
    
    let createAdminTableSQL;
    if (hasForeignKey.length > 0 && hasProjectRegistration) {
      // 如果已有外键约束，需要确保表结构与约束匹配
      createAdminTableSQL = `
        CREATE TABLE IF NOT EXISTS game_admins_users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'admin',
          project_id VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_login_at TIMESTAMP,
          UNIQUE(username, project_id)
        )
      `;
    } else {
      // 如果没有外键约束，创建不带约束的表
      createAdminTableSQL = `
        CREATE TABLE IF NOT EXISTS game_admins_users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(20) DEFAULT 'admin',
          project_id VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          last_login_at TIMESTAMP,
          UNIQUE(username, project_id)
        )
      `;
    }
    
    await sql(createAdminTableSQL);
    console.log('✅ 创建管理员表 game_admins_users (全局共享)');
    
    // 如果存在 game_projects 表但没有外键，创建外键约束
    if (hasProjectRegistration && hasForeignKey.length === 0) {
      try {
        await sql`
          ALTER TABLE game_admins_users
          ADD CONSTRAINT fk_admin_project
          FOREIGN KEY (project_id) REFERENCES game_projects(project_id)
        `;
        console.log('✅ 创建外键约束 fk_admin_project');
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log('ℹ️ 外键约束已存在');
        } else {
          console.log(`⚠️ 创建外键约束失败: ${error.message}`);
        }
      }
    }
    
    // 5. 检查并创建默认管理员账户
    console.log('\n5️⃣ 检查管理员账户...');
    
    const existingAdmin = await sql`
      SELECT id FROM game_admins_users 
      WHERE username = 'admin' AND project_id = ${PROJECT_PREFIX}
    `;
    
    if (existingAdmin.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await sql`
        INSERT INTO game_admins_users (username, password, role, project_id)
        VALUES ('admin', ${hashedPassword}, 'admin', ${PROJECT_PREFIX})
      `;
      console.log(`✅ 创建默认管理员账户 (项目: ${PROJECT_PREFIX})`);
    } else {
      console.log(`ℹ️ 管理员账户已存在 (项目: ${PROJECT_PREFIX})`);
    }
    
    // 6. 验证表结构
    console.log('\n6️⃣ 验证表结构...');
    
    const feedbackTableExists = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_name = ${PROJECT_PREFIX + '_feedback'}
      AND table_schema = 'public'
    `;
    
    const adminTableExists = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_name = 'game_admins_users'
    `;
    
    if (feedbackTableExists.length > 0 && adminTableExists.length > 0) {
      console.log('✅ 数据库初始化完成！');
      console.log(`📋 创建的表:`);
      console.log(`   - ${PROJECT_PREFIX}_feedback (反馈表)`);
      console.log(`   - game_admins_users (管理员表)`);
      console.log(`🔑 默认管理员账户:`);
      console.log(`   用户名: admin`);
      console.log(`   密码: admin123`);
      console.log(`   项目: ${PROJECT_PREFIX}`);
    } else {
      throw new Error('表创建验证失败');
    }
    
  } catch (error) {
    console.error('❌ 数据库初始化失败:', error);
    process.exit(1);
  }
}

// 运行初始化
initializeDatabase();

