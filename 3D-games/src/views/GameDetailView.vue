<template>
  <div class="app-container">
    <main class="main-content">
      <div class="page-layout" :class="{ 'page-fullscreen-layout': isPageFullscreen }">
        <!-- 左侧分类导航 -->
        <SidebarNav v-if="!isPageFullscreen" />

        <!-- 右侧主要内容 -->
        <div class="content-area">
          <div class="game-detail-wrapper">
            <!-- 加载态 -->
            <div v-if="loading" class="loading">Loading game...</div>

            <!-- 未找到 -->
            <div v-else-if="!game" class="not-found">
              <h2>Game Not Found</h2>
              <router-link to="/" class="back-link">Back to Home</router-link>
            </div>

            <!-- 详情主体 -->
            <div v-else class="layout" :class="{ 'page-fullscreen-layout': isPageFullscreen }">
              <!-- 左列：主内容 -->
              <section class="main" :class="{ 'page-fullscreen': isPageFullscreen }">
                <div class="player">
                  <!-- 预览蒙版（点击后显示 iframe） -->
                  <div v-if="!showGameplay" class="preview" @click="toggleGameplay">
                    <div class="preview-bg" :style="{ backgroundImage: `url(${game.imageUrl})` }">
                      <div class="preview-overlay">
                        <div class="icon">
                          <img :src="game.imageUrl" :alt="game.imageAlt || game.title" />
                        </div>
                        <button class="play">PLAY</button>
                      </div>
                    </div>
                  </div>

                  <!-- 游戏 iframe -->
                  <div v-else class="iframe-wrap">
                    <iframe
                      ref="gameIframe"
                      :src="game.iframeUrl"
                      title="game"
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>

                <!-- 操作栏 -->
                <div class="controls">
                  <div class="title">{{ game.title }}</div>
                  <div class="actions">
                    <button
                      class="btn"
                      :disabled="!showGameplay"
                      @click="toggleFullscreen"
                      title="Fullscreen"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <polyline points="9 21 3 21 3 15"></polyline>
                        <line x1="21" y1="3" x2="14" y2="10"></line>
                        <line x1="3" y1="21" x2="10" y2="14"></line>
                      </svg>
                    </button>
                    <button
                      class="btn"
                      :disabled="!showGameplay"
                      @click="togglePageFullscreen"
                      title="Page Fullscreen"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- About 内容 -->
                <article class="about">
                  <div class="details-html" v-html="game.detailsHtml"></div>
                </article>
              </section>

              <!-- 右列：评分/评论 -->
              <aside class="sidebar" v-if="!isPageFullscreen">
                <!-- 评分概览 -->
                <div class="panel">
                  <h3 class="panel-title">Rating Overview</h3>
                  <div v-if="loadingData" class="loading-text">Loading...</div>
                  <div v-else class="summary-row">
                    <div class="summary-score">{{ Number(averageRating).toFixed(1) }}</div>
                    <div class="summary-stars">
                      <span
                        v-for="n in 5"
                        :key="n"
                        class="star"
                        :class="{ filled: n <= Math.round(averageRating) }"
                        >★</span
                      >
                    </div>
                    <div class="summary-count">{{ ratingStats.count }} ratings</div>
                  </div>

                  <!-- 评分分布 -->
                  <div v-if="!loadingData && ratingStats.count > 0" class="rating-distribution">
                    <div v-for="n in 5" :key="n" class="rating-bar">
                      <span class="rating-label">{{ n }}★</span>
                      <div class="bar-container">
                        <div class="bar" :style="{ width: getRatingPercentage(n) + '%' }"></div>
                      </div>
                      <span class="rating-count">{{ getRatingCount(n) }}</span>
                    </div>
                  </div>
                  <div v-else-if="!loadingData && ratingStats.count === 0" class="no-ratings">
                    <p class="muted small">No rating data available</p>
                  </div>
                </div>

                <!-- 写评论 -->
                <div class="panel">
                  <h3 class="panel-title">Write Your Review</h3>
                  <div class="field">
                    <label class="label">Nickname <span class="req">*</span></label>
                    <input
                      class="input"
                      type="text"
                      v-model="form.nickname"
                      placeholder="Enter your nickname"
                    />
                  </div>
                  <div class="field">
                    <label class="label">Rating <span class="req">*</span></label>
                    <div class="stars-input">
                      <span
                        v-for="n in 5"
                        :key="n"
                        class="star"
                        :class="{
                          filled: n <= form.rating,
                          hover: n <= hoverRating && hoverRating > 0,
                        }"
                        @click="selectRating(n)"
                        @mouseenter="hoverRating = n"
                        @mouseleave="hoverRating = 0"
                        >{{ n <= (hoverRating || form.rating) ? '★' : '☆' }}</span
                      >
                    </div>
                    <div v-if="form.rating > 0" class="rating-selected">
                      Selected {{ form.rating }} star rating
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Comment <span class="req">*</span></label>
                    <textarea
                      class="textarea"
                      rows="4"
                      v-model="form.comment"
                      maxlength="1000"
                      placeholder="Share your thoughts..."
                    ></textarea>
                    <div class="hint">{{ form.comment.length }}/1000</div>
                  </div>
                  <button
                    class="btn wide"
                    @click="submitReview"
                    :disabled="submitting || !form.nickname || !form.comment || !form.rating"
                  >
                    {{ submitting ? 'Submitting...' : 'Submit Review' }}
                  </button>
                </div>

                <!-- 评论列表 -->
                <div class="panel">
                  <h3 class="panel-title">All Reviews ({{ reviews.length }})</h3>
                  <div v-if="loadingData" class="loading-text">Loading...</div>
                  <div v-else-if="reviews.length === 0" class="no-reviews">
                    No reviews yet, be the first to review!
                  </div>
                  <ul v-else class="reviews">
                    <li v-for="r in reviews" :key="r.id" class="review-item">
                      <div class="review-head">
                        <span class="review-name">{{ r.name }}</span>
                        <span class="review-date">{{ formatDate(r.timestamp) }}</span>
                      </div>
                      <div v-if="r.rating" class="review-rating">
                        <span class="review-rating-label">Rating:</span>
                        <div class="review-stars">
                          <span
                            v-for="n in 5"
                            :key="n"
                            class="star"
                            :class="{ filled: n <= r.rating }"
                            >★</span
                          >
                        </div>
                      </div>
                      <p class="review-text">{{ r.text }}</p>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import SidebarNav from '@/components/SidebarNav.vue'
