/**
 * wire-roi-calculator.js: Wire data-i18n into roi-calculator.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'roi-calculator.html');
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
rep('<h1 class="page-title">ROI Calculator</h1>','<h1 class="page-title" data-i18n="roiPageTitle">ROI Calculator</h1>','roiPageTitle');
rep('<p class="page-subtitle">See how Datacendia compares to your current decision-making costs</p>','<p class="page-subtitle" data-i18n="roiPageSubtitle">See how Datacendia compares to your current decision-making costs</p>','roiPageSubtitle');

// Input section
rep('<h2>📊 Your Organization</h2>','<h2 data-i18n="roiInputTitle">📊 Your Organization</h2>','roiInputTitle');
rep('<label>Industry Vertical</label>','<label data-i18n="roiLabelVertical">Industry Vertical</label>','roiLabelVertical');
rep('<label>Annual Revenue</label>','<label data-i18n="roiLabelRevenue">Annual Revenue</label>','roiLabelRevenue');
rep('<label>Number of Strategic Decisions per Year</label>','<label data-i18n="roiLabelDecisions">Number of Strategic Decisions per Year</label>','roiLabelDecisions');
rep('<p class="hint">M&A, product launches, major investments, regulatory responses, etc.</p>','<p class="hint" data-i18n="roiHintDecisions">M&A, product launches, major investments, regulatory responses, etc.</p>','roiHintDecisions');
rep('<label>Average Decision Value (Impact)</label>','<label data-i18n="roiLabelDecisionValue">Average Decision Value (Impact)</label>','roiLabelDecisionValue');
rep('<h2 style="margin-top: 2rem;">💸 Current Costs</h2>','<h2 style="margin-top: 2rem;" data-i18n="roiCurrentCostsTitle">💸 Current Costs</h2>','roiCurrentCostsTitle');
rep('<label>BI/Analytics Tools (Annual)</label>','<label data-i18n="roiLabelBI">BI/Analytics Tools (Annual)</label>','roiLabelBI');
rep('<p class="hint">Tableau, Power BI, Looker, Snowflake, etc.</p>','<p class="hint" data-i18n="roiHintBI">Tableau, Power BI, Looker, Snowflake, etc.</p>','roiHintBI');
rep('<label>Consulting Spend (Annual)</label>','<label data-i18n="roiLabelConsulting">Consulting Spend (Annual)</label>','roiLabelConsulting');
rep('<p class="hint">McKinsey, BCG, Deloitte, boutique firms</p>','<p class="hint" data-i18n="roiHintConsulting">McKinsey, BCG, Deloitte, boutique firms</p>','roiHintConsulting');
rep('<label>Internal Analytics Team Size</label>','<label data-i18n="roiLabelTeam">Internal Analytics Team Size</label>','roiLabelTeam');
rep('<p class="hint">Data analysts, scientists, BI developers</p>','<p class="hint" data-i18n="roiHintTeam">Data analysts, scientists, BI developers</p>','roiHintTeam');
rep('<label>Compliance/Audit Preparation (Annual)</label>','<label data-i18n="roiLabelCompliance">Compliance/Audit Preparation (Annual)</label>','roiLabelCompliance');
rep('<p class="hint">SOC 2, regulatory filings, audit prep</p>','<p class="hint" data-i18n="roiHintCompliance">SOC 2, regulatory filings, audit prep</p>','roiHintCompliance');

// Results section
rep('<h2>📈 Your ROI with Datacendia</h2>','<h2 data-i18n="roiResultsTitle">📈 Your ROI with Datacendia</h2>','roiResultsTitle');
rep('<div class="result-label">Annual Net Savings</div>','<div class="result-label" data-i18n="roiNetSavingsLabel">Annual Net Savings</div>','roiNetSavingsLabel');
rep('<div class="result-sub">After Datacendia investment</div>','<div class="result-sub" data-i18n="roiNetSavingsSub">After Datacendia investment</div>','roiNetSavingsSub');
rep('<div class="result-label">ROI</div>','<div class="result-label" data-i18n="roiRoiLabel">ROI</div>','roiRoiLabel');
rep('<div class="result-sub">Return on investment</div>','<div class="result-sub" data-i18n="roiRoiSub">Return on investment</div>','roiRoiSub');
rep('<div class="result-label">Payback Period</div>','<div class="result-label" data-i18n="roiPaybackLabel">Payback Period</div>','roiPaybackLabel');

// Breakdown
rep('<h3>Cost Breakdown</h3>','<h3 data-i18n="roiBreakdownTitle">Cost Breakdown</h3>','roiBreakdownTitle');
rep('<span class="label">Current BI Tools</span>','<span class="label" data-i18n="roiRowBI">Current BI Tools</span>','roiRowBI');
rep('<span class="label">Consulting Spend</span>','<span class="label" data-i18n="roiRowConsulting">Consulting Spend</span>','roiRowConsulting');
rep('<span class="label">Team Cost (est.)</span>','<span class="label" data-i18n="roiRowTeam">Team Cost (est.)</span>','roiRowTeam');
rep('<span class="label">Compliance Prep</span>','<span class="label" data-i18n="roiRowCompliance">Compliance Prep</span>','roiRowCompliance');
rep('<span class="label">Total Current Cost</span>','<span class="label" data-i18n="roiRowTotalCurrent">Total Current Cost</span>','roiRowTotalCurrent');
rep('<h3 style="margin-top: 1.5rem;">With Datacendia</h3>','<h3 style="margin-top: 1.5rem;" data-i18n="roiWithDCTitle">With Datacendia</h3>','roiWithDCTitle');
rep('<span class="label">Datacendia License</span>','<span class="label" data-i18n="roiRowLicense">Datacendia License</span>','roiRowLicense');
rep('<span class="label">BI Tools (reduced)</span>','<span class="label" data-i18n="roiRowBIReduced">BI Tools (reduced)</span>','roiRowBIReduced');
rep('<span class="label">Consulting (reduced)</span>','<span class="label" data-i18n="roiRowConsultingReduced">Consulting (reduced)</span>','roiRowConsultingReduced');
rep('<span class="label">Team (optimized)</span>','<span class="label" data-i18n="roiRowTeamOptimized">Team (optimized)</span>','roiRowTeamOptimized');
rep('<span class="label">Compliance (automated)</span>','<span class="label" data-i18n="roiRowComplianceAuto">Compliance (automated)</span>','roiRowComplianceAuto');
rep('<span class="label">Total With Datacendia</span>','<span class="label" data-i18n="roiRowTotalDC">Total With Datacendia</span>','roiRowTotalDC');

// CTA
rep('<a href="briefing.html" class="cta-btn">Get Custom ROI Analysis →</a>','<a href="briefing.html" class="cta-btn" data-i18n="roiCtaBtn">Get Custom ROI Analysis →</a>','roiCtaBtn');

// Value multipliers section
rep('<h2 style="color: var(--color-text); margin-bottom: 2rem;">Potential Additional Value</h2>','<h2 style="color: var(--color-text); margin-bottom: 2rem;" data-i18n="roiAddValueTitle">Potential Additional Value</h2>','roiAddValueTitle');
rep('<div class="result-label">Decision Quality</div>','<div class="result-label" data-i18n="roiAddQ1Label">Decision Quality</div>','roiAddQ1Label');
rep('<div class="result-sub">Multi-agent deliberation surfaces blind spots</div>','<div class="result-sub" data-i18n="roiAddQ1Sub">Multi-agent deliberation surfaces blind spots</div>','roiAddQ1Sub');
rep('<div class="result-label">Decision Speed</div>','<div class="result-label" data-i18n="roiAddQ2Label">Decision Speed</div>','roiAddQ2Label');
rep('<div class="result-sub">Automated analysis vs. manual review</div>','<div class="result-sub" data-i18n="roiAddQ2Sub">Automated analysis vs. manual review</div>','roiAddQ2Sub');
rep('<div class="result-label">Audit Prep Time</div>','<div class="result-label" data-i18n="roiAddQ3Label">Audit Prep Time</div>','roiAddQ3Label');
rep('<div class="result-sub">Evidence packets generated automatically</div>','<div class="result-sub" data-i18n="roiAddQ3Sub">Evidence packets generated automatically</div>','roiAddQ3Sub');
rep('<div class="result-label">Risk Mitigation</div>','<div class="result-label" data-i18n="roiAddQ4Label">Risk Mitigation</div>','roiAddQ4Label');
rep('<div class="result-sub">Dissent capture prevents groupthink</div>','<div class="result-sub" data-i18n="roiAddQ4Sub">Dissent capture prevents groupthink</div>','roiAddQ4Sub');

// Assumptions
rep('<h4>⚠️ Important: These Are Estimates, Not Proven Results</h4>','<h4 data-i18n="roiAssumptionsTitle">⚠️ Important: These Are Estimates, Not Proven Results</h4>','roiAssumptionsTitle');

fs.writeFileSync(FILE, html, 'utf8');
console.log('roi-calculator.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
