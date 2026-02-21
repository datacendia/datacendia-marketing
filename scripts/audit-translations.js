/**
 * audit-translations.js
 * Checks for: missing keys, orphaned keys, keys used in HTML but absent from en.js
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

// Collect all keys used in HTML
const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
const usedKeys = new Set();
const keyToFiles = {};
htmlFiles.forEach(f => {
  const c = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const matches = c.match(/data-i18n="([^"]+)"/g) || [];
  matches.forEach(m => {
    const k = m.match(/data-i18n="([^"]+)"/)[1];
    usedKeys.add(k);
    if (!keyToFiles[k]) keyToFiles[k] = [];
    keyToFiles[k].push(f);
  });
});

// Collect all keys defined in en.js
const enContent = fs.readFileSync(path.join(ROOT, 'translations', 'en.js'), 'utf8');
const definedKeys = new Set();
const keyMatches = enContent.match(/^\s+(\w+):/gm) || [];
keyMatches.forEach(m => definedKeys.add(m.trim().replace(':', '')));

// Missing: used in HTML but not defined in en.js
const missing = [...usedKeys].filter(k => !definedKeys.has(k)).sort();
// Orphaned: defined in en.js but not used in any HTML
const orphaned = [...definedKeys].filter(k => !usedKeys.has(k)).sort();

console.log('=== TRANSLATION AUDIT ===');
console.log('Keys used in HTML:     ' + usedKeys.size);
console.log('Keys defined in en.js: ' + definedKeys.size);
console.log('');

if (missing.length) {
  console.log('MISSING from en.js (' + missing.length + ') — used in HTML but no translation key:');
  missing.forEach(k => console.log('  ' + k + '  [' + keyToFiles[k].join(', ') + ']'));
} else {
  console.log('MISSING: none ✓');
}

console.log('');

if (orphaned.length) {
  console.log('ORPHANED in en.js (' + orphaned.length + ') — defined but never used in HTML:');
  orphaned.slice(0, 30).forEach(k => console.log('  ' + k));
  if (orphaned.length > 30) console.log('  ... and ' + (orphaned.length - 30) + ' more');
} else {
  console.log('ORPHANED: none ✓');
}

// Check all 11 langs have same key count as en
console.log('');
console.log('=== LANGUAGE PARITY ===');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const enCount = definedKeys.size;
LANGS.forEach(lang => {
  const c = fs.readFileSync(path.join(ROOT, 'translations', lang + '.js'), 'utf8');
  const m = c.match(/const\s+\w+\s*=\s*\{([\s\S]*?)\};\s*\n\s*if/);
  if (!m) { console.log(lang + ': PARSE ERROR'); return; }
  const count = (m[1].match(/^\s+\w+:/gm) || []).length;
  const delta = count - enCount;
  console.log(lang + ': ' + count + ' keys' + (delta !== 0 ? ' (DELTA: ' + delta + ')' : ' ✓'));
});
