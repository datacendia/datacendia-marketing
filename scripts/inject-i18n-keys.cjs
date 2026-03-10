/**
 * inject-i18n-keys.cjs
 * 1. Scans all HTML files for data-i18n keys
 * 2. Reads existing translation JS files
 * 3. Adds missing keys (English text from HTML) to all JS files
 * 4. Regenerates JSON files from updated JS
 *
 * Run: node scripts/inject-i18n-keys.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TRANS_DIR = path.join(ROOT, 'translations');
const LANGS = ['en','es','fr','de','pt','it','ja','ko','zh','ar','hi'];

// Step 1: Collect all data-i18n keys + their English text from HTML
console.log('Step 1: Scanning HTML for data-i18n keys...');
const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
const htmlKeys = {};

for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(ROOT, file), 'utf8');
  // Match data-i18n="keyName">text content
  const regex = /data-i18n="([^"]+)"[^>]*>([^<]*)/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const key = m[1];
    const text = m[2].trim();
    if (text && text.length > 0 && !htmlKeys[key]) {
      htmlKeys[key] = text;
    }
  }
}
console.log(`  Found ${Object.keys(htmlKeys).length} unique data-i18n keys in HTML`);

// Step 2: Read existing JS translation files and extract keys
console.log('\nStep 2: Reading existing translation JS files...');
const existingKeys = {};

for (const lang of LANGS) {
  const jsFile = path.join(TRANS_DIR, `${lang}.js`);
  if (!fs.existsSync(jsFile)) continue;
  const content = fs.readFileSync(jsFile, 'utf8');
  
  // Extract all keys from the JS object
  const keyRegex = /"([^"]+)"\s*:/g;
  let m;
  const keys = new Set();
  while ((m = keyRegex.exec(content)) !== null) {
    keys.add(m[1]);
  }
  existingKeys[lang] = keys;
}

const enKeys = existingKeys['en'] || new Set();
console.log(`  English JS has ${enKeys.size} existing keys`);

// Step 3: Find missing keys
const missingKeys = {};
for (const [key, text] of Object.entries(htmlKeys)) {
  if (!enKeys.has(key)) {
    missingKeys[key] = text;
  }
}
console.log(`  Missing keys to add: ${Object.keys(missingKeys).length}`);

if (Object.keys(missingKeys).length === 0) {
  console.log('\nNo missing keys found. All HTML data-i18n keys already exist in translation files.');
  process.exit(0);
}

// Step 4: Append missing keys to all JS translation files
console.log('\nStep 3: Injecting missing keys into JS translation files...');

for (const lang of LANGS) {
  const jsFile = path.join(TRANS_DIR, `${lang}.js`);
  if (!fs.existsSync(jsFile)) continue;
  
  let content = fs.readFileSync(jsFile, 'utf8');
  
  // Find the last closing brace of the translations object
  const lastBraceIndex = content.lastIndexOf('}');
  if (lastBraceIndex === -1) continue;
  
  // Check if there's a semicolon after
  const afterBrace = content.substring(lastBraceIndex + 1).trim();
  
  // Build new key entries
  let newEntries = '';
  for (const [key, enText] of Object.entries(missingKeys)) {
    // For English, use the actual text. For other languages, use English as placeholder
    const value = lang === 'en' ? enText : enText;
    // Escape quotes in value
    const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    newEntries += `  "${key}": "${escaped}",\n`;
  }
  
  // Insert before the closing brace
  const beforeBrace = content.substring(0, lastBraceIndex);
  // Ensure there's a comma after the last existing entry
  const trimmedBefore = beforeBrace.trimEnd();
  const needsComma = !trimmedBefore.endsWith(',') && !trimmedBefore.endsWith('{');
  
  const updatedContent = 
    (needsComma ? trimmedBefore + ',\n' : trimmedBefore + '\n') +
    '\n  // --- Auto-generated i18n keys (coverage expansion) ---\n' +
    newEntries +
    '}' + (afterBrace.startsWith(';') ? '' : ';') + '\n';
  
  fs.writeFileSync(jsFile, updatedContent, 'utf8');
  console.log(`  ${lang}.js: added ${Object.keys(missingKeys).length} keys`);
}

// Step 5: Regenerate JSON files from JS
console.log('\nStep 4: Regenerating JSON files from updated JS...');

for (const lang of LANGS) {
  const jsFile = path.join(TRANS_DIR, `${lang}.js`);
  const jsonFile = path.join(TRANS_DIR, `${lang}.json`);
  if (!fs.existsSync(jsFile)) continue;
  
  const jsContent = fs.readFileSync(jsFile, 'utf8');
  
  // Extract the object by finding content between first { and last }
  const firstBrace = jsContent.indexOf('{');
  const lastBrace = jsContent.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1) continue;
  
  let objStr = jsContent.substring(firstBrace, lastBrace + 1);
  
  // Convert JS object notation to valid JSON
  // Fix trailing commas before }
  objStr = objStr.replace(/,\s*}/g, '}');
  // Fix trailing commas before ]
  objStr = objStr.replace(/,\s*]/g, ']');
  // Ensure all keys are double-quoted (they should be already)
  
  try {
    const obj = JSON.parse(objStr);
    fs.writeFileSync(jsonFile, JSON.stringify(obj, null, 2), 'utf8');
    console.log(`  ${lang}.json: ${Object.keys(obj).length} keys (regenerated)`);
  } catch (e) {
    // Try with eval as fallback for JS-specific syntax
    try {
      const fn = new Function('return ' + objStr);
      const obj = fn();
      fs.writeFileSync(jsonFile, JSON.stringify(obj, null, 2), 'utf8');
      console.log(`  ${lang}.json: ${Object.keys(obj).length} keys (regenerated via eval)`);
    } catch (e2) {
      console.error(`  ${lang}.json: FAILED to parse - ${e2.message}`);
    }
  }
}

console.log('\nDone! All translation files updated.');
console.log(`Summary: ${Object.keys(missingKeys).length} new keys added to ${LANGS.length} language files.`);
