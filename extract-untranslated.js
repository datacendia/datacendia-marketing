/**
 * Extract exact text content of elements without data-i18n from all root pages.
 * Outputs JSON that can be used to build _page translation dictionaries.
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const LANGS = ['ar','de','es','fr','hi','it','ja','ko','pt','zh'];

function findHtmlFiles(dir, results = [], depth = 0) {
  if (depth > 3) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && !['node_modules', '.git', '.github', 'assets', 'scripts', 'docs', 'translations', ...LANGS].includes(e.name)) {
      findHtmlFiles(full, results, depth + 1);
    } else if (e.isFile() && e.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const allRootHtml = findHtmlFiles(ROOT);
const mainPages = allRootHtml.filter(f => {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  return !rel.startsWith('demos/') && !rel.startsWith('resources/') && !rel.startsWith('trust/');
});

const result = {};
let totalItems = 0;

for (const file of mainPages) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  
  if (!content.includes('translations-loader.js') && !content.includes('translations.js')) continue;
  
  // Strip non-visible content
  let html = content;
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  html = html.replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[\s\S]*?<\/style>/gi, '');
  
  // Find text between > and <
  const textRegex = />([^<]{5,})</g;
  let match;
  const items = [];
  const seen = new Set();
  
  while ((match = textRegex.exec(html)) !== null) {
    const text = match[1].trim();
    if (text.length < 5) continue;
    if (/^[\d\s\.\,\;\:\-\+\*\#\@\!\?\&\%\$\=\(\)\[\]\{\}\/\\|~`'"→←·•—©\u00a9\u2022\u2013\u2014\u2019\u201c\u201d]+$/.test(text)) continue;
    if (/^https?:\/\//.test(text)) continue;
    if (/^[a-z\-]+\s*:\s*[a-z\d]+/i.test(text) && text.length < 30) continue;
    if (/^\s*\{/.test(text)) continue;
    if (/^(var\(|rgba|#[0-9a-f])/.test(text)) continue;
    
    // Check for English content
    const words = text.toLowerCase().split(/\s+/);
    const englishWords = ['the','and','for','with','your','our','this','that','from','are','was','will','can','not','all','has','how','you','we','is','or','an','in','of','to','on','at','by','be','it','as','if','no','do','so','up','every','what','when','where','why','who'];
    const hasEnglish = words.some(w => englishWords.includes(w)) || text.length > 15;
    if (!hasEnglish) continue;
    
    // Check if preceded by data-i18n
    const before = html.substring(Math.max(0, match.index - 500), match.index + 1);
    const tagMatch = before.match(/<[^/][^>]*>$/);
    if (!tagMatch) continue;
    const tag = tagMatch[0];
    if (/data-i18n/.test(tag)) continue;
    if (/^<(meta|link|option|input|img|source|br|hr)\b/i.test(tag)) continue;
    
    // Deduplicate
    if (seen.has(text)) continue;
    seen.add(text);
    
    items.push(text);
  }
  
  if (items.length > 0) {
    result[rel] = items;
    totalItems += items.length;
  }
}

// Output as JSON
fs.writeFileSync(
  path.join(ROOT, 'untranslated-text.json'),
  JSON.stringify(result, null, 2),
  'utf8'
);

console.log(`Extracted ${totalItems} untranslated text items across ${Object.keys(result).length} pages`);
for (const [page, items] of Object.entries(result)) {
  console.log(`  ${page}: ${items.length} items`);
}
