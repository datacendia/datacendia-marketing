/**
 * inject-pc-keys.js: Inject platform-capabilities.html new i18n keys into all 11 lang files
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];

const NEW_KEYS = {
  pcReturnLink: '← Return to Datacendia',
  pcHeaderTitle: 'Platform Capability Map',
  pcHeaderSub: '12 pillars across 3 tiers. 9 crisis immunization primitives. 7 premium add-ons. Sovereign deployment on your infrastructure.',
  pcStatPillars: 'Pillars',
  pcStatTiers: 'Tiers',
  pcStatPrimitives: 'DCII Primitives',
  pcStatAddons: 'Premium Add-Ons',
  pcStatVerticals: 'Deep Verticals',
  pcStatDeploy: 'Deployment Modes',
  pcTier1Badge: 'Tier 1',
  pcTier1Title: 'Foundation',
  pcTier1Flow: 'Make decisions → Understand them → Prove them',
  pcP1Num: 'Pillar 1',
  pcP1Tag: 'Multi-Agent Deliberation Engine',
  pcP1Desc: '15 C-suite AI agents debate every decision from their domain — surfacing blind spots, conflicts, and consensus before you commit.',
  pcP1F1: '15 core agents (CFO, CLO, CISO, CTO, etc.)',
  pcP1F2: '35+ deliberation modes',
  pcP1F3: '60-trait personality system per agent',
  pcP1F4: 'Live deliberation with 3D avatars',
  pcP1F5: 'Cross-examination & formal dissent',
  pcP1F6: 'Consensus scoring & confidence metrics',
  pcP1F7: 'Decision Replay Theater™',
  pcP1Link: 'Learn more →',
  pcP2Num: 'Pillar 2',
  pcP2Tag: 'Decision Intelligence Suite',
  pcP2Desc: 'Intelligence for every decision — past, present, and future. Time machines, failure prediction, consequence mapping, and explainability.',
  pcP2F1: 'CendiaChronos™ divergent future simulation',
  pcP2F2: 'PreMortem™ failure prediction',
  pcP2F3: 'Decision Debt™ (cost of inaction)',
  pcP2F4: 'CendiaCascade™ butterfly effect engine',
  pcP2F5: 'CendiaLens™ token-level AI explainability',
  pcP2F6: 'Ghost Board™ lightweight red-teaming',
  pcP2F7: 'CendiaLineage™ decision tracing',
  pcP2Link: 'See demos →',
  pcP3Num: 'Pillar 3',
  pcP3Tag: 'Crisis Immunization + Evidence Infrastructure',
  pcP3Desc: 'The 9 primitives + cryptographic proof infrastructure. When regulators challenge your decisions, DCII is what you show them.',
  pcP3F1: '9 crisis immunization primitives',
  pcP3F2: 'CendiaVault™ immutable evidence store',
  pcP3F3: 'CendiaNotary™ cryptographic signing',
  pcP3F4: "Regulator's Receipt™ (1-click PDF)",
  pcP3F5: 'IISS™ institutional resilience scoring',
  pcP3F6: 'CendiaMediaAuth™ deepfake detection',
  pcP3F7: 'Post-quantum key management',
  pcP3Link: 'Learn the framework →',
  pcPrimitivesLabel: 'The 9 Crisis Immunization Primitives',
  pcPrim1Label: 'Discovery-Time Proof',
  pcPrim1Desc: 'Cryptographic timestamps proving when knowledge became actionable',
  pcPrim2Label: 'Deliberation Capture',
  pcPrim2Desc: 'Multi-agent, multi-perspective decision process recording',
  pcPrim3Label: 'Override Accountability',
  pcPrim3Desc: 'Non-suppressible tracking of recommendation overrides',
  pcPrim4Label: 'Continuity Memory',
  pcPrim4Desc: 'Personnel-independent institutional knowledge preservation',
  pcPrim5Label: 'Drift Detection',
  pcPrim5Desc: 'Continuous compliance degradation monitoring',
  pcPrim6Label: 'Cognitive Bias Mitigation',
  pcPrim6Desc: 'Adversarial challenge of assumptions and rubber-stamp detection',
  pcPrim7Label: 'Quantum-Resistant Integrity',
  pcPrim7Desc: 'Post-quantum cryptographic protection of evidence',
  pcPrim8Label: 'Synthetic Media Auth',
  pcPrim8Desc: 'Content provenance signing and deepfake detection',
  pcPrim9Label: 'Cross-Jurisdiction Compliance',
  pcPrim9Desc: 'Multi-jurisdiction conflict detection and resolution',
  pcTier2Badge: 'Tier 2',
  pcTier2Title: 'Enterprise',
  pcTier2Flow: 'Harden → Comply → Govern → Own → Scale',
  pcP4Num: 'Pillar 4',
  pcP4Tag: 'Adversarial Testing',
  pcP4Desc: 'Break your decisions before they break you.',
  pcP4F1: 'CendiaCrucible™ Monte Carlo red-teaming',
  pcP4F2: 'CendiaRedTeam™ 8-perspective attack',
  pcP4F3: 'War Games strategic simulation',
  pcP4F4: 'SCGE synthetic crisis injection',
  pcP4F5: 'Runtime security monitoring',
  pcP4Link: 'War Games →',
  pcP5Num: 'Pillar 5',
  pcP5Tag: 'Regulatory Compliance',
  pcP5Desc: '10 frameworks. 17 jurisdictions. Simultaneously.',
  pcP5F1: '10 compliance frameworks',
  pcP5F2: '17 jurisdictions simultaneously',
  pcP5F3: 'Regulatory Absorb™ (60-sec ingest)',
  pcP5F4: 'CendiaSandbox™ pre-enforcement testing',
  pcP5F5: 'CendiaZKP™ zero-knowledge proofs',
  pcP5Link: 'Trust Center →',
  pcP6Num: 'Pillar 6',
  pcP6Tag: 'Policy Enforcement',
  pcP6Desc: 'Configurable guardrails, dispute resolution, and whistleblower protection.',
  pcP6F1: 'CendiaGovern™ RBAC + approval workflows',
  pcP6F2: 'CendiaCourt™ AI dispute resolution',
  pcP6F3: 'CendiaVeto™ configurable blocking',
  pcP6F4: 'CendiaDissent™ whistleblower protection',
  pcP6F5: 'CendiaAutopilot™ autonomy governance',
  pcP7Num: 'Pillar 7',
  pcP7Tag: 'Air-Gap Architecture',
  pcP7Desc: 'Your infrastructure. Your keys. Your data. No vendor custody.',
  pcP7F1: '11 sovereign architectural patterns',
  pcP7F2: 'Post-quantum KMS',
  pcP7F3: 'CendiaBlackBox™ sealed records',
  pcP7F4: 'CendiaMirage™ active deception',
  pcP7F5: 'CAC/PIV authentication',
  pcP7Link: 'Architecture →',
  pcP8Num: 'Pillar 8',
  pcP8Tag: 'CendiaOps™ — 19 AI Co-Pilots',
  pcP8Desc: 'AI co-pilots for every department, plus system integration and self-improvement.',
  pcP8F1: '19 department AI co-pilots',
  pcP8F2: 'CendiaMesh™ system integration',
  pcP8F3: 'CendiaPulse™ mission control',
  pcP8F4: 'CendiaApotheosis™ nightly self-improvement',
  pcP8F5: '100+ language translation',
  pcTier2PremiumBadge: 'Tier 2 Premium',
  pcAddonsTitle: 'Strategic Add-Ons',
  pcAddonsFlow: '7 advanced modules for Enterprise licensees',
  pcAddon1Desc: 'Real-time threat intelligence',
  pcAddon2Desc: '100-year knowledge preservation',
  pcAddon3Desc: 'Partnership ecosystem discovery',
  pcAddon4Desc: 'Stakeholder voice assembly',
  pcAddon5Desc: 'Corporate narrative engine',
  pcAddon6Desc: 'Ethical drift detection',
  pcAddon7Desc: 'Sustainability boundary engine',
  pcAddonsViewAll: 'View all Premium modules with WHO NEEDS IT qualifiers →',
  pcTier3Badge: 'Tier 3',
  pcTier3Title: 'Strategic',
  pcTier3Flow: 'Survive → Model → Dominate → Govern Nations',
  pcP9Num: 'Pillar 9',
  pcP9Tag: 'Institutional Failure Simulation',
  pcP9Desc: "18 adversarial agents simulate how institutions fail — so yours doesn't.",
  pcP9F1: '18 adversarial agents',
  pcP9F2: '7 societal failure domains',
  pcP9F3: 'Trust Delta measurement',
  pcP9F4: 'Failure Envelope mapping',
  pcP10Num: 'Pillar 10',
  pcP10Tag: 'Societal-Scale Governance',
  pcP10Desc: 'Model the consequences of policy at civilizational scale.',
  pcP10F1: '5 agent classes at civilizational scale',
  pcP10F2: 'Population-level modeling',
  pcP10F3: 'Policy impact simulation',
  pcP10F4: 'Meta-governance oversight',
  pcP11Num: 'Pillar 11',
  pcP11Tag: 'Industry Domination Infrastructure',
  pcP11Desc: 'Deep, sector-specific governance with pre-built agents, workflows, and compliance mappings.',
  pcP11F1: '8 deep industry verticals',
  pcP11F2: '13 sector templates',
  pcP11F3: 'Legal: 14 agents, 48 modes',
  pcP11F4: 'Sports, Defense, Healthcare flagships',
  pcP11Link: 'View Industries →',
  pcP12Num: 'Pillar 12',
  pcP12Tag: 'Nation-Scale Infrastructure',
  pcP12Desc: 'For institutions whose decisions shape economies, populations, and sovereign futures.',
  pcP12F1: 'CendiaNation™ economic OS',
  pcP12F2: 'CendiaOmniShield™ cyber defense',
  pcP12F3: 'CendiaMarketSovereign™ central bank AI',
  pcP12F4: 'CendiaEternum™ existential risk',
  pcCrossTitle: 'Cross-Cutting Platform Capabilities',
  pcCross1Title: 'Universal Data Adapters',
  pcCross1Desc: '5 universal adapters connect to your existing databases. Data never leaves your infrastructure — File Watcher, Webhook, Database, Protocol, and REST connectors. No ETL. No data movement.',
  pcCross2Title: 'Cryptographic Evidence',
  pcCross2Desc: 'Merkle tree integrity, Ed25519 signatures, RFC 3161 timestamps, post-quantum option (Dilithium, SPHINCS+).',
  pcCross3Title: 'CendiaOmniTranslate™',
  pcCross3Desc: '100+ language translation with glossary management, translation memory, and RTL support. Runs entirely on your infrastructure.',
  pcCross4Title: 'Connector Suites',
  pcCross4Desc: '16 connector suites on 6 universal adapters. ERP, CRM, BI, EHR, databases — plug into your existing stack.',
  pcCross5Title: 'CendiaCarbonAware™',
  pcCross5Desc: 'Carbon-aware workload scheduling across 10 cloud regions. Reduce AI carbon footprint by 30–50%. ESG reporting built in.',
  pcCross6Title: 'Platform AI Assistant',
  pcCross6Desc: 'Built-in conversational guide on every page. Context-aware suggestions, step-by-step workflows, quick action buttons.',
  pcDeployLabel: 'Sovereign Deployment Options',
  pcDeployChip1: 'Cloud (AWS · Azure · GCP)',
  pcDeployChip2: 'Private Cloud (Your VPC)',
  pcDeployChip3: 'On-Premises (Your Data Center)',
  pcDeployChip4: 'Air-Gapped (Isolated Networks)',
  pcDeployNote: 'All modes: your encryption keys (KMS/HSM) · immutable audit ledger (your control) · evidence export (standard formats) · no vendor lock-in',
  pcCtaTitle: 'Ready to See the Full Platform?',
  pcCtaDesc: 'Start with a 90-day pilot on your infrastructure. Prove value before scaling.',
  pcCtaBtn: 'Request Briefing →',
  pcCtaLink: 'Or start with a pilot →',
};

// Build insertion block
const lines = Object.entries(NEW_KEYS).map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`).join('\n');
const INSERT = '\n' + lines;

// Closing pattern used in split files
const CLOSE_PATTERN = '\n};\n\nif (typeof window';

let injected = 0;
let skipped = 0;

for (const lang of LANGS) {
  const file = path.join(ROOT, 'translations', lang + '.js');
  if (!fs.existsSync(file)) { console.log('MISSING: ' + file); continue; }
  let content = fs.readFileSync(file, 'utf8');

  // Filter to only keys not already present
  const toAdd = Object.entries(NEW_KEYS).filter(([k]) => !content.includes(`  ${k}:`));
  if (toAdd.length === 0) { console.log(`SKIP ${lang} — all keys present`); skipped++; continue; }

  const block = '\n' + toAdd.map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`).join('\n');
  const idx = content.indexOf(CLOSE_PATTERN);
  if (idx === -1) { console.log('CLOSE PATTERN NOT FOUND: ' + lang); continue; }

  // Ensure trailing comma before insertion
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

// Verify parse
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
