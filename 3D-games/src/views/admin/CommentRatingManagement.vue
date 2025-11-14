<template>
  <div class="admin-dashboard">
    <div class="admin-header">
      <div class="admin-info">
        <h1>管理后台</h1>
        <div class="admin-details">
          <span class="admin-name">欢迎，{{ adminInfo.username }}</span>
          <span class="project-info">项目：{{ adminInfo.project }}</span>
        </div>
      </div>
      <div class="admin-actions">
        <button @click="logout" class="logout-btn">退出登录</button>
      </div>
    </div>

    <div class="admin-content">
      <div class="admin-sidebar">
        <nav class="admin-menu">
          <div class="menu-item active">
            <span class="menu-icon">💬</span>
            <span class="menu-text">评论管理</span>
          </div>
        </nav>
      </div>

      <div class="admin-main">
        <div class="content-header">
          <h2>游戏评论与评分</h2>
          <div class="stats-summary">
            <div class="stat-item">
              <span class="stat-number">{{ totalGames }}</span>
              <span class="stat-label">游戏</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalReviews }}</span>
              <span class="stat-label">评论</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalRatings }}</span>
              <span class="stat-label">评分</span>
            </div>
          </div>
        </div>

        <div v-if="loading" class="loading">正在加载数据...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else class="games-list">
          <div v-if="Object.keys(gameData).length === 0" class="no-data">
            <p>暂无游戏数据。</p>
          </div>
          
          <div v-for="(data, pageId) in gameData" :key="pageId" class="game-card">
            <div class="game-header">
              <div class="game-info">
                <h3 class="game-title">{{ getGameTitle(pageId) }}</h3>
                <div class="game-stats">
                  <span class="rating-avg">平均：{{ calculateAverage(data.ratings) }}</span>
                  <span class="rating-count">{{ calculateTotal(data.ratings) }} 评分</span>
                  <span class="comment-count">{{ data.comments.length }} 评论</span>
                </div>
              </div>
              <button @click="openAddModal(pageId)" class="add-review-btn">+ 添加评论</button>
            </div>

            <div class="reviews-list">
              <div v-if="data.comments.length === 0" class="no-reviews">暂无评论</div>
              <div v-else>
                <div v-for="comment in data.comments" :key="comment.id" class="review-item">
                  <div class="review-content">
                    <div class="review-header">
                      <span class="reviewer-name">{{ comment.name }}</span>
                      <span class="review-time">{{ formatTime(comment.timestamp) }}</span>
                    </div>
                    <div v-if="comment.rating" class="review-rating">
                      <div class="rating-stars">
                        <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= comment.rating }">★</span>
                      </div>
                      <span class="rating-value">{{ comment.rating }}/5</span>
                    </div>
                    <div class="review-text">{{ comment.text }}</div>
                  </div>
                  <div class="review-actions">
                    <button @click="openEditModal(pageId, comment)" class="edit-btn">编辑</button>
                    <button @click="deleteReview(pageId, comment.id)" class="delete-btn">删除</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ isEditing ? '编辑评论' : '添加评论' }}</h3>
          <button @click="closeModal" class="close-btn">×</button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label>游戏：{{ getGameTitle(currentPageId) }}</label>
          </div>
          
          <div class="form-group">
            <label for="reviewer-name">姓名 *</label>
            <input id="reviewer-name" v-model="modalForm.name" type="text" placeholder="请输入评论者姓名" required />
          </div>
          
          <div class="form-group">
            <label for="review-rating">评分 *</label>
            <div class="rating-input">
              <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= modalForm.rating }" @click="modalForm.rating = n">{{ n <= modalForm.rating ? '★' : '☆' }}</span>
            </div>
            <span class="rating-selected">{{ modalForm.rating }}/5 星</span>
          </div>
          
          <div class="form-group">
            <label for="review-text">评论内容 *</label>
            <textarea id="review-text" v-model="modalForm.text" rows="4" placeholder="请输入评论内容" required></textarea>
          </div>
          
          <div class="form-group">
            <label for="review-time">评论时间</label>
            <input id="review-time" v-model="modalForm.timestamp" type="datetime-local" :placeholder="getCurrentDateTime()" />
            <small class="form-hint">不选择则使用当前时间</small>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeModal" class="cancel-btn">取消</button>
          <button @click="saveReview" class="save-btn" :disabled="!isFormValid">{{ isEditing ? '更新' : '添加' }}评论</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { adminAPI } from '@/services/api.js'
import { games } from '@/data/games.js'

const router = useRouter()

const loading = ref(true)
const error = ref('')
const gameData = ref({})
const showModal = ref(false)
const isEditing = ref(false)
const currentPageId = ref('')
const currentCommentId = ref(null)

