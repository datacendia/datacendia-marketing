/**
 * wire-verticals.js: Wire data-i18n into verticals.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'verticals.html');
let html = fs.readFileSync(FILE, 'utf8');
let count = 0;
function rep(o, n, k) {
  if (!html.includes(o)) { console.log('NOT FOUND: ' + k); return; }
  html = html.replace(o, n); count++;
}

// Tagline-sub
rep('<p class="tagline-sub">Decision Crisis Immunization Infrastructure</p>','<p class="tagline-sub" data-i18n="tagline">Decision Crisis Immunization Infrastructure</p>','tagline');

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
rep('<h1 class="page-title">Industry Verticals</h1>','<h1 class="page-title" data-i18n="verticalsPageTitle">Industry Verticals</h1>','verticalsPageTitle');
rep('<p class="page-subtitle">Durable across multiple verticals, each with full 6-layer compliance: data connectors, knowledge base, compliance mapping, decision schemas, agent presets, and defensible outputs.</p>','<p class="page-subtitle" data-i18n="verticalsPageSubtitle">Durable across multiple verticals, each with full 6-layer compliance: data connectors, knowledge base, compliance mapping, decision schemas, agent presets, and defensible outputs.</p>','verticalsPageSubtitle');

// Tier sections
rep('<p class="tier-label">Tier 1 — Priority Verticals</p>','<p class="tier-label" data-i18n="verticalsTier1Label">Tier 1 — Priority Verticals</p>','verticalsTier1Label');
rep('<h2 class="tier-title">Production-Ready Industries</h2>','<h2 class="tier-title" data-i18n="verticalsTier1Title">Production-Ready Industries</h2>','verticalsTier1Title');
rep('<p class="tier-desc">Full compliance frameworks, specialized AI agents, and industry-specific integrations.</p>','<p class="tier-desc" data-i18n="verticalsTier1Desc">Full compliance frameworks, specialized AI agents, and industry-specific integrations.</p>','verticalsTier1Desc');
rep('<p class="tier-label">Defense &amp; Critical Infrastructure</p>','<p class="tier-label" data-i18n="verticalsTier2Label">Defense &amp; Critical Infrastructure</p>','verticalsTier2Label');
rep('<h2 class="tier-title">Mission-Critical Industries</h2>','<h2 class="tier-title" data-i18n="verticalsTier2Title">Mission-Critical Industries</h2>','verticalsTier2Title');
rep('<p class="tier-desc">Full 6-layer compliance, specialized agents, and industry-specific decision schemas.</p>','<p class="tier-desc" data-i18n="verticalsTier2Desc">Full 6-layer compliance, specialized agents, and industry-specific decision schemas.</p>','verticalsTier2Desc');
rep('<p class="tier-label">Industrial &amp; Operations</p>','<p class="tier-label" data-i18n="verticalsTier3Label">Industrial &amp; Operations</p>','verticalsTier3Label');
rep('<h2 class="tier-title">Build, Move, Manufacture</h2>','<h2 class="tier-title" data-i18n="verticalsTier3Title">Build, Move, Manufacture</h2>','verticalsTier3Title');
rep('<p class="tier-desc">Full compliance frameworks, decision schemas, and defensible outputs for physical-world industries.</p>','<p class="tier-desc" data-i18n="verticalsTier3Desc">Full compliance frameworks, decision schemas, and defensible outputs for physical-world industries.</p>','verticalsTier3Desc');
rep('<p class="tier-label">Consumer, Services &amp; Specialty</p>','<p class="tier-label" data-i18n="verticalsTier4Label">Consumer, Services &amp; Specialty</p>','verticalsTier4Label');
rep('<h2 class="tier-title">Every Industry, Governed</h2>','<h2 class="tier-title" data-i18n="verticalsTier4Title">Every Industry, Governed</h2>','verticalsTier4Title');
rep('<p class="tier-desc">Full compliance frameworks, decision schemas, and defensible outputs for service and specialty industries.</p>','<p class="tier-desc" data-i18n="verticalsTier4Desc">Full compliance frameworks, decision schemas, and defensible outputs for service and specialty industries.</p>','verticalsTier4Desc');

// Vertical names & taglines
rep('<h3 class="vertical-name">Healthcare / Health Systems</h3>','<h3 class="vertical-name" data-i18n="verticalsHealthcareName">Healthcare / Health Systems</h3>','verticalsHealthcareName');
rep('<p class="vertical-tagline">HIPAA-ready clinical decision intelligence with CMS AI transparency</p>','<p class="vertical-tagline" data-i18n="verticalsHealthcareTagline">HIPAA-ready clinical decision intelligence with CMS AI transparency</p>','verticalsHealthcareTagline');
rep('<h3 class="vertical-name">Financial Services</h3>','<h3 class="vertical-name" data-i18n="verticalsFinanceName">Financial Services</h3>','verticalsFinanceName');
rep('<p class="vertical-tagline">SOX, Basel III/IV, and AML/BSA ready decision intelligence</p>','<p class="vertical-tagline" data-i18n="verticalsFinanceTagline">SOX, Basel III/IV, and AML/BSA ready decision intelligence</p>','verticalsFinanceTagline');
rep('<h3 class="vertical-name">Legal / Law Firms</h3>','<h3 class="vertical-name" data-i18n="verticalsLegalName">Legal / Law Firms</h3>','verticalsLegalName');
rep('<p class="vertical-tagline">Privilege-preserving AI with audit-grade decision packets for legal practice</p>','<p class="vertical-tagline" data-i18n="verticalsLegalTagline">Privilege-preserving AI with audit-grade decision packets for legal practice</p>','verticalsLegalTagline');
rep('<h3 class="vertical-name">Government</h3>','<h3 class="vertical-name" data-i18n="verticalsGovName">Government</h3>','verticalsGovName');
rep('<p class="vertical-tagline">Sovereign AI for policy, procurement, and public sector intelligence</p>','<p class="vertical-tagline" data-i18n="verticalsGovTagline">Sovereign AI for policy, procurement, and public sector intelligence</p>','verticalsGovTagline');
rep('<h3 class="vertical-name">Insurance</h3>','<h3 class="vertical-name" data-i18n="verticalsInsuranceName">Insurance</h3>','verticalsInsuranceName');
rep('<p class="vertical-tagline">Claims &amp; underwriting decision intelligence with bias detection and fairness artifacts</p>','<p class="vertical-tagline" data-i18n="verticalsInsuranceTagline">Claims &amp; underwriting decision intelligence with bias detection and fairness artifacts</p>','verticalsInsuranceTagline');
rep('<h3 class="vertical-name">Pharmaceutical</h3>','<h3 class="vertical-name" data-i18n="verticalsPharmaName">Pharmaceutical</h3>','verticalsPharmaName');
rep('<p class="vertical-tagline">FDA 21 CFR Part 11 ready clinical trial and regulatory intelligence</p>','<p class="vertical-tagline" data-i18n="verticalsPharmaTagline">FDA 21 CFR Part 11 ready clinical trial and regulatory intelligence</p>','verticalsPharmaTagline');
rep('<h3 class="vertical-name">Defense &amp; National Security</h3>','<h3 class="vertical-name" data-i18n="verticalsDefenseName">Defense &amp; National Security</h3>','verticalsDefenseName');
rep('<p class="vertical-tagline">DIU-ready decision intelligence with OPSEC enforcement and classification controls</p>','<p class="vertical-tagline" data-i18n="verticalsDefenseTagline">DIU-ready decision intelligence with OPSEC enforcement and classification controls</p>','verticalsDefenseTagline');
rep('<h3 class="vertical-name">Energy &amp; Utilities</h3>','<h3 class="vertical-name" data-i18n="verticalsEnergyName">Energy &amp; Utilities</h3>','verticalsEnergyName');
rep('<p class="vertical-tagline">Critical infrastructure decision governance with safety-first defaults</p>','<p class="vertical-tagline" data-i18n="verticalsEnergyTagline">Critical infrastructure decision governance with safety-first defaults</p>','verticalsEnergyTagline');
rep('<h3 class="vertical-name">Aerospace</h3>','<h3 class="vertical-name" data-i18n="verticalsAerospaceName">Aerospace</h3>','verticalsAerospaceName');
rep('<p class="vertical-tagline">Aviation safety and certification decision engine for airworthiness governance</p>','<p class="vertical-tagline" data-i18n="verticalsAerospaceTagline">Aviation safety and certification decision engine for airworthiness governance</p>','verticalsAerospaceTagline');
rep('<h3 class="vertical-name">Telecom</h3>','<h3 class="vertical-name" data-i18n="verticalsTelecomName">Telecom</h3>','verticalsTelecomName');
rep('<p class="vertical-tagline">Network and subscriber decision governance with spectrum and privacy compliance</p>','<p class="vertical-tagline" data-i18n="verticalsTelecomTagline">Network and subscriber decision governance with spectrum and privacy compliance</p>','verticalsTelecomTagline');
rep('<h3 class="vertical-name">Manufacturing</h3>','<h3 class="vertical-name" data-i18n="verticalsMfgName">Manufacturing</h3>','verticalsMfgName');
rep('<p class="vertical-tagline">Quality-first decision intelligence with PPAP-ready documentation</p>','<p class="vertical-tagline" data-i18n="verticalsMfgTagline">Quality-first decision intelligence with PPAP-ready documentation</p>','verticalsMfgTagline');
rep('<h3 class="vertical-name">Industrial Services</h3>','<h3 class="vertical-name" data-i18n="verticalsIndustrialName">Industrial Services</h3>','verticalsIndustrialName');
rep('<p class="vertical-tagline">Safety-first decision intelligence with multi-jurisdiction compliance</p>','<p class="vertical-tagline" data-i18n="verticalsIndustrialTagline">Safety-first decision intelligence with multi-jurisdiction compliance</p>','verticalsIndustrialTagline');
rep('<h3 class="vertical-name">Construction</h3>','<h3 class="vertical-name" data-i18n="verticalsConstructionName">Construction</h3>','verticalsConstructionName');
rep('<p class="vertical-tagline">OSHA-ready safety governance with construction-specific audit trails</p>','<p class="vertical-tagline" data-i18n="verticalsConstructionTagline">OSHA-ready safety governance with construction-specific audit trails</p>','verticalsConstructionTagline');
rep('<h3 class="vertical-name">Automotive</h3>','<h3 class="vertical-name" data-i18n="verticalsAutomotiveName">Automotive</h3>','verticalsAutomotiveName');
rep('<p class="vertical-tagline">Vehicle safety and recall governance with NHTSA-ready audit trails</p>','<p class="vertical-tagline" data-i18n="verticalsAutomotiveTagline">Vehicle safety and recall governance with NHTSA-ready audit trails</p>','verticalsAutomotiveTagline');
rep('<h3 class="vertical-name">Transportation &amp; Logistics</h3>','<h3 class="vertical-name" data-i18n="verticalsTransportName">Transportation &amp; Logistics</h3>','verticalsTransportName');
rep('<p class="vertical-tagline">Fleet safety governance with DOT/FMCSA compliance and hazmat audit trails</p>','<p class="vertical-tagline" data-i18n="verticalsTransportTagline">Fleet safety governance with DOT/FMCSA compliance and hazmat audit trails</p>','verticalsTransportTagline');
rep('<h3 class="vertical-name">Agriculture &amp; AgTech</h3>','<h3 class="vertical-name" data-i18n="verticalsAgriName">Agriculture &amp; AgTech</h3>','verticalsAgriName');
rep('<p class="vertical-tagline">Precision agriculture with environmental compliance and subsidy governance</p>','<p class="vertical-tagline" data-i18n="verticalsAgriTagline">Precision agriculture with environmental compliance and subsidy governance</p>','verticalsAgriTagline');
rep('<h3 class="vertical-name">Technology / SaaS</h3>','<h3 class="vertical-name" data-i18n="verticalsTechName">Technology / SaaS</h3>','verticalsTechName');
rep('<p class="vertical-tagline">AI governance for AI builders — audit-ready incident response and model deployment</p>','<p class="vertical-tagline" data-i18n="verticalsTechTagline">AI governance for AI builders — audit-ready incident response and model deployment</p>','verticalsTechTagline');
rep('<h3 class="vertical-name">Retail &amp; E-Commerce</h3>','<h3 class="vertical-name" data-i18n="verticalsRetailName">Retail &amp; E-Commerce</h3>','verticalsRetailName');
rep('<p class="vertical-tagline">Pricing ethics governance with consumer protection and supply chain compliance</p>','<p class="vertical-tagline" data-i18n="verticalsRetailTagline">Pricing ethics governance with consumer protection and supply chain compliance</p>','verticalsRetailTagline');
rep('<h3 class="vertical-name">Education</h3>','<h3 class="vertical-name" data-i18n="verticalsEducationName">Education</h3>','verticalsEducationName');
rep('<p class="vertical-tagline">Assessment fairness engine with equity-gated admissions and FERPA compliance</p>','<p class="vertical-tagline" data-i18n="verticalsEducationTagline">Assessment fairness engine with equity-gated admissions and FERPA compliance</p>','verticalsEducationTagline');
rep('<h3 class="vertical-name">Real Estate</h3>','<h3 class="vertical-name" data-i18n="verticalsRealEstateName">Real Estate</h3>','verticalsRealEstateName');
rep('<p class="vertical-tagline">Fair lending decision trails with valuation governance and bias detection</p>','<p class="vertical-tagline" data-i18n="verticalsRealEstateTagline">Fair lending decision trails with valuation governance and bias detection</p>','verticalsRealEstateTagline');
rep('<h3 class="vertical-name">Hospitality</h3>','<h3 class="vertical-name" data-i18n="verticalsHospitalityName">Hospitality</h3>','verticalsHospitalityName');
rep('<p class="vertical-tagline">Guest safety governance with food safety, ADA, and liquor compliance</p>','<p class="vertical-tagline" data-i18n="verticalsHospitalityTagline">Guest safety governance with food safety, ADA, and liquor compliance</p>','verticalsHospitalityTagline');
rep('<h3 class="vertical-name">Media &amp; Entertainment</h3>','<h3 class="vertical-name" data-i18n="verticalsMediaName">Media &amp; Entertainment</h3>','verticalsMediaName');
rep('<p class="vertical-tagline">Content governance with child safety, rights management, and moderation</p>','<p class="vertical-tagline" data-i18n="verticalsMediaTagline">Content governance with child safety, rights management, and moderation</p>','verticalsMediaTagline');
rep('<h3 class="vertical-name">Sports / Football Clubs</h3>','<h3 class="vertical-name" data-i18n="verticalsSportsName">Sports / Football Clubs</h3>','verticalsSportsName');
rep('<p class="vertical-tagline">Transfer governance, PSR/FFP compliance monitoring, and decision continuity through manager turnover</p>','<p class="vertical-tagline" data-i18n="verticalsSportsTagline">Transfer governance, PSR/FFP compliance monitoring, and decision continuity through manager turnover</p>','verticalsSportsTagline');

// CTA box
rep('<h3>Need a Custom Configuration?</h3>','<h3 data-i18n="verticalsCtaTitle">Need a Custom Configuration?</h3>','verticalsCtaTitle');
rep('<p>Every vertical ships with full compliance frameworks and decision schemas. We can further customize agents, workflows, and integrations for your specific regulatory environment.</p>','<p data-i18n="verticalsCtaDesc">Every vertical ships with full compliance frameworks and decision schemas. We can further customize agents, workflows, and integrations for your specific regulatory environment.</p>','verticalsCtaDesc');
rep('<a href="briefing.html" class="cta-btn">Request Custom Briefing →</a>','<a href="briefing.html" class="cta-btn" data-i18n="verticalsCtaBtn">Request Custom Briefing →</a>','verticalsCtaBtn');

// Footer
rep('<p class="footer-outcome">Ready to own your AI decisions—and prove them to regulators?</p>','<p class="footer-outcome" data-i18n="footerOutcome">Ready to own your AI decisions—and prove them to regulators?</p>','footerOutcome');
rep('<a href="pilot.html" class="cta-button secondary">See Results in 90 Days</a>','<a href="pilot.html" class="cta-button secondary" data-i18n="footerSeeResults">See Results in 90 Days</a>','footerSeeResults');
rep('<p class="footer-status" style="font-family: var(--font-mono); font-size: 0.7rem; color: #2ecc71; margin-top: 16px; letter-spacing: 0.05em;">SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED</p>','<p class="footer-status" style="font-family: var(--font-mono); font-size: 0.7rem; color: #2ecc71; margin-top: 16px; letter-spacing: 0.05em;" data-i18n="footerStatus">SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED</p>','footerStatus');

fs.writeFileSync(FILE, html, 'utf8');
console.log('Verticals done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
