/**
 * wire-partners.js: Wire data-i18n into partners.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'partners.html');
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
rep('<h1 class="page-title">Partner Program</h1>','<h1 class="page-title" data-i18n="partnersPageTitle">Partner Program</h1>','partnersPageTitle');

// Partner types
rep('<h3>System Integrators</h3>','<h3 data-i18n="partnersType1Title">System Integrators</h3>','partnersType1Title');
rep('<h3>Advisory &amp; Consulting</h3>','<h3 data-i18n="partnersType2Title">Advisory &amp; Consulting</h3>','partnersType2Title');
rep('<h3>Technology Partners</h3>','<h3 data-i18n="partnersType3Title">Technology Partners</h3>','partnersType3Title');

// Benefits section
rep('<h2>Partner Benefits</h2>','<h2 data-i18n="partnersBenefitsTitle">Partner Benefits</h2>','partnersBenefitsTitle');
rep('<h4>Revenue Opportunity</h4>','<h4 data-i18n="partnersBenefit1Title">Revenue Opportunity</h4>','partnersBenefit1Title');
rep('<h4>Technical Training</h4>','<h4 data-i18n="partnersBenefit2Title">Technical Training</h4>','partnersBenefit2Title');
rep('<h4>Sales Enablement</h4>','<h4 data-i18n="partnersBenefit3Title">Sales Enablement</h4>','partnersBenefit3Title');
rep('<h4>Priority Support</h4>','<h4 data-i18n="partnersBenefit4Title">Priority Support</h4>','partnersBenefit4Title');
rep('<h4>Market Access</h4>','<h4 data-i18n="partnersBenefit5Title">Market Access</h4>','partnersBenefit5Title');
rep('<h4>Differentiation</h4>','<h4 data-i18n="partnersBenefit6Title">Differentiation</h4>','partnersBenefit6Title');

// Requirements sections
rep('<h2>Ideal Partner Profile</h2>','<h2 data-i18n="partnersProfileTitle">Ideal Partner Profile</h2>','partnersProfileTitle');
rep('<h2>How It Works</h2>','<h2 data-i18n="partnersHowTitle">How It Works</h2>','partnersHowTitle');

// CTA
rep('<h3>Become a Partner</h3>','<h3 data-i18n="partnersCtaTitle">Become a Partner</h3>','partnersCtaTitle');

// Footer
rep('<p class="footer-outcome">Ready to own your AI decisions — and prove them to regulators?</p>','<p class="footer-outcome" data-i18n="footerOutcome">Ready to own your AI decisions — and prove them to regulators?</p>','footerOutcome');
rep('<a href="briefing.html" class="cta-button">Request Briefing <span class="arrow">→</span></a>','<a href="briefing.html" class="cta-button"><span data-i18n="footerCtaBriefing">Request Briefing</span> <span class="arrow">→</span></a>','footerCtaBriefing');
rep('<a href="pilot.html" class="cta-button secondary">See Results in 90 Days</a>','<a href="pilot.html" class="cta-button secondary" data-i18n="footerCtaPilot">See Results in 90 Days</a>','footerCtaPilot');
rep('<a href="pricing.html" class="cta-button secondary">Pricing</a>','<a href="pricing.html" class="cta-button secondary" data-i18n="navPricingShort">Pricing</a>','navPricingShort');

fs.writeFileSync(FILE, html, 'utf8');
console.log('partners.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
