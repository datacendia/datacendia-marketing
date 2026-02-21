/**
 * wire-dgi-dcii-comparison.js: Wire data-i18n into dgi-dcii-comparison.html
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'dgi-dcii-comparison.html');
let html = fs.readFileSync(FILE, 'utf8');
let count = 0;
function rep(o, n, k) {
  if (!html.includes(o)) { console.log('NOT FOUND: ' + k); return; }
  html = html.replace(o, n); count++;
}

// Simple nav links
rep('<a href="index.html">Home</a>','<a href="index.html" data-i18n="navHome">Home</a>','navHome');
rep('<a href="dcii.html">DCII</a>','<a href="dcii.html" data-i18n="navDciiShort">DCII</a>','navDciiShort');
rep('<a href="dgi.html">DGI</a>','<a href="dgi.html" data-i18n="navDgiShort">DGI</a>','navDgiShort');
rep('<a href="demos.html">Demos</a>','<a href="demos.html" data-i18n="navDemosShort">Demos</a>','navDemosShort');
rep('<a href="pricing.html">Pricing</a>','<a href="pricing.html" data-i18n="navPricingShort">Pricing</a>','navPricingShort');
rep('<a href="team.html">Team</a>','<a href="team.html" data-i18n="navTeamShort">Team</a>','navTeamShort');

// Page header
rep('<h1 class="page-title">DGI vs DCII: Framework vs Implementation</h1>','<h1 class="page-title" data-i18n="cmpPageTitle">DGI vs DCII: Framework vs Implementation</h1>','cmpPageTitle');
rep('<p class="page-subtitle">\n        Understanding the relationship between the open standard (DGI) and Datacendia\'s reference implementation (DCII)\n      </p>','<p class="page-subtitle" data-i18n="cmpPageSubtitle">Understanding the relationship between the open standard (DGI) and Datacendia\'s reference implementation (DCII)</p>','cmpPageSubtitle');

// Framework cards
rep('<div class="framework-label">OPEN STANDARD</div>','<div class="framework-label" data-i18n="cmpDgiLabel">OPEN STANDARD</div>','cmpDgiLabel');
rep('<div class="framework-name">DGI</div>','<div class="framework-name" data-i18n="cmpDgiName">DGI</div>','cmpDgiName');
rep('<div class="framework-tagline">\n          Decision Governance Infrastructure — A vendor-neutral framework for institutional decision accountability\n        </div>','<div class="framework-tagline" data-i18n="cmpDgiTagline">Decision Governance Infrastructure — A vendor-neutral framework for institutional decision accountability</div>','cmpDgiTagline');
rep('<div class="framework-label">REFERENCE IMPLEMENTATION</div>','<div class="framework-label" data-i18n="cmpDciiLabel">REFERENCE IMPLEMENTATION</div>','cmpDciiLabel');
rep('<div class="framework-name">DCII</div>','<div class="framework-name" data-i18n="cmpDciiName">DCII</div>','cmpDciiName');
rep('<div class="framework-tagline">\n          Decision Crisis Immunization Infrastructure — Production-ready implementation with AI governance extensions\n        </div>','<div class="framework-tagline" data-i18n="cmpDciiTagline">Decision Crisis Immunization Infrastructure — Production-ready implementation with AI governance extensions</div>','cmpDciiTagline');

// Primitive Mapping section
rep('<h2 class="section-heading">Primitive Mapping: DGI → DCII</h2>','<h2 class="section-heading" data-i18n="cmpMappingTitle">Primitive Mapping: DGI → DCII</h2>','cmpMappingTitle');

// DGI primitive labels
rep('<div class="mapping-label">DGI PRIMITIVE A</div>','<div class="mapping-label" data-i18n="cmpDgiPrimA">DGI PRIMITIVE A</div>','cmpDgiPrimA');
rep('<div class="mapping-label">DGI PRIMITIVE B</div>','<div class="mapping-label" data-i18n="cmpDgiPrimB">DGI PRIMITIVE B</div>','cmpDgiPrimB');
rep('<div class="mapping-label">DGI PRIMITIVE C</div>','<div class="mapping-label" data-i18n="cmpDgiPrimC">DGI PRIMITIVE C</div>','cmpDgiPrimC');
rep('<div class="mapping-label">DGI PRIMITIVE D</div>','<div class="mapping-label" data-i18n="cmpDgiPrimD">DGI PRIMITIVE D</div>','cmpDgiPrimD');
rep('<div class="mapping-label">DGI PRIMITIVE E</div>','<div class="mapping-label" data-i18n="cmpDgiPrimE">DGI PRIMITIVE E</div>','cmpDgiPrimE');

// DGI primitive names (in mapping)
rep('<div class="mapping-name">Context Capture</div>','<div class="mapping-name" data-i18n="cmpMapAName">Context Capture</div>','cmpMapAName');
rep('<div class="mapping-name">Deliberation Traceability</div>','<div class="mapping-name" data-i18n="cmpMapBName">Deliberation Traceability</div>','cmpMapBName');
rep('<div class="mapping-name">Override Accountability</div>\n        <div class="mapping-arrow">→</div>\n        <div class="mapping-item dcii">\n          <div class="mapping-label">DCII P3</div>\n          <div class="mapping-name">Override Accountability</div>','<div class="mapping-name" data-i18n="cmpMapCName">Override Accountability</div>\n        <div class="mapping-arrow">→</div>\n        <div class="mapping-item dcii">\n          <div class="mapping-label">DCII P3</div>\n          <div class="mapping-name" data-i18n="cmpDciiP3Name">Override Accountability</div>','cmpMapCName');
rep('<div class="mapping-name">Evidence Integrity</div>','<div class="mapping-name" data-i18n="cmpMapDName">Evidence Integrity</div>','cmpMapDName');
rep('<div class="mapping-name">Drift Detection</div>\n        <div class="mapping-arrow">→</div>\n        <div class="mapping-item dcii">\n          <div class="mapping-label">DCII P5</div>\n          <div class="mapping-name">Drift Detection</div>','<div class="mapping-name" data-i18n="cmpMapEName">Drift Detection</div>\n        <div class="mapping-arrow">→</div>\n        <div class="mapping-item dcii">\n          <div class="mapping-label">DCII P5</div>\n          <div class="mapping-name" data-i18n="cmpDciiP5Name">Drift Detection</div>','cmpMapEName');

// DCII mapping labels
rep('<div class="mapping-label">DCII P1 + P4</div>','<div class="mapping-label" data-i18n="cmpDciiP1P4">DCII P1 + P4</div>','cmpDciiP1P4');
rep('<div class="mapping-label">DCII P2</div>','<div class="mapping-label" data-i18n="cmpDciiP2">DCII P2</div>','cmpDciiP2');
rep('<div class="mapping-label">DCII P3</div>','<div class="mapping-label" data-i18n="cmpDciiP3">DCII P3</div>','cmpDciiP3');
rep('<div class="mapping-label">DCII P7 + P8</div>','<div class="mapping-label" data-i18n="cmpDciiP7P8">DCII P7 + P8</div>','cmpDciiP7P8');
rep('<div class="mapping-label">DCII P5</div>','<div class="mapping-label" data-i18n="cmpDciiP5">DCII P5</div>','cmpDciiP5');

// Feature Comparison
rep('<h2 class="section-heading">Feature Comparison</h2>','<h2 class="section-heading" data-i18n="cmpFeatureTitle">Feature Comparison</h2>','cmpFeatureTitle');
rep('<th>Feature</th>','<th data-i18n="cmpThFeature">Feature</th>','cmpThFeature');

// Key Differences
rep('<h2 class="section-heading">Key Differences</h2>','<h2 class="section-heading" data-i18n="cmpDiffTitle">Key Differences</h2>','cmpDiffTitle');
rep('<div class="difference-title">Scope</div>','<div class="difference-title" data-i18n="cmpDiff1Title">Scope</div>','cmpDiff1Title');
rep('<div class="difference-title">Purpose</div>','<div class="difference-title" data-i18n="cmpDiff2Title">Purpose</div>','cmpDiff2Title');
rep('<div class="difference-title">Deployment</div>','<div class="difference-title" data-i18n="cmpDiff3Title">Deployment</div>','cmpDiff3Title');
rep('<div class="difference-title">Extensibility</div>','<div class="difference-title" data-i18n="cmpDiff4Title">Extensibility</div>','cmpDiff4Title');
rep('<div class="difference-title">Measurement</div>','<div class="difference-title" data-i18n="cmpDiff5Title">Measurement</div>','cmpDiff5Title');
rep('<div class="difference-title">Target Audience</div>','<div class="difference-title" data-i18n="cmpDiff6Title">Target Audience</div>','cmpDiff6Title');

// CTA
rep('<h3 style="font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 12px; color: var(--color-text);">\n        Choose Your Path\n      </h3>','<h3 style="font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 12px; color: var(--color-text);" data-i18n="cmpCtaTitle">Choose Your Path</h3>','cmpCtaTitle');
rep('<a href="DGI-Framework-v1.0.pdf" download class="btn btn-secondary">Download DGI Framework</a>','<a href="DGI-Framework-v1.0.pdf" download class="btn btn-secondary" data-i18n="cmpCtaDgi">Download DGI Framework</a>','cmpCtaDgi');
rep('<a href="DCII-Framework-White-Paper-2026-02-19.pdf" download class="btn btn-secondary">Download DCII White Paper</a>','<a href="DCII-Framework-White-Paper-2026-02-19.pdf" download class="btn btn-secondary" data-i18n="cmpCtaDcii">Download DCII White Paper</a>','cmpCtaDcii');
rep('<a href="pricing.html" class="btn btn-primary">View DCII Pricing</a>','<a href="pricing.html" class="btn btn-primary" data-i18n="cmpCtaPricing">View DCII Pricing</a>','cmpCtaPricing');

fs.writeFileSync(FILE, html, 'utf8');
console.log('dgi-dcii-comparison.html done — ' + count + ' replacements.');
console.log('data-i18n count: ' + (html.match(/data-i18n/g)||[]).length);
