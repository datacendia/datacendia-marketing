/**
 * wire-case-studies.js: Wire data-i18n into case-studies.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'case-studies.html');
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

// Tagline
rep('<p class="tagline-sub">Decision Crisis Immunization Infrastructure</p>','<p class="tagline-sub" data-i18n="taglineSub">Decision Crisis Immunization Infrastructure</p>','taglineSub');

// Page header
rep('<h1 class="page-title">Anonymized Pilot Case Studies</h1>','<h1 class="page-title" data-i18n="csPageTitle">Anonymized Pilot Case Studies</h1>','csPageTitle');
rep('<p class="page-subtitle">Real pilots. No inflated metrics. No AI accuracy claims. These anonymized case studies demonstrate what Datacendia actually does in production environments.</p>','<p class="page-subtitle" data-i18n="csPageSubtitle">Real pilots. No inflated metrics. No AI accuracy claims. These anonymized case studies demonstrate what Datacendia actually does in production environments.</p>','csPageSubtitle');

// Nav links
rep('<a href="#industrial">Industrial Manufacturing</a>','<a href="#industrial" data-i18n="csNav1">Industrial Manufacturing</a>','csNav1');
rep('<a href="#financial">Financial Services</a>','<a href="#financial" data-i18n="csNav2">Financial Services</a>','csNav2');
rep('<a href="#healthcare">Healthcare</a>','<a href="#healthcare" data-i18n="csNav3">Healthcare</a>','csNav3');
rep('<a href="#public-sector">Public-Sector Adjacent</a>','<a href="#public-sector" data-i18n="csNav4">Public-Sector Adjacent</a>','csNav4');

// Case study titles
rep('<h2 class="cs-title">Industrial Manufacturer Uses Datacendia to Preserve Decision Accountability Across Leadership Transition</h2>','<h2 class="cs-title" data-i18n="cs1Title">Industrial Manufacturer Uses Datacendia to Preserve Decision Accountability Across Leadership Transition</h2>','cs1Title');
rep('<h2 class="cs-title">Financial Services Firm Uses Datacendia to Defensibly Record Risk Decisions</h2>','<h2 class="cs-title" data-i18n="cs2Title">Financial Services Firm Uses Datacendia to Defensibly Record Risk Decisions</h2>','cs2Title');
rep('<h2 class="cs-title">Healthcare Organization Uses Datacendia to Govern Sensitive Operational Decisions</h2>','<h2 class="cs-title" data-i18n="cs3Title">Healthcare Organization Uses Datacendia to Govern Sensitive Operational Decisions</h2>','cs3Title');
rep('<h2 class="cs-title">Public-Sector Adjacent Organization Uses Datacendia to Preserve Institutional Memory</h2>','<h2 class="cs-title" data-i18n="cs4Title">Public-Sector Adjacent Organization Uses Datacendia to Preserve Institutional Memory</h2>','cs4Title');

// Profile labels (shared across all 4 case studies)
// These appear multiple times — wire each unique occurrence
// "Organization", "Region", "Duration", "Deployment" appear in all 4
// We use a loop approach for repeated identical strings
const profileLabels = [
  ['Organization', 'csProfileOrg'],
  ['Region', 'csProfileRegion'],
  ['Duration', 'csProfileDuration'],
  ['Deployment', 'csProfileDeployment'],
];
for (const [label, key] of profileLabels) {
  const tag = `<div class="cs-profile-label">${label}</div>`;
  const wired = `<div class="cs-profile-label" data-i18n="${key}">${label}</div>`;
  let idx = 0;
  while (html.includes(tag)) {
    html = html.replace(tag, wired);
    count++;
  }
}

// Shared section headings within case studies
const sharedH3s = [
  ['The Problem', 'csH3Problem'],
  ['The Datacendia Pilot', 'csH3Pilot'],
  ['What Changed', 'csH3WhatChanged'],
];
for (const [text, key] of sharedH3s) {
  const tag = `<h3>${text}</h3>`;
  const wired = `<h3 data-i18n="${key}">${text}</h3>`;
  while (html.includes(tag)) {
    html = html.replace(tag, wired);
    count++;
  }
}

// Unique h3s
rep('<h3>Why Existing Tools Failed</h3>','<h3 data-i18n="cs1H3Tools">Why Existing Tools Failed</h3>','cs1H3Tools');
rep('<h3>Why Traditional AI Was Rejected</h3>','<h3 data-i18n="cs3H3Rejected">Why Traditional AI Was Rejected</h3>','cs3H3Rejected');
rep('<h3>Why Existing Processes Failed</h3>','<h3 data-i18n="cs4H3Failed">Why Existing Processes Failed</h3>','cs4H3Failed');
rep('<h3>The Datacendia Evaluation</h3>','<h3 data-i18n="cs3H3Eval">The Datacendia Evaluation</h3>','cs3H3Eval');

// CTA
rep('<h3>See The Evidence Yourself</h3>','<h3 data-i18n="csCtaTitle">See The Evidence Yourself</h3>','csCtaTitle');
rep('<a href="briefing.html" class="cta-btn">Request Technical Briefing →</a>','<a href="briefing.html" class="cta-btn" data-i18n="csCtaBtn">Request Technical Briefing →</a>','csCtaBtn');

// Footer
rep('<p class="footer-outcome">Ready to own your AI decisions—and prove them to regulators?</p>','<p class="footer-outcome" data-i18n="footerOutcome">Ready to own your AI decisions—and prove them to regulators?</p>','footerOutcome');
rep('<a href="pilot.html" class="cta-button secondary">See Results in 90 Days</a>','<a href="pilot.html" class="cta-button secondary" data-i18n="footerCtaPilot">See Results in 90 Days</a>','footerCtaPilot');

fs.writeFileSync(FILE, html, 'utf8');
console.log('case-studies.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
