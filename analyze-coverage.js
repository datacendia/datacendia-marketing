const d = require('./untranslated-text.json');
const T = require('./page-translations-data.js');

function decode(s) {
  return s.replace(/&trade;/g, '\u2122').replace(/&mdash;/g, '\u2014')
    .replace(/&middot;/g, '\u00b7').replace(/&amp;/g, '&')
    .replace(/&rsquo;/g, '\u2019').replace(/&copy;/g, '\u00a9')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ');
}

const SKIP = [
  /^contact@/, /^security@/, /^partners@/, /SYSTEM STATUS:/,
  /^\u00a9 20/, /^&copy; 20/, /^[a-f0-9]{20,}$/,
  /^\d{4}-\d{2}-\d{2}/, /^RR-\d+/, /^https?:\/\//
];

let covered = 0, uncovered = 0;
for (const [p, items] of Object.entries(d)) {
  let pu = 0;
  for (const en of items) {
    if (SKIP.some(r => r.test(en))) continue;
    const dd = decode(en);
    if (!T[en] && !T[dd]) pu++;
    else covered++;
  }
  if (pu > 0) console.log(p + ': ' + pu + ' uncovered');
  uncovered += pu;
}
console.log('\nCOVERED:', covered, 'UNCOVERED:', uncovered);
