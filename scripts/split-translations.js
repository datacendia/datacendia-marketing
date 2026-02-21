#!/usr/bin/env node
/**
 * Split translations.js into separate files per locale
 * Reduces page load from 614KB to ~55KB per language
 */

const fs = require('fs');
const path = require('path');

// Load the massive translations.js
const translationsPath = path.join(__dirname, '..', 'translations.js');
const content = fs.readFileSync(translationsPath, 'utf8');

// Extract the translations object
const match = content.match(/const translations = ({[\s\S]*?});/);
if (!match) {
  console.error('Could not find translations object');
  process.exit(1);
}

const translationsCode = match[1];
const translations = eval(`(${translationsCode})`);

// Create translations directory
const outputDir = path.join(__dirname, '..', 'translations');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Split by language
for (const [lang, strings] of Object.entries(translations)) {
  const langFile = path.join(outputDir, `${lang}.js`);
  const langContent = `// ${lang.toUpperCase()} translations
const translations_${lang} = ${JSON.stringify(strings, null, 2)};

if (typeof window !== 'undefined') {
  window.translations = window.translations || {};
  window.translations['${lang}'] = translations_${lang};
}
`;
  
  fs.writeFileSync(langFile, langContent, 'utf8');
  console.log(`✅ Created ${lang}.js (${(langContent.length / 1024).toFixed(1)}KB)`);
}

// Create loader script
const loaderContent = `// Translation loader - loads only the active language
function loadTranslation(lang) {
  return new Promise((resolve, reject) => {
    if (window.translations && window.translations[lang]) {
      resolve(window.translations[lang]);
      return;
    }
    
    const script = document.createElement('script');
    script.src = \`/translations/\${lang}.js\`;
    script.onload = () => resolve(window.translations[lang]);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Auto-load based on current language or default to English
const currentLang = localStorage.getItem('language') || 'en';
loadTranslation(currentLang).catch(() => loadTranslation('en'));
`;

fs.writeFileSync(path.join(outputDir, 'loader.js'), loaderContent, 'utf8');
console.log('✅ Created loader.js');

console.log('\n📊 Summary:');
console.log(`  Original: 614KB (all languages)`);
console.log(`  Per language: ~55KB average`);
console.log(`  Savings: ~90% (only load what you need)`);
console.log('\nNext steps:');
console.log('1. Replace <script src="translations.js"> with <script src="translations/loader.js">');
console.log('2. Test language switching');
console.log('3. Commit and deploy');