const adminInfo = ref({
  username: 'admin',
  project: '3D Games'
})

const modalForm = ref({
  name: '',
  rating: 0,
  text: '',
  timestamp: ''
})

const totalGames = computed(() => Object.keys(gameData.value).length)

const totalReviews = computed(() => {
  return Object.values(gameData.value).reduce((total, data) => {
    return total + data.comments.length
  }, 0)
})

const totalRatings = computed(() => {
  return Object.values(gameData.value).reduce((total, data) => {
    return total + calculateTotal(data.ratings)
  }, 0)
})

const isFormValid = computed(() => {
  return modalForm.value.name.trim() && 
         modalForm.value.rating > 0 && 
         modalForm.value.text.trim()
})

const fetchGameData = async () => {
  try {
    loading.value = true
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }
    
    const data = await adminAPI.getAllGameData(token)
    gameData.value = data || {}
    
    // 从token中获取用户名
    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]))
      if (tokenData.username) {
        adminInfo.value.username = tokenData.username
      }
    } catch (e) {
      // 忽略解析错误
    }
  } catch (err) {
    error.value = '加载数据失败：' + err.message
  } finally {
    loading.value = false
  }
}

const getGameTitle = (pageId) => {
  const game = games.find(g => g.addressBar === pageId)
  return game ? game.title : pageId || '未知游戏'
}

const getCurrentDateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

const calculateAverage = (ratings) => {
  const total = calculateTotal(ratings)
  if (total === 0) return '0.0'
  
  const sum = Object.entries(ratings).reduce((acc, [rating, count]) => {
    return acc + (parseInt(rating) * count)
  }, 0)
  
  return (sum / total).toFixed(1)
}

