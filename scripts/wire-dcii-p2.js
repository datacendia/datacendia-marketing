/**
 * wire-dcii-p2.js: Services 3-7 + impact section + contact box + footer
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'dcii.html');
let html = fs.readFileSync(FILE, 'utf8');
let count = 0;
function rep(o, n, k) {
  if (!html.includes(o)) { console.log('NOT FOUND: ' + k); return; }
  html = html.replace(o, n); count++;
}

// Service 3: Jurisdiction
rep('<p class="service-tagline">Cross-Jurisdiction Compliance Conflict Detection</p>','<p class="service-tagline" data-i18n="dciiS3Tagline">Cross-Jurisdiction Compliance Conflict Detection</p>','dciiS3Tagline');
rep('<div class="capability-name">Conflict Detection</div>','<div class="capability-name" data-i18n="dciiS3Cap1Name">Conflict Detection</div>','dciiS3Cap1Name');
rep('<div class="capability-desc">Simultaneous evaluation against multiple regulatory frameworks with automated conflict identification and severity ranking.</div>','<div class="capability-desc" data-i18n="dciiS3Cap1Desc">Simultaneous evaluation against multiple regulatory frameworks with automated conflict identification and severity ranking.</div>','dciiS3Cap1Desc');
rep('<div class="capability-name">Good-Faith Documentation</div>','<div class="capability-name" data-i18n="dciiS3Cap2Name">Good-Faith Documentation</div>','dciiS3Cap2Name');
rep('<div class="capability-desc">When regulations conflict irreconcilably, generate documentation proving maximum compliance effort across all jurisdictions.</div>','<div class="capability-desc" data-i18n="dciiS3Cap2Desc">When regulations conflict irreconcilably, generate documentation proving maximum compliance effort across all jurisdictions.</div>','dciiS3Cap2Desc');
rep('<div class="capability-name">Resolution Strategies</div>','<div class="capability-name" data-i18n="dciiS3Cap3Name">Resolution Strategies</div>','dciiS3Cap3Name');
rep('<div class="capability-desc">Legal authority ranking, mutual recognition agreements, and recommended approaches to navigate conflicting requirements.</div>','<div class="capability-desc" data-i18n="dciiS3Cap3Desc">Legal authority ranking, mutual recognition agreements, and recommended approaches to navigate conflicting requirements.</div>','dciiS3Cap3Desc');
rep('<div class="capability-name">17+ Jurisdictions</div>','<div class="capability-name" data-i18n="dciiS3Cap4Name">17+ Jurisdictions</div>','dciiS3Cap4Name');
rep('<div class="capability-desc">EU, US (federal + state), UK, China, Japan, Brazil, Canada, Australia, Singapore, India, South Korea, Switzerland, South Africa, and more.</div>','<div class="capability-desc" data-i18n="dciiS3Cap4Desc">EU, US (federal + state), UK, China, Japan, Brazil, Canada, Australia, Singapore, India, South Korea, Switzerland, South Africa, and more.</div>','dciiS3Cap4Desc');

// Service 4: Timestamp
rep('<p class="service-tagline">RFC 3161 External Timestamp Authority</p>','<p class="service-tagline" data-i18n="dciiS4Tagline">RFC 3161 External Timestamp Authority</p>','dciiS4Tagline');
rep('<div class="capability-name">Multi-Provider TSA</div>','<div class="capability-name" data-i18n="dciiS4Cap1Name">Multi-Provider TSA</div>','dciiS4Cap1Name');
rep('<div class="capability-desc">DigiCert, Comodo, GlobalSign, Entrust, or internal TSA. Dual-timestamp strategy: internal + external for defense-in-depth.</div>','<div class="capability-desc" data-i18n="dciiS4Cap1Desc">DigiCert, Comodo, GlobalSign, Entrust, or internal TSA. Dual-timestamp strategy: internal + external for defense-in-depth.</div>','dciiS4Cap1Desc');
rep('<div class="capability-name">Blockchain Anchoring</div>','<div class="capability-name" data-i18n="dciiS4Cap2Name">Blockchain Anchoring</div>','dciiS4Cap2Name');
rep('<div class="capability-desc">Optional anchoring to Bitcoin or Ethereum for decisions where the highest level of temporal proof is required.</div>','<div class="capability-desc" data-i18n="dciiS4Cap2Desc">Optional anchoring to Bitcoin or Ethereum for decisions where the highest level of temporal proof is required.</div>','dciiS4Cap2Desc');
rep('<div class="capability-name">Batch Timestamping</div>','<div class="capability-name" data-i18n="dciiS4Cap3Name">Batch Timestamping</div>','dciiS4Cap3Name');
rep('<div class="capability-desc">High-volume operations timestamped efficiently with certificate chain validation and token storage.</div>','<div class="capability-desc" data-i18n="dciiS4Cap3Desc">High-volume operations timestamped efficiently with certificate chain validation and token storage.</div>','dciiS4Cap3Desc');
rep('<div class="capability-name">EU Qualified Timestamps</div>','<div class="capability-name" data-i18n="dciiS4Cap4Name">EU Qualified Timestamps</div>','dciiS4Cap4Name');
rep('<div class="capability-desc">ETSI EN 319 421 compliant for legally binding timestamps recognized across EU member states.</div>','<div class="capability-desc" data-i18n="dciiS4Cap4Desc">ETSI EN 319 421 compliant for legally binding timestamps recognized across EU member states.</div>','dciiS4Cap4Desc');

// Service 5: Similarity
rep('<p class="service-tagline">Decision Similarity Engine</p>','<p class="service-tagline" data-i18n="dciiS5Tagline">Decision Similarity Engine</p>','dciiS5Tagline');
rep('<div class="capability-name">Semantic Search</div>','<div class="capability-name" data-i18n="dciiS5Cap1Name">Semantic Search</div>','dciiS5Cap1Name');
rep('<div class="capability-desc">TF-IDF semantic similarity across all historical Decision DNA records. Context-aware matching by industry, department, urgency, and decision type.</div>','<div class="capability-desc" data-i18n="dciiS5Cap1Desc">TF-IDF semantic similarity across all historical Decision DNA records. Context-aware matching by industry, department, urgency, and decision type.</div>','dciiS5Cap1Desc');
rep('<div class="capability-name">Outcome-Aware Matching</div>','<div class="capability-name" data-i18n="dciiS5Cap2Name">Outcome-Aware Matching</div>','dciiS5Cap2Name');
rep('<div class="capability-desc">When a new decision is proposed, automatically surface what happened last time — including whether the decision succeeded or failed.</div>','<div class="capability-desc" data-i18n="dciiS5Cap2Desc">When a new decision is proposed, automatically surface what happened last time — including whether the decision succeeded or failed.</div>','dciiS5Cap2Desc');
rep('<div class="capability-name">Cross-Silo Detection</div>','<div class="capability-name" data-i18n="dciiS5Cap3Name">Cross-Silo Detection</div>','dciiS5Cap3Name');
rep('<div class="capability-desc">Detect the same mistake being made in different departments. Break organizational amnesia across business units.</div>','<div class="capability-desc" data-i18n="dciiS5Cap3Desc">Detect the same mistake being made in different departments. Break organizational amnesia across business units.</div>','dciiS5Cap3Desc');
rep('<div class="capability-name">Dissenter Accuracy</div>','<div class="capability-name" data-i18n="dciiS5Cap4Name">Dissenter Accuracy</div>','dciiS5Cap4Name');
rep('<div class="capability-desc">Track whether dissenters were ultimately proven correct. Surface their historical accuracy when the same concerns arise again.</div>','<div class="capability-desc" data-i18n="dciiS5Cap4Desc">Track whether dissenters were ultimately proven correct. Surface their historical accuracy when the same concerns arise again.</div>','dciiS5Cap4Desc');

// Service 6: Bias Mitigation
rep('<p class="service-tagline">Cognitive Bias Detection &amp; Correction</p>','<p class="service-tagline" data-i18n="dciiS6Tagline">Cognitive Bias Detection &amp; Correction</p>','dciiS6Tagline');
rep('<div class="capability-name">24 Bias Classifiers</div>','<div class="capability-name" data-i18n="dciiS6Cap1Name">24 Bias Classifiers</div>','dciiS6Cap1Name');
rep('<div class="capability-desc">Anchoring, confirmation bias, sunk cost fallacy, groupthink, availability heuristic, authority bias, and 18 more — detected in text, voting patterns, and agent reasoning.</div>','<div class="capability-desc" data-i18n="dciiS6Cap1Desc">Anchoring, confirmation bias, sunk cost fallacy, groupthink, availability heuristic, authority bias, and 18 more — detected in text, voting patterns, and agent reasoning.</div>','dciiS6Cap1Desc');
rep('<div class="capability-name">Real-Time Flagging</div>','<div class="capability-name" data-i18n="dciiS6Cap2Name">Real-Time Flagging</div>','dciiS6Cap2Name');
rep('<div class="capability-desc">During Council deliberations, biases are flagged inline with confidence scores and suggested counter-perspectives.</div>','<div class="capability-desc" data-i18n="dciiS6Cap2Desc">During Council deliberations, biases are flagged inline with confidence scores and suggested counter-perspectives.</div>','dciiS6Cap2Desc');
rep('<div class="capability-name">De-Biasing Protocols</div>','<div class="capability-name" data-i18n="dciiS6Cap3Name">De-Biasing Protocols</div>','dciiS6Cap3Name');
rep('<div class="capability-desc">Structured interventions: red team injection, devil\'s advocate assignment, pre-mortem reframing, and reference-class forecasting.</div>','<div class="capability-desc" data-i18n="dciiS6Cap3Desc">Structured interventions: red team injection, devil\'s advocate assignment, pre-mortem reframing, and reference-class forecasting.</div>','dciiS6Cap3Desc');
rep('<div class="capability-name">Bias Audit Trail</div>','<div class="capability-name" data-i18n="dciiS6Cap4Name">Bias Audit Trail</div>','dciiS6Cap4Name');
rep('<div class="capability-desc">Every detected bias, every intervention, every override is logged in the decision evidence packet. Prove you tried to decide rationally.</div>','<div class="capability-desc" data-i18n="dciiS6Cap4Desc">Every detected bias, every intervention, every override is logged in the decision evidence packet. Prove you tried to decide rationally.</div>','dciiS6Cap4Desc');

// Service 7: QuantumKMS
rep('<p class="service-tagline">Quantum-Resistant Cryptographic Integrity</p>','<p class="service-tagline" data-i18n="dciiS7Tagline">Quantum-Resistant Cryptographic Integrity</p>','dciiS7Tagline');
rep('<div class="capability-name">Post-Quantum Algorithms</div>','<div class="capability-name" data-i18n="dciiS7Cap1Name">Post-Quantum Algorithms</div>','dciiS7Cap1Name');
rep('<div class="capability-desc">NIST-standardized Dilithium (ML-DSA), SPHINCS+ (SLH-DSA), and Falcon for digital signatures. NIST security levels 1–5.</div>','<div class="capability-desc" data-i18n="dciiS7Cap1Desc">NIST-standardized Dilithium (ML-DSA), SPHINCS+ (SLH-DSA), and Falcon for digital signatures. NIST security levels 1–5.</div>','dciiS7Cap1Desc');
rep('<div class="capability-name">Hybrid Signatures</div>','<div class="capability-name" data-i18n="dciiS7Cap2Name">Hybrid Signatures</div>','dciiS7Cap2Name');
rep('<div class="capability-desc">Dual RSA-4096 + Dilithium signing during the transition period. If either algorithm breaks, the other still protects evidence integrity.</div>','<div class="capability-desc" data-i18n="dciiS7Cap2Desc">Dual RSA-4096 + Dilithium signing during the transition period. If either algorithm breaks, the other still protects evidence integrity.</div>','dciiS7Cap2Desc');
rep('<div class="capability-name">Key Rotation &amp; Migration</div>','<div class="capability-name" data-i18n="dciiS7Cap3Name">Key Rotation &amp; Migration</div>','dciiS7Cap3Name');
rep('<div class="capability-desc">Automated key rotation with signature chain-of-custody. Migrate existing evidence to post-quantum signatures before quantum computers arrive.</div>','<div class="capability-desc" data-i18n="dciiS7Cap3Desc">Automated key rotation with signature chain-of-custody. Migrate existing evidence to post-quantum signatures before quantum computers arrive.</div>','dciiS7Cap3Desc');
rep('<div class="capability-name">HSM Integration</div>','<div class="capability-name" data-i18n="dciiS7Cap4Name">HSM Integration</div>','dciiS7Cap4Name');
rep('<div class="capability-desc">Hardware Security Module support for key generation and signing. Customer-controlled keys — Datacendia never holds your private keys.</div>','<div class="capability-desc" data-i18n="dciiS7Cap4Desc">Hardware Security Module support for key generation and signing. Customer-controlled keys — Datacendia never holds your private keys.</div>','dciiS7Cap4Desc');

// Impact section
rep('<h2>Why Crisis Immunization Matters</h2>','<h2 data-i18n="dciiImpactTitle">Why Crisis Immunization Matters</h2>','dciiImpactTitle');
rep('<div class="impact-label">Potential insurance premium reduction for IISS &gt;800</div>','<div class="impact-label" data-i18n="dciiImpact1Label">Potential insurance premium reduction for IISS &gt;800</div>','dciiImpact1Label');
rep('<div class="impact-label">Jurisdictions with cross-border conflict detection</div>','<div class="impact-label" data-i18n="dciiImpact2Label">Jurisdictions with cross-border conflict detection</div>','dciiImpact2Label');
rep('<div class="impact-label">DCII primitive dimensions scored</div>','<div class="impact-label" data-i18n="dciiImpact3Label">DCII primitive dimensions scored</div>','dciiImpact3Label');
rep('<div class="impact-label">Legally recognized external timestamps</div>','<div class="impact-label" data-i18n="dciiImpact4Label">Legally recognized external timestamps</div>','dciiImpact4Label');

// Contact box
rep('<p>DCII transforms governance from a cost center to a competitive advantage.</p>','<p data-i18n="dciiContactDesc">DCII transforms governance from a cost center to a competitive advantage.</p>','dciiContactDesc');
rep('<p><a href="briefing.html">Request a DCII Briefing</a> &middot; <a href="architecture.html">View Full Architecture</a> &middot; <a href="pilot.html">Explore the Pilot Program</a> &middot; <a href="DCII-Framework-White-Paper-2026-02-19.pdf" download>Download White Paper v2.1 (PDF)</a></p>','<p><a href="briefing.html" data-i18n="dciiContactBriefing">Request a DCII Briefing</a> · <a href="architecture.html" data-i18n="dciiContactArch">View Full Architecture</a> · <a href="pilot.html" data-i18n="dciiContactPilot">Explore the Pilot Program</a> · <a href="DCII-Framework-White-Paper-2026-02-19.pdf" download data-i18n="dciiContactDownload">Download White Paper v2.1 (PDF)</a></p>','dciiContactBriefing');

// Footer
rep('<p class="footer-outcome">Ready to own your AI decisions—and prove them to regulators?</p>','<p class="footer-outcome" data-i18n="footerOutcome">Ready to own your AI decisions—and prove them to regulators?</p>','footerOutcome');
rep('<a href="pilot.html" class="cta-button secondary">See Results in 90 Days</a>','<a href="pilot.html" class="cta-button secondary" data-i18n="footerSeeResults">See Results in 90 Days</a>','footerSeeResults');
rep('<p class="footer-status" style="font-family: var(--font-mono); font-size: 0.7rem; color: #2ecc71; margin-top: 16px; letter-spacing: 0.05em;">SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED</p>','<p class="footer-status" style="font-family: var(--font-mono); font-size: 0.7rem; color: #2ecc71; margin-top: 16px; letter-spacing: 0.05em;" data-i18n="footerStatus">SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED</p>','footerStatus');

fs.writeFileSync(FILE, html, 'utf8');
console.log('DCII P2 done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
