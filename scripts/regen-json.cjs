/**
 * regen-json.cjs
 * Robustly regenerates JSON translation files from JS source.
 * Handles escaped quotes, HTML content, and other tricky values
 * by parsing line-by-line instead of using eval.
 *
 * Run: node scripts/regen-json.cjs
 */
const fs = require('fs');
const path = require('path');

const TRANS_DIR = path.resolve(__dirname, '..', 'translations');
const LANGS = ['en','es','fr','de','pt','it','ja','ko','zh','ar','hi'];

for (const lang of LANGS) {
  const jsFile = path.join(TRANS_DIR, `${lang}.js`);
  const jsonFile = path.join(TRANS_DIR, `${lang}.json`);
  if (!fs.existsSync(jsFile)) continue;

  const content = fs.readFileSync(jsFile, 'utf8');
  const lines = content.split('\n');
  const obj = {};
  let inObject = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect start of object
    if (line.includes('= {')) {
      inObject = true;
      continue;
    }
    
    // Detect end of object  
    if (inObject && /^\s*\};/.test(line)) {
      inObject = false;
      continue;
    }

    if (!inObject) continue;

    // Skip comments
    if (line.trim().startsWith('//')) continue;

    // Match "key": "value" pattern - handle the full line
    // Use a careful regex that captures the key and then everything after the first ": "
    const keyMatch = line.match(/^\s*"([^"]+)"\s*:\s*"(.*)$/);
    if (!keyMatch) continue;

    const key = keyMatch[1];
    let value = keyMatch[2];

    // Remove trailing comma and/or quote
    // The value should end with ", or " or ",
    if (value.endsWith('",')) {
      value = value.slice(0, -2);
    } else if (value.endsWith('"')) {
      value = value.slice(0, -1);
    }

    // Fix truncated values that end with \" (escaped quote that got cut off)
    // These are values where the regex-based extraction cut at an internal quote
    if (value.endsWith('\\')) {
      value = value.slice(0, -1);
    }

    obj[key] = value;
  }

  fs.writeFileSync(jsonFile, JSON.stringify(obj, null, 2), 'utf8');
  console.log(`${lang}.json: ${Object.keys(obj).length} keys`);
}

console.log('\nAll JSON files regenerated.');
