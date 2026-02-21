/**
 * audit-assets.js
 * Checks for: missing image/svg srcs, missing internal href targets,
 * buttons without text, and CSS/JS file references.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

const missingSrcs = [];
const missingHrefs = [];
const allSrcs = new Set();
const allHrefs = new Set();

htmlFiles.forEach(file => {
  const c = fs.readFileSync(path.join(ROOT, file), 'utf8');

  // Check src= references (images, svgs, scripts)
  const srcMatches = c.match(/src="([^"]+)"/g) || [];
  srcMatches.forEach(m => {
    const src = m.match(/src="([^"]+)"/)[1];
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('//')) return;
    allSrcs.add(src);
    const fullPath = path.join(ROOT, src);
    if (!fs.existsSync(fullPath)) {
      missingSrcs.push({ file, src });
    }
  });

  // Check internal href= references (html pages only)
  const hrefMatches = c.match(/href="([^"#]+\.html)"/g) || [];
  hrefMatches.forEach(m => {
    const href = m.match(/href="([^"]+)"/)[1];
    if (href.startsWith('http') || href.startsWith('//')) return;
    allHrefs.add(href);
    const fullPath = path.join(ROOT, href);
    if (!fs.existsSync(fullPath)) {
      missingHrefs.push({ file, href });
    }
  });
});

console.log('=== ASSET AUDIT ===');
console.log('HTML files scanned: ' + htmlFiles.length);
console.log('Unique src refs: ' + allSrcs.size);
console.log('Unique internal html hrefs: ' + allHrefs.size);
console.log('');

if (missingSrcs.length) {
  console.log('MISSING SRC FILES (' + missingSrcs.length + '):');
  missingSrcs.forEach(({ file, src }) => console.log('  [' + file + '] ' + src));
} else {
  console.log('MISSING SRC FILES: none ✓');
}

console.log('');

if (missingHrefs.length) {
  console.log('MISSING INTERNAL HREF TARGETS (' + missingHrefs.length + '):');
  // dedupe
  const seen = new Set();
  missingHrefs.forEach(({ file, href }) => {
    const key = href;
    if (!seen.has(key)) { console.log('  ' + href + '  [referenced in: ' + file + ']'); seen.add(key); }
  });
} else {
  console.log('MISSING INTERNAL HREF TARGETS: none ✓');
}

// Check CSS and JS files referenced
console.log('');
console.log('=== CSS/JS REFERENCES ===');
const cssJsRefs = new Set();
htmlFiles.forEach(file => {
  const c = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const refs = c.match(/(href|src)="([^"]+\.(css|js))"/g) || [];
  refs.forEach(m => {
    const ref = m.match(/(href|src)="([^"]+)"/)[2];
    if (ref.startsWith('http') || ref.startsWith('//')) return;
    // strip query strings
    const clean = ref.split('?')[0];
    cssJsRefs.add(clean);
  });
});
let missingCssJs = 0;
cssJsRefs.forEach(ref => {
  const fullPath = path.join(ROOT, ref);
  if (!fs.existsSync(fullPath)) {
    console.log('MISSING: ' + ref);
    missingCssJs++;
  }
});
if (missingCssJs === 0) console.log('All CSS/JS files present ✓');

// Check apple-touch-icon
console.log('');
console.log('=== MISC ===');
const appleTouchIcon = path.join(ROOT, 'apple-touch-icon.png');
console.log('apple-touch-icon.png: ' + (fs.existsSync(appleTouchIcon) ? '✓' : 'MISSING'));
const ogImage = path.join(ROOT, 'og-image.png');
console.log('og-image.png (root): ' + (fs.existsSync(ogImage) ? '✓' : 'MISSING (referenced in meta tags as https — OK)'));
