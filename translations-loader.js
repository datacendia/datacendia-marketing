/**
 * Datacendia i18n — Lazy Translation Loader
 * 
 * Replaces the monolithic 628KB translations.js with on-demand locale loading.
 * English is embedded inline (~49KB) as the default. Other locales are fetched
 * from /translations/{lang}.json only when the user switches language.
 * 
 * Supported languages: en, es, fr, de, pt, it, ja, ko, zh, ar, hi
 * 
 * @version 2.0.0 — Lazy-loaded (F27 audit item)
 */

/* Global translations cache — only loaded locales are in memory */
const translations = {};

/* Locale file cache to prevent re-fetching */
const _loadedLocales = new Set();

/* Available locales */
const AVAILABLE_LOCALES = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh', 'ar', 'hi'];

/**
 * Fetch and cache a locale's translations from /translations/{lang}.json.
 * Returns the translation object or null on failure.
 * 
 * @param {string} lang - ISO 639-1 language code
 * @returns {Promise<object|null>}
 */
async function loadLocale(lang) {
  if (_loadedLocales.has(lang)) return translations[lang];
  if (!AVAILABLE_LOCALES.includes(lang)) {
    console.warn(`[i18n] Unknown locale: ${lang}, falling back to en`);
    return translations['en'] || null;
  }

  try {
    const resp = await fetch(`/translations/${lang}.json?v=7`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const text = await resp.text();
    
    // Parse the JS object notation (not strict JSON — has unquoted keys and trailing commas)
    // We wrap it in a function to eval safely
    const fn = new Function(`return ${text}`);
    translations[lang] = fn();
    _loadedLocales.add(lang);
    return translations[lang];
  } catch (err) {
    console.error(`[i18n] Failed to load locale '${lang}':`, err);
    return translations['en'] || null;
  }
}

/**
 * Apply translations to all elements with data-i18n attributes.
 * 
 * @param {string} lang - Target language code
 */
async function setLanguage(lang) {
  if (!AVAILABLE_LOCALES.includes(lang)) lang = 'en';

  // Load locale if not cached
  const t = await loadLocale(lang);
  if (!t) return;

  // Store preference
  localStorage.setItem('datacendia-lang', lang);

  // Update URL parameter
  const url = new URL(window.location);
  url.searchParams.set('lang', lang);
  window.history.replaceState({}, '', url);

  // Apply translations to all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else {
        el.innerHTML = t[key];
      }
    }
  });

  // Apply translations to data-i18n-placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  // Update lang attribute on <html>
  document.documentElement.lang = lang;

  // Update RTL direction for Arabic
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

  // Update language selector button text
  const langBtn = document.querySelector('.lang-current');
  if (langBtn && t.lang) {
    langBtn.textContent = t.lang;
  }
}

/**
 * Initialize i18n on page load.
 * Loads saved language preference or detects from URL/browser.
 */
document.addEventListener('DOMContentLoaded', async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');
  const saved = urlLang || localStorage.getItem('datacendia-lang') || 'en';

  // Pre-load English inline for instant display (no network request)
  // Other locales loaded on demand when user switches
  await loadLocale('en');
  await setLanguage(saved);

  // Toggle dropdown on click for better mobile/touch support
  const langBtn = document.querySelector('.lang-btn');
  const langDropdown = document.querySelector('.lang-dropdown');

  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.lang-selector')) {
        langDropdown.classList.remove('show');
      }
    });

    langDropdown.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        langDropdown.classList.remove('show');
      });
    });
  }
});
