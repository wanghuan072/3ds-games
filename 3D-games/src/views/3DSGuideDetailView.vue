<template>
  <div class="app-container">
    <main class="main-content">
      <div class="page-layout">
        <!-- 左侧分类导航 -->
        <SidebarNav />

        <!-- 右侧主要内容 -->
        <div class="content-area">
          <!-- Loading State -->
          <div v-if="loading" class="loading-state">
            <div class="loading-spinner"></div>
            <p>Loading guide...</p>
          </div>

          <!-- Game Not Found -->
          <div v-else-if="!game" class="not-found-state">
            <h2>Game Not Found</h2>
            <p>The game guide you're looking for doesn't exist.</p>
            <router-link to="/3ds-games" class="back-button">Back to Guides</router-link>
          </div>

          <!-- Game Guide Content -->
          <div v-else class="guide-container">
            <!-- Game Header -->
            <section class="game-header">
              <div class="game-header-content">
                <div class="game-cover">
                  <img :src="game.imageUrl" :alt="game.imageAlt || game.title" />
                  <div class="cover-overlay">
                    <div class="rating-badge-large">
                      <span class="rating-icon">★</span>
                      <span class="rating-value">{{ game.rating }}</span>
                    </div>
                  </div>
                </div>
                <div class="game-info">
                  <h1 class="game-title">{{ game.title }}</h1>
                  <p class="game-description">{{ game.description }}</p>
                  <div class="game-meta">
                    <div class="meta-item">
                      <span class="meta-label">Release Date:</span>
                      <span class="meta-value">{{ formatGameDate(game.releaseDate) }}</span>
                    </div>
                    <div class="meta-item">
                      <span class="meta-label">Developer:</span>
                      <span class="meta-value">{{ game.developer }}</span>
                    </div>
                    <div class="meta-item">
                      <span class="meta-label">Publisher:</span>
                      <span class="meta-value">{{ game.publisher }}</span>
                    </div>
                  </div>
                  <div class="game-badges">
                    <span
                      v-for="tag in game.tags"
                      :key="tag"
                      :class="['badge', `badge-${tag}`]"
                    >{{ formatTagName(tag) }}</span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Guide Content -->
            <section class="guide-content-section">
              <div class="guide-content">
                <div class="details-html" v-html="game.detailsHtml"></div>
              </div>
            </section>

            <!-- Back Button -->
            <div class="back-section">
              <router-link to="/3ds-games" class="back-button">
                ← Back to All Guides
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SidebarNav from '@/components/SidebarNav.vue'
import { nintendo3DSGames } from '@/data/3dsGames.js'
import { formatDate, formatTagName } from '@/utils/helpers.js'

const route = useRoute()
const loading = ref(true)
const game = ref(null)

onMounted(async () => {
  const addressBar = route.params.addressBar
  game.value = nintendo3DSGames.find(game => game.addressBar === addressBar)
  
  setTimeout(() => {
    loading.value = false
  }, 300)
})

function formatGameDate(dateString) {
  return formatDate(dateString, 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 32px;
  color: var(--color-text-secondary);
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(248, 191, 36, 0.2);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Not Found State */
.not-found-state {
  text-align: center;
  padding: 64px 32px;
  color: var(--color-text-secondary);
}

.not-found-state h2 {
  font-size: 32px;
  margin-bottom: 16px;
  color: var(--color-text-primary);
}

.not-found-state p {
  font-size: 16px;
  margin-bottom: 24px;
}

/* Guide Container */
.guide-container {
    margin: 20px 0;
}

/* Game Header */
.game-header {
  margin-bottom: 32px;
  padding: 32px;
  background: linear-gradient(160deg, rgba(59, 130, 246, 0.12), rgba(8, 11, 19, 0.95)),
    radial-gradient(circle at top right, rgba(34, 211, 238, 0.1), transparent 60%);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.25);
  box-shadow: 0 24px 48px rgba(5, 5, 5, 0.55);
}

.game-header-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 32px;
  align-items: start;
}

.game-cover {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(59, 130, 246, 0.35);
  box-shadow: 0 16px 32px rgba(5, 5, 5, 0.6);
}

.game-cover img {
  width: 100%;
  height: auto;
  display: block;
}

.cover-overlay {
  position: absolute;
  top: 12px;
  right: 12px;
}

.rating-badge-large {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(5, 5, 5, 0.9);
  border-radius: 24px;
  border: 2px solid rgba(59, 130, 246, 0.6);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.4);
}

.rating-icon {
  color: #60a5fa;
  font-size: 20px;
  line-height: 1;
}

.rating-value {
  color: var(--color-text-primary);
  font-weight: 700;
  font-size: 18px;
}

.game-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.game-title {
  font-size: 36px;
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.2;
  margin: 0;
  letter-spacing: 0.3px;
}

.game-description {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
}

.game-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 20px;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-label {
  font-size: 12px;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.meta-value {
  font-size: 14px;
  color: var(--color-text-primary);
  font-weight: 500;
}

.game-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.badge-featured {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.95), rgba(34, 211, 238, 0.95));
  color: #ffffff;
}

.badge-popular {
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.95), rgba(59, 130, 246, 0.95));
  color: #ffffff;
}

.badge-new {
  background: linear-gradient(135deg, rgba(34, 211, 238, 0.95), rgba(59, 130, 246, 0.95));
  color: #ffffff;
}

.badge-classic {
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.95), rgba(59, 130, 246, 0.95));
  color: #ffffff;
}

/* Guide Content Section */
.guide-content-section {
  margin-bottom: 48px;
}

.guide-content {
  padding: 32px;
  background: rgba(15, 23, 42, 0.85);
  border-radius: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 20px 40px rgba(5, 5, 5, 0.45);
}

/* Back Section */
.back-section {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(59, 130, 246, 0.25);
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: 8px;
  color: var(--color-text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 8px 16px rgba(5, 5, 5, 0.35);
}

.back-button:hover {
  background: rgba(15, 23, 42, 0.95);
  border-color: rgba(59, 130, 246, 0.6);
  color: #60a5fa;
  transform: translateX(-4px);
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.35);
}

/* iPad端 - 1024px */
@media (max-width: 1024px) {
  .game-header-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .game-cover {
    max-width: 300px;
    margin: 0 auto;
  }

  .game-meta {
    grid-template-columns: 1fr;
  }
}

/* 移动端 - 768px */
@media (max-width: 768px) {
  .game-header {
    padding: 24px 20px;
    margin-bottom: 24px;
  }

  .game-title {
    font-size: 28px;
    line-height: 1.2;
  }

  .game-description {
    font-size: 14px;
    line-height: 1.6;
  }

  .guide-content-section {
    margin-bottom: 32px;
  }

  .guide-content {
    padding: 20px;
  }
}
</style>

