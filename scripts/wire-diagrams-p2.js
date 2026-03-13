/**
 * wire-diagrams-p2.js: Wire data-i18n into diagrams.html — Diagrams 5-8, CTA, footer
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'diagrams.html');
let html = fs.readFileSync(FILE, 'utf8');
let count = 0;
function rep(o, n, k) {
  if (!html.includes(o)) { console.log('NOT FOUND: ' + k); return; }
  html = html.replace(o, n); count++;
}

// Diagram 5: Industry Verticals Matrix
rep('<p class="diagram-section-label">Diagram 5 of 8</p>','<p class="diagram-section-label" data-i18n="diag5Label">Diagram 5 of 8</p>','diag5Label');
rep('<h2 class="diagram-section-title">Industry Verticals</h2>','<h2 class="diagram-section-title" data-i18n="diag5Title">Industry Verticals</h2>','diag5Title');
rep('<p class="diagram-section-desc">8 deep industry verticals with full agent stacks, compliance mappings, and decision schemas. 13 additional sector templates in active development. Flagship verticals highlighted in gold.</p>','<p class="diagram-section-desc" data-i18n="diag5Desc">8 deep industry verticals with full agent stacks, compliance mappings, and decision schemas. 13 additional sector templates in active development. Flagship verticals highlighted in gold.</p>','diag5Desc');

// Diagram 6: SGAS Agents
rep('<p class="diagram-section-label">Diagram 6 of 8</p>','<p class="diagram-section-label" data-i18n="diag6Label">Diagram 6 of 8</p>','diag6Label');
rep('<h2 class="diagram-section-title">SGAS &mdash; 5 Agent Classes</h2>','<h2 class="diagram-section-title" data-i18n="diag6Title">SGAS — 5 Agent Classes</h2>','diag6Title');
rep('<p class="diagram-section-desc">The Synthetic Governance Agent System runs societal-scale simulations with 5 distinct agent classes, orchestrated by a central coordinator.</p>','<p class="diagram-section-desc" data-i18n="diag6Desc">The Synthetic Governance Agent System runs societal-scale simulations with 5 distinct agent classes, orchestrated by a central coordinator.</p>','diag6Desc');
rep('<div class="sgas-orch-label">Central Coordinator</div>','<div class="sgas-orch-label" data-i18n="diag6OrchLabel">Central Coordinator</div>','diag6OrchLabel');
rep('<div class="sgas-orch-name">SGAS Orchestrator</div>','<div class="sgas-orch-name" data-i18n="diag6OrchName">SGAS Orchestrator</div>','diag6OrchName');
rep('<div class="sgas-agent-name">Institutional</div>','<div class="sgas-agent-name" data-i18n="diag6Agent1Name">Institutional</div>','diag6Agent1Name');
rep('<div class="sgas-agent-name">Observer</div>','<div class="sgas-agent-name" data-i18n="diag6Agent2Name">Observer</div>','diag6Agent2Name');
rep('<div class="sgas-agent-name">Decision</div>','<div class="sgas-agent-name" data-i18n="diag6Agent3Name">Decision</div>','diag6Agent3Name');
rep('<div class="sgas-agent-name">Adversarial</div>','<div class="sgas-agent-name" data-i18n="diag6Agent4Name">Adversarial</div>','diag6Agent4Name');
rep('<div class="sgas-agent-name">Meta-Governance</div>','<div class="sgas-agent-name" data-i18n="diag6Agent5Name">Meta-Governance</div>','diag6Agent5Name');

// Diagram 7: Trust Chain
rep('<p class="diagram-section-label">Diagram 7 of 8</p>','<p class="diagram-section-label" data-i18n="diag7Label">Diagram 7 of 8</p>','diag7Label');
rep('<h2 class="diagram-section-title">Trust &amp; Evidence Chain</h2>','<h2 class="diagram-section-title" data-i18n="diag7Title">Trust &amp; Evidence Chain</h2>','diag7Title');
rep('<p class="diagram-section-desc">Every decision passes through a cryptographic chain of custody. From deliberation to forensic-grade, independently verifiable evidence in 6 steps.</p>','<p class="diagram-section-desc" data-i18n="diag7Desc">Every decision passes through a cryptographic chain of custody. From deliberation to forensic-grade, independently verifiable evidence in 6 steps.</p>','diag7Desc');
rep('<div class="trust-name">Deliberation</div>','<div class="trust-name" data-i18n="diag7Node1Name">Deliberation</div>','diag7Node1Name');
rep('<div class="trust-desc">Council produces reasoning, dissent, and recommendation</div>','<div class="trust-desc" data-i18n="diag7Node1Desc">Council produces reasoning, dissent, and recommendation</div>','diag7Node1Desc');
rep('<div class="trust-name">Ledger</div>','<div class="trust-name" data-i18n="diag7Node2Name">Ledger</div>','diag7Node2Name');
rep('<div class="trust-desc">Immutable hash-chained record created</div>','<div class="trust-desc" data-i18n="diag7Node2Desc">Immutable hash-chained record created</div>','diag7Node2Desc');
rep('<div class="trust-name">Notary</div>','<div class="trust-name" data-i18n="diag7Node3Name">Notary</div>','diag7Node3Name');
rep('<div class="trust-desc">Cryptographic signature with customer-owned keys</div>','<div class="trust-desc" data-i18n="diag7Node3Desc">Cryptographic signature with customer-owned keys</div>','diag7Node3Desc');
rep('<div class="trust-name">Timestamp</div>','<div class="trust-name" data-i18n="diag7Node4Name">Timestamp</div>','diag7Node4Name');
rep('<div class="trust-desc">RFC 3161 external timestamp authority</div>','<div class="trust-desc" data-i18n="diag7Node4Desc">RFC 3161 external timestamp authority</div>','diag7Node4Desc');
rep('<div class="trust-name">Vault</div>','<div class="trust-name" data-i18n="diag7Node5Name">Vault</div>','diag7Node5Name');
rep('<div class="trust-desc">Encrypted evidence bundle stored with AES-256</div>','<div class="trust-desc" data-i18n="diag7Node5Desc">Encrypted evidence bundle stored with AES-256</div>','diag7Node5Desc');
rep('<div class="trust-name">Provenance</div>','<div class="trust-name" data-i18n="diag7Node6Name">Provenance</div>','diag7Node6Name');
rep('<div class="trust-desc">forensic-grade, independently verifiable export with full lineage</div>','<div class="trust-desc" data-i18n="diag7Node6Desc">forensic-grade, independently verifiable export with full lineage</div>','diag7Node6Desc');

// Diagram 8: Compliance Matrix
rep('<p class="diagram-section-label">Diagram 8 of 8</p>','<p class="diagram-section-label" data-i18n="diag8Label">Diagram 8 of 8</p>','diag8Label');
rep('<h2 class="diagram-section-title">Compliance Framework &times; Jurisdiction Matrix</h2>','<h2 class="diagram-section-title" data-i18n="diag8Title">Compliance Framework &times; Jurisdiction Matrix</h2>','diag8Title');
rep('<p class="diagram-section-desc">10 compliance frameworks mapped against 17 supported jurisdictions. Gold = full coverage. Dim gold = partial. Dark = not applicable.</p>','<p class="diagram-section-desc" data-i18n="diag8Desc">10 compliance frameworks mapped against 17 supported jurisdictions. Gold = full coverage. Dim gold = partial. Dark = not applicable.</p>','diag8Desc');
rep('<th>Framework</th>','<th data-i18n="diag8ColFramework">Framework</th>','diag8ColFramework');

// Final CTA section
rep('<p style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-gold); margin-bottom: 12px;">Ready to explore?</p>',
    '<p style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--color-gold); margin-bottom: 12px;" data-i18n="diagCtaLabel">Ready to explore?</p>','diagCtaLabel');
rep('<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 300; color: var(--color-text); margin-bottom: 20px;">See it running on your infrastructure</h2>',
    '<h2 style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 300; color: var(--color-text); margin-bottom: 20px;" data-i18n="diagCtaTitle">See it running on your infrastructure</h2>','diagCtaTitle');
rep('<a href="briefing.html" style="display: inline-block; padding: 14px 36px; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.05em; color: var(--color-gold); border: 1px solid var(--color-gold); border-radius: 4px; text-decoration: none; transition: all 0.2s;">Request Technical Briefing &rarr;</a>',
    '<a href="briefing.html" style="display: inline-block; padding: 14px 36px; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.05em; color: var(--color-gold); border: 1px solid var(--color-gold); border-radius: 4px; text-decoration: none; transition: all 0.2s;" data-i18n="diagCtaBtn">Request Technical Briefing →</a>','diagCtaBtn');

// Footer
rep('<p>&copy; 2024&ndash;2026 Datacendia, LLC. All rights reserved.</p>',
    '<p data-i18n="diagFooterCopy">&copy; 2024–2026 Datacendia, LLC. All rights reserved.</p>','diagFooterCopy');

fs.writeFileSync(FILE, html, 'utf8');
console.log('Diagrams P2 done — ' + count + ' replacements.');
console.log('data-i18n count total: ' + (html.match(/data-i18n/g)||[]).length);
