<template>
  <div class="login-container">
    <div class="login-box">
      <h2>管理员登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">用户名</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            required 
            placeholder="请输入用户名"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            placeholder="请输入密码"
          />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { adminAPI } from '@/services/api.js'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (loading.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    const response = await adminAPI.login({
      username: username.value,
      password: password.value
    })
    
    localStorage.setItem('adminToken', response.token)
    router.push('/admin/dashboard')
  } catch (err) {
    error.value = err.message || '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffeef8, #f0e8ff, #e8f4ff);
}

.login-box {
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(255, 158, 197, 0.3);
  width: 100%;
  max-width: 400px;
  border: 2px solid #ff9ec5;
}

.login-box h2 {
  margin: 0 0 24px 0;
  color: #ff9ec5;
  text-align: center;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #5a4a5f;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ff9ec5;
  border-radius: 12px;
  box-sizing: border-box;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #5a4a5f;
}

.form-group input:focus {
  outline: none;
  border-color: #c084fc;
  box-shadow: 0 0 0 3px rgba(255, 158, 197, 0.2);
}

button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #ff9ec5, #c084fc);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  margin-top: 8px;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 158, 197, 0.4);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #ff6b9d;
  margin-top: 12px;
  text-align: center;
  font-size: 0.9rem;
}
</style>


