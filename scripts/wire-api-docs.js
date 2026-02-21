/**
 * wire-api-docs.js: Wire data-i18n into api-docs.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'api-docs.html');
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
rep('<h1 class="page-title">API Documentation</h1>','<h1 class="page-title" data-i18n="apiPageTitle">API Documentation</h1>','apiPageTitle');

// Stats labels
rep('<div class="stat-label">Endpoints</div>','<div class="stat-label" data-i18n="apiStatEndpoints">Endpoints</div>','apiStatEndpoints');
rep('<div class="stat-label">Protocol</div>','<div class="stat-label" data-i18n="apiStatProtocol">Protocol</div>','apiStatProtocol');
rep('<div class="stat-label">OpenAPI Spec</div>','<div class="stat-label" data-i18n="apiStatSpec">OpenAPI Spec</div>','apiStatSpec');
rep('<div class="stat-label">Format</div>','<div class="stat-label" data-i18n="apiStatFormat">Format</div>','apiStatFormat');
rep('<div class="stat-label">API Version</div>','<div class="stat-label" data-i18n="apiStatVersion">API Version</div>','apiStatVersion');

// Auth
rep('<h3>Authentication</h3>','<h3 data-i18n="apiAuthTitle">Authentication</h3>','apiAuthTitle');

// API section headings
rep('<h2>Base URL</h2>','<h2 data-i18n="apiBaseUrl">Base URL</h2>','apiBaseUrl');
rep('<h2>Core Suite — The Council</h2>','<h2 data-i18n="apiSec1Title">Core Suite — The Council</h2>','apiSec1Title');
rep('<h2>Decision Intelligence — Chronos &amp; Cascade</h2>','<h2 data-i18n="apiSec2Title">Decision Intelligence — Chronos &amp; Cascade</h2>','apiSec2Title');
rep('<h2>Trust Layer — Audit &amp; Evidence</h2>','<h2 data-i18n="apiSec3Title">Trust Layer — Audit &amp; Evidence</h2>','apiSec3Title');
rep('<h2>Compliance &amp; Governance</h2>','<h2 data-i18n="apiSec4Title">Compliance &amp; Governance</h2>','apiSec4Title');
rep('<h2>Security &amp; Cryptography</h2>','<h2 data-i18n="apiSec5Title">Security &amp; Cryptography</h2>','apiSec5Title');
rep('<h2>Sovereign Architecture</h2>','<h2 data-i18n="apiSec6Title">Sovereign Architecture</h2>','apiSec6Title');
rep('<h2>CendiaOmniTranslate</h2>','<h2 data-i18n="apiSec7Title">CendiaOmniTranslate</h2>','apiSec7Title');
rep('<h2>Vertical-Specific APIs</h2>','<h2 data-i18n="apiSec8Title">Vertical-Specific APIs</h2>','apiSec8Title');
rep('<h2>Example: Start a Council Deliberation</h2>','<h2 data-i18n="apiSec9Title">Example: Start a Council Deliberation</h2>','apiSec9Title');
rep('<h2>Getting API Access</h2>','<h2 data-i18n="apiSec10Title">Getting API Access</h2>','apiSec10Title');

// CTA
rep('<h3>Get Full API Access</h3>','<h3 data-i18n="apiCtaTitle">Get Full API Access</h3>','apiCtaTitle');
rep('<a href="briefing.html" class="cta-btn">Request Technical Briefing →</a>','<a href="briefing.html" class="cta-btn" data-i18n="apiCtaBtn">Request Technical Briefing →</a>','apiCtaBtn');

// Footer
rep('<p class="footer-outcome">Ready to own your AI decisions — and prove them to regulators?</p>','<p class="footer-outcome" data-i18n="footerOutcome">Ready to own your AI decisions — and prove them to regulators?</p>','footerOutcome');
rep('<a href="briefing.html" class="cta-button">Request Briefing <span class="arrow">→</span></a>','<a href="briefing.html" class="cta-button"><span data-i18n="footerCtaBriefing">Request Briefing</span> <span class="arrow">→</span></a>','footerCtaBriefing');
rep('<a href="pilot.html" class="cta-button secondary">See Results in 90 Days</a>','<a href="pilot.html" class="cta-button secondary" data-i18n="footerCtaPilot">See Results in 90 Days</a>','footerCtaPilot');
rep('<a href="pricing.html" class="cta-button secondary">Pricing</a>','<a href="pricing.html" class="cta-button secondary" data-i18n="navPricingShort">Pricing</a>','navPricingShort');
rep('<a href="trust.html" class="cta-button secondary">Trust Center</a>','<a href="trust.html" class="cta-button secondary" data-i18n="navTrustCenterShort">Trust Center</a>','navTrustCenterShort');

fs.writeFileSync(FILE, html, 'utf8');
console.log('api-docs.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
