/**
 * wire-manifesto.js: Wire data-i18n into manifesto.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'manifesto.html');
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

// Page header
rep('<h1 class="page-title">The Datacendia Manifesto</h1>','<h1 class="page-title" data-i18n="manifestoPageTitle">The Datacendia Manifesto</h1>','manifestoPageTitle');
rep('<p class="page-subtitle">Principles for building sovereign enterprise intelligence</p>','<p class="page-subtitle" data-i18n="manifestoPageSubtitle">Principles for building sovereign enterprise intelligence</p>','manifestoPageSubtitle');

// Section headings
rep('<h2>I. Your Data, Your Infrastructure, Your Control</h2>','<h2 data-i18n="manifestoS1Title">I. Your Data, Your Infrastructure, Your Control</h2>','manifestoS1Title');
rep('<h2>II. Radical Transparency Over Marketing Theater</h2>','<h2 data-i18n="manifestoS2Title">II. Radical Transparency Over Marketing Theater</h2>','manifestoS2Title');
rep('<h2>III. Decisions Must Be Explainable</h2>','<h2 data-i18n="manifestoS3Title">III. Decisions Must Be Explainable</h2>','manifestoS3Title');
rep('<h2>IV. Portability and Low Switching Costs</h2>','<h2 data-i18n="manifestoS4Title">IV. Portability and Low Switching Costs</h2>','manifestoS4Title');
rep('<h2>V. Security Is Architecture, Not Afterthought</h2>','<h2 data-i18n="manifestoS5Title">V. Security Is Architecture, Not Afterthought</h2>','manifestoS5Title');
rep('<h2>VI. Multi-Agent Deliberation Over Single-Model Answers</h2>','<h2 data-i18n="manifestoS6Title">VI. Multi-Agent Deliberation Over Single-Model Answers</h2>','manifestoS6Title');
rep('<h2>VII. Build for the Regulator in the Room</h2>','<h2 data-i18n="manifestoS7Title">VII. Build for the Regulator in the Room</h2>','manifestoS7Title');
rep('<h2>VIII. Honest About Our Limitations</h2>','<h2 data-i18n="manifestoS8Title">VIII. Honest About Our Limitations</h2>','manifestoS8Title');
rep('<h2>IX. Customer-Owned Verification</h2>','<h2 data-i18n="manifestoS9Title">IX. Customer-Owned Verification</h2>','manifestoS9Title');

// CTA
rep('<a href="briefing.html" class="cta-button">Discuss Our Principles →</a>','<a href="briefing.html" class="cta-button" data-i18n="manifestoCtaBtn">Discuss Our Principles →</a>','manifestoCtaBtn');

fs.writeFileSync(FILE, html, 'utf8');
console.log('manifesto.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
