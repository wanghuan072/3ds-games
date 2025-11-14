import fs from 'fs'
import path from 'path'

export function seoPlugin() {
  return {
    name: '3dsgames-seo-plugin',
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', (_req, res) => {
        const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml')
        if (fs.existsSync(sitemapPath)) {
          res.setHeader('Content-Type', 'application/xml')
          res.end(fs.readFileSync(sitemapPath, 'utf8'))
        } else {
          res.statusCode = 404
          res.end('sitemap.xml not found. Run npm run generate-sitemap')
        }
      })

      server.middlewares.use('/robots.txt', (_req, res) => {
        const robotsPath = path.resolve(process.cwd(), 'public/robots.txt')
        if (fs.existsSync(robotsPath)) {
          res.setHeader('Content-Type', 'text/plain')
          res.end(fs.readFileSync(robotsPath, 'utf8'))
        } else {
          res.statusCode = 404
          res.end('robots.txt not found')
        }
      })
    },
    writeBundle() {
      copyIfExists('public/sitemap.xml', 'dist/sitemap.xml')
      copyIfExists('public/robots.txt', 'dist/robots.txt')
    },
  }
}

function copyIfExists(source, target) {
  const sourcePath = path.resolve(process.cwd(), source)
  const targetPath = path.resolve(process.cwd(), target)
  const targetDir = path.dirname(targetPath)

  if (!fs.existsSync(sourcePath)) {
    console.warn(`⚠️  ${source} not found.`)
    return
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  fs.copyFileSync(sourcePath, targetPath)
  console.log(`✅ Copied ${source} to ${target}`)
}

