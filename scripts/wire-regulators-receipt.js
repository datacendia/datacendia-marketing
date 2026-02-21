/**
 * wire-regulators-receipt.js: Wire data-i18n into regulators-receipt.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'regulators-receipt.html');
let html = fs.readFileSync(FILE, 'utf8');
let count = 0;
function rep(o, n, k) {
  if (!html.includes(o)) { console.log('NOT FOUND: ' + k); return; }
  html = html.replace(o, n); count++;
}

// Nav links (simple nav, not the full mega-nav)
rep('<a href="index.html">Home</a>','<a href="index.html" data-i18n="rrNavHome">Home</a>','rrNavHome');
rep('<a href="platform-capabilities.html">Platform</a>','<a href="platform-capabilities.html" data-i18n="rrNavPlatform">Platform</a>','rrNavPlatform');
rep('<a href="dcii.html">DCII</a>','<a href="dcii.html" data-i18n="rrNavDcii">DCII</a>','rrNavDcii');
rep('<a href="pricing.html">Pricing</a>','<a href="pricing.html" data-i18n="rrNavPricing">Pricing</a>','rrNavPricing');
rep('<a href="briefing.html" class="nav-cta">Request Briefing</a>','<a href="briefing.html" class="nav-cta" data-i18n="navRequestBriefing">Request Briefing</a>','navRequestBriefing');

// Hero
rep('<h1>The <span>Regulator&rsquo;s Receipt&trade;</span><br>Every AI Decision. Court-Admissible.</h1>','<h1 data-i18n="rrHeroTitle">The <span>Regulator&rsquo;s Receipt&trade;</span><br>Every AI Decision. Court-Admissible.</h1>','rrHeroTitle');
rep('<p>Three cryptographically signed PDFs generated automatically from every council deliberation. SHA-256 hashed, Merkle tree verified, RFC&nbsp;3161 timestamped. Independently verifiable without Datacendia.</p>','<p data-i18n="rrHeroDesc">Three cryptographically signed PDFs generated automatically from every council deliberation. SHA-256 hashed, Merkle tree verified, RFC&nbsp;3161 timestamped. Independently verifiable without Datacendia.</p>','rrHeroDesc');
rep('<a href="briefing.html" class="rr-cta-primary">See a Live Demo &rarr;</a>','<a href="briefing.html" class="rr-cta-primary" data-i18n="rrHeroCtaDemo">See a Live Demo →</a>','rrHeroCtaDemo');
rep('<a href="dcii.html" class="rr-cta-secondary">DCII Framework</a>','<a href="dcii.html" class="rr-cta-secondary" data-i18n="rrHeroCtaDcii">DCII Framework</a>','rrHeroCtaDcii');
rep('<a href="pilot.html" class="rr-cta-secondary">Start a Pilot</a>','<a href="pilot.html" class="rr-cta-secondary" data-i18n="rrHeroCtaPilot">Start a Pilot</a>','rrHeroCtaPilot');

// Three PDF types section
rep('<div class="rr-section-label">Three Output Formats</div>','<div class="rr-section-label" data-i18n="rrSec1Label">Three Output Formats</div>','rrSec1Label');
rep('<h2>One Decision. Three Documents.</h2>','<h2 data-i18n="rrSec1Title">One Decision. Three Documents.</h2>','rrSec1Title');
rep('<p>Every council deliberation automatically generates three distinct PDFs &mdash; each purpose-built for a different audience. No manual export. No reformatting. Generated in under 2 seconds.</p>','<p data-i18n="rrSec1Desc">Every council deliberation automatically generates three distinct PDFs — each purpose-built for a different audience. No manual export. No reformatting. Generated in under 2 seconds.</p>','rrSec1Desc');

// PDF card titles
rep('<div class="pdf-card-title">Court-Admissible Record</div>','<div class="pdf-card-title" data-i18n="rrPdf1Title">Court-Admissible Record</div>','rrPdf1Title');
rep('<div class="pdf-card-title">Evidence Package</div>','<div class="pdf-card-title" data-i18n="rrPdf2Title">Evidence Package</div>','rrPdf2Title');
rep('<div class="pdf-card-title">Executive Summary</div>','<div class="pdf-card-title" data-i18n="rrPdf3Title">Executive Summary</div>','rrPdf3Title');

// PDF tags
rep('<span class="pdf-tag court">Court Admissible</span>','<span class="pdf-tag court" data-i18n="rrPdf1Tag">Court Admissible</span>','rrPdf1Tag');
rep('<span class="pdf-tag evidence">Full Evidence</span>','<span class="pdf-tag evidence" data-i18n="rrPdf2Tag">Full Evidence</span>','rrPdf2Tag');
rep('<span class="pdf-tag executive">Executive Ready</span>','<span class="pdf-tag executive" data-i18n="rrPdf3Tag">Executive Ready</span>','rrPdf3Tag');

// Crypto section
rep('<div class="rr-section-label">Cryptographic Architecture</div>','<div class="rr-section-label" data-i18n="rrSec2Label">Cryptographic Architecture</div>','rrSec2Label');
rep('<h2>Independently Verifiable. No Vendor Trust Required.</h2>','<h2 data-i18n="rrSec2Title">Independently Verifiable. No Vendor Trust Required.</h2>','rrSec2Title');

// Crypto card titles
rep('<div class="crypto-card-title">SHA-256 Decision Hash</div>','<div class="crypto-card-title" data-i18n="rrCrypto1Title">SHA-256 Decision Hash</div>','rrCrypto1Title');
rep('<div class="crypto-card-title">Merkle Tree Integrity</div>','<div class="crypto-card-title" data-i18n="rrCrypto2Title">Merkle Tree Integrity</div>','rrCrypto2Title');
rep('<div class="crypto-card-title">Ed25519 Digital Signature</div>','<div class="crypto-card-title" data-i18n="rrCrypto3Title">Ed25519 Digital Signature</div>','rrCrypto3Title');
rep('<div class="crypto-card-title">RFC 3161 Timestamp</div>','<div class="crypto-card-title" data-i18n="rrCrypto4Title">RFC 3161 Timestamp</div>','rrCrypto4Title');
rep('<div class="crypto-card-title">PDF/A Archival Format</div>','<div class="crypto-card-title" data-i18n="rrCrypto5Title">PDF/A Archival Format</div>','rrCrypto5Title');
rep('<div class="crypto-card-title">Post-Quantum Option</div>','<div class="crypto-card-title" data-i18n="rrCrypto6Title">Post-Quantum Option</div>','rrCrypto6Title');

// Verification section
rep('<div class="rr-section-label">Independent Verification</div>','<div class="rr-section-label" data-i18n="rrSec3Label">Independent Verification</div>','rrSec3Label');
rep('<h2>Verify Without Datacendia</h2>','<h2 data-i18n="rrSec3Title">Verify Without Datacendia</h2>','rrSec3Title');

// Use cases section
rep('<div class="rr-section-label">When You Need It</div>','<div class="rr-section-label" data-i18n="rrSec4Label">When You Need It</div>','rrSec4Label');
rep('<h2>Built for the Moments That Matter</h2>','<h2 data-i18n="rrSec4Title">Built for the Moments That Matter</h2>','rrSec4Title');

// Use case titles
rep('<div class="use-case-title">Regulatory Investigation</div>','<div class="use-case-title" data-i18n="rrUseCase1Title">Regulatory Investigation</div>','rrUseCase1Title');
rep('<div class="use-case-title">Litigation Discovery</div>','<div class="use-case-title" data-i18n="rrUseCase2Title">Litigation Discovery</div>','rrUseCase2Title');
rep('<div class="use-case-title">SOC 2 / ISO 27001 Audit</div>','<div class="use-case-title" data-i18n="rrUseCase3Title">SOC 2 / ISO 27001 Audit</div>','rrUseCase3Title');
rep('<div class="use-case-title">Board Accountability</div>','<div class="use-case-title" data-i18n="rrUseCase4Title">Board Accountability</div>','rrUseCase4Title');
rep('<div class="use-case-title">EU AI Act Compliance</div>','<div class="use-case-title" data-i18n="rrUseCase5Title">EU AI Act Compliance</div>','rrUseCase5Title');
rep('<div class="use-case-title">Internal Post-Mortems</div>','<div class="use-case-title" data-i18n="rrUseCase6Title">Internal Post-Mortems</div>','rrUseCase6Title');

// Final CTA
rep('<h2>See a Real Receipt in 30 Minutes</h2>','<h2 data-i18n="rrFinalCtaTitle">See a Real Receipt in 30 Minutes</h2>','rrFinalCtaTitle');
rep('<a href="briefing.html" class="rr-cta-primary">Request a Briefing &rarr;</a>','<a href="briefing.html" class="rr-cta-primary" data-i18n="rrFinalCtaBtn">Request a Briefing →</a>','rrFinalCtaBtn');
rep('<a href="pilot.html" class="rr-cta-secondary">Start a 90-Day Pilot</a>','<a href="pilot.html" class="rr-cta-secondary" data-i18n="rrFinalCtaPilot">Start a 90-Day Pilot</a>','rrFinalCtaPilot');
rep('<a href="dcii.html" class="rr-cta-secondary">DCII Framework</a>','<a href="dcii.html" class="rr-cta-secondary" data-i18n="rrFinalCtaDcii">DCII Framework</a>','rrFinalCtaDcii');

// Footer
rep('<p class="footer-outcome">Ready to own your AI decisions&mdash;and prove them to regulators?</p>','<p class="footer-outcome" data-i18n="footerOutcome">Ready to own your AI decisions—and prove them to regulators?</p>','footerOutcome');
rep('<a href="pilot.html" class="cta-button secondary">See Results in 90 Days</a>','<a href="pilot.html" class="cta-button secondary" data-i18n="footerCtaPilot">See Results in 90 Days</a>','footerCtaPilot');

fs.writeFileSync(FILE, html, 'utf8');
console.log('regulators-receipt.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