const calculateTotal = (ratings) => {
  return Object.values(ratings).reduce((total, count) => total + count, 0)
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const openAddModal = (pageId) => {
  currentPageId.value = pageId
  isEditing.value = false
  currentCommentId.value = null
  modalForm.value = {
    name: '',
    rating: 0,
    text: '',
    timestamp: getCurrentDateTime()
  }
  showModal.value = true
}

const openEditModal = (pageId, comment) => {
  currentPageId.value = pageId
  isEditing.value = true
  currentCommentId.value = comment.id
  
  let formattedTime = ''
  if (comment.timestamp) {
    const date = new Date(comment.timestamp)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    formattedTime = `${year}-${month}-${day}T${hours}:${minutes}`
  } else {
    formattedTime = getCurrentDateTime()
  }
  
  modalForm.value = {
    name: comment.name,
    rating: comment.rating || 0,
    text: comment.text,
    timestamp: formattedTime
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  modalForm.value = {
    name: '',
    rating: 0,
    text: '',
    timestamp: ''
  }
}

const saveReview = async () => {
  if (!isFormValid.value) return
  
  try {
    const token = localStorage.getItem('adminToken')
    
    let finalTimestamp
    if (modalForm.value.timestamp && modalForm.value.timestamp.trim()) {
      finalTimestamp = new Date(modalForm.value.timestamp).toISOString()
    } else {
      finalTimestamp = new Date().toISOString()
    }
    
    const reviewData = {
      pageId: currentPageId.value,
      name: modalForm.value.name.trim(),
      text: modalForm.value.text.trim(),
      rating: modalForm.value.rating > 0 ? modalForm.value.rating : null,
      timestamp: finalTimestamp
    }
    
    if (isEditing.value) {
      await adminAPI.updateFeedback(currentPageId.value, currentCommentId.value, reviewData, token)
    } else {
      await adminAPI.addManualFeedback(reviewData, token)
    }
    
    closeModal()
    await fetchGameData()
  } catch (err) {
    alert('保存评论失败：' + err.message)
  }
}

const deleteReview = async (pageId, commentId) => {
  if (!confirm('确定要删除这条评论吗？')) return
  
  try {
    const token = localStorage.getItem('adminToken')
    await adminAPI.deleteFeedback(pageId, commentId, token)
    await fetchGameData()
  } catch (err) {
    alert('删除评论失败：' + err.message)
  }
}

const logout = () => {
  localStorage.removeItem('adminToken')
  router.push('/admin/login')
}

onMounted(() => {
  fetchGameData()
})
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #ffeef8, #f0e8ff, #e8f4ff);
}

.admin-header {
  background: linear-gradient(135deg, #ff9ec5, #c084fc);
  color: white;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 15px rgba(255, 158, 197, 0.3);
}

.admin-info h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.admin-details {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.95;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: white;
  color: #ff9ec5;
}

.admin-content {
  display: flex;
  min-height: calc(100vh - 100px);
}

.admin-sidebar {
  width: 250px;
  background: rgba(255, 255, 255, 0.95);
  border-right: 2px solid #ff9ec5;
  padding: 1.5rem 0;
}

.admin-menu {
  padding: 0 1rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-item.active {
  background: linear-gradient(135deg, #ff9ec5, #c084fc);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 158, 197, 0.3);
}

.menu-item:hover:not(.active) {
  background: rgba(255, 158, 197, 0.1);
}

.menu-icon {
  font-size: 1.5rem;
}

.menu-text {
  font-weight: 600;
}

.admin-main {
  flex: 1;
  padding: 2rem;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.content-header h2 {
  margin: 0;
  color: #ff9ec5;
  font-size: 2rem;
  font-weight: 700;
}

.stats-summary {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem 1.5rem;
  border-radius: 16px;
  border: 2px solid #ff9ec5;
}

.stat-number {
  display: block;
  font-size: 2.2rem;
  font-weight: 700;
  color: #ff9ec5;
}

.stat-label {
  font-size: 0.85rem;
  color: #8b7b9a;
  font-weight: 600;
}

.games-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.game-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  border: 2px solid #ff9ec5;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(255, 158, 197, 0.2);
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: rgba(255, 240, 248, 0.8);
  border-bottom: 2px solid #ff9ec5;
}

.game-title {
  margin: 0;
  color: #ff9ec5;
  font-size: 1.4rem;
  font-weight: 700;
}

.game-stats {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #8b7b9a;
}

.add-review-btn {
  background: linear-gradient(135deg, #ff9ec5, #c084fc);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.add-review-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 158, 197, 0.4);
}

.reviews-list {
  padding: 1.5rem;
}

.no-reviews {
  text-align: center;
  color: #8b7b9a;
  font-style: italic;
  padding: 2rem;
}

.review-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.2rem;
  border: 2px solid rgba(255, 158, 197, 0.3);
  border-radius: 16px;
  margin-bottom: 1rem;
  background: rgba(255, 240, 248, 0.5);
}

.review-content {
  flex: 1;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.reviewer-name {
  font-weight: 600;
  color: #ff9ec5;
}

.review-time {
  font-size: 0.85rem;
  color: #8b7b9a;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.rating-stars .star {
  color: #e0d4e8;
  font-size: 1.1rem;
}

.rating-stars .star.filled {
  color: #ff9ec5;
}

.rating-value {
  font-size: 0.85rem;
  color: #8b7b9a;
}

.review-text {
  color: #5a4a5f;
  line-height: 1.6;
}

.review-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.edit-btn, .delete-btn {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.3s;
}

.edit-btn {
  background: linear-gradient(135deg, #93c5fd, #c084fc);
  color: white;
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(147, 197, 253, 0.4);
}

.delete-btn {
  background: linear-gradient(135deg, #ff9ec5, #ff6b9d);
  color: white;
}

.delete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 158, 197, 0.4);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 24px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(255, 158, 197, 0.3);
  border: 2px solid #ff9ec5;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 2px solid #ff9ec5;
  background: rgba(255, 240, 248, 0.8);
  border-radius: 24px 24px 0 0;
}

.modal-header h3 {
  margin: 0;
  color: #ff9ec5;
  font-size: 1.4rem;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #ff9ec5;
  padding: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
}

.close-btn:hover {
  background: rgba(255, 158, 197, 0.2);
  transform: rotate(90deg);
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #5a4a5f;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ff9ec5;
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #5a4a5f;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #c084fc;
  box-shadow: 0 0 0 3px rgba(255, 158, 197, 0.2);
}

.form-hint {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #8b7b9a;
  font-style: italic;
}

.rating-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.rating-input .star {
  font-size: 1.8rem;
  cursor: pointer;
  color: #e0d4e8;
  transition: all 0.3s;
}

.rating-input .star.filled {
  color: #ff9ec5;
}

.rating-input .star:hover {
  transform: scale(1.2);
}

.rating-selected {
  font-size: 0.9rem;
  color: #c084fc;
  font-weight: 600;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 2px solid #ff9ec5;
  background: rgba(255, 240, 248, 0.5);
  border-radius: 0 0 24px 24px;
}

.cancel-btn, .save-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.cancel-btn {
  background: rgba(255, 158, 197, 0.2);
  color: #ff9ec5;
  border: 2px solid #ff9ec5;
}

.cancel-btn:hover {
  background: rgba(255, 158, 197, 0.3);
}

.save-btn {
  background: linear-gradient(135deg, #ff9ec5, #c084fc);
  color: white;
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 158, 197, 0.4);
}

.save-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading, .error, .no-data {
  text-align: center;
  padding: 3rem;
  color: #8b7b9a;
  font-size: 1.1rem;
}

.error {
  color: #ff6b9d;
}
</style>


