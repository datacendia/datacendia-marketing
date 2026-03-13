/**
 * Bulk-add "Launch App" CTA to nav across all HTML files.
 * - Adds "Launch App →" as primary gold CTA
 * - Demotes "Request Briefing" to secondary outline style
 */
const fs = require('fs');
const path = require('path');
// No external dependencies needed

const ROOT = path.resolve(__dirname, '..');

// Recursively find all .html files
function findHtmlFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(full));
    } else if (entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const files = findHtmlFiles(ROOT);
let updated = 0;
let skipped = 0;

for (const file of files) {
  let html = fs.readFileSync(file, 'utf8');

  // Pattern: <a href="briefing.html..." class="nav-cta" data-i18n="navRequestBriefing">Request Briefing</a>
  const regex = /<a\s+href="(\/?(briefing\.html[^"])*)"\s+class="nav-cta"\s+data-i18n="navRequestBriefing">Request Briefing<\/a>/g;

  if (!regex.test(html)) {
    skipped++;
    continue;
  }

  // Reset regex lastIndex
  regex.lastIndex = 0;

  const replaced = html.replace(regex, (match, briefingHref) => {
    return `<a href="${briefingHref}" class="nav-cta-secondary" data-i18n="navRequestBriefing">Request Briefing</a>\n        <a href="https://app.datacendia.com/" target="_blank" rel="noopener" class="nav-cta" data-i18n="navLaunchApp">Launch App →</a>`;
  });

  fs.writeFileSync(file, replaced, 'utf8');
  updated++;
  console.log(`✓ ${path.relative(ROOT, file)}`);
}

console.log(`\nDone: ${updated} files updated, ${skipped} files skipped (no match).`);
