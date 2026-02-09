const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const locales = ['ar','de','es','fr','hi','it','ja','ko','pt','zh'];

let relLinks = 0, absLinks = 0;
const relExamples = new Set();

for (const loc of locales) {
  const p = path.join(ROOT, loc, 'index.html');
  const c = fs.readFileSync(p, 'utf8');
  const re = /href="([^"]+)"/g;
  let m;
  while ((m = re.exec(c)) !== null) {
    const v = m[1];
    if (v.startsWith('http') || v.startsWith('//') || v.startsWith('#') || v.startsWith('mailto:') || v.startsWith('tel:') || v.startsWith('javascript:')) continue;
    if (v.startsWith('/')) absLinks++;
    else { relLinks++; relExamples.add(v.split('?')[0]); }
  }
}

console.log('Absolute (OK):', absLinks);
console.log('Relative (broken from subdirs):', relLinks);
console.log('Unique relative targets:', [...relExamples].join(', '));
