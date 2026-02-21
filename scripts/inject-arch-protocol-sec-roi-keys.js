/**
 * inject-arch-protocol-sec-roi-keys.js
 * Injects new i18n keys for architecture.html, protocol.html,
 * security-controls.html, and roi-calculator.html into all 11 language files.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const CLOSE_PATTERN = '\n};\n\nif (typeof window';

const NEW_KEYS = {
  // architecture.html
  archBackLink: '← Return to Datacendia',
  archPageTitle: 'The Datacendia Cortex™',
  archPageSubtitle: 'A decision operating system built on 8 proprietary pillars. Not a wrapper. Not an API proxy. A complete cognitive infrastructure for sovereign enterprises.',
  archP1Tagline: 'The Cognitive Engine',
  archP2Tagline: 'The Conscience',
  archP3Tagline: 'The Shield',
  archP4Tagline: 'The Truth',
  archP5Tagline: 'The Interface',
  archP6Tagline: 'The Foresight',
  archP7Tagline: 'The Hands',
  archP8Tagline: 'The Pulse',
  archSovTagline: 'Beyond the 8 Pillars',
  archSovTitle: 'Sovereign Architecture Patterns',
  archP1M1Name: 'The Council',
  archP1M2Name: 'RedTeam Module',
  archP1M3Name: 'Analyst Module',
  archP1M4Name: 'Mirror Module',
  archP1M5Name: 'Synthesis Engine',
  archP2M1Name: 'CendiaVeto™',
  archP2M2Name: 'The Spectator',
  archP2M3Name: 'Compliance Oracle',
  archP3M1Name: 'Audit Provenance™',
  archP3M2Name: 'Anonymizer Cortex',
  archP3M3Name: 'Air-Gap Protocol',
  archP3M4Name: 'Shadow Mode Shredder',
  archP4M1Name: 'CendiaChronos™',
  archP4M2Name: 'Knowledge Graph',
  archP4M3Name: 'Source Attribution',
  archP4M4Name: 'Data Broker',
  archP5M1Name: 'NLP Command Processor',
  archP5M2Name: 'Voice Biometrics',
  archP5M3Name: 'Sovereign Response Generator',
  archP6M1Name: 'Scenario Simulator',
  archP6M2Name: 'Trend Extrapolator',
  archP7M1Name: 'The Actuator',
  archP7M2Name: 'Connector Mesh',
  archP8M1Name: 'Drift Detector',
  archP8M2Name: 'Agent Sanity Check',
  archP8M3Name: 'Resource Monitor',
  archSovM1Name: 'CendiaDataDiode™',
  archSovM2Name: 'CendiaLocalRLHF™',
  archSovM3Name: 'CendiaFederatedMesh™',
  archSovM4Name: 'CendiaQuantumKMS™',
  archSovM5Name: 'CendiaCourt™',
  archSovM6Name: 'CendiaTPM™',
  archSovM7Name: 'CendiaTimeLock™',
  archSovM8Name: 'CendiaCanary™',
  archMoatTitle: 'The Defensive Moat',
  archMoatEthics: 'Ethics Pillar',
  archMoatGuard: 'Guard Pillar',
  archMoatLineage: 'Lineage Pillar',
  archMoatAgents: 'Agents Pillar',
  archDiagsTitle: 'Interactive Architecture Diagrams',
  archDiagsDesc: 'Click any component to learn what it is, what it does, and how it\'s used.',
  archCtaTitle: 'Ready to see the Cortex™ in action?',

  // protocol.html
  protBackLink: '← Return to Datacendia',
  protPageTitle: 'Architecture Protocol',
  protPageSubtitle: 'The definitive technical specification for the Datacendia Cortex. This document serves as the authoritative reference for system architecture, data flows, security boundaries, and integration protocols.',
  protVersionBadge: 'Version 1.0 · January 2026',
  protTocTitle: 'Table of Contents',
  protToc1: 'System Overview',
  protToc2: 'Design Principles',
  protToc3: 'The Eight Pillars',
  protToc4: 'Data Flow Architecture',
  protToc5: 'Deliberation Protocol',
  protToc6: 'Security Model',
  protToc7: 'Audit & Lineage',
  protToc8: 'Deployment Modes',
  protToc9: 'Integration Protocol',
  protToc10: 'Known Limits',
  protS1Title: 'System Overview',
  protS2Title: 'Design Principles',
  protS3Title: 'The Eight Pillars',
  protS4Title: 'Data Flow Architecture',
  protS5Title: 'Deliberation Protocol',
  protS6Title: 'Security Model',
  protS7Title: 'Audit & Lineage',
  protS8Title: 'Deployment Modes',
  protS9Title: 'Integration Protocol',
  protS10Title: 'Known Limits',
  protS2H1: '2.1 Sovereignty Over Convenience',
  protS2H2: '2.2 Proof Over Trust',
  protS2H3: '2.3 Dissent Over Consensus',
  protS2H4: '2.4 Depth Over Wrappers',
  protS4H1: '4.1 Ingestion Phase',
  protS4H2: '4.2 Processing Phase',
  protS4H3: '4.3 Synthesis Phase',
  protS4H4: '4.4 Veto Phase',
  protS4H5: '4.5 Output Phase',
  protS5H1: '5.1 Agent Configuration',
  protS5H2: '5.2 Deliberation Rounds',
  protS5H3: '5.3 Deadlock Handling',
  protS6H1: '6.1 Trust Boundaries',
  protS6H2: '6.2 Encryption Standards',
  protS6H3: '6.3 Authentication & Authorization',
  protS6H4: '6.4 Air-Gap Protocol',
  protS7H1: '7.1 Decision Trace Structure',
  protS7H2: '7.2 Audit Provenance Ledger',
  protS7H3: '7.3 CendiaChronos Time-Travel',
  protS8H1: '8.1 Hardware Requirements',
  protS8H2: '8.2 Container Architecture',
  protS9H1: '9.1 API Surface',
  protS9H2: '9.2 Connector Mesh',
  protS9H3: '9.3 Webhook Events',
  protS10H1: '10.1 Technical Limits',
  protS10H2: '10.2 Operational Limits',
  protS10H3: '10.3 What The Cortex Does Not Do',
  protCallout1: 'Critical Constraint',
  protCallout2: 'Design Rationale',
  protCallout3: 'The Honesty Principle',
  protDiagCaption: 'Figure 4.1: Core data flow through the Datacendia Cortex',

  // security-controls.html
  secBackLink: '← Return to Datacendia',
  secPageTitle: 'Datacendia Sovereign Architecture & Control Mapping',
  secPageSubtitle: 'Alignment with SOC 2 Type II (TSC 2017) and NIST 800-53',
  secStatusBadge: 'Status: Architecture-Ready (Pre-Audit)',
  secIntroText: 'This document provides detailed control mapping for enterprise security review. Formal SOC 2 Type II attestation is in progress (target Q2 2026).',
  secPhysicsTitle: 'Why Sovereign Architecture Changes the Security Model',
  secRoadmapTitle: 'Formal Audit Roadmap',
  secS1Num: 'Section 1',
  secS1Title: 'Core Security Controls',
  secS1Desc: 'SOC 2 - CC Series · Protecting the system against unauthorized access',
  secThControlId: 'Control ID',
  secThRequirement: 'Requirement',
  secThImpl: 'Datacendia Sovereign Implementation',
  secCC61Req: 'Logical Access Security',
  secCC61ReqDesc: 'Restrict access to authorized users only.',
  secCC67Req: 'Data Transmission',
  secCC67ReqDesc: 'Protect data during transmission.',
  secCC71Req: 'Detection of Anomalies',
  secCC71ReqDesc: 'Monitor for malicious activity.',
  secCC81Req: 'Change Management',
  secCC81ReqDesc: 'Authorize changes to software/data.',
  secS2Num: 'Section 2',
  secS2Title: 'Confidentiality Controls',
  secS2Desc: 'SOC 2 - C Series · How do you keep secrets? (Critical for Banks/Defense)',
  secC11Req: 'Confidentiality of Data',
  secC11ReqDesc: 'Identify and protect sensitive data.',
  secC12Req: 'Disposal of Data',
  secC12ReqDesc: 'Securely destroy data when no longer needed.',
  secS3Num: 'Section 3',
  secS3Title: 'Processing Integrity Controls',
  secS3Desc: "SOC 2 - PI Series · Proving your AI isn't just making things up (Critical for Decision Intelligence)",
  secPI11Req: 'Completeness & Accuracy',
  secPI11ReqDesc: 'Ensure processing is valid and complete.',
  secPI12Req: 'Error Handling',
  secPI12ReqDesc: 'Detect and manage processing errors.',
  secS4Num: 'Section 4',
  secS4Title: 'NIST 800-53 Mapping',
  secS4Desc: 'For Defense & Government Clients',
  secAC3Req: 'Access Enforcement',
  secAU3Req: 'Content of Audit Records',
  secSC7Req: 'Boundary Protection',
  secSharedTitle: 'Shared Responsibility Model',
  secSharedDC: 'Datacendia Responsibility',
  secSharedClient: 'Client Responsibility',
  secWarrantyTitle: 'Contractual No-Access Warranty',
  secFooterVersion: 'Datacendia_Security_Control_Map_v1.0 · January 2026',

  // roi-calculator.html
  roiPageTitle: 'ROI Calculator',
  roiPageSubtitle: 'See how Datacendia compares to your current decision-making costs',
  roiInputTitle: '📊 Your Organization',
  roiLabelVertical: 'Industry Vertical',
  roiLabelRevenue: 'Annual Revenue',
  roiLabelDecisions: 'Number of Strategic Decisions per Year',
  roiHintDecisions: 'M&A, product launches, major investments, regulatory responses, etc.',
  roiLabelDecisionValue: 'Average Decision Value (Impact)',
  roiCurrentCostsTitle: '💸 Current Costs',
  roiLabelBI: 'BI/Analytics Tools (Annual)',
  roiHintBI: 'Tableau, Power BI, Looker, Snowflake, etc.',
  roiLabelConsulting: 'Consulting Spend (Annual)',
  roiHintConsulting: 'McKinsey, BCG, Deloitte, boutique firms',
  roiLabelTeam: 'Internal Analytics Team Size',
  roiHintTeam: 'Data analysts, scientists, BI developers',
  roiLabelCompliance: 'Compliance/Audit Preparation (Annual)',
  roiHintCompliance: 'SOC 2, regulatory filings, audit prep',
  roiResultsTitle: '📈 Your ROI with Datacendia',
  roiNetSavingsLabel: 'Annual Net Savings',
  roiNetSavingsSub: 'After Datacendia investment',
  roiRoiLabel: 'ROI',
  roiRoiSub: 'Return on investment',
  roiPaybackLabel: 'Payback Period',
  roiBreakdownTitle: 'Cost Breakdown',
  roiRowBI: 'Current BI Tools',
  roiRowConsulting: 'Consulting Spend',
  roiRowTeam: 'Team Cost (est.)',
  roiRowCompliance: 'Compliance Prep',
  roiRowTotalCurrent: 'Total Current Cost',
  roiWithDCTitle: 'With Datacendia',
  roiRowLicense: 'Datacendia License',
  roiRowBIReduced: 'BI Tools (reduced)',
  roiRowConsultingReduced: 'Consulting (reduced)',
  roiRowTeamOptimized: 'Team (optimized)',
  roiRowComplianceAuto: 'Compliance (automated)',
  roiRowTotalDC: 'Total With Datacendia',
  roiCtaBtn: 'Get Custom ROI Analysis →',
  roiAddValueTitle: 'Potential Additional Value',
  roiAddQ1Label: 'Decision Quality',
  roiAddQ1Sub: 'Multi-agent deliberation surfaces blind spots',
  roiAddQ2Label: 'Decision Speed',
  roiAddQ2Sub: 'Automated analysis vs. manual review',
  roiAddQ3Label: 'Audit Prep Time',
  roiAddQ3Sub: 'Evidence packets generated automatically',
  roiAddQ4Label: 'Risk Mitigation',
  roiAddQ4Sub: 'Dissent capture prevents groupthink',
  roiAssumptionsTitle: '⚠️ Important: These Are Estimates, Not Proven Results',
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
