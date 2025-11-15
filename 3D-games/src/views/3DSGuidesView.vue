<template>
  <div class="app-container">
    <main class="main-content">
      <div class="page-layout">
        <!-- 左侧分类导航 -->
        <SidebarNav />

        <!-- 右侧主要内容 -->
        <div class="content-area">
          <!-- Hero Section -->
          <section class="hero-section">
            <div class="hero-content">
              <div class="hero-badge">
                <span class="badge-text">NINTENDO</span>
                <span class="badge-accent">3DS</span>
              </div>
              <h1 class="title-main">Best 3DS Games Recommendations</h1>
              <h2 class="title-subtitle">Curated Best 3DS Games for Stereoscopic 3D Adventure</h2>
              <p class="hero-description">
                Explore the finest collection of Nintendo 3DS games, from epic RPGs and thrilling action-adventure titles to puzzle games and platformers. Our carefully curated guides help you master every challenge, unlock hidden secrets, and fully experience the magic of glasses-free 3D gaming. Whether you're seeking timeless classics or discovering new favorites, find comprehensive walkthroughs, expert strategies, and detailed tips to enhance your 3DS gaming journey.
              </p>
              <div class="hero-features">
                <div class="feature-item">
                  <span class="feature-icon">🎮</span>
                  <span class="feature-text">RPG & Action</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">⚔️</span>
                  <span class="feature-text">Adventure</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">✨</span>
                  <span class="feature-text">3D Experience</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📚</span>
                  <span class="feature-text">Complete Guides</span>
                </div>
              </div>
              <div class="hero-stats">
                <div class="stat-box">
                  <div class="stat-number">{{ allGames.length }}+</div>
                  <div class="stat-label">Game Guides</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-box">
                  <div class="stat-number">{{ allGames.length }}</div>
                  <div class="stat-label">Game Titles</div>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-box">
                  <div class="stat-number">100%</div>
                  <div class="stat-label">Comprehensive</div>
                </div>
              </div>
            </div>
          </section>

          <!-- All Games -->
          <section v-if="allGames.length > 0" class="featured-section">
            <div class="section-header">
              <div class="section-header-left">
                <div class="section-icon">⭐</div>
                <div>
                  <h2 class="section-title">All 3DS Games</h2>
                  <p class="section-subtitle">Complete guides for all Nintendo 3DS games</p>
                </div>
              </div>
            </div>
            <div class="featured-showcase">
              <div
                v-for="(game, index) in allGames"
                :key="game.id"
                :class="['featured-card', `card-${(index % 3) + 1}`]"
                @click="navigateToGuide(game.addressBar)"
              >
                <div class="card-glow"></div>
                <div class="card-image-wrapper">
                  <img
                    :src="game.imageUrl"
                    :alt="game.imageAlt || game.title"
                    class="card-image"
                  />
                  <div class="card-gradient-overlay"></div>
                  <div class="card-overlay-content">
                    <div class="rating-badge-large">
                      <span class="rating-icon">★</span>
                      <span class="rating-value">{{ game.rating }}</span>
                    </div>
                    <div class="card-badges-top">
                             <span
                               v-for="tag in game.tags"
                               :key="tag"
                               :class="['badge', `badge-${tag}`]"
                             >{{ formatTagNameForList(tag) }}</span>
                    </div>
                  </div>
                </div>
                <div class="card-content">
                  <h3 class="card-title">{{ game.title }}</h3>
                  <p class="card-description">{{ game.description }}</p>
                  <div class="card-footer">
                    <div class="card-stats">
                      <div class="stat-item">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span>{{ game.developer }}</span>
                      </div>
                    </div>
                    <div class="card-action">
                      <span class="action-text">View Guide</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SidebarNav from '@/components/SidebarNav.vue'
import { nintendo3DSGames } from '@/data/3dsGames.js'

const router = useRouter()

const allGames = ref(nintendo3DSGames)

function formatTagNameForList(tag) {
  const tagMap = {
    featured: 'Featured',
    popular: 'Hot',
    new: 'New',
    classic: 'Classic'
  }
  return tagMap[tag] || tag.charAt(0).toUpperCase() + tag.slice(1)
}

