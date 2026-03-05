/**
 * rebrand-dgi-to-ddgi.js
 * Updates translation VALUE strings from DGI → DDGI and
 * "Decision Governance Intelligence" → "Datacendia Decision Governance Infrastructure"
 * in all 11 language translation files.
 * Does NOT rename translation keys (dgi* keys stay as-is).
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];

let totalChanges = 0;

for (const lang of LANGS) {
  const file = path.join(ROOT, 'translations', lang + '.js');
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Replace full name first (before acronym to avoid double-replace)
  content = content.replace(/Decision Governance Intelligence/g, 'Datacendia Decision Governance Infrastructure');

  // Replace standalone acronym "DGI" in values only — careful not to hit key names like dgiPageTitle
  // Keys are always followed by a colon, values are in quotes — replace " DGI " / "(DGI)" / "DGI " at word boundaries in quoted strings
  // Strategy: replace DGI when it appears as a word in the value side (after the colon+quote)
  // We do line-by-line to be safe
  const lines = content.split('\n');
  const updated = lines.map(line => {
    // Skip lines that are key definitions (e.g. "  dgiPageTitle: ...")
    // Only process value strings — replace DGI as a word in the value portion
    // Match: key: "...DGI..." — replace DGI in the value
    return line.replace(/(\s*\w+:\s*")(.+)(")/g, (match, pre, val, post) => {
      const newVal = val
        .replace(/\bDGI\b/g, 'DDGI')
        .replace(/\bDgi\b/g, 'Ddgi');
      return pre + newVal + post;
    });
  });
  content = updated.join('\n');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    const changes = (original.match(/\bDGI\b/g) || []).length;
    console.log(`UPDATED translations/${lang}.js — ~${changes} DGI occurrences replaced`);
    totalChanges++;
  } else {
    console.log(`SKIP translations/${lang}.js — no changes`);
  }
}

console.log(`\nDone — ${totalChanges} translation files updated.`);
