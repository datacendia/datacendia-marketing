/**
 * inject-dcii-keys.js: Inject dcii.html-specific new i18n keys into all 11 lang files
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const CLOSE_PATTERN = '\n};\n\nif (typeof window';

const NEW_KEYS = {
  dciiPageLabel: 'Datacendia is Decision Crisis Immunization Infrastructure',
  dciiPageTitle: 'Crisis Immunization',
  dciiPageSubtitle: 'The 9 primitives that prevent institutional failure. Not reactive compliance. Proactive immunization.',
  dciiDownloadBtn: 'Download DCII Framework White Paper v2.1 (PDF) ↓',
  iissBandCritical: 'Critical',
  iissBandVulnerable: 'Vulnerable',
  iissBandDeveloping: 'Developing',
  iissBandResilient: 'Resilient',
  iissBandExceptional: 'Exceptional',
  dciiS1Tagline: 'Institutional Immune System Score',
  dciiD1Name: 'Discovery-Time Proof Coverage',
  dciiD1Desc: 'Cryptographic timestamps proving when knowledge became actionable',
  dciiD2Name: 'Deliberation Capture Completeness',
  dciiD2Desc: 'Multi-agent, multi-perspective decision process recording',
  dciiD3Name: 'Override Accountability Tracking',
  dciiD3Desc: 'Non-suppressible tracking of recommendation overrides',
  dciiD4Name: 'Continuity Memory Depth',
  dciiD4Desc: 'Personnel-independent institutional knowledge preservation',
  dciiD5Name: 'Drift Detection Effectiveness',
  dciiD5Desc: 'Continuous compliance degradation monitoring',
  dciiD6Name: 'Cognitive Bias Mitigation',
  dciiD6Desc: 'Adversarial challenge of assumptions and rubber-stamp detection',
  dciiD7Name: 'Quantum-Resistant Integrity',
  dciiD7Desc: 'Post-quantum cryptographic protection of evidence',
  dciiD8Name: 'Synthetic Media Authentication',
  dciiD8Desc: 'Content provenance signing and deepfake detection',
  dciiD9Name: 'Cross-Jurisdiction Compliance',
  dciiD9Desc: 'Multi-jurisdiction conflict detection and resolution',
  dciiS1Cap1Name: 'Certification Bands',
  dciiS1Cap1Desc: 'Bronze, Silver, Gold, Platinum — tiered certification based on IISS score thresholds.',
  dciiS1Cap2Name: 'Insurance Impact',
  dciiS1Cap2Desc: '20–40% premium reduction for IISS >800. Insurers can price against verifiable governance metrics.',
  dciiS1Cap3Name: 'Trend Analysis',
  dciiS1Cap3Desc: 'Track improving, stable, or declining trajectories per dimension over time.',
  dciiS2Tagline: 'Synthetic Media Authentication',
  dciiS2Cap1Name: 'C2PA Provenance Signing',
  dciiS2Cap1Desc: 'Sign images, video, audio, and documents at creation time with Coalition for Content Provenance and Authenticity standards.',
  dciiS2Cap2Name: 'Chain of Custody',
  dciiS2Cap2Desc: 'Track every access, copy, edit, export, and transmission of digital evidence with cryptographic proof.',
  dciiS2Cap3Name: 'Deepfake Detection',
  dciiS2Cap3Desc: 'AI-powered analysis for synthetic manipulation markers across pixel-level, audio-level, and metadata-level artifacts.',
  dciiS2Cap4Name: 'Hardware Attestation',
  dciiS2Cap4Desc: 'TPM/HSM attestation for evidence capture devices — prove which physical device captured the evidence.',
  dciiS3Tagline: 'Cross-Jurisdiction Compliance Conflict Detection',
  dciiS3Cap1Name: 'Conflict Detection',
  dciiS3Cap1Desc: 'Simultaneous evaluation against multiple regulatory frameworks with automated conflict identification and severity ranking.',
  dciiS3Cap2Name: 'Good-Faith Documentation',
  dciiS3Cap2Desc: 'When regulations conflict irreconcilably, generate documentation proving maximum compliance effort across all jurisdictions.',
  dciiS3Cap3Name: 'Resolution Strategies',
  dciiS3Cap3Desc: 'Legal authority ranking, mutual recognition agreements, and recommended approaches to navigate conflicting requirements.',
  dciiS3Cap4Name: '17+ Jurisdictions',
  dciiS3Cap4Desc: 'EU, US (federal + state), UK, China, Japan, Brazil, Canada, Australia, Singapore, India, South Korea, Switzerland, South Africa, and more.',
  dciiS4Tagline: 'RFC 3161 External Timestamp Authority',
  dciiS4Cap1Name: 'Multi-Provider TSA',
  dciiS4Cap1Desc: 'DigiCert, Comodo, GlobalSign, Entrust, or internal TSA. Dual-timestamp strategy: internal + external for defense-in-depth.',
  dciiS4Cap2Name: 'Blockchain Anchoring',
  dciiS4Cap2Desc: 'Optional anchoring to Bitcoin or Ethereum for decisions where the highest level of temporal proof is required.',
  dciiS4Cap3Name: 'Batch Timestamping',
  dciiS4Cap3Desc: 'High-volume operations timestamped efficiently with certificate chain validation and token storage.',
  dciiS4Cap4Name: 'EU Qualified Timestamps',
  dciiS4Cap4Desc: 'ETSI EN 319 421 compliant for legally binding timestamps recognized across EU member states.',
  dciiS5Tagline: 'Decision Similarity Engine',
  dciiS5Cap1Name: 'Semantic Search',
  dciiS5Cap1Desc: 'TF-IDF semantic similarity across all historical Decision DNA records. Context-aware matching by industry, department, urgency, and decision type.',
  dciiS5Cap2Name: 'Outcome-Aware Matching',
  dciiS5Cap2Desc: 'When a new decision is proposed, automatically surface what happened last time — including whether the decision succeeded or failed.',
  dciiS5Cap3Name: 'Cross-Silo Detection',
  dciiS5Cap3Desc: 'Detect the same mistake being made in different departments. Break organizational amnesia across business units.',
  dciiS5Cap4Name: 'Dissenter Accuracy',
  dciiS5Cap4Desc: 'Track whether dissenters were ultimately proven correct. Surface their historical accuracy when the same concerns arise again.',
  dciiS6Tagline: 'Cognitive Bias Detection & Correction',
  dciiS6Cap1Name: '24 Bias Classifiers',
  dciiS6Cap1Desc: 'Anchoring, confirmation bias, sunk cost fallacy, groupthink, availability heuristic, authority bias, and 18 more — detected in text, voting patterns, and agent reasoning.',
  dciiS6Cap2Name: 'Real-Time Flagging',
  dciiS6Cap2Desc: 'During Council deliberations, biases are flagged inline with confidence scores and suggested counter-perspectives.',
  dciiS6Cap3Name: 'De-Biasing Protocols',
  dciiS6Cap3Desc: "Structured interventions: red team injection, devil's advocate assignment, pre-mortem reframing, and reference-class forecasting.",
  dciiS6Cap4Name: 'Bias Audit Trail',
  dciiS6Cap4Desc: 'Every detected bias, every intervention, every override is logged in the decision evidence packet. Prove you tried to decide rationally.',
  dciiS7Tagline: 'Quantum-Resistant Cryptographic Integrity',
  dciiS7Cap1Name: 'Post-Quantum Algorithms',
  dciiS7Cap1Desc: 'NIST-standardized Dilithium (ML-DSA), SPHINCS+ (SLH-DSA), and Falcon for digital signatures. NIST security levels 1–5.',
  dciiS7Cap2Name: 'Hybrid Signatures',
  dciiS7Cap2Desc: 'Dual RSA-4096 + Dilithium signing during the transition period. If either algorithm breaks, the other still protects evidence integrity.',
  dciiS7Cap3Name: 'Key Rotation & Migration',
  dciiS7Cap3Desc: 'Automated key rotation with signature chain-of-custody. Migrate existing evidence to post-quantum signatures before quantum computers arrive.',
  dciiS7Cap4Name: 'HSM Integration',
  dciiS7Cap4Desc: 'Hardware Security Module support for key generation and signing. Customer-controlled keys — Datacendia never holds your private keys.',
  dciiImpactTitle: 'Why Crisis Immunization Matters',
  dciiImpact1Label: 'Potential insurance premium reduction for IISS >800',
  dciiImpact2Label: 'Jurisdictions with cross-border conflict detection',
  dciiImpact3Label: 'DCII primitive dimensions scored',
  dciiImpact4Label: 'Legally recognized external timestamps',
  dciiContactDesc: 'DCII transforms governance from a cost center to a competitive advantage.',
  dciiContactBriefing: 'Request a DCII Briefing',
  dciiContactArch: 'View Full Architecture',
  dciiContactPilot: 'Explore the Pilot Program',
  dciiContactDownload: 'Download White Paper v2.1 (PDF)',
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
