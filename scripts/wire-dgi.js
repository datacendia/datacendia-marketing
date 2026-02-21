/**
 * wire-dgi.js: Wire data-i18n into dgi.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'dgi.html');
let html = fs.readFileSync(FILE, 'utf8');
let count = 0;
function rep(o, n, k) {
  if (!html.includes(o)) { console.log('NOT FOUND: ' + k); return; }
  html = html.replace(o, n); count++;
}

// Simple nav links
rep('<a href="index.html">Home</a>','<a href="index.html" data-i18n="navHome">Home</a>','navHome');
rep('<a href="dcii.html">DCII</a>','<a href="dcii.html" data-i18n="navDciiShort">DCII</a>','navDciiShort');
rep('<a href="dgi.html" class="active">DGI</a>','<a href="dgi.html" class="active" data-i18n="navDgiShort">DGI</a>','navDgiShort');
rep('<a href="demos.html">Demos</a>','<a href="demos.html" data-i18n="navDemosShort">Demos</a>','navDemosShort');
rep('<a href="pricing.html">Pricing</a>','<a href="pricing.html" data-i18n="navPricingShort">Pricing</a>','navPricingShort');
rep('<a href="team.html">Team</a>','<a href="team.html" data-i18n="navTeamShort">Team</a>','navTeamShort');

// Page header
rep('<div class="framework-badge">OPEN FRAMEWORK v1.0</div>','<div class="framework-badge" data-i18n="dgiBadge">OPEN FRAMEWORK v1.0</div>','dgiBadge');
rep('<h1 class="page-title">Decision Governance Infrastructure</h1>','<h1 class="page-title" data-i18n="dgiPageTitle">Decision Governance Infrastructure</h1>','dgiPageTitle');
rep('<p class="page-subtitle">\n        A vendor-neutral framework for institutional decision accountability\n      </p>','<p class="page-subtitle" data-i18n="dgiPageSubtitle">A vendor-neutral framework for institutional decision accountability</p>','dgiPageSubtitle');

// Citation box
rep('<div class="citation-title">How to Cite This Framework</div>','<div class="citation-title" data-i18n="dgiCitationTitle">How to Cite This Framework</div>','dgiCitationTitle');

// Who Should Use DGI
rep('<h2 class="section-heading">Who Should Use DGI</h2>','<h2 class="section-heading" data-i18n="dgiWhoTitle">Who Should Use DGI</h2>','dgiWhoTitle');
rep('<div class="use-case-title">Standards Bodies</div>','<div class="use-case-title" data-i18n="dgiUC1Title">Standards Bodies</div>','dgiUC1Title');
rep('<div class="use-case-desc">Organizations evaluating governance frameworks for formal adoption (ISO/IEC, IEEE, NIST)</div>','<div class="use-case-desc" data-i18n="dgiUC1Desc">Organizations evaluating governance frameworks for formal adoption (ISO/IEC, IEEE, NIST)</div>','dgiUC1Desc');
rep('<div class="use-case-title">System Architects</div>','<div class="use-case-title" data-i18n="dgiUC2Title">System Architects</div>','dgiUC2Title');
rep('<div class="use-case-desc">Teams building custom decision accountability systems with vendor-neutral primitives</div>','<div class="use-case-desc" data-i18n="dgiUC2Desc">Teams building custom decision accountability systems with vendor-neutral primitives</div>','dgiUC2Desc');
rep('<div class="use-case-title">Academic Researchers</div>','<div class="use-case-title" data-i18n="dgiUC3Title">Academic Researchers</div>','dgiUC3Title');
rep('<div class="use-case-desc">Scholars studying AI governance, institutional accountability, and decision provenance</div>','<div class="use-case-desc" data-i18n="dgiUC3Desc">Scholars studying AI governance, institutional accountability, and decision provenance</div>','dgiUC3Desc');
rep('<div class="use-case-title">Policy Makers</div>','<div class="use-case-title" data-i18n="dgiUC4Title">Policy Makers</div>','dgiUC4Title');
rep('<div class="use-case-desc">Regulators designing frameworks for decision transparency and institutional resilience</div>','<div class="use-case-desc" data-i18n="dgiUC4Desc">Regulators designing frameworks for decision transparency and institutional resilience</div>','dgiUC4Desc');

// Adoption Path
rep('<h2 class="section-heading">DGI Adoption Path</h2>','<h2 class="section-heading" data-i18n="dgiAdoptionTitle">DGI Adoption Path</h2>','dgiAdoptionTitle');
rep('<div class="adoption-step-title">Review Framework</div>','<div class="adoption-step-title" data-i18n="dgiStep1Title">Review Framework</div>','dgiStep1Title');
rep('<div class="adoption-step-desc">Study the five governance primitives and lifecycle model</div>','<div class="adoption-step-desc" data-i18n="dgiStep1Desc">Study the five governance primitives and lifecycle model</div>','dgiStep1Desc');
rep('<div class="adoption-step-title">Assess Maturity</div>','<div class="adoption-step-title" data-i18n="dgiStep2Title">Assess Maturity</div>','dgiStep2Title');
rep('<div class="adoption-step-desc">Evaluate current state using DGMI (Levels 1–5)</div>','<div class="adoption-step-desc" data-i18n="dgiStep2Desc">Evaluate current state using DGMI (Levels 1–5)</div>','dgiStep2Desc');
rep('<div class="adoption-step-title">Implement Primitives</div>','<div class="adoption-step-title" data-i18n="dgiStep3Title">Implement Primitives</div>','dgiStep3Title');
rep('<div class="adoption-step-desc">Build or integrate governance controls using your architecture</div>','<div class="adoption-step-desc" data-i18n="dgiStep3Desc">Build or integrate governance controls using your architecture</div>','dgiStep3Desc');
rep('<div class="adoption-step-title">Consider DCII</div>','<div class="adoption-step-title" data-i18n="dgiStep4Title">Consider DCII</div>','dgiStep4Title');
rep('<div class="adoption-step-desc">Evaluate production-ready implementation for rapid deployment</div>','<div class="adoption-step-desc" data-i18n="dgiStep4Desc">Evaluate production-ready implementation for rapid deployment</div>','dgiStep4Desc');

// Framework Principles
rep('<h2 class="section-heading">Framework Principles</h2>','<h2 class="section-heading" data-i18n="dgiPrinciplesTitle">Framework Principles</h2>','dgiPrinciplesTitle');
rep('<div class="primitive-name">Decisions as Lifecycle Artifacts</div>','<div class="primitive-name" data-i18n="dgiPrinciple1Name">Decisions as Lifecycle Artifacts</div>','dgiPrinciple1Name');
rep('<div class="primitive-desc">Structured, inspectable events with traceable phases</div>','<div class="primitive-desc" data-i18n="dgiPrinciple1Desc">Structured, inspectable events with traceable phases</div>','dgiPrinciple1Desc');
rep('<div class="primitive-name">Procedural Integrity</div>','<div class="primitive-name" data-i18n="dgiPrinciple2Name">Procedural Integrity</div>','dgiPrinciple2Name');
rep('<div class="primitive-desc">Demonstrable governance pathways</div>','<div class="primitive-desc" data-i18n="dgiPrinciple2Desc">Demonstrable governance pathways</div>','dgiPrinciple2Desc');
rep('<div class="primitive-name">Evidence Survivability</div>','<div class="primitive-name" data-i18n="dgiPrinciple3Name">Evidence Survivability</div>','dgiPrinciple3Name');
rep('<div class="primitive-desc">Artifacts remain verifiable over time</div>','<div class="primitive-desc" data-i18n="dgiPrinciple3Desc">Artifacts remain verifiable over time</div>','dgiPrinciple3Desc');
rep('<div class="primitive-name">Institutional Continuity</div>','<div class="primitive-name" data-i18n="dgiPrinciple4Name">Institutional Continuity</div>','dgiPrinciple4Name');
rep('<div class="primitive-desc">Knowledge persists beyond personnel change</div>','<div class="primitive-desc" data-i18n="dgiPrinciple4Desc">Knowledge persists beyond personnel change</div>','dgiPrinciple4Desc');

// Five Governance Primitives
rep('<h2 class="section-heading">Five Governance Primitives</h2>','<h2 class="section-heading" data-i18n="dgiPrimitivesTitle">Five Governance Primitives</h2>','dgiPrimitivesTitle');
rep('<div class="primitive-name">Context Capture</div>','<div class="primitive-name" data-i18n="dgiPrimAName">Context Capture</div>','dgiPrimAName');
rep('<div class="primitive-desc">Preserve discovery-time knowledge, triggers, and inputs with source attribution and timestamped metadata.</div>','<div class="primitive-desc" data-i18n="dgiPrimADesc">Preserve discovery-time knowledge, triggers, and inputs with source attribution and timestamped metadata.</div>','dgiPrimADesc');
rep('<div class="primitive-name">Deliberation Traceability</div>','<div class="primitive-name" data-i18n="dgiPrimBName">Deliberation Traceability</div>','dgiPrimBName');
rep('<div class="primitive-desc">Record reasoning pathways, alternatives considered, and contributor attribution for reproducible decision sequences.</div>','<div class="primitive-desc" data-i18n="dgiPrimBDesc">Record reasoning pathways, alternatives considered, and contributor attribution for reproducible decision sequences.</div>','dgiPrimBDesc');
rep('<div class="primitive-name">Override Accountability</div>','<div class="primitive-name" data-i18n="dgiPrimCName">Override Accountability</div>','dgiPrimCName');
rep('<div class="primitive-desc">Document deviations from established processes with explicit justification and authorization tracking.</div>','<div class="primitive-desc" data-i18n="dgiPrimCDesc">Document deviations from established processes with explicit justification and authorization tracking.</div>','dgiPrimCDesc');
rep('<div class="primitive-name">Evidence Integrity</div>','<div class="primitive-name" data-i18n="dgiPrimDName">Evidence Integrity</div>','dgiPrimDName');
rep('<div class="primitive-desc">Maintain tamper-evident storage and integrity verification procedures for independent review.</div>','<div class="primitive-desc" data-i18n="dgiPrimDDesc">Maintain tamper-evident storage and integrity verification procedures for independent review.</div>','dgiPrimDDesc');
rep('<div class="primitive-name">Drift Detection</div>','<div class="primitive-name" data-i18n="dgiPrimEName">Drift Detection</div>','dgiPrimEName');
rep('<div class="primitive-desc">Identify divergence between policy intent and operational behavior through pattern analysis.</div>','<div class="primitive-desc" data-i18n="dgiPrimEDesc">Identify divergence between policy intent and operational behavior through pattern analysis.</div>','dgiPrimEDesc');

// Decision Lifecycle Model
rep('<h2 class="section-heading">Decision Lifecycle Model</h2>','<h2 class="section-heading" data-i18n="dgiLifecycleTitle">Decision Lifecycle Model</h2>','dgiLifecycleTitle');
rep('<div class="lifecycle-step">Initiation</div>','<div class="lifecycle-step" data-i18n="dgiLifeStep1">Initiation</div>','dgiLifeStep1');
rep('<div class="lifecycle-step">Deliberation</div>','<div class="lifecycle-step" data-i18n="dgiLifeStep2">Deliberation</div>','dgiLifeStep2');
rep('<div class="lifecycle-step">Resolution</div>','<div class="lifecycle-step" data-i18n="dgiLifeStep3">Resolution</div>','dgiLifeStep3');
rep('<div class="lifecycle-step">Preservation</div>','<div class="lifecycle-step" data-i18n="dgiLifeStep4">Preservation</div>','dgiLifeStep4');
rep('<div class="lifecycle-step">Reconstruction</div>','<div class="lifecycle-step" data-i18n="dgiLifeStep5">Reconstruction</div>','dgiLifeStep5');

// DGMI
rep('<h2 class="section-heading">Decision Governance Maturity Index (DGMI)</h2>','<h2 class="section-heading" data-i18n="dgiDgmiTitle">Decision Governance Maturity Index (DGMI)</h2>','dgiDgmiTitle');
rep('<div class="maturity-name">Informal Capture</div>','<div class="maturity-name" data-i18n="dgiDgmi1Name">Informal Capture</div>','dgiDgmi1Name');
rep('<div class="maturity-desc">Ad hoc documentation with inconsistent artifact preservation</div>','<div class="maturity-desc" data-i18n="dgiDgmi1Desc">Ad hoc documentation with inconsistent artifact preservation</div>','dgiDgmi1Desc');
rep('<div class="maturity-name">Structured Recording</div>','<div class="maturity-name" data-i18n="dgiDgmi2Name">Structured Recording</div>','dgiDgmi2Name');
rep('<div class="maturity-desc">Consistent artifact capture with defined formats</div>','<div class="maturity-desc" data-i18n="dgiDgmi2Desc">Consistent artifact capture with defined formats</div>','dgiDgmi2Desc');
rep('<div class="maturity-name">Procedural Traceability</div>','<div class="maturity-name" data-i18n="dgiDgmi3Name">Procedural Traceability</div>','dgiDgmi3Name');
rep('<div class="maturity-desc">Full lifecycle preservation with governance pathway documentation</div>','<div class="maturity-desc" data-i18n="dgiDgmi3Desc">Full lifecycle preservation with governance pathway documentation</div>','dgiDgmi3Desc');
rep('<div class="maturity-name">Integrity Assurance</div>','<div class="maturity-name" data-i18n="dgiDgmi4Name">Integrity Assurance</div>','dgiDgmi4Name');
rep('<div class="maturity-desc">Tamper-evident verification and cryptographic integrity controls</div>','<div class="maturity-desc" data-i18n="dgiDgmi4Desc">Tamper-evident verification and cryptographic integrity controls</div>','dgiDgmi4Desc');
rep('<div class="maturity-name">Governance Optimization</div>','<div class="maturity-name" data-i18n="dgiDgmi5Name">Governance Optimization</div>','dgiDgmi5Name');
rep('<div class="maturity-desc">Continuous monitoring, drift analytics, and proactive governance improvement</div>','<div class="maturity-desc" data-i18n="dgiDgmi5Desc">Continuous monitoring, drift analytics, and proactive governance improvement</div>','dgiDgmi5Desc');

// CTA
rep('<a href="DGI-Framework-v1.0.pdf" download class="btn btn-primary">Download Framework PDF</a>','<a href="DGI-Framework-v1.0.pdf" download class="btn btn-primary" data-i18n="dgiCtaDownload">Download Framework PDF</a>','dgiCtaDownload');
rep('<a href="dcii.html" class="btn btn-secondary">View DCII Implementation</a>','<a href="dcii.html" class="btn btn-secondary" data-i18n="dgiCtaDcii">View DCII Implementation</a>','dgiCtaDcii');
rep('<a href="dgi-dcii-comparison.html" class="btn btn-secondary">Compare DGI vs DCII</a>','<a href="dgi-dcii-comparison.html" class="btn btn-secondary" data-i18n="dgiCtaCompare">Compare DGI vs DCII</a>','dgiCtaCompare');

fs.writeFileSync(FILE, html, 'utf8');
console.log('dgi.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
