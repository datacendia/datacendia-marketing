/**
 * wire-architecture.js: Wire data-i18n into architecture.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'architecture.html');
let html = fs.readFileSync(FILE, 'utf8');
let count = 0;
function rep(o, n, k) {
  if (!html.includes(o)) { console.log('NOT FOUND: ' + k); return; }
  html = html.replace(o, n); count++;
}

// Nav (shared keys already exist in translations)
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
rep('<a href="index.html" class="back-link">← Return to Datacendia</a>','<a href="index.html" class="back-link" data-i18n="archBackLink">← Return to Datacendia</a>','archBackLink');
rep('<h1 class="page-title">The Datacendia Cortex™</h1>','<h1 class="page-title" data-i18n="archPageTitle">The Datacendia Cortex™</h1>','archPageTitle');
rep('<p class="page-subtitle">A decision operating system built on 8 proprietary pillars. Not a wrapper. Not an API proxy. A complete cognitive infrastructure for sovereign enterprises.</p>','<p class="page-subtitle" data-i18n="archPageSubtitle">A decision operating system built on 8 proprietary pillars. Not a wrapper. Not an API proxy. A complete cognitive infrastructure for sovereign enterprises.</p>','archPageSubtitle');

// Pillar taglines
rep('<p class="pillar-tagline">The Cognitive Engine</p>','<p class="pillar-tagline" data-i18n="archP1Tagline">The Cognitive Engine</p>','archP1Tagline');
rep('<p class="pillar-tagline">The Conscience</p>','<p class="pillar-tagline" data-i18n="archP2Tagline">The Conscience</p>','archP2Tagline');
rep('<p class="pillar-tagline">The Shield</p>','<p class="pillar-tagline" data-i18n="archP3Tagline">The Shield</p>','archP3Tagline');
rep('<p class="pillar-tagline">The Truth</p>','<p class="pillar-tagline" data-i18n="archP4Tagline">The Truth</p>','archP4Tagline');
rep('<p class="pillar-tagline">The Interface</p>','<p class="pillar-tagline" data-i18n="archP5Tagline">The Interface</p>','archP5Tagline');
rep('<p class="pillar-tagline">The Foresight</p>','<p class="pillar-tagline" data-i18n="archP6Tagline">The Foresight</p>','archP6Tagline');
rep('<p class="pillar-tagline">The Hands</p>','<p class="pillar-tagline" data-i18n="archP7Tagline">The Hands</p>','archP7Tagline');
rep('<p class="pillar-tagline">The Pulse</p>','<p class="pillar-tagline" data-i18n="archP8Tagline">The Pulse</p>','archP8Tagline');
rep('<p class="pillar-tagline">Beyond the 8 Pillars</p>','<p class="pillar-tagline" data-i18n="archSovTagline">Beyond the 8 Pillars</p>','archSovTagline');

// Module names
rep('<div class="module-name">The Council</div>','<div class="module-name" data-i18n="archP1M1Name">The Council</div>','archP1M1Name');
rep('<div class="module-name">RedTeam Module</div>','<div class="module-name" data-i18n="archP1M2Name">RedTeam Module</div>','archP1M2Name');
rep('<div class="module-name">Analyst Module</div>','<div class="module-name" data-i18n="archP1M3Name">Analyst Module</div>','archP1M3Name');
rep('<div class="module-name">Mirror Module</div>','<div class="module-name" data-i18n="archP1M4Name">Mirror Module</div>','archP1M4Name');
rep('<div class="module-name">Synthesis Engine</div>','<div class="module-name" data-i18n="archP1M5Name">Synthesis Engine</div>','archP1M5Name');
rep('<div class="module-name">CendiaVeto™</div>','<div class="module-name" data-i18n="archP2M1Name">CendiaVeto™</div>','archP2M1Name');
rep('<div class="module-name">The Spectator</div>','<div class="module-name" data-i18n="archP2M2Name">The Spectator</div>','archP2M2Name');
rep('<div class="module-name">Compliance Oracle</div>','<div class="module-name" data-i18n="archP2M3Name">Compliance Oracle</div>','archP2M3Name');
rep('<div class="module-name">Audit Provenance™</div>','<div class="module-name" data-i18n="archP3M1Name">Audit Provenance™</div>','archP3M1Name');
rep('<div class="module-name">Anonymizer Cortex</div>','<div class="module-name" data-i18n="archP3M2Name">Anonymizer Cortex</div>','archP3M2Name');
rep('<div class="module-name">Air-Gap Protocol</div>','<div class="module-name" data-i18n="archP3M3Name">Air-Gap Protocol</div>','archP3M3Name');
rep('<div class="module-name">Shadow Mode Shredder</div>','<div class="module-name" data-i18n="archP3M4Name">Shadow Mode Shredder</div>','archP3M4Name');
rep('<div class="module-name">CendiaChronos™</div>','<div class="module-name" data-i18n="archP4M1Name">CendiaChronos™</div>','archP4M1Name');
rep('<div class="module-name">Knowledge Graph</div>','<div class="module-name" data-i18n="archP4M2Name">Knowledge Graph</div>','archP4M2Name');
rep('<div class="module-name">Source Attribution</div>','<div class="module-name" data-i18n="archP4M3Name">Source Attribution</div>','archP4M3Name');
rep('<div class="module-name">Data Broker</div>','<div class="module-name" data-i18n="archP4M4Name">Data Broker</div>','archP4M4Name');
rep('<div class="module-name">NLP Command Processor</div>','<div class="module-name" data-i18n="archP5M1Name">NLP Command Processor</div>','archP5M1Name');
rep('<div class="module-name">Voice Biometrics</div>','<div class="module-name" data-i18n="archP5M2Name">Voice Biometrics</div>','archP5M2Name');
rep('<div class="module-name">Sovereign Response Generator</div>','<div class="module-name" data-i18n="archP5M3Name">Sovereign Response Generator</div>','archP5M3Name');
rep('<div class="module-name">Scenario Simulator</div>','<div class="module-name" data-i18n="archP6M1Name">Scenario Simulator</div>','archP6M1Name');
rep('<div class="module-name">Trend Extrapolator</div>','<div class="module-name" data-i18n="archP6M2Name">Trend Extrapolator</div>','archP6M2Name');
rep('<div class="module-name">The Actuator</div>','<div class="module-name" data-i18n="archP7M1Name">The Actuator</div>','archP7M1Name');
rep('<div class="module-name">Connector Mesh</div>','<div class="module-name" data-i18n="archP7M2Name">Connector Mesh</div>','archP7M2Name');
rep('<div class="module-name">Drift Detector</div>','<div class="module-name" data-i18n="archP8M1Name">Drift Detector</div>','archP8M1Name');
rep('<div class="module-name">Agent Sanity Check</div>','<div class="module-name" data-i18n="archP8M2Name">Agent Sanity Check</div>','archP8M2Name');
rep('<div class="module-name">Resource Monitor</div>','<div class="module-name" data-i18n="archP8M3Name">Resource Monitor</div>','archP8M3Name');
rep('<div class="module-name">CendiaDataDiode™</div>','<div class="module-name" data-i18n="archSovM1Name">CendiaDataDiode™</div>','archSovM1Name');
rep('<div class="module-name">CendiaLocalRLHF™</div>','<div class="module-name" data-i18n="archSovM2Name">CendiaLocalRLHF™</div>','archSovM2Name');
rep('<div class="module-name">CendiaFederatedMesh™</div>','<div class="module-name" data-i18n="archSovM3Name">CendiaFederatedMesh™</div>','archSovM3Name');
rep('<div class="module-name">CendiaQuantumKMS™</div>','<div class="module-name" data-i18n="archSovM4Name">CendiaQuantumKMS™</div>','archSovM4Name');
rep('<div class="module-name">CendiaCourt™</div>','<div class="module-name" data-i18n="archSovM5Name">CendiaCourt™</div>','archSovM5Name');
rep('<div class="module-name">CendiaTPM™</div>','<div class="module-name" data-i18n="archSovM6Name">CendiaTPM™</div>','archSovM6Name');
rep('<div class="module-name">CendiaTimeLock™</div>','<div class="module-name" data-i18n="archSovM7Name">CendiaTimeLock™</div>','archSovM7Name');
rep('<div class="module-name">CendiaCanary™</div>','<div class="module-name" data-i18n="archSovM8Name">CendiaCanary™</div>','archSovM8Name');

// Sovereign Architecture section title
rep('<h2 class="pillar-name">Sovereign Architecture Patterns</h2>','<h2 class="pillar-name" data-i18n="archSovTitle">Sovereign Architecture Patterns</h2>','archSovTitle');

// Moat section
rep('<h2>The Defensive Moat</h2>','<h2 data-i18n="archMoatTitle">The Defensive Moat</h2>','archMoatTitle');
rep('<div class="moat-item-pillar">Ethics Pillar</div>','<div class="moat-item-pillar" data-i18n="archMoatEthics">Ethics Pillar</div>','archMoatEthics');
rep('<div class="moat-item-pillar">Guard Pillar</div>','<div class="moat-item-pillar" data-i18n="archMoatGuard">Guard Pillar</div>','archMoatGuard');
rep('<div class="moat-item-pillar">Lineage Pillar</div>','<div class="moat-item-pillar" data-i18n="archMoatLineage">Lineage Pillar</div>','archMoatLineage');
rep('<div class="moat-item-pillar">Agents Pillar</div>','<div class="moat-item-pillar" data-i18n="archMoatAgents">Agents Pillar</div>','archMoatAgents');

// Interactive diagrams section
rep('<h2 style="font-family:var(--font-display); font-size:1.4rem; font-weight:300; margin-bottom:8px; text-align:center;">Interactive Architecture Diagrams</h2>','<h2 style="font-family:var(--font-display); font-size:1.4rem; font-weight:300; margin-bottom:8px; text-align:center;" data-i18n="archDiagsTitle">Interactive Architecture Diagrams</h2>','archDiagsTitle');
rep('<p style="font-size:0.8rem; color:var(--color-text-dim); text-align:center; margin-bottom:20px;">Click any component to learn what it is, what it does, and how it\'s used.</p>','<p style="font-size:0.8rem; color:var(--color-text-dim); text-align:center; margin-bottom:20px;" data-i18n="archDiagsDesc">Click any component to learn what it is, what it does, and how it\'s used.</p>','archDiagsDesc');

// Contact box
rep('<p>Ready to see the Cortex™ in action?</p>','<p data-i18n="archCtaTitle">Ready to see the Cortex™ in action?</p>','archCtaTitle');

fs.writeFileSync(FILE, html, 'utf8');
console.log('architecture.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
