/**
 * Generate i18n key definitions for all hard-coded text in index.html
 * that is NOT yet wired with data-i18n attributes.
 * 
 * Outputs:
 *  1. A JSON map of key -> English value (for review)
 *  2. The list of keys to add to translation files
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

// All new keys for index.html — English values
const INDEX_NEW_KEYS = {
  // Landing overlay
  landingTagline: "Decision Crisis Immunization Infrastructure",
  landingStatNum: "Survive Regulatory Scrutiny",
  landingStatLabel: "When regulators challenge your AI decisions, prove your process with cryptographic evidence they can verify independently",
  landingSkip: "Skip →",

  // Nav
  navPlatform: "Platform",
  navPlatformOverview: "Platform Overview",
  navPlatformOverviewDesc: "Full capability map",
  navDcii: "DCII Framework",
  navDciiDesc: "9 primitives · Crisis immunization",
  navDgi: "DGI Framework",
  navDgiDesc: "Open standard · Vendor-neutral",
  navArchitecture: "Architecture",
  navArchitectureDesc: "8 system diagrams",
  navEvidence: "Evidence",
  navDemos: "Interactive Demos",
  navDemosDesc: "Council, Chronos, Crucible & more",
  navWargames: "War Games",
  navWargamesDesc: "Would dissent have surfaced the risk?",
  navCaseStudies: "Case Studies",
  navCaseStudiesDesc: "Real-world decision analysis",
  navIndustries: "Industries",
  navPricing: "Pricing",
  navTierOverview: "Tier Overview",
  navTierOverviewDesc: "Foundation · Enterprise · Strategic",
  navPremiumModules: "Premium Modules",
  navPremiumModulesDesc: "7 advanced capabilities",
  navRoiCalculator: "ROI Calculator",
  navRoiCalculatorDesc: "Quantify decision risk reduction",
  navPilot: "90-Day Pilot",
  navPilotDesc: "Prove value before scaling",
  navTrust: "Trust",
  navTrustCenter: "Trust Center",
  navTrustCenterDesc: "Security, compliance & deployment",
  navHonestyMatricesLink: "Honesty Matrices",
  navHonestyMatricesDesc: "What we can't do — yet",
  navRequestBriefing: "Request Briefing",

  // CTA buttons
  btnCalculateRoi: "Calculate Your ROI →",
  btnTryTransferDemo: "Try Transfer Demo",
  btnRequestBriefing: "Request Briefing",

  // Category section
  categoryLabel: "The Category",
  categoryTitle: "Datacendia is Decision Crisis Immunization Infrastructure.",
  categoryDesc: "We created a new category: the evidentiary layer that proves AI decisions were made correctly when challenged years later under adversarial scrutiny.",
  categorySub: "Built on 9 primitives that prevent institutional failure:",

  // 9 Primitives
  p1Name: "Discovery-Time Proof",
  p1Desc: "Prove when you knew what you knew — cryptographically timestamped.",
  p2Name: "Deliberation Capture",
  p2Desc: "Record the full reasoning — every argument, trade-off, and vote.",
  p3Name: "Override Accountability",
  p3Desc: "When humans overrule AI, the override is logged, justified, and tracked.",
  p4Name: "Continuity Memory",
  p4Desc: "Institutional knowledge that survives leadership transitions.",
  p5Name: "Drift Detection",
  p5Desc: "Detect when decisions deviate from policy — before crisis.",
  p6Name: "Cognitive Bias Mitigation",
  p6Desc: "Identify and mitigate human cognitive biases in decision-making.",
  p7Name: "Quantum-Resistant Integrity",
  p7Desc: "Evidence integrity survives quantum computing attacks.",
  p8Name: "Synthetic Media Authentication",
  p8Desc: "Detect deepfakes and synthetic media in evidence chains.",
  p9Name: "Cross-Jurisdiction Compliance",
  p9Desc: "Decisions comply across 17 jurisdictions simultaneously.",
  primitivesNote: "These aren't features. They're the structural antibodies that make organizations immune to decision crises.",
  primitivesLearnLink: "Learn the DCII framework →",

  // 3 Core Pillars
  platformLabel: "The Platform",
  pillarsTitle: "3 Core Pillars",
  pillarsSubtitle: "Make decisions → Understand them → Prove them",

  councilPillarTitle: "The Council™",
  councilPillarSubtitle: "Multi-Agent Deliberation",
  councilPillarDesc: "15 C-suite AI agents debate every decision from their domain — surfacing blind spots, conflicts, and consensus before you commit.",
  councilFeature1: "15 core agents + premium packs",
  councilFeature2: "35+ deliberation modes",
  councilFeature3: "Live deliberation with avatars",
  councilFeature4: "60-trait personality system",
  councilLearnMore: "Learn more →",

  decidePillarTitle: "Decide™",
  decidePillarSubtitle: "Decision Intelligence Suite",
  decidePillarDesc: "Intelligence for every decision — past, present, and future. Time machines, failure prediction, consequence mapping, and explainability.",
  decideFeature1: "CendiaChronos™ time machine",
  decideFeature2: "PreMortem™ failure prediction",
  decideFeature3: "Decision Debt™ (cost of inaction)",
  decideFeature4: "CendiaLens™ AI explainability",
  decideSeeDemo: "See demos →",

  dciiPillarTitle: "DCII™",
  dciiPillarSubtitle: "Crisis Immunization + Evidence",
  dciiPillarDesc: "The 9 primitives + cryptographic proof infrastructure. When regulators challenge your decisions, DCII is what you show them.",
  dciiFeature1: "9 crisis immunization primitives",
  dciiFeature2: "CendiaVault™ + CendiaNotary™",
  dciiFeature3: "Regulator's Receipt™ (1-click PDF)",
  dciiFeature4: "IISS™ resilience scoring",
  dciiLearnFramework: "Learn the framework →",

  pillarNote: "Foundation tier: Custom pricing ·",
  pillarNoteLink: "Start with a pilot →",

  // Regulator's Receipt showcase
  rrLabel: "DCII — Evidence Infrastructure",
  rrTitle: "Regulator's Receipt™",
  rrDesc: "Every council deliberation generates three cryptographically signed PDFs automatically. SHA-256 hashed, Merkle tree verified, RFC 3161 timestamped. Independently verifiable without Datacendia.",
  rrBadge1: "forensic-grade, independently verifiable Record",
  rrBadge2: "Evidence Package",
  rrBadge3: "Executive Summary",
  rrFeature1: "SHA-256 hash + Merkle root across deliberation, citations, responses, dissents",
  rrFeature2: "Ed25519 digital signature — verifiable with standard openssl, no vendor needed",
  rrFeature3: "Compliance gates: [PASS]/[FAIL] per framework (SOC2, GDPR, EU AI Act, ISO 27001)",
  rrFeature4: "Named dissenting agents, human approver record, full council participant table",
  rrCta: "See Full Showcase →",

  // Tier Progression
  tierLabel: "Progressive Disclosure — 12 Pillars Across 3 Tiers",
  tier1Name: "Tier 1: Foundation",
  tier1Pillars: "The Council · Decide · DCII",
  tier1Flow: "Make → Understand → Prove",
  tier1Price: "Custom Pricing",
  tier2Name: "Tier 2: Enterprise",
  tier2Pillars: "Stress-Test · Comply · Govern · Sovereign · Operate",
  tier2Flow: "Harden → Scale → Automate",
  tier2Price: "Custom Pricing",
  tier3Name: "Tier 3: Strategic",
  tier3Pillars: "Collapse · SGAS · Verticals · Frontier",
  tier3Flow: "Survive → Model → Dominate → Govern",
  tier3Price: "Custom Pricing",
  viewFullPricing: "View Full Pricing & Capabilities →",

  // IISS
  metricLabel: "The Metric",
  iissTitle: "The Institutional Immune System Score™",
  iissSubtitle: "Like FICO for institutional survival.",
  iissDesc: "A 0–1000 score measuring your organization's crisis resilience — calculated from DCII evidence across the 9 primitives.",
  iissExceptional: "Exceptional",
  iissExcellent: "Excellent",
  iissGood: "Good",
  iissFair: "Fair",
  iissCritical: "Critical",
  iissBenefit1: "Insurance carriers: Projected 20–40% premium reduction for scores >800 (target — not yet verified by carriers)",
  iissBenefit2: "Institutional investors: ESG funds targeting scores >700 (projected threshold)",
  iissBenefit3: "Regulators: Scores >850 designed for streamlined review eligibility",
  iissBenefit4: "Competition: \"What's your IISS?\" becomes the question",
  iissCalculateCta: "Calculate Your IISS Score →",

  // Deployment Options
  deployTitle: "Sovereign Deployment Options",
  deployDesc: "Choose where Datacendia runs. All modes produce identical cryptographic evidence.",
  deployCloud: "Cloud",
  deployCloudSub: "AWS · Azure · GCP",
  deployPrivate: "Private Cloud",
  deployPrivateSub: "Your VPC",
  deployOnPrem: "On-Premises",
  deployOnPremSub: "Your data center",
  deployAirGap: "Air-Gapped",
  deployAirGapSub: "Isolated networks",
  deployNote: "All deployment modes provide: your encryption keys (KMS/HSM) · immutable audit ledger (your control) · evidence export (standard formats) · no vendor lock-in",

  // Trust layer
  trustWhatSub: "Not BI. Not another AI API. A decision layer that proves why it decided what it decided.",
  trustMetricSub1: "99.9% pass rate · Feb 8, 2026",
  trustMetricSub2: "5 classes · durable across multiple verticals",
  trustMetricSub3: "OWASP LLM Top 10 coverage",
  trustMetricSub4: "Full i18n localization",
  trustMetricSub5: "Cloud · Private · On-Prem · Air-Gap",

  // Buyer anchor
  cisosBadge: "CISOs & Security Leaders",
  croBadge: "Chief Risk Officers",
  gcBadge: "General Counsel",
  cmroBadge: "Chief Model Risk Officers",
  boardBadge: "Board-Level Oversight",
  complianceBadge: "Compliance & Governance",
  defenseBadge: "National Security & Defense",
  healthcareBadge: "Hospital CIOs & CMIOs",
  sportsBadge: "Sporting Directors & Club Boards",
  financialBadge: "Regulated Financial Services",
  govBadge: "Government Contracting Officers",
  investorBadge: "Investors & Portfolio Governance",

  // Architecture
  howItWorksLabel: "How It Works",
  architectureTitle: "60-Second Architecture",
  archDataSources: "Data Sources",
  archDataSourcesDesc: "ERP, CRM, BI tools, databases",
  archConnectors: "Connector Suites",
  archConnectorsDesc: "16 suites on 6 universal adapters",
  archEvidenceLedger: "Evidence Ledger",
  archEvidenceLedgerDesc: "Immutable lineage + signatures",
  archCouncil: "The Council™",
  archCouncilDesc: "Multi-agent deliberation",
  archExport: "Export Packets",
  archExportDesc: "PDF, JSON, regulator-ready",
  archNote: "All processing on your infrastructure. Keys in your KMS. Evidence in your ledger.",

  // FAQ
  faqTitle: "How is this different?",
  faqBiQ: "Is this BI?",
  faqBiA: "No. BI dashboards show you what happened. Datacendia shows you what to do about it—with multi-agent deliberation that weighs trade-offs, surfaces dissent, and produces audit-ready evidence for every recommendation.",
  faqApiQ: "Is this another AI API?",
  faqApiA: "No. AI APIs give you predictions without proof. Datacendia runs on your infrastructure, logs every decision to an immutable ledger you control, and exports evidence packets that satisfy regulators—not just executives.",
  faqAnalyticsQ: "Is this analytics + AI agents?",
  faqAnalyticsA: "Closer, but incomplete. Analytics + agents still typically run in vendor clouds with opaque reasoning. Datacendia adds sovereignty (your infrastructure), governance (40+ specialized agents that deliberate across 5 classes), and auditability (cryptographic proof of every decision).",
  faqSovereignQ: "Why \"Sovereign\"?",
  faqSovereignA: "Because your data never leaves your control. In on-prem and air-gapped deployments, no vendor custody of customer data—CLOUD Act exposure depends on your infrastructure choices. No vendor lock-in. No \"trust us\" black boxes. You own the infrastructure, the keys, and the audit trail. That's sovereignty.",
  faqBankQ: "How does this help a bank pass a regulatory exam?",
  faqBankA: "Datacendia produces audit-ready evidence packets mapped to SR 11-7 model risk management requirements. Override Accountability (P3) documents every instance a human overrides a model recommendation — exactly what OCC/Fed examiners ask for. Discovery-Time Proof (P1) establishes when risks were identified, satisfying \"knew or should have known\" standards.",
  faqHospitalQ: "Can a hospital use this for clinical decisions?",
  faqHospitalA: "Datacendia governs the decision process, not the clinical recommendation itself — it is not a diagnostic tool and does not fall under FDA Clinical Decision Support guidance (21st Century Cures Act §3060). It captures deliberation, documents protocol deviations, and produces evidence for Joint Commission sentinel event reviews and CMS compliance.",
  faqSportsQ: "How does this apply to football / sports?",
  faqSportsA: "Transfer decisions, FFP/PSR compliance, wage-to-revenue monitoring, and manager succession planning. Drift Detection (P5) flags when your wage ratio creeps toward the Premier League PSR threshold across windows. Continuity Memory (P4) preserves scouting intelligence and tactical decisions through manager turnover.",
  faqSportsLink: "Try the transfer demo →",
  faqInvestQ: "What makes this investable as a category?",
  faqInvestA: "Decision Crisis Immunization Infrastructure is a new category — no incumbent owns it. The TAM spans every regulated industry making high-stakes decisions: banking, healthcare, defense, and sports. Crisis Immunization is the positioning wedge that opens the door.",

  // Feature cards — taglines and feature lists (titles/descs already wired)
  chronosTagline: "Divergent future simulation",
  chronosFeature1: "What-if scenario branching",
  chronosFeature2: "Multi-timeline visualization",
  chronosFeature3: "Resource impact prediction",
  chronosSeeDemo: "See demo →",

  councilShowcaseTagline: "Multi-agent boardroom debate",
  councilShowcaseFeature1: "40+ governance agents",
  councilShowcaseFeature2: "5 agent classes",
  councilShowcaseFeature3: "Structured deliberation protocol",
  councilShowcaseLearnMore: "Learn how it works →",

  auditProvenanceTagline: "Full decision lineage & evidence export",
  auditProvenanceFeature1: "Cryptographically signed decision packets",
  auditProvenanceFeature2: "SOC 2 / ISO 27001 / NIST 800-53 ready",
  auditProvenanceFeature3: "One-click regulator-ready exports",
  auditProvenanceFeature4: "Complete decision lineage & traceability",
  auditProvenanceSeeDemo: "See demo →",

  cascadeTagline: "Butterfly effect engine",
  cascadeFeature1: "Change propagation mapping",
  cascadeFeature2: "2nd & 3rd-order consequences",
  cascadeFeature3: "Impact visualization",
  cascadeSeeDemo: "See demo →",

  omniTranslateTagline: "100+ language AI translation",
  omniTranslateFeature1: "100+ languages with RTL",
  omniTranslateFeature2: "Glossary & translation memory",
  omniTranslateFeature3: "Runs on your infrastructure",
  omniTranslateLearnMore: "Learn more →",

  roiTagline: "Prove the value of AI decisions",
  roiFeature1: "Decision speed metrics",
  roiFeature2: "Confidence scoring",
  roiFeature3: "Audit packet generation",
  roiCalculateCta: "Calculate ROI →",

  sovereignTagline: "11 sovereign architectural patterns",
  sovereignFeature1: "Air-gapped deployment",
  sovereignFeature2: "Data diode ingest",
  sovereignFeature3: "Hardware-signed decisions",
  sovereignViewArch: "View architecture →",

  apotheosisTagline: "AI that red-teams itself nightly",
  apotheosisFeature1: "Automated adversarial testing",
  apotheosisFeature2: "Auto-patching & pattern banning",
  apotheosisFeature3: "Continuous self-improvement",

  dissentTagline: "Formal disagreement protocol",
  dissentFeature1: "Protected dissent filing",
  dissentFeature2: "Outcome tracking",
  dissentFeature3: "Retaliation safeguards",
  dissentSeeDemo: "See demo →",

  zeroCopyTagline: "Data never leaves your infrastructure",
  zeroCopyFeature1: "5 universal adapters — no ETL",
  zeroCopyFeature2: "Connects to your existing databases",
  zeroCopyFeature3: "True data sovereignty",

  // Demo video
  seeItWorkLabel: "See It Work",
  councilInActionTitle: "The Council™ in Action",
  councilInActionDesc: "Watch multi-agent deliberation run a real decision — with cross-examination, formal dissent, and cryptographic evidence export.",
  videoBrowserFallback: "Your browser does not support the video tag.",
  allDemosLink: "All Demos →",
  startPilotLink: "Start a 90-Day Pilot →",

  // War Games
  warGamesLabel: "War Games",
  warGamesTitle: "Would Structured Dissent Have Surfaced the Risk?",
  warGamesDesc: "Using only information available at the time, we simulate whether multi-agent review would have flagged material risk before outcome.",
  wg1Tag: "Banking · Institutional Failure",
  wg1Title: "Silicon Valley Bank",
  wg1Desc: "Structured review surfaced material duration risk and liquidity concentration before rate cycle stress.",
  wg2Tag: "Aerospace · 346 Lives",
  wg2Title: "Boeing 737 MAX",
  wg2Desc: "Single-point-of-failure flagged. Training gap identified. Established safety principles already prohibited this.",
  wg3Tag: "Fraud · Institutional Failure",
  wg3Title: "Wirecard",
  wg3Desc: "Unverifiable cash balances and margin inconsistencies identified as material red flags from public data alone.",
  wg4Tag: "Healthcare · Institutional Failure",
  wg4Title: "Theranos",
  wg4Desc: "Absence of peer review and blocked due diligence flagged as disqualifying risk factors.",
  wg5Tag: "Football · 10-Point Deduction",
  wg5Title: "Everton FC PSR Breach",
  wg5Desc: "Drift Detection would have flagged wage-to-revenue ratio creep across 3 transfer windows before the Premier League's PSR threshold was breached.",
  wg6Tag: "Healthcare · Patient Safety",
  wg6Title: "NHS Maternity Failures",
  wg6Desc: "Override Accountability and Deliberation Capture would have documented clinical protocol deviations before they became systemic.",
  seeAllWargames: "See All War Game Analyses →",

  // Honesty section
  honestyDesc: "Sovereignty comparisons, governance reality checks, integration truth tables, what breaks at 3 AM, and what we can't do — all documented honestly.",
  exploreMatrices: "Explore All Matrices →",
  readManifesto: "Read the Manifesto →",
  platformCapabilitiesLink: "Platform Capabilities →",

  // Case Studies
  realPilotsLabel: "Real Pilots",
  caseStudiesTitle: "What Organizations Actually Say",
  caseStudiesDesc: "Anonymized pilot case studies. No inflated metrics. No AI accuracy claims.",
  cs1Tag: "Industrial Manufacturing",
  cs1Quote: "\"The system didn't tell us what to do. It forced us to be explicit about why we chose to do it.\"",
  cs1Meta: "90-day pilot · On-premises · Latin America",
  cs2Tag: "Financial Services",
  cs2Quote: "\"The value wasn't the recommendation — it was the evidence trail.\"",
  cs2Meta: "60-day pilot · On-premises · Europe",
  cs3Tag: "Healthcare",
  cs3Quote: "\"It slowed us down slightly — and that was a good thing.\"",
  cs3Meta: "45-day evaluation · On-premises · North America",
  cs4Tag: "Public-Sector Adjacent",
  cs4Quote: "\"It gave us memory without politics.\"",
  cs4Meta: "90-day pilot · On-premises · Europe",
  readAllCaseStudies: "Read All 4 Case Studies →",

  // Early stage
  earlyStageDisclaimer: "We're a new platform seeking pilot partners.",
  earlyStageLink: "Join our pilot program",
  earlyStageEnd: "to create real results together.",

  // Newsletter
  newsletterTitle: "Stay Informed",
  newsletterDesc: "Platform updates, new compliance guides, and industry analysis. No spam — one email per month, max.",
  newsletterPlaceholder: "your@email.com",
  newsletterBtn: "Subscribe",
  newsletterThanks: "Thanks — we'll be in touch.",
  newsletterFine: "No tracking pixels. Unsubscribe anytime.",
  newsletterPrivacy: "Privacy Policy",

  // Footer
  footerOutcome: "Ready to own your AI decisions—and prove them to regulators?",
  footerSeeResults: "See Results in 90 Days",
  footerStatus: "SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED",
};

// Write to a JSON file for review
fs.writeFileSync(
  path.join(ROOT, 'scripts', 'index-new-keys.json'),
  JSON.stringify(INDEX_NEW_KEYS, null, 2),
  'utf8'
);

console.log('Generated ' + Object.keys(INDEX_NEW_KEYS).length + ' new keys for index.html');
console.log('Written to scripts/index-new-keys.json');
