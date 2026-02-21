/**
 * inject-diagrams-keys.js: Inject new i18n keys for diagrams.html
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const CLOSE_PATTERN = '\n};\n\nif (typeof window';

const NEW_KEYS = {
  diagBackLink: '← Return to Datacendia',
  diagPageTitle: 'Platform Architecture',
  diagPageSubtitle: '8 diagrams showing how Datacendia is structured, how decisions flow, and how sovereign infrastructure is deployed.',
  diagNav1: 'Tier Model',
  diagNav2: 'DCII Primitives',
  diagNav3: 'Decision Lifecycle',
  diagNav4: 'Sovereign Patterns',
  diagNav5: 'Industry Verticals',
  diagNav6: 'SGAS Agents',
  diagNav7: 'Trust Chain',
  diagNav8: 'Compliance Matrix',
  diag1Label: 'Diagram 1 of 8',
  diag1Title: 'The 12-Pillar Tier Model',
  diag1Desc: 'Each tier builds on the one below it. Foundation is required; Enterprise extends; Strategic transforms.',
  diag1T3Label: 'Tier 3 — Strategic',
  diag1T3Name: 'Nation-Scale Transformation',
  diag1T3Price: 'Custom Pricing / by engagement',
  diag1TpLabel: 'Tier 2 Premium Add-Ons',
  diag1TpName: 'Advanced Modules',
  diag1TpPrice: 'Custom pricing per module',
  diag1T2Label: 'Tier 2 — Enterprise',
  diag1T2Name: 'Full Enterprise Governance',
  diag1T2Price: 'Custom Pricing / annual license',
  diag1T1Label: 'Tier 1 — Foundation',
  diag1T1Name: 'Core Decision Intelligence',
  diag2Label: 'Diagram 2 of 8',
  diag2Title: 'DCII — 9 Primitives',
  diag2Desc: 'The Decision Crisis Immunization Infrastructure scores institutional resilience across 9 measurable primitives. Together they produce the Institutional Immune System Score (IISS).',
  diag2P1Name: 'Ledger',
  diag2P1Desc: 'Immutable audit trail with blockchain-style hash chaining',
  diag2P2Name: 'Notary',
  diag2P2Desc: 'Cryptographic signing with customer-owned keys',
  diag2P3Name: 'Vault',
  diag2P3Desc: 'Unified evidence storage for decision packets',
  diag2P4Name: 'Provenance',
  diag2P4Desc: 'Full decision lineage and court-admissible export',
  diag2P5Name: 'Timestamp',
  diag2P5Desc: 'RFC 3161 external timestamp authority with blockchain anchoring',
  diag2P6Name: 'MediaAuth',
  diag2P6Desc: 'C2PA synthetic media authentication and deepfake detection',
  diag2P7Name: 'Jurisdiction',
  diag2P7Desc: 'Cross-jurisdiction compliance conflict detection (GDPR vs PIPL)',
  diag2P8Name: 'Similarity',
  diag2P8Desc: 'Decision pattern matching with TF-IDF semantic search',
  diag2P9Name: 'Bias Mitigation',
  diag2P9Desc: 'Cognitive bias detection and decision debiasing engine',
  diag2IissLabel: 'Composite Output',
  diag2IissScore: 'IISS™ Score',
  diag2IissScale: '0–1000 scale · 5-band certification',
  diag3Label: 'Diagram 3 of 8',
  diag3Title: 'Decision Lifecycle',
  diag3Desc: 'End-to-end flow from question to auditable, court-admissible decision record.',
  diag3Step1Title: 'Ingest & Frame',
  diag3Step2Title: 'Council Deliberation',
  diag3Step3Title: 'Governance & Ethics Check',
  diag3Step4Title: 'Stress Test & Red Team',
  diag3Step5Title: 'Synthesis & Recommendation',
  diag3Step6Title: 'Evidence & Immutable Record',
  diag3Step7Title: 'Outcome Tracking & Learning',
  diag4Label: 'Diagram 4 of 8',
  diag4Title: 'Sovereign Architecture Patterns',
  diag4Desc: '21 architectural patterns in the catalog. Every pattern runs on your infrastructure. No cloud dependency. No data exfiltration. Full sovereign control.',
  diag4Cat1: 'Isolation & Air-Gap',
  diag4Cat2: 'Cryptography & Trust',
  diag4Cat3: 'Resilience & Integrity',
  diag4Cat4: 'Network & Federation',
  diag4Cat5: 'AI & Inference',
  diag5Label: 'Diagram 5 of 8',
  diag5Title: 'Industry Verticals',
  diag5Desc: '8 deep industry verticals with full agent stacks, compliance mappings, and decision schemas. 13 additional sector templates in active development.',
  diag6Label: 'Diagram 6 of 8',
  diag6Title: 'SGAS — 5 Agent Classes',
  diag6Desc: 'The Synthetic Governance Agent System runs societal-scale simulations with 5 distinct agent classes, orchestrated by a central coordinator.',
  diag6OrchLabel: 'Central Coordinator',
  diag6OrchName: 'SGAS Orchestrator',
  diag6Agent1Name: 'Institutional',
  diag6Agent2Name: 'Observer',
  diag6Agent3Name: 'Decision',
  diag6Agent4Name: 'Adversarial',
  diag6Agent5Name: 'Meta-Governance',
  diag7Label: 'Diagram 7 of 8',
  diag7Title: 'Trust & Evidence Chain',
  diag7Desc: 'Every decision passes through a cryptographic chain of custody. From deliberation to court-admissible evidence in 6 steps.',
  diag7Node1Name: 'Deliberation',
  diag7Node1Desc: 'Council produces reasoning, dissent, and recommendation',
  diag7Node2Name: 'Ledger',
  diag7Node2Desc: 'Immutable hash-chained record created',
  diag7Node3Name: 'Notary',
  diag7Node3Desc: 'Cryptographic signature with customer-owned keys',
  diag7Node4Name: 'Timestamp',
  diag7Node4Desc: 'RFC 3161 external timestamp authority',
  diag7Node5Name: 'Vault',
  diag7Node5Desc: 'Encrypted evidence bundle stored with AES-256',
  diag7Node6Name: 'Provenance',
  diag7Node6Desc: 'Court-admissible export with full lineage',
  diag8Label: 'Diagram 8 of 8',
  diag8Title: 'Compliance Framework × Jurisdiction Matrix',
  diag8Desc: '10 compliance frameworks mapped against 17 supported jurisdictions. Gold = full coverage. Dim gold = partial. Dark = not applicable.',
  diag8ColFramework: 'Framework',
  diagCtaLabel: 'Ready to explore?',
  diagCtaTitle: 'See it running on your infrastructure',
  diagCtaBtn: 'Request Technical Briefing →',
  diagFooterCopy: '© 2024–2026 Datacendia, LLC. All rights reserved.',
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
