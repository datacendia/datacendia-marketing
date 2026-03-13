/**
 * fix-truncated-i18n.cjs
 * 
 * Scans index.html for data-i18n elements, extracts their full innerHTML,
 * and patches en.json where values are truncated (shorter than the HTML source).
 * Then regenerates en.js.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HTML_FILE = path.join(ROOT, 'index.html');
const EN_JSON = path.join(ROOT, 'translations', 'en.json');
const EN_JS = path.join(ROOT, 'translations', 'en.js');

const html = fs.readFileSync(HTML_FILE, 'utf8');
const en = JSON.parse(fs.readFileSync(EN_JSON, 'utf8'));

// Extract all data-i18n elements and their innerHTML from the HTML
// Pattern: data-i18n="KEY">CONTENT</tag>
// We need to handle both self-contained elements and elements with children

const fixes = {};

// Match elements like: <tag ... data-i18n="KEY">CONTENT</tag>
// This regex captures the key and the content between > and </tag>
const regex = /data-i18n="([^"]+)"[^>]*>([\s\S]*?)<\/(?:h[1-6]|p|span|div|a|li|button|td|th|label)/g;

let match;
while ((match = regex.exec(html)) !== null) {
  const key = match[1];
  let content = match[2].trim();
  
  // Skip empty content
  if (!content) continue;
  
  // Skip if the content is just another element (nested data-i18n)
  if (content.startsWith('<') && !content.match(/^<(em|strong|a |b |i |code|mark|span )/)) continue;
  
  // Check if the en.json value is shorter/truncated compared to HTML
  const jsonValue = en[key];
  if (jsonValue === undefined) continue;
  
  // If JSON value is a prefix of the HTML content (truncated)
  if (content.length > jsonValue.length && content.startsWith(jsonValue)) {
    fixes[key] = { old: jsonValue, new: content };
  }
  
  // Also fix if JSON value matches but content has HTML tags the JSON is missing  
  if (content.includes('<em>') || content.includes('<strong>') || content.includes('<a ')) {
    const stripped = content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const jsonStripped = jsonValue.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    
    // If JSON has less content than the HTML source
    if (stripped.length > jsonStripped.length + 2 && !jsonValue.includes('<')) {
      fixes[key] = { old: jsonValue, new: content };
    }
  }
}

console.log(`Found ${Object.keys(fixes).length} truncated keys:\n`);

for (const [key, { old: oldVal, new: newVal }] of Object.entries(fixes)) {
  console.log(`  ${key}:`);
  console.log(`    OLD: "${oldVal}"`);
  console.log(`    NEW: "${newVal}"`);
  console.log();
  en[key] = newVal;
}

if (Object.keys(fixes).length > 0) {
  // Save JSON
  fs.writeFileSync(EN_JSON, JSON.stringify(en, null, 2) + '\n', 'utf8');
  
  // Regenerate JS
  const jsLines = [`const translations_en = {`];
  for (const [key, value] of Object.entries(en)) {
    const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    jsLines.push(`  "${key}": "${escaped}",`);
  }
  jsLines.push('};');
  jsLines.push(`if (typeof window !== 'undefined') window.translations_en = translations_en;`);
  fs.writeFileSync(EN_JS, jsLines.join('\n'), 'utf8');
  
  console.log(`✅ Fixed ${Object.keys(fixes).length} keys in en.json and en.js`);
} else {
  console.log('No truncated keys found.');
}
