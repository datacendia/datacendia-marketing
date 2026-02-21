/**
 * Part 1: Wire data-i18n into index.html — Landing + Nav + CTA buttons
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'index.html');
let html = fs.readFileSync(FILE, 'utf8');
let count = 0;

function rep(o, n, k) {
  if (!html.includes(o)) { console.log('NOT FOUND: ' + k); return; }
  html = html.replace(o, n); count++;
}

// ── LANDING OVERLAY ──────────────────────────────────────────────────────────
rep(
  '<div class="landing-tagline">Decision Crisis Immunization Infrastructure</div>',
  '<div class="landing-tagline" data-i18n="landingTagline">Decision Crisis Immunization Infrastructure</div>',
  'landingTagline'
);
rep(
  '<span class="landing-stat-num" style="font-size:1.6rem;letter-spacing:.04em">Survive Regulatory Scrutiny</span>',
  '<span class="landing-stat-num" style="font-size:1.6rem;letter-spacing:.04em" data-i18n="landingStatNum">Survive Regulatory Scrutiny</span>',
  'landingStatNum'
);
rep(
  '<span class="landing-stat-label" style="max-width:520px;line-height:1.6">When regulators challenge your AI decisions, prove your process with cryptographic evidence they can verify independently</span>',
  '<span class="landing-stat-label" style="max-width:520px;line-height:1.6" data-i18n="landingStatLabel">When regulators challenge your AI decisions, prove your process with cryptographic evidence they can verify independently</span>',
  'landingStatLabel'
);
rep(
  '<button class="landing-skip" onclick="skipLanding()" aria-label="Skip intro">Skip →</button>',
  '<button class="landing-skip" onclick="skipLanding()" aria-label="Skip intro" data-i18n="landingSkip">Skip →</button>',
  'landingSkip'
);

// ── NAV ──────────────────────────────────────────────────────────────────────
rep(
  '<span class="nav-label">Platform</span>',
  '<span class="nav-label" data-i18n="navPlatform">Platform</span>',
  'navPlatform'
);
rep(
  '<a href="platform-capabilities.html">Platform Overview<span class="nav-desc">Full capability map</span></a>',
  '<a href="platform-capabilities.html"><span data-i18n="navPlatformOverview">Platform Overview</span><span class="nav-desc" data-i18n="navPlatformOverviewDesc">Full capability map</span></a>',
  'navPlatformOverview'
);
rep(
  '<a href="dcii.html">DCII Framework<span class="nav-desc">9 primitives &middot; Crisis immunization</span></a>',
  '<a href="dcii.html"><span data-i18n="navDcii">DCII Framework</span><span class="nav-desc" data-i18n="navDciiDesc">9 primitives · Crisis immunization</span></a>',
  'navDcii'
);
rep(
  '<a href="dgi.html">DGI Framework<span class="nav-desc">Open standard &middot; Vendor-neutral</span></a>',
  '<a href="dgi.html"><span data-i18n="navDgi">DGI Framework</span><span class="nav-desc" data-i18n="navDgiDesc">Open standard · Vendor-neutral</span></a>',
  'navDgi'
);
rep(
  '<a href="diagrams.html">Architecture<span class="nav-desc">8 system diagrams</span></a>',
  '<a href="diagrams.html"><span data-i18n="navArchitecture">Architecture</span><span class="nav-desc" data-i18n="navArchitectureDesc">8 system diagrams</span></a>',
  'navArchitecture'
);
rep(
  '<span class="nav-label">Evidence</span>',
  '<span class="nav-label" data-i18n="navEvidence">Evidence</span>',
  'navEvidence'
);
rep(
  '<a href="demos.html">Interactive Demos<span class="nav-desc">Council, Chronos, Crucible &amp; more</span></a>',
  '<a href="demos.html"><span data-i18n="navDemos">Interactive Demos</span><span class="nav-desc" data-i18n="navDemosDesc">Council, Chronos, Crucible &amp; more</span></a>',
  'navDemos'
);
rep(
  '<a href="wargames.html">War Games<span class="nav-desc">Would dissent have surfaced the risk?</span></a>',
  '<a href="wargames.html"><span data-i18n="navWargames">War Games</span><span class="nav-desc" data-i18n="navWargamesDesc">Would dissent have surfaced the risk?</span></a>',
  'navWargames'
);
rep(
  '<a href="case-studies.html">Case Studies<span class="nav-desc">Real-world decision analysis</span></a>',
  '<a href="case-studies.html"><span data-i18n="navCaseStudies">Case Studies</span><span class="nav-desc" data-i18n="navCaseStudiesDesc">Real-world decision analysis</span></a>',
  'navCaseStudies'
);
rep(
  '<a href="verticals.html">Industries</a>',
  '<a href="verticals.html" data-i18n="navIndustries">Industries</a>',
  'navIndustries'
);
rep(
  '<span class="nav-label">Pricing</span>',
  '<span class="nav-label" data-i18n="navPricing">Pricing</span>',
  'navPricing'
);
rep(
  '<a href="pricing.html">Tier Overview<span class="nav-desc">Foundation &middot; Enterprise &middot; Strategic</span></a>',
  '<a href="pricing.html"><span data-i18n="navTierOverview">Tier Overview</span><span class="nav-desc" data-i18n="navTierOverviewDesc">Foundation · Enterprise · Strategic</span></a>',
  'navTierOverview'
);
rep(
  '<a href="premium.html">Premium Modules<span class="nav-desc">7 advanced capabilities</span></a>',
  '<a href="premium.html"><span data-i18n="navPremiumModules">Premium Modules</span><span class="nav-desc" data-i18n="navPremiumModulesDesc">7 advanced capabilities</span></a>',
  'navPremiumModules'
);
rep(
  '<a href="roi-calculator.html">ROI Calculator<span class="nav-desc">Quantify decision risk reduction</span></a>',
  '<a href="roi-calculator.html"><span data-i18n="navRoiCalculator">ROI Calculator</span><span class="nav-desc" data-i18n="navRoiCalculatorDesc">Quantify decision risk reduction</span></a>',
  'navRoiCalculator'
);
rep(
  '<a href="pilot.html">90-Day Pilot<span class="nav-desc">Prove value before scaling</span></a>',
  '<a href="pilot.html"><span data-i18n="navPilot">90-Day Pilot</span><span class="nav-desc" data-i18n="navPilotDesc">Prove value before scaling</span></a>',
  'navPilot'
);
rep(
  '<span class="nav-label">Trust</span>',
  '<span class="nav-label" data-i18n="navTrust">Trust</span>',
  'navTrust'
);
rep(
  '<a href="trust.html">Trust Center<span class="nav-desc">Security, compliance &amp; deployment</span></a>',
  '<a href="trust.html"><span data-i18n="navTrustCenter">Trust Center</span><span class="nav-desc" data-i18n="navTrustCenterDesc">Security, compliance &amp; deployment</span></a>',
  'navTrustCenter'
);
rep(
  "<a href=\"honesty-matrices.html\">Honesty Matrices<span class=\"nav-desc\">What we can't do &mdash; yet</span></a>",
  '<a href="honesty-matrices.html"><span data-i18n="navHonestyMatricesLink">Honesty Matrices</span><span class="nav-desc" data-i18n="navHonestyMatricesDesc">What we can\'t do — yet</span></a>',
  'navHonestyMatricesLink'
);
rep(
  '<a href="briefing.html" class="nav-cta">Request Briefing</a>',
  '<a href="briefing.html" class="nav-cta" data-i18n="navRequestBriefing">Request Briefing</a>',
  'navRequestBriefing'
);

// ── CTA BUTTONS ───────────────────────────────────────────────────────────────
rep(
  '<a href="roi-calculator.html" class="btn-gold">Calculate Your ROI →</a>',
  '<a href="roi-calculator.html" class="btn-gold" data-i18n="btnCalculateRoi">Calculate Your ROI →</a>',
  'btnCalculateRoi'
);
rep(
  '<a href="demos/sports-governance.html" class="btn-outline">Try Transfer Demo</a>',
  '<a href="demos/sports-governance.html" class="btn-outline" data-i18n="btnTryTransferDemo">Try Transfer Demo</a>',
  'btnTryTransferDemo'
);
rep(
  '<a href="briefing.html" class="btn-outline">Request Briefing</a>',
  '<a href="briefing.html" class="btn-outline" data-i18n="btnRequestBriefing">Request Briefing</a>',
  'btnRequestBriefing'
);

fs.writeFileSync(FILE, html, 'utf8');
console.log('Part 1 done — ' + count + ' replacements applied.');
console.log('data-i18n count now: ' + (html.match(/data-i18n/g) || []).length);
