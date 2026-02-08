/**
 * Fix navigation consistency across all HTML pages.
 * Ensures every page has: Demos, Industries, Learn, Pricing, Pilot Program, Trust, Request Briefing
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// Find all HTML files recursively
function findHtmlFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      findHtmlFiles(full, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

// Determine relative prefix from file to root
function getPrefix(filePath) {
  const rel = path.relative(ROOT, path.dirname(filePath)).replace(/\\/g, '/');
  if (!rel) return '';
  const depth = rel.split('/').length;
  return '../'.repeat(depth);
}

// Detect locale from path (e.g., ar/index.html -> 'ar')
function getLocale(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  const locales = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'zh'];
  for (const loc of locales) {
    if (rel.startsWith(loc + '/')) return loc;
  }
  return null;
}

// Detect which page this is (for active state)
function getPageId(filePath) {
  const name = path.basename(filePath);
  const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
  if (name === 'demos.html') return 'demos';
  if (name === 'verticals.html') return 'verticals';
  if (name === 'pricing.html') return 'pricing';
  if (name === 'pilot.html') return 'pilot';
  if (name === 'trust.html') return 'trust';
  if (name === 'briefing.html') return 'briefing';
  if (rel.includes('learn/') || rel.includes('learn\\')) return 'learn';
  return null;
}

// Build nav HTML for English pages
function buildEnglishNav(prefix, pageId, isLearnSubdir) {
  const learnHref = isLearnSubdir ? '../' : (prefix ? prefix + 'learn/' : 'learn/');
  const items = [
    { href: `${prefix}demos.html`, i18n: 'navDemos', label: 'Demos', id: 'demos' },
    { href: `${prefix}verticals.html`, i18n: 'navVerticals', label: 'Industries', id: 'verticals' },
    { href: learnHref, i18n: 'navLearn', label: 'Learn', id: 'learn' },
    { href: `${prefix}pricing.html`, i18n: 'navPricing', label: 'Pricing', id: 'pricing' },
    { href: `${prefix}pilot.html`, i18n: 'navPilot', label: 'Pilot Program', id: 'pilot' },
    { href: `${prefix}trust.html`, i18n: 'navTrust', label: 'Trust', id: 'trust' },
    { href: `${prefix}briefing.html`, i18n: 'navBriefing', label: 'Request Briefing', id: 'briefing' },
  ];

  // For learn/index.html, use './' for learn link
  if (pageId === 'learn' && !isLearnSubdir) {
    const learnItem = items.find(i => i.id === 'learn');
    if (learnItem) learnItem.href = './';
  }

  const links = items.map(item => {
    const active = item.id === pageId ? ' class="active"' : '';
    return `        <a href="${item.href}"${active} data-i18n="${item.i18n}">${item.label}</a>`;
  });

  return `      <nav class="main-nav">\n${links.join('\n')}\n      </nav>`;
}

let fixed = 0;
let skipped = 0;
let errors = 0;

const files = findHtmlFiles(ROOT);
console.log(`Found ${files.length} HTML files`);

for (const filePath of files) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Skip files without main-nav
    if (!content.includes('class="main-nav"')) {
      skipped++;
      continue;
    }

    const locale = getLocale(filePath);
    
    // Skip locale pages - they have translated labels we shouldn't touch
    if (locale) {
      skipped++;
      continue;
    }

    // Skip resource pages that have their own nav structure  
    const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
    if (rel.startsWith('resources/') || rel.startsWith('trust/')) {
      skipped++;
      continue;
    }

    const prefix = getPrefix(filePath);
    const pageId = getPageId(filePath);
    const isLearnSubdir = rel.match(/^learn\/[^/]+\//) !== null;

    // Match the nav block
    const navRegex = /(<nav class="main-nav">)([\s\S]*?)(<\/nav>)/;
    const match = content.match(navRegex);
    if (!match) {
      skipped++;
      continue;
    }

    const newNav = buildEnglishNav(prefix, pageId, isLearnSubdir);
    const newContent = content.replace(navRegex, newNav);

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  ✓ Fixed: ${rel}`);
      fixed++;
    } else {
      skipped++;
    }
  } catch (err) {
    console.log(`  ✗ Error: ${path.relative(ROOT, filePath)} - ${err.message}`);
    errors++;
  }
}

console.log(`\nDone: ${fixed} fixed, ${skipped} skipped, ${errors} errors`);
