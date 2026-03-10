/**
 * Fix nav i18n: Add data-i18n attributes to navigation elements on all pages
 * that use the old nav template without i18n support.
 * 
 * This script handles:
 * 1. Nav labels (Platform, Evidence, Pricing, Trust)
 * 2. Nav links with descriptions (wraps text in span with data-i18n)
 * 3. Simple nav links (Industries, Request Briefing)
 * 4. Footer links that need data-i18n
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

// Pages that need nav i18n fix (have translations-loader.js but NO data-i18n on nav)
const AFFECTED_PAGES = [
  'briefing.html',
  'dgi.html',
  'gateway.html',
  'honesty-matrices.html',
  'regulators-receipt.html',
  'dgi-dcii-comparison.html',
  'diagrams/index.html',
  'learn/index.html',
  'learn/ai-audit-trail/index.html',
  'learn/decision-intelligence/index.html',
  'learn/dora-compliance/index.html',
  'learn/eu-ai-act-compliance/index.html',
  'learn/explainable-ai/index.html',
  'learn/multi-agent-ai/index.html',
  'learn/sovereign-ai/index.html',
];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function fixNavI18n(html) {
  // Skip if already has data-i18n on nav (already fixed)
  if (html.includes('data-i18n="navPlatform"')) return html;

  // 1. Fix nav labels
  html = html.replace(
    '<span class="nav-label">Platform</span>',
    '<span class="nav-label" data-i18n="navPlatform">Platform</span>'
  );
  html = html.replace(
    '<span class="nav-label">Evidence</span>',
    '<span class="nav-label" data-i18n="navEvidence">Evidence</span>'
  );
  html = html.replace(
    '<span class="nav-label">Pricing</span>',
    '<span class="nav-label" data-i18n="navPricing">Pricing</span>'
  );
  html = html.replace(
    '<span class="nav-label">Trust</span>',
    '<span class="nav-label" data-i18n="navTrust">Trust</span>'
  );

  // 2. Fix nav links with descriptions
  // Pattern: >LINK_TEXT<span class="nav-desc">DESC</span></a>
  // New: ><span data-i18n="KEY">LINK_TEXT</span><span class="nav-desc" data-i18n="DESC_KEY">DESC</span></a>
  const linkItems = [
    { text: 'Platform Overview', key: 'navPlatformOverview', descKey: 'navPlatformOverviewDesc' },
    { text: 'DCII Framework', key: 'navDcii', descKey: 'navDciiDesc' },
    { text: 'DDGI Framework', key: 'navDgi', descKey: 'navDgiDesc' },
    { text: 'DGI Framework', key: 'navDgi', descKey: 'navDgiDesc' },
    { text: 'Architecture', key: 'navArchitecture', descKey: 'navArchitectureDesc' },
    { text: 'Interactive Demos', key: 'navDemos', descKey: 'navDemosDesc' },
    { text: 'War Games', key: 'navWargames', descKey: 'navWargamesDesc' },
    { text: 'Case Studies', key: 'navCaseStudies', descKey: 'navCaseStudiesDesc' },
    { text: 'Tier Overview', key: 'navTierOverview', descKey: 'navTierOverviewDesc' },
    { text: 'Premium Modules', key: 'navPremiumModules', descKey: 'navPremiumModulesDesc' },
    { text: 'ROI Calculator', key: 'navRoiCalculator', descKey: 'navRoiCalculatorDesc' },
    { text: '90-Day Pilot', key: 'navPilot', descKey: 'navPilotDesc' },
    { text: 'Trust Center', key: 'navTrustCenter', descKey: 'navTrustCenterDesc' },
    { text: 'Honesty Matrices', key: 'navHonestyMatricesLink', descKey: 'navHonestyMatricesDesc' },
  ];

  for (const item of linkItems) {
    // Match: >TEXT<span class="nav-desc">DESC</span></a>
    const regex = new RegExp(
      `(>)${escapeRegex(item.text)}(<span class="nav-desc">)`,
      'g'
    );
    html = html.replace(regex, `$1<span data-i18n="${item.key}">${item.text}</span><span class="nav-desc" data-i18n="${item.descKey}">`);
    // Remove the original <span class="nav-desc"> that's now nested (fix double span)
    // Actually the replacement already opens the new span, but we need to close the desc span properly
    // The regex above replaces >TEXT<span class="nav-desc"> with ><span>TEXT</span><span class="nav-desc" data-i18n="">
    // which is correct - the desc text follows and closes with </span>
  }

  // 3. Fix simple nav links (Industries)
  html = html.replace(
    /(<a href="[^"]*verticals\.html")>(Industries)<\/a>/g,
    '$1 data-i18n="navIndustries">$2</a>'
  );

  // 4. Fix CTA link (Request Briefing) - in nav only
  html = html.replace(
    /(<a href="[^"]*briefing\.html" class="nav-cta")>(Request Briefing)<\/a>/g,
    '$1 data-i18n="navRequestBriefing">$2</a>'
  );

  return html;
}

let totalFixed = 0;

for (const page of AFFECTED_PAGES) {
  const filePath = path.join(ROOT, page);
  if (!fs.existsSync(filePath)) {
    console.log(`  SKIP: ${page} (not found)`);
    continue;
  }

  const original = fs.readFileSync(filePath, 'utf8');
  const fixed = fixNavI18n(original);

  if (fixed !== original) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    const changes = (fixed.match(/data-i18n="nav/g) || []).length - (original.match(/data-i18n="nav/g) || []).length;
    console.log(`  FIXED: ${page} (+${changes} data-i18n attributes)`);
    totalFixed++;
  } else {
    console.log(`  SKIP: ${page} (already fixed or no nav found)`);
  }
}

console.log(`\nFixed nav i18n on ${totalFixed} pages`);
