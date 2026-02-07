// Translation loader - loads only the active language
function loadTranslation(lang) {
  return new Promise((resolve, reject) => {
    if (window.translations && window.translations[lang]) {
      resolve(window.translations[lang]);
      return;
    }
    
    const script = document.createElement('script');
    script.src = `/translations/${lang}.js`;
    script.onload = () => resolve(window.translations[lang]);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Auto-load based on current language or default to English
const currentLang = localStorage.getItem('language') || 'en';
loadTranslation(currentLang).catch(() => loadTranslation('en'));
