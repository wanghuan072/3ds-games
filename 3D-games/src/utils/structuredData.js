import { SITE_DOMAIN, defaultSocial } from './seoConfig.js'

/**
 * 确保URL是绝对路径
 * @param {string} pathOrUrl - 路径或URL
 * @returns {string} 绝对URL
 */
function ensureUrl(pathOrUrl) {
  if (!pathOrUrl) return SITE_DOMAIN
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const normalizedDomain = SITE_DOMAIN.replace(/\/$/, '')
  const normalizedPath = `/${pathOrUrl}`.replace(/\/{2,}/g, '/')
  return `${normalizedDomain}${normalizedPath}`
}

const organization = {
  '@type': 'Organization',
  name: '3dsgames.com',
  url: SITE_DOMAIN,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_DOMAIN}/images/logo.png`,
  },
  sameAs: [
    `https://twitter.com/${defaultSocial.twitterSite.replace('@', '')}`,
    'https://facebook.com/3dsgames',
    'https://instagram.com/3dsgames',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'wyong@3dsgames.com',
      contactType: 'customer support',
      availableLanguage: ['en', 'zh-CN'],
    },
  ],
}

export function buildWebSiteData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '3dsgames.com',
    url: SITE_DOMAIN,
    description:
      'Play free online 3D games instantly, explore curated H5 browser experiences, and read Nintendo 3DS game guides on 3dsgames.com.',
    publisher: organization,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_DOMAIN}/search?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function buildWebPageData({ title, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: ensureUrl(url),
    publisher: organization,
    inLanguage: 'en-US',
  }
}

export function buildVideoGameData(game, url) {
  if (!game) return null
  const canonical = ensureUrl(url || `/games/${game.addressBar}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.title,
    description: game.description,
    url: canonical,
    image: ensureUrl(game.imageUrl || defaultSocial.image),
    gameRelease: game.publishDate,
    genre: Array.isArray(game.categories) ? game.categories : undefined,
    inLanguage: 'en-US',
    operatingSystem: 'Any',
    applicationCategory: 'Game',
    publisher: organization,
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'USD',
      url: canonical,
      availability: 'https://schema.org/InStock',
    },
  }
}

