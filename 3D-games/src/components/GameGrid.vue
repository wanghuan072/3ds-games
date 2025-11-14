<template>
  <div class="game-grid-container">
    <div v-if="showTitle" class="category-header">
      <div class="category-header-left">
        <h2 class="category-title title-h2">{{ title }}</h2>
        <p v-if="description" class="category-description">{{ description }}</p>
      </div>
      <router-link v-if="moreTo" :to="moreTo" class="more-link">More →</router-link>
    </div>

    <div class="games-grid">
      <div
        v-for="game in filteredGames"
        :key="game.id"
        :class="['game-card', game.size === 'large' ? 'game-card-large' : 'game-card-small']"
        @click="navigateToGame(game)"
      >
        <div class="badges">
          <span
            v-if="Array.isArray(game.badges) && game.badges.includes('updated')"
            class="badge badge-updated"
            >Updated</span
          >
          <span
            v-if="game.isHot"
            class="badge badge-hot"
            >Hot</span
          >
          <span
            v-if="game.isNew"
            class="badge badge-new"
            >New</span
          >
        </div>
        <img :src="game.imageUrl" :alt="game.imageAlt" class="game-image" />
        <h3 class="game-title">{{ game.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { games as gameData } from '@/data/games.js'

const router = useRouter()

const props = defineProps({
  category: {
    type: String,
    default: null, // null表示显示所有游戏，值为分类的name（字符串）
  },
  showTitle: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  moreTo: {
    type: [String, Object],
    default: null,
  },
  maxItems: {
    type: Number,
    default: null, // 限制显示数量
  },
  filterType: {
    type: String,
    default: null, // 'updated', 'hot', 'new', 'detail' 等过滤类型
  },
  isHot: {
    type: Boolean,
    default: null, // 是否只显示热门游戏
  },
  isNew: {
    type: Boolean,
    default: null, // 是否只显示新游戏
  },
  isHome: {
    type: Boolean,
    default: null, // 是否只显示首页游戏
  },
})

const games = ref(gameData)

// 过滤游戏的计算属性
const filteredGames = computed(() => {
  let filtered = games.value

  // 根据过滤类型进行过滤
  if (props.filterType) {
    switch (props.filterType) {
      case 'updated':
        filtered = filtered.filter(
          (game) => Array.isArray(game.badges) && game.badges.includes('updated')
        )
        break
      case 'hot':
        filtered = filtered.filter(
          (game) => Array.isArray(game.badges) && game.badges.includes('hot')
        )
        break
      case 'new':
        filtered = filtered.filter(
          (game) => Array.isArray(game.badges) && game.badges.includes('new')
        )
        break
      case 'detail':
        filtered = filtered.filter((game) => game.isDetail)
        break
    }
  }

  // 根据 isHot 过滤
  if (props.isHot !== null) {
    filtered = filtered.filter((game) => game.isHot === props.isHot)
  }

  // 根据 isNew 过滤
  if (props.isNew !== null) {
    filtered = filtered.filter((game) => game.isNew === props.isNew)
  }

  // 根据 isHome 过滤
  if (props.isHome !== null) {
    filtered = filtered.filter((game) => game.isHome === props.isHome)
  }

  // 根据分类进行过滤
  // category 是分类的 id (字符串)，null 表示显示所有游戏
  // games 中的 categories 字段引用 categoriesGames 中的 id 值
  if (props.category !== null && props.category !== undefined) {
    filtered = filtered.filter((game) => {
      if (!game.categories) return false
      // game.categories 是字符串数组，引用 categoriesGames 中的 id
      return game.categories.includes(props.category)
    })
  }

  // 限制显示数量
  if (props.maxItems) {
    filtered = filtered.slice(0, props.maxItems)
  }

  return filtered
})

// 导航到游戏详情页
const navigateToGame = (game) => {
  router.push({ name: 'game-detail', params: { addressBar: game.addressBar } })
}
</script>

<style scoped>
.game-grid-container {
  margin-bottom: 4rem;
}

.category-header {
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.category-header-left {
  display: flex;
  flex-direction: column;
}

.category-title {
  color: var(--color-text-primary);
  font-size: 1.5rem;
  margin-bottom: 0;
}

.category-description {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.more-link {
  color: var(--color-accent);
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(248, 191, 36, 0.35);
  transition: all 0.2s ease;
  white-space: nowrap;
  font-size: 0.9rem;
  box-shadow: 0 10px 18px rgba(249, 115, 22, 0.2);
}

.more-link:hover {
  background: rgba(30, 25, 18, 0.85);
  border-color: rgba(248, 191, 36, 0.6);
  color: var(--color-accent-strong);
  box-shadow: 0 14px 24px rgba(249, 115, 22, 0.35);
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
}

.game-card {
  background: rgba(15, 23, 42, 0.82);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(248, 191, 36, 0.18);
  position: relative;
  cursor: pointer;
  box-shadow: 0 16px 30px rgba(5, 5, 5, 0.55);
  backdrop-filter: blur(6px);
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
  font-size: 0.7rem;
  line-height: 1;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.badge-updated {
  background: linear-gradient(135deg, rgba(248, 191, 36, 0.88), rgba(249, 115, 22, 0.88));
}

.badge-hot {
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.85), rgba(248, 191, 36, 0.85));
}

.badge-new {
  background: linear-gradient(135deg, rgba(72, 187, 255, 0.85), rgba(56, 189, 248, 0.85));
}

.game-card:hover {
  transform: translateY(-6px);
  border-color: rgba(248, 191, 36, 0.6);
  box-shadow: 0 18px 32px rgba(249, 115, 22, 0.35);
  background: rgba(30, 25, 18, 0.95);
}

/* 小卡片样式 */
.game-card-small {
  grid-column: span 1;
  grid-row: span 1;
}

/* 大卡片样式 */
.game-card-large {
  grid-column: span 2;
  grid-row: span 2;
}

.game-card-large .game-image {
  aspect-ratio: 1/1;
}

.game-card-large:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 32px rgba(249, 115, 22, 0.35);
  border-color: rgba(248, 191, 36, 0.6);
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
  padding: 0.8rem;
  font-size: 0.85rem;
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

.game-card-large .game-title {
  font-size: 1.1rem;
  padding: 1.2rem;
  font-weight: 700;
}

/* iPad端 - 1024px */
@media (max-width: 1024px) {
  .games-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .category-header {
    margin-bottom: 20px;
  }

  .category-title {
    font-size: 28px;
  }

  .category-description {
    font-size: 16px;
  }

  .game-title {
    font-size: 14px;
    padding: 12px;
  }

  .game-card-large .game-title {
    font-size: 16px;
    padding: 14px;
  }

  .game-grid-container {
    margin-bottom: 40px;
  }
}

/* 移动端 - 768px */
@media (max-width: 768px) {
  .game-grid-container {
    margin-bottom: 20px;
  }

  .category-header {
    margin-bottom: 10px;
    gap: 10px;
  }

  .category-title {
    font-size: 20px;
    line-height: 1.2;
    margin-bottom: 0;
  }

  .category-description {
    font-size: 12px;
    line-height: 1.2;
    margin-top: 10px;
  }

  .more-link {
    padding: 6px 10px;
    font-size: 12px;
    line-height: 1.2;
  }

  .games-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .game-card-large {
    grid-column: span 1;
    grid-row: span 1;
  }

  .badge {
    font-size: 10px;
    padding: 3px 6px;
    line-height: 1.2;
  }

  .game-title {
    font-size: 12px;
    line-height: 1.2;
    padding: 10px;
  }

  .game-card-large .game-title {
    font-size: 12px;
    line-height: 1.2;
    padding: 10px;
  }
}
</style>

