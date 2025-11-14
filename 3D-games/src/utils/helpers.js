/**
 * 工具函数集合
 */

/**
 * 格式化日期
 * @param {string} dateString - 日期字符串
 * @param {string} locale - 语言环境，默认为 'en-US'
 * @param {Object} options - 格式化选项
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(dateString, locale = 'en-US', options = {}) {
  try {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options
    }
    return new Date(dateString).toLocaleDateString(locale, defaultOptions)
  } catch (e) {
    return dateString
  }
}

/**
 * 格式化标签名称
 * @param {string} tag - 标签名称
 * @param {Object} tagMap - 标签映射对象（可选）
 * @returns {string} 格式化后的标签名称
 */
export function formatTagName(tag, tagMap = null) {
  const defaultTagMap = {
    featured: 'Featured',
    popular: 'Popular',
    new: 'New',
    classic: 'Classic'
  }
  
  const map = tagMap || defaultTagMap
  return map[tag] || tag.charAt(0).toUpperCase() + tag.slice(1)
}

/**
 * 格式化标签名称（用于列表页，popular 显示为 Hot）
 * @param {string} tag - 标签名称
 * @returns {string} 格式化后的标签名称
 */
export function formatTagNameForList(tag) {
  const tagMap = {
    featured: 'Featured',
    popular: 'Hot',
    new: 'New',
    classic: 'Classic'
  }
  return formatTagName(tag, tagMap)
}







