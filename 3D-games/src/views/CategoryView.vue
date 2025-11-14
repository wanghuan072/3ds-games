<template>
  <div class="app-container">
    <main class="main-content">
      <div class="page-layout">
        <SidebarNav />
        <div class="content-area">
          <section class="page-section">
            <div class="page-wrapper">
              <h1 class="title-h1">{{ category?.title || category?.name || 'Games' }}</h1>
              <p class="page-description">{{ category?.description || 'Discover our collection of 3D games.' }}</p>
              
              <!-- 分类筛选栏 -->
              <div class="categories-filter">
                <button
                  v-for="cat in categoryOptions"
                  :key="cat.value || 'all'"
                  :class="['category-btn', { active: currentCategoryValue === cat.value }]"
                  @click="handleCategorySelect(cat.value)"
                >
                  {{ cat.name }}
                </button>
              </div>

              <!-- 游戏列表 -->
              <GameGrid
                :category="category?.id"
                :show-title="false"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import GameGrid from '@/components/GameGrid.vue'
import SidebarNav from '@/components/SidebarNav.vue'
import { categoriesGames } from '@/data/games.js'

const route = useRoute()
const router = useRouter()

// 根据路由名称查找分类（路由名称是 category-${cat.addressBar}，如 category-racing, category-shooting）
const category = computed(() => {
  // 从路由名称中提取分类地址（移除 category- 前缀）
  if (route.name && route.name.startsWith('category-')) {
    const addressBar = route.name.replace('category-', '')
    return categoriesGames.find(cat => cat.addressBar === addressBar)
  }
  // 如果路由名称不符合预期，尝试从路径中提取
  const pathCategory = route.path.replace(/^\//, '')
  return categoriesGames.find(cat => cat.addressBar === pathCategory)
})

// 当前分类的值（用于高亮显示）
const currentCategoryValue = computed(() => {
  return category.value?.id || null
})

// 分类选项列表
const categoryOptions = [
  { name: 'All Games', value: null },
  ...categoriesGames.map(cat => ({
    name: cat.name,
    value: cat.id
  }))
]

// 处理分类选择
const handleCategorySelect = (categoryValue) => {
  if (categoryValue) {
    // 跳转到对应的分类页面
    const selectedCategory = categoriesGames.find(cat => cat.id === categoryValue)
    if (selectedCategory) {
      router.push({ name: `category-${selectedCategory.addressBar}` })
    }
  } else {
    // 跳转到所有游戏页面
    router.push({ name: 'games' })
  }
}
</script>

<style scoped>
/* 样式已整合到 App.vue 全局样式 */
</style>

