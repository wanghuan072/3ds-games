<template>
  <header class="site-header">
    <div class="header-content">
      <div class="logo">
        <img src="/images/logo.webp" alt="3D Games" />
        <span class="brand-name">3D Games</span>
      </div>

      <!-- 搜索栏 -->
      <div class="search-container">
        <div class="search-box">
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Search games..."
            @keyup.enter="handleSearch"
            @input="handleInput"
          />
          <button class="search-btn" @click="handleSearch" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- 汉堡菜单按钮 -->
      <button
        class="hamburger-btn"
        @click="toggleMenu"
        :class="{ active: isMenuOpen }"
        aria-label="Toggle navigation menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- 桌面端导航 -->
      <nav class="main-nav desktop-nav">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/games" class="nav-link">Games</router-link>
        <router-link to="/hot-games" class="nav-link">Hot Games</router-link>
        <router-link to="/new-games" class="nav-link">New Games</router-link>
        <router-link to="/3ds-games" class="nav-link">3DS Games</router-link>
      </nav>
    </div>

      <!-- 移动端导航菜单 - 从左至右滑出 -->
    <nav class="mobile-nav" :class="{ open: isMenuOpen }">
      <router-link to="/" class="mobile-nav-link" @click="closeMenu">Home</router-link>
      <router-link to="/games" class="mobile-nav-link" @click="closeMenu">Games</router-link>
      <router-link to="/hot-games" class="mobile-nav-link" @click="closeMenu">Hot Games</router-link>
      <router-link to="/new-games" class="mobile-nav-link" @click="closeMenu">New Games</router-link>
      <router-link to="/3ds-games" class="mobile-nav-link" @click="closeMenu">3DS Games</router-link>
    </nav>

    <!-- 遮罩层 -->
    <div v-if="isMenuOpen" class="mobile-overlay" @click="closeMenu"></div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)
const searchQuery = ref('')

// 从路由查询参数同步搜索词
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
  }
})

// 监听路由变化，同步搜索词
watch(() => route.query.q, (newQuery) => {
  if (newQuery) {
    searchQuery.value = newQuery
  } else if (route.name !== 'search') {
    searchQuery.value = ''
  }
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = 'auto'
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      name: 'search',
      query: { q: searchQuery.value.trim() }
    })
  }
}

const handleInput = () => {
  // 可以在这里添加实时搜索建议等功能
}
</script>

<style scoped>
/* 头部样式 */
.site-header {
  background: radial-gradient(circle at top, rgba(249, 115, 22, 0.12), transparent 60%), rgba(11, 15, 23, 0.92);
  border-bottom: 1px solid rgba(248, 191, 36, 0.25);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 20px 35px rgba(5, 5, 5, 0.55);
  backdrop-filter: blur(12px);
  width: 100%;
  max-width: 100vw;
}

.header-content {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  box-sizing: border-box;
  min-width: 0;
}

.search-container {
  flex: 1;
  max-width: 500px;
  min-width: 0;
  display: flex;
  justify-content: center;
}

.search-box {
  width: 100%;
  max-width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
}

.search-input {
  width: 100%;
  max-width: 100%;
  padding: 8px 40px 8px 16px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(248, 191, 36, 0.25);
  border-radius: 8px;
  color: var(--color-text-primary);
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  box-shadow: inset 0 0 0 0 rgba(248, 191, 36, 0);
  box-sizing: border-box;
  min-width: 0;
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.search-input:focus {
  outline: none;
  border-color: rgba(248, 191, 36, 0.55);
  background: rgba(15, 23, 42, 0.95);
  box-shadow: 0 0 0 3px rgba(248, 191, 36, 0.15);
}

.search-btn {
  position: absolute;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-accent);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease, transform 0.3s ease;
}

.search-btn:hover {
  color: var(--color-accent-strong);
  transform: scale(1.05);
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  min-width: 0;
}

