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

// Show what's matching and what's not for index.html
const page = 'index.html';
const items = d[page] || [];
console.log('=== ' + page + ' ===');
for (const en of items) {
  if (SKIP.some(r => r.test(en))) { console.log('SKIP', en.substring(0,60)); continue; }
  const dd = decode(en);
  const found = !!T[en] || !!T[dd];
  console.log(found ? 'OK  ' : 'MISS', en.substring(0, 80));
}
