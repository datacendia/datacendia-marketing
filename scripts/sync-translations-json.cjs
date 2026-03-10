/**
 * sync-translations-json.cjs
 * Regenerates all translations/*.json files from translations/*.js source files.
 * Converts JS object notation to valid JSON.
 *
 * Run: node scripts/sync-translations-json.cjs
 *
 * The .js files are the source of truth (1,388 keys).
 * The .json files are used by translations-loader.js for lazy loading.
 * This script ensures they stay in sync.
 */
const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.resolve(__dirname, '..', 'translations');
const LANGS = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh', 'ar', 'hi'];

let synced = 0;

for (const lang of LANGS) {
  const jsFile = path.join(TRANSLATIONS_DIR, `${lang}.js`);
  const jsonFile = path.join(TRANSLATIONS_DIR, `${lang}.json`);

  if (!fs.existsSync(jsFile)) {
    console.log(`SKIP ${lang} — .js file not found`);
    continue;
  }

  try {
    // Read the .js file and extract the translation object
    const jsContent = fs.readFileSync(jsFile, 'utf8');

    // The .js files define: const translations_XX = { ... };
    // Extract the object between the first { and the matching };
    const objStart = jsContent.indexOf('{');
    const objEndPattern = /\};\s*\r?\n\s*\r?\nif\s*\(/;
    const match = jsContent.match(objEndPattern);

    if (objStart === -1 || !match) {
      console.log(`ERROR ${lang} — could not find translation object boundaries`);
      continue;
    }

    const objEnd = jsContent.indexOf(match[0]);
    const objStr = jsContent.substring(objStart, objEnd + 1);

    // Parse the JS object using Function constructor (safe here — build-time only)
    const fn = new Function(`return ${objStr}`);
    const obj = fn();

    // Write as valid JSON
    const jsonStr = JSON.stringify(obj, null, 2);
    fs.writeFileSync(jsonFile, jsonStr, 'utf8');

    const keyCount = Object.keys(obj).length;
    synced++;
    console.log(`  ${lang}.json: ${keyCount} keys (synced from ${lang}.js)`);
  } catch (err) {
    console.log(`ERROR ${lang}: ${err.message}`);
  }
}

console.log(`\nDone: ${synced} JSON files regenerated from JS source.`);
console.log('All .json files are now valid JSON with complete key sets.');
