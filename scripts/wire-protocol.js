/**
 * wire-protocol.js: Wire data-i18n into protocol.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'protocol.html');
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
rep('<a href="index.html" class="back-link">← Return to Datacendia</a>','<a href="index.html" class="back-link" data-i18n="protBackLink">← Return to Datacendia</a>','protBackLink');
rep('<h1 class="page-title">Architecture Protocol</h1>','<h1 class="page-title" data-i18n="protPageTitle">Architecture Protocol</h1>','protPageTitle');
rep('<p class="page-subtitle">The definitive technical specification for the Datacendia Cortex. This document serves as the authoritative reference for system architecture, data flows, security boundaries, and integration protocols.</p>','<p class="page-subtitle" data-i18n="protPageSubtitle">The definitive technical specification for the Datacendia Cortex. This document serves as the authoritative reference for system architecture, data flows, security boundaries, and integration protocols.</p>','protPageSubtitle');
rep('<span class="version-badge">Version 1.0 · January 2026</span>','<span class="version-badge" data-i18n="protVersionBadge">Version 1.0 · January 2026</span>','protVersionBadge');

// Table of Contents
rep('<h2>Table of Contents</h2>','<h2 data-i18n="protTocTitle">Table of Contents</h2>','protTocTitle');
rep('<span class="toc-number">1</span> System Overview','<span class="toc-number">1</span> <span data-i18n="protToc1">System Overview</span>','protToc1');
rep('<span class="toc-number">2</span> Design Principles','<span class="toc-number">2</span> <span data-i18n="protToc2">Design Principles</span>','protToc2');
rep('<span class="toc-number">3</span> The Eight Pillars','<span class="toc-number">3</span> <span data-i18n="protToc3">The Eight Pillars</span>','protToc3');
rep('<span class="toc-number">4</span> Data Flow Architecture','<span class="toc-number">4</span> <span data-i18n="protToc4">Data Flow Architecture</span>','protToc4');
rep('<span class="toc-number">5</span> Deliberation Protocol','<span class="toc-number">5</span> <span data-i18n="protToc5">Deliberation Protocol</span>','protToc5');
rep('<span class="toc-number">6</span> Security Model','<span class="toc-number">6</span> <span data-i18n="protToc6">Security Model</span>','protToc6');
rep('<span class="toc-number">7</span> Audit & Lineage','<span class="toc-number">7</span> <span data-i18n="protToc7">Audit & Lineage</span>','protToc7');
rep('<span class="toc-number">8</span> Deployment Modes','<span class="toc-number">8</span> <span data-i18n="protToc8">Deployment Modes</span>','protToc8');
rep('<span class="toc-number">9</span> Integration Protocol','<span class="toc-number">9</span> <span data-i18n="protToc9">Integration Protocol</span>','protToc9');
rep('<span class="toc-number">10</span> Known Limits','<span class="toc-number">10</span> <span data-i18n="protToc10">Known Limits</span>','protToc10');

// Section titles
rep('<h2 class="section-title">System Overview</h2>','<h2 class="section-title" data-i18n="protS1Title">System Overview</h2>','protS1Title');
rep('<h2 class="section-title">Design Principles</h2>','<h2 class="section-title" data-i18n="protS2Title">Design Principles</h2>','protS2Title');
rep('<h2 class="section-title">The Eight Pillars</h2>','<h2 class="section-title" data-i18n="protS3Title">The Eight Pillars</h2>','protS3Title');
rep('<h2 class="section-title">Data Flow Architecture</h2>','<h2 class="section-title" data-i18n="protS4Title">Data Flow Architecture</h2>','protS4Title');
rep('<h2 class="section-title">Deliberation Protocol</h2>','<h2 class="section-title" data-i18n="protS5Title">Deliberation Protocol</h2>','protS5Title');
rep('<h2 class="section-title">Security Model</h2>','<h2 class="section-title" data-i18n="protS6Title">Security Model</h2>','protS6Title');
rep('<h2 class="section-title">Audit & Lineage</h2>','<h2 class="section-title" data-i18n="protS7Title">Audit & Lineage</h2>','protS7Title');
rep('<h2 class="section-title">Deployment Modes</h2>','<h2 class="section-title" data-i18n="protS8Title">Deployment Modes</h2>','protS8Title');
rep('<h2 class="section-title">Integration Protocol</h2>','<h2 class="section-title" data-i18n="protS9Title">Integration Protocol</h2>','protS9Title');
rep('<h2 class="section-title">Known Limits</h2>','<h2 class="section-title" data-i18n="protS10Title">Known Limits</h2>','protS10Title');

// Section 2 sub-headings
rep('<h3>2.1 Sovereignty Over Convenience</h3>','<h3 data-i18n="protS2H1">2.1 Sovereignty Over Convenience</h3>','protS2H1');
rep('<h3>2.2 Proof Over Trust</h3>','<h3 data-i18n="protS2H2">2.2 Proof Over Trust</h3>','protS2H2');
rep('<h3>2.3 Dissent Over Consensus</h3>','<h3 data-i18n="protS2H3">2.3 Dissent Over Consensus</h3>','protS2H3');
rep('<h3>2.4 Depth Over Wrappers</h3>','<h3 data-i18n="protS2H4">2.4 Depth Over Wrappers</h3>','protS2H4');

// Section 4 sub-headings
rep('<h3>4.1 Ingestion Phase</h3>','<h3 data-i18n="protS4H1">4.1 Ingestion Phase</h3>','protS4H1');
rep('<h3>4.2 Processing Phase</h3>','<h3 data-i18n="protS4H2">4.2 Processing Phase</h3>','protS4H2');
rep('<h3>4.3 Synthesis Phase</h3>','<h3 data-i18n="protS4H3">4.3 Synthesis Phase</h3>','protS4H3');
rep('<h3>4.4 Veto Phase</h3>','<h3 data-i18n="protS4H4">4.4 Veto Phase</h3>','protS4H4');
rep('<h3>4.5 Output Phase</h3>','<h3 data-i18n="protS4H5">4.5 Output Phase</h3>','protS4H5');

// Section 5 sub-headings
rep('<h3>5.1 Agent Configuration</h3>','<h3 data-i18n="protS5H1">5.1 Agent Configuration</h3>','protS5H1');
rep('<h3>5.2 Deliberation Rounds</h3>','<h3 data-i18n="protS5H2">5.2 Deliberation Rounds</h3>','protS5H2');
rep('<h3>5.3 Deadlock Handling</h3>','<h3 data-i18n="protS5H3">5.3 Deadlock Handling</h3>','protS5H3');

// Section 6 sub-headings
rep('<h3>6.1 Trust Boundaries</h3>','<h3 data-i18n="protS6H1">6.1 Trust Boundaries</h3>','protS6H1');
rep('<h3>6.2 Encryption Standards</h3>','<h3 data-i18n="protS6H2">6.2 Encryption Standards</h3>','protS6H2');
rep('<h3>6.3 Authentication & Authorization</h3>','<h3 data-i18n="protS6H3">6.3 Authentication & Authorization</h3>','protS6H3');
rep('<h3>6.4 Air-Gap Protocol</h3>','<h3 data-i18n="protS6H4">6.4 Air-Gap Protocol</h3>','protS6H4');

// Section 7 sub-headings
rep('<h3>7.1 Decision Trace Structure</h3>','<h3 data-i18n="protS7H1">7.1 Decision Trace Structure</h3>','protS7H1');
rep('<h3>7.2 Audit Provenance Ledger</h3>','<h3 data-i18n="protS7H2">7.2 Audit Provenance Ledger</h3>','protS7H2');
rep('<h3>7.3 CendiaChronos Time-Travel</h3>','<h3 data-i18n="protS7H3">7.3 CendiaChronos Time-Travel</h3>','protS7H3');

// Section 8 sub-headings
rep('<h3>8.1 Hardware Requirements</h3>','<h3 data-i18n="protS8H1">8.1 Hardware Requirements</h3>','protS8H1');
rep('<h3>8.2 Container Architecture</h3>','<h3 data-i18n="protS8H2">8.2 Container Architecture</h3>','protS8H2');

// Section 9 sub-headings
rep('<h3>9.1 API Surface</h3>','<h3 data-i18n="protS9H1">9.1 API Surface</h3>','protS9H1');
rep('<h3>9.2 Connector Mesh</h3>','<h3 data-i18n="protS9H2">9.2 Connector Mesh</h3>','protS9H2');
rep('<h3>9.3 Webhook Events</h3>','<h3 data-i18n="protS9H3">9.3 Webhook Events</h3>','protS9H3');

// Section 10 sub-headings
rep('<h3>10.1 Technical Limits</h3>','<h3 data-i18n="protS10H1">10.1 Technical Limits</h3>','protS10H1');
rep('<h3>10.2 Operational Limits</h3>','<h3 data-i18n="protS10H2">10.2 Operational Limits</h3>','protS10H2');
rep('<h3>10.3 What The Cortex Does Not Do</h3>','<h3 data-i18n="protS10H3">10.3 What The Cortex Does Not Do</h3>','protS10H3');

// Callout titles
rep('<div class="callout-title">Critical Constraint</div>','<div class="callout-title" data-i18n="protCallout1">Critical Constraint</div>','protCallout1');
rep('<div class="callout-title">Design Rationale</div>','<div class="callout-title" data-i18n="protCallout2">Design Rationale</div>','protCallout2');
rep('<div class="callout-title">The Honesty Principle</div>','<div class="callout-title" data-i18n="protCallout3">The Honesty Principle</div>','protCallout3');

// Diagram caption
rep('<p class="diagram-caption">Figure 4.1: Core data flow through the Datacendia Cortex</p>','<p class="diagram-caption" data-i18n="protDiagCaption">Figure 4.1: Core data flow through the Datacendia Cortex</p>','protDiagCaption');

fs.writeFileSync(FILE, html, 'utf8');
console.log('protocol.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
