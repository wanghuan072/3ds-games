<template>
  <main class="main-content">
    <div class="page-layout">
      <!-- 左侧分类导航 -->
      <SidebarNav />

      <!-- 右侧主要内容 -->
      <div class="content-area">
        <!-- 动态渲染所有分类 -->
        <section class="categories-section">
          <div class="categories-wrapper">
            <h1 class="title-h1">Featured 3D Games</h1>

            <div
              v-for="(category, index) in displayCategories"
              :key="category.id"
              class="category-block"
            >
              <!-- 在栏目中间插入广告，需要多个可复制下面 aside 并改 index 或 data-zoneid -->
              <!-- 1 -->
              <div
                v-if="index === 0 && !isMobile"
                style="
                  width: 100%;
                  padding: 20px 0;
                  text-align: center;
                  overflow: hidden;
                  display: flex;
                  justify-content: center;
                  gap: 20px;
                  align-items: center;
                "
              >
                <aside>
                  <ins class="eas6a97888e2" data-zoneid="5859702"></ins>
                </aside>
                <aside>
                  <ins class="eas6a97888e2" data-zoneid="5859736"></ins>
                </aside>
              </div>

              <!-- 2 -->
              <div
                v-if="index === 3 && !isMobile"
                style="
                  width: 100%;
                  padding: 20px 0;
                  text-align: center;
                  overflow: hidden;
                  display: flex;
                  justify-content: center;
                  gap: 20px;
                  align-items: center;
                "
              >
                <aside>
                  <ins class="eas6a97888e2" data-zoneid="5859702"></ins>
                </aside>
                <aside>
                  <ins class="eas6a97888e2" data-zoneid="5859736"></ins>
                </aside>
              </div>

              <!-- 3 -->
              <div
                v-if="index === 5 && !isMobile"
                style="
                  width: 100%;
                  padding: 20px 0;
                  text-align: center;
                  overflow: hidden;
                  display: flex;
                  justify-content: center;
                  gap: 20px;
                  align-items: center;
                "
              >
                <aside>
                  <ins class="eas6a97888e2" data-zoneid="5859702"></ins>
                </aside>
                <aside>
                  <ins class="eas6a97888e2" data-zoneid="5859736"></ins>
                </aside>
              </div>

              <!-- 4 -->
              <div
                v-if="index === 7 && !isMobile"
                style="
                  width: 100%;
                  padding: 20px 0;
                  text-align: center;
                  overflow: hidden;
                  display: flex;
                  justify-content: center;
                  gap: 20px;
                  align-items: center;
                "
              >
                <aside>
                  <ins class="eas6a97888e2" data-zoneid="5859702"></ins>
                </aside>
                <aside>
                  <ins class="eas6a97888e2" data-zoneid="5859736"></ins>
                </aside>
              </div>

              <GameGrid
                :category="category.id"
                :is-home="true"
                show-title
                :title="category.name"
                :description="category.description"
                :max-items="13"
                :more-to="{ name: `category-${category.addressBar}` }"
              />
            </div>
          </div>
        </section>

        <div class="container">
          <aside style="width: 100%; padding: 20px 0; text-align: center; overflow: hidden">
            <ins class="eas6a97888e20" data-zoneid="5859722"></ins>
          </aside>
        </div>

        <section class="about-section">
          <div class="about-wrapper">
            <h2 class="title-h2">Welcome to 3D Games!</h2>
            <div class="about-content">
              <p>
                We are a passionate team dedicated to creating a comprehensive platform that
                combines entertainment, knowledge, and interactivity for 3D gaming enthusiasts
                worldwide. At 3D Games, you'll embark on a unique journey of exploring the world of
                3D gaming.
              </p>
              <h3 class="about-subtitle">Our Mission:</h3>
              <p>
                We believe that whether it's accessible web games or epic adventures on classic
                handheld consoles, 3D games can bring unparalleled immersion and fun to players. Our
                mission is:
              </p>
              <ul class="about-list">
                <li>
                  <strong>Provide Instant Fun:</strong> Carefully selected and presented free H5 3D
                  web games, allowing you to start an exciting 3D gaming experience anytime,
                  anywhere without downloads.
                </li>
                <li>
                  <strong>Deepen Classic Heritage:</strong> Provide comprehensive and professional
                  game guides, in-depth reviews, and the latest news for loyal players of the
                  Nintendo 3DS platform, helping you revisit or explore the unique charm of this
                  classic handheld console.
                </li>
                <li>
                  <strong>Connect the Gaming World:</strong> Build a sharing and communication
                  community where players can find like-minded friends and explore the infinite
                  possibilities of 3D games together.
                </li>
              </ul>
              <h3 class="about-subtitle">What We Offer?</h3>
              <ul class="about-list">
                <li>
                  <strong>H5 3D Game Collection:</strong> Various types of free 3D web games that
                  can be played anytime, meeting your casual entertainment needs.
                </li>
                <li>
                  <strong>3DS Game Zone:</strong> Detailed 3DS game guides, exciting game
                  recommendations, professional reviews, and related news to support your 3DS gaming
                  journey.
                </li>
                <li>
                  <strong>Gaming News & Insights:</strong> From 3D game technology to industry
                  trends, we share unique insights into the gaming world.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section class="faq-section">
          <div class="faq-wrapper">
            <h2 class="title-h2">Frequently Asked Questions</h2>
            <div class="faq-content">
              <div class="faq-item">
                <h3>What are H5 3D web games?</h3>
                <p>
                  H5 3D web games are browser-based 3D games that can be played directly in your web
                  browser without any downloads or installations. These games use HTML5 technology
                  to deliver immersive 3D gaming experiences that work on both desktop and mobile
                  devices.
                </p>
              </div>
              <div class="faq-item">
                <h3>Are all games free to play?</h3>
                <p>
                  Yes! All H5 3D web games on our platform are completely free to play. You can
                  enjoy our entire collection of 3D games without any cost or registration required.
                </p>
              </div>
              <div class="faq-item">
                <h3>Do I need to download anything to play?</h3>
                <p>
                  No downloads needed! All our H5 3D games run directly in your web browser. Simply
                  click and play - it's that easy. This makes our games accessible on any device
                  with a modern web browser.
                </p>
              </div>
              <div class="faq-item">
                <h3>Can I play these games on mobile devices?</h3>
                <p>
                  Absolutely! All our H5 3D web games are optimized for mobile devices, tablets, and
                  desktops. Whether you're on iOS, Android, or any other platform, you can enjoy our
                  games seamlessly.
                </p>
              </div>
              <div class="faq-item">
                <h3>What information do you provide about 3DS games?</h3>
                <p>
                  Our 3DS Game Zone offers comprehensive game guides, detailed reviews, exciting
                  game recommendations, and the latest news about Nintendo 3DS games. Whether you're
                  looking for walkthroughs, tips, or just want to discover new titles, we've got you
                  covered.
                </p>
              </div>
              <div class="faq-item">
                <h3>How often do you update your game collection?</h3>
                <p>
                  We regularly add new H5 3D games to our collection and update our 3DS game content
                  with fresh guides, reviews, and news. Check back frequently to discover the latest
                  additions and updates!
                </p>
              </div>
              <div class="faq-item">
                <h3>Can I share my gaming experience with others?</h3>
                <p>
                  Yes! Our platform is designed to connect gaming enthusiasts. You can share your
                  experiences, discuss games, and connect with like-minded players in our community.
                  Join us to explore the infinite possibilities of 3D gaming together!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import GameGrid from '@/components/GameGrid.vue'
