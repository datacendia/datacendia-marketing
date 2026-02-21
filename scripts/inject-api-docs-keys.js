/**
 * inject-api-docs-keys.js
 * Injects new i18n keys for api-docs.html into all 11 language files.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const CLOSE_PATTERN = '\n};\n\nif (typeof window';

const NEW_KEYS = {
  apiPageTitle: 'API Documentation',
  apiStatEndpoints: 'Endpoints',
  apiStatProtocol: 'Protocol',
  apiStatSpec: 'OpenAPI Spec',
  apiStatFormat: 'Format',
  apiStatVersion: 'API Version',
  apiAuthTitle: 'Authentication',
  apiBaseUrl: 'Base URL',
  apiSec1Title: 'Core Suite — The Council',
  apiSec2Title: 'Decision Intelligence — Chronos & Cascade',
  apiSec3Title: 'Trust Layer — Audit & Evidence',
  apiSec4Title: 'Compliance & Governance',
  apiSec5Title: 'Security & Cryptography',
  apiSec6Title: 'Sovereign Architecture',
  apiSec7Title: 'CendiaOmniTranslate',
  apiSec8Title: 'Vertical-Specific APIs',
  apiSec9Title: 'Example: Start a Council Deliberation',
  apiSec10Title: 'Getting API Access',
  apiCtaTitle: 'Get Full API Access',
  apiCtaBtn: 'Request Technical Briefing →',
  navTrustCenterShort: 'Trust Center',
};

let injected = 0;
let skipped = 0;

for (const lang of LANGS) {
  const file = path.join(ROOT, 'translations', lang + '.js');
  if (!fs.existsSync(file)) { console.log('MISSING: ' + file); continue; }
  let content = fs.readFileSync(file, 'utf8');

  const toAdd = Object.entries(NEW_KEYS).filter(([k]) => !content.includes(`  ${k}:`));
  if (toAdd.length === 0) { console.log(`SKIP ${lang} — all keys present`); skipped++; continue; }

  const block = '\n' + toAdd.map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`).join('\n');
  const idx = content.indexOf(CLOSE_PATTERN);
  if (idx === -1) { console.log('CLOSE PATTERN NOT FOUND: ' + lang); continue; }

  const before = content.slice(0, idx);
  const after = content.slice(idx);
  const trimmed = before.trimEnd();
  const needsComma = !trimmed.endsWith(',');
  content = trimmed + (needsComma ? ',' : '') + block + '\n' + after.trimStart();

  fs.writeFileSync(file, content, 'utf8');
  console.log(`ADDED ${toAdd.length} keys to: translations/${lang}.js`);
  injected++;
}

console.log(`\nDone — ${injected} files updated, ${skipped} skipped.`);

console.log('\n=== VERIFICATION ===');
for (const lang of LANGS) {
  const file = path.join(ROOT, 'translations', lang + '.js');
  try {
    const c = fs.readFileSync(file, 'utf8');
    const match = c.match(/const\s+\w+\s*=\s*\{([\s\S]*?)\};\s*\n\s*if/);
    if (!match) { console.log(lang + ': PARSE PATTERN NOT FOUND'); continue; }
    const keys = (match[1].match(/^\s+\w+:/gm) || []).length;
    console.log(lang + ': OK — ' + keys + ' keys');
  } catch(e) { console.log(lang + ': ERROR — ' + e.message); }
}
