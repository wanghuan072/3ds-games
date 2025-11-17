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
            <div class="nav-text">
              <span class="icon">
                <svg t="1763342401647" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9361" width="200" height="200"><path d="M511.99 914.286c-157.45-0.014-298.94-90.866-356.956-229.21-58.018-138.342-20.804-296.14 93.884-398.1 16.434-14.62 39.35-28.006 64.358-43.226 16.286-9.912 67.054 19.448 74.564 67.836 124.16-15.07 195.008-72.17 124.15-220.158 204.606 7.372 408.68 287.3 102.404 459.914 51.2 0 128.002 0 256.006-119.528 13.824 37.406 25.6 77.62 25.6 119.528 0 200.448-171.926 362.944-384.01 362.944z" fill="#FE544A" p-id="9362"></path></svg>
              </span>
              Hot Games
            </div>
          </router-link>
          <router-link
            :to="{ name: 'new-games' }"
            class="nav-item shortcut-link"
            active-class="active"
            @click="closeSidebar"
          >
            <div class="nav-text">
              <span class="icon">
                <svg t="1763342690516" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19407" width="200" height="200"><path d="M965.76 576l-74.56-78.08a107.2 107.2 0 0 1-19.84-105.6l40.96-99.84a40.96 40.96 0 0 0-39.68-60.8l-107.84-0.64a107.2 107.2 0 0 1-88.64-60.48l-41.6-99.52a40.96 40.96 0 0 0-71.04-14.72l-78.08 74.24a107.2 107.2 0 0 1-105.6 19.84L280 109.76a40.96 40.96 0 0 0-60.8 39.68L216.96 256a107.2 107.2 0 0 1-60.48 88.64l-99.52 41.6a40.96 40.96 0 0 0-14.72 71.04l74.56 78.08a107.52 107.52 0 0 1 19.84 105.6L96 741.76a40.96 40.96 0 0 0 39.68 60.8l107.84 2.56A107.2 107.2 0 0 1 331.84 864l41.6 99.52a40.96 40.96 0 0 0 71.04 14.72l78.08-74.56a107.2 107.2 0 0 1 105.6-19.84l99.84 40.96a40.96 40.96 0 0 0 60.8-39.68l2.56-107.84a107.2 107.2 0 0 1 60.48-88.64l99.52-41.6a40.96 40.96 0 0 0 14.4-71.04z m-309.44 128c-18.56 3.2-43.2 0-79.36-34.56-25.28-24.96-102.72-118.08-154.88-181.12l37.76 187.52a73.92 73.92 0 0 1-1.92 39.68 51.84 51.84 0 0 1-65.6 29.12A64 64 0 0 1 352 686.72l-50.56-288A59.52 59.52 0 0 1 311.68 352a64 64 0 0 1 43.52-21.76A55.36 55.36 0 0 1 416 352c26.24 29.76 52.16 59.84 77.76 89.92 32 36.8 61.12 73.92 91.52 110.72l-39.04-195.52a64 64 0 0 1 3.2-37.12 48.64 48.64 0 0 1 39.04-32 52.8 52.8 0 0 1 40.96 9.28 71.36 71.36 0 0 1 24.64 47.04L704 630.72A55.68 55.68 0 0 1 656.32 704z" fill="#ff554d" p-id="19408"></path></svg>
              </span>
              New Games
            </div>
          </router-link>
          <router-link
            :to="{ name: '3ds-games' }"
            class="nav-item shortcut-link"
            active-class="active"
            @click="closeSidebar"
          >
            <div class="nav-text">
              <span class="icon">
                <svg t="1763344624126" class="icon" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="79310" width="200" height="200"><path d="M16.026522 827.98592L1.741722 623.13472A720.6912 720.6912 0 0 1 43.060122 327.68l17.03936-47.07328A145.98144 145.98144 0 0 1 197.346202 184.32h0.768a222.5664 222.5664 0 0 1 168.192 76.8l9.55392 11.02848A190.6176 190.6176 0 0 0 519.906202 337.92a181.0944 181.0944 0 0 0 141.4144-67.96288l7.0656-8.83712A204.63616 204.63616 0 0 1 828.181402 184.32h4.0448c61.3376 0 115.95776 38.76864 136.21248 96.6656L984.781722 327.68a752.0256 752.0256 0 0 1 40.73472 294.94272l-13.07648 210.42176A105.32864 105.32864 0 0 1 907.316122 931.84a207.8208 207.8208 0 0 1-161.36192-76.86144l-61.00992-75.17184A225.7408 225.7408 0 0 0 509.666202 696.32a210.69824 210.69824 0 0 0-170.60864 87.06048l-46.4896 64.16384A204.00128 204.00128 0 0 1 127.376282 931.84 111.616 111.616 0 0 1 16.026522 827.98592z" fill="#FFC53D" p-id="79311"></path><path d="M198.114202 184.32a222.5664 222.5664 0 0 1 168.192 76.8l9.55392 11.02848A190.6176 190.6176 0 0 0 519.906202 337.92a181.0944 181.0944 0 0 0 141.4144-67.96288l7.0656-8.83712A204.63616 204.63616 0 0 1 828.181402 184.32h4.0448c11.10016 0 21.97504 1.26976 32.4608 3.6864l-69.75488 81.6128a370.3808 370.3808 0 0 1-563.0976 0l-69.3248-81.1008c11.23328-2.74432 22.91712-4.1984 34.83648-4.1984h0.768zM513.383322 624.64a341.9136 341.9136 0 0 1 273.2544 136.3968L914.893722 931.57376c-2.49856 0.17408-5.02784 0.26624-7.5776 0.26624a207.8208 207.8208 0 0 1-161.36192-76.86144l-61.00992-75.17184A225.7408 225.7408 0 0 0 509.666202 696.32a210.69824 210.69824 0 0 0-170.60864 87.06048l-46.4896 64.16384A204.00128 204.00128 0 0 1 127.376282 931.84c-2.57024 0-5.12-0.08192-7.64928-0.256l122.6752-168.86784A334.94016 334.94016 0 0 1 513.383322 624.64z" fill="#FAAD14" p-id="79312"></path><path d="M800.103322 460.8m-40.96 0a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 1 0-81.92 0Z" fill="#FAAD14" p-id="79313"></path><path d="M800.103322 604.16m-40.96 0a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 1 0-81.92 0Z" fill="#FAAD14" p-id="79314"></path><path d="M728.423322 532.48m0 40.96a40.96 40.96 0 1 0 0-81.92 40.96 40.96 0 1 0 0 81.92Z" fill="#FAAD14" p-id="79315"></path><path d="M871.783322 532.48m0 40.96a40.96 40.96 0 1 0 0-81.92 40.96 40.96 0 1 0 0 81.92Z" fill="#FAAD14" p-id="79316"></path><path d="M800.103322 440.32m-40.96 0a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 1 0-81.92 0Z" fill="#FFF1B8" p-id="79317"></path><path d="M800.103322 583.68m-40.96 0a40.96 40.96 0 1 0 81.92 0 40.96 40.96 0 1 0-81.92 0Z" fill="#FFF1B8" p-id="79318"></path><path d="M728.423322 512m0 40.96a40.96 40.96 0 1 0 0-81.92 40.96 40.96 0 1 0 0 81.92Z" fill="#FFF1B8" p-id="79319"></path><path d="M871.783322 512m0 40.96a40.96 40.96 0 1 0 0-81.92 40.96 40.96 0 1 0 0 81.92Z" fill="#FFF1B8" p-id="79320"></path><path d="M257.383322 430.08a20.48 20.48 0 0 1 20.48 20.48v51.2h51.2a20.48 20.48 0 0 1 20.48 20.48v40.96a20.48 20.48 0 0 1-20.48 20.48h-51.2v51.2a20.48 20.48 0 0 1-20.48 20.48h-40.96a20.48 20.48 0 0 1-20.48-20.48v-51.2h-51.2a20.48 20.48 0 0 1-20.48-20.48v-40.96a20.48 20.48 0 0 1 20.48-20.48h51.2v-51.2a20.48 20.48 0 0 1 20.48-20.48h40.96z" fill="#FAAD14" p-id="79321"></path><path d="M257.383322 399.36a20.48 20.48 0 0 1 20.48 20.48v51.2h51.2a20.48 20.48 0 0 1 20.48 20.48v40.96a20.48 20.48 0 0 1-20.48 20.48h-51.2v51.2a20.48 20.48 0 0 1-20.48 20.48h-40.96a20.48 20.48 0 0 1-20.48-20.48v-51.2h-51.2a20.48 20.48 0 0 1-20.48-20.48v-40.96a20.48 20.48 0 0 1 20.48-20.48h51.2v-51.2a20.48 20.48 0 0 1 20.48-20.48h40.96z" fill="#FFF1B8" p-id="79322"></path></svg>
              </span>
              3DS Games
            </div>
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
          <div class="nav-text">
            <span class="icon" v-html="category.icon"></span>
            {{ category.name }}
          </div>
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
  width: 230px;
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
  display: flex;
  align-items: center;
  gap: 5px;
}
.shortcut-link .nav-text .icon {
  width: 20px;
  height: 20px;
}

.category-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
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
  display: flex;
  align-items: center;
  gap: 5px;
}
.nav-text .icon {
  width: 20px;
  height: 20px;
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

