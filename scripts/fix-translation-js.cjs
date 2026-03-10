/**
 * fix-translation-js.cjs
 * Repairs translation JS files where keys were injected after the closing brace.
 * Restructures: moves all key-value pairs inside the translation object,
 * then appends the window.translations assignment.
 *
 * Run: node scripts/fix-translation-js.cjs
 */
const fs = require('fs');
const path = require('path');

const TRANS_DIR = path.resolve(__dirname, '..', 'translations');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','es','fr','de','pt','it','ja','ko','zh','ar','hi'];

// Step 1: Collect ALL data-i18n keys + English text from HTML files
const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
const htmlKeys = {};
for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(ROOT, file), 'utf8');
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
console.log(`Found ${Object.keys(htmlKeys).length} data-i18n keys in HTML files`);

for (const lang of LANGS) {
  const jsFile = path.join(TRANS_DIR, `${lang}.js`);
  if (!fs.existsSync(jsFile)) continue;

  const content = fs.readFileSync(jsFile, 'utf8');
  const varName = `translations_${lang}`;

  // Extract ALL key-value pairs from the file (both inside and outside the object)
  // Strategy: collect every "key": "value" pair from the entire file
  const allPairs = {};
  const pairRegex = /["']([^"']+)["']\s*:\s*["']([^"]*(?:\\.[^"]*)*)["']/g;
  let m;
  while ((m = pairRegex.exec(content)) !== null) {
    const key = m[1];
    const value = m[2];
    // Skip window/translations assignment artifacts
    if (key === 'undefined' || key.includes('window') || key.includes('translations')) continue;
    allPairs[key] = value;
  }

  // Also handle multi-line values with template literals or escaped content
  // Extract from original object before the break point
  const firstBrace = content.indexOf('{');
  const originalObjMatch = content.match(/\};\s*\n\s*\nif\s*\(/);
  if (originalObjMatch) {
    const endIdx = content.indexOf(originalObjMatch[0]);
    const originalSection = content.substring(firstBrace, endIdx + 1);
    // Re-parse original section more carefully
    const origPairRegex = /["']([^"']+)["']\s*:\s*"((?:[^"\\]|\\.)*)"/g;
    let om;
    while ((om = origPairRegex.exec(originalSection)) !== null) {
      if (!allPairs[om[1]]) {
        allPairs[om[1]] = om[2];
      }
    }
  }

  // Add any HTML keys that are missing (using English text as fallback for all langs)
  for (const [key, enText] of Object.entries(htmlKeys)) {
    if (!allPairs[key]) {
      const escaped = enText.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      allPairs[key] = escaped;
    }
  }

  console.log(`${lang}.js: ${Object.keys(allPairs).length} total keys`);

  // Rebuild the file
  let output = `// ${lang.toUpperCase()} translations\nconst ${varName} = {\n`;
  const entries = Object.entries(allPairs);
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    const comma = i < entries.length - 1 ? ',' : '';
    output += `  "${key}": "${value}"${comma}\n`;
  }
  output += `};\n\nif (typeof window !== 'undefined') {\n  window.translations = window.translations || {};\n  window.translations['${lang}'] = ${varName};\n}\n`;

  fs.writeFileSync(jsFile, output, 'utf8');
}

// Step 2: Regenerate JSON files
console.log('\nRegenerating JSON files...');
for (const lang of LANGS) {
  const jsFile = path.join(TRANS_DIR, `${lang}.js`);
  const jsonFile = path.join(TRANS_DIR, `${lang}.json`);
  if (!fs.existsSync(jsFile)) continue;

  const jsContent = fs.readFileSync(jsFile, 'utf8');
  const firstBrace = jsContent.indexOf('{');
  const objEndMatch = jsContent.match(/\};\s*\n/);
  if (!objEndMatch || firstBrace === -1) {
    console.log(`  ${lang}.json: SKIP (could not parse)`);
    continue;
  }
  const endIdx = jsContent.indexOf(objEndMatch[0]);
  const objStr = jsContent.substring(firstBrace, endIdx + 1);

  try {
    const fn = new Function('return ' + objStr);
    const obj = fn();
    fs.writeFileSync(jsonFile, JSON.stringify(obj, null, 2), 'utf8');
    console.log(`  ${lang}.json: ${Object.keys(obj).length} keys`);
  } catch (e) {
    console.log(`  ${lang}.json: FAILED - ${e.message}`);
  }
}

console.log('\nDone!');
