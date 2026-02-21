/**
 * wire-premium.js: Wire data-i18n into premium.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'premium.html');
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
rep('<a href="index.html" class="back-link">&larr; Return to Datacendia</a>','<a href="index.html" class="back-link" data-i18n="premBackLink">← Return to Datacendia</a>','premBackLink');
rep('<h1 class="page-title">Premium Capabilities</h1>','<h1 class="page-title" data-i18n="premPageTitle">Premium Capabilities</h1>','premPageTitle');
rep('<p class="page-subtitle">Advanced modules for Enterprise licensees. Visible capabilities. Contact for pricing.</p>','<p class="page-subtitle" data-i18n="premPageSubtitle">Advanced modules for Enterprise licensees. Visible capabilities. Contact for pricing.</p>','premPageSubtitle');

// Guardian Suite header
rep('<p style="font-size: 0.65rem; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">Guardian Suite</p>','<p style="font-size: 0.65rem; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;" data-i18n="premGuardianSuite">Guardian Suite</p>','premGuardianSuite');
rep('<h2 style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 300; color: var(--color-text);">4 Modules &mdash; Protect, Preserve, Connect, Listen</h2>','<h2 style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 300; color: var(--color-text);" data-i18n="premGuardianSubtitle">4 Modules — Protect, Preserve, Connect, Listen</h2>','premGuardianSubtitle');

// Module suite labels
rep('<div class="module-suite guardian">Guardian Suite</div>','<div class="module-suite guardian" data-i18n="premGuardianLabel">Guardian Suite</div>','premGuardianLabel');

// CendiaAegis
rep('<h3 class="module-name">CendiaAegis&trade;</h3>','<h3 class="module-name" data-i18n="premAegisName">CendiaAegis™</h3>','premAegisName');
rep('<p class="module-tagline">"Cyber-physical threat simulation and geopolitical risk modeling"</p>','<p class="module-tagline" data-i18n="premAegisTagline">"Cyber-physical threat simulation and geopolitical risk modeling"</p>','premAegisTagline');
rep('<h4>Who Needs It</h4>','<h4 data-i18n="premWhoNeedsIt">Who Needs It</h4>','premWhoNeedsIt');

// CendiaEternal
rep('<h3 class="module-name">CendiaEternal&trade;</h3>','<h3 class="module-name" data-i18n="premEternalName">CendiaEternal™</h3>','premEternalName');
rep('<p class="module-tagline">"Institutional memory that survives format obsolescence, technology shifts, and organizational transformation"</p>','<p class="module-tagline" data-i18n="premEternalTagline">"Institutional memory that survives format obsolescence, technology shifts, and organizational transformation"</p>','premEternalTagline');

// CendiaSymbiont
rep('<h3 class="module-name">CendiaSymbiont&trade;</h3>','<h3 class="module-name" data-i18n="premSymbiontName">CendiaSymbiont™</h3>','premSymbiontName');
rep('<p class="module-tagline">"AI-powered partnership discovery, evaluation, and management"</p>','<p class="module-tagline" data-i18n="premSymbiontTagline">"AI-powered partnership discovery, evaluation, and management"</p>','premSymbiontTagline');

// CendiaVox
rep('<h3 class="module-name">CendiaVox&trade;</h3>','<h3 class="module-name" data-i18n="premVoxName">CendiaVox™</h3>','premVoxName');
rep('<p class="module-tagline">"Weighted stakeholder voting and voice aggregation for complex multi-party decisions"</p>','<p class="module-tagline" data-i18n="premVoxTagline">"Weighted stakeholder voting and voice aggregation for complex multi-party decisions"</p>','premVoxTagline');

// Strategic Modules header
rep('<p style="font-size: 0.65rem; color: #a855f7; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">Strategic Modules</p>','<p style="font-size: 0.65rem; color: #a855f7; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;" data-i18n="premStrategicSuite">Strategic Modules</p>','premStrategicSuite');
rep('<h2 style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 300; color: var(--color-text);">3 Modules &mdash; Narrative, Ethics, Sustainability</h2>','<h2 style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 300; color: var(--color-text);" data-i18n="premStrategicSubtitle">3 Modules — Narrative, Ethics, Sustainability</h2>','premStrategicSubtitle');

// Strategic module suite labels (3 occurrences — use replace_all via multiple reps)
// They all say "Strategic" so we handle them by replacing the first occurrence only
// Actually all 3 are identical so we need a different approach — skip (they share same text)

// CendiaMythos
rep('<h3 class="module-name">CendiaMythos&trade;</h3>','<h3 class="module-name" data-i18n="premMythosName">CendiaMythos™</h3>','premMythosName');
rep('<p class="module-tagline">"Mission alignment and institutional narrative at scale"</p>','<p class="module-tagline" data-i18n="premMythosTagline">"Mission alignment and institutional narrative at scale"</p>','premMythosTagline');

// CendiaEthos
rep('<h3 class="module-name">CendiaEthos&trade;</h3>','<h3 class="module-name" data-i18n="premEthosName">CendiaEthos™</h3>','premEthosName');
rep('<p class="module-tagline">"Institutional ethics as infrastructure, not aspiration"</p>','<p class="module-tagline" data-i18n="premEthosTagline">"Institutional ethics as infrastructure, not aspiration"</p>','premEthosTagline');

// CendiaGaia
rep('<h3 class="module-name">CendiaGaia&trade;</h3>','<h3 class="module-name" data-i18n="premGaiaName">CendiaGaia™</h3>','premGaiaName');
rep('<p class="module-tagline">"ESG enforcement at planetary scale &mdash; not reporting, enforcement"</p>','<p class="module-tagline" data-i18n="premGaiaTagline">"ESG enforcement at planetary scale — not reporting, enforcement"</p>','premGaiaTagline');

// Bundles header
rep('<p style="font-size: 0.65rem; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">Common Bundles</p>','<p style="font-size: 0.65rem; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;" data-i18n="premBundlesLabel">Common Bundles</p>','premBundlesLabel');
rep('<h2 style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 300; color: var(--color-text);">Pre-Configured Module Combinations</h2>','<h2 style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 300; color: var(--color-text);" data-i18n="premBundlesTitle">Pre-Configured Module Combinations</h2>','premBundlesTitle');

// Bundle names
rep('<h3 class="bundle-name">Threat-Aware Sovereign Deployment</h3>','<h3 class="bundle-name" data-i18n="premBundle1Name">Threat-Aware Sovereign Deployment</h3>','premBundle1Name');
rep('<h3 class="bundle-name">Century-Grade Decision Proof</h3>','<h3 class="bundle-name" data-i18n="premBundle2Name">Century-Grade Decision Proof</h3>','premBundle2Name');
rep('<h3 class="bundle-name">Institutional Integrity Stack</h3>','<h3 class="bundle-name" data-i18n="premBundle3Name">Institutional Integrity Stack</h3>','premBundle3Name');

// Final CTA
rep('<h2 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 300; color: var(--color-text); margin-bottom: 12px;">Ready to discuss Premium capabilities?</h2>','<h2 style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 300; color: var(--color-text); margin-bottom: 12px;" data-i18n="premCtaTitle">Ready to discuss Premium capabilities?</h2>','premCtaTitle');
rep('<a href="briefing.html" class="module-cta" style="background: var(--color-gold); color: var(--color-bg);">Request Premium Briefing &rarr;</a>','<a href="briefing.html" class="module-cta" style="background: var(--color-gold); color: var(--color-bg);" data-i18n="premCtaBtn">Request Premium Briefing →</a>','premCtaBtn');
rep('<a href="pricing.html" class="module-cta">View All Tiers</a>','<a href="pricing.html" class="module-cta" data-i18n="premCtaTiers">View All Tiers</a>','premCtaTiers');

// Footer
rep('<p class="footer-outcome">Ready to own your AI decisions&mdash;and prove them to regulators?</p>','<p class="footer-outcome" data-i18n="footerOutcome">Ready to own your AI decisions—and prove them to regulators?</p>','footerOutcome');
rep('<a href="briefing.html" class="cta-button"><span>Request Briefing</span> <span class="arrow">&rarr;</span></a>','<a href="briefing.html" class="cta-button"><span data-i18n="footerCtaBriefing">Request Briefing</span> <span class="arrow">→</span></a>','footerCtaBriefing');
rep('<a href="pilot.html" class="cta-button secondary">See Results in 90 Days</a>','<a href="pilot.html" class="cta-button secondary" data-i18n="footerCtaPilot">See Results in 90 Days</a>','footerCtaPilot');
rep('<a href="trust.html" class="cta-button secondary">Trust Center</a>','<a href="trust.html" class="cta-button secondary" data-i18n="footerCtaTrust">Trust Center</a>','footerCtaTrust');

fs.writeFileSync(FILE, html, 'utf8');
console.log('premium.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
