/**
 * wire-trust-nav-gaps.js
 * Wires nav + remaining content gaps in trust.html, terms.html, privacy.html, pilot.html
 */
const fs = require('fs');
const path = require('path');

const NAV_BLOCK = [
  ['<span class="nav-label">Platform</span>','<span class="nav-label" data-i18n="navPlatform">Platform</span>','navPlatform'],
  ['<a href="platform-capabilities.html">Platform Overview<span class="nav-desc">Full capability map</span></a>','<a href="platform-capabilities.html"><span data-i18n="navPlatformOverview">Platform Overview</span><span class="nav-desc" data-i18n="navPlatformOverviewDesc">Full capability map</span></a>','navPlatformOverview'],
  ['<a href="dcii.html">DCII Framework<span class="nav-desc">9 primitives &middot; Crisis immunization</span></a>','<a href="dcii.html"><span data-i18n="navDcii">DCII Framework</span><span class="nav-desc" data-i18n="navDciiDesc">9 primitives · Crisis immunization</span></a>','navDcii'],
  ['<a href="diagrams.html">Architecture<span class="nav-desc">8 system diagrams</span></a>','<a href="diagrams.html"><span data-i18n="navArchitecture">Architecture</span><span class="nav-desc" data-i18n="navArchitectureDesc">8 system diagrams</span></a>','navArchitecture'],
  ['<span class="nav-label">Evidence</span>','<span class="nav-label" data-i18n="navEvidence">Evidence</span>','navEvidence'],
  ['<a href="demos.html">Interactive Demos<span class="nav-desc">Council, Chronos, Crucible &amp; more</span></a>','<a href="demos.html"><span data-i18n="navDemos">Interactive Demos</span><span class="nav-desc" data-i18n="navDemosDesc">Council, Chronos, Crucible &amp; more</span></a>','navDemos'],
  ['<a href="wargames.html">War Games<span class="nav-desc">Would dissent have surfaced the risk?</span></a>','<a href="wargames.html"><span data-i18n="navWargames">War Games</span><span class="nav-desc" data-i18n="navWargamesDesc">Would dissent have surfaced the risk?</span></a>','navWargames'],
  ['<a href="case-studies.html">Case Studies<span class="nav-desc">Real-world decision analysis</span></a>','<a href="case-studies.html"><span data-i18n="navCaseStudies">Case Studies</span><span class="nav-desc" data-i18n="navCaseStudiesDesc">Real-world decision analysis</span></a>','navCaseStudies'],
  ['<a href="verticals.html">Industries</a>','<a href="verticals.html" data-i18n="navIndustries">Industries</a>','navIndustries'],
  ['<span class="nav-label">Pricing</span>','<span class="nav-label" data-i18n="navPricing">Pricing</span>','navPricing'],
  ['<a href="pricing.html">Tier Overview<span class="nav-desc">Foundation &middot; Enterprise &middot; Strategic</span></a>','<a href="pricing.html"><span data-i18n="navTierOverview">Tier Overview</span><span class="nav-desc" data-i18n="navTierOverviewDesc">Foundation · Enterprise · Strategic</span></a>','navTierOverview'],
  ['<a href="premium.html">Premium Modules<span class="nav-desc">7 advanced capabilities</span></a>','<a href="premium.html"><span data-i18n="navPremiumModules">Premium Modules</span><span class="nav-desc" data-i18n="navPremiumModulesDesc">7 advanced capabilities</span></a>','navPremiumModules'],
  ['<a href="roi-calculator.html">ROI Calculator<span class="nav-desc">Quantify decision risk reduction</span></a>','<a href="roi-calculator.html"><span data-i18n="navRoiCalculator">ROI Calculator</span><span class="nav-desc" data-i18n="navRoiCalculatorDesc">Quantify decision risk reduction</span></a>','navRoiCalculator'],
  ['<a href="pilot.html">90-Day Pilot<span class="nav-desc">Prove value before scaling</span></a>','<a href="pilot.html"><span data-i18n="navPilot">90-Day Pilot</span><span class="nav-desc" data-i18n="navPilotDesc">Prove value before scaling</span></a>','navPilot'],
  ['<span class="nav-label">Trust</span>','<span class="nav-label" data-i18n="navTrust">Trust</span>','navTrust'],
  ['<a href="trust.html">Trust Center<span class="nav-desc">Security, compliance &amp; deployment</span></a>','<a href="trust.html"><span data-i18n="navTrustCenter">Trust Center</span><span class="nav-desc" data-i18n="navTrustCenterDesc">Security, compliance &amp; deployment</span></a>','navTrustCenter'],
  ["<a href=\"honesty-matrices.html\">Honesty Matrices<span class=\"nav-desc\">What we can't do &mdash; yet</span></a>",'<a href="honesty-matrices.html"><span data-i18n="navHonestyMatricesLink">Honesty Matrices</span><span class="nav-desc" data-i18n="navHonestyMatricesDesc">What we can\'t do — yet</span></a>','navHonestyMatricesLink'],
  ['<a href="briefing.html" class="nav-cta">Request Briefing</a>','<a href="briefing.html" class="nav-cta" data-i18n="navRequestBriefing">Request Briefing</a>','navRequestBriefing'],
];

const FOOTER_BLOCK = [
  ['<p class="footer-outcome">Ready to own your AI decisions—and prove them to regulators?</p>','<p class="footer-outcome" data-i18n="footerOutcome">Ready to own your AI decisions—and prove them to regulators?</p>','footerOutcome'],
  ['<a href="pilot.html" class="cta-button secondary">See Results in 90 Days</a>','<a href="pilot.html" class="cta-button secondary" data-i18n="footerCtaPilot">See Results in 90 Days</a>','footerCtaPilot'],
];

