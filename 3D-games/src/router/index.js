import { createRouter, createWebHistory } from 'vue-router'
import { setPageSEO, resetToDefaultSEO, setCanonicalUrl, setStructuredData } from '../utils/seo.js'
import { categoriesGames, games } from '../data/games.js'
import { nintendo3DSGames } from '../data/3dsGames.js'
import { SITE_DOMAIN } from '../utils/seoConfig.js'
import { buildWebSiteData, buildWebPageData, buildVideoGameData } from '../utils/structuredData.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进/后退），则恢复到该位置
    if (savedPosition) {
      return savedPosition
    }
    // 否则滚动到顶部
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        seo: {
          title: 'Free 3D Game Box | 3DS Game  Recommendations - 3dsgames.com',
          description: 'Explore a vast library of free H5 3D web games and experience them instantly. Get the latest 3DS game guides, in-depth reviews, and must-play recommendations. ',
          keywords: '3DS games, 3D games, H5 games, H5 3D games, web-based 3D games, free H5 games, 3DS strategy guides, 3DS recommendations, Nintendo 3DS, online 3D games'
        }
      }
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/GamesView.vue'),
      meta: {
        seo: {
          title: '3D games online | Latest and popular 3D games - 3dsgames.com',
          description: 'requiring no downloads and offering instant play. It covers various genres including action, shooting, and puzzle games, providing an immersive 3D experience.',
          keywords: 'H5 3D games, free H5 games, web-based 3D games, online 3D games, 3D mini-games, H5 action games, H5 shooting games'
        }
      }
    },
    // 游戏详情页 - 必须在 /games 之后，避免路由冲突
    {
      path: '/games/:addressBar',
      name: 'game-detail',
      component: () => import('../views/GameDetailView.vue'),
      meta: {
        seo: {
          title: '3D Games - Play free online H5 3D games at 3dsgames.com',
          description: 'Experience 3D Games now! This captivating H5 3D game will immerse you in the world of 3D gaming. No installation required, just pure fun.',
          keywords: '3D Games, H5 3D Games, Free H5 Games, H5 Games, Online 3D Games'
        }
      }
    },
    // 动态生成分类页面路由
    ...categoriesGames.map(cat => ({
      path: `/${cat.addressBar}`,
      name: `category-${cat.addressBar}`,
      component: () => import('../views/CategoryView.vue'),
      meta: {
        seo: cat.seo || {
          title: cat.name,
          description: cat.description,
          keywords: cat.name
        }
      }
    })),
    {
      path: '/hot-games',
      name: 'hot-games',
      component: () => import('../views/HotGamesView.vue'),
      meta: {
        seo: {
          title: 'Play free online 3D games | Hot 3D web games - 3dsgames.com',
          description: 'features the hot free 3D games, playable instantly without downloading. Game types include action, shooting, and puzzle, delivering an immersive 3D experience.',
          keywords: 'H5 3D games, free H5 games, web-based 3D games, online 3D games, 3D mini-games, H5 action games, H5 shooting games'
        }
      }
    },
    {
      path: '/new-games',
      name: 'new-games',
      component: () => import('../views/NewGamesView.vue'),
      meta: {
        seo: {
          title: 'Play free online 3D games | New 3D web games - 3dsgames.com',
          description: 'the new free H5 3D games, playable instantly without downloading. Game types include action, shooting, and puzzle, delivering an immersive 3D experience.',
          keywords: 'H5 3D games, free H5 games, web-based 3D games, online 3D games, 3D mini-games, H5 action games, H5 shooting games'
        }
      }
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/legal/PrivacyPolicy.vue'),
      meta: {
        seo: {
          title: 'Privacy Policy | Your Data Security Is Our Commitment - 3dsgames.com',
          description: 'Learn how 3dsgames.com collects, uses, and protects your personal information. Your privacy matters to us.',
          keywords: 'privacy policy, data protection, 3dsgames.com'
        }
      }
    },
    {
      path: '/terms-of-use',
      name: 'terms-of-use',
      component: () => import('../views/legal/TermsOfUse.vue'),
      meta: {
        seo: {
          title: 'Terms of Service | Usage Rules and Legal Notice - 3dsgames.com',
          description: 'Please read the 3dsgames.com Terms of Service carefully. Your access and use of this site are governed by these terms.',
          keywords: 'terms of service, usage rules, 3dsgames.com'
        }
      }
    },
    {
      path: '/copyright',
      name: 'copyright',
      component: () => import('../views/legal/Copyright.vue'),
      meta: {
        seo: {
          title: 'Copyright | Rights Management and IP Protection - 3dsgames.com',
          description: 'Understand how 3dsgames.com safeguards intellectual property, credits creators, and handles infringement reports.',
          keywords: 'copyright, intellectual property, dmca, 3dsgames.com'
        }
      }
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: () => import('../views/legal/AboutUs.vue'),
      meta: {
        seo: {
          title: 'About us | Team, Mission, and Platform Story - 3dsgames.com',
          description: 'Discover the 3dsgames.com mission, meet the team curating H5 3D games and 3DS guides, and learn how we build the platform.',
          keywords: '3dsgames mission, team, platform story'
        }
      }
    },
    {
      path: '/contact-us',
      name: 'contact-us',
      component: () => import('../views/legal/ContactUs.vue'),
      meta: {
        seo: {
          title: 'Contact | Support, Partnerships, and Media - 3dsgames.com',
          description: 'Get in touch with 3dsgames.com for player support, collaboration requests, or press inquiries.',
          keywords: 'contact 3dsgames.com, support email, partnerships'
        }
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchResultsView.vue'),
      meta: {
        seo: {
          title: 'Search Games | 3D Games - 3dsgames.com',
          description: 'Search for your favorite 3D games by title, description, or category.',
          keywords: 'search games, find games, game search, 3D games search'
        }
      }
    },
    {
      path: '/3ds-games',
      name: '3ds-games',
      component: () => import('../views/3DSGuidesView.vue'),
      meta: {
        seo: {
          title: '3DS Games | Nintendo 3DS Classic Games List - 3dsgames.com',
          description: 'Discover must-play classics and new releases on the Nintendo 3DS platform. From RPGs to action-adventure, we curate the best 3DS games to help you enjoy glasses-free 3D gaming.',
          keywords: '3DS game recommendations, must-play 3DS games, Nintendo 3DS classics, 3DS game list, glasses-free 3D games'
        }
      }
    },
    {
      path: '/3ds-games/:addressBar',
      name: '3ds-game-detail',
      component: () => import('../views/3DSGuideDetailView.vue'),
      meta: {
        seo: {
          title: '3DS Game Guide | Complete Walkthrough - 3dsgames.com',
          description: 'Complete game guide with walkthroughs, tips, and strategies for Nintendo 3DS games.',
          keywords: 'Nintendo 3DS guide, 3DS walkthrough, 3DS game guide, 3DS strategy'
        }
      }
    },
    // 管理员路由
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/Login.vue'),
      meta: {
        seo: {
          title: 'Admin Login | 3dsgames.com',
          description: 'Administrator login page',
          keywords: 'admin login'
        }
      }
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: () => import('../views/admin/CommentRatingManagement.vue'),
      meta: {
        requiresAuth: true,
        seo: {
          title: 'Admin Dashboard | 3dsgames.com',
          description: 'Administrator dashboard',
          keywords: 'admin dashboard'
        }
      }
    },
  ],
})

