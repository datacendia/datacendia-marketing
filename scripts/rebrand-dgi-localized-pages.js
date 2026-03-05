/**
 * rebrand-dgi-localized-pages.js
 * Updates DGI → DDGI in all localized redirect pages and index.html nav dropdowns.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['ar','de','es','fr','hi','it','ja','ko','pt','zh'];

let totalFiles = 0;

// 1. Update localized dgi.html redirect pages
for (const lang of LANGS) {
  const file = path.join(ROOT, lang, 'dgi.html');
  if (!fs.existsSync(file)) { console.log(`SKIP ${lang}/dgi.html — not found`); continue; }
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  content = content.replace(/\bDGI\b/g, 'DDGI');
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`UPDATED ${lang}/dgi.html`);
    totalFiles++;
  }
}

// 2. Update localized dgi-dcii-comparison.html redirect pages
for (const lang of LANGS) {
  const file = path.join(ROOT, lang, 'dgi-dcii-comparison.html');
  if (!fs.existsSync(file)) { console.log(`SKIP ${lang}/dgi-dcii-comparison.html — not found`); continue; }
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  content = content.replace(/\bDGI\b/g, 'DDGI');
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`UPDATED ${lang}/dgi-dcii-comparison.html`);
    totalFiles++;
  }
}

// 3. Update localized index.html nav dropdown DGI references
for (const lang of LANGS) {
  const file = path.join(ROOT, lang, 'index.html');
  if (!fs.existsSync(file)) { console.log(`SKIP ${lang}/index.html — not found`); continue; }
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  // Only replace DGI in nav dropdown text (not in URLs like /dgi.html)
  content = content.replace(/DGI フレームワーク/g, 'DDGI フレームワーク');
  content = content.replace(/DGI 프레임워크/g, 'DDGI 프레임워크');
  content = content.replace(/DGI-Framework/g, 'DDGI-Framework');
  // Generic: replace "DGI" as a word in visible text (not in href paths)
  // Replace patterns like ">DGI<" or ">DGI " or " DGI<" in nav text nodes
  content = content.replace(/>DGI フレームワーク</g, '>DDGI フレームワーク<');
  content = content.replace(/>DGI 프레임워크</g, '>DDGI 프레임워크<');
  content = content.replace(/>DGI框架</g, '>DDGI框架<');
  content = content.replace(/>DGI-Rahmenwerk</g, '>DDGI-Rahmenwerk');
  content = content.replace(/>Marco DGI</g, '>Marco DDGI<');
  content = content.replace(/>Cadre DGI</g, '>Cadre DDGI<');
  content = content.replace(/>DGI Framework</g, '>DDGI Framework<');
  content = content.replace(/>DGI फ्रेमवर्क</g, '>DDGI फ्रेमवर्क<');
  content = content.replace(/>Framework DGI</g, '>Framework DDGI<');
  // Catch remaining word-boundary DGI in text nodes (between > and <)
  content = content.replace(/(<[^>]+>)([^<]*)\bDGI\b([^<]*<)/g, (m, tag, before, after) => {
    return tag + before + 'DDGI' + after;
  });
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`UPDATED ${lang}/index.html`);
    totalFiles++;
  } else {
    console.log(`SKIP ${lang}/index.html — no changes needed`);
  }
}

console.log(`\nDone — ${totalFiles} files updated.`);
