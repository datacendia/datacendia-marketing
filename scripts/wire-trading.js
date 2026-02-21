/**
 * wire-trading.js: Wire data-i18n into trading.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'trading.html');
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
rep('<h1>AI-Governed <span>Trading Desk</span> Risk & Compliance</h1>','<h1 data-i18n="tradingHeroTitle">AI-Governed <span>Trading Desk</span> Risk & Compliance</h1>','tradingHeroTitle');
rep('<p>Multi-agent deliberation for position sizing, VaR management, concentration limits, and regulatory compliance — every decision audit-ready before execution.</p>','<p data-i18n="tradingHeroDesc">Multi-agent deliberation for position sizing, VaR management, concentration limits, and regulatory compliance — every decision audit-ready before execution.</p>','tradingHeroDesc');

// Stats
rep('<div class="v-stat-label">Specialist Agents</div>','<div class="v-stat-label" data-i18n="tradingStat1Label">Specialist Agents</div>','tradingStat1Label');
rep('<div class="v-stat-label">On-Premises</div>','<div class="v-stat-label" data-i18n="tradingStat2Label">On-Premises</div>','tradingStat2Label');
rep('<div class="v-stat-label">VaR Checks</div>','<div class="v-stat-label" data-i18n="tradingStat3Label">VaR Checks</div>','tradingStat3Label');
rep('<div class="v-stat-label">Compliance Rules</div>','<div class="v-stat-label" data-i18n="tradingStat4Label">Compliance Rules</div>','tradingStat4Label');

// Section headings
rep('<h2>What Datacendia Does for Trading</h2>','<h2 data-i18n="tradingS1Title">What Datacendia Does for Trading</h2>','tradingS1Title');
rep('<h2>Trading-Specific Agents</h2>','<h2 data-i18n="tradingS2Title">Trading-Specific Agents</h2>','tradingS2Title');
rep('<h2>Risk Governance Example</h2>','<h2 data-i18n="tradingS3Title">Risk Governance Example</h2>','tradingS3Title');
rep('<h2>Compliance Frameworks</h2>','<h2 data-i18n="tradingS4Title">Compliance Frameworks</h2>','tradingS4Title');

// Cards
rep('<h3>Position Governance</h3>','<h3 data-i18n="tradingCard1Title">Position Governance</h3>','tradingCard1Title');
rep('<h3>VaR Limit Enforcement</h3>','<h3 data-i18n="tradingCard2Title">VaR Limit Enforcement</h3>','tradingCard2Title');
rep('<h3>Concentration Monitoring</h3>','<h3 data-i18n="tradingCard3Title">Concentration Monitoring</h3>','tradingCard3Title');
rep('<h3>Regulatory Compliance</h3>','<h3 data-i18n="tradingCard4Title">Regulatory Compliance</h3>','tradingCard4Title');
rep('<h3>Cross-Examination</h3>','<h3 data-i18n="tradingCard5Title">Cross-Examination</h3>','tradingCard5Title');
rep('<h3>Audit Provenance</h3>','<h3 data-i18n="tradingCard6Title">Audit Provenance</h3>','tradingCard6Title');

// Agents
rep('<h3>Macro Strategist</h3>','<h3 data-i18n="tradingAgent1">Macro Strategist</h3>','tradingAgent1');
rep('<h3>Risk Manager</h3>','<h3 data-i18n="tradingAgent2">Risk Manager</h3>','tradingAgent2');
rep('<h3>Compliance Officer</h3>','<h3 data-i18n="tradingAgent3">Compliance Officer</h3>','tradingAgent3');
rep('<h3>Execution Strategist</h3>','<h3 data-i18n="tradingAgent4">Execution Strategist</h3>','tradingAgent4');
rep('<h3>Quant Analyst</h3>','<h3 data-i18n="tradingAgent5">Quant Analyst</h3>','tradingAgent5');
rep('<h3>Portfolio Oversight</h3>','<h3 data-i18n="tradingAgent6">Portfolio Oversight</h3>','tradingAgent6');

// CTA box
rep('<h3>See Trading Governance in Action</h3>','<h3 data-i18n="tradingCtaTitle">See Trading Governance in Action</h3>','tradingCtaTitle');

// Table headers
rep('<th>Check</th><th>Status</th><th>Action</th>','<th data-i18n="tradingThCheck">Check</th><th data-i18n="tradingThStatus">Status</th><th data-i18n="tradingThAction">Action</th>','tradingThCheck');

fs.writeFileSync(FILE, html, 'utf8');
console.log('trading.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
