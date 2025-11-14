<template>
  <div class="app-container">
    <main class="main-content">
      <div class="page-layout">
        <SidebarNav />
        <div class="content-area">
          <section class="page-section">
            <div class="page-wrapper">
              <h1 class="title-h1">All Games</h1>
              <p class="page-description">Discover our complete collection of 3D games. Filter by category to find your favorite games.</p>
              
              <!-- 分类筛选栏 -->
              <div class="categories-filter">
                <button
                  v-for="cat in categoryOptions"
                  :key="cat.value || 'all'"
                  :class="['category-btn', { active: selectedCategory === cat.value }]"
                  @click="handleCategorySelect(cat.value)"
                >
                  {{ cat.name }}
                </button>
              </div>

              <!-- 游戏列表 -->
              <GameGrid
                :category="selectedCategory"
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
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import GameGrid from '@/components/GameGrid.vue'
import SidebarNav from '@/components/SidebarNav.vue'
import { categoriesGames } from '@/data/games.js'

const route = useRoute()
const router = useRouter()
const selectedCategory = ref(null) // null 表示显示所有游戏

// 从 URL 查询参数中获取分类
onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
})

// 监听路由查询参数变化
watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    selectedCategory.value = newCategory
  } else {
    selectedCategory.value = null
  }
})

// 处理分类选择 - 跳转到分类页面
const handleCategorySelect = (categoryValue) => {
  selectedCategory.value = categoryValue
  // 跳转到分类页面
  if (categoryValue) {
    const category = categoriesGames.find(cat => cat.id === categoryValue)
    if (category) {
      router.push({ name: `category-${category.addressBar}` })
    }
  } else {
    router.push({ name: 'games' })
  }
}

const categoryOptions = [
  { name: 'All Games', value: null },
  ...categoriesGames.map(cat => ({
    name: cat.name, // 显示名称
    value: cat.id // 使用分类的 id 值，因为游戏的 categories 引用的是 id
  }))
]
</script>

<style scoped>
/* 样式已整合到 App.vue 全局样式 */
</style>

