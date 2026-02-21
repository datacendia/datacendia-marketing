/**
 * Part 3: Wire data-i18n into index.html — Tier Progression + IISS + Deployment + Trust + Buyer + Architecture + FAQ
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

// ── TIER PROGRESSION ─────────────────────────────────────────────────────────
rep(
  '<p class="tier-label">Progressive Disclosure &mdash; 12 Pillars Across 3 Tiers</p>',
  '<p class="tier-label" data-i18n="tierLabel">Progressive Disclosure — 12 Pillars Across 3 Tiers</p>',
  'tierLabel'
);
rep(
  '<div class="tier-name tier-name--gold">Tier 1: Foundation</div>',
  '<div class="tier-name tier-name--gold" data-i18n="tier1Name">Tier 1: Foundation</div>',
  'tier1Name'
);
rep(
  '<div class="tier-pillars">The Council &middot; Decide &middot; DCII</div>',
  '<div class="tier-pillars" data-i18n="tier1Pillars">The Council · Decide · DCII</div>',
  'tier1Pillars'
);
rep(
  '<div class="tier-flow">Make &rarr; Understand &rarr; Prove</div>',
  '<div class="tier-flow" data-i18n="tier1Flow">Make → Understand → Prove</div>',
  'tier1Flow'
);
rep(
  '<div class="tier-name tier-name--blue">Tier 2: Enterprise</div>',
  '<div class="tier-name tier-name--blue" data-i18n="tier2Name">Tier 2: Enterprise</div>',
  'tier2Name'
);
rep(
  '<div class="tier-pillars">Stress-Test &middot; Comply &middot; Govern &middot; Sovereign &middot; Operate</div>',
  '<div class="tier-pillars" data-i18n="tier2Pillars">Stress-Test · Comply · Govern · Sovereign · Operate</div>',
  'tier2Pillars'
);
rep(
  '<div class="tier-flow">Harden &rarr; Scale &rarr; Automate</div>',
  '<div class="tier-flow" data-i18n="tier2Flow">Harden → Scale → Automate</div>',
  'tier2Flow'
);
rep(
  '<div class="tier-name tier-name--purple">Tier 3: Strategic</div>',
  '<div class="tier-name tier-name--purple" data-i18n="tier3Name">Tier 3: Strategic</div>',
  'tier3Name'
);
rep(
  '<div class="tier-pillars">Collapse &middot; SGAS &middot; Verticals &middot; Frontier</div>',
  '<div class="tier-pillars" data-i18n="tier3Pillars">Collapse · SGAS · Verticals · Frontier</div>',
  'tier3Pillars'
);
rep(
  '<div class="tier-flow">Survive &rarr; Model &rarr; Dominate &rarr; Govern</div>',
  '<div class="tier-flow" data-i18n="tier3Flow">Survive → Model → Dominate → Govern</div>',
  'tier3Flow'
);
rep(
  '<a href="pricing.html" class="link-gold" style="font-size:0.78rem;">View Full Pricing &amp; Capabilities &rarr;</a>',
  '<a href="pricing.html" class="link-gold" style="font-size:0.78rem;" data-i18n="viewFullPricing">View Full Pricing &amp; Capabilities →</a>',
  'viewFullPricing'
);

// ── IISS ─────────────────────────────────────────────────────────────────────
rep(
  '<p class="section-label">The Metric</p>',
  '<p class="section-label" data-i18n="metricLabel">The Metric</p>',
  'metricLabel'
);
rep(
  '<h2 class="iiss-title">The Institutional Immune System Score&trade;</h2>',
  '<h2 class="iiss-title" data-i18n="iissTitle">The Institutional Immune System Score™</h2>',
  'iissTitle'
);
rep(
  '<p class="iiss-subtitle">Like FICO for institutional survival.</p>',
  '<p class="iiss-subtitle" data-i18n="iissSubtitle">Like FICO for institutional survival.</p>',
  'iissSubtitle'
);
rep(
  '<p class="iiss-desc">A 0&ndash;1000 score measuring your organization&rsquo;s crisis resilience &mdash; calculated from DCII evidence across the 9 primitives.</p>',
  '<p class="iiss-desc" data-i18n="iissDesc">A 0–1000 score measuring your organization\'s crisis resilience — calculated from DCII evidence across the 9 primitives.</p>',
  'iissDesc'
);
rep(
  '<div class="iiss-label">Exceptional</div>',
  '<div class="iiss-label" data-i18n="iissExceptional">Exceptional</div>',
  'iissExceptional'
);
rep(
  '<div class="iiss-label">Excellent</div>',
  '<div class="iiss-label" data-i18n="iissExcellent">Excellent</div>',
  'iissExcellent'
);
rep(
  '<div class="iiss-label">Good</div>',
  '<div class="iiss-label" data-i18n="iissGood">Good</div>',
  'iissGood'
);
rep(
  '<div class="iiss-label">Fair</div>',
  '<div class="iiss-label" data-i18n="iissFair">Fair</div>',
  'iissFair'
);
rep(
  '<div class="iiss-label">Critical</div>',
  '<div class="iiss-label" data-i18n="iissCritical">Critical</div>',
  'iissCritical'
);
rep(
  '<div class="iiss-benefit"><strong>Insurance carriers:</strong> Projected 20&ndash;40% premium reduction for scores &gt;800 <em style="font-size:0.75em; color:var(--color-text-dim);">(target — not yet verified by carriers)</em></div>',
  '<div class="iiss-benefit" data-i18n="iissBenefit1"><strong>Insurance carriers:</strong> Projected 20–40% premium reduction for scores &gt;800 <em style="font-size:0.75em; color:var(--color-text-dim);">(target — not yet verified by carriers)</em></div>',
  'iissBenefit1'
);
rep(
  '<div class="iiss-benefit"><strong>Institutional investors:</strong> ESG funds targeting scores &gt;700 <em style="font-size:0.75em; color:var(--color-text-dim);">(projected threshold)</em></div>',
  '<div class="iiss-benefit" data-i18n="iissBenefit2"><strong>Institutional investors:</strong> ESG funds targeting scores &gt;700 <em style="font-size:0.75em; color:var(--color-text-dim);">(projected threshold)</em></div>',
  'iissBenefit2'
);
rep(
  '<div class="iiss-benefit"><strong>Regulators:</strong> Scores &gt;850 designed for streamlined review eligibility</div>',
  '<div class="iiss-benefit" data-i18n="iissBenefit3"><strong>Regulators:</strong> Scores &gt;850 designed for streamlined review eligibility</div>',
  'iissBenefit3'
);
rep(
  '<div class="iiss-benefit"><strong>Competition:</strong> &ldquo;What&rsquo;s your IISS?&rdquo; becomes the question</div>',
  '<div class="iiss-benefit" data-i18n="iissBenefit4"><strong>Competition:</strong> "What\'s your IISS?" becomes the question</div>',
  'iissBenefit4'
);
rep(
  '<a href="dcii.html" class="btn-gold">Calculate Your IISS Score →</a>',
  '<a href="dcii.html" class="btn-gold" data-i18n="iissCalculateCta">Calculate Your IISS Score →</a>',
  'iissCalculateCta'
);

// ── DEPLOYMENT OPTIONS ────────────────────────────────────────────────────────
rep(
  '<p class="deploy-title">Sovereign Deployment Options</p>',
  '<p class="deploy-title" data-i18n="deployTitle">Sovereign Deployment Options</p>',
  'deployTitle'
);
rep(
  '<p class="deploy-desc">Choose where Datacendia runs. All modes produce identical cryptographic evidence.</p>',
  '<p class="deploy-desc" data-i18n="deployDesc">Choose where Datacendia runs. All modes produce identical cryptographic evidence.</p>',
  'deployDesc'
);
rep(
  '<div class="deploy-option-name">Cloud</div>',
  '<div class="deploy-option-name" data-i18n="deployCloud">Cloud</div>',
  'deployCloud'
);
rep(
  '<div class="tier-flow">AWS · Azure · GCP</div>',
  '<div class="tier-flow" data-i18n="deployCloudSub">AWS · Azure · GCP</div>',
  'deployCloudSub'
);
rep(
  '<div class="deploy-option-name">Private Cloud</div>',
  '<div class="deploy-option-name" data-i18n="deployPrivate">Private Cloud</div>',
  'deployPrivate'
);
rep(
  '<div class="tier-flow">Your VPC</div>',
  '<div class="tier-flow" data-i18n="deployPrivateSub">Your VPC</div>',
  'deployPrivateSub'
);
rep(
  '<div class="deploy-option-name">On-Premises</div>',
  '<div class="deploy-option-name" data-i18n="deployOnPrem">On-Premises</div>',
  'deployOnPrem'
);
rep(
  '<div class="tier-flow">Your data center</div>',
  '<div class="tier-flow" data-i18n="deployOnPremSub">Your data center</div>',
  'deployOnPremSub'
);
rep(
  '<div class="deploy-option-name">Air-Gapped</div>',
  '<div class="deploy-option-name" data-i18n="deployAirGap">Air-Gapped</div>',
  'deployAirGap'
);
rep(
  '<div class="tier-flow">Isolated networks</div>',
  '<div class="tier-flow" data-i18n="deployAirGapSub">Isolated networks</div>',
  'deployAirGapSub'
);
rep(
  'All deployment modes provide: your encryption keys (KMS/HSM) · immutable audit ledger (your control) · evidence export (standard formats) · no vendor lock-in',
  '<span data-i18n="deployNote">All deployment modes provide: your encryption keys (KMS/HSM) · immutable audit ledger (your control) · evidence export (standard formats) · no vendor lock-in</span>',
  'deployNote'
);

// ── TRUST LAYER ───────────────────────────────────────────────────────────────
rep(
  '<p class="trust-what-sub">Not BI. Not another AI API. A decision layer that proves why it decided what it decided.</p>',
  '<p class="trust-what-sub" data-i18n="trustWhatSub">Not BI. Not another AI API. A decision layer that proves why it decided what it decided.</p>',
  'trustWhatSub'
);
rep(
  '<span class="label-sub">99.9% pass rate · <time datetime="2026-02">Feb 8, 2026</time></span>',
  '<span class="label-sub" data-i18n="trustMetricSub1">99.9% pass rate · Feb 8, 2026</span>',
  'trustMetricSub1'
);
rep(
  '<span class="label-sub">5 classes · durable across multiple verticals</span>',
  '<span class="label-sub" data-i18n="trustMetricSub2">5 classes · durable across multiple verticals</span>',
  'trustMetricSub2'
);
rep(
  '<span class="label-sub">OWASP LLM Top 10 coverage</span>',
  '<span class="label-sub" data-i18n="trustMetricSub3">OWASP LLM Top 10 coverage</span>',
  'trustMetricSub3'
);
rep(
  '<span class="label-sub">Full i18n localization</span>',
  '<span class="label-sub" data-i18n="trustMetricSub4">Full i18n localization</span>',
  'trustMetricSub4'
);
rep(
  '<span class="label-sub">Cloud · Private · On-Prem · Air-Gap</span>',
  '<span class="label-sub" data-i18n="trustMetricSub5">Cloud · Private · On-Prem · Air-Gap</span>',
  'trustMetricSub5'
);

// ── BUYER ANCHOR ─────────────────────────────────────────────────────────────
rep(
  '<span class="standard-badge">CISOs &amp; Security Leaders</span>',
  '<span class="standard-badge" data-i18n="cisosBadge">CISOs &amp; Security Leaders</span>',
  'cisosBadge'
);
rep(
  '<span class="standard-badge">Chief Risk Officers</span>',
  '<span class="standard-badge" data-i18n="croBadge">Chief Risk Officers</span>',
  'croBadge'
);
rep(
  '<span class="standard-badge">General Counsel</span>',
  '<span class="standard-badge" data-i18n="gcBadge">General Counsel</span>',
  'gcBadge'
);
rep(
  '<span class="standard-badge">Chief Model Risk Officers</span>',
  '<span class="standard-badge" data-i18n="cmroBadge">Chief Model Risk Officers</span>',
  'cmroBadge'
);
rep(
  '<span class="standard-badge">Board-Level Oversight</span>',
  '<span class="standard-badge" data-i18n="boardBadge">Board-Level Oversight</span>',
  'boardBadge'
);
rep(
  '<span class="standard-badge">Compliance &amp; Governance</span>',
  '<span class="standard-badge" data-i18n="complianceBadge">Compliance &amp; Governance</span>',
  'complianceBadge'
);
rep(
  '<span class="standard-badge">National Security &amp; Defense</span>',
  '<span class="standard-badge" data-i18n="defenseBadge">National Security &amp; Defense</span>',
  'defenseBadge'
);
rep(
  '<span class="standard-badge">Hospital CIOs &amp; CMIOs</span>',
  '<span class="standard-badge" data-i18n="healthcareBadge">Hospital CIOs &amp; CMIOs</span>',
  'healthcareBadge'
);
rep(
  '<span class="standard-badge">Sporting Directors &amp; Club Boards</span>',
  '<span class="standard-badge" data-i18n="sportsBadge">Sporting Directors &amp; Club Boards</span>',
  'sportsBadge'
);
rep(
  '<span class="standard-badge">Regulated Financial Services</span>',
  '<span class="standard-badge" data-i18n="financialBadge">Regulated Financial Services</span>',
  'financialBadge'
);
rep(
  '<span class="standard-badge">Government Contracting Officers</span>',
  '<span class="standard-badge" data-i18n="govBadge">Government Contracting Officers</span>',
  'govBadge'
);
rep(
  '<span class="standard-badge">Investors &amp; Portfolio Governance</span>',
  '<span class="standard-badge" data-i18n="investorBadge">Investors &amp; Portfolio Governance</span>',
  'investorBadge'
);

// ── ARCHITECTURE ─────────────────────────────────────────────────────────────
rep(
  '<p class="section-label">How It Works</p>',
  '<p class="section-label" data-i18n="howItWorksLabel">How It Works</p>',
  'howItWorksLabel'
);
rep(
  '<h2 class="section-headline">60-Second Architecture</h2>',
  '<h2 class="section-headline" data-i18n="architectureTitle">60-Second Architecture</h2>',
  'architectureTitle'
);
rep(
  '<div class="arch-label">Data Sources</div>',
  '<div class="arch-label" data-i18n="archDataSources">Data Sources</div>',
  'archDataSources'
);
rep(
  '<div class="arch-desc">ERP, CRM, BI tools, databases</div>',
  '<div class="arch-desc" data-i18n="archDataSourcesDesc">ERP, CRM, BI tools, databases</div>',
  'archDataSourcesDesc'
);
rep(
  '<div class="arch-label">Connector Suites</div>',
  '<div class="arch-label" data-i18n="archConnectors">Connector Suites</div>',
  'archConnectors'
);
rep(
  '<div class="arch-desc">16 suites on 6 universal adapters</div>',
  '<div class="arch-desc" data-i18n="archConnectorsDesc">16 suites on 6 universal adapters</div>',
  'archConnectorsDesc'
);
rep(
  '<div class="arch-label">Evidence Ledger</div>',
  '<div class="arch-label" data-i18n="archEvidenceLedger">Evidence Ledger</div>',
  'archEvidenceLedger'
);
rep(
  '<div class="arch-desc">Immutable lineage + signatures</div>',
  '<div class="arch-desc" data-i18n="archEvidenceLedgerDesc">Immutable lineage + signatures</div>',
  'archEvidenceLedgerDesc'
);
rep(
  '<div class="arch-label">The Council™</div>',
  '<div class="arch-label" data-i18n="archCouncil">The Council™</div>',
  'archCouncil'
);
rep(
  '<div class="arch-desc">Multi-agent deliberation</div>',
  '<div class="arch-desc" data-i18n="archCouncilDesc">Multi-agent deliberation</div>',
  'archCouncilDesc'
);
rep(
  '<div class="arch-label">Export Packets</div>',
  '<div class="arch-label" data-i18n="archExport">Export Packets</div>',
  'archExport'
);
rep(
  '<div class="arch-desc">PDF, JSON, regulator-ready</div>',
  '<div class="arch-desc" data-i18n="archExportDesc">PDF, JSON, regulator-ready</div>',
  'archExportDesc'
);
rep(
  "<p class=\"architecture-note\">All processing on <em>your</em> infrastructure. Keys in <em>your</em> KMS. Evidence in <em>your</em> ledger.</p>",
  '<p class="architecture-note" data-i18n="archNote">All processing on <em>your</em> infrastructure. Keys in <em>your</em> KMS. Evidence in <em>your</em> ledger.</p>',
  'archNote'
);

// ── FAQ ───────────────────────────────────────────────────────────────────────
rep(
  '<h2 class="faq-headline">How is this different?</h2>',
  '<h2 class="faq-headline" data-i18n="faqTitle">How is this different?</h2>',
  'faqTitle'
);
rep(
  '<summary>Is this BI?</summary>',
  '<summary data-i18n="faqBiQ">Is this BI?</summary>',
  'faqBiQ'
);
rep(
  '<p>No. BI dashboards show you what happened. Datacendia shows you what to do about it—with multi-agent deliberation that weighs trade-offs, surfaces dissent, and produces audit-ready evidence for every recommendation.</p>',
  '<p data-i18n="faqBiA">No. BI dashboards show you what happened. Datacendia shows you what to do about it—with multi-agent deliberation that weighs trade-offs, surfaces dissent, and produces audit-ready evidence for every recommendation.</p>',
  'faqBiA'
);
rep(
  '<summary>Is this another AI API?</summary>',
  '<summary data-i18n="faqApiQ">Is this another AI API?</summary>',
  'faqApiQ'
);
rep(
  '<p>No. AI APIs give you predictions without proof. Datacendia runs on your infrastructure, logs every decision to an immutable ledger you control, and exports evidence packets that satisfy regulators—not just executives.</p>',
  '<p data-i18n="faqApiA">No. AI APIs give you predictions without proof. Datacendia runs on your infrastructure, logs every decision to an immutable ledger you control, and exports evidence packets that satisfy regulators—not just executives.</p>',
  'faqApiA'
);
rep(
  '<summary>Is this analytics + AI agents?</summary>',
  '<summary data-i18n="faqAnalyticsQ">Is this analytics + AI agents?</summary>',
  'faqAnalyticsQ'
);
rep(
  '<p>Closer, but incomplete. Analytics + agents still typically run in vendor clouds with opaque reasoning. Datacendia adds sovereignty (your infrastructure), governance (40+ specialized agents that deliberate across 5 classes), and auditability (cryptographic proof of every decision).</p>',
  '<p data-i18n="faqAnalyticsA">Closer, but incomplete. Analytics + agents still typically run in vendor clouds with opaque reasoning. Datacendia adds sovereignty (your infrastructure), governance (40+ specialized agents that deliberate across 5 classes), and auditability (cryptographic proof of every decision).</p>',
  'faqAnalyticsA'
);
rep(
  '<summary>Why "Sovereign"?</summary>',
  '<summary data-i18n="faqSovereignQ">Why "Sovereign"?</summary>',
  'faqSovereignQ'
);
rep(
  '<p>Because your data never leaves your control. In on-prem and air-gapped deployments, no vendor custody of customer data—CLOUD Act exposure depends on your infrastructure choices. No vendor lock-in. No "trust us" black boxes. You own the infrastructure, the keys, and the audit trail. That\'s sovereignty.</p>',
  '<p data-i18n="faqSovereignA">Because your data never leaves your control. In on-prem and air-gapped deployments, no vendor custody of customer data—CLOUD Act exposure depends on your infrastructure choices. No vendor lock-in. No "trust us" black boxes. You own the infrastructure, the keys, and the audit trail. That\'s sovereignty.</p>',
  'faqSovereignA'
);
rep(
  '<summary>How does this help a bank pass a regulatory exam?</summary>',
  '<summary data-i18n="faqBankQ">How does this help a bank pass a regulatory exam?</summary>',
  'faqBankQ'
);
rep(
  '<p>Datacendia produces audit-ready evidence packets mapped to SR 11-7 model risk management requirements. Override Accountability (P3) documents every instance a human overrides a model recommendation — exactly what OCC/Fed examiners ask for. Discovery-Time Proof (P1) establishes when risks were identified, satisfying "knew or should have known" standards.</p>',
  '<p data-i18n="faqBankA">Datacendia produces audit-ready evidence packets mapped to SR 11-7 model risk management requirements. Override Accountability (P3) documents every instance a human overrides a model recommendation — exactly what OCC/Fed examiners ask for. Discovery-Time Proof (P1) establishes when risks were identified, satisfying "knew or should have known" standards.</p>',
  'faqBankA'
);
rep(
  '<summary>Can a hospital use this for clinical decisions?</summary>',
  '<summary data-i18n="faqHospitalQ">Can a hospital use this for clinical decisions?</summary>',
  'faqHospitalQ'
);
rep(
  '<p>Datacendia governs the decision process, not the clinical recommendation itself — it is not a diagnostic tool and does not fall under FDA Clinical Decision Support guidance (21st Century Cures Act §3060). It captures deliberation, documents protocol deviations, and produces evidence for Joint Commission sentinel event reviews and CMS compliance.</p>',
  '<p data-i18n="faqHospitalA">Datacendia governs the decision process, not the clinical recommendation itself — it is not a diagnostic tool and does not fall under FDA Clinical Decision Support guidance (21st Century Cures Act §3060). It captures deliberation, documents protocol deviations, and produces evidence for Joint Commission sentinel event reviews and CMS compliance.</p>',
  'faqHospitalA'
);
rep(
  '<summary>How does this apply to football / sports?</summary>',
  '<summary data-i18n="faqSportsQ">How does this apply to football / sports?</summary>',
  'faqSportsQ'
);
rep(
  '<p>Transfer decisions, FFP/PSR compliance, wage-to-revenue monitoring, and manager succession planning. Drift Detection (P5) flags when your wage ratio creeps toward the Premier League PSR threshold across windows. Continuity Memory (P4) preserves scouting intelligence and tactical decisions through manager turnover. <a href="demos/sports-governance.html" class="link-gold">Try the transfer demo →</a></p>',
  '<p data-i18n="faqSportsA">Transfer decisions, FFP/PSR compliance, wage-to-revenue monitoring, and manager succession planning. Drift Detection (P5) flags when your wage ratio creeps toward the Premier League PSR threshold across windows. Continuity Memory (P4) preserves scouting intelligence and tactical decisions through manager turnover. <a href="demos/sports-governance.html" class="link-gold" data-i18n="faqSportsLink">Try the transfer demo →</a></p>',
  'faqSportsA'
);
rep(
  '<summary>What makes this investable as a category?</summary>',
  '<summary data-i18n="faqInvestQ">What makes this investable as a category?</summary>',
  'faqInvestQ'
);
rep(
  '<p>Decision Crisis Immunization Infrastructure is a new category — no incumbent owns it. The TAM spans every regulated industry making high-stakes decisions: banking, healthcare, defense, and sports. Crisis Immunization is the positioning wedge that opens the door.</p>',
  '<p data-i18n="faqInvestA">Decision Crisis Immunization Infrastructure is a new category — no incumbent owns it. The TAM spans every regulated industry making high-stakes decisions: banking, healthcare, defense, and sports. Crisis Immunization is the positioning wedge that opens the door.</p>',
  'faqInvestA'
);

fs.writeFileSync(FILE, html, 'utf8');
console.log('Part 3 done — ' + count + ' replacements applied.');
console.log('data-i18n count now: ' + (html.match(/data-i18n/g) || []).length);
