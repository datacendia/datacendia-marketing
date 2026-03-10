/**
 * fix-newsletter-forms.cjs — Update all newsletter forms to use /api/subscribe.php
 * instead of the Formspree placeholder.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
let fixed = 0;

for (const file of htmlFiles) {
  const filePath = path.join(ROOT, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('formspree.io/f/REPLACE_WITH_FORMSPREE_ID')) {
    content = content.replace(
      /https:\/\/formspree\.io\/f\/REPLACE_WITH_FORMSPREE_ID/g,
      '/api/subscribe.php'
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`${file}: updated form action`);
    fixed++;
  }
}

// Also check briefing.html for its own form
const briefingPath = path.join(ROOT, 'briefing.html');
if (fs.existsSync(briefingPath)) {
  let bc = fs.readFileSync(briefingPath, 'utf8');
  if (bc.includes('formspree.io') && !bc.includes('/api/')) {
    // briefing form may have a real formspree ID — leave it unless it's the placeholder
    if (bc.includes('REPLACE_WITH_FORMSPREE_ID')) {
      bc = bc.replace(/https:\/\/formspree\.io\/f\/REPLACE_WITH_FORMSPREE_ID/g, '/api/subscribe.php');
      fs.writeFileSync(briefingPath, bc, 'utf8');
      console.log('briefing.html: updated form action');
      fixed++;
    } else {
      console.log('briefing.html: has real Formspree ID, skipped');
    }
  }
}

console.log(`\nFixed ${fixed} pages`);
