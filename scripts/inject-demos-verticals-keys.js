/**
 * inject-demos-verticals-keys.js: Inject new i18n keys for demos.html and verticals.html
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const CLOSE_PATTERN = '\n};\n\nif (typeof window';

const NEW_KEYS = {
  // demos.html
  demosPageTitle: 'Product Demos',
  demosPageSubtitle: 'See Datacendia in action. Watch guided walkthroughs of our Decision Crisis Immunization Infrastructure.',
  demosTryTitle: 'Try It Yourself',
  demosTryDesc: 'Type YOUR decision. Get multi-agent analysis in seconds. No login, no signup — just answers.',
  demosYourDataLabel: 'YOUR DATA, REAL-TIME',
  demosTryCouncilTitle: 'Try The Council — Type Any Decision',
  demosTryCouncilDesc: 'Type any business decision — M&A, hiring, expansion, pricing, restructuring — and watch 3 AI agents deliberate it in real time. Uses YOUR input to generate contextual analysis.',
  demosTypeYourDecision: '▶ Type Your Decision',
  demosMaturityTitle: 'Decision Maturity Assessment',
  demosMaturityDesc: "Answer 6 questions about YOUR organization's decision governance. Get a maturity score, personalized recommendations, and a roadmap for improvement.",
  demosBeforeAfterTitle: 'Before & After — Decision Governance',
  demosBeforeAfterDesc: 'See the difference between decisions made without governance and with Datacendia — side-by-side timeline comparison with quantified outcomes.',
  demosCortexTitle: 'Cortex — Decision Engine',
  demosCortexDesc: 'Multi-agent deliberation, cascade analysis, dissent protection, and board rehearsal. The core intelligence layer.',
  demosFeaturedLabel: '★ Featured Demo',
  demosCouncilTitle: 'The Council™ — Multi-Agent Deliberation',
  demosCouncilDesc: 'Watch 6 AI agents deliberate a $200M acquisition decision in real time. See cross-examination, formal dissent, confidence scoring, and a synthesized recommendation — with cryptographic evidence export.',
  demosLaunchInteractive: '▶ Launch Interactive Demo',
  demosChronosTitle: 'CendiaChronos — Pivotal Moments',
  demosChronosDesc: "Explore a 5-year timeline for a healthcare organization. See how AI detects the pivotal decisions that shaped the company's future — with department filtering and drill-down.",
  demosCascadeTitle: 'CendiaChronos™ — Cascade Analysis',
  demosCascadeDesc: 'Choose a trigger decision (plant closure, price hike, or layoffs) and watch ripple effects propagate through 3 orders of consequence — with probability scoring and net impact.',
  demosDissentTitle: 'CendiaDissent — Protected Disagreement',
  demosDissentDesc: 'See how formal dissent is filed, protected from retaliation, and tracked to outcome. Includes a vindication case where the dissenter was proven right 6 months later.',
  demosGhostBoardTitle: 'Ghost Board™ — Board Meeting Rehearsal',
  demosGhostBoardDesc: 'Rehearse your board presentation against AI directors. Face tough questions from Standard, VC-Backed, Public Company, or Private Equity boards — with preparedness scoring.',
  demosPreMortemTitle: 'Pre-Mortem Engine — Failure Before It Happens',
  demosPreMortemDesc: '"Assume this decision failed catastrophically. Why?" See failure narratives, root cause analysis, early warning signals, and mitigations — before you commit.',
  demosOversightTitle: 'Oversight — Trust Layer',
  demosOversightDesc: 'Adversarial stress testing, red team challenges, and compliance validation. Prove your decisions can survive scrutiny.',
  demosCrucibleTitle: 'CendiaCrucible — Red Team Stress Test',
  demosCrucibleDesc: 'Watch 8 adversarial perspectives tear apart a wire transfer decision: Pessimist CFO, Paranoid CISO, Cynical Lawyer, Ethics Watchdog, and more — with risk scoring, failure scenarios, and mitigations.',
  demosEvidenceTitle: 'Evidence — Trust Layer',
  demosEvidenceDesc: 'Cryptographic proof, immutable audit trails, and air-gapped transfer. Every decision is designed to support evidentiary standards.',
  demosAuditTitle: 'Audit Provenance™',
  demosAuditDesc: 'Explore a cryptographically signed evidence packet: decision trace, agent votes, Merkle tree integrity proof, compliance control mapping, and regulator-ready exports.',
  demosQrBridgeTitle: 'QR Air-Gap Bridge — Zero-Network Transfer',
  demosQrBridgeDesc: 'Watch a decision packet transfer across an air gap using animated QR code sequences. No USB, no network, no risk — just light. With Reed-Solomon error correction and SHA-256 integrity.',
  demosIndustryTitle: 'Industry Verticals',
  demosIndustryDesc: 'See how Datacendia adapts to your industry — with specialized agents, compliance frameworks, and domain-specific governance.',
  demosFootballTitle: 'Football Transfer Governance',
  demosLegalTitle: 'Legal Compliance Governance',
  demosHotelTitle: 'Hotel Investment Governance',
  demosTradingTitle: 'Trading Desk Governance',
  demosCtaTitle: 'Ready to See It Live?',
  demosCtaDesc: 'Request a personalized demo with your own data and use cases.',
  demosCtaBtn: 'Request Live Demo →',
  // verticals.html
  verticalsPageTitle: 'Industry Verticals',
  verticalsPageSubtitle: 'Durable across multiple verticals, each with full 6-layer compliance: data connectors, knowledge base, compliance mapping, decision schemas, agent presets, and defensible outputs.',
  verticalsTier1Label: 'Tier 1 — Priority Verticals',
  verticalsTier1Title: 'Production-Ready Industries',
  verticalsTier1Desc: 'Full compliance frameworks, specialized AI agents, and industry-specific integrations.',
  verticalsTier2Label: 'Defense & Critical Infrastructure',
  verticalsTier2Title: 'Mission-Critical Industries',
  verticalsTier2Desc: 'Full 6-layer compliance, specialized agents, and industry-specific decision schemas.',
  verticalsTier3Label: 'Industrial & Operations',
  verticalsTier3Title: 'Build, Move, Manufacture',
  verticalsTier3Desc: 'Full compliance frameworks, decision schemas, and defensible outputs for physical-world industries.',
  verticalsTier4Label: 'Consumer, Services & Specialty',
  verticalsTier4Title: 'Every Industry, Governed',
  verticalsTier4Desc: 'Full compliance frameworks, decision schemas, and defensible outputs for service and specialty industries.',
  verticalsHealthcareName: 'Healthcare / Health Systems',
  verticalsHealthcareTagline: 'HIPAA-ready clinical decision intelligence with CMS AI transparency',
  verticalsFinanceName: 'Financial Services',
  verticalsFinanceTagline: 'SOX, Basel III/IV, and AML/BSA ready decision intelligence',
  verticalsLegalName: 'Legal / Law Firms',
  verticalsLegalTagline: 'Privilege-preserving AI with audit-grade decision packets for legal practice',
  verticalsGovName: 'Government',
  verticalsGovTagline: 'Sovereign AI for policy, procurement, and public sector intelligence',
  verticalsInsuranceName: 'Insurance',
  verticalsInsuranceTagline: 'Claims & underwriting decision intelligence with bias detection and fairness artifacts',
  verticalsPharmaName: 'Pharmaceutical',
  verticalsPharmaTagline: 'FDA 21 CFR Part 11 ready clinical trial and regulatory intelligence',
  verticalsDefenseName: 'Defense & National Security',
  verticalsDefenseTagline: 'DIU-ready decision intelligence with OPSEC enforcement and classification controls',
  verticalsEnergyName: 'Energy & Utilities',
  verticalsEnergyTagline: 'Critical infrastructure decision governance with safety-first defaults',
  verticalsAerospaceName: 'Aerospace',
  verticalsAerospaceTagline: 'Aviation safety and certification decision engine for airworthiness governance',
  verticalsTelecomName: 'Telecom',
  verticalsTelecomTagline: 'Network and subscriber decision governance with spectrum and privacy compliance',
  verticalsMfgName: 'Manufacturing',
  verticalsMfgTagline: 'Quality-first decision intelligence with PPAP-ready documentation',
  verticalsIndustrialName: 'Industrial Services',
  verticalsIndustrialTagline: 'Safety-first decision intelligence with multi-jurisdiction compliance',
  verticalsConstructionName: 'Construction',
  verticalsConstructionTagline: 'OSHA-ready safety governance with construction-specific audit trails',
  verticalsAutomotiveName: 'Automotive',
  verticalsAutomotiveTagline: 'Vehicle safety and recall governance with NHTSA-ready audit trails',
  verticalsTransportName: 'Transportation & Logistics',
  verticalsTransportTagline: 'Fleet safety governance with DOT/FMCSA compliance and hazmat audit trails',
  verticalsAgriName: 'Agriculture & AgTech',
  verticalsAgriTagline: 'Precision agriculture with environmental compliance and subsidy governance',
  verticalsTechName: 'Technology / SaaS',
  verticalsTechTagline: 'AI governance for AI builders — audit-ready incident response and model deployment',
  verticalsRetailName: 'Retail & E-Commerce',
  verticalsRetailTagline: 'Pricing ethics governance with consumer protection and supply chain compliance',
  verticalsEducationName: 'Education',
  verticalsEducationTagline: 'Assessment fairness engine with equity-gated admissions and FERPA compliance',
  verticalsRealEstateName: 'Real Estate',
  verticalsRealEstateTagline: 'Fair lending decision trails with valuation governance and bias detection',
  verticalsHospitalityName: 'Hospitality',
  verticalsHospitalityTagline: 'Guest safety governance with food safety, ADA, and liquor compliance',
  verticalsMediaName: 'Media & Entertainment',
  verticalsMediaTagline: 'Content governance with child safety, rights management, and moderation',
  verticalsSportsName: 'Sports / Football Clubs',
  verticalsSportsTagline: 'Transfer governance, PSR/FFP compliance monitoring, and decision continuity through manager turnover',
  verticalsCtaTitle: 'Need a Custom Configuration?',
  verticalsCtaDesc: 'Every vertical ships with full compliance frameworks and decision schemas. We can further customize agents, workflows, and integrations for your specific regulatory environment.',
  verticalsCtaBtn: 'Request Custom Briefing →',
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
