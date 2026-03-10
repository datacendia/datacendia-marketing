/**
 * add-i18n-tags.cjs
 * Programmatically adds data-i18n attributes to untagged text elements
 * in specified HTML pages. Generates unique camelCase keys based on
 * page prefix + element context.
 *
 * Run: node scripts/add-i18n-tags.cjs
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Target pages (worst offenders from coverage audit)
const TARGET_PAGES = [
  'verticals.html',
  'trust.html',
  'protocol.html',
  'demos.html',
  'pricing.html',
  'dcii.html',
  'diagrams.html',
  'api-docs.html',
  'case-studies.html',
  'gateway.html',
  'premium.html',
  'regulators-receipt.html',
  'wargames.html',
  'dgi.html',
  'platform-capabilities.html',
  'honesty-matrices.html',
  'pilot.html',
  'roi-calculator.html',
  'security-controls.html',
  'briefing.html',
  'team.html',
  'manifesto.html',
  'index.html',
  'trading.html',
  'hospitality.html',
  'changelog.html',
  'partners.html',
  'privacy.html',
  'terms.html',
  '404.html',
  'dgi-dcii-comparison.html',
  'architecture.html',
];

// Page prefix mapping for key generation
const PAGE_PREFIX = {
  'verticals.html': 'vert',
  'trust.html': 'trust',
  'protocol.html': 'prot',
  'demos.html': 'demos',
  'pricing.html': 'price',
  'dcii.html': 'dcii',
  'diagrams.html': 'diag',
  'api-docs.html': 'api',
  'case-studies.html': 'cs',
  'gateway.html': 'gw',
  'premium.html': 'prem',
  'regulators-receipt.html': 'reg',
  'wargames.html': 'wg',
  'dgi.html': 'dgi',
  'platform-capabilities.html': 'pc',
  'honesty-matrices.html': 'hm',
  'pilot.html': 'pilot',
  'roi-calculator.html': 'roi',
  'security-controls.html': 'sec',
  'briefing.html': 'brief',
  'team.html': 'team',
  'manifesto.html': 'man',
  'index.html': 'idx',
  'trading.html': 'trd',
  'hospitality.html': 'hosp',
  'changelog.html': 'cl',
  'partners.html': 'part',
  'privacy.html': 'priv',
  'terms.html': 'tos',
  '404.html': 'err',
  'dgi-dcii-comparison.html': 'cmp',
  'architecture.html': 'arch',
};

// Tags that contain translatable text
const TEXT_TAGS = ['h1','h2','h3','h4','h5','h6','p','li','td','th','span','a','button','summary','label','strong','em','dt','dd','figcaption','caption','div'];

// Generate a camelCase key from text content
function textToKey(prefix, tag, text, index) {
  // Clean the text
  let clean = text
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Take first 4-5 meaningful words
  const words = clean.split(' ').filter(w => w.length > 1).slice(0, 5);
  if (words.length === 0) return null;

  // Build camelCase key
  const camel = words.map((w, i) => {
    w = w.toLowerCase();
    if (i === 0) return w;
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join('');

  return `${prefix}${tag.charAt(0).toUpperCase() + tag.slice(1)}${camel.charAt(0).toUpperCase() + camel.slice(1)}`;
}

// Check if a line is inside a script or style block
function isInScriptOrStyle(lines, lineIndex) {
  let inScript = false;
  let inStyle = false;
  for (let i = 0; i <= lineIndex; i++) {
    const line = lines[i].toLowerCase();
    if (line.includes('<script')) inScript = true;
    if (line.includes('</script')) inScript = false;
    if (line.includes('<style')) inStyle = true;
    if (line.includes('</style')) inStyle = false;
  }
  return inScript || inStyle;
}

let totalAdded = 0;
const allNewKeys = {};

for (const file of TARGET_PAGES) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) {
    console.log(`Skipping ${file} (not found)`);
    continue;
  }

  const prefix = PAGE_PREFIX[file] || file.replace('.html', '');
  let content = fs.readFileSync(fp, 'utf8');
  const lines = content.split('\n');
  let fileAdded = 0;
  const usedKeys = new Set();

  // Collect existing data-i18n keys to avoid duplicates
  const existingKeys = content.match(/data-i18n="([^"]+)"/g) || [];
  existingKeys.forEach(k => {
    const m = k.match(/data-i18n="([^"]+)"/);
    if (m) usedKeys.add(m[1]);
  });

  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip lines that already have data-i18n
    if (line.includes('data-i18n')) continue;

    // Skip comment lines
    if (line.trim().startsWith('<!--')) continue;

    // Skip if inside script/style
    if (isInScriptOrStyle(lines, i)) continue;

    // Match opening tags of text elements
    for (const tag of TEXT_TAGS) {
      // Pattern: <tag ...>text content
      // We need to match tags that have text content directly
      const tagRegex = new RegExp(`(<${tag})(\\s[^>]*)?>([^<]{3,})`, 'gi');
      let match;

      while ((match = tagRegex.exec(line)) !== null) {
        const fullMatch = match[0];
        const tagOpen = match[1]; // e.g., <h2
        const attrs = match[2] || '';
        const textContent = match[3].trim();

        // Skip if already has data-i18n in attrs
        if (attrs && attrs.includes('data-i18n')) continue;

        // Skip very short or non-translatable text
        if (textContent.length < 3) continue;
        if (/^[\d\s\.\,\;\:\-\—\–\|\&\#\→\←\↑\↓\•\·\×\+\=\%\$\€\£\/\\]+$/.test(textContent)) continue;
        if (textContent.startsWith('&') || textContent.startsWith('{') || textContent.startsWith('//')) continue;
        if (/^[a-z\-]+$/.test(textContent)) continue;

        // Skip certain classes/patterns that shouldn't be translated
        if (attrs && (attrs.includes('class="toc-number"') || attrs.includes('class="section-number"') || attrs.includes('class="dimension-num"') || attrs.includes('class="band-range"'))) continue;

        // Skip code blocks and pre elements
        if (attrs && (attrs.includes('class="code') || attrs.includes('<pre') || attrs.includes('<code'))) continue;

        // Skip if text is just a URL or email
        if (/^https?:\/\//.test(textContent) || /^[^\s]+@[^\s]+\.[^\s]+$/.test(textContent)) continue;

        // Generate key
        let key = textToKey(prefix, tag, textContent, i);
        if (!key) continue;

        // Ensure unique key
        let uniqueKey = key;
        let counter = 2;
        while (usedKeys.has(uniqueKey)) {
          uniqueKey = `${key}${counter}`;
          counter++;
        }
        usedKeys.add(uniqueKey);

        // Add data-i18n attribute
        const replacement = `${tagOpen} data-i18n="${uniqueKey}"${attrs || ''}>` + match[3];

        // Only replace the first occurrence on this line
        lines[i] = lines[i].replace(fullMatch, replacement);
        fileAdded++;

        // Store the key and its English text for translation files
        allNewKeys[uniqueKey] = textContent.substring(0, 200);

        // Break inner loop since we modified the line
        break;
      }
    }
  }

  // Write modified content
  fs.writeFileSync(fp, lines.join('\n'), 'utf8');
  totalAdded += fileAdded;
  console.log(`${file}: added ${fileAdded} data-i18n attributes`);
}

// Save new keys to a JSON file for translation file updates
const keysFile = path.join(ROOT, 'scripts', 'new-i18n-keys.json');
fs.writeFileSync(keysFile, JSON.stringify(allNewKeys, null, 2), 'utf8');

console.log(`\nTotal: ${totalAdded} data-i18n attributes added across ${TARGET_PAGES.length} pages`);
console.log(`New keys saved to: scripts/new-i18n-keys.json (${Object.keys(allNewKeys).length} keys)`);
