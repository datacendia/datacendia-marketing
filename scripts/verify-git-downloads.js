/**
 * verify-git-downloads.js
 * Verifies DDGI rebrand changes are present in C:\Users\User\Downloads\git
 */
const fs = require('fs');
const path = require('path');

const DEST = 'C:\\Users\\User\\Downloads\\git';

const checks = [
  // [file, string that MUST exist, string that must NOT exist]
  ['dgi.html', 'DDGI', null],
  ['dgi.html', 'Datacendia Decision Governance Infrastructure', null],
  ['dgi.html', null, '<title>DGI '],
  ['dgi-dcii-comparison.html', 'DDGI vs DCII', null],
  ['dgi-dcii-comparison.html', 'Datacendia Decision Governance Infrastructure', null],
  ['index.html', 'DDGI', null],
  ['dcii.html', 'DDGI', null],
  ['pricing.html', 'DDGI', null],
  ['sitemap.xml', 'DDGI', null],
  ['manifesto.html', 'translations.js', null],
  ['translations/en.js', 'DDGI', null],
  ['translations/en.js', 'Datacendia Decision Governance Infrastructure', null],
  ['ar/dgi.html', 'DDGI', null],
  ['de/dgi.html', 'DDGI', null],
  ['es/dgi.html', 'DDGI', null],
  ['fr/dgi.html', 'DDGI', null],
  ['ar/dgi-dcii-comparison.html', 'DDGI', null],
  ['ar/index.html', 'DDGI', null],
];

let passed = 0;
let failed = 0;

for (const [file, mustHave, mustNotHave] of checks) {
  const fullPath = path.join(DEST, file);
  if (!fs.existsSync(fullPath)) {
    console.log(`FAIL [missing file]: ${file}`);
    failed++;
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');

  if (mustHave && !content.includes(mustHave)) {
    console.log(`FAIL [missing "${mustHave}"]: ${file}`);
    failed++;
  } else if (mustHave) {
    console.log(`PASS [has "${mustHave}"]: ${file}`);
    passed++;
  }

  if (mustNotHave && content.includes(mustNotHave)) {
    console.log(`FAIL [still has "${mustNotHave}"]: ${file}`);
    failed++;
  } else if (mustNotHave) {
    console.log(`PASS [no "${mustNotHave}"]: ${file}`);
    passed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed.`);
