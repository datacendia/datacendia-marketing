/**
 * Part 4b: Newsletter + Footer wiring (continuation of Part 4)
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

rep('<h3 class="newsletter-title">Stay Informed</h3>','<h3 class="newsletter-title" data-i18n="newsletterTitle">Stay Informed</h3>','newsletterTitle');
rep('<p class="newsletter-desc">Platform updates, new compliance guides, and industry analysis. No spam — one email per month, max.</p>','<p class="newsletter-desc" data-i18n="newsletterDesc">Platform updates, new compliance guides, and industry analysis. No spam — one email per month, max.</p>','newsletterDesc');
rep('placeholder="your@email.com"','placeholder="your@email.com" data-i18n-placeholder="newsletterPlaceholder"','newsletterPlaceholder');
rep('<button type="submit" class="newsletter-btn">Subscribe</button>','<button type="submit" class="newsletter-btn" data-i18n="newsletterBtn">Subscribe</button>','newsletterBtn');
rep('<p id="newsletter-thanks" class="newsletter-thanks">Thanks — we\'ll be in touch.</p>','<p id="newsletter-thanks" class="newsletter-thanks" data-i18n="newsletterThanks">Thanks — we\'ll be in touch.</p>','newsletterThanks');
rep('<p class="newsletter-fine">No tracking pixels. Unsubscribe anytime. <a href="privacy.html" class="link-dim">Privacy Policy</a></p>','<p class="newsletter-fine"><span data-i18n="newsletterFine">No tracking pixels. Unsubscribe anytime.</span> <a href="privacy.html" class="link-dim" data-i18n="newsletterPrivacy">Privacy Policy</a></p>','newsletterFine');

rep('<p class="footer-outcome">Ready to own your AI decisions—and prove them to regulators?</p>','<p class="footer-outcome" data-i18n="footerOutcome">Ready to own your AI decisions—and prove them to regulators?</p>','footerOutcome');
rep('<a href="pilot.html" class="cta-button secondary">See Results in 90 Days</a>','<a href="pilot.html" class="cta-button secondary" data-i18n="footerSeeResults">See Results in 90 Days</a>','footerSeeResults');
rep('<p class="footer-status">SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED</p>','<p class="footer-status" data-i18n="footerStatus">SYSTEM STATUS: AIR-GAP READY · NO TRACKER PIXELS DETECTED</p>','footerStatus');

fs.writeFileSync(FILE, html, 'utf8');
console.log('Part 4b done — ' + count + ' replacements applied.');
console.log('data-i18n count now: ' + (html.match(/data-i18n/g) || []).length);
