/**
 * inject-case-studies-rr-keys.js
 * Injects new i18n keys for case-studies.html and regulators-receipt.html
 * into all 11 language files.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const CLOSE_PATTERN = '\n};\n\nif (typeof window';

const NEW_KEYS = {
  // case-studies.html
  csPageTitle: 'Anonymized Pilot Case Studies',
  csPageSubtitle: 'Real pilots. No inflated metrics. No AI accuracy claims. These anonymized case studies demonstrate what Datacendia actually does in production environments.',
  csNav1: 'Industrial Manufacturing',
  csNav2: 'Financial Services',
  csNav3: 'Healthcare',
  csNav4: 'Public-Sector Adjacent',
  cs1Title: 'Industrial Manufacturer Uses Datacendia to Preserve Decision Accountability Across Leadership Transition',
  cs2Title: 'Financial Services Firm Uses Datacendia to Defensibly Record Risk Decisions',
  cs3Title: 'Healthcare Organization Uses Datacendia to Govern Sensitive Operational Decisions',
  cs4Title: 'Public-Sector Adjacent Organization Uses Datacendia to Preserve Institutional Memory',
  csProfileOrg: 'Organization',
  csProfileRegion: 'Region',
  csProfileDuration: 'Duration',
  csProfileDeployment: 'Deployment',
  csH3Problem: 'The Problem',
  csH3Pilot: 'The Datacendia Pilot',
  csH3WhatChanged: 'What Changed',
  cs1H3Tools: 'Why Existing Tools Failed',
  cs3H3Rejected: 'Why Traditional AI Was Rejected',
  cs4H3Failed: 'Why Existing Processes Failed',
  cs3H3Eval: 'The Datacendia Evaluation',
  csCtaTitle: 'See The Evidence Yourself',
  csCtaBtn: 'Request Technical Briefing →',

  // regulators-receipt.html
  rrNavHome: 'Home',
  rrNavPlatform: 'Platform',
  rrNavDcii: 'DCII',
  rrNavPricing: 'Pricing',
  rrHeroTitle: "The Regulator's Receipt™ — Every AI Decision. forensic-grade, independently verifiable.",
  rrHeroDesc: 'Three cryptographically signed PDFs generated automatically from every council deliberation. SHA-256 hashed, Merkle tree verified, RFC 3161 timestamped. Independently verifiable without Datacendia.',
  rrHeroCtaDemo: 'See a Live Demo →',
  rrHeroCtaDcii: 'DCII Framework',
  rrHeroCtaPilot: 'Start a Pilot',
  rrSec1Label: 'Three Output Formats',
  rrSec1Title: 'One Decision. Three Documents.',
  rrSec1Desc: 'Every council deliberation automatically generates three distinct PDFs — each purpose-built for a different audience. No manual export. No reformatting. Generated in under 2 seconds.',
  rrPdf1Title: 'forensic-grade, independently verifiable Record',
  rrPdf2Title: 'Evidence Package',
  rrPdf3Title: 'Executive Summary',
  rrPdf1Tag: 'forensic-grade, independently verifiable',
  rrPdf2Tag: 'Full Evidence',
  rrPdf3Tag: 'Executive Ready',
  rrSec2Label: 'Cryptographic Architecture',
  rrSec2Title: 'Independently Verifiable. No Vendor Trust Required.',
  rrCrypto1Title: 'SHA-256 Decision Hash',
  rrCrypto2Title: 'Merkle Tree Integrity',
  rrCrypto3Title: 'Ed25519 Digital Signature',
  rrCrypto4Title: 'RFC 3161 Timestamp',
  rrCrypto5Title: 'PDF/A Archival Format',
  rrCrypto6Title: 'Post-Quantum Option',
  rrSec3Label: 'Independent Verification',
  rrSec3Title: 'Verify Without Datacendia',
  rrSec4Label: 'When You Need It',
  rrSec4Title: 'Built for the Moments That Matter',
  rrUseCase1Title: 'Regulatory Investigation',
  rrUseCase2Title: 'Litigation Discovery',
  rrUseCase3Title: 'SOC 2 / ISO 27001 Audit',
  rrUseCase4Title: 'Board Accountability',
  rrUseCase5Title: 'EU AI Act Compliance',
  rrUseCase6Title: 'Internal Post-Mortems',
  rrFinalCtaTitle: 'See a Real Receipt in 30 Minutes',
  rrFinalCtaBtn: 'Request a Briefing →',
  rrFinalCtaPilot: 'Start a 90-Day Pilot',
  rrFinalCtaDcii: 'DCII Framework',
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
