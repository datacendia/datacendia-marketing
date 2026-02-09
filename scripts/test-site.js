/**
 * Datacendia Marketing Site — Comprehensive Test Script
 * Tests all pages, links, structure, and content integrity
 * Run: node scripts/test-site.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE = 'http://127.0.0.1:8002';
const ROOT = path.resolve(__dirname, '..');
let totalTests = 0;
let passed = 0;
let failed = 0;
const failures = [];

function log(status, msg) {
  totalTests++;
  if (status === 'PASS') {
    passed++;
    console.log(`  ✓ ${msg}`);
  } else {
    failed++;
    failures.push(msg);
    console.log(`  ✗ FAIL: ${msg}`);
  }
}

function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    const url = `${BASE}${urlPath}`;
    http.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', reject);
  });
}

async function testPageLoads() {
  console.log('\n=== 1. PAGE LOAD TESTS (HTTP 200) ===');
  
  const rootPages = [
    '/index.html', '/demos.html', '/trust.html', '/pricing.html',
    '/verticals.html', '/architecture.html', '/api-docs.html',
    '/briefing.html', '/case-studies.html', '/changelog.html',
    '/manifesto.html', '/partners.html', '/pilot.html',
    '/platform-capabilities.html', '/privacy.html', '/protocol.html',
    '/roi-calculator.html', '/security-controls.html', '/team.html',
    '/terms.html', '/wargames.html', '/404.html'
  ];

  const demoPages = [
    '/demos/council.html', '/demos/chronos.html', '/demos/cascade.html',
    '/demos/ghost-board.html', '/demos/pre-mortem.html', '/demos/dissent.html',
    '/demos/crucible.html', '/demos/decision-dna.html', '/demos/qr-bridge.html',
    '/demos/sports-governance.html', '/demos/legal-governance.html',
    '/demos/try.html', '/demos/maturity.html', '/demos/before-after.html'
  ];

  const resourcePages = [
    '/resources/index.html', '/resources/the-council.html',
    '/resources/compliance.html', '/resources/sovereignty-matrix.html',
    '/resources/data-sovereignty-guide.html', '/resources/air-gapped-deployment.html',
    '/resources/integration-honesty-matrix.html', '/resources/cascade.html',
    '/resources/omnitranslate.html'
  ];

  const learnPages = [
    '/learn/index.html', '/learn/ai-governance/index.html',
    '/learn/multi-agent-ai/index.html', '/learn/decision-intelligence/index.html',
    '/learn/sovereign-ai/index.html', '/learn/ai-audit-trail/index.html',
    '/learn/eu-ai-act-compliance/index.html', '/learn/eu-ai-act-high-risk/index.html',
    '/learn/hipaa-ai-compliance/index.html', '/learn/multi-agent-vs-single-model/index.html',
    '/learn/air-gapped-ai-deployment/index.html'
  ];

  const staticFiles = [
    '/robots.txt', '/sitemap.xml', '/llms.txt', '/security.txt',
    '/styles.css', '/app.js', '/translations.js',
    '/assets/favicon.svg', '/trust/sbom.json'
  ];

  const allPages = [
    ...rootPages, ...demoPages, ...resourcePages, ...learnPages, ...staticFiles
  ];

  for (const p of allPages) {
    try {
      const { status } = await fetchPage(p);
      log(status === 200 ? 'PASS' : 'FAIL', `${status} ${p}`);
    } catch (e) {
      log('FAIL', `ERROR ${p} — ${e.message}`);
    }
  }
}

async function testInternalLinks() {
  console.log('\n=== 2. INTERNAL LINK VALIDATION ===');
  
  // Check demos link back to demos.html correctly
  const demoFiles = fs.readdirSync(path.join(ROOT, 'demos')).filter(f => f.endsWith('.html'));
  
  for (const file of demoFiles) {
    const content = fs.readFileSync(path.join(ROOT, 'demos', file), 'utf8');
    
    // Check for href links to other files
    const hrefMatches = content.match(/href="([^"#][^"]*?)"/g) || [];
    for (const match of hrefMatches) {
      const href = match.replace('href="', '').replace('"', '');
      
      // Skip external links
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('//')) continue;
      
      // Resolve relative to demos/
      let resolvedPath;
      if (href.startsWith('../')) {
        resolvedPath = path.join(ROOT, href.replace('../', ''));
      } else if (href.startsWith('/')) {
        resolvedPath = path.join(ROOT, href);
      } else {
        resolvedPath = path.join(ROOT, 'demos', href);
      }
      
      // Remove hash fragment
      resolvedPath = resolvedPath.split('#')[0].split('?')[0];
      
      if (resolvedPath && !fs.existsSync(resolvedPath)) {
        log('FAIL', `demos/${file} → broken link: ${href}`);
      }
    }
  }
  
  // Check root page links to demos
  const demosHubContent = fs.readFileSync(path.join(ROOT, 'demos.html'), 'utf8');
  const demoLinkRegex = /demos\/[a-z-]+\.html/g;
  const demoLinks = demosHubContent.match(demoLinkRegex) || [];
  
  for (const link of [...new Set(demoLinks)]) {
    const fullPath = path.join(ROOT, link);
    log(fs.existsSync(fullPath) ? 'PASS' : 'FAIL', `demos.html → ${link}`);
  }
  
  console.log(`  (checked ${demoFiles.length} demo files for broken links)`);
}

function testDisclaimers() {
  console.log('\n=== 3. DISCLAIMER FOOTER PRESENCE ===');
  
  const demoFiles = fs.readdirSync(path.join(ROOT, 'demos')).filter(f => f.endsWith('.html'));
  
  for (const file of demoFiles) {
    const content = fs.readFileSync(path.join(ROOT, 'demos', file), 'utf8');
    const hasDisclaimer = content.toLowerCase().includes('fictitious') || 
                          content.toLowerCase().includes('disclaimer') ||
                          content.toLowerCase().includes('illustrative') ||
                          content.toLowerCase().includes('informational purposes');
    log(hasDisclaimer ? 'PASS' : 'FAIL', `demos/${file} — disclaimer present`);
  }
}

function testUnsafeNames() {
  console.log('\n=== 4. UNSAFE NAME CHECK ===');
  
  const unsafeNames = [
    'Viktor', 'Petrov', 'Meridian SaaS', 'Marcus Sterling', 
    'Apex Financial', 'Celtic Glasgow', 'Manchester Athletic',
    'Elara Dynamics', 'Dr. Hans', 'Victoria Chen'
  ];
  
  const htmlFiles = [];
  function walkDir(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.name.startsWith('.') || item.name === 'node_modules') continue;
      const full = path.join(dir, item.name);
      if (item.isDirectory()) walkDir(full);
      else if (item.name.endsWith('.html')) htmlFiles.push(full);
    }
  }
  walkDir(ROOT);
  
  for (const name of unsafeNames) {
    let found = false;
    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes(name)) {
        log('FAIL', `"${name}" found in ${path.relative(ROOT, file)}`);
        found = true;
      }
    }
    if (!found) {
      log('PASS', `"${name}" — not found in any HTML file`);
    }
  }
}

function testHTMLStructure() {
  console.log('\n=== 5. HTML STRUCTURE VALIDATION ===');
  
  const demoFiles = fs.readdirSync(path.join(ROOT, 'demos')).filter(f => f.endsWith('.html'));
  
  for (const file of demoFiles) {
    const content = fs.readFileSync(path.join(ROOT, 'demos', file), 'utf8');
    
    // Check DOCTYPE
    const hasDoctype = content.trimStart().startsWith('<!DOCTYPE html>') || content.trimStart().startsWith('<!doctype html>');
    log(hasDoctype ? 'PASS' : 'FAIL', `demos/${file} — has DOCTYPE`);
    
    // Check <html>, <head>, <body> tags
    const hasHtml = content.includes('<html');
    const hasHead = content.includes('<head>') || content.includes('<head ');
    const hasBody = content.includes('<body');
    const hasClosingHtml = content.includes('</html>');
    const hasClosingBody = content.includes('</body>');
    
    log(hasHtml && hasHead && hasBody && hasClosingHtml && hasClosingBody ? 'PASS' : 'FAIL',
      `demos/${file} — complete HTML structure`);
    
    // Check <title>
    const hasTitle = /<title>.+<\/title>/.test(content);
    log(hasTitle ? 'PASS' : 'FAIL', `demos/${file} — has <title>`);
    
    // Check meta viewport
    const hasViewport = content.includes('viewport');
    log(hasViewport ? 'PASS' : 'FAIL', `demos/${file} — has viewport meta`);
  }
}

function testSEOFiles() {
  console.log('\n=== 6. SEO & GEO FILE VALIDATION ===');
  
  // robots.txt
  const robots = fs.readFileSync(path.join(ROOT, 'robots.txt'), 'utf8');
  log(robots.includes('Sitemap:') ? 'PASS' : 'FAIL', 'robots.txt — has Sitemap reference');
  log(robots.includes('GPTBot') ? 'PASS' : 'FAIL', 'robots.txt — allows GPTBot');
  log(robots.includes('ClaudeBot') ? 'PASS' : 'FAIL', 'robots.txt — allows ClaudeBot');
  log(robots.includes('PerplexityBot') ? 'PASS' : 'FAIL', 'robots.txt — allows PerplexityBot');
  log(robots.includes('llms.txt') ? 'PASS' : 'FAIL', 'robots.txt — references llms.txt');
  
  // llms.txt
  const llms = fs.readFileSync(path.join(ROOT, 'llms.txt'), 'utf8');
  log(llms.startsWith('# Datacendia') ? 'PASS' : 'FAIL', 'llms.txt — starts with # Datacendia');
  log(llms.includes('datacendia.com') ? 'PASS' : 'FAIL', 'llms.txt — contains datacendia.com URLs');
  log(llms.includes('## Core Products') ? 'PASS' : 'FAIL', 'llms.txt — has Core Products section');
  log(llms.includes('## Pages') ? 'PASS' : 'FAIL', 'llms.txt — has Pages section');
  log(llms.includes('## Contact') ? 'PASS' : 'FAIL', 'llms.txt — has Contact section');
  log(llms.includes('contact@datacendia.com') ? 'PASS' : 'FAIL', 'llms.txt — has contact email');
  
  // sitemap.xml
  const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
  log(sitemap.includes('<?xml') ? 'PASS' : 'FAIL', 'sitemap.xml — valid XML declaration');
  log(sitemap.includes('<urlset') ? 'PASS' : 'FAIL', 'sitemap.xml — has urlset');
  log(sitemap.includes('datacendia.com') ? 'PASS' : 'FAIL', 'sitemap.xml — references datacendia.com');
  
  // security.txt
  const security = fs.readFileSync(path.join(ROOT, 'security.txt'), 'utf8');
  log(security.includes('Contact:') ? 'PASS' : 'FAIL', 'security.txt — has Contact field');
  log(security.includes('Expires:') ? 'PASS' : 'FAIL', 'security.txt — has Expires field');
}

function testHtaccess() {
  console.log('\n=== 7. .HTACCESS VALIDATION ===');
  
  const htaccess = fs.readFileSync(path.join(ROOT, '.htaccess'), 'utf8');
  log(htaccess.includes('ErrorDocument 404') ? 'PASS' : 'FAIL', '.htaccess — has custom 404');
  log(htaccess.includes('Strict-Transport-Security') ? 'PASS' : 'FAIL', '.htaccess — has HSTS');
  log(htaccess.includes('Content-Security-Policy') ? 'PASS' : 'FAIL', '.htaccess — has CSP');
  log(htaccess.includes('X-Frame-Options') ? 'PASS' : 'FAIL', '.htaccess — has X-Frame-Options');
  log(htaccess.includes('X-Content-Type-Options') ? 'PASS' : 'FAIL', '.htaccess — has X-Content-Type-Options');
  log(htaccess.includes('mod_deflate') ? 'PASS' : 'FAIL', '.htaccess — has compression');
  log(htaccess.includes('mod_expires') ? 'PASS' : 'FAIL', '.htaccess — has caching');
  log(htaccess.includes('mod_mime') ? 'PASS' : 'FAIL', '.htaccess — has MIME types');
}

function testFileSizes() {
  console.log('\n=== 8. FILE SIZE CHECK ===');
  
  const largeLimitMB = 50;
  const warningLimitKB = 500;
  
  function checkSize(filePath, label) {
    if (!fs.existsSync(filePath)) {
      log('FAIL', `${label} — file not found`);
      return;
    }
    const stats = fs.statSync(filePath);
    const sizeMB = stats.size / (1024 * 1024);
    const sizeKB = stats.size / 1024;
    
    if (sizeMB > largeLimitMB) {
      log('FAIL', `${label} — ${sizeMB.toFixed(1)}MB exceeds ${largeLimitMB}MB limit`);
    } else if (sizeKB > warningLimitKB) {
      log('PASS', `${label} — ${sizeKB.toFixed(0)}KB (large but acceptable)`);
    } else {
      log('PASS', `${label} — ${sizeKB.toFixed(0)}KB`);
    }
  }
  
  checkSize(path.join(ROOT, 'translations.js'), 'translations.js');
  checkSize(path.join(ROOT, 'index.html'), 'index.html');
  checkSize(path.join(ROOT, 'styles.css'), 'styles.css');
  checkSize(path.join(ROOT, 'assets/videos/Council.mp4'), 'Council.mp4');
  checkSize(path.join(ROOT, 'assets/videos/CendiaChronos.mp4'), 'CendiaChronos.mp4');
  checkSize(path.join(ROOT, 'sitemap.xml'), 'sitemap.xml');
}

function testI18nPages() {
  console.log('\n=== 9. INTERNATIONALIZATION ===');
  
  const locales = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'zh'];
  
  for (const locale of locales) {
    const indexPath = path.join(ROOT, locale, 'index.html');
    log(fs.existsSync(indexPath) ? 'PASS' : 'FAIL', `${locale}/index.html exists`);
  }
}

function testDemoInteractivity() {
  console.log('\n=== 10. DEMO INTERACTIVITY CHECK (JS presence) ===');
  
  const demoFiles = fs.readdirSync(path.join(ROOT, 'demos')).filter(f => f.endsWith('.html'));
  
  for (const file of demoFiles) {
    const content = fs.readFileSync(path.join(ROOT, 'demos', file), 'utf8');
    const hasScript = content.includes('<script');
    const hasEventHandlers = content.includes('onclick') || content.includes('addEventListener') || 
                              content.includes('function ') || content.includes('=>');
    log(hasScript && hasEventHandlers ? 'PASS' : 'FAIL', `demos/${file} — has interactive JS`);
  }
}

function testExternalResources() {
  console.log('\n=== 11. EXTERNAL RESOURCE REFERENCES ===');
  
  // Check Google Fonts references are consistent
  const demoFiles = fs.readdirSync(path.join(ROOT, 'demos')).filter(f => f.endsWith('.html'));
  
  for (const file of demoFiles) {
    const content = fs.readFileSync(path.join(ROOT, 'demos', file), 'utf8');
    const hasFonts = content.includes('fonts.googleapis.com');
    log(hasFonts ? 'PASS' : 'FAIL', `demos/${file} — Google Fonts loaded`);
  }
  
  // Check Formspree in briefing
  const briefing = fs.readFileSync(path.join(ROOT, 'briefing.html'), 'utf8');
  log(briefing.includes('formspree.io') ? 'PASS' : 'FAIL', 'briefing.html — Formspree form configured');
}

function testNewPages() {
  console.log('\n=== 12. NEW PAGE CONTENT VALIDATION ===');
  
  // try.html
  const tryPage = fs.readFileSync(path.join(ROOT, 'demos/try.html'), 'utf8');
  log(tryPage.includes('runMiniCouncil') ? 'PASS' : 'FAIL', 'try.html — has deliberation function');
  log(tryPage.includes('agent') ? 'PASS' : 'FAIL', 'try.html — references agents');
  log(tryPage.includes('disclaimer') || tryPage.includes('fictitious') || tryPage.includes('simulation') ? 'PASS' : 'FAIL', 'try.html — has disclaimer');
  
  // maturity.html
  const maturity = fs.readFileSync(path.join(ROOT, 'demos/maturity.html'), 'utf8');
  log(maturity.includes('QUESTIONS') ? 'PASS' : 'FAIL', 'maturity.html — has quiz questions');
  log(maturity.includes('LEVELS') ? 'PASS' : 'FAIL', 'maturity.html — has maturity levels');
  log(maturity.includes('contact@datacendia.com') ? 'PASS' : 'FAIL', 'maturity.html — email to contact@datacendia.com');
  log(maturity.includes('mailto:') ? 'PASS' : 'FAIL', 'maturity.html — has mailto link');
  log(maturity.includes('sendResults') ? 'PASS' : 'FAIL', 'maturity.html — has sendResults function');
  
  // before-after.html
  const beforeAfter = fs.readFileSync(path.join(ROOT, 'demos/before-after.html'), 'utf8');
  log(beforeAfter.includes('WITHOUT DATACENDIA') ? 'PASS' : 'FAIL', 'before-after.html — has "before" section');
  log(beforeAfter.includes('WITH DATACENDIA') ? 'PASS' : 'FAIL', 'before-after.html — has "after" section');
  log(beforeAfter.includes('IntersectionObserver') ? 'PASS' : 'FAIL', 'before-after.html — has scroll animations');
  log(beforeAfter.includes('compare') ? 'PASS' : 'FAIL', 'before-after.html — has comparison section');
}

async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  DATACENDIA MARKETING SITE — FULL TEST SUITE    ║');
  console.log('╚══════════════════════════════════════════════════╝');
  
  await testPageLoads();
  testInternalLinks();
  testDisclaimers();
  testUnsafeNames();
  testHTMLStructure();
  testSEOFiles();
  testHtaccess();
  testFileSizes();
  testI18nPages();
  testDemoInteractivity();
  testExternalResources();
  testNewPages();
  
  console.log('\n══════════════════════════════════════════════════');
  console.log(`TOTAL: ${totalTests} tests | PASS: ${passed} | FAIL: ${failed}`);
  console.log('══════════════════════════════════════════════════');
  
  if (failures.length > 0) {
    console.log('\nFAILURES:');
    failures.forEach(f => console.log(`  ✗ ${f}`));
  } else {
    console.log('\n🎉 ALL TESTS PASSED');
  }
  
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('Test runner error:', err);
  process.exit(1);
});
