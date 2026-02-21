/**
 * wire-dcii-p1.js: Nav + page header + intro + IISS bands + Service 1 (IISS) + Service 2 (MediaAuth)
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'dcii.html');
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

// Back link + page header
rep('<a href="index.html" class="back-link">&larr; Return to Datacendia</a>','<a href="index.html" class="back-link" data-i18n="pcReturnLink">← Return to Datacendia</a>','pcReturnLink');
rep('<p style="font-size:0.75rem; color:var(--color-text-dim); letter-spacing:0.12em; text-transform:uppercase; margin-bottom:16px;">Datacendia is Decision Crisis Immunization Infrastructure</p>','<p style="font-size:0.75rem; color:var(--color-text-dim); letter-spacing:0.12em; text-transform:uppercase; margin-bottom:16px;" data-i18n="dciiPageLabel">Datacendia is Decision Crisis Immunization Infrastructure</p>','dciiPageLabel');
rep('<h1 class="page-title">Crisis Immunization</h1>','<h1 class="page-title" data-i18n="dciiPageTitle">Crisis Immunization</h1>','dciiPageTitle');
rep('<p class="page-subtitle">The 9 primitives that prevent institutional failure. Not reactive compliance. Proactive immunization.</p>','<p class="page-subtitle" data-i18n="dciiPageSubtitle">The 9 primitives that prevent institutional failure. Not reactive compliance. Proactive immunization.</p>','dciiPageSubtitle');

// Intro
rep('<a href="DCII-Framework-White-Paper-2026-02-19.pdf" download style="display:inline-block; padding:10px 24px; font-size:0.8rem; font-weight:500; letter-spacing:0.05em; color:var(--color-gold); border:1px solid var(--color-gold); border-radius:4px; text-decoration:none; transition:all 0.2s;">Download DCII Framework White Paper v2.1 (PDF) &darr;</a>','<a href="DCII-Framework-White-Paper-2026-02-19.pdf" download style="display:inline-block; padding:10px 24px; font-size:0.8rem; font-weight:500; letter-spacing:0.05em; color:var(--color-gold); border:1px solid var(--color-gold); border-radius:4px; text-decoration:none; transition:all 0.2s;" data-i18n="dciiDownloadBtn">Download DCII Framework White Paper v2.1 (PDF) ↓</a>','dciiDownloadBtn');

// IISS score bands
rep('<span class="band-name">Critical</span>','<span class="band-name" data-i18n="iissBandCritical">Critical</span>','iissBandCritical');
rep('<span class="band-name">Vulnerable</span>','<span class="band-name" data-i18n="iissBandVulnerable">Vulnerable</span>','iissBandVulnerable');
rep('<span class="band-name">Developing</span>','<span class="band-name" data-i18n="iissBandDeveloping">Developing</span>','iissBandDeveloping');
rep('<span class="band-name">Resilient</span>','<span class="band-name" data-i18n="iissBandResilient">Resilient</span>','iissBandResilient');
rep('<span class="band-name">Exceptional</span>','<span class="band-name" data-i18n="iissBandExceptional">Exceptional</span>','iissBandExceptional');

// Service 1: IISS
rep('<p class="service-tagline">Institutional Immune System Score</p>','<p class="service-tagline" data-i18n="dciiS1Tagline">Institutional Immune System Score</p>','dciiS1Tagline');
rep('<div class="dimension-name">Discovery-Time Proof Coverage</div>','<div class="dimension-name" data-i18n="dciiD1Name">Discovery-Time Proof Coverage</div>','dciiD1Name');
rep('<div class="dimension-desc">Cryptographic timestamps proving when knowledge became actionable</div>','<div class="dimension-desc" data-i18n="dciiD1Desc">Cryptographic timestamps proving when knowledge became actionable</div>','dciiD1Desc');
rep('<div class="dimension-name">Deliberation Capture Completeness</div>','<div class="dimension-name" data-i18n="dciiD2Name">Deliberation Capture Completeness</div>','dciiD2Name');
rep('<div class="dimension-desc">Multi-agent, multi-perspective decision process recording</div>','<div class="dimension-desc" data-i18n="dciiD2Desc">Multi-agent, multi-perspective decision process recording</div>','dciiD2Desc');
rep('<div class="dimension-name">Override Accountability Tracking</div>','<div class="dimension-name" data-i18n="dciiD3Name">Override Accountability Tracking</div>','dciiD3Name');
rep('<div class="dimension-desc">Non-suppressible tracking of recommendation overrides</div>','<div class="dimension-desc" data-i18n="dciiD3Desc">Non-suppressible tracking of recommendation overrides</div>','dciiD3Desc');
rep('<div class="dimension-name">Continuity Memory Depth</div>','<div class="dimension-name" data-i18n="dciiD4Name">Continuity Memory Depth</div>','dciiD4Name');
rep('<div class="dimension-desc">Personnel-independent institutional knowledge preservation</div>','<div class="dimension-desc" data-i18n="dciiD4Desc">Personnel-independent institutional knowledge preservation</div>','dciiD4Desc');
rep('<div class="dimension-name">Drift Detection Effectiveness</div>','<div class="dimension-name" data-i18n="dciiD5Name">Drift Detection Effectiveness</div>','dciiD5Name');
rep('<div class="dimension-desc">Continuous compliance degradation monitoring</div>','<div class="dimension-desc" data-i18n="dciiD5Desc">Continuous compliance degradation monitoring</div>','dciiD5Desc');
rep('<div class="dimension-name">Cognitive Bias Mitigation</div>','<div class="dimension-name" data-i18n="dciiD6Name">Cognitive Bias Mitigation</div>','dciiD6Name');
rep('<div class="dimension-desc">Adversarial challenge of assumptions and rubber-stamp detection</div>','<div class="dimension-desc" data-i18n="dciiD6Desc">Adversarial challenge of assumptions and rubber-stamp detection</div>','dciiD6Desc');
rep('<div class="dimension-name">Quantum-Resistant Integrity</div>','<div class="dimension-name" data-i18n="dciiD7Name">Quantum-Resistant Integrity</div>','dciiD7Name');
rep('<div class="dimension-desc">Post-quantum cryptographic protection of evidence</div>','<div class="dimension-desc" data-i18n="dciiD7Desc">Post-quantum cryptographic protection of evidence</div>','dciiD7Desc');
rep('<div class="dimension-name">Synthetic Media Authentication</div>','<div class="dimension-name" data-i18n="dciiD8Name">Synthetic Media Authentication</div>','dciiD8Name');
rep('<div class="dimension-desc">Content provenance signing and deepfake detection</div>','<div class="dimension-desc" data-i18n="dciiD8Desc">Content provenance signing and deepfake detection</div>','dciiD8Desc');
rep('<div class="dimension-name">Cross-Jurisdiction Compliance</div>','<div class="dimension-name" data-i18n="dciiD9Name">Cross-Jurisdiction Compliance</div>','dciiD9Name');
rep('<div class="dimension-desc">Multi-jurisdiction conflict detection and resolution</div>','<div class="dimension-desc" data-i18n="dciiD9Desc">Multi-jurisdiction conflict detection and resolution</div>','dciiD9Desc');
rep('<div class="capability-name">Certification Bands</div>','<div class="capability-name" data-i18n="dciiS1Cap1Name">Certification Bands</div>','dciiS1Cap1Name');
rep('<div class="capability-desc">Bronze, Silver, Gold, Platinum — tiered certification based on IISS score thresholds.</div>','<div class="capability-desc" data-i18n="dciiS1Cap1Desc">Bronze, Silver, Gold, Platinum — tiered certification based on IISS score thresholds.</div>','dciiS1Cap1Desc');
rep('<div class="capability-name">Insurance Impact</div>','<div class="capability-name" data-i18n="dciiS1Cap2Name">Insurance Impact</div>','dciiS1Cap2Name');
rep('<div class="capability-desc">20–40% premium reduction for IISS &gt;800. Insurers can price against verifiable governance metrics.</div>','<div class="capability-desc" data-i18n="dciiS1Cap2Desc">20–40% premium reduction for IISS &gt;800. Insurers can price against verifiable governance metrics.</div>','dciiS1Cap2Desc');
rep('<div class="capability-name">Trend Analysis</div>','<div class="capability-name" data-i18n="dciiS1Cap3Name">Trend Analysis</div>','dciiS1Cap3Name');
rep('<div class="capability-desc">Track improving, stable, or declining trajectories per dimension over time.</div>','<div class="capability-desc" data-i18n="dciiS1Cap3Desc">Track improving, stable, or declining trajectories per dimension over time.</div>','dciiS1Cap3Desc');

// Service 2: MediaAuth
rep('<p class="service-tagline">Synthetic Media Authentication</p>','<p class="service-tagline" data-i18n="dciiS2Tagline">Synthetic Media Authentication</p>','dciiS2Tagline');
rep('<div class="capability-name">C2PA Provenance Signing</div>','<div class="capability-name" data-i18n="dciiS2Cap1Name">C2PA Provenance Signing</div>','dciiS2Cap1Name');
rep('<div class="capability-desc">Sign images, video, audio, and documents at creation time with Coalition for Content Provenance and Authenticity standards.</div>','<div class="capability-desc" data-i18n="dciiS2Cap1Desc">Sign images, video, audio, and documents at creation time with Coalition for Content Provenance and Authenticity standards.</div>','dciiS2Cap1Desc');
rep('<div class="capability-name">Chain of Custody</div>','<div class="capability-name" data-i18n="dciiS2Cap2Name">Chain of Custody</div>','dciiS2Cap2Name');
rep('<div class="capability-desc">Track every access, copy, edit, export, and transmission of digital evidence with cryptographic proof.</div>','<div class="capability-desc" data-i18n="dciiS2Cap2Desc">Track every access, copy, edit, export, and transmission of digital evidence with cryptographic proof.</div>','dciiS2Cap2Desc');
rep('<div class="capability-name">Deepfake Detection</div>','<div class="capability-name" data-i18n="dciiS2Cap3Name">Deepfake Detection</div>','dciiS2Cap3Name');
rep('<div class="capability-desc">AI-powered analysis for synthetic manipulation markers across pixel-level, audio-level, and metadata-level artifacts.</div>','<div class="capability-desc" data-i18n="dciiS2Cap3Desc">AI-powered analysis for synthetic manipulation markers across pixel-level, audio-level, and metadata-level artifacts.</div>','dciiS2Cap3Desc');
rep('<div class="capability-name">Hardware Attestation</div>','<div class="capability-name" data-i18n="dciiS2Cap4Name">Hardware Attestation</div>','dciiS2Cap4Name');
rep('<div class="capability-desc">TPM/HSM attestation for evidence capture devices — prove which physical device captured the evidence.</div>','<div class="capability-desc" data-i18n="dciiS2Cap4Desc">TPM/HSM attestation for evidence capture devices — prove which physical device captured the evidence.</div>','dciiS2Cap4Desc');

fs.writeFileSync(FILE, html, 'utf8');
console.log('DCII P1 done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
