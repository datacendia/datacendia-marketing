/**
 * Generate _page content translations for all language JSON files.
 * Reads translation data from page-translations-data.js and untranslated-text.json,
 * then injects _page data into each language's JSON file.
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const LANGS = ['es','fr','de','pt','it','ja','ko','zh','ar','hi'];

function decode(s) {
  return s.replace(/&trade;/g,'\u2122').replace(/&mdash;/g,'\u2014')
    .replace(/&middot;/g,'\u00b7').replace(/&amp;/g,'&').replace(/&rsquo;/g,'\u2019')
    .replace(/&copy;/g,'\u00a9').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&quot;/g,'"').replace(/&lsquo;/g,'\u2018')
    .replace(/&rdquo;/g,'\u201d').replace(/&ldquo;/g,'\u201c').replace(/&nbsp;/g,' ');
}

// Load and normalize translation data — store both raw and decoded keys
const T_raw = require('./page-translations-data.js');
const T = {};
for (const [key, val] of Object.entries(T_raw)) {
  T[key] = val;
  const d = decode(key);
  if (d !== key) T[d] = val;
}
const pageItems = require('./untranslated-text.json');

// Skip patterns for items that don't need translation
const SKIP = [/^contact@/, /^security@/, /^partners@/, /SYSTEM STATUS:/, /^© 20/, /^&copy; 20/,
  /^[a-f0-9]{20,}/, /^\d{4}-\d{2}-\d{2}/, /^RR-\d+/, /^https?:\/\//];

function shouldSkip(text) {
  return SKIP.some(p => p.test(text));
}

for (let li = 0; li < LANGS.length; li++) {
  const lang = LANGS[li];
  const filePath = path.join(ROOT, 'translations', `${lang}.json`);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove existing _page data for re-injection
  const pageIdx = content.indexOf(',\n    _page:');
  if (pageIdx !== -1) {
    content = content.substring(0, pageIdx) + '\n}';
  }

  const _page = {};
  let totalPairs = 0;

  // Build page-specific entries (including _global items applied to all pages)
  for (const [pageName, items] of Object.entries(pageItems)) {
    const pairs = [];
    for (const en of items) {
      if (shouldSkip(en)) continue;
      const decoded = decode(en);
      // Check both raw and decoded forms
      const tr = T[en]?.[li] || T[decoded]?.[li];
      if (tr) {
        pairs.push([decoded, tr]);
      }
    }
    if (pairs.length > 0) {
      _page[pageName] = pairs;
      totalPairs += pairs.length;
    }
  }

  // Serialize _page
  let pageStr = '    _page: {\n';
  for (const [key, pairs] of Object.entries(_page)) {
    const k = /^[a-zA-Z_]\w*$/.test(key) ? key : `"${key}"`;
    pageStr += `        ${k}: [\n`;
    for (const [en, tr] of pairs) {
      pageStr += `            [${JSON.stringify(en)}, ${JSON.stringify(tr)}],\n`;
    }
    pageStr += '        ],\n';
  }
  pageStr += '    }\n';

  // Inject before closing brace
  const lastBrace = content.lastIndexOf('}');
  content = content.substring(0, lastBrace) + ',\n' + pageStr + '}';
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  Updated ${lang}.json: ${totalPairs} translation pairs across ${Object.keys(_page).length} pages`);
}

console.log('\nDone. _page data injected into all language JSON files.');
