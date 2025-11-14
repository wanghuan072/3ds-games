import { SITE_DOMAIN, defaultSocial } from './seoConfig.js'

/**
 * SEO工具类 - 管理页面的Title, Description, Keywords
 */

// 默认TDK设置
const defaultSEO = {
  title: '3D Games | Play all online 3D games for free',
  description:
    'Dive into the best collection of 3D games online. From action-packed shooting games to thrilling racing experiences, discover immersive gaming experiences for all ages.',
  keywords: '3D games, online games, shooting games, racing games, action games, free games',
}

let structuredDataNode = null

/**
 * 设置页面TDK和社交媒体标签
 * @param {Object} seo - SEO对象，包含title, description, keywords
 * @param {string} canonicalUrl - 规范URL（可选）
 */
export function setPageSEO(seo = {}, canonicalUrl = null) {
  const { title, description, keywords } = { ...defaultSEO, ...seo }

  const resolvedCanonical = canonicalUrl ? ensureAbsoluteUrl(canonicalUrl) : getCurrentAbsoluteUrl()

  // 设置页面标题
  document.title = title

  // 设置meta description
  setMetaTag('description', description)

  // 设置meta keywords
  setMetaTag('keywords', keywords)

  // 设置canonical URL
  setCanonicalUrl(resolvedCanonical)

  // 统一设置社交媒体标签
  setSocialTags(title, description, seo.image, 'website', resolvedCanonical)
}

/**
 * 设置社交媒体标签
 * @param {string} title - 页面标题
 * @param {string} description - 页面描述
 * @param {string} image - 页面图片（可选）
 * @param {string} type - 内容类型，默认为website
 * @param {string} canonical - 页面规范URL
 */
export function setSocialTags(title, description, image = null, type = 'website', canonical = null) {
  const resolvedImage = image || defaultSocial.image
  const resolvedUrl = canonical ? ensureAbsoluteUrl(canonical) : getCurrentAbsoluteUrl()

  // Open Graph标签
  setMetaTag('og:title', title)
  setMetaTag('og:description', description)
  setMetaTag('og:type', type)
  setMetaTag('og:url', resolvedUrl)
  setMetaTag('og:image', resolvedImage)
  setMetaTag('og:image:alt', defaultSocial.imageAlt)
  setMetaTag('og:site_name', defaultSocial.siteName)
  setMetaTag('og:locale', 'en_US')

  // Twitter Card标签
  setMetaTag('twitter:card', defaultSocial.twitterCard)
  setMetaTag('twitter:site', defaultSocial.twitterSite)
  setMetaTag('twitter:creator', defaultSocial.twitterCreator)
  setMetaTag('twitter:title', title)
  setMetaTag('twitter:description', description)
  setMetaTag('twitter:image', resolvedImage)
  setMetaTag('twitter:image:alt', defaultSocial.imageAlt)
}

/**
 * 设置meta标签
 * @param {string} name - meta标签的name或property属性
 * @param {string} content - meta标签的content属性
 */
function setMetaTag(name, content) {
  // 先查找已存在的标签
  let metaTag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
  
  if (!metaTag) {
    // 如果不存在，创建新标签
    metaTag = document.createElement('meta')
    // 判断是property还是name属性
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      metaTag.setAttribute('property', name)
    } else {
      metaTag.setAttribute('name', name)
    }
    document.head.appendChild(metaTag)
  }
  
  // 更新content属性
  metaTag.setAttribute('content', content)
}

/**
 * 设置canonical URL
 * @param {string} url - 规范URL
 */
export function setCanonicalUrl(url) {
  let canonicalLink = document.querySelector('link[rel="canonical"]')

  if (!canonicalLink) {
    // 如果不存在，创建新标签
    canonicalLink = document.createElement('link')
    canonicalLink.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalLink)
  }

  // 更新href属性
  canonicalLink.setAttribute('href', ensureAbsoluteUrl(url))
}

/**
 * 重置为默认SEO设置
 */
export function resetToDefaultSEO() {
  setPageSEO(defaultSEO, getCurrentAbsoluteUrl())
}

/**
 * 写入结构化数据
 * @param {Object|null} data - schema.org 数据对象；null 表示移除
 */
export function setStructuredData(data) {
  if (typeof document === 'undefined') return

  if (structuredDataNode) {
    structuredDataNode.remove()
    structuredDataNode = null
  }

  if (!data) return

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
  structuredDataNode = script
}

function ensureAbsoluteUrl(url) {
  if (!url) return getCurrentAbsoluteUrl()
  if (/^https?:\/\//i.test(url)) return url
  const normalizedDomain = SITE_DOMAIN.replace(/\/$/, '')
  const normalizedPath = `/${url}`.replace(/\/{2,}/g, '/')
  return `${normalizedDomain}${normalizedPath}`
}

function getCurrentAbsoluteUrl() {
  if (typeof window !== 'undefined' && window.location) {
    return window.location.origin + window.location.pathname
  }
  return SITE_DOMAIN
}