function navigateToGuide(addressBar) {
  router.push({ name: '3ds-game-detail', params: { addressBar } })
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  margin: 20px 0 64px 0;
  padding: 40px 0;
  background-image: url(/images/3ds-bg.webp);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  border-radius: 20px;
  box-shadow: 
    0 32px 64px rgba(5, 5, 5, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(30, 41, 59, 0.55) 0%,
    rgba(15, 23, 42, 0.6) 30%,
    rgba(51, 65, 85, 0.68) 70%,
    rgba(30, 41, 59, 0.55) 100%
  );
  backdrop-filter: blur(4px);
  z-index: 1;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px 15px;
  background: rgba(15, 23, 42, 0.85);
  border: 2px solid rgba(96, 165, 250, 0.6);
  border-radius: 20px;
  margin-bottom: 20px;
  backdrop-filter: blur(12px);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.badge-text {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.badge-accent {
  font-size: 16px;
  font-weight: 800;
  color: #60a5fa;
  letter-spacing: 2px;
  text-shadow: 
    0 0 20px rgba(96, 165, 250, 0.6),
    0 2px 8px rgba(0, 0, 0, 0.5);
}

h1.title-main {
  font-size: 64px;
  font-weight: 900;
  color: #93c5fd;
  letter-spacing: -1.5px;
  line-height: 1.2;
  text-shadow: 
    0 0 40px rgba(147, 197, 253, 0.7),
    0 0 80px rgba(96, 165, 250, 0.5),
    0 4px 24px rgba(0, 0, 0, 0.8),
    0 8px 40px rgba(0, 0, 0, 0.6);
  filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.7));
  position: relative;
  margin: 0 0 12px 0;
  padding: 0;
  border: none;
}

h2.title-subtitle {
  font-size: 20px;
  font-weight: 600;
  color: rgba(147, 197, 253, 0.9);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-shadow: 
    0 2px 12px rgba(0, 0, 0, 0.6),
    0 4px 20px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(147, 197, 253, 0.3);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
  margin: 0 0 24px 0;
  padding: 0;
  border: none;
}

.hero-description {
  font-size: 17px;
  line-height: 1.85;
  color: rgba(255, 255, 255, 0.92);
  margin: 0 auto 32px;
  max-width: 880px;
  text-shadow: 
    0 2px 10px rgba(0, 0, 0, 0.6),
    0 1px 4px rgba(0, 0, 0, 0.4);
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.5));
  font-weight: 400;
  position: relative;
  z-index: 2;
  isolation: isolate;
}

.hero-features {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(15, 23, 42, 0.7);
  border: 1.5px solid rgba(59, 130, 246, 0.4);
  border-radius: 24px;
  backdrop-filter: blur(12px);
  box-shadow: 
    0 8px 16px rgba(5, 5, 5, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-item:hover {
  border-color: rgba(59, 130, 246, 0.6);
  background: rgba(15, 23, 42, 0.85);
  box-shadow: 
    0 12px 24px rgba(59, 130, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 20px;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.feature-text {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
  text-shadow: 
    0 1px 4px rgba(0, 0, 0, 0.5),
    0 0 8px rgba(147, 197, 253, 0.2);
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 28px 44px;
  background: rgba(15, 23, 42, 0.75);
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 20px;
  backdrop-filter: blur(16px);
  box-shadow: 
    0 16px 32px rgba(5, 5, 5, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.stat-number {
  font-size: 48px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1;
  text-shadow: 
    0 0 20px rgba(147, 197, 253, 0.5),
    0 4px 16px rgba(0, 0, 0, 0.6),
    0 2px 8px rgba(96, 165, 250, 0.4);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
  letter-spacing: -1px;
}

.stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 600;
  text-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.5),
    0 1px 4px rgba(0, 0, 0, 0.4);
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: linear-gradient(180deg, transparent, rgba(96, 165, 250, 0.5), transparent);
  box-shadow: 0 0 8px rgba(96, 165, 250, 0.4);
}

/* Section Header */
.section-header {
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.section-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.section-icon {
  font-size: 32px;
  line-height: 1;
  filter: drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3));
}

.section-title {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 4px;
  color: var(--color-text-primary);
  letter-spacing: -0.5px;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 14px;
  color: var(--color-text-muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Featured Section */
.featured-section {
  margin-bottom: 64px;
}

.featured-showcase {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.featured-card {
  position: relative;
  background: rgba(15, 23, 42, 0.9);
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid rgba(59, 130, 246, 0.25);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 40px rgba(5, 5, 5, 0.5), inset 0 1px 0 rgba(59, 130, 246, 0.15);
  isolation: isolate;
}

.featured-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(59, 130, 246, 0.5);
}


.card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}


.card-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(5, 5, 5, 0.7) 100%);
  opacity: 0.8;
}

.card-overlay-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  z-index: 2;
}

.rating-badge-large {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: rgba(5, 5, 5, 0.95);
  border-radius: 24px;
  border: 2px solid rgba(59, 130, 246, 0.6);
  backdrop-filter: blur(12px);
  align-self: flex-end;
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
  line-height: 1;
}

.card-badges-top {
  display: flex;
  gap: 8px;
  align-self: flex-start;
}

.badge {
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  backdrop-filter: blur(10px);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 8px rgba(5, 5, 5, 0.5);
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

.card-content {
  padding: 20px;
  background: rgba(15, 23, 42, 0.95);
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--color-text-primary);
  line-height: 1.3;
  letter-spacing: -0.3px;
}

.card-description {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid rgba(59, 130, 246, 0.2);
  gap: 16px;
}

.card-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.stat-item svg {
  color: #60a5fa;
  flex-shrink: 0;
}

.card-action {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25), rgba(34, 211, 238, 0.25));
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: 12px;
  color: #60a5fa;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s;
}

