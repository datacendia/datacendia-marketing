/**
 * Translation Verification Script
 *
 * Checks all translation keys for completeness across
 * all 11 supported languages. Reports missing keys.
 * Run: node verify-translations.js
 */

const fs = require('fs');
const path = require('path');

// Load translations
const content = fs.readFileSync('translations.js', 'utf8');
const match = content.match(/const translations = (\{[\s\S]*?\n\});/m);
const translations = eval('(' + match[1] + ')');
const enKeys = new Set(Object.keys(translations.en));

// Find all HTML files recursively
function findHtmlFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (item.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = findHtmlFiles('.');
console.log(`Found ${htmlFiles.length} HTML files\n`);

// Extract all data-i18n keys from HTML files
let allUsedKeys = new Set();
let keysByFile = {};

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const keys = new Set();
  
  // Match data-i18n="key"
  const matches1 = html.match(/data-i18n="([^"]+)"/g) || [];
  matches1.forEach(m => {
    const key = m.match(/data-i18n="([^"]+)"/)[1];
    keys.add(key);
    allUsedKeys.add(key);
  });
  
  // Match data-i18n-html="key"
  const matches2 = html.match(/data-i18n-html="([^"]+)"/g) || [];
  matches2.forEach(m => {
    const key = m.match(/data-i18n-html="([^"]+)"/)[1];
    keys.add(key);
    allUsedKeys.add(key);
  });
  
  // Match data-i18n-placeholder="key"
  const matches3 = html.match(/data-i18n-placeholder="([^"]+)"/g) || [];
  matches3.forEach(m => {
    const key = m.match(/data-i18n-placeholder="([^"]+)"/)[1];
    keys.add(key);
    allUsedKeys.add(key);
  });
  
  if (keys.size > 0) {
    keysByFile[file] = keys;
  }
}

console.log(`Total unique translation keys used in HTML: ${allUsedKeys.size}`);
console.log(`Total translation keys available: ${enKeys.size}\n`);

// Find keys used in HTML but missing from translations
const missingKeys = [...allUsedKeys].filter(k => !enKeys.has(k));

if (missingKeys.length > 0) {
  console.log(`❌ MISSING KEYS (${missingKeys.length} keys used in HTML but not in translations):`);
  missingKeys.forEach(k => console.log(`  - ${k}`));
  
  // Show which files use missing keys
  console.log('\nFiles using missing keys:');
  for (const [file, keys] of Object.entries(keysByFile)) {
    const missing = [...keys].filter(k => missingKeys.includes(k));
    if (missing.length > 0) {
      console.log(`  ${file}: ${missing.join(', ')}`);
    }
  }
} else {
  console.log('✅ All keys used in HTML files exist in translations!');
}

// Summary by language
console.log('\n--- Language Coverage ---');
const langs = Object.keys(translations);
langs.forEach(lang => {
  const langKeys = Object.keys(translations[lang]);
  const coverage = (langKeys.length / enKeys.size * 100).toFixed(1);
  const missing = [...enKeys].filter(k => !translations[lang][k]);
  console.log(`${lang}: ${langKeys.length}/${enKeys.size} keys (${coverage}%) - Missing: ${missing.length}`);
});
