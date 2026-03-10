/**
 * audit-page-i18n.cjs — Check which pages have translation support
 */
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));
const results = [];

htmlFiles.forEach(f => {
  const c = fs.readFileSync(path.join(root, f), 'utf8');
  const hasLoader = c.includes('translations-loader.js');
  const hasSwitcher = c.includes('lang-switcher.js');
  const hasDropdown = c.includes('lang-selector');
  const tags = (c.match(/data-i18n/g) || []).length;
  results.push({ file: f, loader: hasLoader, switcher: hasSwitcher, dropdown: hasDropdown, tags });
});

console.log('L=loader S=switcher D=dropdown Tags File');
console.log('─'.repeat(50));
results.forEach(r => {
  const L = r.loader ? 'Y' : '-';
  const S = r.switcher ? 'Y' : '-';
  const D = r.dropdown ? 'Y' : '-';
  console.log(`${L}  ${S}  ${D}  ${String(r.tags).padStart(4)}  ${r.file}`);
});

const missing = results.filter(r => !r.loader || !r.switcher || !r.dropdown);
console.log(`\n${missing.length} pages missing i18n support:`);
missing.forEach(r => {
  const parts = [];
  if (!r.loader) parts.push('loader');
  if (!r.switcher) parts.push('switcher');
  if (!r.dropdown) parts.push('dropdown');
  console.log(`  ${r.file}: missing ${parts.join(', ')}`);
});
