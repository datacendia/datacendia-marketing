/**
 * Fix relative links in i18n pages — convert to absolute paths
 * Links like demos.html?lang=ar from ar/index.html resolve incorrectly
 * They need to be /demos.html?lang=ar
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const locales = ['ar','de','es','fr','hi','it','ja','ko','pt','zh'];

// Known root-level targets that need absolute paths
const rootTargets = [
  'apple-touch-icon.png', 'demos.html', 'verticals.html', 'pricing.html',
  'roi-calculator.html', 'pilot.html', 'briefing.html', 'trust.html',
  'team.html', 'protocol.html', 'wargames.html', 'security-controls.html',
  'privacy.html', 'terms.html', 'learn/', 'resources/'
];

let totalFixed = 0;

for (const loc of locales) {
  const filePath = path.join(ROOT, loc, 'index.html');
  let content = fs.readFileSync(filePath, 'utf8');
  let fileFixed = 0;

  for (const target of rootTargets) {
    // Match href="target" or href="target?..." or href="target#..."
    // But NOT href="/target" (already absolute) or href="http..." (external)
    const escapedTarget = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`href="(${escapedTarget}[^"]*)"`, 'g');
    const newContent = content.replace(re, (match, href) => {
      if (href.startsWith('/')) return match; // already absolute
      fileFixed++;
      return `href="/${href}"`;
    });
    content = newContent;
  }

  if (fileFixed > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`${loc}/index.html — fixed ${fileFixed} links`);
    totalFixed += fileFixed;
  }
}

// Also fix learn/ subdirectory pages in i18n
for (const loc of locales) {
  const learnDir = path.join(ROOT, loc, 'learn');
  if (!fs.existsSync(learnDir)) continue;
  
  function walkFix(dir) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) { walkFix(full); continue; }
      if (!item.name.endsWith('.html')) continue;
      
      let content = fs.readFileSync(full, 'utf8');
      let fileFixed = 0;
      
      for (const target of rootTargets) {
        const escapedTarget = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // From learn subdirs, links might have ../ or ../../ prefixes or be plain relative
        const re = new RegExp(`href="(?:\\.\\./)*(?:\\.\\./)*(?:\\.\\./)*?(${escapedTarget}[^"]*)"`, 'g');
        const newContent = content.replace(re, (match, href) => {
          if (match.includes('href="/')) return match;
          fileFixed++;
          return `href="/${href}"`;
        });
        content = newContent;
      }
      
      // Also fix apple-touch-icon with relative paths
      content = content.replace(/href="(?:\.\.\/)*apple-touch-icon\.png"/g, () => {
        fileFixed++;
        return 'href="/apple-touch-icon.png"';
      });
      
      if (fileFixed > 0) {
        fs.writeFileSync(full, content, 'utf8');
        const rel = path.relative(ROOT, full);
        console.log(`${rel} — fixed ${fileFixed} links`);
        totalFixed += fileFixed;
      }
    }
  }
  walkFix(learnDir);
}

console.log(`\nTotal fixed: ${totalFixed} links`);
