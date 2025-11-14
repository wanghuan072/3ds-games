# 3D Games - 游戏评论评分系统

基于 Vue 3 + Vite 的游戏网站，集成了评论和评分功能。

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `env.example` 为 `.env.local` 并修改配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，设置后端 API 地址：

```env
VITE_API_BASE_URL=http://localhost:3000
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
3D-games/
├── src/
│   ├── components/      # 组件
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   └── GameGrid.vue
│   ├── views/          # 页面
│   │   ├── HomeView.vue
│   │   ├── GameDetailView.vue  # 游戏详情页（含评论评分）
│   │   └── admin/      # 管理员后台
│   │       ├── Login.vue
│   │       └── CommentRatingManagement.vue
│   ├── services/       # API 服务
│   │   └── api.js
│   ├── data/          # 游戏数据
│   │   └── games.js
│   └── router/        # 路由配置
│       └── index.js
└── public/            # 静态资源
    └── images/
        └── games/
```

## 🎮 功能特性

- ✅ 游戏列表展示（支持大图/小图）
- ✅ 游戏详情页（含 iframe 游戏播放）
- ✅ 评论和评分系统
- ✅ 管理员后台（评论管理）
- ✅ 响应式设计
- ✅ 卡哇伊风格 UI

## 🔗 路由

- `/` - 首页
- `/games/:addressBar` - 游戏详情页
- `/admin/login` - 管理员登录
- `/admin/dashboard` - 管理员后台

## 🔌 后端 API

后端 API 位于 `3D-games-API` 目录，详细说明请查看该目录的 README.md。

## 📝 游戏数据格式

在 `src/data/games.js` 中配置游戏数据：

```javascript
{
  id: 1,
  title: "Game Title",
  description: "Game description",
  publishDate: "2025-01-15",
  addressBar: "game-url-slug",  // 用于 URL 和数据库标识
  iframeUrl: "https://example.com/game",
  imageUrl: "/images/games/game-01.webp",
  imageAlt: "Game image alt text",
  size: "large",  // "large" 或 "small"
  seo: {
    title: "Game SEO Title",
    description: "Game SEO description",
    keywords: "game, keywords"
  },
  categories: ["shooting"],
  detailsHtml: "<h3>Game Details</h3><p>...</p>"
}
```

## 🎨 样式

项目采用卡哇伊风格，使用柔和的粉色、紫色和蓝色渐变背景。
