/**
 * inject-trust-nav-gap-keys.js
 * Injects new keys from trust.html content gaps into all 11 language files.
 * Nav keys already exist. Only trust-specific content keys are new.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const CLOSE_PATTERN_LF = '\n};\n\nif (typeof window';
const CLOSE_PATTERN_CRLF = '\r\n};\r\n\r\nif (typeof window';

const NEW_KEYS = {
  trustDistributionTitle: 'Distribution vs Data Processing',
  trustRetentionTitle: 'Retention & Deletion',
  trustSharedResponsibility: 'Shared Responsibility Model',
  trustVulnDisclosure: 'Vulnerability Disclosure Policy',
  trustRelatedResources: 'Related Trust Resources',
  trustIso42001: 'ISO/IEC 42001:2023',
  trustNistRmf: 'NIST AI RMF',
  trustEuAiAct: 'EU AI Act',
  trustSoc2: 'SOC 2 Type II',
  trustIso27001: 'ISO 27001',
  trustGdpr: 'GDPR',
  trustFedRamp: 'FedRAMP',
  trustCmmc: 'CMMC 2.0',
  trustHipaa: 'HIPAA / HITECH',
  trustIncidentResponse: 'Incident Response & Security Testing',
  trustIrSla: 'Incident Response SLA',
  trustSecTesting: 'Security Testing Summary',
  trustResHonesty: 'Integration Honesty Matrix',
  trustResSecArch: 'Security Architecture',
  trustResSovereignty: 'Sovereignty Matrix',
  trustResCompliance: 'Compliance Documentation',
  trustIso42001Desc: 'AI Management Systems. Self-attested conformance statement published (not third-party audited).',
  trustIso42001Status: 'Self-Attested',
  trustNistRmfDesc: 'AI Risk Management Framework. GOVERN, MAP, MEASURE, MANAGE functions mapped (self-attested).',
  trustNistRmfStatus: 'Self-Attested',
  trustEuAiActDesc: 'Regulation (EU) 2024/1689. Articles 5–15 mapped, deployer obligations addressed (self-attested).',
  trustEuAiActStatus: 'Self-Attested',
  trustCmmcDesc: 'Cybersecurity Maturity Model Certification. Architecture supports Level 2 (Advanced) controls for CUI protection. Level 3 (Expert) pathway documented for defense contractors.',
  trustCmmcStatus: 'Architecture-Ready',
  trustHipaaDesc: 'PHI never processed by Datacendia — runs entirely on customer infrastructure. BAA available for private cloud deployments where applicable.',
  trustHipaaStatus: 'Architecture-Aligned',
};

let injected = 0;
let skipped = 0;

for (const lang of LANGS) {
  const file = path.join(ROOT, 'translations', lang + '.js');
  if (!fs.existsSync(file)) { console.log('MISSING: ' + file); continue; }
  let content = fs.readFileSync(file, 'utf8');

  const toAdd = Object.entries(NEW_KEYS).filter(([k]) => !content.includes(`  ${k}:`));
  if (toAdd.length === 0) { console.log(`SKIP ${lang} — all keys present`); skipped++; continue; }

  let isCRLF = content.includes('\r\n');
  let eol = isCRLF ? '\r\n' : '\n';
  const CLOSE_PATTERN = isCRLF ? CLOSE_PATTERN_CRLF : CLOSE_PATTERN_LF;
  const block = eol + toAdd.map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`).join(eol);
  const idx = content.indexOf(CLOSE_PATTERN);
  if (idx === -1) { console.log('CLOSE PATTERN NOT FOUND: ' + lang); continue; }

  const before = content.slice(0, idx);
  const after = content.slice(idx);
  const trimmed = before.trimEnd();
  const needsComma = !trimmed.endsWith(',');
  content = trimmed + (needsComma ? ',' : '') + block + eol + after.trimStart();

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
