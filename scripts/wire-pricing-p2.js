/**
 * wire-pricing-p2.js: Tier 2 + add-ons + Tier 3 + progression + CTA + footer
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

// Tier 2 header
rep('<p style="font-size: 0.65rem; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">Tier 2</p>','<p style="font-size: 0.65rem; color: #3b82f6; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;" data-i18n="pcTier2Badge">Tier 2</p>','pcTier2Badge');
rep('<h2 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 300; color: var(--color-text); margin-bottom: 8px;">Enterprise</h2>','<h2 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 300; color: var(--color-text); margin-bottom: 8px;" data-i18n="pcTier2Title">Enterprise</h2>','pcTier2Title');
rep('<p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 4px;">Harden &rarr; Comply &rarr; Govern &rarr; Own &rarr; Scale</p>','<p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 4px;" data-i18n="pcTier2Flow">Harden → Comply → Govern → Own → Scale</p>','pcTier2Flow');
rep('<p style="font-size: 0.72rem; color: var(--color-text-dim);">5 pillars &middot; Requires Foundation &middot; 6&ndash;12 month adoption typical</p>','<p style="font-size: 0.72rem; color: var(--color-text-dim);" data-i18n="tier2Note">5 pillars · Requires Foundation · 6–12 month adoption typical</p>','tier2Note');

// Tier 2 pillar cards
rep('<div class="tier-label" style="color: #3b82f6;">Pillar 4</div>','<div class="tier-label" style="color: #3b82f6;" data-i18n="pcP4Num">Pillar 4</div>','pcP4Num');
rep('<p class="tier-tagline">Adversarial Testing</p>','<p class="tier-tagline" data-i18n="pcP4Tag">Adversarial Testing</p>','pcP4Tag');
rep('<div class="tier-label" style="color: #3b82f6;">Pillar 5</div>','<div class="tier-label" style="color: #3b82f6;" data-i18n="pcP5Num">Pillar 5</div>','pcP5Num');
rep('<p class="tier-tagline">Regulatory Compliance</p>','<p class="tier-tagline" data-i18n="pcP5Tag">Regulatory Compliance</p>','pcP5Tag');
rep('<div class="tier-label" style="color: #3b82f6;">Pillar 6</div>','<div class="tier-label" style="color: #3b82f6;" data-i18n="pcP6Num">Pillar 6</div>','pcP6Num');
rep('<p class="tier-tagline">Policy Enforcement</p>','<p class="tier-tagline" data-i18n="pcP6Tag">Policy Enforcement</p>','pcP6Tag');
rep('<div class="tier-label" style="color: #3b82f6;">Pillar 7</div>','<div class="tier-label" style="color: #3b82f6;" data-i18n="pcP7Num">Pillar 7</div>','pcP7Num');
rep('<p class="tier-tagline">Air-Gap Architecture</p>','<p class="tier-tagline" data-i18n="pcP7Tag">Air-Gap Architecture</p>','pcP7Tag');
rep('<a href="architecture.html" class="tier-cta">View Architecture</a>','<a href="architecture.html" class="tier-cta" data-i18n="viewArchCta">View Architecture</a>','viewArchCta');
rep('<div class="tier-label" style="color: #3b82f6;">Pillar 8</div>','<div class="tier-label" style="color: #3b82f6;" data-i18n="pcP8Num">Pillar 8</div>','pcP8Num');
rep('<p class="tier-tagline">CendiaOps&trade; &mdash; 19 AI Co-Pilots</p>','<p class="tier-tagline" data-i18n="pcP8Tag">CendiaOps™ — 19 AI Co-Pilots</p>','pcP8Tag');

// Tier 2 Premium Add-Ons header
rep('<p style="font-size: 0.65rem; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">Tier 2 Premium</p>','<p style="font-size: 0.65rem; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;" data-i18n="pcTier2PremiumBadge">Tier 2 Premium</p>','pcTier2PremiumBadge');
rep('<h2 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 300; color: var(--color-text); margin-bottom: 8px;">Strategic Add-Ons</h2>','<h2 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 300; color: var(--color-text); margin-bottom: 8px;" data-i18n="pcAddonsTitle">Strategic Add-Ons</h2>','pcAddonsTitle');
rep('<p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 4px;">Advanced modules for Enterprise licensees</p>','<p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 4px;" data-i18n="addonsForEnterprise">Advanced modules for Enterprise licensees</p>','addonsForEnterprise');
rep('<p style="font-size: 0.72rem; color: var(--color-text-dim);">7 modules &middot; Priced individually &middot; Requires Enterprise tier</p>','<p style="font-size: 0.72rem; color: var(--color-text-dim);" data-i18n="tier2PremiumNote">7 modules · Priced individually · Requires Enterprise tier</p>','tier2PremiumNote');
rep('<a href="premium.html" style="font-size: 0.8rem; color: var(--color-gold); text-decoration: none;">View all Premium modules with WHO NEEDS IT qualifiers &rarr;</a>','<a href="premium.html" style="font-size: 0.8rem; color: var(--color-gold); text-decoration: none;" data-i18n="pcAddonsViewAll">View all Premium modules with WHO NEEDS IT qualifiers →</a>','pcAddonsViewAll');

// Tier 3 header
rep('<p style="font-size: 0.65rem; color: #a855f7; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;">Tier 3</p>','<p style="font-size: 0.65rem; color: #a855f7; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px;" data-i18n="pcTier3Badge">Tier 3</p>','pcTier3Badge');
rep('<h2 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 300; color: var(--color-text); margin-bottom: 8px;">Strategic</h2>','<h2 style="font-family: var(--font-display); font-size: 1.75rem; font-weight: 300; color: var(--color-text); margin-bottom: 8px;" data-i18n="pcTier3Title">Strategic</h2>','pcTier3Title');
rep('<p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 4px;">Survive &rarr; Model &rarr; Dominate &rarr; Govern Nations</p>','<p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 4px;" data-i18n="pcTier3Flow">Survive → Model → Dominate → Govern Nations</p>','pcTier3Flow');
rep('<p style="font-size: 0.72rem; color: var(--color-text-dim);">4 pillars &middot; For institutions whose decisions shape industries and nations</p>','<p style="font-size: 0.72rem; color: var(--color-text-dim);" data-i18n="tier3Note">4 pillars · For institutions whose decisions shape industries and nations</p>','tier3Note');

// Tier 3 pillar cards
rep('<div class="tier-label" style="color: #a855f7;">Pillar 9</div>','<div class="tier-label" style="color: #a855f7;" data-i18n="pcP9Num">Pillar 9</div>','pcP9Num');
rep('<p class="tier-tagline">Institutional Failure Simulation</p>','<p class="tier-tagline" data-i18n="pcP9Tag">Institutional Failure Simulation</p>','pcP9Tag');
rep('<a href="briefing.html" class="tier-cta">Contact for Briefing</a>','<a href="briefing.html" class="tier-cta" data-i18n="contactForBriefing">Contact for Briefing</a>','contactForBriefing');
rep('<div class="tier-label" style="color: #a855f7;">Pillar 10</div>','<div class="tier-label" style="color: #a855f7;" data-i18n="pcP10Num">Pillar 10</div>','pcP10Num');
rep('<p class="tier-tagline">Societal-Scale Governance Simulation</p>','<p class="tier-tagline" data-i18n="sgasTagline">Societal-Scale Governance Simulation</p>','sgasTagline');
rep('<div class="tier-label" style="color: #a855f7;">Pillar 11</div>','<div class="tier-label" style="color: #a855f7;" data-i18n="pcP11Num">Pillar 11</div>','pcP11Num');
rep('<p class="tier-tagline">Industry Domination Infrastructure</p>','<p class="tier-tagline" data-i18n="pcP11Tag">Industry Domination Infrastructure</p>','pcP11Tag');
rep('<a href="verticals.html" class="tier-cta">View Industries</a>','<a href="verticals.html" class="tier-cta" data-i18n="viewIndustriesCta">View Industries</a>','viewIndustriesCta');
rep('<div class="tier-label" style="color: #a855f7;">Pillar 12</div>','<div class="tier-label" style="color: #a855f7;" data-i18n="pcP12Num">Pillar 12</div>','pcP12Num');
rep('<p class="tier-tagline">Nation-Scale Infrastructure</p>','<p class="tier-tagline" data-i18n="pcP12Tag">Nation-Scale Infrastructure</p>','pcP12Tag');

// Natural Progression
rep('<h3 style="font-size: 0.9rem; font-weight: 500; color: var(--color-text); margin-bottom: 16px;">Natural Progression</h3>','<h3 style="font-size: 0.9rem; font-weight: 500; color: var(--color-text); margin-bottom: 16px;" data-i18n="naturalProgressionTitle">Natural Progression</h3>','naturalProgressionTitle');
rep('<strong style="color: var(--color-gold);">Pilot &rarr; Foundation:</strong> Prove value in 90 days, then deploy The Council + Decide + DCII as your decision governance layer.','<strong style="color: var(--color-gold);" data-i18n="progressionPilotLabel">Pilot → Foundation:</strong> <span data-i18n="progressionPilotDesc">Prove value in 90 days, then deploy The Council + Decide + DCII as your decision governance layer.</span>','progressionPilotLabel');
rep('<strong style="color: #3b82f6;">Foundation &rarr; Enterprise:</strong> After 6&ndash;12 months, add adversarial testing, automated compliance, governance policies, sovereign deployment, and department-level AI co-pilots.','<strong style="color: #3b82f6;" data-i18n="progressionFoundationLabel">Foundation → Enterprise:</strong> <span data-i18n="progressionFoundationDesc">After 6–12 months, add adversarial testing, automated compliance, governance policies, sovereign deployment, and department-level AI co-pilots.</span>','progressionFoundationLabel');
rep('<strong style="color: #a855f7;">Enterprise &rarr; Strategic:</strong> For institutions whose decisions shape industries, societies, and nations &mdash; institutional failure simulation, societal modeling, deep verticals, and nation-scale infrastructure.','<strong style="color: #a855f7;" data-i18n="progressionEnterpriseLabel">Enterprise → Strategic:</strong> <span data-i18n="progressionEnterpriseDesc">For institutions whose decisions shape industries, societies, and nations — institutional failure simulation, societal modeling, deep verticals, and nation-scale infrastructure.</span>','progressionEnterpriseLabel');

// Final CTA
rep('<h2>Ready to immunize your decisions?</h2>','<h2 data-i18n="pricingCtaTitle">Ready to immunize your decisions?</h2>','pricingCtaTitle');
rep('<p>Start with a 90-day pilot. Prove value on your data, your infrastructure. Every tier builds on the last.</p>','<p data-i18n="pricingCtaDesc">Start with a 90-day pilot. Prove value on your data, your infrastructure. Every tier builds on the last.</p>','pricingCtaDesc');
rep('<a href="premium.html" class="cta-button secondary">View Premium Modules</a>','<a href="premium.html" class="cta-button secondary" data-i18n="viewPremiumModules">View Premium Modules</a>','viewPremiumModules');

// Footer
rep('<p class="footer-outcome">Ready to own your AI decisions&mdash;and prove them to regulators?</p>','<p class="footer-outcome" data-i18n="footerOutcome">Ready to own your AI decisions—and prove them to regulators?</p>','footerOutcome');
rep('<a href="pilot.html" class="cta-button secondary">See Results in 90 Days</a>','<a href="pilot.html" class="cta-button secondary" data-i18n="footerSeeResults">See Results in 90 Days</a>','footerSeeResults');
rep('<p class="footer-status" style="font-family: var(--font-mono); font-size: 0.7rem; color: #2ecc71; margin-top: 16px; letter-spacing: 0.05em;">SYSTEM STATUS: AIR-GAP READY &middot; NO TRACKER PIXELS DETECTED</p>','<p class="footer-status" style="font-family: var(--font-mono); font-size: 0.7rem; color: #2ecc71; margin-top: 16px; letter-spacing: 0.05em;" data-i18n="footerStatus">SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED</p>','footerStatus');

fs.writeFileSync(FILE, html, 'utf8');
console.log('Pricing P2 done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
