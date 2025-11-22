<template>
  <footer class="site-footer">
    <div class="footer-content">
      <!-- 左侧品牌区域 -->
      <div class="footer-brand">
        <div class="brand-logo">
          <img src="/images/logo.webp" alt="3D Games" />
          <span class="brand-name">3D Games</span>
        </div>
        <p class="brand-description">
          Immersive 3D gaming experience that challenges your skills and creates unforgettable adventures in stunning virtual worlds.
        </p>
        <div class="social-links">
          <a href="#" class="social-link" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="Twitter">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
              />
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              />
            </svg>
          </a>
          <a href="#" class="social-link" aria-label="X">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </svg>
          </a>
        </div>
      </div>

      <!-- 快速链接 -->
      <div class="footer-section">
        <h3 class="section-title">Quick Links</h3>
        <ul class="footer-links">
          <li><a href="/" class="footer-link">Home</a></li>
          <li><a href="/games" class="footer-link">Games</a></li>
          <li><a href="/hot-games" class="footer-link">Hot Games</a></li>
          <li><a href="/new-games" class="footer-link">New Games</a></li>
          <li><RouterLink to="/3ds-games" class="footer-link">3DS Games</RouterLink></li>
        </ul>
      </div>

      <!-- 游戏分类 -->
      <div class="footer-section">
        <h3 class="section-title">Game Categories</h3>
        <ul class="footer-links">
          <li>
            <a href="/3d-car-games" class="footer-link">3D Car Games</a>
          </li>
          <li>
            <a href="/3d-shooting-games" class="footer-link">3D Shooting Games</a>
          </li>
          <li>
            <a href="/3d-mario-games" class="footer-link">3D Mario Games</a>
          </li>
          <li>
            <a href="/3d-jump-games" class="footer-link">3D Jump Games</a>
          </li>
        </ul>
      </div>

      <!-- 法律信息 -->
      <div class="footer-section">
        <h3 class="section-title">Legal</h3>
        <ul class="footer-links">
          <li><a href="/privacy-policy" class="footer-link" rel="nofollow">Privacy Policy</a></li>
          <li><a href="/terms-of-use" class="footer-link" rel="nofollow">Terms of Use</a></li>
          <li><a href="/copyright" class="footer-link" rel="nofollow">Copyright</a></li>
          <li><a href="/about-us" class="footer-link" rel="nofollow">About Us</a></li>
          <li><a href="/contact-us" class="footer-link" rel="nofollow">Contact Us</a></li>
        </ul>
      </div>
    </div>

    <!-- 底部版权 -->
    <div class="footer-bottom">
      <p>&copy; 2025 3D Games. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
/* 底部样式 */
.site-footer {
  background: linear-gradient(180deg, rgba(11, 15, 23, 0.95), rgba(5, 5, 5, 0.92));
  border-top: 1px solid rgba(248, 191, 36, 0.3);
  color: var(--color-text-primary);
  box-shadow: 0 -20px 40px rgba(5, 5, 5, 0.5);
}

.footer-content {
  width: 100%;
  margin: 0;
  padding: 2rem 2rem 1.5rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
}

/* 品牌区域 */
.footer-brand {
  max-width: 350px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.brand-logo img {
  width: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(248, 191, 36, 0.35);
  box-shadow: 0 16px 28px rgba(249, 115, 22, 0.3);
  background: radial-gradient(circle at top, rgba(248, 191, 36, 0.2), transparent);
}

.brand-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text-primary);
  letter-spacing: 0.5px;
}

.brand-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

/* 社交媒体链接 */
.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(15, 23, 42, 0.7);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent);
  transition: all 0.3s ease;
  text-decoration: none;
  border: 1px solid rgba(248, 191, 36, 0.35);
  box-shadow: 0 8px 18px rgba(249, 115, 22, 0.25);
}

.social-link:hover {
  background: rgba(30, 25, 18, 0.85);
  color: var(--color-accent-strong);
  transform: translateY(-3px);
  border-color: rgba(248, 191, 36, 0.6);
  box-shadow: 0 12px 24px rgba(249, 115, 22, 0.35);
}

/* 页脚区块 */
.footer-section {
  min-width: 0;
}

.section-title {
  color: var(--color-text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease, transform 0.3s ease;
  display: block;
}

.footer-link:hover {
  color: var(--color-accent-strong);
  transform: translateX(4px);
}

/* 底部版权 */
.footer-bottom {
  border-top: 1px solid rgba(248, 191, 36, 0.2);
  padding: 1.5rem 2rem;
  text-align: center;
  background: rgba(5, 5, 5, 0.95);
}

.footer-bottom p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  letter-spacing: 0.3px;
}

/* iPad端 - 1024px */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
    padding: 2.5rem 1.5rem 1.5rem;
  }

  .footer-brand {
    grid-column: 1 / -1;
    max-width: none;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .brand-logo {
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }

  .section-title {
    font-size: 1rem;
  }

  .footer-link {
    font-size: 0.9rem;
  }
}

/* 移动端 - 768px */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px 16px;
    text-align: center;
  }

  .footer-brand {
    margin-bottom: 0;
  }

  .brand-name {
    font-size: 16px;
    line-height: 1.2;
  }

  .brand-description {
    font-size: 12px;
    line-height: 1.2;
    margin-bottom: 20px;
  }

  .footer-section {
    display: none;
  }

  .section-title {
    text-align: center;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.2;
  }

  .footer-links li {
    margin-bottom: 10px;
  }

  .footer-link {
    font-size: 12px;
    line-height: 1.2;
  }

  .social-links {
    justify-content: center;
    gap: 10px;
  }

  .social-link {
    width: 32px;
    height: 32px;
  }

  .footer-bottom {
    padding: 20px 16px;
  }

  .footer-bottom p {
    font-size: 12px;
    line-height: 1.2;
  }
}
</style>

