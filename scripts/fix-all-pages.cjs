/**
 * fix-all-pages.cjs — Add analytics, OG images, twitter cards, and lead capture CTAs
 * to all root HTML pages that are missing them.
 *
 * Run: node scripts/fix-all-pages.cjs
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const ANALYTICS_SNIPPET = `  <script src="tiktok-pixel.js" defer></script>`;

const OG_TEMPLATE = (title, desc, page) => `  <meta property="og:image" content="https://datacendia.com/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${title}">`;

const TWITTER_TEMPLATE = (title, desc) => `  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="https://datacendia.com/og-image.png">
  <meta name="twitter:image:alt" content="${title}">`;

const CTA_SECTION = `
    <!-- Lead Capture CTA -->
    <section class="cta-banner" style="text-align:center;padding:48px 24px;margin:32px auto;max-width:800px;">
      <h2 data-i18n="ctaReady" style="font-family:var(--font-display);font-size:1.5rem;margin-bottom:12px;color:var(--color-text);">Ready to see Datacendia in action?</h2>
      <p data-i18n="ctaSub" style="color:var(--color-text-muted);margin-bottom:24px;">Book a 30-minute briefing. See The Council deliberate on your use case.</p>
      <a href="briefing.html" class="cta-btn" data-i18n="ctaBookBriefing" style="display:inline-block;padding:14px 32px;background:var(--color-gold);color:#000;border-radius:8px;font-weight:600;text-decoration:none;margin-right:12px;">Request Briefing</a>
      <a href="pilot.html" class="btn" data-i18n="ctaStartPilot" style="display:inline-block;padding:14px 32px;border:1px solid var(--color-gold-border);color:var(--color-gold);border-radius:8px;text-decoration:none;">Start 90-Day Pilot</a>
    </section>`;

// Page metadata for OG tags
const PAGE_META = {
  '404.html': { title: 'Page Not Found — Datacendia', desc: 'The page you requested could not be found.' },
  'case-studies.html': { title: 'Case Studies — Datacendia', desc: 'Real pilot case studies from enterprise deployments of Datacendia decision governance.' },
  'changelog.html': { title: 'Changelog — Datacendia', desc: 'Platform release history and version notes.' },
  'demos.html': { title: 'Interactive Demos — Datacendia', desc: 'See The Council, CendiaChronos, Crucible and more in action. Interactive demos of decision governance.' },
  'dgi-dcii-comparison.html': { title: 'DGI vs DCII Comparison — Datacendia', desc: 'Compare the Decision Governance Infrastructure and Decision Crisis Immunization Infrastructure frameworks.' },
  'honesty-matrices.html': { title: 'Honesty Matrices — Datacendia', desc: 'Sovereignty comparisons, integration truth tables, and what we cannot do — documented honestly.' },
  'hospitality.html': { title: 'Hospitality Vertical — Datacendia', desc: 'Decision governance for the hospitality industry.' },
  'manifesto.html': { title: 'The Manifesto — Datacendia', desc: 'Why we built Datacendia and what we believe about decision governance.' },
  'roi-calculator.html': { title: 'ROI Calculator — Datacendia', desc: 'Calculate the return on investment from Datacendia decision governance infrastructure.' },
  'trading.html': { title: 'Trading Governance — Datacendia', desc: 'Decision governance for trading and financial services.' },
  'verticals.html': { title: 'Industry Verticals — Datacendia', desc: 'Decision governance for banking, defense, healthcare, legal, government, sports, and more.' },
};

// Pages that should get a CTA section (if they don't already have briefing.html link in a CTA context)
const CTA_PAGES = ['demos.html', 'verticals.html', 'trust.html', 'dgi.html', 'dgi-dcii-comparison.html', 
                    'honesty-matrices.html', 'case-studies.html', 'wargames.html', 'roi-calculator.html'];

const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
let totalFixes = 0;

for (const file of htmlFiles) {
  const filePath = path.join(ROOT, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const fixes = [];

  // 1. Add TikTok pixel analytics if missing
  if (!content.includes('tiktok-pixel')) {
    // Insert before </body>
    if (content.includes('</body>')) {
      content = content.replace('</body>', `${ANALYTICS_SNIPPET}\n</body>`);
      fixes.push('analytics');
      modified = true;
    }
  }

  // 2. Add OG image if missing
  if (!content.includes('og:image') && PAGE_META[file]) {
    const meta = PAGE_META[file];
    const ogTags = OG_TEMPLATE(meta.title, meta.desc, file);
    // Insert after og:type or og:url or after <meta property="og: or after </title>
    if (content.includes('og:type')) {
      content = content.replace(/<meta property="og:type"[^>]*>/, match => match + '\n' + ogTags);
    } else if (content.includes('</title>')) {
      content = content.replace('</title>', '</title>\n' + ogTags);
    }
    fixes.push('og:image');
    modified = true;
  }

  // 3. Add Twitter card if missing  
  if (!content.includes('twitter:card')) {
    // Get title from existing meta or page meta
    let title = 'Datacendia';
    let desc = 'Decision Crisis Immunization Infrastructure';
    if (PAGE_META[file]) {
      title = PAGE_META[file].title;
      desc = PAGE_META[file].desc;
    } else {
      const titleMatch = content.match(/<title>([^<]+)<\/title>/);
      if (titleMatch) title = titleMatch[1];
      const descMatch = content.match(/<meta name="description" content="([^"]+)"/);
      if (descMatch) desc = descMatch[1];
    }
    const twTags = TWITTER_TEMPLATE(title, desc);
    if (content.includes('og:image')) {
      // Insert after last og: meta tag
      content = content.replace(/(  <meta property="og:[^"]*"[^>]*>\n)(?!  <meta property="og:)/, match => match + twTags + '\n');
    } else if (content.includes('</title>')) {
      content = content.replace('</title>', '</title>\n' + twTags);
    }
    fixes.push('twitter:card');
    modified = true;
  }

  // 4. Add CTA section to key pages (before footer or before </main>)
  if (CTA_PAGES.includes(file) && !content.includes('cta-banner')) {
    if (content.includes('</main>')) {
      content = content.replace('</main>', CTA_SECTION + '\n    </main>');
      fixes.push('CTA');
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`${file}: ${fixes.join(', ')}`);
    totalFixes += fixes.length;
  }
}

console.log(`\nTotal: ${totalFixes} fixes across ${htmlFiles.length} pages`);