import SidebarNav from '@/components/SidebarNav.vue'
import { games, categoriesGames } from '@/data/games.js'

import { useDeviceDetection } from '../utils/useDeviceDetection'

const { isMobile } = useDeviceDetection()

const adProvider = () => {
  const script = document.createElement('script')
  script.src = 'https://a.magsrv.com/ad-provider.js'
  script.async = true
  script.type = 'application/javascript'
  document.head.appendChild(script)

  script.onload = () => {
    if (window.AdProvider) {
      window.AdProvider.push({ serve: {} })
    }
  }
}
onMounted(() => {
  setTimeout(() => {
    adProvider()
  }, 1000) // 延迟1秒加载广
})

// 只显示有游戏的分类
// games 中的 categories 是字符串数组，引用 categoriesGames 中的 id
const displayCategories = computed(() => {
  return categoriesGames.filter((category) =>
    games.some((game) => game.categories && game.categories.includes(category.id))
  )
})
</script>

<style scoped>
/* 首页特定样式 - 分类区域样式 */
.categories-section {
  margin-bottom: 64px;
}

.categories-wrapper {
  width: 100%;
}

.category-block {
  display: contents;
}

.categories-section h1 {
  color: var(--color-text-primary);
  text-align: left;
  font-size: 32px;
  margin-bottom: 0;
}

.section-description {
  text-align: center;
  font-size: 19.2px;
  color: var(--color-text-secondary);
  opacity: 0.9;
  margin-bottom: 48px;
}

.category-more {
  display: flex;
  justify-content: center;
  margin: 16px 0 48px;
}

.more-link {
  display: inline-block;
  padding: 6.4px 12.8px;
  border-radius: 8px;
  color: var(--color-accent);
  text-decoration: none;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(248, 191, 36, 0.35);
  transition: all 0.2s ease;
  font-size: 14.4px;
  box-shadow: 0 12px 20px rgba(249, 115, 22, 0.25);
}

