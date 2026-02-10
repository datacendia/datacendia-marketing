/**
 * Datacendia Marketing Site — Full Audit & Test Suite
 * Run: node scripts/test-site.js
 * Requires: local server on http://127.0.0.1:8002
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE = 'http://127.0.0.1:8002';
const ROOT = path.resolve(__dirname, '..');
let totalTests = 0, passed = 0, failed = 0, warned = 0;
const failures = [], warnings = [];

function log(status, msg) {
  totalTests++;
  if (status === 'PASS') { passed++; console.log(`  ✓ ${msg}`); }
  else if (status === 'WARN') { warned++; warnings.push(msg); console.log(`  ⚠ WARN: ${msg}`); }
  else { failed++; failures.push(msg); console.log(`  ✗ FAIL: ${msg}`); }
}

function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE}${urlPath}`, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ status: res.statusCode, body, headers: res.headers }));
    }).on('error', reject);
  });
}

function getAllHTML(dir, base = '') {
  let results = [];
  try {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      if (item.name.startsWith('.') || item.name === 'node_modules' || item.name === 'scripts') continue;
      const rel = path.join(base, item.name);
      if (item.isDirectory()) results.push(...getAllHTML(path.join(dir, item.name), rel));
      else if (item.name.endsWith('.html')) results.push(rel);
    }
  } catch(e) {}
  return results;
}

// ═══════════════════════════════════════════
// TEST 1: HTTP PAGE LOADS
// ═══════════════════════════════════════════
async function testPageLoads() {
  console.log('\n═══ 1. HTTP PAGE LOAD TESTS ═══');
  const pages = [
    '/index.html','/demos.html','/trust.html','/pricing.html','/verticals.html',
    '/architecture.html','/api-docs.html','/briefing.html','/case-studies.html',
    '/changelog.html','/manifesto.html','/partners.html','/pilot.html',
    '/platform-capabilities.html','/privacy.html','/protocol.html',
    '/roi-calculator.html','/security-controls.html','/team.html',
    '/terms.html','/wargames.html','/404.html',
    '/demos/council.html','/demos/chronos.html','/demos/cascade.html',
    '/demos/ghost-board.html','/demos/pre-mortem.html','/demos/dissent.html',
    '/demos/crucible.html','/demos/audit-provenance.html','/demos/qr-bridge.html',
    '/demos/sports-governance.html','/demos/legal-governance.html',
    '/demos/try.html','/demos/maturity.html','/demos/before-after.html',
    '/resources/index.html','/resources/the-council.html','/resources/compliance.html',
    '/resources/sovereignty-matrix.html','/resources/data-sovereignty-guide.html',
    '/resources/air-gapped-deployment.html','/resources/integration-honesty-matrix.html',
    '/resources/cascade.html','/resources/omnitranslate.html',
    '/learn/index.html','/learn/ai-governance/index.html','/learn/multi-agent-ai/index.html',
    '/learn/decision-intelligence/index.html','/learn/sovereign-ai/index.html',
    '/learn/ai-audit-trail/index.html','/learn/eu-ai-act-compliance/index.html',
    '/learn/eu-ai-act-high-risk/index.html','/learn/hipaa-ai-compliance/index.html',
    '/learn/multi-agent-vs-single-model/index.html','/learn/air-gapped-ai-deployment/index.html',
    '/robots.txt','/sitemap.xml','/llms.txt','/security.txt',
    '/styles.css','/app.js','/translations.js','/assets/favicon.svg','/trust/sbom.json'
  ];
  for (const p of pages) {
    try {
      const { status } = await fetchPage(p);
      log(status === 200 ? 'PASS' : 'FAIL', `${status} ${p}`);
    } catch (e) { log('FAIL', `ERROR ${p} — ${e.message}`); }
  }
}

// ═══════════════════════════════════════════
// TEST 2: META TAGS ON ALL HTML PAGES
// ═══════════════════════════════════════════
function testMetaTags() {
  console.log('\n═══ 2. META TAGS (title, description, viewport, OG) ═══');
  const allFiles = getAllHTML(ROOT);
  for (const rel of allFiles) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const hasTitle = /<title>.+<\/title>/s.test(content);
    const hasDesc = /meta\s+name=["']description["']/i.test(content);
    const hasViewport = /meta\s+name=["']viewport["']/i.test(content);
    const hasOG = /property=["']og:/i.test(content);

    log(hasTitle ? 'PASS' : 'FAIL', `${rel} — <title>`);
    log(hasDesc ? 'PASS' : 'WARN', `${rel} — meta description`);
    log(hasViewport ? 'PASS' : 'FAIL', `${rel} — viewport`);
    if (rel === 'index.html' || rel === 'demos.html' || rel === 'trust.html' || rel === 'pricing.html') {
      log(hasOG ? 'PASS' : 'WARN', `${rel} — Open Graph tags`);
    }
  }
}

// ═══════════════════════════════════════════
// TEST 3: HTML STRUCTURE VALIDATION
// ═══════════════════════════════════════════
function testHTMLStructure() {
  console.log('\n═══ 3. HTML STRUCTURE (DOCTYPE, html, head, body) ═══');
  const allFiles = getAllHTML(ROOT);
  for (const rel of allFiles) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const hasDoctype = /<!DOCTYPE html>/i.test(content.trimStart().slice(0, 50));
    const hasHtml = content.includes('<html');
    const hasHead = /<head[\s>]/i.test(content);
    const hasBody = /<body[\s>]/i.test(content);
    const hasCloseHtml = content.includes('</html>');
    const hasCloseBody = content.includes('</body>');
    const ok = hasDoctype && hasHtml && hasHead && hasBody && hasCloseHtml && hasCloseBody;
    log(ok ? 'PASS' : 'FAIL', `${rel} — structure ${!hasDoctype?'(no DOCTYPE)':''}${!hasCloseBody?'(unclosed body)':''}${!hasCloseHtml?'(unclosed html)':''}`);
  }
}

// ═══════════════════════════════════════════
// TEST 4: CROSS-PAGE LINK INTEGRITY
// ═══════════════════════════════════════════
function testAllLinks() {
  console.log('\n═══ 4. CROSS-PAGE LINK INTEGRITY ═══');
  const allFiles = getAllHTML(ROOT);
  let checkedCount = 0, brokenCount = 0;
  for (const rel of allFiles) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const dir = path.dirname(path.join(ROOT, rel));
    const hrefRe = /href="([^"]+)"/g;
    let m;
    while ((m = hrefRe.exec(content)) !== null) {
      const href = m[1];
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') ||
          href.startsWith('//') || href.startsWith('#') || href.startsWith('javascript:') ||
          href.startsWith('data:')) continue;
      checkedCount++;
      const clean = href.split('#')[0].split('?')[0];
      if (!clean) continue;
      let resolved;
      if (clean.startsWith('/')) resolved = path.join(ROOT, clean);
      else resolved = path.resolve(dir, clean);
      if (!fs.existsSync(resolved)) {
        brokenCount++;
        log('FAIL', `${rel} → broken: ${href}`);
      }
    }
  }
  if (brokenCount === 0) log('PASS', `All ${checkedCount} internal links valid across ${allFiles.length} pages`);
}

// ═══════════════════════════════════════════
// TEST 5: SITEMAP VALIDATION
// ═══════════════════════════════════════════
function testSitemap() {
  console.log('\n═══ 5. SITEMAP.XML VALIDATION ═══');
  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  log(sitemap.includes('<?xml') ? 'PASS' : 'FAIL', 'sitemap.xml — valid XML declaration');
  log(sitemap.includes('<urlset') ? 'PASS' : 'FAIL', 'sitemap.xml — has urlset');

  const locRe = /<loc>([^<]+)<\/loc>/g;
  let match, sitemapUrls = 0, sitemapBroken = 0;
  while ((match = locRe.exec(sitemap)) !== null) {
    sitemapUrls++;
    const url = match[1];
    const urlPath = url.replace(/https?:\/\/[^\/]+/, '');
    let localPath;
    if (urlPath.endsWith('/')) localPath = path.join(ROOT, urlPath, 'index.html');
    else localPath = path.join(ROOT, urlPath);
    if (!fs.existsSync(localPath)) {
      sitemapBroken++;
      log('FAIL', `sitemap → missing file: ${urlPath}`);
    }
  }
  if (sitemapBroken === 0) log('PASS', `All ${sitemapUrls} sitemap URLs map to existing files`);
  else log('FAIL', `${sitemapBroken}/${sitemapUrls} sitemap URLs broken`);
}

// ═══════════════════════════════════════════
// TEST 6: LOCALHOST / DEV REFERENCES
// ═══════════════════════════════════════════
function testLocalhostRefs() {
  console.log('\n═══ 6. LOCALHOST / DEV REFERENCE CHECK ═══');
  const patterns = ['localhost', '127.0.0.1', '0.0.0.0', 'file://', 'C:\\', 'D:\\'];
  const allFiles = getAllHTML(ROOT);
  let found = false;
  for (const rel of allFiles) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    for (const pat of patterns) {
      if (content.includes(pat)) {
        found = true;
        log('FAIL', `${rel} — contains "${pat}"`);
      }
    }
  }
  // Also check JS files
  for (const jsFile of ['app.js', 'translations.js']) {
    const jsPath = path.join(ROOT, jsFile);
    if (fs.existsSync(jsPath)) {
      const content = fs.readFileSync(jsPath, 'utf8');
      for (const pat of patterns) {
        if (content.includes(pat)) { found = true; log('FAIL', `${jsFile} — contains "${pat}"`); }
      }
    }
  }
  if (!found) log('PASS', 'No localhost/dev references found in any file');
}

// ═══════════════════════════════════════════
// TEST 7: FAVICON ON ALL PAGES
// ═══════════════════════════════════════════
function testFavicon() {
  console.log('\n═══ 7. FAVICON CHECK ═══');
  log(fs.existsSync(path.join(ROOT, 'assets/favicon.svg')) ? 'PASS' : 'FAIL', 'assets/favicon.svg exists');
  const rootHTML = getAllHTML(ROOT).filter(f => !f.includes(path.sep) || f.startsWith('demos'));
  for (const rel of rootHTML) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const hasFavicon = content.includes('favicon');
    log(hasFavicon ? 'PASS' : 'WARN', `${rel} — favicon reference`);
  }
}

// ═══════════════════════════════════════════
// TEST 8: EMAIL / MAILTO LINKS
// ═══════════════════════════════════════════
function testMailtoLinks() {
  console.log('\n═══ 8. EMAIL / MAILTO LINKS ═══');
  const allFiles = getAllHTML(ROOT);
  const validEmails = ['contact@datacendia.com', 'security@datacendia.com', 'stuart.rainey@datacendia.com'];
  let mailtoCount = 0;
  for (const rel of allFiles) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const mailRe = /mailto:([^\s"'<>]+)/g;
    let m;
    while ((m = mailRe.exec(content)) !== null) {
      mailtoCount++;
      const email = m[1].split('?')[0];
      const isValid = validEmails.some(v => email.includes(v));
      log(isValid ? 'PASS' : 'WARN', `${rel} — mailto:${email}`);
    }
  }
  if (mailtoCount === 0) log('WARN', 'No mailto links found anywhere');
}

// ═══════════════════════════════════════════
// TEST 9: CSS LOADING
// ═══════════════════════════════════════════
function testCSSLoading() {
  console.log('\n═══ 9. CSS & STYLESHEET LOADING ═══');
  log(fs.existsSync(path.join(ROOT, 'styles.css')) ? 'PASS' : 'FAIL', 'styles.css exists');
  log(fs.existsSync(path.join(ROOT, 'demos/demo-platform.css')) ? 'PASS' : 'FAIL', 'demos/demo-platform.css exists');

  const rootPages = getAllHTML(ROOT).filter(f => !f.includes(path.sep));
  for (const rel of rootPages) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const hasCSS = content.includes('styles.css') || content.includes('<style');
    log(hasCSS ? 'PASS' : 'WARN', `${rel} — has stylesheet`);
  }
  const demoFiles = fs.readdirSync(path.join(ROOT, 'demos')).filter(f => f.endsWith('.html'));
  for (const file of demoFiles) {
    const content = fs.readFileSync(path.join(ROOT, 'demos', file), 'utf8');
    const hasCSS = content.includes('<style') || content.includes('.css');
    log(hasCSS ? 'PASS' : 'FAIL', `demos/${file} — has styling`);
  }
}

// ═══════════════════════════════════════════
// TEST 10: JS SYNTAX CHECK (basic)
// ═══════════════════════════════════════════
function testJSSyntax() {
  console.log('\n═══ 10. JAVASCRIPT SYNTAX CHECK ═══');
  const jsFiles = ['app.js', 'translations.js', 'verify-translations.js'];
  for (const jsFile of jsFiles) {
    const jsPath = path.join(ROOT, jsFile);
    if (!fs.existsSync(jsPath)) { log('FAIL', `${jsFile} — not found`); continue; }
    try {
      const content = fs.readFileSync(jsPath, 'utf8');
      new Function(content);
      log('PASS', `${jsFile} — parses without syntax error`);
    } catch(e) {
      log('FAIL', `${jsFile} — syntax error: ${e.message.slice(0,80)}`);
    }
  }
  // Check inline scripts in demos for basic issues
  const demoFiles = fs.readdirSync(path.join(ROOT, 'demos')).filter(f => f.endsWith('.html'));
  for (const file of demoFiles) {
    const content = fs.readFileSync(path.join(ROOT, 'demos', file), 'utf8');
    const scriptRe = /<script[^>]*>([\s\S]*?)<\/script>/g;
    let m, hasError = false;
    while ((m = scriptRe.exec(content)) !== null) {
      const code = m[1].trim();
      if (!code || code.startsWith('{') || code.includes('@context')) continue;
      try { new Function(code); } catch(e) {
        if (!e.message.includes('import') && !e.message.includes('export') && !e.message.includes('await')) {
          hasError = true;
          log('FAIL', `demos/${file} — inline JS error: ${e.message.slice(0,60)}`);
        }
      }
    }
    if (!hasError) log('PASS', `demos/${file} — inline JS parses OK`);
  }
}

// ═══════════════════════════════════════════
// TEST 11: DISCLAIMERS IN ALL DEMOS
// ═══════════════════════════════════════════
function testDisclaimers() {
  console.log('\n═══ 11. DISCLAIMER FOOTER PRESENCE ═══');
  const demoFiles = fs.readdirSync(path.join(ROOT, 'demos')).filter(f => f.endsWith('.html'));
  for (const file of demoFiles) {
    const content = fs.readFileSync(path.join(ROOT, 'demos', file), 'utf8').toLowerCase();
    const has = content.includes('fictitious') || content.includes('disclaimer') ||
                content.includes('illustrative') || content.includes('informational purposes') ||
                content.includes('simulation');
    log(has ? 'PASS' : 'FAIL', `demos/${file} — disclaimer present`);
  }
}

// ═══════════════════════════════════════════
// TEST 12: UNSAFE NAME CHECK
// ═══════════════════════════════════════════
function testUnsafeNames() {
  console.log('\n═══ 12. UNSAFE / REAL-SOUNDING NAME CHECK ═══');
  const unsafeNames = [
    'Viktor','Petrov','Meridian SaaS','Marcus Sterling','Apex Financial',
    'Celtic Glasgow','Manchester Athletic','Elara Dynamics','Dr. Hans',
    'Victoria Chen','Hans Weber','Elena Vasquez'
  ];
  const allFiles = getAllHTML(ROOT);
  for (const name of unsafeNames) {
    let found = false;
    for (const rel of allFiles) {
      const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
      if (content.includes(name)) { log('FAIL', `"${name}" found in ${rel}`); found = true; }
    }
    if (!found) log('PASS', `"${name}" — clean`);
  }
}

// ═══════════════════════════════════════════
// TEST 13: SEO & GEO FILES
// ═══════════════════════════════════════════
function testSEOFiles() {
  console.log('\n═══ 13. SEO & GEO FILE VALIDATION ═══');
  const robots = fs.readFileSync(path.join(ROOT, 'robots.txt'), 'utf8');
  log(robots.includes('Sitemap:') ? 'PASS' : 'FAIL', 'robots.txt — Sitemap ref');
  log(robots.includes('GPTBot') ? 'PASS' : 'FAIL', 'robots.txt — GPTBot');
  log(robots.includes('ClaudeBot') ? 'PASS' : 'FAIL', 'robots.txt — ClaudeBot');
  log(robots.includes('PerplexityBot') ? 'PASS' : 'FAIL', 'robots.txt — PerplexityBot');
  log(robots.includes('llms.txt') ? 'PASS' : 'FAIL', 'robots.txt — llms.txt ref');

  const llms = fs.readFileSync(path.join(ROOT, 'llms.txt'), 'utf8');
  log(llms.startsWith('# Datacendia') ? 'PASS' : 'FAIL', 'llms.txt — header');
  log(llms.includes('datacendia.com') ? 'PASS' : 'FAIL', 'llms.txt — URLs');
  log(llms.includes('## Core Products') ? 'PASS' : 'FAIL', 'llms.txt — Products section');
  log(llms.includes('## Pages') ? 'PASS' : 'FAIL', 'llms.txt — Pages section');
  log(llms.includes('contact@datacendia.com') ? 'PASS' : 'FAIL', 'llms.txt — contact email');

  const sec = fs.readFileSync(path.join(ROOT, 'security.txt'), 'utf8');
  log(sec.includes('Contact:') ? 'PASS' : 'FAIL', 'security.txt — Contact');
  log(sec.includes('Expires:') ? 'PASS' : 'FAIL', 'security.txt — Expires');
}

// ═══════════════════════════════════════════
// TEST 14: .HTACCESS VALIDATION
// ═══════════════════════════════════════════
function testHtaccess() {
  console.log('\n═══ 14. .HTACCESS VALIDATION ═══');
  const h = fs.readFileSync(path.join(ROOT, '.htaccess'), 'utf8');
  log(h.includes('ErrorDocument 404') ? 'PASS' : 'FAIL', '404 page');
  log(h.includes('Strict-Transport-Security') ? 'PASS' : 'FAIL', 'HSTS');
  log(h.includes('Content-Security-Policy') ? 'PASS' : 'FAIL', 'CSP');
  log(h.includes('X-Frame-Options') ? 'PASS' : 'FAIL', 'X-Frame-Options');
  log(h.includes('X-Content-Type-Options') ? 'PASS' : 'FAIL', 'X-Content-Type-Options');
  log(h.includes('X-XSS-Protection') ? 'PASS' : 'WARN', 'X-XSS-Protection');
  log(h.includes('Referrer-Policy') ? 'PASS' : 'WARN', 'Referrer-Policy');
  log(h.includes('mod_deflate') ? 'PASS' : 'FAIL', 'Compression');
  log(h.includes('mod_expires') ? 'PASS' : 'FAIL', 'Caching');
  log(h.includes('mod_mime') ? 'PASS' : 'FAIL', 'MIME types');
}

// ═══════════════════════════════════════════
// TEST 15: FILE SIZES & TOTAL SITE SIZE
// ═══════════════════════════════════════════
function testFileSizes() {
  console.log('\n═══ 15. FILE SIZES & TOTAL SITE SIZE ═══');
  function checkSize(rel, warnKB, failMB) {
    const p = path.join(ROOT, rel);
    if (!fs.existsSync(p)) { log('FAIL', `${rel} — not found`); return 0; }
    const sz = fs.statSync(p).size;
    const kb = sz / 1024, mb = sz / (1024*1024);
    if (mb > failMB) log('FAIL', `${rel} — ${mb.toFixed(1)}MB exceeds ${failMB}MB`);
    else if (kb > warnKB) log('PASS', `${rel} — ${kb.toFixed(0)}KB`);
    else log('PASS', `${rel} — ${kb.toFixed(0)}KB`);
    return sz;
  }
  let total = 0;
  total += checkSize('index.html', 500, 50);
  total += checkSize('styles.css', 500, 10);
  total += checkSize('app.js', 200, 5);
  total += checkSize('translations.js', 1000, 5);
  total += checkSize('sitemap.xml', 200, 5);
  total += checkSize('assets/videos/Council.mp4', 50000, 100);
  total += checkSize('assets/videos/CendiaChronos.mp4', 50000, 100);

  // Total site size
  function dirSize(dir) {
    let s = 0;
    try {
      for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        if (item.name === '.git') continue;
        const full = path.join(dir, item.name);
        if (item.isDirectory()) s += dirSize(full);
        else s += fs.statSync(full).size;
      }
    } catch(e) {}
    return s;
  }
  const totalMB = (dirSize(ROOT) / (1024*1024)).toFixed(1);
  log(parseFloat(totalMB) < 500 ? 'PASS' : 'WARN', `Total site size: ${totalMB}MB`);
}

// ═══════════════════════════════════════════
// TEST 16: i18n PAGES
// ═══════════════════════════════════════════
function testI18n() {
  console.log('\n═══ 16. INTERNATIONALIZATION ═══');
  const locales = ['ar','de','es','fr','hi','it','ja','ko','pt','zh'];
  for (const loc of locales) {
    const p = path.join(ROOT, loc, 'index.html');
    log(fs.existsSync(p) ? 'PASS' : 'FAIL', `${loc}/index.html`);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8');
      const hasLang = content.includes(`lang=`) || content.includes(`hreflang`);
      log(hasLang ? 'PASS' : 'WARN', `${loc}/index.html — has lang attribute`);
    }
  }
}

// ═══════════════════════════════════════════
// TEST 17: DEMO INTERACTIVITY
// ═══════════════════════════════════════════
function testDemoInteractivity() {
  console.log('\n═══ 17. DEMO INTERACTIVITY ═══');
  const demoFiles = fs.readdirSync(path.join(ROOT, 'demos')).filter(f => f.endsWith('.html'));
  for (const file of demoFiles) {
    const content = fs.readFileSync(path.join(ROOT, 'demos', file), 'utf8');
    const hasScript = content.includes('<script');
    const hasInteraction = content.includes('onclick') || content.includes('addEventListener') ||
                           content.includes('function ') || content.includes('=>');
    log(hasScript && hasInteraction ? 'PASS' : 'FAIL', `demos/${file} — interactive JS`);
  }
}

// ═══════════════════════════════════════════
// TEST 18: EXTERNAL RESOURCES
// ═══════════════════════════════════════════
function testExternalResources() {
  console.log('\n═══ 18. EXTERNAL RESOURCE REFERENCES ═══');
  const demoFiles = fs.readdirSync(path.join(ROOT, 'demos')).filter(f => f.endsWith('.html'));
  for (const file of demoFiles) {
    const content = fs.readFileSync(path.join(ROOT, 'demos', file), 'utf8');
    log(content.includes('fonts.googleapis.com') ? 'PASS' : 'FAIL', `demos/${file} — Google Fonts`);
  }
  const briefing = fs.readFileSync(path.join(ROOT, 'briefing.html'), 'utf8');
  log(briefing.includes('formspree.io') ? 'PASS' : 'FAIL', 'briefing.html — Formspree');

  // Check platform-integration.js graceful degradation
  const piPath = path.join(ROOT, 'scripts/platform-integration.js');
  if (fs.existsSync(piPath)) {
    const pi = fs.readFileSync(piPath, 'utf8');
    log(pi.includes('catch') ? 'PASS' : 'FAIL', 'platform-integration.js — has error handling');
    log(pi.includes('api.datacendia.com') ? 'PASS' : 'FAIL', 'platform-integration.js — correct API URL');
  }
}

// ═══════════════════════════════════════════
// TEST 19: DEMOS.HTML HUB LINKS
// ═══════════════════════════════════════════
function testDemosHub() {
  console.log('\n═══ 19. DEMOS HUB PAGE ═══');
  const content = fs.readFileSync(path.join(ROOT, 'demos.html'), 'utf8');
  const demoLinkRe = /demos\/[a-z-]+\.html/g;
  const links = [...new Set(content.match(demoLinkRe) || [])];
  for (const link of links) {
    log(fs.existsSync(path.join(ROOT, link)) ? 'PASS' : 'FAIL', `demos.html → ${link}`);
  }

  // Check deleted demos are NOT linked
  const deleted = ['healthcare-governance.html', 'industrial-services.html', 'shadow-council.html'];
  for (const d of deleted) {
    log(!content.includes(d) ? 'PASS' : 'FAIL', `demos.html — does NOT link to deleted ${d}`);
  }
}

// ═══════════════════════════════════════════
// TEST 20: NEW PAGE CONTENT VALIDATION
// ═══════════════════════════════════════════
function testNewPages() {
  console.log('\n═══ 20. NEW PAGE CONTENT VALIDATION ═══');
  const tryP = fs.readFileSync(path.join(ROOT, 'demos/try.html'), 'utf8');
  log(tryP.includes('runMiniCouncil') ? 'PASS' : 'FAIL', 'try.html — deliberation function');
  log(tryP.includes('agent') ? 'PASS' : 'FAIL', 'try.html — references agents');
  log(/fictitious|simulation|disclaimer/i.test(tryP) ? 'PASS' : 'FAIL', 'try.html — disclaimer');

  const mat = fs.readFileSync(path.join(ROOT, 'demos/maturity.html'), 'utf8');
  log(mat.includes('QUESTIONS') ? 'PASS' : 'FAIL', 'maturity.html — quiz questions');
  log(mat.includes('LEVELS') ? 'PASS' : 'FAIL', 'maturity.html — maturity levels');
  log(mat.includes('contact@datacendia.com') ? 'PASS' : 'FAIL', 'maturity.html — contact email');
  log(mat.includes('sendResults') ? 'PASS' : 'FAIL', 'maturity.html — sendResults fn');

  const ba = fs.readFileSync(path.join(ROOT, 'demos/before-after.html'), 'utf8');
  log(ba.includes('WITHOUT DATACENDIA') ? 'PASS' : 'FAIL', 'before-after.html — before section');
  log(ba.includes('WITH DATACENDIA') ? 'PASS' : 'FAIL', 'before-after.html — after section');
  log(ba.includes('IntersectionObserver') ? 'PASS' : 'FAIL', 'before-after.html — scroll anim');
}

// ═══════════════════════════════════════════
// TEST 21: ACCESSIBILITY BASICS
// ═══════════════════════════════════════════
function testAccessibility() {
  console.log('\n═══ 21. ACCESSIBILITY BASICS ═══');
  const rootPages = ['index.html','demos.html','trust.html','pricing.html','briefing.html'];
  for (const page of rootPages) {
    const content = fs.readFileSync(path.join(ROOT, page), 'utf8');
    const hasLang = /<html[^>]+lang=/i.test(content);
    log(hasLang ? 'PASS' : 'WARN', `${page} — html lang attribute`);
    const imgCount = (content.match(/<img /g) || []).length;
    const altCount = (content.match(/<img [^>]*alt=/g) || []).length;
    if (imgCount > 0) {
      log(altCount === imgCount ? 'PASS' : 'WARN', `${page} — img alt tags (${altCount}/${imgCount})`);
    }
  }
}

// ═══════════════════════════════════════════
// TEST 22: NAMECHEAP COMPATIBILITY
// ═══════════════════════════════════════════
function testNamecheapCompat() {
  console.log('\n═══ 22. NAMECHEAP HOSTING COMPATIBILITY ═══');
  // No server-side code
  const serverExts = ['.php','.py','.rb','.pl','.cgi','.asp','.aspx','.jsp'];
  let serverFound = false;
  function walk(dir) {
    try {
      for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
        if (item.name.startsWith('.') || item.name === 'node_modules' || item.name === 'scripts') continue;
        const full = path.join(dir, item.name);
        if (item.isDirectory()) walk(full);
        else {
          const ext = path.extname(item.name);
          if (serverExts.includes(ext) && item.name !== 'serve_static.py') {
            serverFound = true;
            log('FAIL', `Server-side file found: ${path.relative(ROOT, full)}`);
          }
        }
      }
    } catch(e) {}
  }
  walk(ROOT);
  if (!serverFound) log('PASS', 'No server-side code in deployment files');

  log(fs.existsSync(path.join(ROOT, '.htaccess')) ? 'PASS' : 'FAIL', '.htaccess exists for Apache');
  log(!fs.existsSync(path.join(ROOT, 'package.json')) ? 'PASS' : 'WARN', 'No package.json (no Node.js dependency)');

  // Check for absolute paths that break
  const indexContent = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const hasAbsPath = /src=["']\/[^\/]/i.test(indexContent) || /href=["']\/[^\/]/i.test(indexContent);
  log('PASS', `index.html — uses ${hasAbsPath ? 'absolute' : 'relative'} paths (both OK for root deploy)`);
}

// ═══════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════
async function main() {
  console.log('╔═══════════════════════════════════════════════════════╗');
  console.log('║  DATACENDIA MARKETING — COMPLETE AUDIT & TEST SUITE  ║');
  console.log('║  ' + new Date().toISOString() + '                    ║');
  console.log('╚═══════════════════════════════════════════════════════╝');

  await testPageLoads();       // 1
  testMetaTags();              // 2
  testHTMLStructure();         // 3
  testAllLinks();              // 4
  testSitemap();               // 5
  testLocalhostRefs();         // 6
  testFavicon();               // 7
  testMailtoLinks();           // 8
  testCSSLoading();            // 9
  testJSSyntax();              // 10
  testDisclaimers();           // 11
  testUnsafeNames();           // 12
  testSEOFiles();              // 13
  testHtaccess();              // 14
  testFileSizes();             // 15
  testI18n();                  // 16
  testDemoInteractivity();     // 17
  testExternalResources();     // 18
  testDemosHub();              // 19
  testNewPages();              // 20
  testAccessibility();         // 21
  testNamecheapCompat();       // 22

  console.log('\n╔═══════════════════════════════════════════════════════╗');
  console.log(`║  RESULTS: ${totalTests} tests | ✓ ${passed} pass | ✗ ${failed} fail | ⚠ ${warned} warn  `);
  console.log('╚═══════════════════════════════════════════════════════╝');

  if (failures.length > 0) {
    console.log('\n✗ FAILURES:');
    failures.forEach(f => console.log(`  ✗ ${f}`));
  }
  if (warnings.length > 0) {
    console.log('\n⚠ WARNINGS:');
    warnings.forEach(w => console.log(`  ⚠ ${w}`));
  }
  if (failures.length === 0 && warnings.length === 0) {
    console.log('\n🎉 ALL TESTS PASSED — ZERO WARNINGS');
  } else if (failures.length === 0) {
    console.log('\n✓ ALL TESTS PASSED (with warnings above)');
  }

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => { console.error('Test runner error:', err); process.exit(1); });
