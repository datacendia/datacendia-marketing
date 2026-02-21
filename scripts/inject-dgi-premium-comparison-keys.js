/**
 * inject-dgi-premium-comparison-keys.js
 * Injects new i18n keys for dgi.html, premium.html, dgi-dcii-comparison.html
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const CLOSE_PATTERN = '\n};\n\nif (typeof window';

const NEW_KEYS = {
  // Shared simple nav keys
  navHome: 'Home',
  navDciiShort: 'DCII',
  navDgiShort: 'DGI',
  navDemosShort: 'Demos',
  navPricingShort: 'Pricing',
  navTeamShort: 'Team',

  // dgi.html
  dgiBadge: 'OPEN FRAMEWORK v1.0',
  dgiPageTitle: 'Decision Governance Infrastructure',
  dgiPageSubtitle: 'A vendor-neutral framework for institutional decision accountability',
  dgiCitationTitle: 'How to Cite This Framework',
  dgiWhoTitle: 'Who Should Use DGI',
  dgiUC1Title: 'Standards Bodies',
  dgiUC1Desc: 'Organizations evaluating governance frameworks for formal adoption (ISO/IEC, IEEE, NIST)',
  dgiUC2Title: 'System Architects',
  dgiUC2Desc: 'Teams building custom decision accountability systems with vendor-neutral primitives',
  dgiUC3Title: 'Academic Researchers',
  dgiUC3Desc: 'Scholars studying AI governance, institutional accountability, and decision provenance',
  dgiUC4Title: 'Policy Makers',
  dgiUC4Desc: 'Regulators designing frameworks for decision transparency and institutional resilience',
  dgiAdoptionTitle: 'DGI Adoption Path',
  dgiStep1Title: 'Review Framework',
  dgiStep1Desc: 'Study the five governance primitives and lifecycle model',
  dgiStep2Title: 'Assess Maturity',
  dgiStep2Desc: 'Evaluate current state using DGMI (Levels 1–5)',
  dgiStep3Title: 'Implement Primitives',
  dgiStep3Desc: 'Build or integrate governance controls using your architecture',
  dgiStep4Title: 'Consider DCII',
  dgiStep4Desc: 'Evaluate production-ready implementation for rapid deployment',
  dgiPrinciplesTitle: 'Framework Principles',
  dgiPrinciple1Name: 'Decisions as Lifecycle Artifacts',
  dgiPrinciple1Desc: 'Structured, inspectable events with traceable phases',
  dgiPrinciple2Name: 'Procedural Integrity',
  dgiPrinciple2Desc: 'Demonstrable governance pathways',
  dgiPrinciple3Name: 'Evidence Survivability',
  dgiPrinciple3Desc: 'Artifacts remain verifiable over time',
  dgiPrinciple4Name: 'Institutional Continuity',
  dgiPrinciple4Desc: 'Knowledge persists beyond personnel change',
  dgiPrimitivesTitle: 'Five Governance Primitives',
  dgiPrimAName: 'Context Capture',
  dgiPrimADesc: 'Preserve discovery-time knowledge, triggers, and inputs with source attribution and timestamped metadata.',
  dgiPrimBName: 'Deliberation Traceability',
  dgiPrimBDesc: 'Record reasoning pathways, alternatives considered, and contributor attribution for reproducible decision sequences.',
  dgiPrimCName: 'Override Accountability',
  dgiPrimCDesc: 'Document deviations from established processes with explicit justification and authorization tracking.',
  dgiPrimDName: 'Evidence Integrity',
  dgiPrimDDesc: 'Maintain tamper-evident storage and integrity verification procedures for independent review.',
  dgiPrimEName: 'Drift Detection',
  dgiPrimEDesc: 'Identify divergence between policy intent and operational behavior through pattern analysis.',
  dgiLifecycleTitle: 'Decision Lifecycle Model',
  dgiLifeStep1: 'Initiation',
  dgiLifeStep2: 'Deliberation',
  dgiLifeStep3: 'Resolution',
  dgiLifeStep4: 'Preservation',
  dgiLifeStep5: 'Reconstruction',
  dgiDgmiTitle: 'Decision Governance Maturity Index (DGMI)',
  dgiDgmi1Name: 'Informal Capture',
  dgiDgmi1Desc: 'Ad hoc documentation with inconsistent artifact preservation',
  dgiDgmi2Name: 'Structured Recording',
  dgiDgmi2Desc: 'Consistent artifact capture with defined formats',
  dgiDgmi3Name: 'Procedural Traceability',
  dgiDgmi3Desc: 'Full lifecycle preservation with governance pathway documentation',
  dgiDgmi4Name: 'Integrity Assurance',
  dgiDgmi4Desc: 'Tamper-evident verification and cryptographic integrity controls',
  dgiDgmi5Name: 'Governance Optimization',
  dgiDgmi5Desc: 'Continuous monitoring, drift analytics, and proactive governance improvement',
  dgiCtaDownload: 'Download Framework PDF',
  dgiCtaDcii: 'View DCII Implementation',
  dgiCtaCompare: 'Compare DGI vs DCII',

  // premium.html
  premBackLink: '← Return to Datacendia',
  premPageTitle: 'Premium Capabilities',
  premPageSubtitle: 'Advanced modules for Enterprise licensees. Visible capabilities. Contact for pricing.',
  premGuardianSuite: 'Guardian Suite',
  premGuardianSubtitle: '4 Modules — Protect, Preserve, Connect, Listen',
  premGuardianLabel: 'Guardian Suite',
  premAegisName: 'CendiaAegis™',
  premAegisTagline: '"Cyber-physical threat simulation and geopolitical risk modeling"',
  premWhoNeedsIt: 'Who Needs It',
  premEternalName: 'CendiaEternal™',
  premEternalTagline: '"Institutional memory that survives format obsolescence, technology shifts, and organizational transformation"',
  premSymbiontName: 'CendiaSymbiont™',
  premSymbiontTagline: '"AI-powered partnership discovery, evaluation, and management"',
  premVoxName: 'CendiaVox™',
  premVoxTagline: '"Weighted stakeholder voting and voice aggregation for complex multi-party decisions"',
  premStrategicSuite: 'Strategic Modules',
  premStrategicSubtitle: '3 Modules — Narrative, Ethics, Sustainability',
  premMythosName: 'CendiaMythos™',
  premMythosTagline: '"Mission alignment and institutional narrative at scale"',
  premEthosName: 'CendiaEthos™',
  premEthosTagline: '"Institutional ethics as infrastructure, not aspiration"',
  premGaiaName: 'CendiaGaia™',
  premGaiaTagline: '"ESG enforcement at planetary scale — not reporting, enforcement"',
  premBundlesLabel: 'Common Bundles',
  premBundlesTitle: 'Pre-Configured Module Combinations',
  premBundle1Name: 'Threat-Aware Sovereign Deployment',
  premBundle2Name: 'Century-Grade Decision Proof',
  premBundle3Name: 'Institutional Integrity Stack',
  premCtaTitle: 'Ready to discuss Premium capabilities?',
  premCtaBtn: 'Request Premium Briefing →',
  premCtaTiers: 'View All Tiers',
  footerOutcome: 'Ready to own your AI decisions—and prove them to regulators?',
  footerCtaBriefing: 'Request Briefing',
  footerCtaPilot: 'See Results in 90 Days',
  footerCtaTrust: 'Trust Center',

  // dgi-dcii-comparison.html
  cmpPageTitle: 'DGI vs DCII: Framework vs Implementation',
  cmpPageSubtitle: "Understanding the relationship between the open standard (DGI) and Datacendia's reference implementation (DCII)",
  cmpDgiLabel: 'OPEN STANDARD',
  cmpDgiName: 'DGI',
  cmpDgiTagline: 'Decision Governance Infrastructure — A vendor-neutral framework for institutional decision accountability',
  cmpDciiLabel: 'REFERENCE IMPLEMENTATION',
  cmpDciiName: 'DCII',
  cmpDciiTagline: 'Decision Crisis Immunization Infrastructure — Production-ready implementation with AI governance extensions',
  cmpMappingTitle: 'Primitive Mapping: DGI → DCII',
  cmpDgiPrimA: 'DGI PRIMITIVE A',
  cmpDgiPrimB: 'DGI PRIMITIVE B',
  cmpDgiPrimC: 'DGI PRIMITIVE C',
  cmpDgiPrimD: 'DGI PRIMITIVE D',
  cmpDgiPrimE: 'DGI PRIMITIVE E',
  cmpMapAName: 'Context Capture',
  cmpMapBName: 'Deliberation Traceability',
  cmpMapCName: 'Override Accountability',
  cmpMapDName: 'Evidence Integrity',
  cmpMapEName: 'Drift Detection',
  cmpDciiP1P4: 'DCII P1 + P4',
  cmpDciiP2: 'DCII P2',
  cmpDciiP3: 'DCII P3',
  cmpDciiP3Name: 'Override Accountability',
  cmpDciiP5: 'DCII P5',
  cmpDciiP5Name: 'Drift Detection',
  cmpDciiP7P8: 'DCII P7 + P8',
  cmpFeatureTitle: 'Feature Comparison',
  cmpThFeature: 'Feature',
  cmpDiffTitle: 'Key Differences',
  cmpDiff1Title: 'Scope',
  cmpDiff2Title: 'Purpose',
  cmpDiff3Title: 'Deployment',
  cmpDiff4Title: 'Extensibility',
  cmpDiff5Title: 'Measurement',
  cmpDiff6Title: 'Target Audience',
  cmpCtaTitle: 'Choose Your Path',
  cmpCtaDgi: 'Download DGI Framework',
  cmpCtaDcii: 'Download DCII White Paper',
  cmpCtaPricing: 'View DCII Pricing',
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
