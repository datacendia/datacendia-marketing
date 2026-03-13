const fs = require('fs');
const path = require('path');

const EN_JSON = path.resolve(__dirname, '..', 'translations', 'en.json');
const EN_JS = path.resolve(__dirname, '..', 'translations', 'en.js');

const j = JSON.parse(fs.readFileSync(EN_JSON, 'utf8'));

const fixes = {
  faqBiQ: 'Is this BI?',
  faqApiQ: 'Is this another AI API?',
  faqAnalyticsQ: 'Is this analytics + AI agents?',
  faqSovereignQ: 'Why \u201cSovereign\u201d?',
  faqBankQ: 'How does this help a bank pass a regulatory exam?',
  faqHospitalQ: 'Can a hospital use this for clinical decisions?',
  faqSportsQ: 'How does this apply to football / sports?',
  faqInvestQ: 'What makes this investable as a category?',
  metricsFootnote: 'Verified build metrics \u00b7 Run <code>npm test</code> to reproduce \u00b7 <a href="trust.html">View Trust Center</a>',
  complianceStatus: 'Compliance: Architecture aligned with SOC 2, ISO 27001, HIPAA controls \u00b7 Formal certification available on enterprise contract \u00b7 <a href="docs/compliance/" style="color: var(--color-gold);">View compliance docs</a> \u00b7 <span class="last-updated">Last updated: 2026-03-06</span>',
};

for (const [k, v] of Object.entries(fixes)) {
  j[k] = v;
  console.log(`${k} -> fixed`);
}

fs.writeFileSync(EN_JSON, JSON.stringify(j, null, 2) + '\n', 'utf8');

// Regenerate en.js
const jsLines = ['const translations_en = {'];
for (const [key, value] of Object.entries(j)) {
  const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
  jsLines.push(`  "${key}": "${escaped}",`);
}
jsLines.push('};');
jsLines.push('if (typeof window !== "undefined") window.translations_en = translations_en;');
fs.writeFileSync(EN_JS, jsLines.join('\n'), 'utf8');

console.log('\nDone — en.json + en.js updated');
