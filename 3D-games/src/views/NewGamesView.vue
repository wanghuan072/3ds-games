<template>
  <div class="app-container">
    <main class="main-content">
      <div class="page-layout">
        <SidebarNav />
        <div class="content-area">
          <section class="page-section">
            <div class="page-wrapper">
              <h1 class="title-h1">New Games</h1>
              <p class="page-description">Discover the latest additions to our game collection. Play the newest 3D games first!</p>
              
              <GameGrid
                :is-new="true"
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

