/**
 * wire-hospitality.js: Wire data-i18n into hospitality.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'hospitality.html');
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

// Hero
rep('<h1>AI-Governed <span>Hotel Investment</span> & Revenue Decisions</h1>','<h1 data-i18n="hospHeroTitle">AI-Governed <span>Hotel Investment</span> & Revenue Decisions</h1>','hospHeroTitle');
rep('<p>Multi-agent deliberation for acquisition analysis, RevPAR optimization, brand compliance audits, and portfolio governance — with full audit provenance on every decision.</p>','<p data-i18n="hospHeroDesc">Multi-agent deliberation for acquisition analysis, RevPAR optimization, brand compliance audits, and portfolio governance — with full audit provenance on every decision.</p>','hospHeroDesc');

// Stats
rep('<div class="v-stat-label">Specialist Agents</div>','<div class="v-stat-label" data-i18n="hospStat1Label">Specialist Agents</div>','hospStat1Label');
rep('<div class="v-stat-label">On-Premises</div>','<div class="v-stat-label" data-i18n="hospStat2Label">On-Premises</div>','hospStat2Label');
rep('<div class="v-stat-label">Decision Types</div>','<div class="v-stat-label" data-i18n="hospStat3Label">Decision Types</div>','hospStat3Label');
rep('<div class="v-stat-label">Compliance Checks</div>','<div class="v-stat-label" data-i18n="hospStat4Label">Compliance Checks</div>','hospStat4Label');

// Section headings
rep('<h2>What Datacendia Does for Hospitality</h2>','<h2 data-i18n="hospS1Title">What Datacendia Does for Hospitality</h2>','hospS1Title');
rep('<h2>Hospitality-Specific Agents</h2>','<h2 data-i18n="hospS2Title">Hospitality-Specific Agents</h2>','hospS2Title');
rep('<h2>Compliance Frameworks</h2>','<h2 data-i18n="hospS3Title">Compliance Frameworks</h2>','hospS3Title');

// Cards
rep('<h3>Acquisition Governance</h3>','<h3 data-i18n="hospCard1Title">Acquisition Governance</h3>','hospCard1Title');
rep('<h3>RevPAR Optimization</h3>','<h3 data-i18n="hospCard2Title">RevPAR Optimization</h3>','hospCard2Title');
rep('<h3>Brand Compliance Audits</h3>','<h3 data-i18n="hospCard3Title">Brand Compliance Audits</h3>','hospCard3Title');
rep('<h3>Portfolio Risk Governance</h3>','<h3 data-i18n="hospCard4Title">Portfolio Risk Governance</h3>','hospCard4Title');
rep('<h3>On-Premises Deployment</h3>','<h3 data-i18n="hospCard5Title">On-Premises Deployment</h3>','hospCard5Title');
rep('<h3>Audit Provenance</h3>','<h3 data-i18n="hospCard6Title">Audit Provenance</h3>','hospCard6Title');

// Agents
rep('<h3>Revenue Strategist</h3>','<h3 data-i18n="hospAgent1">Revenue Strategist</h3>','hospAgent1');
rep('<h3>Financial Analyst</h3>','<h3 data-i18n="hospAgent2">Financial Analyst</h3>','hospAgent2');
rep('<h3>Brand Compliance Officer</h3>','<h3 data-i18n="hospAgent3">Brand Compliance Officer</h3>','hospAgent3');
rep('<h3>Risk & Operations</h3>','<h3 data-i18n="hospAgent4">Risk & Operations</h3>','hospAgent4');
rep('<h3>Market Intelligence</h3>','<h3 data-i18n="hospAgent5">Market Intelligence</h3>','hospAgent5');
rep('<h3>ESG & Sustainability</h3>','<h3 data-i18n="hospAgent6">ESG & Sustainability</h3>','hospAgent6');

// CTA
rep('<h3>See Hospitality Governance in Action</h3>','<h3 data-i18n="hospCtaTitle">See Hospitality Governance in Action</h3>','hospCtaTitle');

fs.writeFileSync(FILE, html, 'utf8');
console.log('hospitality.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
