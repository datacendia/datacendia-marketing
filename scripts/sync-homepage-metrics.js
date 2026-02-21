#!/usr/bin/env node
/**
 * Sync Homepage Metrics Across All Locales
 * 
 * Updates the trust metrics in all translated index.html files to match
 * the English version's verified numbers.
 * 
 * Critical for maintaining "Radical Transparency" brand promise.
 */

const fs = require('fs');
const path = require('path');

const LOCALES = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'zh'];

// Source of truth from index.html (English)
const CORRECT_METRICS = {
  tests: '3,448',
  testPassRate: '98%',
  testDate: 'Jan 17, 2026',
  agents: '62'
};

// Old values to find and replace
const OLD_METRICS = {
  tests: '1,464',
  testPassRate: '100%',
  agents: '45'
};

function updateLocaleFile(locale) {
  const filePath = path.join(__dirname, '..', locale, 'index.html');
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Update test count
  if (content.includes(`<span class="number">${OLD_METRICS.tests}</span>`)) {
    content = content.replace(
      `<span class="number">${OLD_METRICS.tests}</span>`,
      `<span class="number">${CORRECT_METRICS.tests}</span>`
    );
    modified = true;
  }

  // Update test pass rate in title attribute
  if (content.includes(`${OLD_METRICS.testPassRate} pass rate verified`)) {
    content = content.replace(
      `${OLD_METRICS.testPassRate} pass rate verified`,
      `${CORRECT_METRICS.testPassRate} pass rate verified`
    );
    modified = true;
  }

  // Update test pass rate in label-sub
  if (content.includes(`${OLD_METRICS.testPassRate} pass rate`)) {
    content = content.replace(
      `${OLD_METRICS.testPassRate} pass rate`,
      `${CORRECT_METRICS.testPassRate} pass rate`
    );
    modified = true;
  }

  // Update test date
  if (content.includes('Jan 2026</time>')) {
    content = content.replace(
      'Jan 2026</time>',
      `${CORRECT_METRICS.testDate}</time>`
    );
    modified = true;
  }

  // Update agent count
  if (content.includes(`<span class="number">${OLD_METRICS.agents}</span>`)) {
    content = content.replace(
      `<span class="number">${OLD_METRICS.agents}</span>`,
      `<span class="number">${CORRECT_METRICS.agents}</span>`
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${locale}/index.html`);
    return true;
  } else {
    console.log(`ℹ️  ${locale}/index.html already up to date`);
    return false;
  }
}

function main() {
  console.log('🔄 Syncing homepage metrics across all locales...\n');
  console.log(`Source metrics (from index.html):`);
  console.log(`  - Tests: ${CORRECT_METRICS.tests} (${CORRECT_METRICS.testPassRate} pass rate)`);
  console.log(`  - Agents: ${CORRECT_METRICS.agents}`);
  console.log(`  - Date: ${CORRECT_METRICS.testDate}\n`);

  let updatedCount = 0;
  let errorCount = 0;

  for (const locale of LOCALES) {
    try {
      if (updateLocaleFile(locale)) {
        updatedCount++;
      }
    } catch (err) {
      console.error(`❌ Error updating ${locale}: ${err.message}`);
      errorCount++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  - Updated: ${updatedCount} files`);
  console.log(`  - Already current: ${LOCALES.length - updatedCount - errorCount} files`);
  console.log(`  - Errors: ${errorCount} files`);

  if (updatedCount > 0) {
    console.log(`\n✅ Metrics synchronized. Commit and push to deploy.`);
  }
}

main();