// 全局路由守卫 - 处理SEO和认证
router.beforeEach((to, from, next) => {
  // 管理员路由认证检查
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      next({ name: 'admin-login' })
      return
    }
  }

  // 已登录用户访问登录页，重定向到管理后台
  if (to.name === 'admin-login') {
    const token = localStorage.getItem('adminToken')
    if (token) {
      next({ name: 'admin-dashboard' })
      return
    }
  }

  // 设置canonical URL
  const canonicalUrl = buildCanonicalUrl(to.path)
  setCanonicalUrl(canonicalUrl)

  // 先准备要应用的 SEO（只在最后统一 setPageSEO 一次）
  let seoToApply = null

  // 分类页（category-*）- 设置分类 TDK
  if (to.name && to.name.startsWith('category-') && to.params?.addressBar === undefined) {
    const addressBar = to.name.replace('category-', '')
    const category = categoriesGames.find(c => c.addressBar === addressBar)
    if (category) {
      // 使用分类配置的 SEO，如果存在且有效
      const categorySeo = category.seo && (category.seo.title || category.seo.description || category.seo.keywords)
        ? category.seo
        : {
          title: `${category.name} | 3D Games`,
          description: category.description || '',
          keywords: `3D games, ${category.name}`
        }
      seoToApply = categorySeo
    }
  }

  // 游戏详情页 - 设置游戏 SEO
  if (to.name === 'game-detail' && to.params?.addressBar) {
    const game = games.find(g => g.addressBar === to.params.addressBar)
    if (game && game.seo) {
      seoToApply = game.seo
    }
  }

  // 3DS指南详情页 - 设置游戏 SEO
  if (to.name === '3ds-game-detail' && to.params?.addressBar) {
    const game = nintendo3DSGames.find(game => game.addressBar === to.params.addressBar)
    if (game && game.seo) {
      seoToApply = game.seo
    }
  }

  // 兜底：若以上未设置，则使用路由 meta.seo 或默认
  if (!seoToApply) {
    if (to.meta?.seo) {
      seoToApply = to.meta.seo
    } else {
      // 使用默认 SEO
      seoToApply = null
    }
  }

  if (seoToApply) {
    setPageSEO(seoToApply, canonicalUrl)
  } else {
    resetToDefaultSEO()
    setCanonicalUrl(canonicalUrl)
  }

  // Structured Data
  let structuredData = null
  if (to.name === 'home') {
    structuredData = buildWebSiteData()
  } else if (to.name === 'game-detail' && to.params?.addressBar) {
    const game = games.find(g => g.addressBar === to.params.addressBar)
    structuredData = buildVideoGameData(game, canonicalUrl)
  }

  if (!structuredData) {
    const title = seoToApply?.title || '3dsgames.com'
    const description =
      seoToApply?.description ||
      'Play curated free H5 3D browser games and explore Nintendo 3DS guides on 3dsgames.com.'
    structuredData = buildWebPageData({ title, description, url: canonicalUrl })
  }

  setStructuredData(structuredData)

  next()
})

export default router

function buildCanonicalUrl(path) {
  const normalizedDomain = SITE_DOMAIN.replace(/\/$/, '')
  if (!path || path === '/') {
    return normalizedDomain
  }
  return `${normalizedDomain}${path.startsWith('/') ? path : `/${path}`}`
}
