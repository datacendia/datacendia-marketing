/**
 * inject-pricing-keys.js: Inject pricing.html-specific new i18n keys into all 11 lang files
 * (Keys already in translations from pc wiring are skipped automatically)
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const CLOSE_PATTERN = '\n};\n\nif (typeof window';

const NEW_KEYS = {
  pricingPageTitle: 'Pricing & Capabilities',
  pricingPageSubtitle: 'Enterprise software. Annual licenses. Sovereign deployment. Customer-owned infrastructure, keys, and proof.',
  pricingPageNote: '12 pillars across 3 tiers. Start with Foundation, expand as your governance matures.',
  startHereLabel: 'Start Here',
  pilotProgramTitle: '90-Day Pilot Program',
  pilotCustomScoping: 'Custom Scoping',
  pilotDesc: 'Prove value on your data, your infrastructure. 1 environment, 10–25 users, 2 workflows, evidence packets with citations. Pilot fee applies to annual license.',
  applyForPilotBtn: 'Apply for Pilot →',
  priceOnRequest: 'Price Available on Request',
  tier1Note: '3 pillars · Annual license · Customer-owned infrastructure',
  learnMoreCta: 'Learn More',
  seeDemosCta: 'See Demos',
  learnDciiCta: 'Learn DCII Framework',
  tier2Note: '5 pillars · Requires Foundation · 6–12 month adoption typical',
  viewArchCta: 'View Architecture',
  addonsForEnterprise: 'Advanced modules for Enterprise licensees',
  tier2PremiumNote: '7 modules · Priced individually · Requires Enterprise tier',
  tier3Note: '4 pillars · For institutions whose decisions shape industries and nations',
  contactForBriefing: 'Contact for Briefing',
  sgasTagline: 'Societal-Scale Governance Simulation',
  viewIndustriesCta: 'View Industries',
  naturalProgressionTitle: 'Natural Progression',
  progressionPilotLabel: 'Pilot → Foundation:',
  progressionPilotDesc: 'Prove value in 90 days, then deploy The Council + Decide + DCII as your decision governance layer.',
  progressionFoundationLabel: 'Foundation → Enterprise:',
  progressionFoundationDesc: 'After 6–12 months, add adversarial testing, automated compliance, governance policies, sovereign deployment, and department-level AI co-pilots.',
  progressionEnterpriseLabel: 'Enterprise → Strategic:',
  progressionEnterpriseDesc: 'For institutions whose decisions shape industries, societies, and nations — institutional failure simulation, societal modeling, deep verticals, and nation-scale infrastructure.',
  pricingCtaTitle: 'Ready to immunize your decisions?',
  pricingCtaDesc: 'Start with a 90-day pilot. Prove value on your data, your infrastructure. Every tier builds on the last.',
  viewPremiumModules: 'View Premium Modules',
  footerStatus: 'SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED',
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
