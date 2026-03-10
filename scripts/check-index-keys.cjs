const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const c = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const en = require(path.join(root, 'translations/en.json'));
const es = require(path.join(root, 'translations/es.json'));

const re = /data-i18n="([^"]+)"/g;
let m, checked = 0, translated = 0, english = 0, missing = 0;
const englishSamples = [];
const missingSamples = [];

while ((m = re.exec(c)) !== null) {
  const k = m[1];
  checked++;
  if (!es[k]) {
    missing++;
    if (missingSamples.length < 10) missingSamples.push(k);
  } else if (es[k] === en[k]) {
    english++;
    if (englishSamples.length < 20) englishSamples.push(k + ': ' + (en[k] || '').substring(0, 60));
  } else {
    translated++;
  }
}

console.log('index.html: ' + checked + ' tags');
console.log('  Translated: ' + translated);
console.log('  Still English: ' + english);
console.log('  Missing from JSON: ' + missing);
console.log('\nStill English samples:');
englishSamples.forEach(s => console.log('  ' + s));
console.log('\nMissing samples:');
missingSamples.forEach(s => console.log('  ' + s));
