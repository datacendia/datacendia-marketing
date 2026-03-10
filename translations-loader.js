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

  // Content-based translation for elements without data-i18n
  translatePageContent(lang, t);
}

/**
 * Translate page content that doesn't have data-i18n attributes.
 * Uses content matching against a page-specific translation dictionary
 * stored in the _page key of each locale's translation object.
 *
 * @param {string} lang - Target language code
 * @param {object} t - Translation object for the language
 */
function translatePageContent(lang, t) {
  if (lang === 'en' || !t || !t._page) return;

  // Determine current page name
  let pageName = window.location.pathname.replace(/^\//, '');
  if (!pageName || pageName === '' || pageName === '/') pageName = 'index.html';
  // Handle paths like /learn/ai-governance/ → learn/ai-governance/index.html
  if (pageName.endsWith('/')) pageName += 'index.html';

  // Build lookup map: English text → translated text
  // Start with _global (shared across all pages), then overlay page-specific
  const lookup = new Map();
  const globalDict = t._page._global;
  if (globalDict) {
    for (const pair of globalDict) {
      if (pair.length >= 2) lookup.set(pair[0].trim(), pair[1]);
    }
  }
  const pageDict = t._page[pageName];
  if (pageDict) {
    for (const pair of pageDict) {
      if (pair.length >= 2) lookup.set(pair[0].trim(), pair[1]);
    }
  }

  if (lookup.size === 0) return;

  // Walk translatable elements
  const selectors = 'h1,h2,h3,h4,h5,h6,p,li,span,div,td,th,a,button,summary,label,caption,strong,em,dt,dd,figcaption';
  const els = document.body.querySelectorAll(selectors);

  for (const el of els) {
    // Skip data-i18n elements and their children
    if (el.hasAttribute('data-i18n') || el.closest('[data-i18n]')) continue;
    // Skip script/style containers
    if (el.closest('script') || el.closest('style')) continue;

    // For leaf elements (no child elements): match textContent
    if (el.children.length === 0) {
      const text = el.textContent.trim();
      if (text && lookup.has(text)) {
        el.textContent = lookup.get(text);
        continue;
      }
    }

    // For elements with child HTML: match innerHTML
    const html = el.innerHTML.trim();
    if (html && lookup.has(html)) {
      el.innerHTML = lookup.get(html);
    }
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

  // Dropdown toggle is handled by lang-switcher.js
});
