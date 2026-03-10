const d = require('./untranslated-text.json');
const T = require('./page-translations-data.js');
function decode(s) {
  return s.replace(/&trade;/g, '\u2122').replace(/&mdash;/g, '\u2014')
    .replace(/&middot;/g, '\u00b7').replace(/&amp;/g, '&')
    .replace(/&rsquo;/g, '\u2019').replace(/&copy;/g, '\u00a9')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ');
}
// Normalize T keys
const NT = {};
for (const [k, v] of Object.entries(T)) { NT[k] = v; const dk = decode(k); if (dk !== k) NT[dk] = v; }

const SKIP = [/^contact@/, /^security@/, /^partners@/, /SYSTEM STATUS:/, /^\u00a9 20/, /^&copy; 20/,
  /^[a-f0-9]{20,}$/, /^\d{4}-\d{2}-\d{2}/, /^RR-\d+/, /^https?:\/\//];

// Show uncovered for specific pages
const pages = ['pricing.html','demos.html','team.html','partners.html','hospitality.html',
  'security-controls.html','honesty-matrices.html','gateway.html','manifesto.html',
  'dgi-dcii-comparison.html','trading.html','wargames.html','architecture.html',
  'changelog.html','roi-calculator.html','dcii.html','dgi.html','index.html','diagrams/index.html','learn/index.html'];

for (const p of pages) {
  const items = d[p] || [];
  const miss = [];
  for (const en of items) {
    if (SKIP.some(r => r.test(en))) continue;
    const dd = decode(en);
    if (!NT[en] && !NT[dd]) miss.push(en);
  }
  if (miss.length > 0) {
    console.log('=== ' + p + ' (' + miss.length + ' uncovered) ===');
    miss.forEach(m => console.log('  ' + m.substring(0, 100)));
    console.log();
  }
}
