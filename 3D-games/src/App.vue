<template>
  <div class="app-container">
    <AppHeader />
    <router-view />
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px; /* 基础字体大小 */
  scroll-behavior: smooth;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

:root {
  --color-bg-base: #050505;
  --color-bg-surface: #111827;
  --color-bg-overlay: #1f2937;
  --color-bg-muted: #0f172a;
  --color-text-primary: #f4f4f5;
  --color-text-secondary: #94a3b8;
  --color-text-muted: #64748b;
  --color-accent: #f59e0b;
  --color-accent-strong: #fbbf24;
  --color-accent-soft: rgba(245, 158, 11, 0.18);
  --color-border: rgba(248, 191, 36, 0.28);
  --color-border-strong: rgba(248, 191, 36, 0.45);
  --color-shadow-soft: 0 12px 32px rgba(15, 23, 42, 0.5);
}

body {
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  line-height: 1.6;
  color: var(--color-text-primary);
  background: radial-gradient(circle at top, rgba(245, 158, 11, 0.12), transparent 45%),
    var(--color-bg-base);
  min-height: 100vh;
  overflow-x: hidden; /* 防止水平滚动条 */
  width: 100%;
  max-width: 100vw;
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 通用容器样式 */
.app-container {
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(17, 24, 39, 0.82), rgba(5, 5, 5, 0.95));
  color: var(--color-text-primary);
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.main-content {
  flex: 1;
  padding-bottom: 32px;
  background: transparent;
  min-height: 0;
}

/* 页面布局 - 左侧导航 + 右侧内容 */
.page-layout {
  display: flex;
  gap: 24px;
  width: 100%;
  margin: 0;
  padding: 0 24px;
  align-items: flex-start;
}

/* 右侧内容区域 */
.content-area {
  flex: 1;
  min-width: 0;
}

/* 通用页面区域样式 */
.page-section {
  padding: 24px 0;
}

.page-wrapper {
  width: 100%;
  margin: 0;
}

/* 通用标题样式 */
.title-h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--color-text-primary);
  text-align: left;
}

.title-h2 {
  font-size: 35.2px;
  margin-bottom: 16px;
  color: var(--color-text-primary);
}

/* 通用页面描述样式 */
.page-description {
  text-align: left;
  color: var(--color-text-secondary);
  font-size: 16px;
  margin-bottom: 24px;
}

/* 通用分类筛选样式 */
.categories-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
  margin-bottom: 32px;
  padding: 0;
}

.category-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: rgba(15, 23, 42, 0.6);
  color: var(--color-text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  box-shadow: inset 0 0 0 0 rgba(245, 158, 11, 0);
}

.category-btn:hover {
  border-color: var(--color-border-strong);
  background: rgba(30, 41, 59, 0.9);
  color: var(--color-text-primary);
  box-shadow: inset 0 0 0 1px rgba(245, 158, 11, 0.25);
}

.category-btn.active {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(249, 115, 22, 0.2));
  color: var(--color-text-primary);
  border-color: var(--color-border-strong);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.25);
}

/* iPad端 - 1024px */
@media (max-width: 1024px) {
  .page-layout {
    flex-direction: column;
    padding: 0 15px;
    gap: 20px;
  }

  .page-section {
    padding: 20px 0;
  }

  .title-h1 {
    font-size: 32px;
  }

  .title-h2 {
    font-size: 28.8px;
  }
}

/* 移动端 - 768px */
@media (max-width: 768px) {
  body {
    line-height: 1.2;
  }

  .main-content {
    padding-bottom: 20px;
  }

  .page-layout {
    padding: 0 16px;
    gap: 20px;
  }

  .page-section {
    padding: 20px 0;
  }

  .title-h1 {
    font-size: 24px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .title-h2 {
    font-size: 20px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .page-description {
    font-size: 12px;
    line-height: 1.2;
    margin-bottom: 20px;
  }

  .categories-filter {
    gap: 10px;
    margin-bottom: 20px;
  }

  .category-btn {
    padding: 8px 12px;
    font-size: 12px;
    line-height: 1.2;
  }

  .details-html {
    font-size: 14px;
  }

  .details-html h2 {
    font-size: 24px;
    margin-top: 24px;
    margin-bottom: 12px;
  }

  .details-html h3 {
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .details-html p {
    font-size: 12px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .details-html ul,
  .details-html ol {
    margin-bottom: 10px;
  }

  .details-html li {
    font-size: 12px;
    line-height: 1.2;
    padding-left: 20px;
  }

  .details-html li::before {
    font-size: 14px;
  }

  .details-html img {
    margin: 16px 0;
  }
}

/* 详情页HTML样式 - 通用样式 */
.details-html {
  color: var(--color-text-secondary);
  line-height: 1.8;
  font-size: 15px;
}

.details-html h2 {
  font-size: 28px;
  font-weight: 700;
  margin-top: 32px;
  margin-bottom: 16px;
  color: var(--color-text-primary);
  letter-spacing: -0.3px;
  border-bottom: 2px solid rgba(59, 130, 246, 0.3);
  padding-bottom: 8px;
}

.details-html h2:first-child {
  margin-top: 0;
}

.details-html h3 {
  font-size: 20px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 12px;
  color: var(--color-accent-strong);
  letter-spacing: -0.2px;
}

.details-html h3:first-child {
  margin-top: 1.5em;
}

.details-html p {
  margin-bottom: 16px;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.details-html ul,
.details-html ol {
  list-style: none;
  padding-left: 0;
  margin-left: 0;
  margin-bottom: 20px;
}

.details-html li {
  margin-bottom: 10px;
  padding-left: 24px;
  position: relative;
  color: var(--color-text-secondary);
  list-style: none;
  line-height: 1.7;
}

.details-html li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: bold;
  font-size: 16px;
}

.details-html strong {
  color: var(--color-text-primary);
  font-weight: 600;
}

.details-html img {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 12px 24px rgba(5, 5, 5, 0.4);
}

.details-html iframe {
  width: 50%;
  height: 400px;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 12px 24px rgba(5, 5, 5, 0.4);
}

</style>