.more-link:hover {
  background: rgba(30, 25, 18, 0.85);
  border-color: rgba(248, 191, 36, 0.6);
  color: var(--color-accent-strong);
  box-shadow: 0 16px 28px rgba(249, 115, 22, 0.35);
}

/* About区域样式 */
.about-section {
  margin-bottom: 48px;
  background: rgba(15, 23, 42, 0.85);
  padding: 32px;
  border-radius: 14px;
  border: 1px solid rgba(248, 191, 36, 0.2);
  box-shadow: 0 24px 48px rgba(5, 5, 5, 0.45);
}

.about-wrapper {
  width: 100%;
}

.about-section h2 {
  text-align: left;
  color: var(--color-text-primary);
  font-size: 28.8px;
  margin-bottom: 24px;
}

.about-content p {
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 20px;
  color: var(--color-text-secondary);
}

.about-subtitle {
  font-size: 19.2px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 12px;
  color: var(--color-accent-strong);
}

.about-list {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
}

.about-list li {
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 16px;
  color: var(--color-text-secondary);
  padding-left: 28px;
  position: relative;
}

.about-list li::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 13.6px;
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(249, 115, 22, 0.4);
}

.about-list li::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 17.6px;
  width: 2px;
  height: calc(100% + 4.8px);
  background: linear-gradient(180deg, rgba(248, 191, 36, 0.35), rgba(249, 115, 22, 0.18));
  border-radius: 2px;
}

.about-list li:last-child::after {
  display: none;
}

.about-list li strong {
  color: var(--color-accent-strong);
  font-weight: 600;
}

/* FAQ区域样式 */
.faq-section {
  background: rgba(15, 23, 42, 0.85);
  padding: 32px;
  border-radius: 14px;
  border: 1px solid rgba(248, 191, 36, 0.2);
  margin-bottom: 48px;
  box-shadow: 0 24px 48px rgba(5, 5, 5, 0.45);
}

.faq-wrapper {
  width: 100%;
}

.faq-section h2 {
  text-align: left;
  color: var(--color-text-primary);
  font-size: 28.8px;
  margin-bottom: 24px;
}

.faq-content {
  margin-top: 32px;
}

.faq-item {
  margin-bottom: 16px;
  padding: 16px;
  background: rgba(15, 23, 42, 0.65);
  border-radius: 10px;
  border-left: 3px solid var(--color-accent);
  box-shadow: 0 12px 24px rgba(5, 5, 5, 0.35);
}

.faq-item h3 {
  color: var(--color-text-primary);
  margin-bottom: 12px;
  font-size: 17.6px;
}

.faq-item p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  font-size: 15.2px;
}

/* iPad端 - 1024px */
@media (max-width: 1024px) {
  .section-description {
    font-size: 17.6px;
    margin-bottom: 40px;
  }

  .about-section,
  .faq-section {
    padding: 40px 0;
    margin-bottom: 48px;
  }

  .about-content p {
    font-size: 16.8px;
  }

  .about-subtitle {
    font-size: 20.8px;
    margin-top: 24px;
  }

  .about-list li {
    font-size: 16.8px;
    padding-left: 28.8px;
  }

  .about-list li::before {
    left: 6.4px;
    top: 10.4px;
    width: 5px;
    height: 5px;
  }

  .about-list li::after {
    left: 3.2px;
    top: 13.6px;
    width: 1.5px;
  }

  .faq-item {
    padding: 20.8px;
    margin-bottom: 28.8px;
  }

  .faq-item h3 {
    font-size: 18.4px;
  }
}

/* 移动端 - 768px */
@media (max-width: 768px) {
  .categories-section {
    margin-bottom: 20px;
  }

  .section-description {
    font-size: 12px;
    line-height: 1.2;
    margin-bottom: 20px;
  }

  .category-more {
    margin: 10px 0 20px;
  }

  .more-link {
    padding: 6px 10px;
    font-size: 12px;
    line-height: 1.2;
  }

  .about-section,
  .faq-section {
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  .about-section h2,
  .faq-section h2 {
    font-size: 20px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .about-content p {
    font-size: 12px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .about-subtitle {
    font-size: 16px;
    line-height: 1.2;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .about-list {
    margin-bottom: 20px;
  }

  .about-list li {
    font-size: 12px;
    line-height: 1.2;
    margin-bottom: 10px;
    padding-left: 20px;
  }

  .about-list li::before {
    left: 6px;
    top: 6px;
    width: 4px;
    height: 4px;
  }

  .about-list li::after {
    left: 4px;
    top: 8px;
    width: 1.5px;
  }

  .faq-content {
    margin-top: 20px;
  }

  .faq-item {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
  }

  .faq-item h3 {
    font-size: 16px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  .faq-item p {
    font-size: 12px;
    line-height: 1.2;
    margin-bottom: 0;
  }
}
</style>
