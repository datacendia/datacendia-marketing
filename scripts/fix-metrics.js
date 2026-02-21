/**
 * Fix agent count metric (62 → 14) across all locale homepage files.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const locales = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'zh'];
let fixed = 0;

for (const loc of locales) {
  const filePath = path.join(ROOT, loc, 'index.html');
  if (!fs.existsSync(filePath)) {
    console.log(`  Skip: ${loc}/index.html (not found)`);
    continue;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const oldContent = content;

  // Fix agent count 62 → 14
  content = content.replace('"number">62<', '"number">14<');

  if (content !== oldContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✓ Fixed: ${loc}/index.html`);
    fixed++;
  }
}

console.log(`\nDone: ${fixed} locale files fixed`);