import { games } from '@/data/games.js'
import { commentAPI, ratingAPI } from '@/services/api.js'

const route = useRoute()
const loading = ref(true)
const showGameplay = ref(false)
const isPageFullscreen = ref(false)
const gameIframe = ref(null)

const game = computed(() => games.find((g) => g.addressBar === route.params.addressBar))

const reviews = ref([])
const ratingStats = ref({ average: 0, count: 0, ratings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } })
const submitting = ref(false)
const loadingData = ref(false)
const form = ref({ nickname: '', rating: 0, comment: '' })
const hoverRating = ref(0)
const lastSubmitTime = ref(null)
const remainingTime = ref(0)
const canSubmit = ref(true)

const averageRating = computed(() => {
  const avg = ratingStats.value.average
  return typeof avg === 'number' ? avg : 0
})

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (e) {
    return dateString
  }
}

function getRatingCount(rating) {
  return ratingStats.value.ratings?.[String(rating)] || 0
}

function getRatingPercentage(rating) {
  const count = getRatingCount(rating)
  const total = ratingStats.value.count || 1
  return Math.round((count / total) * 100)
}

function checkCanSubmit() {
  if (!lastSubmitTime.value) {
    canSubmit.value = true
    return
  }
  const now = Date.now()
  const timeDiff = now - lastSubmitTime.value
  const oneMinute = 60 * 1000
  if (timeDiff >= oneMinute) {
    canSubmit.value = true
    remainingTime.value = 0
  } else {
    canSubmit.value = false
    remainingTime.value = Math.ceil((oneMinute - timeDiff) / 1000)
  }
}

let timer = null
function startTimer() {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    checkCanSubmit()
    if (canSubmit.value) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}

const loadData = async () => {
  if (!game.value) return
  loadingData.value = true
  try {
    const [commentsData, ratingsData] = await Promise.all([
      commentAPI.getComments(game.value.addressBar),
      ratingAPI.getRatings(game.value.addressBar),
    ])
    reviews.value = commentsData || []
    ratingStats.value = ratingsData || { average: 0, count: 0 }
  } catch (error) {
    console.error('加载数据失败:', error)
    reviews.value = []
    ratingStats.value = { average: 0, count: 0 }
  } finally {
    loadingData.value = false
  }
}