.logo img {
  width: 60px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 28px rgba(249, 115, 22, 0.4);
  border: 1px solid rgba(248, 191, 36, 0.4);
  background: radial-gradient(circle at top, rgba(248, 191, 36, 0.25), transparent);
}
.brand-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-primary);
  text-shadow: 0 4px 16px rgba(249, 115, 22, 0.4);
  letter-spacing: 0.4px;
}

/* 汉堡菜单按钮 */
.hamburger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
  flex-shrink: 0;
  min-width: 30px;
}

.hamburger-line {
  width: 100%;
  height: 3px;
  background: var(--color-accent);
  border-radius: 3px;
  transition: all 0.3s ease;
  transform-origin: center;
  box-shadow: 0 0 8px rgba(248, 191, 36, 0.35);
}

.hamburger-btn.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-btn.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* 桌面端导航 */
.desktop-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  position: relative;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.nav-link:hover {
  color: var(--color-text-primary);
  background: rgba(248, 191, 36, 0.18);
  border-color: rgba(248, 191, 36, 0.35);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.25);
}

.nav-link.router-link-active {
  color: var(--color-text-primary);
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.28), rgba(249, 115, 22, 0.34));
  border-color: rgba(248, 191, 36, 0.6);
  box-shadow: 0 8px 20px rgba(248, 191, 36, 0.25);
}

/* 移动端导航 - 从右至左滑出 */
.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  max-width: 80%;
  height: 100vh;
  background: rgba(11, 15, 23, 0.96);
  backdrop-filter: blur(18px);
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 0;
  padding-top: 80px;
  padding-left: 24px;
  padding-right: 24px;
  z-index: 102;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  box-shadow: -12px 0 30px rgba(0, 0, 0, 0.5);
  border-left: 1px solid rgba(248, 191, 36, 0.35);
}

.mobile-nav.open {
  transform: translateX(0);
}

.mobile-nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  text-align: left;
  margin-bottom: 8px;
  display: block;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  color: var(--color-text-primary);
  background: rgba(248, 191, 36, 0.18);
  border-color: rgba(248, 191, 36, 0.35);
  box-shadow: 0 6px 16px rgba(249, 115, 22, 0.25);
}

/* 遮罩层 */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 101;
  backdrop-filter: blur(2px);
}

/* iPad端 - 1024px */
@media (max-width: 1024px) {
  .header-content {
    padding: 16px 24px;
    gap: 16px;
  }

  .search-container {
    max-width: 300px;
  }

  .logo {
    font-size: 1.8rem;
  }

  .desktop-nav {
    gap: 1.5rem;
  }

  .nav-link {
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
  }
}

/* 移动端 - 768px */
@media (max-width: 768px) {
  .site-header {
    width: 100%;
    max-width: 100vw;
  }

  .header-content {
    padding: 12px 16px;
    gap: 10px;
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .search-container {
    max-width: 180px;
    min-width: 0;
    flex-shrink: 1;
  }

  .search-input {
    font-size: 12px;
    padding: 6px 32px 6px 12px;
    line-height: 1.2;
  }

  .search-input::placeholder {
    font-size: 12px;
  }

  .search-btn {
    right: 6px;
    padding: 2px;
  }

  .search-btn svg {
    width: 16px;
    height: 16px;
  }

  .logo {
    font-size: 1.4rem;
    flex-shrink: 0;
    min-width: 0;
  }

  .logo img {
    width: 40px;
    flex-shrink: 0;
  }

  .brand-name {
    font-size: 1.2rem;
    line-height: 1.2;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* 隐藏桌面端导航，显示汉堡菜单 */
  .desktop-nav {
    display: none;
  }

  .hamburger-btn {
    display: flex;
    width: 28px;
    height: 22px;
    flex-shrink: 0;
    min-width: 28px;
    z-index: 999;
  }

  /* 显示移动端导航 */
  .mobile-nav {
    display: flex;
    width: 260px;
    max-width: 75%;
    padding-top: 70px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .mobile-nav-link {
    font-size: 12px;
    padding: 10px;
    line-height: 1.2;
    margin-bottom: 10px;
  }
}
</style>

