/**
 * wire-demos.js: Wire data-i18n into demos.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'demos.html');
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
rep('<h1 class="page-title">Product Demos</h1>','<h1 class="page-title" data-i18n="demosPageTitle">Product Demos</h1>','demosPageTitle');
rep('<p class="page-subtitle">See Datacendia in action. Watch guided walkthroughs of our Decision Crisis Immunization Infrastructure.</p>','<p class="page-subtitle" data-i18n="demosPageSubtitle">See Datacendia in action. Watch guided walkthroughs of our Decision Crisis Immunization Infrastructure.</p>','demosPageSubtitle');

// Try It Yourself section
rep('<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 300; margin-bottom: 8px;"><span class="section-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>Try It Yourself</h2>','<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 300; margin-bottom: 8px;"><span class="section-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span><span data-i18n="demosTryTitle">Try It Yourself</span></h2>','demosTryTitle');
rep('<p style="font-size: 0.85rem; color: var(--color-text-dim); max-width: 500px; margin: 0 auto;">\n          Type YOUR decision. Get multi-agent analysis in seconds. No login, no signup — just answers.\n        </p>','<p style="font-size: 0.85rem; color: var(--color-text-dim); max-width: 500px; margin: 0 auto;" data-i18n="demosTryDesc">\n          Type YOUR decision. Get multi-agent analysis in seconds. No login, no signup — just answers.\n        </p>','demosTryDesc');

// Try It Yourself cards
rep('<div class="featured-label">YOUR DATA, REAL-TIME</div>','<div class="featured-label" data-i18n="demosYourDataLabel">YOUR DATA, REAL-TIME</div>','demosYourDataLabel');
rep('<h3 class="demo-title">Try The Council — Type Any Decision</h3>','<h3 class="demo-title" data-i18n="demosTryCouncilTitle">Try The Council — Type Any Decision</h3>','demosTryCouncilTitle');
rep('<p class="demo-description">\n              Type any business decision — M&A, hiring, expansion, pricing, restructuring — and watch \n              3 AI agents deliberate it in real time. Uses YOUR input to generate contextual analysis.\n            </p>','<p class="demo-description" data-i18n="demosTryCouncilDesc">\n              Type any business decision — M&A, hiring, expansion, pricing, restructuring — and watch \n              3 AI agents deliberate it in real time. Uses YOUR input to generate contextual analysis.\n            </p>','demosTryCouncilDesc');
rep('<button class="watch-btn" onclick="window.location=\'demos/try.html\'">\n              ▶ Type Your Decision\n            </button>','<button class="watch-btn" onclick="window.location=\'demos/try.html\'" data-i18n="demosTypeYourDecision">\n              ▶ Type Your Decision\n            </button>','demosTypeYourDecision');

rep('<h3 class="demo-title">Decision Maturity Assessment</h3>','<h3 class="demo-title" data-i18n="demosMaturityTitle">Decision Maturity Assessment</h3>','demosMaturityTitle');
rep('<p class="demo-description">\n              Answer 6 questions about YOUR organization\'s decision governance. Get a maturity score, \n              personalized recommendations, and a roadmap for improvement.\n            </p>','<p class="demo-description" data-i18n="demosMaturityDesc">\n              Answer 6 questions about YOUR organization\'s decision governance. Get a maturity score, \n              personalized recommendations, and a roadmap for improvement.\n            </p>','demosMaturityDesc');

rep('<h3 class="demo-title">Before &amp; After — Decision Governance</h3>','<h3 class="demo-title" data-i18n="demosBeforeAfterTitle">Before &amp; After — Decision Governance</h3>','demosBeforeAfterTitle');
rep('<p class="demo-description">\n              See the difference between decisions made without governance and with Datacendia — \n              side-by-side timeline comparison with quantified outcomes.\n            </p>','<p class="demo-description" data-i18n="demosBeforeAfterDesc">\n              See the difference between decisions made without governance and with Datacendia — \n              side-by-side timeline comparison with quantified outcomes.\n            </p>','demosBeforeAfterDesc');

// Cortex section
rep('<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 300; margin-bottom: 8px;"><span class="section-icon"><svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 1 7 7c0 2.4-1.2 4.5-3 5.7V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.3C6.2 13.5 5 11.4 5 9a7 7 0 0 1 7-7z"/><line x1="10" y1="22" x2="14" y2="22"/></svg></span>Cortex — Decision Engine</h2>','<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 300; margin-bottom: 8px;"><span class="section-icon"><svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 1 7 7c0 2.4-1.2 4.5-3 5.7V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.3C6.2 13.5 5 11.4 5 9a7 7 0 0 1 7-7z"/><line x1="10" y1="22" x2="14" y2="22"/></svg></span><span data-i18n="demosCortexTitle">Cortex — Decision Engine</span></h2>','demosCortexTitle');
rep('<p style="font-size: 0.85rem; color: var(--color-text-dim); max-width: 500px; margin: 0 auto;">\n          Multi-agent deliberation, cascade analysis, dissent protection, and board rehearsal. The core intelligence layer.\n        </p>','<p style="font-size: 0.85rem; color: var(--color-text-dim); max-width: 500px; margin: 0 auto;" data-i18n="demosCortexDesc">\n          Multi-agent deliberation, cascade analysis, dissent protection, and board rehearsal. The core intelligence layer.\n        </p>','demosCortexDesc');

// Featured Council demo
rep('<div class="featured-label">★ Featured Demo</div>','<div class="featured-label" data-i18n="demosFeaturedLabel">★ Featured Demo</div>','demosFeaturedLabel');
rep('<h3 class="demo-title">The Council™ — Multi-Agent Deliberation</h3>','<h3 class="demo-title" data-i18n="demosCouncilTitle">The Council™ — Multi-Agent Deliberation</h3>','demosCouncilTitle');
rep('<p class="demo-description">\n              Watch 6 AI agents deliberate a $200M acquisition decision in real time. \n              See cross-examination, formal dissent, confidence scoring, and a synthesized \n              recommendation — with cryptographic evidence export.\n            </p>','<p class="demo-description" data-i18n="demosCouncilDesc">\n              Watch 6 AI agents deliberate a $200M acquisition decision in real time. \n              See cross-examination, formal dissent, confidence scoring, and a synthesized \n              recommendation — with cryptographic evidence export.\n            </p>','demosCouncilDesc');
rep('<button class="watch-btn" onclick="window.location=\'demos/council.html\'">\n              ▶ Launch Interactive Demo\n            </button>','<button class="watch-btn" onclick="window.location=\'demos/council.html\'" data-i18n="demosLaunchInteractive">\n              ▶ Launch Interactive Demo\n            </button>','demosLaunchInteractive');

// Chronos demo
rep('<h3 class="demo-title">CendiaChronos — Pivotal Moments</h3>','<h3 class="demo-title" data-i18n="demosChronosTitle">CendiaChronos — Pivotal Moments</h3>','demosChronosTitle');
rep('<p class="demo-description">\n              Explore a 5-year timeline for a healthcare organization. See how AI detects the pivotal \n              decisions that shaped the company\'s future — with department filtering and drill-down.\n            </p>','<p class="demo-description" data-i18n="demosChronosDesc">\n              Explore a 5-year timeline for a healthcare organization. See how AI detects the pivotal \n              decisions that shaped the company\'s future — with department filtering and drill-down.\n            </p>','demosChronosDesc');
rep('<button class="watch-btn" onclick="window.location=\'demos/chronos.html\'" style="margin-top:12px">\n              ▶ Launch Interactive Demo\n            </button>','<button class="watch-btn" onclick="window.location=\'demos/chronos.html\'" style="margin-top:12px" data-i18n="demosLaunchInteractive">\n              ▶ Launch Interactive Demo\n            </button>','demosChronosLaunch');

// Cascade demo
rep('<h3 class="demo-title">CendiaChronos™ — Cascade Analysis</h3>','<h3 class="demo-title" data-i18n="demosCascadeTitle">CendiaChronos™ — Cascade Analysis</h3>','demosCascadeTitle');
rep('<p class="demo-description">\n              Choose a trigger decision (plant closure, price hike, or layoffs) and watch ripple effects \n              propagate through 3 orders of consequence — with probability scoring and net impact.\n            </p>','<p class="demo-description" data-i18n="demosCascadeDesc">\n              Choose a trigger decision (plant closure, price hike, or layoffs) and watch ripple effects \n              propagate through 3 orders of consequence — with probability scoring and net impact.\n            </p>','demosCascadeDesc');

// Dissent demo
rep('<h3 class="demo-title">CendiaDissent — Protected Disagreement</h3>','<h3 class="demo-title" data-i18n="demosDissentTitle">CendiaDissent — Protected Disagreement</h3>','demosDissentTitle');
rep('<p class="demo-description">\n              See how formal dissent is filed, protected from retaliation, and tracked to outcome. \n              Includes a vindication case where the dissenter was proven right 6 months later.\n            </p>','<p class="demo-description" data-i18n="demosDissentDesc">\n              See how formal dissent is filed, protected from retaliation, and tracked to outcome. \n              Includes a vindication case where the dissenter was proven right 6 months later.\n            </p>','demosDissentDesc');

// Ghost Board demo
rep('<h3 class="demo-title">Ghost Board™ — Board Meeting Rehearsal</h3>','<h3 class="demo-title" data-i18n="demosGhostBoardTitle">Ghost Board™ — Board Meeting Rehearsal</h3>','demosGhostBoardTitle');
rep('<p class="demo-description">\n              Rehearse your board presentation against AI directors. Face tough questions from Standard, \n              VC-Backed, Public Company, or Private Equity boards — with preparedness scoring.\n            </p>','<p class="demo-description" data-i18n="demosGhostBoardDesc">\n              Rehearse your board presentation against AI directors. Face tough questions from Standard, \n              VC-Backed, Public Company, or Private Equity boards — with preparedness scoring.\n            </p>','demosGhostBoardDesc');

// Pre-Mortem demo
rep('<h3 class="demo-title">Pre-Mortem Engine — Failure Before It Happens</h3>','<h3 class="demo-title" data-i18n="demosPreMortemTitle">Pre-Mortem Engine — Failure Before It Happens</h3>','demosPreMortemTitle');
rep('<p class="demo-description">\n              "Assume this decision failed catastrophically. Why?" See failure narratives, root cause analysis, \n              early warning signals, and mitigations — before you commit.\n            </p>','<p class="demo-description" data-i18n="demosPreMortemDesc">\n              "Assume this decision failed catastrophically. Why?" See failure narratives, root cause analysis, \n              early warning signals, and mitigations — before you commit.\n            </p>','demosPreMortemDesc');

// Oversight section
rep('<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 300; margin-bottom: 8px;"><span class="section-icon"><svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5.5-3.8 10-8 11-4.2-1-8-5.5-8-11V6l8-4z"/></svg></span>Oversight — Trust Layer</h2>','<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 300; margin-bottom: 8px;"><span class="section-icon"><svg viewBox="0 0 24 24"><path d="M12 2l8 4v6c0 5.5-3.8 10-8 11-4.2-1-8-5.5-8-11V6l8-4z"/></svg></span><span data-i18n="demosOversightTitle">Oversight — Trust Layer</span></h2>','demosOversightTitle');
rep('<p style="font-size: 0.85rem; color: var(--color-text-dim); max-width: 500px; margin: 0 auto;">\n          Adversarial stress testing, red team challenges, and compliance validation. Prove your decisions can survive scrutiny.\n        </p>','<p style="font-size: 0.85rem; color: var(--color-text-dim); max-width: 500px; margin: 0 auto;" data-i18n="demosOversightDesc">\n          Adversarial stress testing, red team challenges, and compliance validation. Prove your decisions can survive scrutiny.\n        </p>','demosOversightDesc');

// Crucible demo
rep('<h3 class="demo-title">CendiaCrucible — Red Team Stress Test</h3>','<h3 class="demo-title" data-i18n="demosCrucibleTitle">CendiaCrucible — Red Team Stress Test</h3>','demosCrucibleTitle');
rep('<p class="demo-description">\n              Watch 8 adversarial perspectives tear apart a wire transfer decision: Pessimist CFO, Paranoid CISO, \n              Cynical Lawyer, Ethics Watchdog, and more — with risk scoring, failure scenarios, and mitigations.\n            </p>','<p class="demo-description" data-i18n="demosCrucibleDesc">\n              Watch 8 adversarial perspectives tear apart a wire transfer decision: Pessimist CFO, Paranoid CISO, \n              Cynical Lawyer, Ethics Watchdog, and more — with risk scoring, failure scenarios, and mitigations.\n            </p>','demosCrucibleDesc');

// Evidence section
rep('<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 300; margin-bottom: 8px;"><span class="section-icon"><svg viewBox="0 0 24 24"><path d="M10 2v8L2 18v2h20v-2l-8-8V2"/><circle cx="12" cy="20" r="0"/><path d="M8.5 2h7"/></svg></span>Evidence — Trust Layer</h2>','<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 300; margin-bottom: 8px;"><span class="section-icon"><svg viewBox="0 0 24 24"><path d="M10 2v8L2 18v2h20v-2l-8-8V2"/><circle cx="12" cy="20" r="0"/><path d="M8.5 2h7"/></svg></span><span data-i18n="demosEvidenceTitle">Evidence — Trust Layer</span></h2>','demosEvidenceTitle');
rep('<p style="font-size: 0.85rem; color: var(--color-text-dim); max-width: 500px; margin: 0 auto;">\n          Cryptographic proof, immutable audit trails, and air-gapped transfer. Every decision is designed to support evidentiary standards.\n        </p>','<p style="font-size: 0.85rem; color: var(--color-text-dim); max-width: 500px; margin: 0 auto;" data-i18n="demosEvidenceDesc">\n          Cryptographic proof, immutable audit trails, and air-gapped transfer. Every decision is designed to support evidentiary standards.\n        </p>','demosEvidenceDesc');

// Audit Provenance demo
rep('<h3 class="demo-title">Audit Provenance™</h3>','<h3 class="demo-title" data-i18n="demosAuditTitle">Audit Provenance™</h3>','demosAuditTitle');
rep('<p class="demo-description">\n              Explore a cryptographically signed evidence packet: decision trace, agent votes, Merkle tree \n              integrity proof, compliance control mapping, and regulator-ready exports.\n            </p>','<p class="demo-description" data-i18n="demosAuditDesc">\n              Explore a cryptographically signed evidence packet: decision trace, agent votes, Merkle tree \n              integrity proof, compliance control mapping, and regulator-ready exports.\n            </p>','demosAuditDesc');

// QR Bridge demo
rep('<h3 class="demo-title">QR Air-Gap Bridge — Zero-Network Transfer</h3>','<h3 class="demo-title" data-i18n="demosQrBridgeTitle">QR Air-Gap Bridge — Zero-Network Transfer</h3>','demosQrBridgeTitle');
rep('<p class="demo-description">\n              Watch a decision packet transfer across an air gap using animated QR code sequences. \n              No USB, no network, no risk — just light. With Reed-Solomon error correction and SHA-256 integrity.\n            </p>','<p class="demo-description" data-i18n="demosQrBridgeDesc">\n              Watch a decision packet transfer across an air gap using animated QR code sequences. \n              No USB, no network, no risk — just light. With Reed-Solomon error correction and SHA-256 integrity.\n            </p>','demosQrBridgeDesc');

// Industry Verticals section header
rep('<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 300; margin-bottom: 8px;">Industry Verticals</h2>','<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 300; margin-bottom: 8px;" data-i18n="demosIndustryTitle">Industry Verticals</h2>','demosIndustryTitle');
rep('<p style="font-size: 0.85rem; color: var(--color-text-dim); max-width: 500px; margin: 0 auto;">\n          See how Datacendia adapts to your industry — with specialized agents, compliance frameworks, and domain-specific governance.\n        </p>','<p style="font-size: 0.85rem; color: var(--color-text-dim); max-width: 500px; margin: 0 auto;" data-i18n="demosIndustryDesc">\n          See how Datacendia adapts to your industry — with specialized agents, compliance frameworks, and domain-specific governance.\n        </p>','demosIndustryDesc');

// Vertical demo cards
rep('<h3 class="demo-title">Football Transfer Governance</h3>','<h3 class="demo-title" data-i18n="demosFootballTitle">Football Transfer Governance</h3>','demosFootballTitle');
rep('<h3 class="demo-title">Legal Compliance Governance</h3>','<h3 class="demo-title" data-i18n="demosLegalTitle">Legal Compliance Governance</h3>','demosLegalTitle');
rep('<h3 class="demo-title">Hotel Investment Governance</h3>','<h3 class="demo-title" data-i18n="demosHotelTitle">Hotel Investment Governance</h3>','demosHotelTitle');
rep('<h3 class="demo-title">Trading Desk Governance</h3>','<h3 class="demo-title" data-i18n="demosTradingTitle">Trading Desk Governance</h3>','demosTradingTitle');

// CTA box
rep('<h3>Ready to See It Live?</h3>','<h3 data-i18n="demosCtaTitle">Ready to See It Live?</h3>','demosCtaTitle');
rep('<p>Request a personalized demo with your own data and use cases.</p>','<p data-i18n="demosCtaDesc">Request a personalized demo with your own data and use cases.</p>','demosCtaDesc');
rep('<a href="briefing.html" class="cta-btn">Request Live Demo →</a>','<a href="briefing.html" class="cta-btn" data-i18n="demosCtaBtn">Request Live Demo →</a>','demosCtaBtn');

// Footer
rep('<p class="footer-outcome">Ready to own your AI decisions—and prove them to regulators?</p>','<p class="footer-outcome" data-i18n="footerOutcome">Ready to own your AI decisions—and prove them to regulators?</p>','footerOutcome');
rep('<a href="pilot.html" class="cta-button secondary">See Results in 90 Days</a>','<a href="pilot.html" class="cta-button secondary" data-i18n="footerSeeResults">See Results in 90 Days</a>','footerSeeResults');
rep('<p class="footer-status" style="font-family: var(--font-mono); font-size: 0.7rem; color: #2ecc71; margin-top: 16px; letter-spacing: 0.05em;">SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED</p>','<p class="footer-status" style="font-family: var(--font-mono); font-size: 0.7rem; color: #2ecc71; margin-top: 16px; letter-spacing: 0.05em;" data-i18n="footerStatus">SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED</p>','footerStatus');

fs.writeFileSync(FILE, html, 'utf8');
console.log('Demos done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
