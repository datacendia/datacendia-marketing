/**
 * Part 4: Feature cards + Demo video + War Games + Honesty + Case Studies + Newsletter + Footer
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

// Feature card taglines
rep('<p class="fc-tagline">Divergent future simulation</p>','<p class="fc-tagline" data-i18n="chronosTagline">Divergent future simulation</p>','chronosTagline');
rep('<p class="fc-tagline">Multi-agent boardroom debate</p>','<p class="fc-tagline" data-i18n="councilShowcaseTagline">Multi-agent boardroom debate</p>','councilShowcaseTagline');
rep('<p class="fc-tagline">Full decision lineage &amp; evidence export</p>','<p class="fc-tagline" data-i18n="auditProvenanceTagline">Full decision lineage &amp; evidence export</p>','auditProvenanceTagline');
rep('<p class="fc-tagline">Butterfly effect engine</p>','<p class="fc-tagline" data-i18n="cascadeTagline">Butterfly effect engine</p>','cascadeTagline');
rep('<p class="fc-tagline">100+ language AI translation</p>','<p class="fc-tagline" data-i18n="omniTranslateTagline">100+ language AI translation</p>','omniTranslateTagline');
rep('<p class="fc-tagline">Prove the value of AI decisions</p>','<p class="fc-tagline" data-i18n="roiTagline">Prove the value of AI decisions</p>','roiTagline');
rep('<p class="fc-tagline">11 sovereign architectural patterns</p>','<p class="fc-tagline" data-i18n="sovereignTagline">11 sovereign architectural patterns</p>','sovereignTagline');
rep('<p class="fc-tagline">AI that red-teams itself nightly</p>','<p class="fc-tagline" data-i18n="apotheosisTagline">AI that red-teams itself nightly</p>','apotheosisTagline');
rep('<p class="fc-tagline">Formal disagreement protocol</p>','<p class="fc-tagline" data-i18n="dissentTagline">Formal disagreement protocol</p>','dissentTagline');
rep('<p class="fc-tagline">Data never leaves your infrastructure</p>','<p class="fc-tagline" data-i18n="zeroCopyTagline">Data never leaves your infrastructure</p>','zeroCopyTagline');

// Feature card list items
rep('<li>What-if scenario branching</li>','<li data-i18n="chronosFeature1">What-if scenario branching</li>','chronosFeature1');
rep('<li>Multi-timeline visualization</li>','<li data-i18n="chronosFeature2">Multi-timeline visualization</li>','chronosFeature2');
rep('<li>Resource impact prediction</li>','<li data-i18n="chronosFeature3">Resource impact prediction</li>','chronosFeature3');
rep('<a href="demos/chronos.html" class="fc-link">See demo →</a>','<a href="demos/chronos.html" class="fc-link" data-i18n="chronosSeeDemo">See demo →</a>','chronosSeeDemo');
rep('<li>40+ governance agents</li>','<li data-i18n="councilShowcaseFeature1">40+ governance agents</li>','councilShowcaseFeature1');
rep('<li>5 agent classes</li>','<li data-i18n="councilShowcaseFeature2">5 agent classes</li>','councilShowcaseFeature2');
rep('<li>Structured deliberation protocol</li>','<li data-i18n="councilShowcaseFeature3">Structured deliberation protocol</li>','councilShowcaseFeature3');
rep('<a href="resources/the-council.html" class="fc-link">Learn how it works →</a>','<a href="resources/the-council.html" class="fc-link" data-i18n="councilShowcaseLearnMore">Learn how it works →</a>','councilShowcaseLearnMore');
rep('<li>Cryptographically signed decision packets</li>','<li data-i18n="auditProvenanceFeature1">Cryptographically signed decision packets</li>','auditProvenanceFeature1');
rep('<li>SOC 2 / ISO 27001 / NIST 800-53 ready</li>','<li data-i18n="auditProvenanceFeature2">SOC 2 / ISO 27001 / NIST 800-53 ready</li>','auditProvenanceFeature2');
rep('<li>One-click regulator-ready exports</li>','<li data-i18n="auditProvenanceFeature3">One-click regulator-ready exports</li>','auditProvenanceFeature3');
rep('<li>Complete decision lineage &amp; traceability</li>','<li data-i18n="auditProvenanceFeature4">Complete decision lineage &amp; traceability</li>','auditProvenanceFeature4');
rep('<a href="demos/audit-provenance.html" class="fc-link">See demo →</a>','<a href="demos/audit-provenance.html" class="fc-link" data-i18n="auditProvenanceSeeDemo">See demo →</a>','auditProvenanceSeeDemo');
rep('<li>Change propagation mapping</li>','<li data-i18n="cascadeFeature1">Change propagation mapping</li>','cascadeFeature1');
rep('<li>2nd &amp; 3rd-order consequences</li>','<li data-i18n="cascadeFeature2">2nd &amp; 3rd-order consequences</li>','cascadeFeature2');
rep('<li>Impact visualization</li>','<li data-i18n="cascadeFeature3">Impact visualization</li>','cascadeFeature3');
rep('<a href="demos/cascade.html" class="fc-link">See demo →</a>','<a href="demos/cascade.html" class="fc-link" data-i18n="cascadeSeeDemo">See demo →</a>','cascadeSeeDemo');
rep('<li>100+ languages with RTL</li>','<li data-i18n="omniTranslateFeature1">100+ languages with RTL</li>','omniTranslateFeature1');
rep('<li>Glossary &amp; translation memory</li>','<li data-i18n="omniTranslateFeature2">Glossary &amp; translation memory</li>','omniTranslateFeature2');
rep('<li>Runs on your infrastructure</li>','<li data-i18n="omniTranslateFeature3">Runs on your infrastructure</li>','omniTranslateFeature3');
rep('<a href="resources/omnitranslate.html" class="fc-link">Learn more →</a>','<a href="resources/omnitranslate.html" class="fc-link" data-i18n="omniTranslateLearnMore">Learn more →</a>','omniTranslateLearnMore');
rep('<li>Decision speed metrics</li>','<li data-i18n="roiFeature1">Decision speed metrics</li>','roiFeature1');
rep('<li>Confidence scoring</li>','<li data-i18n="roiFeature2">Confidence scoring</li>','roiFeature2');
rep('<li>Audit packet generation</li>','<li data-i18n="roiFeature3">Audit packet generation</li>','roiFeature3');
rep('<a href="roi-calculator.html" class="fc-link">Calculate ROI →</a>','<a href="roi-calculator.html" class="fc-link" data-i18n="roiCalculateCta">Calculate ROI →</a>','roiCalculateCta');
rep('<li>Air-gapped deployment</li>','<li data-i18n="sovereignFeature1">Air-gapped deployment</li>','sovereignFeature1');
rep('<li>Data diode ingest</li>','<li data-i18n="sovereignFeature2">Data diode ingest</li>','sovereignFeature2');
rep('<li>Hardware-signed decisions</li>','<li data-i18n="sovereignFeature3">Hardware-signed decisions</li>','sovereignFeature3');
rep('<a href="architecture.html" class="fc-link">View architecture →</a>','<a href="architecture.html" class="fc-link" data-i18n="sovereignViewArch">View architecture →</a>','sovereignViewArch');
rep('<li>Automated adversarial testing</li>','<li data-i18n="apotheosisFeature1">Automated adversarial testing</li>','apotheosisFeature1');
rep('<li>Auto-patching &amp; pattern banning</li>','<li data-i18n="apotheosisFeature2">Auto-patching &amp; pattern banning</li>','apotheosisFeature2');
rep('<li>Continuous self-improvement</li>','<li data-i18n="apotheosisFeature3">Continuous self-improvement</li>','apotheosisFeature3');
rep('<li>Protected dissent filing</li>','<li data-i18n="dissentFeature1">Protected dissent filing</li>','dissentFeature1');
rep('<li>Outcome tracking</li>','<li data-i18n="dissentFeature2">Outcome tracking</li>','dissentFeature2');
rep('<li>Retaliation safeguards</li>','<li data-i18n="dissentFeature3">Retaliation safeguards</li>','dissentFeature3');
rep('<a href="demos/dissent.html" class="fc-link">See demo →</a>','<a href="demos/dissent.html" class="fc-link" data-i18n="dissentSeeDemo">See demo →</a>','dissentSeeDemo');
rep('<li>5 universal adapters — no ETL</li>','<li data-i18n="zeroCopyFeature1">5 universal adapters — no ETL</li>','zeroCopyFeature1');
rep('<li>Connects to your existing databases</li>','<li data-i18n="zeroCopyFeature2">Connects to your existing databases</li>','zeroCopyFeature2');
rep('<li>True data sovereignty</li>','<li data-i18n="zeroCopyFeature3">True data sovereignty</li>','zeroCopyFeature3');

// Demo video section
rep('<p class="section-label">See It Work</p>','<p class="section-label" data-i18n="seeItWorkLabel">See It Work</p>','seeItWorkLabel');
rep('<h2 class="section-headline">The Council™ in Action</h2>','<h2 class="section-headline" data-i18n="councilInActionTitle">The Council™ in Action</h2>','councilInActionTitle');
rep('<p class="deploy-desc" style="margin-bottom:24px;">Watch multi-agent deliberation run a real decision — with cross-examination, formal dissent, and cryptographic evidence export.</p>','<p class="deploy-desc" style="margin-bottom:24px;" data-i18n="councilInActionDesc">Watch multi-agent deliberation run a real decision — with cross-examination, formal dissent, and cryptographic evidence export.</p>','councilInActionDesc');
rep('Your browser does not support the video tag.','<span data-i18n="videoBrowserFallback">Your browser does not support the video tag.</span>','videoBrowserFallback');
rep('<a href="demos.html" class="link-gold link-sm">All Demos →</a>','<a href="demos.html" class="link-gold link-sm" data-i18n="allDemosLink">All Demos →</a>','allDemosLink');
rep('<a href="pilot.html" class="link-dim link-sm">Start a 90-Day Pilot →</a>','<a href="pilot.html" class="link-dim link-sm" data-i18n="startPilotLink">Start a 90-Day Pilot →</a>','startPilotLink');

// War Games
rep('<p class="section-label">War Games</p>','<p class="section-label" data-i18n="warGamesLabel">War Games</p>','warGamesLabel');
rep('<h2 class="section-headline">Would Structured Dissent Have Surfaced the Risk?</h2>','<h2 class="section-headline" data-i18n="warGamesTitle">Would Structured Dissent Have Surfaced the Risk?</h2>','warGamesTitle');
rep('<p class="deploy-desc" style="margin-bottom:24px;">Using only information available at the time, we simulate whether multi-agent review would have flagged material risk before outcome.</p>','<p class="deploy-desc" style="margin-bottom:24px;" data-i18n="warGamesDesc">Using only information available at the time, we simulate whether multi-agent review would have flagged material risk before outcome.</p>','warGamesDesc');
rep('<div class="wargame-tag">Banking · Institutional Failure</div>','<div class="wargame-tag" data-i18n="wg1Tag">Banking · Institutional Failure</div>','wg1Tag');
rep('<div class="wargame-title">Silicon Valley Bank</div>','<div class="wargame-title" data-i18n="wg1Title">Silicon Valley Bank</div>','wg1Title');
rep('<div class="wargame-desc">Structured review surfaced material duration risk and liquidity concentration before rate cycle stress.</div>','<div class="wargame-desc" data-i18n="wg1Desc">Structured review surfaced material duration risk and liquidity concentration before rate cycle stress.</div>','wg1Desc');
rep('<div class="wargame-tag">Aerospace · 346 Lives</div>','<div class="wargame-tag" data-i18n="wg2Tag">Aerospace · 346 Lives</div>','wg2Tag');
rep('<div class="wargame-title">Boeing 737 MAX</div>','<div class="wargame-title" data-i18n="wg2Title">Boeing 737 MAX</div>','wg2Title');
rep('<div class="wargame-desc">Single-point-of-failure flagged. Training gap identified. Established safety principles already prohibited this.</div>','<div class="wargame-desc" data-i18n="wg2Desc">Single-point-of-failure flagged. Training gap identified. Established safety principles already prohibited this.</div>','wg2Desc');
rep('<div class="wargame-tag">Fraud · Institutional Failure</div>','<div class="wargame-tag" data-i18n="wg3Tag">Fraud · Institutional Failure</div>','wg3Tag');
rep('<div class="wargame-title">Wirecard</div>','<div class="wargame-title" data-i18n="wg3Title">Wirecard</div>','wg3Title');
rep('<div class="wargame-desc">Unverifiable cash balances and margin inconsistencies identified as material red flags from public data alone.</div>','<div class="wargame-desc" data-i18n="wg3Desc">Unverifiable cash balances and margin inconsistencies identified as material red flags from public data alone.</div>','wg3Desc');
rep('<div class="wargame-tag">Healthcare · Institutional Failure</div>','<div class="wargame-tag" data-i18n="wg4Tag">Healthcare · Institutional Failure</div>','wg4Tag');
rep('<div class="wargame-title">Theranos</div>','<div class="wargame-title" data-i18n="wg4Title">Theranos</div>','wg4Title');
rep('<div class="wargame-desc">Absence of peer review and blocked due diligence flagged as disqualifying risk factors.</div>','<div class="wargame-desc" data-i18n="wg4Desc">Absence of peer review and blocked due diligence flagged as disqualifying risk factors.</div>','wg4Desc');
rep('<div class="wargame-tag">Football · 10-Point Deduction</div>','<div class="wargame-tag" data-i18n="wg5Tag">Football · 10-Point Deduction</div>','wg5Tag');
rep('<div class="wargame-title">Everton FC PSR Breach</div>','<div class="wargame-title" data-i18n="wg5Title">Everton FC PSR Breach</div>','wg5Title');
rep("<div class=\"wargame-desc\">Drift Detection would have flagged wage-to-revenue ratio creep across 3 transfer windows before the Premier League&rsquo;s PSR threshold was breached.</div>",'<div class="wargame-desc" data-i18n="wg5Desc">Drift Detection would have flagged wage-to-revenue ratio creep across 3 transfer windows before the Premier League\'s PSR threshold was breached.</div>','wg5Desc');
rep('<div class="wargame-tag">Healthcare · Patient Safety</div>','<div class="wargame-tag" data-i18n="wg6Tag">Healthcare · Patient Safety</div>','wg6Tag');
rep('<div class="wargame-title">NHS Maternity Failures</div>','<div class="wargame-title" data-i18n="wg6Title">NHS Maternity Failures</div>','wg6Title');
rep('<div class="wargame-desc">Override Accountability and Deliberation Capture would have documented clinical protocol deviations before they became systemic.</div>','<div class="wargame-desc" data-i18n="wg6Desc">Override Accountability and Deliberation Capture would have documented clinical protocol deviations before they became systemic.</div>','wg6Desc');
rep('<a href="wargames.html" class="link-gold link-sm">See All War Game Analyses →</a>','<a href="wargames.html" class="link-gold link-sm" data-i18n="seeAllWargames">See All War Game Analyses →</a>','seeAllWargames');

// Honesty section
rep("<p class=\"deploy-desc\" style=\"margin-bottom:24px;\">Sovereignty comparisons, governance reality checks, integration truth tables, what breaks at 3 AM, and what we can't do — all documented honestly.</p>",'<p class="deploy-desc" style="margin-bottom:24px;" data-i18n="honestyDesc">Sovereignty comparisons, governance reality checks, integration truth tables, what breaks at 3 AM, and what we can\'t do — all documented honestly.</p>','honestyDesc');
rep('<a href="honesty-matrices.html" class="cta-button secondary">Explore All Matrices →</a>','<a href="honesty-matrices.html" class="cta-button secondary" data-i18n="exploreMatrices">Explore All Matrices →</a>','exploreMatrices');
rep('<a href="manifesto.html" class="pillar-link">Read the Manifesto →</a>','<a href="manifesto.html" class="pillar-link" data-i18n="readManifesto">Read the Manifesto →</a>','readManifesto');
rep('<a href="platform-capabilities.html" class="pillar-link">Platform Capabilities →</a>','<a href="platform-capabilities.html" class="pillar-link" data-i18n="platformCapabilitiesLink">Platform Capabilities →</a>','platformCapabilitiesLink');

// Case Studies
rep('<p class="section-label">Real Pilots</p>','<p class="section-label" data-i18n="realPilotsLabel">Real Pilots</p>','realPilotsLabel');
rep('<h2 class="section-headline">What Organizations Actually Say</h2>','<h2 class="section-headline" data-i18n="caseStudiesTitle">What Organizations Actually Say</h2>','caseStudiesTitle');
rep('<p class="deploy-desc" style="margin-bottom:24px;">Anonymized pilot case studies. No inflated metrics. No AI accuracy claims.</p>','<p class="deploy-desc" style="margin-bottom:24px;" data-i18n="caseStudiesDesc">Anonymized pilot case studies. No inflated metrics. No AI accuracy claims.</p>','caseStudiesDesc');
rep('<div class="casestudy-tag" style="color:#f59e0b;">Industrial Manufacturing</div>','<div class="casestudy-tag" style="color:#f59e0b;" data-i18n="cs1Tag">Industrial Manufacturing</div>','cs1Tag');
rep('<p class="casestudy-quote">"The system didn\'t tell us what to do. It forced us to be explicit about why we chose to do it."</p>','<p class="casestudy-quote" data-i18n="cs1Quote">"The system didn\'t tell us what to do. It forced us to be explicit about why we chose to do it."</p>','cs1Quote');
rep('<div class="casestudy-meta">90-day pilot · On-premises · Latin America</div>','<div class="casestudy-meta" data-i18n="cs1Meta">90-day pilot · On-premises · Latin America</div>','cs1Meta');
rep('<div class="casestudy-tag" style="color:#3b82f6;">Financial Services</div>','<div class="casestudy-tag" style="color:#3b82f6;" data-i18n="cs2Tag">Financial Services</div>','cs2Tag');
rep('<p class="casestudy-quote">"The value wasn\'t the recommendation — it was the evidence trail."</p>','<p class="casestudy-quote" data-i18n="cs2Quote">"The value wasn\'t the recommendation — it was the evidence trail."</p>','cs2Quote');
rep('<div class="casestudy-meta">60-day pilot · On-premises · Europe</div>','<div class="casestudy-meta" data-i18n="cs2Meta">60-day pilot · On-premises · Europe</div>','cs2Meta');
rep('<div class="casestudy-tag" style="color:#10b981;">Healthcare</div>','<div class="casestudy-tag" style="color:#10b981;" data-i18n="cs3Tag">Healthcare</div>','cs3Tag');
rep('<p class="casestudy-quote">"It slowed us down slightly — and that was a good thing."</p>','<p class="casestudy-quote" data-i18n="cs3Quote">"It slowed us down slightly — and that was a good thing."</p>','cs3Quote');
rep('<div class="casestudy-meta">45-day evaluation · On-premises · North America</div>','<div class="casestudy-meta" data-i18n="cs3Meta">45-day evaluation · On-premises · North America</div>','cs3Meta');
rep('<div class="casestudy-tag" style="color:#a855f7;">Public-Sector Adjacent</div>','<div class="casestudy-tag" style="color:#a855f7;" data-i18n="cs4Tag">Public-Sector Adjacent</div>','cs4Tag');
rep('<p class="casestudy-quote">"It gave us memory without politics."</p>','<p class="casestudy-quote" data-i18n="cs4Quote">"It gave us memory without politics."</p>','cs4Quote');
rep('<div class="casestudy-meta">90-day pilot · On-premises · Europe</div>','<div class="casestudy-meta" data-i18n="cs4Meta">90-day pilot · On-premises · Europe</div>','cs4Meta');
rep('<a href="case-studies.html" class="link-gold link-sm">Read All 4 Case Studies →</a>','<a href="case-studies.html" class="link-gold link-sm" data-i18n="readAllCaseStudies">Read All 4 Case Studies →</a>','readAllCaseStudies');

// Early stage
rep("<p class=\"signals-disclaimer\">We're a new platform seeking pilot partners. <a href=\"pilot.html\">Join our pilot program</a> to create real results together.</p>",'<p class="signals-disclaimer"><span data-i18n="earlyStageDisclaimer">We\'re a new platform seeking pilot partners.</span> <a href="pilot.html" data-i18n="earlyStageLink">Join our pilot program</a> <span data-i18n="earlyStageEnd">to create real results together.</span></p>','earlyStageDisclaimer');

// Newsletter
rep('<h3 class="newsletter-title">Stay Informed</h3>','<h3 class="newsletter-title" data-i18n="newsletterTitle">Stay Informed</h3>','newsletterTitle');
rep('<p class="newsletter-desc">Platform updates, new compliance guides, and industry analysis. No spam — one email per month, max.</p>','<p class="newsletter-desc" data-i18n="newsletterDesc">Platform updates, new compliance guides, and industry analysis. No spam — one email per month, max.</p>','newsletterDesc');
rep('placeholder="your@email.com"','placeholder="your@email.com" data-i18n-placeholder="newsletterPlaceholder"','newsletterPlaceholder');
rep('<button type="submit" class="newsletter-btn">Subscribe</button>','<button type="submit" class="newsletter-btn" data-i18n="newsletterBtn">Subscribe</button>','newsletterBtn');
rep("<p id=\"newsletter-thanks\" class=\"newsletter-thanks\">Thanks — we'll be in touch.</p>",'<p id="newsletter-thanks" class="newsletter-thanks" data-i18n="newsletterThanks">Thanks — we\'ll be in touch.</p>','newsletterThanks');
rep('<p class="newsletter-fine">No tracking pixels. Unsubscribe anytime. <a href="privacy.html" class="link-dim">Privacy Policy</a></p>','<p class="newsletter-fine"><span data-i18n="newsletterFine">No tracking pixels. Unsubscribe anytime.</span> <a href="privacy.html" class="link-dim" data-i18n="newsletterPrivacy">Privacy Policy</a></p>','newsletterFine');

// Footer
rep('<p class="footer-outcome">Ready to own your AI decisions—and prove them to regulators?</p>','<p class="footer-outcome" data-i18n="footerOutcome">Ready to own your AI decisions—and prove them to regulators?</p>','footerOutcome');
rep('<a href="pilot.html" class="cta-button secondary">See Results in 90 Days</a>','<a href="pilot.html" class="cta-button secondary" data-i18n="footerSeeResults">See Results in 90 Days</a>','footerSeeResults');
rep('<p class="footer-status">SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED</p>','<p class="footer-status" data-i18n="footerStatus">SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED</p>','footerStatus');

fs.writeFileSync(FILE, html, 'utf8');
console.log('Part 4 done — ' + count + ' replacements applied.');
console.log('data-i18n count now: ' + (html.match(/data-i18n/g) || []).length);
