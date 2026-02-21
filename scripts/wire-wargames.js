/**
 * wire-wargames.js: Wire data-i18n into wargames.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'wargames.html');
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

// Back link
rep('<a href="index.html" class="back-link">← Return to Datacendia</a>','<a href="index.html" class="back-link" data-i18n="wgBackLink">← Return to Datacendia</a>','wgBackLink');

// Page header
rep('<h1 class="page-title">War Game Simulations</h1>','<h1 class="page-title" data-i18n="wgPageTitle">War Game Simulations</h1>','wgPageTitle');
rep('<p class="page-subtitle">Using only information available at the time — before the outcome was known — we simulate whether structured dissent would have surfaced material risk.</p>','<p class="page-subtitle" data-i18n="wgPageSubtitle">Using only information available at the time — before the outcome was known — we simulate whether structured dissent would have surfaced material risk.</p>','wgPageSubtitle');

// Shared section sub-headings (used across all 6 war games)
// "The Decision Under Analysis" appears 6 times — use replace_all via loop approach
// We'll wire the first occurrence only since they're identical; app.js applies to all [data-i18n]
// Actually each element is separate, so we need to wire each. Use a loop in the script:
const decisionHeading = '<h4>The Decision Under Analysis</h4>';
const councilHeading = '<h4>The Council\'s Analysis</h4>';
const riskEscalation = '<h4>Material Risk Escalation Triggered</h4>';
const ifRiskAdopted = '<h4>If Risk Controls Had Been Adopted</h4>';
const ifCrisisImmune = '<h4>If Crisis Immunization Had Been In Place</h4>';
const dataSources = '<h4>Public Data Sources Used</h4>';

let idx = 0;
const wgIds = ['Svb','Boeing','Wirecard','Theranos','Everton','Nhs'];

for (const id of wgIds) {
  const di = html.indexOf(decisionHeading, idx);
  if (di !== -1) {
    html = html.slice(0, di) + `<h4 data-i18n="wgDecisionHeading">The Decision Under Analysis</h4>` + html.slice(di + decisionHeading.length);
    idx = di + 1;
    count++;
  }
}

idx = 0;
for (const id of wgIds) {
  const ci = html.indexOf(councilHeading, idx);
  if (ci !== -1) {
    html = html.slice(0, ci) + `<h4 data-i18n="wgCouncilHeading">The Council's Analysis</h4>` + html.slice(ci + councilHeading.length);
    idx = ci + 1;
    count++;
  }
}

idx = 0;
for (const id of wgIds) {
  const ri = html.indexOf(riskEscalation, idx);
  if (ri !== -1) {
    html = html.slice(0, ri) + `<h4 data-i18n="wgRiskEscalation">Material Risk Escalation Triggered</h4>` + html.slice(ri + riskEscalation.length);
    idx = ri + 1;
    count++;
  }
}

idx = 0;
for (const id of ['Svb','Boeing','Wirecard','Theranos']) {
  const ii = html.indexOf(ifRiskAdopted, idx);
  if (ii !== -1) {
    html = html.slice(0, ii) + `<h4 data-i18n="wgIfRiskAdopted">If Risk Controls Had Been Adopted</h4>` + html.slice(ii + ifRiskAdopted.length);
    idx = ii + 1;
    count++;
  }
}

idx = 0;
for (const id of ['Everton','Nhs']) {
  const ii = html.indexOf(ifCrisisImmune, idx);
  if (ii !== -1) {
    html = html.slice(0, ii) + `<h4 data-i18n="wgIfCrisisImmune">If Crisis Immunization Had Been In Place</h4>` + html.slice(ii + ifCrisisImmune.length);
    idx = ii + 1;
    count++;
  }
}

idx = 0;
for (const id of wgIds) {
  const si = html.indexOf(dataSources, idx);
  if (si !== -1) {
    html = html.slice(0, si) + `<h4 data-i18n="wgDataSources">Public Data Sources Used</h4>` + html.slice(si + dataSources.length);
    idx = si + 1;
    count++;
  }
}

// War game labels
rep('<div class="wargame-label">Banking / Treasury Risk</div>','<div class="wargame-label" data-i18n="wg1Label">Banking / Treasury Risk</div>','wg1Label');
rep('<div class="wargame-label">Aerospace / Safety Engineering</div>','<div class="wargame-label" data-i18n="wg2Label">Aerospace / Safety Engineering</div>','wg2Label');
rep('<div class="wargame-label">Financial Services / Fraud Detection</div>','<div class="wargame-label" data-i18n="wg3Label">Financial Services / Fraud Detection</div>','wg3Label');
rep('<div class="wargame-label">Healthcare / Due Diligence</div>','<div class="wargame-label" data-i18n="wg4Label">Healthcare / Due Diligence</div>','wg4Label');
rep('<div class="wargame-label">Football / Financial Fair Play</div>','<div class="wargame-label" data-i18n="wg5Label">Football / Financial Fair Play</div>','wg5Label');
rep('<div class="wargame-label">Healthcare / Patient Safety</div>','<div class="wargame-label" data-i18n="wg6Label">Healthcare / Patient Safety</div>','wg6Label');

// War game titles
rep('<h3 class="wargame-title">Silicon Valley Bank Collapse</h3>','<h3 class="wargame-title" data-i18n="wg1Title">Silicon Valley Bank Collapse</h3>','wg1Title');
rep('<h3 class="wargame-title">Boeing 737 MAX MCAS Failures</h3>','<h3 class="wargame-title" data-i18n="wg2Title">Boeing 737 MAX MCAS Failures</h3>','wg2Title');
rep('<h3 class="wargame-title">Wirecard Accounting Fraud</h3>','<h3 class="wargame-title" data-i18n="wg3Title">Wirecard Accounting Fraud</h3>','wg3Title');
rep('<h3 class="wargame-title">Theranos Investment Due Diligence</h3>','<h3 class="wargame-title" data-i18n="wg4Title">Theranos Investment Due Diligence</h3>','wg4Title');
rep('<h3 class="wargame-title">Everton FC PSR Breach</h3>','<h3 class="wargame-title" data-i18n="wg5Title">Everton FC PSR Breach</h3>','wg5Title');
rep('<h3 class="wargame-title">NHS Maternity Failures (Shrewsbury &amp; Telford)</h3>','<h3 class="wargame-title" data-i18n="wg6Title">NHS Maternity Failures (Shrewsbury &amp; Telford)</h3>','wg6Title');

// Loss labels
rep('<div class="wargame-loss-label">Total Loss</div>','<div class="wargame-loss-label" data-i18n="wgLossLabel">Total Loss</div>','wgLossLabel');
rep('<div class="wargame-loss-label">Total Cost</div>','<div class="wargame-loss-label" data-i18n="wgCostLabel">Total Cost</div>','wgCostLabel');
rep('<div class="wargame-loss-label">Investor Loss</div>','<div class="wargame-loss-label" data-i18n="wgInvestorLoss">Investor Loss</div>','wgInvestorLoss');
rep('<div class="wargame-loss-label">Consequence</div>','<div class="wargame-loss-label" data-i18n="wgConsequence">Consequence</div>','wgConsequence');
rep('<div class="wargame-loss-label">Harm Scale</div>','<div class="wargame-loss-label" data-i18n="wgHarmScale">Harm Scale</div>','wgHarmScale');

// CTA
rep('<h2>Run Your Own War Game</h2>','<h2 data-i18n="wgCtaTitle">Run Your Own War Game</h2>','wgCtaTitle');
rep('<p>Bring us your strategic decision. We\'ll stress-test it with The Council using your real data — before it becomes a case study for someone else.</p>','<p data-i18n="wgCtaDesc">Bring us your strategic decision. We\'ll stress-test it with The Council using your real data — before it becomes a case study for someone else.</p>','wgCtaDesc');
rep('<a href="briefing.html">Request a War Game Session</a>','<a href="briefing.html" data-i18n="wgCtaBtn">Request a War Game Session</a>','wgCtaBtn');

fs.writeFileSync(FILE, html, 'utf8');
console.log('wargames.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
