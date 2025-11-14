import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SITE_DOMAIN } from '../src/utils/seoConfig.js'
import { games, categoriesGames } from '../src/data/games.js'
import { nintendo3DSGames } from '../src/data/3dsGames.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const STATIC_ROUTES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/games', priority: 0.9, changefreq: 'weekly' },
  { path: '/hot-games', priority: 0.8, changefreq: 'weekly' },
  { path: '/new-games', priority: 0.8, changefreq: 'weekly' },
  { path: '/3ds-games', priority: 0.8, changefreq: 'weekly' },
  { path: '/search', priority: 0.6, changefreq: 'weekly' },
  { path: '/admin/login', priority: 0.2, changefreq: 'monthly' },
  { path: '/admin/dashboard', priority: 0.2, changefreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.4, changefreq: 'yearly' },
  { path: '/terms-of-use', priority: 0.4, changefreq: 'yearly' },
  { path: '/copyright', priority: 0.4, changefreq: 'yearly' },
  { path: '/about-us', priority: 0.5, changefreq: 'yearly' },
  { path: '/contact-us', priority: 0.5, changefreq: 'yearly' },
]

function ensureLeadingSlash(value) {
  if (!value) return '/'
  return value.startsWith('/') ? value : `/${value}`
}

function toAbsolute(pathFragment) {
  const normalizedDomain = SITE_DOMAIN.replace(/\/$/, '')
  const normalizedPath = ensureLeadingSlash(pathFragment)
  return `${normalizedDomain}${normalizedPath === '/' ? '' : normalizedPath}`
}

function buildEntry(pathFragment, priority, changefreq, lastmod) {
  const loc = toAbsolute(pathFragment)
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
}

function collectRoutes() {
  const lastmod = new Date().toISOString().split('T')[0]
  const entries = []

  STATIC_ROUTES.forEach(route => {
    entries.push(
      buildEntry(route.path, route.priority, route.changefreq, lastmod),
    )
  })

  categoriesGames
    .filter(cat => cat?.addressBar)
    .forEach(cat => {
      entries.push(buildEntry(`/` + cat.addressBar, 0.6, 'monthly', lastmod))
    })

  games
    .filter(game => game?.addressBar)
    .forEach(game => {
      const priority = game.isHot || game.isHome ? 0.7 : 0.5
      const changefreq = game.isNew ? 'weekly' : 'monthly'
      const lastModified = game.publishDate || lastmod
      entries.push(buildEntry(`/games/${game.addressBar}`, priority, changefreq, lastModified))
    })

  nintendo3DSGames
    .filter(game => game?.addressBar)
    .forEach(game => {
      const priority = 0.7
      const changefreq = 'monthly'
      const lastModified = game.releaseDate || lastmod
      entries.push(buildEntry(`/3ds-games/${game.addressBar}`, priority, changefreq, lastModified))
    })

  return { entries, lastmod }
}

function generateSitemap() {
  const { entries, lastmod } = collectRoutes()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_DOMAIN}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>${entries.join('')}
</urlset>
`

  const publicDir = path.resolve(__dirname, '../public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml')
  fs.writeFileSync(sitemapPath, xml.trim(), 'utf8')
  console.log(`✅ Sitemap generated at ${sitemapPath}`)

  const distDir = path.resolve(__dirname, '../dist')
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml.trim(), 'utf8')
    console.log('✅ Sitemap copied to dist/sitemap.xml')
  }
}

generateSitemap()