.featured-card:hover .card-action {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.35), rgba(34, 211, 238, 0.35));
  border-color: rgba(59, 130, 246, 0.6);
  transform: translateX(4px);
}

.action-text {
  white-space: nowrap;
}

.card-action svg {
  transition: transform 0.3s;
}

.featured-card:hover .card-action svg {
  transform: translateX(2px);
}


/* Empty State */
.empty-section {
  padding: 64px 32px;
  text-align: center;
}

.empty-content {
  color: var(--color-text-secondary);
}

.empty-content svg {
  margin-bottom: 16px;
  color: var(--color-text-muted);
  opacity: 0.5;
}

.empty-content h3 {
  font-size: 24px;
  margin-bottom: 8px;
  color: var(--color-text-primary);
}

.empty-content p {
  font-size: 16px;
  color: var(--color-text-secondary);
}

/* iPad端 - 1024px */
@media (max-width: 1024px) {
  .hero-section {
    padding: 50px 32px;
  }

  h1.title-main {
    font-size: 48px;
    line-height: 1.15;
    margin-bottom: 10px;
  }

  h2.title-subtitle {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .hero-description {
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 28px;
  }

  .hero-features {
    gap: 16px;
    margin-bottom: 28px;
  }

  .feature-item {
    padding: 8px 16px;
    font-size: 13px;
  }

  .feature-icon {
    font-size: 18px;
  }

  .feature-text {
    font-size: 13px;
  }

  .hero-stats {
    gap: 28px;
    padding: 24px 36px;
    flex-wrap: wrap;
  }

  .stat-divider {
    height: 40px;
  }

  .stat-number {
    font-size: 40px;
  }

  .stat-label {
    font-size: 13px;
  }

  .featured-showcase {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;
  }

  .section-title {
    font-size: 32px;
  }
}

/* 移动端 - 768px */
@media (max-width: 768px) {
  .hero-section {
    padding: 40px 20px;
    margin-bottom: 48px;
    border-radius: 20px;
  }

  .hero-badge {
    padding: 6px 16px;
    margin-bottom: 20px;
  }

  .badge-text {
    font-size: 9px;
    letter-spacing: 1.5px;
  }

  .badge-accent {
    font-size: 12px;
    letter-spacing: 0.5px;
  }

  h1.title-main {
    font-size: 32px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  h2.title-subtitle {
    font-size: 14px;
    letter-spacing: 1px;
    margin-bottom: 18px;
  }

  .hero-description {
    font-size: 14px;
    line-height: 1.75;
    margin-bottom: 24px;
  }

  .hero-features {
    gap: 10px;
    margin-bottom: 24px;
    justify-content: center;
  }

  .feature-item {
    padding: 6px 12px;
    border-radius: 18px;
  }

  .feature-icon {
    font-size: 16px;
  }

  .feature-text {
    font-size: 11px;
  }

  .hero-stats {
    flex-direction: column;
    gap: 16px;
    padding: 20px 24px;
  }

  .stat-divider {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.5), transparent);
    box-shadow: 0 0 8px rgba(96, 165, 250, 0.4);
  }

  .stat-number {
    font-size: 32px;
  }

  .stat-label {
    font-size: 11px;
    letter-spacing: 1px;
  }

  .section-header {
    margin-bottom: 24px;
  }

  .section-icon {
    font-size: 24px;
  }

  .section-title {
    font-size: 28px;
  }

  .section-subtitle {
    font-size: 12px;
  }

  .featured-section {
    margin-bottom: 48px;
  }

  .featured-showcase {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .card-image-wrapper {
    aspect-ratio: 16 / 9;
  }

  .card-content {
    padding: 20px;
  }

  .card-title {
    font-size: 20px;
  }

  .card-description {
    font-size: 13px;
    -webkit-line-clamp: 2;
    line-clamp: 2;
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .card-stats {
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>

