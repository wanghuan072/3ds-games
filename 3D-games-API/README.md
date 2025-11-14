# 3D Games API - 评论评分系统后端

这是 3D Games 项目的后端 API，基于 Game-Comment 模板创建。

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `env.example` 为 `.env` 并修改配置：

```bash
cp env.example .env
```

编辑 `.env` 文件：

```env
PROJECT_PREFIX=3d_games
DATABASE_URL=your_neon_database_url
JWT_SECRET=your-secret-jwt-key
FRONTEND_URL=http://localhost:5173
PORT=3000
```

### 3. 初始化数据库

```bash
npm run init-db
```

这将创建：
- `3d_games_feedback` 表（评论和评分）
- `game_admins_users` 表（管理员账户）
- 默认管理员账户（用户名：admin，密码：admin123）

### 4. 启动服务器

开发模式：
```bash
npm run dev
```

生产模式：
```bash
npm start
```

服务器将在 `http://localhost:3000` 启动

## 📡 API 端点

### 公开接口
- `GET /health` - 健康检查
- `GET /comments?pageId={addressBar}` - 获取评论
- `POST /comments` - 提交评论
- `GET /ratings?pageId={addressBar}` - 获取评分统计
- `POST /ratings` - 提交评分

### 管理员接口（需要 JWT Token）
- `POST /admin/login` - 管理员登录
- `GET /admin/feedback` - 获取所有游戏数据
- `DELETE /admin/feedback/:pageId/:feedbackId` - 删除反馈
- `POST /admin/feedback/manual` - 手动添加反馈
- `PUT /admin/feedback/:pageId/:feedbackId` - 更新反馈
- `PUT /admin/ratings/:pageId` - 更新评分

## 🔑 默认管理员账户

- **用户名**: `admin`
- **密码**: `admin123`
- **项目**: `3d_games`

⚠️ **重要**: 生产环境部署后请立即修改默认密码！

## 🌐 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量：
   - `PROJECT_PREFIX`
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `FRONTEND_URL`

## 📝 数据库表结构

### 3d_games_feedback
- `id` - 主键
- `game_address_bar` - 游戏地址标识（对应 games.js 中的 addressBar）
- `name` - 评论者昵称
- `email` - 邮箱（可选）
- `text` - 评论内容
- `rating` - 评分（1-5）
- `added_by_admin` - 是否由管理员添加
- `created_at` - 创建时间

### game_admins_users（全局共享）
- `id` - 主键
- `username` - 用户名
- `password` - 加密密码
- `role` - 角色
- `project_id` - 项目ID
- `created_at` - 创建时间

