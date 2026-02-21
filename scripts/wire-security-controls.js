/**
 * wire-security-controls.js: Wire data-i18n into security-controls.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'security-controls.html');
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
rep('<a href="index.html" class="back-link">← Return to Datacendia</a>','<a href="index.html" class="back-link" data-i18n="secBackLink">← Return to Datacendia</a>','secBackLink');
rep('<h1 class="page-title">Datacendia Sovereign Architecture & Control Mapping</h1>','<h1 class="page-title" data-i18n="secPageTitle">Datacendia Sovereign Architecture & Control Mapping</h1>','secPageTitle');
rep('<p class="page-subtitle">Alignment with SOC 2 Type II (TSC 2017) and NIST 800-53</p>','<p class="page-subtitle" data-i18n="secPageSubtitle">Alignment with SOC 2 Type II (TSC 2017) and NIST 800-53</p>','secPageSubtitle');
rep('<span class="status-badge">Status: Architecture-Ready (Pre-Audit)</span>','<span class="status-badge" data-i18n="secStatusBadge">Status: Architecture-Ready (Pre-Audit)</span>','secStatusBadge');

// Intro box
rep('<p>This document provides detailed control mapping for enterprise security review. Formal SOC 2 Type II attestation is in progress (target Q2 2026).</p>','<p data-i18n="secIntroText">This document provides detailed control mapping for enterprise security review. Formal SOC 2 Type II attestation is in progress (target Q2 2026).</p>','secIntroText');

// Physics callout
rep('<h2>Why Sovereign Architecture Changes the Security Model</h2>','<h2 data-i18n="secPhysicsTitle">Why Sovereign Architecture Changes the Security Model</h2>','secPhysicsTitle');

// Roadmap section
rep('<h3>Formal Audit Roadmap</h3>','<h3 data-i18n="secRoadmapTitle">Formal Audit Roadmap</h3>','secRoadmapTitle');

// Section 1: Core Security Controls
rep('<div class="section-number">Section 1</div>','<div class="section-number" data-i18n="secS1Num">Section 1</div>','secS1Num');
rep('<h2 class="section-title">Core Security Controls</h2>','<h2 class="section-title" data-i18n="secS1Title">Core Security Controls</h2>','secS1Title');
rep('<p class="section-desc">SOC 2 - CC Series · Protecting the system against unauthorized access</p>','<p class="section-desc" data-i18n="secS1Desc">SOC 2 - CC Series · Protecting the system against unauthorized access</p>','secS1Desc');

// Table headers (Section 1 & 2 & 3 share same header text — use unique surrounding context)
rep('<th>Control ID</th>\n              <th>Requirement</th>\n              <th>Datacendia Sovereign Implementation</th>','<th data-i18n="secThControlId">Control ID</th>\n              <th data-i18n="secThRequirement">Requirement</th>\n              <th data-i18n="secThImpl">Datacendia Sovereign Implementation</th>','secThControlId');

// CC6.1
rep('<div class="control-req">Logical Access Security</div>','<div class="control-req" data-i18n="secCC61Req">Logical Access Security</div>','secCC61Req');
rep('<div class="control-req-desc">Restrict access to authorized users only.</div>','<div class="control-req-desc" data-i18n="secCC61ReqDesc">Restrict access to authorized users only.</div>','secCC61ReqDesc');
// CC6.7
rep('<div class="control-req">Data Transmission</div>','<div class="control-req" data-i18n="secCC67Req">Data Transmission</div>','secCC67Req');
rep('<div class="control-req-desc">Protect data during transmission.</div>','<div class="control-req-desc" data-i18n="secCC67ReqDesc">Protect data during transmission.</div>','secCC67ReqDesc');
// CC7.1
rep('<div class="control-req">Detection of Anomalies</div>','<div class="control-req" data-i18n="secCC71Req">Detection of Anomalies</div>','secCC71Req');
rep('<div class="control-req-desc">Monitor for malicious activity.</div>','<div class="control-req-desc" data-i18n="secCC71ReqDesc">Monitor for malicious activity.</div>','secCC71ReqDesc');
// CC8.1
rep('<div class="control-req">Change Management</div>','<div class="control-req" data-i18n="secCC81Req">Change Management</div>','secCC81Req');
rep('<div class="control-req-desc">Authorize changes to software/data.</div>','<div class="control-req-desc" data-i18n="secCC81ReqDesc">Authorize changes to software/data.</div>','secCC81ReqDesc');

// Section 2: Confidentiality
rep('<div class="section-number">Section 2</div>','<div class="section-number" data-i18n="secS2Num">Section 2</div>','secS2Num');
rep('<h2 class="section-title">Confidentiality Controls</h2>','<h2 class="section-title" data-i18n="secS2Title">Confidentiality Controls</h2>','secS2Title');
rep('<p class="section-desc">SOC 2 - C Series · How do you keep secrets? (Critical for Banks/Defense)</p>','<p class="section-desc" data-i18n="secS2Desc">SOC 2 - C Series · How do you keep secrets? (Critical for Banks/Defense)</p>','secS2Desc');
rep('<div class="control-req">Confidentiality of Data</div>','<div class="control-req" data-i18n="secC11Req">Confidentiality of Data</div>','secC11Req');
rep('<div class="control-req-desc">Identify and protect sensitive data.</div>','<div class="control-req-desc" data-i18n="secC11ReqDesc">Identify and protect sensitive data.</div>','secC11ReqDesc');
rep('<div class="control-req">Disposal of Data</div>','<div class="control-req" data-i18n="secC12Req">Disposal of Data</div>','secC12Req');
rep('<div class="control-req-desc">Securely destroy data when no longer needed.</div>','<div class="control-req-desc" data-i18n="secC12ReqDesc">Securely destroy data when no longer needed.</div>','secC12ReqDesc');

// Section 3: Processing Integrity
rep('<div class="section-number">Section 3</div>','<div class="section-number" data-i18n="secS3Num">Section 3</div>','secS3Num');
rep('<h2 class="section-title">Processing Integrity Controls</h2>','<h2 class="section-title" data-i18n="secS3Title">Processing Integrity Controls</h2>','secS3Title');
rep('<p class="section-desc">SOC 2 - PI Series · Proving your AI isn\'t just making things up (Critical for Decision Intelligence)</p>','<p class="section-desc" data-i18n="secS3Desc">SOC 2 - PI Series · Proving your AI isn\'t just making things up (Critical for Decision Intelligence)</p>','secS3Desc');
rep('<div class="control-req">Completeness & Accuracy</div>','<div class="control-req" data-i18n="secPI11Req">Completeness & Accuracy</div>','secPI11Req');
rep('<div class="control-req-desc">Ensure processing is valid and complete.</div>','<div class="control-req-desc" data-i18n="secPI11ReqDesc">Ensure processing is valid and complete.</div>','secPI11ReqDesc');
rep('<div class="control-req">Error Handling</div>','<div class="control-req" data-i18n="secPI12Req">Error Handling</div>','secPI12Req');
rep('<div class="control-req-desc">Detect and manage processing errors.</div>','<div class="control-req-desc" data-i18n="secPI12ReqDesc">Detect and manage processing errors.</div>','secPI12ReqDesc');

// Section 4: NIST
rep('<div class="section-number">Section 4</div>','<div class="section-number" data-i18n="secS4Num">Section 4</div>','secS4Num');
rep('<h2 class="section-title">NIST 800-53 Mapping</h2>','<h2 class="section-title" data-i18n="secS4Title">NIST 800-53 Mapping</h2>','secS4Title');
rep('<p class="section-desc">For Defense & Government Clients</p>','<p class="section-desc" data-i18n="secS4Desc">For Defense & Government Clients</p>','secS4Desc');
rep('<div class="control-req">Access Enforcement</div>','<div class="control-req" data-i18n="secAC3Req">Access Enforcement</div>','secAC3Req');
rep('<div class="control-req">Content of Audit Records</div>','<div class="control-req" data-i18n="secAU3Req">Content of Audit Records</div>','secAU3Req');
rep('<div class="control-req">Boundary Protection</div>','<div class="control-req" data-i18n="secSC7Req">Boundary Protection</div>','secSC7Req');

// Shared Responsibility
rep('<h2>Shared Responsibility Model</h2>','<h2 data-i18n="secSharedTitle">Shared Responsibility Model</h2>','secSharedTitle');
rep('<h3>Datacendia Responsibility</h3>','<h3 data-i18n="secSharedDC">Datacendia Responsibility</h3>','secSharedDC');
rep('<h3>Client Responsibility</h3>','<h3 data-i18n="secSharedClient">Client Responsibility</h3>','secSharedClient');

// Warranty section
rep('<h2>Contractual No-Access Warranty</h2>','<h2 data-i18n="secWarrantyTitle">Contractual No-Access Warranty</h2>','secWarrantyTitle');

// Version footer
rep('<p>Datacendia_Security_Control_Map_v1.0 · January 2026</p>','<p data-i18n="secFooterVersion">Datacendia_Security_Control_Map_v1.0 · January 2026</p>','secFooterVersion');

fs.writeFileSync(FILE, html, 'utf8');
console.log('security-controls.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
