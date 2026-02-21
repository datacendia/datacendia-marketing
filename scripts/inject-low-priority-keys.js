/**
 * inject-low-priority-keys.js
 * Injects new i18n keys for changelog.html, team.html, trading.html,
 * hospitality.html, partners.html, and manifesto.html into all 11 language files.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const LANGS = ['en','ar','de','es','fr','hi','it','ja','ko','pt','zh'];
const CLOSE_PATTERN = '\n};\n\nif (typeof window';

const NEW_KEYS = {
  // changelog.html
  changelogTitle: 'Changelog',
  changelogSubtitle: 'What shipped. Real commits from our repository — not a roadmap, not a promise.',
  changelogTagAccuracy: 'Accuracy',
  changelogTagMajor: 'Major',
  changelogTagFeature: 'Feature',
  changelogTagSecurity: 'Security',
  changelogTagFoundation: 'Foundation',

  // team.html
  teamBackLink: '← Return to Datacendia',
  teamPageTitle: 'Leadership',
  teamPageSubtitle: "The team building Decision Crisis Immunization Infrastructure for enterprises that can't afford to guess.",
  teamFounderLabel: 'Founder',
  teamFounderTitle: 'Founder & Architect',
  teamAdvisoryTitle: 'Advisory Network',
  teamPhilosophyTitle: 'Design Philosophy',
  teamWhyTitle: 'Why "Datacendia"?',
  teamContactText: 'Want to discuss the architecture or explore a pilot?',

  // trading.html
  tradingHeroTitle: 'AI-Governed Trading Desk Risk & Compliance',
  tradingHeroDesc: 'Multi-agent deliberation for position sizing, VaR management, concentration limits, and regulatory compliance — every decision audit-ready before execution.',
  tradingStat1Label: 'Specialist Agents',
  tradingStat2Label: 'On-Premises',
  tradingStat3Label: 'VaR Checks',
  tradingStat4Label: 'Compliance Rules',
  tradingS1Title: 'What Datacendia Does for Trading',
  tradingS2Title: 'Trading-Specific Agents',
  tradingS3Title: 'Risk Governance Example',
  tradingS4Title: 'Compliance Frameworks',
  tradingCard1Title: 'Position Governance',
  tradingCard2Title: 'VaR Limit Enforcement',
  tradingCard3Title: 'Concentration Monitoring',
  tradingCard4Title: 'Regulatory Compliance',
  tradingCard5Title: 'Cross-Examination',
  tradingCard6Title: 'Audit Provenance',
  tradingAgent1: 'Macro Strategist',
  tradingAgent2: 'Risk Manager',
  tradingAgent3: 'Compliance Officer',
  tradingAgent4: 'Execution Strategist',
  tradingAgent5: 'Quant Analyst',
  tradingAgent6: 'Portfolio Oversight',
  tradingCtaTitle: 'See Trading Governance in Action',
  tradingThCheck: 'Check',
  tradingThStatus: 'Status',
  tradingThAction: 'Action',

  // hospitality.html
  hospHeroTitle: 'AI-Governed Hotel Investment & Revenue Decisions',
  hospHeroDesc: 'Multi-agent deliberation for acquisition analysis, RevPAR optimization, brand compliance audits, and portfolio governance — with full audit provenance on every decision.',
  hospStat1Label: 'Specialist Agents',
  hospStat2Label: 'On-Premises',
  hospStat3Label: 'Decision Types',
  hospStat4Label: 'Compliance Checks',
  hospS1Title: 'What Datacendia Does for Hospitality',
  hospS2Title: 'Hospitality-Specific Agents',
  hospS3Title: 'Compliance Frameworks',
  hospCard1Title: 'Acquisition Governance',
  hospCard2Title: 'RevPAR Optimization',
  hospCard3Title: 'Brand Compliance Audits',
  hospCard4Title: 'Portfolio Risk Governance',
  hospCard5Title: 'On-Premises Deployment',
  hospCard6Title: 'Audit Provenance',
  hospAgent1: 'Revenue Strategist',
  hospAgent2: 'Financial Analyst',
  hospAgent3: 'Brand Compliance Officer',
  hospAgent4: 'Risk & Operations',
  hospAgent5: 'Market Intelligence',
  hospAgent6: 'ESG & Sustainability',
  hospCtaTitle: 'See Hospitality Governance in Action',

  // partners.html
  partnersPageTitle: 'Partner Program',
  partnersType1Title: 'System Integrators',
  partnersType2Title: 'Advisory & Consulting',
  partnersType3Title: 'Technology Partners',
  partnersBenefitsTitle: 'Partner Benefits',
  partnersBenefit1Title: 'Revenue Opportunity',
  partnersBenefit2Title: 'Technical Training',
  partnersBenefit3Title: 'Sales Enablement',
  partnersBenefit4Title: 'Priority Support',
  partnersBenefit5Title: 'Market Access',
  partnersBenefit6Title: 'Differentiation',
  partnersProfileTitle: 'Ideal Partner Profile',
  partnersHowTitle: 'How It Works',
  partnersCtaTitle: 'Become a Partner',

  // manifesto.html
  manifestoPageTitle: 'The Datacendia Manifesto',
  manifestoPageSubtitle: 'Principles for building sovereign enterprise intelligence',
  manifestoS1Title: 'I. Your Data, Your Infrastructure, Your Control',
  manifestoS2Title: 'II. Radical Transparency Over Marketing Theater',
  manifestoS3Title: 'III. Decisions Must Be Explainable',
  manifestoS4Title: 'IV. Portability and Low Switching Costs',
  manifestoS5Title: 'V. Security Is Architecture, Not Afterthought',
  manifestoS6Title: 'VI. Multi-Agent Deliberation Over Single-Model Answers',
  manifestoS7Title: 'VII. Build for the Regulator in the Room',
  manifestoS8Title: 'VIII. Honest About Our Limitations',
  manifestoS9Title: 'IX. Customer-Owned Verification',
  manifestoCtaBtn: 'Discuss Our Principles →',
};

let injected = 0;
let skipped = 0;

for (const lang of LANGS) {
  const file = path.join(ROOT, 'translations', lang + '.js');
  if (!fs.existsSync(file)) { console.log('MISSING: ' + file); continue; }
  let content = fs.readFileSync(file, 'utf8');

  const toAdd = Object.entries(NEW_KEYS).filter(([k]) => !content.includes(`  ${k}:`));
  if (toAdd.length === 0) { console.log(`SKIP ${lang} — all keys present`); skipped++; continue; }

  const block = '\n' + toAdd.map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`).join('\n');
  const idx = content.indexOf(CLOSE_PATTERN);
  if (idx === -1) { console.log('CLOSE PATTERN NOT FOUND: ' + lang); continue; }

  const before = content.slice(0, idx);
  const after = content.slice(idx);
  const trimmed = before.trimEnd();
  const needsComma = !trimmed.endsWith(',');
  content = trimmed + (needsComma ? ',' : '') + block + '\n' + after.trimStart();

  fs.writeFileSync(file, content, 'utf8');
  console.log(`ADDED ${toAdd.length} keys to: translations/${lang}.js`);
  injected++;
}

console.log(`\nDone — ${injected} files updated, ${skipped} skipped.`);

console.log('\n=== VERIFICATION ===');
for (const lang of LANGS) {
  const file = path.join(ROOT, 'translations', lang + '.js');
  try {
    const c = fs.readFileSync(file, 'utf8');
    const match = c.match(/const\s+\w+\s*=\s*\{([\s\S]*?)\};\s*\n\s*if/);
    if (!match) { console.log(lang + ': PARSE PATTERN NOT FOUND'); continue; }
    const keys = (match[1].match(/^\s+\w+:/gm) || []).length;
    console.log(lang + ': OK — ' + keys + ' keys');
  } catch(e) { console.log(lang + ': ERROR — ' + e.message); }
}
