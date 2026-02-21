/**
 * inject-wargames-keys.js
 * Injects new i18n keys for wargames.html into all 11 language files.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const CLOSE_PATTERN = '\n};\n\nif (typeof window';

const NEW_KEYS = {
  wgBackLink: '← Return to Datacendia',
  wgPageTitle: 'War Game Simulations',
  wgPageSubtitle: 'Using only information available at the time — before the outcome was known — we simulate whether structured dissent would have surfaced material risk.',
  wgDecisionHeading: 'The Decision Under Analysis',
  wgCouncilHeading: "The Council's Analysis",
  wgRiskEscalation: 'Material Risk Escalation Triggered',
  wgIfRiskAdopted: 'If Risk Controls Had Been Adopted',
  wgIfCrisisImmune: 'If Crisis Immunization Had Been In Place',
  wgDataSources: 'Public Data Sources Used',
  wg1Label: 'Banking / Treasury Risk',
  wg2Label: 'Aerospace / Safety Engineering',
  wg3Label: 'Financial Services / Fraud Detection',
  wg4Label: 'Healthcare / Due Diligence',
  wg5Label: 'Football / Financial Fair Play',
  wg6Label: 'Healthcare / Patient Safety',
  wg1Title: 'Silicon Valley Bank Collapse',
  wg2Title: 'Boeing 737 MAX MCAS Failures',
  wg3Title: 'Wirecard Accounting Fraud',
  wg4Title: 'Theranos Investment Due Diligence',
  wg5Title: 'Everton FC PSR Breach',
  wg6Title: 'NHS Maternity Failures (Shrewsbury & Telford)',
  wgLossLabel: 'Total Loss',
  wgCostLabel: 'Total Cost',
  wgInvestorLoss: 'Investor Loss',
  wgConsequence: 'Consequence',
  wgHarmScale: 'Harm Scale',
  wgCtaTitle: 'Run Your Own War Game',
  wgCtaDesc: "Bring us your strategic decision. We'll stress-test it with The Council using your real data — before it becomes a case study for someone else.",
  wgCtaBtn: 'Request a War Game Session',
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
