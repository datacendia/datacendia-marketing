/**
 * DEEP AUDIT: Root pages — find visible text WITHOUT data-i18n attributes
 * 
 * This checks every root HTML page (excluding demos) to find text content
 * that is hardcoded and NOT covered by data-i18n, which means it will
 * NEVER translate when the language selector is used.
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
// Exclude demos (interactive apps) and resources helper pages
const mainPages = allRootHtml.filter(f => {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  return !rel.startsWith('demos/') && !rel.startsWith('resources/') && !rel.startsWith('trust/');
});

console.log(`Auditing ${mainPages.length} main root pages for data-i18n coverage\n`);

// For each page, find elements with visible text that DON'T have data-i18n
// Strategy: find all text between > and < that is substantial (>4 chars, not just whitespace/symbols)
// Then check if the containing tag has data-i18n

let totalIssues = 0;

for (const file of mainPages) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  
  // Skip pages without translations-loader.js (they don't support i18n)
  if (!content.includes('translations-loader.js') && !content.includes('translations.js')) {
    continue;
  }
  
  // Remove JSON-LD scripts, regular scripts, styles, and HTML comments
  let html = content;
  html = html.replace(/<!--[\s\S]*?-->/g, '');
  html = html.replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[\s\S]*?<\/style>/gi, '');
  
  // Find text nodes: content between > and <
  // But ALSO track the opening tag to check for data-i18n
  const issues = [];
  
  // Match: opening tag + text content + closing tag
  // We need to find text that is NOT inside a data-i18n element
  const textRegex = />([^<]{5,})</g;
  let match;
  while ((match = textRegex.exec(html)) !== null) {
    const text = match[1].trim();
    if (text.length < 5) continue;
    
    // Skip if it's just symbols, numbers, whitespace, URLs, CSS
    if (/^[\d\s\.\,\;\:\-\+\*\#\@\!\?\&\%\$\=\(\)\[\]\{\}\/\\|~`'"→←·•—\u00a9\u2022\u2013\u2014\u2019\u201c\u201d]+$/.test(text)) continue;
    if (/^https?:\/\//.test(text)) continue;
    if (/^[a-z\-]+\s*:\s*[a-z\d]+/i.test(text) && text.length < 30) continue; // CSS-like
    if (/^(var\(|rgba|#[0-9a-f])/.test(text)) continue;
    if (/^\s*\{/.test(text)) continue; // JSON
    
    // Check if the preceding tag has data-i18n
    const before = html.substring(Math.max(0, match.index - 500), match.index + 1);
    
    // Find the last opening tag before this text
    const tagMatch = before.match(/<[^/][^>]*>$/);
    if (!tagMatch) continue;
    const tag = tagMatch[0];
    
    // Skip if tag has data-i18n attribute
    if (/data-i18n/.test(tag)) continue;
    
    // Skip meta tags, link tags, option tags
    if (/^<(meta|link|option|input|img|source|br|hr)\b/i.test(tag)) continue;
    
    // Skip if it's inside a parent that has data-i18n (check for common wrapper patterns)
    // This is a heuristic — we check if the text appears within 200 chars of a data-i18n element
    const nearbyBefore = html.substring(Math.max(0, match.index - 200), match.index);
    
    // Only flag if the text looks like meaningful English content
    const englishWords = ['the', 'and', 'for', 'with', 'your', 'our', 'this', 'that', 'from', 'are', 'was', 'will', 'can', 'not', 'all', 'has', 'how', 'you'];
    const words = text.toLowerCase().split(/\s+/);
    const hasEnglishWords = words.some(w => englishWords.includes(w));
    
    if (hasEnglishWords && text.length > 10) {
      // Truncate for display
      const display = text.length > 80 ? text.substring(0, 80) + '...' : text;
      issues.push(display);
    }
  }
  
  if (issues.length > 0) {
    console.log(`\n${rel}: ${issues.length} untranslatable text segments:`);
    // Deduplicate
    const unique = [...new Set(issues)];
    unique.slice(0, 15).forEach(i => console.log(`  - "${i}"`));
    if (unique.length > 15) console.log(`  ... and ${unique.length - 15} more`);
    totalIssues += unique.length;
  }
}

console.log(`\n=== TOTAL: ${totalIssues} text segments without data-i18n across all root pages ===\n`);

// Also check: are there data-i18n keys in HTML that DON'T have English translations in en.json?
const enPath = path.join(ROOT, 'translations', 'en.json');
const enText = fs.readFileSync(enPath, 'utf8');
const enFn = new Function(`return ${enText}`);
const enObj = enFn();

// Check HTML data-i18n keys vs en.json
let missingCount = 0;
for (const file of allRootHtml) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const regex = /data-i18n(?:-html|-placeholder)?="([^"]+)"/g;
  let m;
  const missing = [];
  while ((m = regex.exec(content)) !== null) {
    if (enObj[m[1]] === undefined) {
      missing.push(m[1]);
    }
  }
  if (missing.length > 0) {
    console.log(`${rel}: ${missing.length} data-i18n keys NOT in en.json:`);
    missing.forEach(k => console.log(`  - "${k}"`));
    missingCount += missing.length;
  }
}

if (missingCount === 0) {
  console.log('All data-i18n keys in HTML are present in en.json ✓');
}
