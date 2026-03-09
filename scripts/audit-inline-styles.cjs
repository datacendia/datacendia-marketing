/**
 * audit-inline-styles.cjs
 * Analyzes inline style patterns across marketing HTML files and generates
 * a migration plan with reusable CSS utility classes.
 *
 * Run: node scripts/audit-inline-styles.cjs
 * Output: docs/INLINE-STYLE-AUDIT.md
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.resolve(ROOT, 'docs', 'INLINE-STYLE-AUDIT.md');

const htmlFiles = fs.readdirSync(ROOT)
  .filter(f => f.endsWith('.html'))
  .map(f => ({ name: f, path: path.join(ROOT, f) }));

const stylePatterns = {};
const fileStats = [];

for (const { name, path: fp } of htmlFiles) {
  const content = fs.readFileSync(fp, 'utf8');
  const matches = content.match(/style="[^"]*"/g) || [];
  
  if (matches.length > 0) {
    fileStats.push({ file: name, count: matches.length });
    
    for (const match of matches) {
      const style = match.replace(/^style="/, '').replace(/"$/, '');
      // Extract individual properties
      const props = style.split(';').map(p => p.trim()).filter(Boolean);
      for (const prop of props) {
        const key = prop.split(':')[0]?.trim();
        if (key) {
          stylePatterns[key] = (stylePatterns[key] || 0) + 1;
        }
      }
    }
  }
}

fileStats.sort((a, b) => b.count - a.count);
const sortedPatterns = Object.entries(stylePatterns).sort((a, b) => b[1] - a[1]);

const total = fileStats.reduce((sum, f) => sum + f.count, 0);

// Generate report
const lines = [
  '# Inline Style Audit',
  '',
  `> Generated ${new Date().toISOString().split('T')[0]} by \`scripts/audit-inline-styles.cjs\``,
  '',
  `## Summary: ${total} inline styles across ${fileStats.length} files`,
  '',
  '## Files by Inline Style Count',
  '',
  '| File | Count | Priority |',
  '|------|-------|----------|',
  ...fileStats.map(f => {
    const priority = f.count > 50 ? 'HIGH' : f.count > 20 ? 'MEDIUM' : 'LOW';
    return `| \`${f.file}\` | ${f.count} | ${priority} |`;
  }),
  '',
  '## Most Common Style Properties',
  '',
  '| Property | Occurrences | Suggested CSS Class |',
  '|----------|-------------|-------------------|',
  ...sortedPatterns.slice(0, 25).map(([prop, count]) => {
    const className = `u-${prop.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}`;
    return `| \`${prop}\` | ${count} | \`.${className}\` |`;
  }),
  '',
  '## Migration Strategy',
  '',
  '1. **Phase 1**: Extract repeated patterns into `styles.css` utility classes',
  '2. **Phase 2**: Replace inline styles in HIGH-priority files (trust.html, index.html, pricing.html)',
  '3. **Phase 3**: Replace in MEDIUM files (verticals.html, demos.html, case-studies.html)',
  '4. **Phase 4**: Replace in LOW files (remaining)',
  '',
  '## Common Patterns to Extract',
  '',
  'These inline style combinations appear frequently and should become CSS classes:',
  '',
  '```css',
  '/* Trust section cards */',
  '.trust-card-bg { background: rgba(0,0,0,0.2); border-radius: 8px; padding: 1rem; }',
  '.trust-gradient-green { background: linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.05) 100%); }',
  '.trust-gradient-purple { background: linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.05) 100%); }',
  '.trust-gradient-red { background: linear-gradient(135deg, rgba(239,68,68,0.08) 0%, rgba(245,158,11,0.04) 100%); }',
  '.trust-gradient-gold { background: linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(245,158,11,0.05) 100%); }',
  '',
  '/* Typography utilities */',
  '.text-dim { color: var(--color-text-dim); }',
  '.text-muted { color: var(--color-text-muted); }',
  '.text-xs { font-size: 0.75rem; }',
  '.text-sm { font-size: 0.85rem; }',
  '',
  '/* Layout utilities */',
  '.grid-auto-fit { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }',
  '.flex-center { display: flex; align-items: center; justify-content: center; }',
  '```',
  '',
  '---',
  '',
  '*Run this audit quarterly to track inline style reduction.*',
  '',
];

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, lines.join('\n'), 'utf8');

console.log(`Inline style audit complete:`);
console.log(`  Total inline styles: ${total}`);
console.log(`  Files affected: ${fileStats.length}`);
console.log(`  Unique properties: ${sortedPatterns.length}`);
console.log(`  Report: docs/INLINE-STYLE-AUDIT.md`);
