/**
 * audit-i18n-coverage.cjs
 * Scans all root HTML pages for text elements missing data-i18n attributes.
 * Produces a coverage report showing exactly what text won't translate.
 *
 * Run: node scripts/audit-i18n-coverage.cjs
 * Output: docs/I18N-COVERAGE-REPORT.md
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.resolve(ROOT, 'docs', 'I18N-COVERAGE-REPORT.md');

const HTML_FILES = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html'))
  .sort();

// Simple regex-based extraction of text content from HTML elements
// Looks for opening tags of translatable elements, checks for data-i18n, extracts text
const TAG_PATTERN = /<(h[1-6]|p|li|td|th|span|div|a|button|summary|label|strong|em|dt|dd|figcaption|caption)(\s[^>]*)?>([^<]{3,})/gi;

const results = [];
let totalTagged = 0;
let totalUntagged = 0;

for (const file of HTML_FILES) {
  const fp = path.join(ROOT, file);
  const content = fs.readFileSync(fp, 'utf8');

  // Count data-i18n attributes
  const i18nCount = (content.match(/data-i18n=/g) || []).length;

  // Find text elements without data-i18n
  const untagged = [];
  let match;
  const regex = new RegExp(TAG_PATTERN.source, 'gi');

  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip lines that have data-i18n
    if (line.includes('data-i18n')) continue;
    // Skip script/style blocks
    if (line.match(/<\/?script|<\/?style/i)) continue;
    // Skip HTML comments
    if (line.trim().startsWith('<!--')) continue;

    let m;
    const lineRegex = new RegExp(TAG_PATTERN.source, 'gi');
    while ((m = lineRegex.exec(line)) !== null) {
      const tag = m[1];
      const attrs = m[2] || '';
      const text = m[3].trim();

      // Skip if text is just whitespace, numbers, symbols, or very short
      if (!text || text.length < 3) continue;
      if (/^[\d\s\.\,\;\:\-\—\–\|\&\#\;\→\←\↑\↓\•\·\×\+\=\%\$\€\£\/\\]+$/.test(text)) continue;
      // Skip if it's an HTML entity or code
      if (text.startsWith('&') || text.startsWith('{') || text.startsWith('//')) continue;
      // Skip if parent line already has data-i18n (nested element)
      if (attrs.includes('data-i18n')) continue;
      // Skip class/style-only content
      if (/^[a-z\-]+$/.test(text)) continue;

      untagged.push({
        line: i + 1,
        tag,
        text: text.substring(0, 80) + (text.length > 80 ? '...' : ''),
      });
    }
  }

  totalTagged += i18nCount;
  totalUntagged += untagged.length;

  results.push({
    file,
    i18nCount,
    untaggedCount: untagged.length,
    coverage: i18nCount > 0 ? Math.round((i18nCount / (i18nCount + untagged.length)) * 100) : 0,
    untagged,
  });
}

// Sort by untagged count descending
results.sort((a, b) => b.untaggedCount - a.untaggedCount);

// Generate report
const lines2 = [
  '# I18N Coverage Report',
  '',
  `> Generated ${new Date().toISOString().split('T')[0]} by \`scripts/audit-i18n-coverage.cjs\``,
  '',
  `## Summary`,
  '',
  `- **Total tagged elements:** ${totalTagged}`,
  `- **Total untagged text elements:** ${totalUntagged}`,
  `- **Overall coverage:** ${Math.round((totalTagged / (totalTagged + totalUntagged)) * 100)}%`,
  '',
  '## Coverage by Page',
  '',
  '| Page | Tagged | Untagged | Coverage | Priority |',
  '|------|--------|----------|----------|----------|',
  ...results.map(r => {
    const priority = r.untaggedCount > 30 ? '🔴 HIGH' : r.untaggedCount > 10 ? '🟡 MEDIUM' : r.untaggedCount > 0 ? '🟢 LOW' : '✅ COMPLETE';
    return `| \`${r.file}\` | ${r.i18nCount} | ${r.untaggedCount} | ${r.coverage}% | ${priority} |`;
  }),
  '',
];

// Add detailed untagged elements for top offenders
for (const r of results.filter(r => r.untaggedCount > 5)) {
  lines2.push(`## ${r.file} — ${r.untaggedCount} untagged elements`, '');
  lines2.push('| Line | Tag | Text |');
  lines2.push('|------|-----|------|');
  for (const u of r.untagged.slice(0, 50)) {
    const escapedText = u.text.replace(/\|/g, '\\|').replace(/\n/g, ' ');
    lines2.push(`| ${u.line} | \`<${u.tag}>\` | ${escapedText} |`);
  }
  if (r.untagged.length > 50) {
    lines2.push(`| ... | | *${r.untagged.length - 50} more elements* |`);
  }
  lines2.push('');
}

lines2.push('---');
lines2.push('');
lines2.push('*Run `node scripts/audit-i18n-coverage.cjs` to regenerate this report after adding data-i18n attributes.*');

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, lines2.join('\n'), 'utf8');

console.log(`I18N Coverage Report:`);
console.log(`  Tagged: ${totalTagged}`);
console.log(`  Untagged: ${totalUntagged}`);
console.log(`  Coverage: ${Math.round((totalTagged / (totalTagged + totalUntagged)) * 100)}%`);
console.log(`\nTop 5 worst pages:`);
for (const r of results.slice(0, 5)) {
  console.log(`  ${r.untaggedCount.toString().padStart(4)} untagged | ${r.file}`);
}
console.log(`\nFull report: docs/I18N-COVERAGE-REPORT.md`);
