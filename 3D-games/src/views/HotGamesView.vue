<template>
  <div class="app-container">
    <main class="main-content">
      <div class="page-layout">
        <SidebarNav />
        <div class="content-area">
          <section class="page-section">
            <div class="page-wrapper">
              <h1 class="title-h1">Hot Games</h1>
              <p class="page-description">Check out the most popular and trending 3D games right now. These hot games are loved by players worldwide!</p>
              
              <GameGrid
                :is-hot="true"
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
import GameGrid from '@/components/GameGrid.vue'
import SidebarNav from '@/components/SidebarNav.vue'
</script>

<style scoped>
/* 样式已整合到 App.vue 全局样式 */
</style>