function wireFile(filePath, extraReps) {
  let html = fs.readFileSync(filePath, 'utf8');
  let count = 0;
  function rep(o, n, k) {
    if (!html.includes(o)) { return; }
    html = html.replace(o, n); count++;
  }
  for (const [o, n, k] of NAV_BLOCK) rep(o, n, k);
  for (const [o, n, k] of FOOTER_BLOCK) rep(o, n, k);
  if (extraReps) for (const [o, n, k] of extraReps) rep(o, n, k);
  fs.writeFileSync(filePath, html, 'utf8');
  const total = (html.match(/data-i18n/g)||[]).length;
  console.log(path.basename(filePath) + ': +' + count + ' replacements → ' + total + ' total attrs');
}

// terms.html — nav only (content already wired)
wireFile(path.resolve(__dirname, '..', 'terms.html'), [
  ['<p class="tagline-sub" data-i18n="tagline">Decision Crisis Immunization Infrastructure</p>', '<p class="tagline-sub" data-i18n="tagline">Decision Crisis Immunization Infrastructure</p>', null],
]);

// privacy.html — nav only (content already wired)
wireFile(path.resolve(__dirname, '..', 'privacy.html'), []);

// pilot.html — nav only (content already wired)
wireFile(path.resolve(__dirname, '..', 'pilot.html'), []);

// trust.html — nav + remaining unwired content sections
wireFile(path.resolve(__dirname, '..', 'trust.html'), [
  // Section headings not yet wired
  ['<h2>Distribution vs Data Processing</h2>','<h2 data-i18n="trustDistributionTitle">Distribution vs Data Processing</h2>','trustDistributionTitle'],
  ['<h2>Retention & Deletion</h2>','<h2 data-i18n="trustRetentionTitle">Retention & Deletion</h2>','trustRetentionTitle'],
  ['<h2>Shared Responsibility Model</h2>','<h2 data-i18n="trustSharedResponsibility">Shared Responsibility Model</h2>','trustSharedResponsibility'],
  ['<h2>Vulnerability Disclosure Policy</h2>','<h2 data-i18n="trustVulnDisclosure">Vulnerability Disclosure Policy</h2>','trustVulnDisclosure'],
  ['<h2>Related Trust Resources</h2>','<h2 data-i18n="trustRelatedResources">Related Trust Resources</h2>','trustRelatedResources'],
  // Trust item titles in compliance section not yet wired
  ['<div class="trust-item-title">ISO/IEC 42001:2023</div>','<div class="trust-item-title" data-i18n="trustIso42001">ISO/IEC 42001:2023</div>','trustIso42001'],
  ['<div class="trust-item-title">NIST AI RMF</div>','<div class="trust-item-title" data-i18n="trustNistRmf">NIST AI RMF</div>','trustNistRmf'],
  ['<div class="trust-item-title">EU AI Act</div>','<div class="trust-item-title" data-i18n="trustEuAiAct">EU AI Act</div>','trustEuAiAct'],
  ['<div class="trust-item-title">SOC 2 Type II</div>','<div class="trust-item-title" data-i18n="trustSoc2">SOC 2 Type II</div>','trustSoc2'],
  ['<div class="trust-item-title">ISO 27001</div>','<div class="trust-item-title" data-i18n="trustIso27001">ISO 27001</div>','trustIso27001'],
  ['<div class="trust-item-title">GDPR</div>','<div class="trust-item-title" data-i18n="trustGdpr">GDPR</div>','trustGdpr'],
  ['<div class="trust-item-title">FedRAMP</div>','<div class="trust-item-title" data-i18n="trustFedRamp">FedRAMP</div>','trustFedRamp'],
  ['<div class="trust-item-title">CMMC 2.0</div>','<div class="trust-item-title" data-i18n="trustCmmc">CMMC 2.0</div>','trustCmmc'],
  ['<div class="trust-item-title">HIPAA / HITECH</div>','<div class="trust-item-title" data-i18n="trustHipaa">HIPAA / HITECH</div>','trustHipaa'],
  // Incident Response section
  ['<h2 style="color: #ef4444;">Incident Response &amp; Security Testing</h2>','<h2 style="color: #ef4444;" data-i18n="trustIncidentResponse">Incident Response &amp; Security Testing</h2>','trustIncidentResponse'],
  ['<div class="trust-item-title">Incident Response SLA</div>','<div class="trust-item-title" data-i18n="trustIrSla">Incident Response SLA</div>','trustIrSla'],
  ['<div class="trust-item-title">Security Testing Summary</div>','<div class="trust-item-title" data-i18n="trustSecTesting">Security Testing Summary</div>','trustSecTesting'],
  // Related trust resource item titles
  ['<div class="trust-item-title">Integration Honesty Matrix</div>','<div class="trust-item-title" data-i18n="trustResHonesty">Integration Honesty Matrix</div>','trustResHonesty'],
  ['<div class="trust-item-title">Security Architecture</div>','<div class="trust-item-title" data-i18n="trustResSecArch">Security Architecture</div>','trustResSecArch'],
  ['<div class="trust-item-title">Sovereignty Matrix</div>','<div class="trust-item-title" data-i18n="trustResSovereignty">Sovereignty Matrix</div>','trustResSovereignty'],
  ['<div class="trust-item-title">Compliance Documentation</div>','<div class="trust-item-title" data-i18n="trustResCompliance">Compliance Documentation</div>','trustResCompliance'],
  // Page header
  ['<h1 class="page-title" data-i18n="trustCenterTitle">Trust Center</h1>','<h1 class="page-title" data-i18n="trustCenterTitle">Trust Center</h1>','skip'],
]);