async function submitReview() {
  if (!form.value.nickname || !form.value.comment || !form.value.rating || submitting.value) return
  if (!canSubmit.value) {
    alert(`⏰ You can only submit once per minute. Please wait ${remainingTime.value} seconds.`)
    return
  }
  submitting.value = true
  try {
    const commentData = {
      pageId: game.value.addressBar,
      name: form.value.nickname,
      email: undefined,
      text: form.value.comment,
      rating: form.value.rating,
    }
    await commentAPI.submitComment(commentData)
    await loadData()
    lastSubmitTime.value = Date.now()
    checkCanSubmit()
    startTimer()
    form.value = { nickname: '', rating: 0, comment: '' }
    hoverRating.value = 0
    alert('Review and rating submitted successfully!')
  } catch (error) {
    alert('Submission failed: ' + error.message)
  } finally {
    submitting.value = false
  }
}

function selectRating(n) {
  form.value.rating = n
}

function toggleGameplay() {
  showGameplay.value = !showGameplay.value
  if (!showGameplay.value && isPageFullscreen.value) {
    exitPageFullscreen()
  }
}

function toggleFullscreen() {
  if (!gameIframe.value) return
  if (!document.fullscreenElement) {
    gameIframe.value.requestFullscreen?.().catch(() => {})
  } else {
    document.exitFullscreen?.()
  }
}

function togglePageFullscreen() {
  if (isPageFullscreen.value) {
    exitPageFullscreen()
  } else {
    enterPageFullscreen()
  }
}

async function enterPageFullscreen() {
  isPageFullscreen.value = true
  document.body.style.overflow = 'hidden'
  await nextTick()
  setTimeout(() => {
    if (gameIframe.value) {
      gameIframe.value.style.width = '100%'
      gameIframe.value.style.height = '100%'
      gameIframe.value.style.objectFit = 'contain'
    }
  }, 50)
}

async function exitPageFullscreen() {
  isPageFullscreen.value = false
  document.body.style.overflow = 'auto'
  await nextTick()
  setTimeout(() => {
    if (gameIframe.value) {
      gameIframe.value.style.width = '100%'
      gameIframe.value.style.height = '100%'
      gameIframe.value.style.objectFit = 'cover'
    }
  }, 50)
}

onMounted(async () => {
  setTimeout(() => (loading.value = false), 200)
  await loadData()
  checkCanSubmit()
})

