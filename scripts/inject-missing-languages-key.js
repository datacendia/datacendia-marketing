/**
 * inject-missing-languages-key.js
 * Adds the missing 'languages' key to all 11 translation files.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const CLOSE_PATTERN = '\n};\n\nif (typeof window';

let injected = 0;
for (const lang of LANGS) {
  const file = path.join(ROOT, 'translations', lang + '.js');
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('  languages:')) { console.log(`SKIP ${lang} — already present`); continue; }
  const block = '\n  languages: "Languages",';
  const idx = content.indexOf(CLOSE_PATTERN);
  const before = content.slice(0, idx).trimEnd();
  const after = content.slice(idx).trimStart();
  const needsComma = !before.endsWith(',');
  content = before + (needsComma ? ',' : '') + block + '\n' + after;
  fs.writeFileSync(file, content, 'utf8');
  console.log(`ADDED languages key to: translations/${lang}.js`);
  injected++;
}
console.log(`\nDone — ${injected} files updated.`);
