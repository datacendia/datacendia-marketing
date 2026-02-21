/**
 * wire-pc-p1.js: Nav + header stats + Tier 1 pillars + primitives strip
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'platform-capabilities.html');
let html = fs.readFileSync(FILE, 'utf8');
let count = 0;
function rep(o, n, k) {
  if (!html.includes(o)) { console.log('NOT FOUND: ' + k); return; }
  html = html.replace(o, n); count++;
}

// Nav
rep('<p class="tagline-sub">Decision Crisis Immunization Infrastructure</p>','<p class="tagline-sub" data-i18n="tagline">Decision Crisis Immunization Infrastructure</p>','tagline');
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
rep('<a href="index.html" style="display:inline-block; margin-bottom:32px; font-size:0.75rem; color:var(--color-text-dim); text-decoration:none;">&larr; Return to Datacendia</a>','<a href="index.html" style="display:inline-block; margin-bottom:32px; font-size:0.75rem; color:var(--color-text-dim); text-decoration:none;" data-i18n="pcReturnLink">← Return to Datacendia</a>','pcReturnLink');
rep('<h1>Platform Capability Map</h1>','<h1 data-i18n="pcHeaderTitle">Platform Capability Map</h1>','pcHeaderTitle');
rep('<p class="pc-sub">12 pillars across 3 tiers. 9 crisis immunization primitives. 7 premium add-ons. Sovereign deployment on your infrastructure.</p>','<p class="pc-sub" data-i18n="pcHeaderSub">12 pillars across 3 tiers. 9 crisis immunization primitives. 7 premium add-ons. Sovereign deployment on your infrastructure.</p>','pcHeaderSub');
rep('<span class="pc-stat-label">Pillars</span>','<span class="pc-stat-label" data-i18n="pcStatPillars">Pillars</span>','pcStatPillars');
rep('<span class="pc-stat-label">Tiers</span>','<span class="pc-stat-label" data-i18n="pcStatTiers">Tiers</span>','pcStatTiers');
rep('<span class="pc-stat-label">DCII Primitives</span>','<span class="pc-stat-label" data-i18n="pcStatPrimitives">DCII Primitives</span>','pcStatPrimitives');
rep('<span class="pc-stat-label">Premium Add-Ons</span>','<span class="pc-stat-label" data-i18n="pcStatAddons">Premium Add-Ons</span>','pcStatAddons');
rep('<span class="pc-stat-label">Deep Verticals</span>','<span class="pc-stat-label" data-i18n="pcStatVerticals">Deep Verticals</span>','pcStatVerticals');
rep('<span class="pc-stat-label">Deployment Modes</span>','<span class="pc-stat-label" data-i18n="pcStatDeploy">Deployment Modes</span>','pcStatDeploy');

// Tier 1 header
rep('<span class="tier-badge tier-badge--gold">Tier 1</span>','<span class="tier-badge tier-badge--gold" data-i18n="pcTier1Badge">Tier 1</span>','pcTier1Badge');
rep('<h2 class="pc-tier-title">Foundation</h2>','<h2 class="pc-tier-title" data-i18n="pcTier1Title">Foundation</h2>','pcTier1Title');
rep('<p class="pc-tier-flow">Make decisions &rarr; Understand them &rarr; Prove them</p>','<p class="pc-tier-flow" data-i18n="pcTier1Flow">Make decisions → Understand them → Prove them</p>','pcTier1Flow');

// Pillar 1 — The Council
rep('<div class="p-num">Pillar 1</div>','<div class="p-num" data-i18n="pcP1Num">Pillar 1</div>','pcP1Num');
rep('<div class="p-tag">Multi-Agent Deliberation Engine</div>','<div class="p-tag" data-i18n="pcP1Tag">Multi-Agent Deliberation Engine</div>','pcP1Tag');
rep('<p class="p-desc">15 C-suite AI agents debate every decision from their domain &mdash; surfacing blind spots, conflicts, and consensus before you commit.</p>','<p class="p-desc" data-i18n="pcP1Desc">15 C-suite AI agents debate every decision from their domain — surfacing blind spots, conflicts, and consensus before you commit.</p>','pcP1Desc');
rep('<li>15 core agents (CFO, CLO, CISO, CTO, etc.)</li>','<li data-i18n="pcP1F1">15 core agents (CFO, CLO, CISO, CTO, etc.)</li>','pcP1F1');
rep('<li>35+ deliberation modes</li>','<li data-i18n="pcP1F2">35+ deliberation modes</li>','pcP1F2');
rep('<li>60-trait personality system per agent</li>','<li data-i18n="pcP1F3">60-trait personality system per agent</li>','pcP1F3');
rep('<li>Live deliberation with 3D avatars</li>','<li data-i18n="pcP1F4">Live deliberation with 3D avatars</li>','pcP1F4');
rep('<li>Cross-examination &amp; formal dissent</li>','<li data-i18n="pcP1F5">Cross-examination &amp; formal dissent</li>','pcP1F5');
rep('<li>Consensus scoring &amp; confidence metrics</li>','<li data-i18n="pcP1F6">Consensus scoring &amp; confidence metrics</li>','pcP1F6');
rep('<li>Decision Replay Theater&trade;</li>','<li data-i18n="pcP1F7">Decision Replay Theater™</li>','pcP1F7');
rep('<a href="resources/the-council.html" class="p-link">Learn more &rarr;</a>','<a href="resources/the-council.html" class="p-link" data-i18n="pcP1Link">Learn more →</a>','pcP1Link');

// Pillar 2 — Decide
rep('<div class="p-num">Pillar 2</div>','<div class="p-num" data-i18n="pcP2Num">Pillar 2</div>','pcP2Num');
rep('<div class="p-tag">Decision Intelligence Suite</div>','<div class="p-tag" data-i18n="pcP2Tag">Decision Intelligence Suite</div>','pcP2Tag');
rep('<p class="p-desc">Intelligence for every decision &mdash; past, present, and future. Time machines, failure prediction, consequence mapping, and explainability.</p>','<p class="p-desc" data-i18n="pcP2Desc">Intelligence for every decision — past, present, and future. Time machines, failure prediction, consequence mapping, and explainability.</p>','pcP2Desc');
rep('<li>CendiaChronos&trade; divergent future simulation</li>','<li data-i18n="pcP2F1">CendiaChronos™ divergent future simulation</li>','pcP2F1');
rep('<li>PreMortem&trade; failure prediction</li>','<li data-i18n="pcP2F2">PreMortem™ failure prediction</li>','pcP2F2');
rep('<li>Decision Debt&trade; (cost of inaction)</li>','<li data-i18n="pcP2F3">Decision Debt™ (cost of inaction)</li>','pcP2F3');
rep('<li>CendiaCascade&trade; butterfly effect engine</li>','<li data-i18n="pcP2F4">CendiaCascade™ butterfly effect engine</li>','pcP2F4');
rep('<li>CendiaLens&trade; token-level AI explainability</li>','<li data-i18n="pcP2F5">CendiaLens™ token-level AI explainability</li>','pcP2F5');
rep('<li>Ghost Board&trade; lightweight red-teaming</li>','<li data-i18n="pcP2F6">Ghost Board™ lightweight red-teaming</li>','pcP2F6');
rep('<li>CendiaLineage&trade; decision tracing</li>','<li data-i18n="pcP2F7">CendiaLineage™ decision tracing</li>','pcP2F7');
rep('<a href="demos.html" class="p-link">See demos &rarr;</a>','<a href="demos.html" class="p-link" data-i18n="pcP2Link">See demos →</a>','pcP2Link');

// Pillar 3 — DCII
rep('<div class="p-num">Pillar 3</div>','<div class="p-num" data-i18n="pcP3Num">Pillar 3</div>','pcP3Num');
rep('<div class="p-tag">Crisis Immunization + Evidence Infrastructure</div>','<div class="p-tag" data-i18n="pcP3Tag">Crisis Immunization + Evidence Infrastructure</div>','pcP3Tag');
rep('<p class="p-desc">The 9 primitives + cryptographic proof infrastructure. When regulators challenge your decisions, DCII is what you show them.</p>','<p class="p-desc" data-i18n="pcP3Desc">The 9 primitives + cryptographic proof infrastructure. When regulators challenge your decisions, DCII is what you show them.</p>','pcP3Desc');
rep('<li>9 crisis immunization primitives</li>','<li data-i18n="pcP3F1">9 crisis immunization primitives</li>','pcP3F1');
rep('<li>CendiaVault&trade; immutable evidence store</li>','<li data-i18n="pcP3F2">CendiaVault™ immutable evidence store</li>','pcP3F2');
rep('<li>CendiaNotary&trade; cryptographic signing</li>','<li data-i18n="pcP3F3">CendiaNotary™ cryptographic signing</li>','pcP3F3');
rep('<li>Regulator&rsquo;s Receipt&trade; (1-click PDF)</li>','<li data-i18n="pcP3F4">Regulator\'s Receipt™ (1-click PDF)</li>','pcP3F4');
rep('<li>IISS&trade; institutional resilience scoring</li>','<li data-i18n="pcP3F5">IISS™ institutional resilience scoring</li>','pcP3F5');
rep('<li>CendiaMediaAuth&trade; deepfake detection</li>','<li data-i18n="pcP3F6">CendiaMediaAuth™ deepfake detection</li>','pcP3F6');
rep('<li>Post-quantum key management</li>','<li data-i18n="pcP3F7">Post-quantum key management</li>','pcP3F7');
rep('<a href="dcii.html" class="p-link">Learn the framework &rarr;</a>','<a href="dcii.html" class="p-link" data-i18n="pcP3Link">Learn the framework →</a>','pcP3Link');

// Primitives strip
rep('<p style="text-align:center; font-size:0.7rem; color:var(--color-text-dim); margin-top:20px; text-transform:uppercase; letter-spacing:0.12em;">The 9 Crisis Immunization Primitives</p>','<p style="text-align:center; font-size:0.7rem; color:var(--color-text-dim); margin-top:20px; text-transform:uppercase; letter-spacing:0.12em;" data-i18n="pcPrimitivesLabel">The 9 Crisis Immunization Primitives</p>','pcPrimitivesLabel');
rep('<div class="prim-label">Discovery-Time Proof</div>','<div class="prim-label" data-i18n="pcPrim1Label">Discovery-Time Proof</div>','pcPrim1Label');
rep('<div class="prim-desc">Cryptographic timestamps proving when knowledge became actionable</div>','<div class="prim-desc" data-i18n="pcPrim1Desc">Cryptographic timestamps proving when knowledge became actionable</div>','pcPrim1Desc');
rep('<div class="prim-label">Deliberation Capture</div>','<div class="prim-label" data-i18n="pcPrim2Label">Deliberation Capture</div>','pcPrim2Label');
rep('<div class="prim-desc">Multi-agent, multi-perspective decision process recording</div>','<div class="prim-desc" data-i18n="pcPrim2Desc">Multi-agent, multi-perspective decision process recording</div>','pcPrim2Desc');
rep('<div class="prim-label">Override Accountability</div>','<div class="prim-label" data-i18n="pcPrim3Label">Override Accountability</div>','pcPrim3Label');
rep('<div class="prim-desc">Non-suppressible tracking of recommendation overrides</div>','<div class="prim-desc" data-i18n="pcPrim3Desc">Non-suppressible tracking of recommendation overrides</div>','pcPrim3Desc');
rep('<div class="prim-label">Continuity Memory</div>','<div class="prim-label" data-i18n="pcPrim4Label">Continuity Memory</div>','pcPrim4Label');
rep('<div class="prim-desc">Personnel-independent institutional knowledge preservation</div>','<div class="prim-desc" data-i18n="pcPrim4Desc">Personnel-independent institutional knowledge preservation</div>','pcPrim4Desc');
rep('<div class="prim-label">Drift Detection</div>','<div class="prim-label" data-i18n="pcPrim5Label">Drift Detection</div>','pcPrim5Label');
rep('<div class="prim-desc">Continuous compliance degradation monitoring</div>','<div class="prim-desc" data-i18n="pcPrim5Desc">Continuous compliance degradation monitoring</div>','pcPrim5Desc');
rep('<div class="prim-label">Cognitive Bias Mitigation</div>','<div class="prim-label" data-i18n="pcPrim6Label">Cognitive Bias Mitigation</div>','pcPrim6Label');
rep('<div class="prim-desc">Adversarial challenge of assumptions and rubber-stamp detection</div>','<div class="prim-desc" data-i18n="pcPrim6Desc">Adversarial challenge of assumptions and rubber-stamp detection</div>','pcPrim6Desc');
rep('<div class="prim-label">Quantum-Resistant Integrity</div>','<div class="prim-label" data-i18n="pcPrim7Label">Quantum-Resistant Integrity</div>','pcPrim7Label');
rep('<div class="prim-desc">Post-quantum cryptographic protection of evidence</div>','<div class="prim-desc" data-i18n="pcPrim7Desc">Post-quantum cryptographic protection of evidence</div>','pcPrim7Desc');
rep('<div class="prim-label">Synthetic Media Auth</div>','<div class="prim-label" data-i18n="pcPrim8Label">Synthetic Media Auth</div>','pcPrim8Label');
rep('<div class="prim-desc">Content provenance signing and deepfake detection</div>','<div class="prim-desc" data-i18n="pcPrim8Desc">Content provenance signing and deepfake detection</div>','pcPrim8Desc');
rep('<div class="prim-label">Cross-Jurisdiction Compliance</div>','<div class="prim-label" data-i18n="pcPrim9Label">Cross-Jurisdiction Compliance</div>','pcPrim9Label');
rep('<div class="prim-desc">Multi-jurisdiction conflict detection and resolution</div>','<div class="prim-desc" data-i18n="pcPrim9Desc">Multi-jurisdiction conflict detection and resolution</div>','pcPrim9Desc');

fs.writeFileSync(FILE, html, 'utf8');
console.log('PC Part 1 done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