onUnmounted(() => {
  if (isPageFullscreen.value) exitPageFullscreen()
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<style scoped>
/* 暗色系风格 */
.game-detail-wrapper {
  width: 100%;
  padding: 16px 0;
}

.loading,
.not-found {
  padding: 24px;
  text-align: center;
  color: var(--color-text-primary);
}

.not-found h2 {
  color: var(--color-text-primary);
  margin-bottom: 16px;
}

.back-link {
  color: var(--color-accent);
  text-decoration: none;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: var(--color-accent-strong);
  text-decoration: underline;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
}

.page-layout.page-fullscreen-layout {
  padding: 0;
}

.page-layout.page-fullscreen-layout .content-area {
  width: 100%;
}

.layout.page-fullscreen-layout {
  display: block;
}

/* 左列 */
.main {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 14px;
  padding: 24px;
  border: 1px solid rgba(248, 191, 36, 0.18);
  box-shadow: 0 24px 48px rgba(5, 5, 5, 0.55);
  backdrop-filter: blur(10px);
}

.player {
  border-radius: 12px;
  overflow: hidden;
  background: rgba(8, 11, 19, 0.9);
  border: 1px solid rgba(248, 191, 36, 0.18);
  box-shadow: inset 0 0 0 1px rgba(248, 191, 36, 0.08);
}

.preview {
  aspect-ratio: 16 / 9;
}

.preview-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.preview-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  backdrop-filter: blur(10px);
  background: linear-gradient(160deg, rgba(249, 115, 22, 0.35), rgba(8, 11, 19, 0.92));
}

.icon img {
  width: 96px;
  height: 96px;
  border-radius: 12px;
  object-fit: cover;
  background: rgba(15, 23, 42, 0.85);
  box-shadow: 0 12px 28px rgba(249, 115, 22, 0.35);
  border: 2px solid rgba(248, 191, 36, 0.45);
}

.play {
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: #050505;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(249, 115, 22, 0.45);
  transition: all 0.3s ease;
  letter-spacing: 0.4px;
}

.play:hover {
  transform: scale(1.05);
  box-shadow: 0 16px 32px rgba(248, 191, 36, 0.45);
  background: linear-gradient(135deg, #fbbf24, #fb923c);
}

.iframe-wrap {
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(5, 5, 5, 0.85);
  border-radius: 12px;
  overflow: hidden;
}

.iframe-wrap iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
  object-fit: contain;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: rgba(15, 23, 42, 0.7);
  border-radius: 10px;
  border: 1px solid rgba(248, 191, 36, 0.25);
  margin-top: 16px;
  box-shadow: 0 12px 24px rgba(5, 5, 5, 0.45);
}

.controls .title {
  font-weight: 600;
  color: var(--color-text-primary);
  font-size: 17.6px;
  letter-spacing: 0.3px;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  height: 40px;
  min-width: 40px;
  padding: 0 14px;
  border: 1px solid rgba(248, 191, 36, 0.4);
  background: rgba(15, 23, 42, 0.8);
  color: var(--color-accent);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 18px rgba(249, 115, 22, 0.25);
}

.btn:hover:not(:disabled) {
  background: rgba(30, 25, 18, 0.95);
  border-color: rgba(248, 191, 36, 0.65);
  color: var(--color-accent-strong);
  box-shadow: 0 14px 24px rgba(249, 115, 22, 0.35);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.about {
  margin-top: 20px;
  padding: 24px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(248, 191, 36, 0.18);
  box-shadow: 0 18px 32px rgba(5, 5, 5, 0.45);
}

.main.page-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  border-radius: 0;
  border: none;
  padding: 8px;
  width: 100vw;
  height: 100vh;
  background: rgba(5, 5, 5, 0.95);
}

.main.page-fullscreen .player,
.main.page-fullscreen .iframe-wrap {
  width: 100%;
  height: calc(100vh - 82px);
}

.layout.page-fullscreen-layout .sidebar {
  display: none !important;
}

/* 右列 */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.panel {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 12px;
  padding: 20px;
  color: var(--color-text-primary);
  border: 1px solid rgba(248, 191, 36, 0.2);
  box-shadow: 0 20px 36px rgba(5, 5, 5, 0.45);
}

.panel-title {
  margin: 0 0 12px 0;
  font-size: 17.6px;
  font-weight: 600;
  color: var(--color-text-primary);
}

.summary-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.summary-score {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-accent-strong);
}

.summary-count {
  color: var(--color-text-secondary);
  font-size: 14px;
}

.summary-stars .star,
.review-stars .star,
.stars-input .star {
  color: rgba(100, 116, 139, 0.5);
  transition: color 0.2s;
  font-size: 19.2px;
  cursor: pointer;
}

.summary-stars .star.filled,
.review-stars .star.filled,
.stars-input .star.filled {
  color: var(--color-accent);
}

.stars-input .star.hover {
  color: var(--color-accent-strong);
}

.field {
  margin-bottom: 12px;
}

.label {
  display: block;
  font-size: 14.4px;
  color: var(--color-text-primary);
  margin-bottom: 6px;
  font-weight: 500;
}

.req {
  color: #ef4444;
}

.input,
.textarea {
  width: 100%;
  border: 1px solid rgba(248, 191, 36, 0.3);
  border-radius: 8px;
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.6);
  color: var(--color-text-primary);
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 0 0 rgba(248, 191, 36, 0);
}

.input::placeholder,
.textarea::placeholder {
  color: var(--color-text-muted);
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: rgba(248, 191, 36, 0.6);
  background: rgba(15, 23, 42, 0.9);
  box-shadow: 0 0 0 3px rgba(248, 191, 36, 0.12);
}

.hint {
  text-align: right;
  font-size: 12px;
  color: var(--color-text-muted);
  margin-top: 4px;
}

.stars-input {
  display: flex;
  gap: 4px;
}

.rating-selected {
  margin-top: 6px;
  font-size: 13.6px;
  color: var(--color-accent-strong);
  font-weight: 500;
}

.review-item {
  border-top: 1px solid rgba(248, 191, 36, 0.16);
  padding-top: 16px;
  margin-top: 16px;
}

.review-item:first-child {
  border-top: none;
  padding-top: 0;
  margin-top: 0;
}

