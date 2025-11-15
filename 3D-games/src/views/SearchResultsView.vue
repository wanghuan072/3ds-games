<template>
  <div class="app-container">
    <main class="main-content">
      <div class="page-layout">
        <SidebarNav />
        <div class="content-area">
          <section class="page-section">
            <div class="page-wrapper">
              <h1 class="title-h1">Search Results</h1>
              <p class="search-info" v-if="searchQuery">
                Found {{ filteredGames.length }} result(s) for "<strong>{{ searchQuery }}</strong>"
              </p>
              <p class="search-info" v-else>
                Please enter a search query
              </p>

            <!-- 游戏网格 -->
            <div v-if="filteredGames.length > 0" class="games-grid">
              <div
                v-for="(game, index) in filteredGames"
                :key="`${game.gameType}-${game.id}-${game.addressBar}`"
                class="game-card"
                @click="navigateToGame(game)"
              >
                <div class="badges">
                  <span v-if="game.isHot" class="badge badge-hot">Hot</span>
                  <span v-if="game.isNew" class="badge badge-new">New</span>
                </div>
                <img 
                  :src="game.imageUrl" 
                  :alt="game.imageAlt" 
                  class="game-image"
                  :fetchpriority="index === 0 ? 'high' : undefined"
                  :loading="index === 0 ? 'eager' : 'lazy'"
                />
                <h3 class="game-title">{{ game.title }}</h3>
              </div>
            </div>

            <!-- 无结果 -->
            <div v-else-if="searchQuery" class="no-results">
              <p>No games found matching your search.</p>
              <p>Try different keywords or browse our <router-link to="/games" class="link">game collection</router-link>.</p>
            </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SidebarNav from '@/components/SidebarNav.vue'
import { games } from '@/data/games.js'
import { categoriesGames } from '@/data/games.js'
import { nintendo3DSGames } from '@/data/3dsGames.js'

const route = useRoute()
const router = useRouter()

const searchQuery = computed(() => {
  return route.query.q || ''
})

// 合并所有游戏数据，并标记游戏类型
const allGames = computed(() => {
  const h5Games = games.map(game => ({ ...game, gameType: 'h5' }))
  const dsGames = nintendo3DSGames.map(game => ({ ...game, gameType: '3ds' }))
  return [...h5Games, ...dsGames]
})

// 搜索游戏
const filteredGames = computed(() => {
  if (!searchQuery.value.trim()) {
    return []
  }

  const query = searchQuery.value.toLowerCase().trim()
  
  return allGames.value.filter(game => {
    // 搜索标题
    const titleMatch = game.title.toLowerCase().includes(query)
    
    // 搜索描述
    const descriptionMatch = game.description.toLowerCase().includes(query)
    
    // 搜索分类（仅对 H5 游戏）
    const categoryMatch = game.categories && game.categories.some(catId => {
      const category = categoriesGames.find(c => c.id === catId)
      return category && category.name.toLowerCase().includes(query)
    })

    // 搜索标签（仅对 3DS 游戏）
    const tagMatch = game.tags && game.tags.some(tag => {
      return tag.toLowerCase().includes(query)
    })

    return titleMatch || descriptionMatch || categoryMatch || tagMatch
  })
})

// 导航到游戏详情页
const navigateToGame = (game) => {
  if (game.gameType === '3ds') {
    router.push({ name: '3ds-game-detail', params: { addressBar: game.addressBar } })
  } else {
    router.push({ name: 'game-detail', params: { addressBar: game.addressBar } })
  }
}
</script>

<style scoped>
.search-info {
  font-size: 16px;
  color: #a0a0a0;
  margin-bottom: 32px;
  line-height: 1.2;
}

.search-info strong {
  color: #8b5cf6;
  font-weight: 600;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.game-card {
  background: #16213e;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(139, 92, 246, 0.2);
  position: relative;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.badges {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  gap: 6px;
  z-index: 20;
  pointer-events: none;
}

.badge {
  font-size: 11.2px;
  line-height: 1;
  padding: 4px 8px;
  border-radius: 999px;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  font-weight: 600;
}

.badge-hot {
  background: linear-gradient(135deg, rgba(255, 107, 157, 0.7), rgba(255, 179, 71, 0.7));
}

.badge-new {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.7), rgba(16, 185, 129, 0.7));
}

.game-card:hover {
  transform: translateY(-4px);
  border-color: #8b5cf6;
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.4);
  background: #1a2742;
}

.game-image {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  transition: transform 0.3s ease;
  display: block;
}

.game-card:hover .game-image {
  transform: scale(1.05);
}

.game-title {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12.8px;
  font-size: 13.6px;
  text-align: center;
  color: #ffffff;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    transparent 100%
  );
  backdrop-filter: blur(3px);
  z-index: 10;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
  line-height: 1.2;
}

.no-results {
  text-align: center;
  padding: 64px 16px;
  color: #a0a0a0;
}

.no-results p {
  font-size: 16px;
  margin-bottom: 12px;
}

.link {
  color: #8b5cf6;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link:hover {
  color: #a78bfa;
  text-decoration: underline;
}

/* iPad端 - 1024px */
@media (max-width: 1024px) {
  .games-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .game-title {
    font-size: 13px;
    padding: 12px;
  }
}

/* 移动端 - 768px */
@media (max-width: 768px) {
  .search-info {
    font-size: 12px;
    line-height: 1.2;
    margin-bottom: 20px;
  }

  .games-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .game-title {
    font-size: 12px;
    line-height: 1.2;
    padding: 10px;
  }

  .badge {
    font-size: 10px;
    padding: 3px 6px;
  }

  .no-results {
    padding: 40px 16px;
  }

  .no-results p {
    font-size: 12px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .link {
    font-size: 12px;
  }
}
</style>

