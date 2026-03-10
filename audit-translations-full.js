/**
 * COMPREHENSIVE TRANSLATION AUDIT
 * 
 * 1. Extract ALL data-i18n keys from ALL HTML pages
 * 2. Check every translation JSON for missing keys
 * 3. Scan language folder pages for remaining English text
 * 4. Check which pages have translations-loader.js + lang selector
 * 5. Find hardcoded visible English text in language folder pages
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

// ============================================================
// PART 1: Find all HTML pages and extract data-i18n keys
// ============================================================
function findHtmlFiles(dir, results = [], depth = 0) {
  if (depth > 3) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && !['node_modules', '.git', '.github', 'assets', 'scripts', 'docs', 'translations'].includes(e.name)) {
      findHtmlFiles(full, results, depth + 1);
    } else if (e.isFile() && e.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const allHtml = findHtmlFiles(ROOT);
const LANGS = ['ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const rootPages = allHtml.filter(f => {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  return !rel.includes('/') || rel.startsWith('demos/') || rel.startsWith('resources/');
});
const langPages = allHtml.filter(f => {
  const rel = path.relative(ROOT, f).replace(/\\/g, '/');
  return LANGS.some(l => rel.startsWith(l + '/'));
});

console.log(`\n=== TRANSLATION AUDIT ===`);
console.log(`Total HTML files: ${allHtml.length}`);
console.log(`Root/demo/resource pages: ${rootPages.length}`);
console.log(`Language folder pages: ${langPages.length}`);

// ============================================================
// PART 2: Extract all data-i18n keys from root pages
// ============================================================
const allKeys = new Map(); // key -> Set of pages that use it

for (const file of rootPages) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  
  // Find data-i18n="key" and data-i18n-html="key" and data-i18n-placeholder="key"
  const regex = /data-i18n(?:-html|-placeholder)?="([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const key = match[1];
    if (!allKeys.has(key)) allKeys.set(key, new Set());
    allKeys.get(key).add(rel);
  }
}

console.log(`\nTotal unique data-i18n keys found in HTML: ${allKeys.size}`);

// ============================================================
// PART 3: Check translation files for missing keys
// ============================================================
console.log(`\n--- MISSING TRANSLATION KEYS BY LANGUAGE ---`);

const allLangs = ['en', ...LANGS];
const translationData = {};

for (const lang of allLangs) {
  const jsonPath = path.join(ROOT, 'translations', `${lang}.json`);
  if (!fs.existsSync(jsonPath)) {
    console.log(`  MISSING FILE: translations/${lang}.json`);
    continue;
  }
  try {
    const text = fs.readFileSync(jsonPath, 'utf8');
    const fn = new Function(`return ${text}`);
    translationData[lang] = fn();
  } catch (e) {
    console.log(`  PARSE ERROR: translations/${lang}.json — ${e.message}`);
  }
}

// Check English has all keys
const enKeys = translationData['en'] ? Object.keys(translationData['en']) : [];
console.log(`\nEnglish translation keys: ${enKeys.length}`);

// Find keys used in HTML but missing from English
const missingFromEn = [];
for (const [key] of allKeys) {
  if (!translationData['en'] || translationData['en'][key] === undefined) {
    missingFromEn.push(key);
  }
}
if (missingFromEn.length > 0) {
  console.log(`\n  KEYS IN HTML BUT MISSING FROM en.json (${missingFromEn.length}):`);
  missingFromEn.forEach(k => {
    const pages = [...allKeys.get(k)].join(', ');
    console.log(`    - "${k}" (used in: ${pages})`);
  });
}

// Check each language for missing keys relative to English
for (const lang of LANGS) {
  if (!translationData[lang]) continue;
  const missing = [];
  for (const key of enKeys) {
    if (translationData[lang][key] === undefined) {
      missing.push(key);
    }
  }
  if (missing.length > 0) {
    console.log(`\n  ${lang.toUpperCase()}: Missing ${missing.length} keys from en.json:`);
    // Show first 30
    missing.slice(0, 30).forEach(k => console.log(`    - "${k}"`));
    if (missing.length > 30) console.log(`    ... and ${missing.length - 30} more`);
  } else {
    console.log(`\n  ${lang.toUpperCase()}: All ${enKeys.length} keys present ✓`);
  }
}

// ============================================================
// PART 4: Check which root pages have translations-loader.js & lang selector
// ============================================================
console.log(`\n--- ROOT PAGES: TRANSLATION INFRASTRUCTURE ---`);

const pagesWithoutLoader = [];
const pagesWithoutSelector = [];

for (const file of rootPages) {
  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  
  const hasLoader = content.includes('translations-loader.js') || content.includes('translations.js');
  const hasSelector = content.includes('lang-selector') || content.includes('lang-dropdown') || content.includes('lang-btn');
  const hasI18nKeys = /data-i18n/.test(content);
  
  if (!hasLoader && hasI18nKeys) {
    pagesWithoutLoader.push(rel);
  }
  if (!hasSelector) {
    pagesWithoutSelector.push(rel);
  }
}

if (pagesWithoutLoader.length) {
  console.log(`\n  Pages with data-i18n but NO translations-loader.js (${pagesWithoutLoader.length}):`);
  pagesWithoutLoader.forEach(p => console.log(`    - ${p}`));
}
if (pagesWithoutSelector.length) {
  console.log(`\n  Pages WITHOUT language selector (${pagesWithoutSelector.length}):`);
  pagesWithoutSelector.forEach(p => console.log(`    - ${p}`));
}

// ============================================================
// PART 5: Scan language folder pages for remaining English text
// ============================================================
console.log(`\n--- LANGUAGE FOLDER PAGES: REMAINING ENGLISH TEXT ---`);

// Common English phrases that should be translated
const englishPatterns = [
  // Section headers
  />\s*How It Works\s*</,
  />\s*What We Actually Build\s*</,
  />\s*Real technology\. No fake metrics\.\s*</,
  />\s*Deployment Truth Table\s*</,
  />\s*Time-to-Value Honesty\s*</,
  />\s*How is this different\?\s*</,
  // FAQ
  />\s*Is this BI\?\s*</,
  />\s*Is this another AI API\?\s*</,
  />\s*Is this analytics/,
  />\s*Why "Sovereign"\?\s*</,
  // Architecture
  />\s*Data Sources\s*<\/div>/,
  />\s*Connector Suites\s*<\/div>/,
  />\s*Evidence Ledger\s*<\/div>/,
  />\s*Export Packets\s*<\/div>/,
  // Cards
  />\s*AI Council Agents\s*</,
  />\s*Cryptographic Signing\s*</,
  />\s*Air-Gap Capable\s*</,
  />\s*What this means\s*<\/summary>/,
  />\s*Working now/,
  // Footer
  /Ready to own your AI decisions/,
  /See Results in 90 Days/,
  />Leadership<\/a>/,
  />Protocol<\/a>/,
  />War Games<\/a>/,
  />Security<\/a>/,
  // Misc
  />\s*Questions\?\s*</,
  /Not BI\. Not another AI API/,
  /All processing on/,
  />\s*Setup time\s*<\/div>/,
  />\s*Auto-updates\s*<\/div>/,
  />\s*Milestone\s*<\/div>/,
  />\s*Capability\s*<\/div>/,
  // Common UI
  />\s*Full guide →\s*</,
  /Learn how The Council works/,
  /Learn more about/,
  /our compliance frameworks/,
  /Join our pilot program/,
  /No\. BI dashboards show you/,
  /No\. AI APIs give you predictions/,
  /Closer, but incomplete/,
  /Because your data never leaves/,
  // Signal card details
  /Multi-agent deliberation with specialized/,
  /Every decision cryptographically signed/,
  /Deploy entirely on your infrastructure/,
  /Cryptographic signing authority/,
  /Unified evidence storage/,
  // Responsibility matters
  /Responsibility matters most/,
  // Integration honesty
  /All vendors say.*easy integration/,
  /Things break\. The question is/,
  /Understand the trade-offs/,
  /Every platform has its limits/,
];

for (const lang of LANGS) {
  const langDir = path.join(ROOT, lang);
  if (!fs.existsSync(langDir)) continue;
  
  const langFiles = findHtmlFiles(langDir);
  let totalEnglish = 0;
  
  for (const file of langFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    const found = [];
    
    for (const pattern of englishPatterns) {
      if (pattern.test(content)) {
        found.push(pattern.source.substring(0, 40));
      }
    }
    
    if (found.length > 0) {
      console.log(`\n  ${rel}: ${found.length} English patterns found:`);
      found.forEach(f => console.log(`    - ${f}`));
      totalEnglish += found.length;
    }
  }
  
  if (totalEnglish === 0) {
    console.log(`  ${lang.toUpperCase()}: No English text patterns found ✓`);
  }
}

// ============================================================
// PART 6: Check language folder pages have correct lang-switcher
// ============================================================
console.log(`\n--- LANGUAGE FOLDER PAGES: INFRASTRUCTURE CHECK ---`);

for (const lang of LANGS) {
  const langDir = path.join(ROOT, lang);
  if (!fs.existsSync(langDir)) continue;
  
  const langFiles = findHtmlFiles(langDir);
  const issues = [];
  
  for (const file of langFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    
    // Check for lang-switcher.js
    if (!content.includes('lang-switcher.js')) {
      issues.push(`${rel}: missing lang-switcher.js`);
    }
    // Check html lang attribute matches folder
    const langAttrMatch = content.match(/<html\s+lang="([^"]+)"/);
    if (langAttrMatch && langAttrMatch[1] !== lang) {
      issues.push(`${rel}: html lang="${langAttrMatch[1]}" should be "${lang}"`);
    }
    // Check viewport
    if (!content.includes('viewport')) {
      issues.push(`${rel}: missing viewport meta tag`);
    }
  }
  
  if (issues.length > 0) {
    console.log(`\n  ${lang.toUpperCase()} issues:`);
    issues.forEach(i => console.log(`    - ${i}`));
  }
}

// ============================================================
// PART 7: Deep English text scan in language pages
// ============================================================
console.log(`\n--- DEEP SCAN: Hardcoded English visible text in lang pages ---`);

// Extract visible text from HTML (strip tags, scripts, styles, comments)
function extractVisibleText(html) {
  // Remove comments
  let text = html.replace(/<!--[\s\S]*?-->/g, '');
  // Remove scripts
  text = text.replace(/<script[\s\S]*?<\/script>/gi, '');
  // Remove styles
  text = text.replace(/<style[\s\S]*?<\/style>/gi, '');
  // Remove JSON-LD
  text = text.replace(/<script\s+type="application\/ld\+json"[\s\S]*?<\/script>/gi, '');
  // Get text content between tags
  const fragments = [];
  const tagRegex = />([^<]+)</g;
  let m;
  while ((m = tagRegex.exec(text)) !== null) {
    const t = m[1].trim();
    if (t.length > 3 && !/^[\d\s\.\,\;\:\-\+\*\#\@\!\?\&\%\$\=\(\)\[\]\{\}\/\\|~`'"→←·•]+$/.test(t)) {
      fragments.push(t);
    }
  }
  return fragments;
}

// Common English words/phrases that indicate untranslated content
const englishIndicators = [
  'What this means', 'Working now', 'What We', 'How It Works', 'Ready to',
  'See Results', 'Join our', 'Learn how', 'Learn more', 'Full guide',
  'Every decision', 'Multi-agent deliberation', 'Deploy entirely',
  'Cryptographic signing authority', 'Unified evidence storage',
  'Setup time', 'Auto-updates', 'Data leaves', 'Ops burden',
  'CLOUD Act exempt', 'Metadata only', 'Offline pkg', 'First dashboard',
  'First agent', 'Production rollout', 'Audit-ready evidence',
  'Timelines assume', 'Setup times depend', 'Realistic timelines',
  'Milestone', 'Dependencies', 'Responsibility matters',
  'All vendors say', 'Things break', 'Understand the trade-offs',
  'Every platform has', 'What works where',
  'No. BI dashboards', 'No. AI APIs', 'Closer, but incomplete',
  'Because your data never',
  'All processing on', 'Questions?', 'Not BI. Not another',
  'we\'re a new platform', 'to create real results',
];

for (const lang of LANGS) {
  const langDir = path.join(ROOT, lang);
  if (!fs.existsSync(langDir)) continue;
  
  const langFiles = findHtmlFiles(langDir);
  
  for (const file of langFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const rel = path.relative(ROOT, file).replace(/\\/g, '/');
    const found = [];
    
    for (const indicator of englishIndicators) {
      if (content.includes(indicator)) {
        found.push(indicator);
      }
    }
    
    if (found.length > 0) {
      console.log(`\n  ${rel}: ${found.length} English text indicators:`);
      found.forEach(f => console.log(`    - "${f}"`));
    }
  }
}

console.log(`\n=== AUDIT COMPLETE ===\n`);
