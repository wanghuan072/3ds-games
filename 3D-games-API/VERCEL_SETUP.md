# Vercel 部署配置指南

## 📋 环境变量配置

在 Vercel 项目设置中，需要配置以下环境变量：

### 必需的环境变量

1. **PROJECT_PREFIX**
   - 值：`3d_games`
   - 说明：项目前缀，用于数据库表名

2. **DATABASE_URL**
   - 值：你的 PostgreSQL 数据库连接字符串
   - 示例：`postgresql://username:password@host:port/database?sslmode=require`
   - 说明：从 Neon 或其他 PostgreSQL 服务获取

3. **JWT_SECRET**
   - 值：一个强密钥字符串
   - 示例：`your-super-secret-jwt-key-here-change-this`
   - 说明：用于 JWT Token 加密，请使用强密钥

4. **FRONTEND_URL**
   - 值：前端部署地址
   - 示例：`https://your-frontend-domain.vercel.app`
   - 说明：用于 CORS 配置

### 可选的环境变量

5. **PORT**
   - 值：`3000`（默认）
   - 说明：服务器端口，Vercel 会自动分配，通常不需要设置

6. **NODE_ENV**
   - 值：`production`
   - 说明：环境标识

## 🔧 在 Vercel 中配置环境变量

### 方法一：通过 Vercel Dashboard

1. 登录 Vercel Dashboard
2. 选择你的项目
3. 进入 **Settings** → **Environment Variables**
4. 添加上述环境变量
5. 选择环境（Production、Preview、Development）
6. 点击 **Save**

### 方法二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 添加环境变量
vercel env add DATABASE_URL production
vercel env add JWT_SECRET production
vercel env add PROJECT_PREFIX production
vercel env add FRONTEND_URL production
```

## ✅ 验证配置

部署后，访问：
- `https://your-api-domain.vercel.app/health`

应该返回服务器状态信息。

## 🐛 常见问题

### 环境变量未生效
- 确保环境变量已添加到正确的环境（Production/Preview/Development）
- 重新部署项目以应用新的环境变量
- 检查环境变量名称是否正确（区分大小写）

### DATABASE_URL 连接失败
- 检查数据库连接字符串格式是否正确
- 确保数据库允许外部连接
- 检查数据库服务是否正常运行
- 确认 SSL 模式配置（通常需要 `?sslmode=require`）

### CORS 错误
- 检查 `FRONTEND_URL` 是否配置正确
- 确保前端地址与配置一致（包括协议 https://）
- 重新部署后端以应用新的 CORS 配置

