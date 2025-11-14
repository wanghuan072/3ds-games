# 3D Games - 快速设置指南

## 📋 前置要求

1. Node.js >= 18.0.0
2. Neon PostgreSQL 数据库（或任意 PostgreSQL 数据库）
3. 两个终端窗口（一个用于前端，一个用于后端）

## 🚀 快速开始

### 第一步：后端设置（3D-games-API）

1. **进入后端目录**
   ```bash
   cd 3D-games-API
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   ```bash
   cp env.example .env
   ```
   
   编辑 `.env` 文件，设置：
   ```env
   PROJECT_PREFIX=3d_games
   DATABASE_URL=your_neon_database_connection_string
   JWT_SECRET=your-secret-key-change-this
   FRONTEND_URL=http://localhost:5173
   PORT=3000
   ```

4. **初始化数据库**
   ```bash
   npm run init-db
   ```
   
   这会创建数据库表和默认管理员账户。

5. **启动后端服务器**
   ```bash
   npm run dev
   ```
   
   服务器将在 `http://localhost:3000` 启动

### 第二步：前端设置（3D-games）

1. **进入前端目录**
   ```bash
   cd 3D-games
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env.local
   ```
   
   编辑 `.env.local` 文件：
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```
   
   前端将在 `http://localhost:5173` 启动

## ✅ 验证安装

1. **检查后端 API**
   - 访问 `http://localhost:3000/health`
   - 应该看到 `{"status":"OK",...}`

2. **检查前端**
   - 访问 `http://localhost:5173`
   - 应该看到首页和游戏列表

3. **测试游戏详情页**
   - 点击任意游戏卡片
   - 应该跳转到 `/games/{addressBar}` 页面
   - 右侧应该显示评论和评分表单

4. **测试管理员后台**
   - 访问 `http://localhost:5173/admin/login`
   - 使用默认账户登录：
     - 用户名: `admin`
     - 密码: `admin123`
   - 登录后应该跳转到管理后台

## 🔧 配置说明

### 后端配置（3D-games-API/.env）

- `PROJECT_PREFIX`: 项目前缀，用于数据库表名（默认：`3d_games`）
- `DATABASE_URL`: Neon PostgreSQL 数据库连接字符串
- `JWT_SECRET`: JWT 密钥（生产环境请使用强密钥）
- `FRONTEND_URL`: 前端地址（用于 CORS）
- `PORT`: 后端端口（默认：3000）

### 前端配置（3D-games/.env.local）

- `VITE_API_BASE_URL`: 后端 API 地址

## 📝 游戏数据配置

编辑 `3D-games/src/data/games.js` 添加或修改游戏数据。

每个游戏需要包含：
- `addressBar`: 用于 URL 和数据库标识（重要！）
- `title`: 游戏标题
- `imageUrl`: 游戏封面图
- `iframeUrl`: 游戏 iframe 地址
- `detailsHtml`: 游戏详情 HTML
- `size`: "large" 或 "small"（大图/小图）

## 🎯 默认账户

- **管理员用户名**: `admin`
- **管理员密码**: `admin123`
- **项目前缀**: `3d_games`

⚠️ **重要**: 生产环境部署后请立即修改默认密码！

## 🌐 部署

### 后端部署（Vercel）

1. 在 Vercel 中导入 `3D-games-API` 项目
2. 配置环境变量
3. 部署

### 前端部署（Vercel）

1. 在 Vercel 中导入 `3D-games` 项目
2. 配置环境变量 `VITE_API_BASE_URL` 为后端地址
3. 部署

## 🐛 常见问题

### 数据库连接失败
- 检查 `DATABASE_URL` 是否正确
- 确保数据库允许外部连接

### API 请求失败
- 检查后端是否运行在 `http://localhost:3000`
- 检查前端 `.env.local` 中的 `VITE_API_BASE_URL`
- 检查浏览器控制台是否有 CORS 错误

### 管理员无法登录
- 检查数据库是否已初始化（运行 `npm run init-db`）
- 检查 `PROJECT_PREFIX` 是否匹配
- 检查数据库表中是否有管理员账户