.review-head {
  display: flex;
  justify-content: space-between;
  font-size: 13.6px;
  color: var(--color-text-secondary);
  margin-bottom: 6px;
}

.review-name {
  color: var(--color-accent);
  font-weight: 600;
}

.review-date {
  color: var(--color-text-muted);
}

.review-text {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-top: 8px;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 6px 0;
  font-size: 13.6px;
}

.review-rating-label {
  color: var(--color-text-secondary);
}

.reviews {
  list-style: none;
  padding: 0;
  margin: 0;
}

.btn.wide {
  width: 100%;
  margin-top: 8px;
  padding: 12px;
  font-weight: 600;
  background: rgba(139, 92, 246, 0.3);
  color: #ffffff;
  border: 1px solid #8b5cf6;
}

.btn.wide:hover:not(:disabled) {
  background: rgba(139, 92, 246, 0.4);
  border-color: #a78bfa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.loading-text {
  text-align: center;
  color: #a0a0a0;
  padding: 20px;
}

.no-reviews,
.no-ratings {
  text-align: center;
  color: #a0a0a0;
  padding: 20px;
  font-style: italic;
}

.rating-distribution {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(139, 92, 246, 0.2);
}

.rating-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 13.6px;
}

.rating-label {
  width: 30px;
  color: #e0e0e0;
}

.bar-container {
  flex: 1;
  height: 10px;
  background: rgba(139, 92, 246, 0.2);
  border-radius: 10px;
  overflow: hidden;
}

.bar {
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #6366f1);
  transition: width 0.3s ease;
  border-radius: 10px;
}

.rating-count {
  width: 30px;
  text-align: right;
  color: #a0a0a0;
  font-size: 13.6px;
}

.muted {
  color: #a0a0a0;
}

.small {
  font-size: 13.6px;
}

/* iPad端 - 1024px */
@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .game-detail-wrapper {
    padding: 20px 0;
  }
}

/* 移动端 - 768px */
@media (max-width: 768px) {
  .game-detail-wrapper {
    padding: 20px 0;
  }

  .main {
    padding: 20px;
  }

  .controls {
    padding: 12px 16px;
    margin-top: 10px;
  }

  .controls .title {
    font-size: 16px;
    line-height: 1.2;
  }

  .btn {
    height: 36px;
    min-width: 36px;
    padding: 0 10px;
  }

  .about {
    margin-top: 10px;
    padding: 20px;
  }

  .sidebar {
    gap: 20px;
  }

  .panel {
    padding: 16px;
  }

  .panel-title {
    font-size: 16px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .summary-score {
    font-size: 20px;
  }

  .summary-count {
    font-size: 12px;
    line-height: 1.2;
  }

  .summary-stars .star,
  .review-stars .star,
  .stars-input .star {
    font-size: 16px;
  }

  .label {
    font-size: 12px;
    line-height: 1.2;
    margin-bottom: 6px;
  }

  .input,
  .textarea {
    padding: 10px 12px;
    font-size: 12px;
    line-height: 1.2;
  }

  .hint {
    font-size: 11px;
    margin-top: 6px;
  }

  .rating-selected {
    font-size: 12px;
    line-height: 1.2;
    margin-top: 6px;
  }

  .btn.wide {
    padding: 10px;
    font-size: 12px;
    line-height: 1.2;
    margin-top: 10px;
  }

  .review-item {
    padding-top: 10px;
    margin-top: 10px;
  }

  .review-head {
    font-size: 12px;
    line-height: 1.2;
    margin-bottom: 6px;
  }

  .review-text {
    font-size: 12px;
    line-height: 1.2;
    margin-top: 6px;
  }

  .review-rating {
    font-size: 12px;
    line-height: 1.2;
    margin: 6px 0;
  }

  .loading-text,
  .no-reviews,
  .no-ratings {
    padding: 16px;
    font-size: 12px;
    line-height: 1.2;
  }

  .rating-distribution {
    margin-top: 10px;
    padding-top: 10px;
  }

  .rating-bar {
    gap: 6px;
    margin-bottom: 6px;
    font-size: 12px;
    line-height: 1.2;
  }

  .rating-label {
    font-size: 12px;
  }

  .rating-count {
    font-size: 12px;
  }

  .muted,
  .small {
    font-size: 12px;
    line-height: 1.2;
  }
}
</style>

