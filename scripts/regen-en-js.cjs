const fs = require('fs');
const path = require('path');
const f = path.resolve(__dirname, '..', 'translations', 'en.json');
const j = JSON.parse(fs.readFileSync(f, 'utf8'));
const lines = ['const translations_en = {'];
for (const [k, v] of Object.entries(j)) {
  const escaped = String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  lines.push(`  "${k}": "${escaped}",`);
}
lines.push('};');
lines.push('if (typeof window !== "undefined") window.translations_en = translations_en;');
fs.writeFileSync(path.resolve(__dirname, '..', 'translations', 'en.js'), lines.join('\n'));
console.log('en.js regenerated');
