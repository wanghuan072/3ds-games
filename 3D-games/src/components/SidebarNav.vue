<template>
  <aside class="sidebar-nav">
    <!-- 移动端汉堡按钮 -->
    <button
      class="sidebar-hamburger-btn"
      @click="toggleSidebar"
      :class="{ active: isSidebarOpen }"
      aria-label="Toggle category navigation"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

    <!-- 导航内容 -->
    <div class="nav-wrapper" :class="{ 'mobile-open': isSidebarOpen }">
      <div class="shortcut-section">
        <h3 class="nav-title nav-title-shortcut">Quick Access</h3>
        <nav class="shortcut-nav">
          <router-link
            :to="{ name: 'hot-games' }"
            class="nav-item shortcut-link"
            active-class="active"
            @click="closeSidebar"
          >
            <span class="nav-text">Hot Games</span>
          </router-link>
          <router-link
            :to="{ name: 'new-games' }"
            class="nav-item shortcut-link"
            active-class="active"
            @click="closeSidebar"
          >
            <span class="nav-text">New Games</span>
          </router-link>
          <router-link
            :to="{ name: '3ds-games' }"
            class="nav-item shortcut-link"
            active-class="active"
            @click="closeSidebar"
          >
            <span class="nav-text">3DS Games</span>
          </router-link>
        </nav>
      </div>
      <h3 class="nav-title">Game Categories</h3>
      <!-- 移动端标题和关闭按钮 -->
      <div class="nav-header">
        <h3 class="nav-title-mobile">Game Categories</h3>
        <button class="close-btn" @click="closeSidebar" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <nav class="category-nav">
        <router-link
          v-for="category in categoriesGames"
          :key="category.id"
          :to="{ name: `category-${category.addressBar}` }"
          class="nav-item"
          active-class="active"
          @click="closeSidebar"
        >
          <span class="nav-text">{{ category.name }}</span>
        </router-link>
      </nav>
    </div>

    <!-- 移动端遮罩层 -->
    <div v-if="isSidebarOpen" class="sidebar-overlay" @click="closeSidebar"></div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { categoriesGames } from '@/data/games.js'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  if (isSidebarOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const closeSidebar = () => {
  isSidebarOpen.value = false
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
/* 左侧导航栏 */
.sidebar-nav {
  width: 220px;
  flex-shrink: 0;
  align-self: flex-start;
  position: -webkit-sticky;
  position: sticky;
  top: 100px;
  z-index: 5;
}

/* 移动端汉堡按钮 */
.sidebar-hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 30px;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(248, 191, 36, 0.35);
  border-radius: 6px;
  cursor: pointer;
  padding: 6px 4px;
  position: fixed;
  top: 55px;
  left: 0;
  z-index: 104;
  transition: all 0.3s ease;
}

.sidebar-hamburger-btn:hover {
  background: rgba(249, 115, 22, 0.24);
  border-color: rgba(248, 191, 36, 0.55);
  box-shadow: 0 8px 16px rgba(249, 115, 22, 0.25);
}

.sidebar-hamburger-btn .hamburger-line {
  width: 100%;
  height: 2px;
  background: var(--color-accent);
  border-radius: 3px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.sidebar-hamburger-btn.active {
  display: none;
}

.sidebar-hamburger-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.sidebar-hamburger-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.sidebar-hamburger-btn.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.nav-wrapper {
  background: rgba(17, 24, 39, 0.9);
  border-radius: 12px;
  padding: 18px;
  border: 1px solid rgba(248, 191, 36, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 20px 40px rgba(5, 5, 5, 0.35);
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.nav-header {
  display: none;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(248, 191, 36, 0.25);
}

.close-btn {
  display: none;
  background: transparent;
  border: none;
  color: #a0a0a0;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: absolute;
  right: 10px;
  top: 10px;
}

.close-btn:hover {
  color: var(--color-text-primary);
  background: rgba(249, 115, 22, 0.2);
}

/* 桌面端标题 */
.nav-title {
  font-size: 17.6px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--color-text-primary);
  text-align: left;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(248, 191, 36, 0.25);
}

/* 移动端标题 - 默认隐藏 */
.nav-title-mobile {
  display: none;
  font-size: 17.6px;
  font-weight: 600;
  margin: 0;
  color: var(--color-text-primary);
  text-align: left;
}

.shortcut-section {
  margin-bottom: 16px;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid rgba(248, 191, 36, 0.25);
  background: linear-gradient(160deg, rgba(249, 115, 22, 0.22), rgba(8, 11, 19, 0.9));
  box-shadow: 0 18px 32px rgba(249, 115, 22, 0.18);
}

.nav-title-shortcut {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(248, 191, 36, 0.35);
  letter-spacing: 0.2px;
  color: var(--color-text-primary);
}

.shortcut-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.shortcut-link {
  position: relative;
  overflow: hidden;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(248, 191, 36, 0.45);
  background: rgba(15, 23, 42, 0.75);
  align-items: center;
  color: var(--color-text-secondary);
  transition: all 0.3s ease;
}

.shortcut-link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at top right, rgba(248, 191, 36, 0.4), transparent 60%);
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: -1;
}

.shortcut-link:hover::after,
.shortcut-link.active::after {
  opacity: 1;
  transform: scale(1);
}

.shortcut-link:hover,
.shortcut-link.active {
  border-color: rgba(248, 191, 36, 0.75);
  color: var(--color-text-primary);
  background: rgba(30, 25, 18, 0.85);
  box-shadow: 0 8px 24px rgba(249, 115, 22, 0.45);
}

.shortcut-link .nav-text {
  font-size: 14.4px;
  font-weight: 600;
  letter-spacing: 0.25px;
}

.category-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: 14.4px;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.nav-item:hover {
  color: var(--color-text-primary);
  background: rgba(248, 191, 36, 0.15);
  border-color: rgba(248, 191, 36, 0.35);
}

.nav-item.active {
  color: var(--color-text-primary);
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(249, 115, 22, 0.28));
  border-color: rgba(248, 191, 36, 0.6);
  box-shadow: 0 8px 20px rgba(248, 191, 36, 0.25);
}

