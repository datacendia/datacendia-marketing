/**
 * wire-diagrams-p1.js: Wire data-i18n into diagrams.html — Nav, header, diagrams 1-4
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'diagrams.html');
let html = fs.readFileSync(FILE, 'utf8');
let count = 0;
function rep(o, n, k) {
  if (!html.includes(o)) { console.log('NOT FOUND: ' + k); return; }
  html = html.replace(o, n); count++;
}

// Nav
rep('<span class="nav-label">Platform</span>','<span class="nav-label" data-i18n="navPlatform">Platform</span>','navPlatform');
rep('<a href="platform-capabilities.html">Platform Overview<span class="nav-desc">Full capability map</span></a>','<a href="platform-capabilities.html"><span data-i18n="navPlatformOverview">Platform Overview</span><span class="nav-desc" data-i18n="navPlatformOverviewDesc">Full capability map</span></a>','navPlatformOverview');
rep('<a href="dcii.html">DCII Framework<span class="nav-desc">9 primitives &middot; Crisis immunization</span></a>','<a href="dcii.html"><span data-i18n="navDcii">DCII Framework</span><span class="nav-desc" data-i18n="navDciiDesc">9 primitives · Crisis immunization</span></a>','navDcii');
rep('<a href="diagrams.html">Architecture<span class="nav-desc">8 system diagrams</span></a>','<a href="diagrams.html"><span data-i18n="navArchitecture">Architecture</span><span class="nav-desc" data-i18n="navArchitectureDesc">8 system diagrams</span></a>','navArchitecture');
rep('<span class="nav-label">Evidence</span>','<span class="nav-label" data-i18n="navEvidence">Evidence</span>','navEvidence');
rep('<a href="demos.html">Interactive Demos<span class="nav-desc">Council, Chronos, Crucible &amp; more</span></a>','<a href="demos.html"><span data-i18n="navDemos">Interactive Demos</span><span class="nav-desc" data-i18n="navDemosDesc">Council, Chronos, Crucible &amp; more</span></a>','navDemos');
rep('<a href="wargames.html">War Games<span class="nav-desc">Would dissent have surfaced the risk?</span></a>','<a href="wargames.html"><span data-i18n="navWargames">War Games</span><span class="nav-desc" data-i18n="navWargamesDesc">Would dissent have surfaced the risk?</span></a>','navWargames');
rep('<a href="case-studies.html">Case Studies<span class="nav-desc">Real-world decision analysis</span></a>','<a href="case-studies.html"><span data-i18n="navCaseStudies">Case Studies</span><span class="nav-desc" data-i18n="navCaseStudiesDesc">Real-world decision analysis</span></a>','navCaseStudies');
rep('<a href="verticals.html">Industries</a>','<a href="verticals.html" data-i18n="navIndustries">Industries</a>','navIndustries');
rep('<span class="nav-label">Pricing</span>','<span class="nav-label" data-i18n="navPricing">Pricing</span>','navPricing');
rep('<a href="pricing.html">Tier Overview<span class="nav-desc">Foundation &middot; Enterprise &middot; Strategic</span></a>','<a href="pricing.html"><span data-i18n="navTierOverview">Tier Overview</span><span class="nav-desc" data-i18n="navTierOverviewDesc">Foundation · Enterprise · Strategic</span></a>','navTierOverview');
rep('<a href="premium.html">Premium Modules<span class="nav-desc">7 advanced capabilities</span></a>','<a href="premium.html"><span data-i18n="navPremiumModules">Premium Modules</span><span class="nav-desc" data-i18n="navPremiumModulesDesc">7 advanced capabilities</span></a>','navPremiumModules');
rep('<a href="roi-calculator.html">ROI Calculator<span class="nav-desc">Quantify decision risk reduction</span></a>','<a href="roi-calculator.html"><span data-i18n="navRoiCalculator">ROI Calculator</span><span class="nav-desc" data-i18n="navRoiCalculatorDesc">Quantify decision risk reduction</span></a>','navRoiCalculator');
rep('<a href="pilot.html">90-Day Pilot<span class="nav-desc">Prove value before scaling</span></a>','<a href="pilot.html"><span data-i18n="navPilot">90-Day Pilot</span><span class="nav-desc" data-i18n="navPilotDesc">Prove value before scaling</span></a>','navPilot');
rep('<span class="nav-label">Trust</span>','<span class="nav-label" data-i18n="navTrust">Trust</span>','navTrust');
rep('<a href="trust.html">Trust Center<span class="nav-desc">Security, compliance &amp; deployment</span></a>','<a href="trust.html"><span data-i18n="navTrustCenter">Trust Center</span><span class="nav-desc" data-i18n="navTrustCenterDesc">Security, compliance &amp; deployment</span></a>','navTrustCenter');
rep("<a href=\"honesty-matrices.html\">Honesty Matrices<span class=\"nav-desc\">What we can't do &mdash; yet</span></a>",'<a href="honesty-matrices.html"><span data-i18n="navHonestyMatricesLink">Honesty Matrices</span><span class="nav-desc" data-i18n="navHonestyMatricesDesc">What we can\'t do — yet</span></a>','navHonestyMatricesLink');
rep('<a href="briefing.html" class="nav-cta">Request Briefing</a>','<a href="briefing.html" class="nav-cta" data-i18n="navRequestBriefing">Request Briefing</a>','navRequestBriefing');

// Back link & page header
rep('<a href="index.html" class="back-link">&larr; Return to Datacendia</a>','<a href="index.html" class="back-link" data-i18n="diagBackLink">&larr; Return to Datacendia</a>','diagBackLink');
rep('<h1 class="page-title">Platform Architecture</h1>','<h1 class="page-title" data-i18n="diagPageTitle">Platform Architecture</h1>','diagPageTitle');
rep('<p class="page-subtitle">8 diagrams showing how Datacendia is structured, how decisions flow, and how sovereign infrastructure is deployed.</p>','<p class="page-subtitle" data-i18n="diagPageSubtitle">8 diagrams showing how Datacendia is structured, how decisions flow, and how sovereign infrastructure is deployed.</p>','diagPageSubtitle');

// Diagram nav links
rep('<a href="#tier-model">Tier Model</a>','<a href="#tier-model" data-i18n="diagNav1">Tier Model</a>','diagNav1');
rep('<a href="#dcii-primitives">DCII Primitives</a>','<a href="#dcii-primitives" data-i18n="diagNav2">DCII Primitives</a>','diagNav2');
rep('<a href="#decision-lifecycle">Decision Lifecycle</a>','<a href="#decision-lifecycle" data-i18n="diagNav3">Decision Lifecycle</a>','diagNav3');
rep('<a href="#sovereign-patterns">Sovereign Patterns</a>','<a href="#sovereign-patterns" data-i18n="diagNav4">Sovereign Patterns</a>','diagNav4');
rep('<a href="#verticals-matrix">Industry Verticals</a>','<a href="#verticals-matrix" data-i18n="diagNav5">Industry Verticals</a>','diagNav5');
rep('<a href="#sgas-agents">SGAS Agents</a>','<a href="#sgas-agents" data-i18n="diagNav6">SGAS Agents</a>','diagNav6');
rep('<a href="#trust-chain">Trust Chain</a>','<a href="#trust-chain" data-i18n="diagNav7">Trust Chain</a>','diagNav7');
rep('<a href="#compliance-matrix">Compliance Matrix</a>','<a href="#compliance-matrix" data-i18n="diagNav8">Compliance Matrix</a>','diagNav8');

// Diagram 1: Tier Model
rep('<p class="diagram-section-label">Diagram 1 of 8</p>','<p class="diagram-section-label" data-i18n="diag1Label">Diagram 1 of 8</p>','diag1Label');
rep('<h2 class="diagram-section-title">The 12-Pillar Tier Model</h2>','<h2 class="diagram-section-title" data-i18n="diag1Title">The 12-Pillar Tier Model</h2>','diag1Title');
rep('<p class="diagram-section-desc">12 pillars across 3 tiers plus premium add-ons. Each tier builds on the one below it. Foundation is required; Enterprise extends; Strategic transforms.</p>','<p class="diagram-section-desc" data-i18n="diag1Desc">12 pillars across 3 tiers plus premium add-ons. Each tier builds on the one below it. Foundation is required; Enterprise extends; Strategic transforms.</p>','diag1Desc');
rep('<div class="tier-label">Tier 3 &mdash; Strategic</div>','<div class="tier-label" data-i18n="diag1T3Label">Tier 3 — Strategic</div>','diag1T3Label');
rep('<div class="tier-name">Nation-Scale Transformation</div>','<div class="tier-name" data-i18n="diag1T3Name">Nation-Scale Transformation</div>','diag1T3Name');
rep('<div class="tier-price">Custom Pricing / by engagement</div>','<div class="tier-price" data-i18n="diag1T3Price">Custom Pricing / by engagement</div>','diag1T3Price');
rep('<div class="tier-label">Tier 2 Premium Add-Ons</div>','<div class="tier-label" data-i18n="diag1TpLabel">Tier 2 Premium Add-Ons</div>','diag1TpLabel');
rep('<div class="tier-name">Advanced Modules</div>','<div class="tier-name" data-i18n="diag1TpName">Advanced Modules</div>','diag1TpName');
rep('<div class="tier-price">Custom pricing per module</div>','<div class="tier-price" data-i18n="diag1TpPrice">Custom pricing per module</div>','diag1TpPrice');
rep('<div class="tier-label">Tier 2 &mdash; Enterprise</div>','<div class="tier-label" data-i18n="diag1T2Label">Tier 2 — Enterprise</div>','diag1T2Label');
rep('<div class="tier-name">Full Enterprise Governance</div>','<div class="tier-name" data-i18n="diag1T2Name">Full Enterprise Governance</div>','diag1T2Name');
rep('<div class="tier-price">Custom Pricing / annual license</div>','<div class="tier-price" data-i18n="diag1T2Price">Custom Pricing / annual license</div>','diag1T2Price');
rep('<div class="tier-label">Tier 1 &mdash; Foundation</div>','<div class="tier-label" data-i18n="diag1T1Label">Tier 1 — Foundation</div>','diag1T1Label');
rep('<div class="tier-name">Core Decision Intelligence</div>','<div class="tier-name" data-i18n="diag1T1Name">Core Decision Intelligence</div>','diag1T1Name');

// Diagram 2: DCII Primitives
rep('<p class="diagram-section-label">Diagram 2 of 8</p>','<p class="diagram-section-label" data-i18n="diag2Label">Diagram 2 of 8</p>','diag2Label');
rep('<h2 class="diagram-section-title">DCII &mdash; 9 Primitives</h2>','<h2 class="diagram-section-title" data-i18n="diag2Title">DCII — 9 Primitives</h2>','diag2Title');
rep('<p class="diagram-section-desc">The Decision Crisis Immunization Infrastructure scores institutional resilience across 9 measurable primitives. Together they produce the Institutional Immune System Score (IISS).</p>','<p class="diagram-section-desc" data-i18n="diag2Desc">The Decision Crisis Immunization Infrastructure scores institutional resilience across 9 measurable primitives. Together they produce the Institutional Immune System Score (IISS).</p>','diag2Desc');
rep('<div class="dcii-name">Ledger</div>','<div class="dcii-name" data-i18n="diag2P1Name">Ledger</div>','diag2P1Name');
rep('<div class="dcii-desc">Immutable audit trail with blockchain-style hash chaining</div>','<div class="dcii-desc" data-i18n="diag2P1Desc">Immutable audit trail with blockchain-style hash chaining</div>','diag2P1Desc');
rep('<div class="dcii-name">Notary</div>','<div class="dcii-name" data-i18n="diag2P2Name">Notary</div>','diag2P2Name');
rep('<div class="dcii-desc">Cryptographic signing with customer-owned keys</div>','<div class="dcii-desc" data-i18n="diag2P2Desc">Cryptographic signing with customer-owned keys</div>','diag2P2Desc');
rep('<div class="dcii-name">Vault</div>','<div class="dcii-name" data-i18n="diag2P3Name">Vault</div>','diag2P3Name');
rep('<div class="dcii-desc">Unified evidence storage for decision packets</div>','<div class="dcii-desc" data-i18n="diag2P3Desc">Unified evidence storage for decision packets</div>','diag2P3Desc');
rep('<div class="dcii-name">Provenance</div>','<div class="dcii-name" data-i18n="diag2P4Name">Provenance</div>','diag2P4Name');
rep('<div class="dcii-desc">Full decision lineage and court-admissible export</div>','<div class="dcii-desc" data-i18n="diag2P4Desc">Full decision lineage and court-admissible export</div>','diag2P4Desc');
rep('<div class="dcii-name">Timestamp</div>','<div class="dcii-name" data-i18n="diag2P5Name">Timestamp</div>','diag2P5Name');
rep('<div class="dcii-desc">RFC 3161 external timestamp authority with blockchain anchoring</div>','<div class="dcii-desc" data-i18n="diag2P5Desc">RFC 3161 external timestamp authority with blockchain anchoring</div>','diag2P5Desc');
rep('<div class="dcii-name">MediaAuth</div>','<div class="dcii-name" data-i18n="diag2P6Name">MediaAuth</div>','diag2P6Name');
rep('<div class="dcii-desc">C2PA synthetic media authentication and deepfake detection</div>','<div class="dcii-desc" data-i18n="diag2P6Desc">C2PA synthetic media authentication and deepfake detection</div>','diag2P6Desc');
rep('<div class="dcii-name">Jurisdiction</div>','<div class="dcii-name" data-i18n="diag2P7Name">Jurisdiction</div>','diag2P7Name');
rep('<div class="dcii-desc">Cross-jurisdiction compliance conflict detection (GDPR vs PIPL)</div>','<div class="dcii-desc" data-i18n="diag2P7Desc">Cross-jurisdiction compliance conflict detection (GDPR vs PIPL)</div>','diag2P7Desc');
rep('<div class="dcii-name">Similarity</div>','<div class="dcii-name" data-i18n="diag2P8Name">Similarity</div>','diag2P8Name');
rep('<div class="dcii-desc">Decision pattern matching with TF-IDF semantic search</div>','<div class="dcii-desc" data-i18n="diag2P8Desc">Decision pattern matching with TF-IDF semantic search</div>','diag2P8Desc');
rep('<div class="dcii-name">Bias Mitigation</div>','<div class="dcii-name" data-i18n="diag2P9Name">Bias Mitigation</div>','diag2P9Name');
rep('<div class="dcii-desc">Cognitive bias detection and decision debiasing engine</div>','<div class="dcii-desc" data-i18n="diag2P9Desc">Cognitive bias detection and decision debiasing engine</div>','diag2P9Desc');
rep('<div class="iiss-label">Composite Output</div>','<div class="iiss-label" data-i18n="diag2IissLabel">Composite Output</div>','diag2IissLabel');
rep('<div class="iiss-score">IISS&trade; Score</div>','<div class="iiss-score" data-i18n="diag2IissScore">IISS™ Score</div>','diag2IissScore');
rep('<div class="iiss-scale">0&ndash;1000 scale &middot; 5-band certification</div>','<div class="iiss-scale" data-i18n="diag2IissScale">0–1000 scale · 5-band certification</div>','diag2IissScale');

// Diagram 3: Decision Lifecycle
rep('<p class="diagram-section-label">Diagram 3 of 8</p>','<p class="diagram-section-label" data-i18n="diag3Label">Diagram 3 of 8</p>','diag3Label');
rep('<h2 class="diagram-section-title">Decision Lifecycle</h2>','<h2 class="diagram-section-title" data-i18n="diag3Title">Decision Lifecycle</h2>','diag3Title');
rep('<p class="diagram-section-desc">End-to-end flow from question to auditable, court-admissible decision record.</p>','<p class="diagram-section-desc" data-i18n="diag3Desc">End-to-end flow from question to auditable, court-admissible decision record.</p>','diag3Desc');
rep('<div class="step-title">Ingest &amp; Frame</div>','<div class="step-title" data-i18n="diag3Step1Title">Ingest &amp; Frame</div>','diag3Step1Title');
rep('<div class="step-title">Council Deliberation</div>','<div class="step-title" data-i18n="diag3Step2Title">Council Deliberation</div>','diag3Step2Title');
rep('<div class="step-title">Governance &amp; Ethics Check</div>','<div class="step-title" data-i18n="diag3Step3Title">Governance &amp; Ethics Check</div>','diag3Step3Title');
rep('<div class="step-title">Stress Test &amp; Red Team</div>','<div class="step-title" data-i18n="diag3Step4Title">Stress Test &amp; Red Team</div>','diag3Step4Title');
rep('<div class="step-title">Synthesis &amp; Recommendation</div>','<div class="step-title" data-i18n="diag3Step5Title">Synthesis &amp; Recommendation</div>','diag3Step5Title');
rep('<div class="step-title">Evidence &amp; Immutable Record</div>','<div class="step-title" data-i18n="diag3Step6Title">Evidence &amp; Immutable Record</div>','diag3Step6Title');
rep('<div class="step-title">Outcome Tracking &amp; Learning</div>','<div class="step-title" data-i18n="diag3Step7Title">Outcome Tracking &amp; Learning</div>','diag3Step7Title');

// Diagram 4: Sovereign Patterns
rep('<p class="diagram-section-label">Diagram 4 of 8</p>','<p class="diagram-section-label" data-i18n="diag4Label">Diagram 4 of 8</p>','diag4Label');
rep('<h2 class="diagram-section-title">Sovereign Architecture Patterns</h2>','<h2 class="diagram-section-title" data-i18n="diag4Title">Sovereign Architecture Patterns</h2>','diag4Title');
rep('<p class="diagram-section-desc">21 architectural patterns in the catalog. Every pattern runs on your infrastructure. No cloud dependency. No data exfiltration. Full sovereign control. 11 patterns are production-ready; remaining patterns are in active development.</p>','<p class="diagram-section-desc" data-i18n="diag4Desc">21 architectural patterns in the catalog. Every pattern runs on your infrastructure. No cloud dependency. No data exfiltration. Full sovereign control. 11 patterns are production-ready; remaining patterns are in active development.</p>','diag4Desc');
rep('<p class="sovereign-category">Isolation &amp; Air-Gap</p>','<p class="sovereign-category" data-i18n="diag4Cat1">Isolation &amp; Air-Gap</p>','diag4Cat1');
rep('<p class="sovereign-category">Cryptography &amp; Trust</p>','<p class="sovereign-category" data-i18n="diag4Cat2">Cryptography &amp; Trust</p>','diag4Cat2');
rep('<p class="sovereign-category">Resilience &amp; Integrity</p>','<p class="sovereign-category" data-i18n="diag4Cat3">Resilience &amp; Integrity</p>','diag4Cat3');
rep('<p class="sovereign-category">Network &amp; Federation</p>','<p class="sovereign-category" data-i18n="diag4Cat4">Network &amp; Federation</p>','diag4Cat4');
rep('<p class="sovereign-category">AI &amp; Inference</p>','<p class="sovereign-category" data-i18n="diag4Cat5">AI &amp; Inference</p>','diag4Cat5');

fs.writeFileSync(FILE, html, 'utf8');
console.log('Diagrams P1 done — ' + count + ' replacements.');
console.log('data-i18n count so far: ' + (html.match(/data-i18n/g)||[]).length);
