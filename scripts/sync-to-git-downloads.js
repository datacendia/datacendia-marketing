/**
 * sync-to-git-downloads.js
 * Copies all updated files from the marketing master to C:\Users\User\Downloads\git
 * Only copies files that exist in both locations.
 */
const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '..');
const DEST = 'C:\\Users\\User\\Downloads\\git';

// Files updated during DDGI rebrand
const UPDATED_FILES = [
  // Root HTML files
  'dgi.html',
  'dgi-dcii-comparison.html',
  'index.html',
  'dcii.html',
  'pricing.html',
  // Sitemap
  'sitemap.xml',
  // Translation files
  'translations/en.js',
  'translations/ar.js',
  'translations/de.js',
  'translations/es.js',
  'translations/fr.js',
  'translations/hi.js',
  'translations/it.js',
  'translations/ja.js',
  'translations/ko.js',
  'translations/pt.js',
  'translations/zh.js',
  // Localized dgi.html redirect pages
  'ar/dgi.html',
  'de/dgi.html',
  'es/dgi.html',
  'fr/dgi.html',
  'hi/dgi.html',
  'it/dgi.html',
  'ja/dgi.html',
  'ko/dgi.html',
  'pt/dgi.html',
  'zh/dgi.html',
  // Localized dgi-dcii-comparison.html redirect pages
  'ar/dgi-dcii-comparison.html',
  'de/dgi-dcii-comparison.html',
  'es/dgi-dcii-comparison.html',
  'fr/dgi-dcii-comparison.html',
  'hi/dgi-dcii-comparison.html',
  'it/dgi-dcii-comparison.html',
  'ja/dgi-dcii-comparison.html',
  'ko/dgi-dcii-comparison.html',
  'pt/dgi-dcii-comparison.html',
  'zh/dgi-dcii-comparison.html',
  // Localized index.html files
  'ar/index.html',
  'de/index.html',
  'es/index.html',
  'fr/index.html',
  'hi/index.html',
  'it/index.html',
  'ja/index.html',
  'ko/index.html',
  'pt/index.html',
  'zh/index.html',
  // manifesto.html (fixed broken script ref)
  'manifesto.html',
];

let copied = 0;
let skipped = 0;

for (const file of UPDATED_FILES) {
  const src = path.join(SRC, file);
  const dest = path.join(DEST, file);

  if (!fs.existsSync(src)) {
    console.log(`SKIP (src missing): ${file}`);
    skipped++;
    continue;
  }

  // Ensure destination directory exists
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`CREATED dir: ${destDir}`);
  }

  fs.copyFileSync(src, dest);
  console.log(`COPIED: ${file}`);
  copied++;
}

console.log(`\nDone — ${copied} files copied, ${skipped} skipped.`);
