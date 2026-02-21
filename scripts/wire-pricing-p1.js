/**
 * wire-pricing-p1.js: Nav + page header + pilot entry + Tier 1 cards
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'pricing.html');
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
rep('<h1 class="page-title">Pricing &amp; Capabilities</h1>','<h1 class="page-title" data-i18n="pricingPageTitle">Pricing &amp; Capabilities</h1>','pricingPageTitle');
rep('<p class="page-subtitle">Enterprise software. Annual licenses. Sovereign deployment. Customer-owned infrastructure, keys, and proof.</p>','<p class="page-subtitle" data-i18n="pricingPageSubtitle">Enterprise software. Annual licenses. Sovereign deployment. Customer-owned infrastructure, keys, and proof.</p>','pricingPageSubtitle');
rep('<p style="font-size: 0.75rem; color: var(--color-text-dim); margin-top: 16px;">12 pillars across 3 tiers. Start with Foundation, expand as your governance matures.</p>','<p style="font-size: 0.75rem; color: var(--color-text-dim); margin-top: 16px;" data-i18n="pricingPageNote">12 pillars across 3 tiers. Start with Foundation, expand as your governance matures.</p>','pricingPageNote');

// Pilot entry point
rep('<p style="font-size: 0.65rem; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">Start Here</p>','<p style="font-size: 0.65rem; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;" data-i18n="startHereLabel">Start Here</p>','startHereLabel');
rep('<h2 style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 300; color: var(--color-text); margin-bottom: 8px;">90-Day Pilot Program</h2>','<h2 style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 300; color: var(--color-text); margin-bottom: 8px;" data-i18n="pilotProgramTitle">90-Day Pilot Program</h2>','pilotProgramTitle');
rep('<div style="font-family: var(--font-mono); font-size: 1.75rem; font-weight: 500; color: var(--color-text); margin-bottom: 4px;">Custom Scoping</div>','<div style="font-family: var(--font-mono); font-size: 1.75rem; font-weight: 500; color: var(--color-text); margin-bottom: 4px;" data-i18n="pilotCustomScoping">Custom Scoping</div>','pilotCustomScoping');
rep('<p style="font-size: 0.8rem; color: var(--color-text-dim); margin-bottom: 20px; max-width: 480px; margin-left: auto; margin-right: auto;">Prove value on your data, your infrastructure. 1 environment, 10&ndash;25 users, 2 workflows, evidence packets with citations. Pilot fee applies to annual license.</p>','<p style="font-size: 0.8rem; color: var(--color-text-dim); margin-bottom: 20px; max-width: 480px; margin-left: auto; margin-right: auto;" data-i18n="pilotDesc">Prove value on your data, your infrastructure. 1 environment, 10–25 users, 2 workflows, evidence packets with citations. Pilot fee applies to annual license.</p>','pilotDesc');
rep('<a href="pilot.html" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, var(--color-gold), #b8860b); color: #000; border-radius: 6px; font-size: 0.8rem; font-weight: 600; text-decoration: none;">Apply for Pilot &rarr;</a>','<a href="pilot.html" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, var(--color-gold), #b8860b); color: #000; border-radius: 6px; font-size: 0.8rem; font-weight: 600; text-decoration: none;" data-i18n="applyForPilotBtn">Apply for Pilot →</a>','applyForPilotBtn');

// Tier 1 header
rep('<p style="font-size: 0.65rem; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">Tier 1</p>','<p style="font-size: 0.65rem; color: var(--color-gold); text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;" data-i18n="pcTier1Badge">Tier 1</p>','pcTier1Badge');
rep('<h2 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 300; color: var(--color-text); margin-bottom: 8px;">Foundation</h2>','<h2 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 300; color: var(--color-text); margin-bottom: 8px;" data-i18n="pcTier1Title">Foundation</h2>','pcTier1Title');
rep('<p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 4px;">Make decisions &rarr; Understand them &rarr; Prove them</p>','<p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 4px;" data-i18n="pcTier1Flow">Make decisions → Understand them → Prove them</p>','pcTier1Flow');
rep('<p style="font-family: var(--font-mono); font-size: 1rem; color: var(--color-gold); margin-bottom: 4px;">Price Available on Request</p>','<p style="font-family: var(--font-mono); font-size: 1rem; color: var(--color-gold); margin-bottom: 4px;" data-i18n="priceOnRequest">Price Available on Request</p>','priceOnRequest');
rep('<p style="font-size: 0.72rem; color: var(--color-text-dim);">3 pillars &middot; Annual license &middot; Customer-owned infrastructure</p>','<p style="font-size: 0.72rem; color: var(--color-text-dim);" data-i18n="tier1Note">3 pillars · Annual license · Customer-owned infrastructure</p>','tier1Note');

// Tier 1 pillar cards
rep('<div class="tier-label">Pillar 1</div>','<div class="tier-label" data-i18n="pcP1Num">Pillar 1</div>','pcP1Num');
rep('<p class="tier-tagline">Multi-Agent Deliberation Engine</p>','<p class="tier-tagline" data-i18n="pcP1Tag">Multi-Agent Deliberation Engine</p>','pcP1Tag');
rep('<a href="resources/the-council.html" class="tier-cta">Learn More</a>','<a href="resources/the-council.html" class="tier-cta" data-i18n="learnMoreCta">Learn More</a>','learnMoreCta');
rep('<div class="tier-label">Pillar 2</div>','<div class="tier-label" data-i18n="pcP2Num">Pillar 2</div>','pcP2Num');
rep('<p class="tier-tagline">Decision Intelligence Suite</p>','<p class="tier-tagline" data-i18n="pcP2Tag">Decision Intelligence Suite</p>','pcP2Tag');
rep('<a href="demos.html" class="tier-cta">See Demos</a>','<a href="demos.html" class="tier-cta" data-i18n="seeDemosCta">See Demos</a>','seeDemosCta');
rep('<div class="tier-label">Pillar 3</div>','<div class="tier-label" data-i18n="pcP3Num">Pillar 3</div>','pcP3Num');
rep('<p class="tier-tagline">Crisis Immunization + Evidence Infrastructure</p>','<p class="tier-tagline" data-i18n="pcP3Tag">Crisis Immunization + Evidence Infrastructure</p>','pcP3Tag');
rep('<a href="dcii.html" class="tier-cta primary">Learn DCII Framework</a>','<a href="dcii.html" class="tier-cta primary" data-i18n="learnDciiCta">Learn DCII Framework</a>','learnDciiCta');

fs.writeFileSync(FILE, html, 'utf8');
console.log('Pricing P1 done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
