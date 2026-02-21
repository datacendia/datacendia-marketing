/**
 * Inject all new index.html i18n keys into all 11 language split files.
 * Uses English values as fallback for all languages.
 * Keys that already exist are skipped.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en', 'ar', 'de', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'zh'];

const NEW_KEYS = JSON.parse(fs.readFileSync(path.join(__dirname, 'index-new-keys.json'), 'utf8'));

LANGS.forEach(lang => {
  const f = path.join(ROOT, 'translations', lang + '.js');
  let content = fs.readFileSync(f, 'utf8');

  // Parse existing keys
  const m = content.match(/const translations_\w+ = (\{[\s\S]*?\});\s*\n\s*if/);
  if (!m) { console.log('CANNOT PARSE: ' + lang); return; }
  let obj;
  try { obj = eval('(' + m[1] + ')'); } catch(e) { console.log('EVAL ERROR ' + lang + ': ' + e.message); return; }

  const existing = new Set(Object.keys(obj));
  const toAdd = Object.entries(NEW_KEYS).filter(([k]) => !existing.has(k));

  if (toAdd.length === 0) { console.log('SKIP (all exist): ' + lang); return; }

  // Build insertion string — add before the closing };
  // Find the last }; in the const block
  const closingMatch = content.match(/(\n\};\s*\nif\s*\(typeof)/);
  if (!closingMatch) { console.log('NO CLOSING FOUND: ' + lang); return; }

  const insertionLines = toAdd.map(([k, v]) => {
    const escaped = String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    return '  ' + k + ': "' + escaped + '"';
  }).join(',\n');

  // Find the position just before \n};\nif
  const closingIdx = content.lastIndexOf('\n};\n\nif');
  if (closingIdx === -1) { console.log('CLOSING IDX NOT FOUND: ' + lang); return; }

  // Check if last char before closing is a comma
  const beforeClosing = content.slice(0, closingIdx);
  const needsComma = !beforeClosing.trimEnd().endsWith(',');
  const prefix = needsComma ? ',\n' : '\n';

  content = content.slice(0, closingIdx) + prefix + insertionLines + content.slice(closingIdx);
  fs.writeFileSync(f, content, 'utf8');
  console.log('ADDED ' + toAdd.length + ' keys to: translations/' + lang + '.js');
});

// Verify
console.log('\n=== VERIFICATION ===');
LANGS.forEach(lang => {
  const f = path.join(ROOT, 'translations', lang + '.js');
  const content = fs.readFileSync(f, 'utf8');
  const m = content.match(/const translations_\w+ = (\{[\s\S]*?\});\s*\n\s*if/);
  if (!m) { console.log(lang + ': NO MATCH'); return; }
  try {
    const obj = eval('(' + m[1] + ')');
    console.log(lang + ': OK — ' + Object.keys(obj).length + ' keys');
  } catch(e) {
    console.log(lang + ': ERROR — ' + e.message);
  }
});