.nav-text {
  font-size: 15.2px;
}

/* 移动端遮罩层 */
.sidebar-overlay {
  display: none;
}

/* iPad端 - 1024px */
@media (max-width: 1024px) {
  .sidebar-nav {
    width: 0;
    flex-shrink: 0;
    position: static;
  }

  .nav-wrapper {
    display: none;
  }
}

/* 移动端 - 768px */
@media (max-width: 768px) {
  .sidebar-nav {
    width: 0;
    flex-shrink: 0;
    position: static;
  }

  /* 显示移动端汉堡按钮 */
  .sidebar-hamburger-btn {
    display: flex;
  }

  /* 移动端导航菜单 - 从左至右滑出 */
  .nav-wrapper {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 260px;
    max-width: 80%;
    height: 100vh;
    background: rgba(11, 15, 23, 0.96);
    border-radius: 0;
    border: none;
    border-right: 1px solid rgba(248, 191, 36, 0.35);
    padding: 70px 20px 20px;
    z-index: 103;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 12px 0 24px rgba(0, 0, 0, 0.45);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .nav-wrapper.mobile-open {
    transform: translateX(0);
  }

  /* 隐藏桌面端标题 */
  .nav-title {
    display: none;
  }

  /* 显示移动端标题 */
  .nav-header {
    display: flex;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

  .nav-title-mobile {
    display: block;
    font-size: 16px;
    line-height: 1.2;
  }

  .close-btn {
    display: block;
  }

  .category-nav {
    flex-direction: column;
    gap: 10px;
  }

  .nav-item {
    padding: 10px;
    font-size: 12px;
    line-height: 1.2;
    min-width: auto;
    justify-content: flex-start;
  }

  .shortcut-section {
    margin-bottom: 16px;
    padding: 12px;
    box-shadow: none;
  }

  .shortcut-nav {
    gap: 12px;
  }

  .shortcut-link {
    padding: 12px;
  }

  .nav-text {
    font-size: 12px;
    line-height: 1.2;
  }

  /* 移动端遮罩层 */
  .sidebar-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 102;
    backdrop-filter: blur(2px);
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>

