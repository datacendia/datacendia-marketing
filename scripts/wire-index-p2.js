/**
 * Part 2: Wire data-i18n into index.html — Category + 9 Primitives + 3 Core Pillars + Regulator's Receipt
 */
const fs = require('fs');
const path = require('path');
const FILE = path.resolve(__dirname, '..', 'index.html');
let html = fs.readFileSync(FILE, 'utf8');
let count = 0;

function rep(o, n, k) {
  if (!html.includes(o)) { console.log('NOT FOUND: ' + k); return; }
  html = html.replace(o, n); count++;
}

// ── CATEGORY ─────────────────────────────────────────────────────────────────
rep(
  '<p class="category-label">The Category</p>',
  '<p class="category-label" data-i18n="categoryLabel">The Category</p>',
  'categoryLabel'
);
rep(
  '<h2 class="category-title">Datacendia is <em>Decision Crisis Immunization Infrastructure</em>.</h2>',
  '<h2 class="category-title" data-i18n="categoryTitle">Datacendia is <em>Decision Crisis Immunization Infrastructure</em>.</h2>',
  'categoryTitle'
);
rep(
  '<p class="category-desc">We created a new category: the <strong>evidentiary layer</strong> that proves AI decisions were made correctly when challenged years later under adversarial scrutiny.</p>',
  '<p class="category-desc" data-i18n="categoryDesc">We created a new category: the <strong>evidentiary layer</strong> that proves AI decisions were made correctly when challenged years later under adversarial scrutiny.</p>',
  'categoryDesc'
);
rep(
  '<p class="category-sub">Built on <strong>9 primitives</strong> that prevent institutional failure:</p>',
  '<p class="category-sub" data-i18n="categorySub">Built on <strong>9 primitives</strong> that prevent institutional failure:</p>',
  'categorySub'
);

// ── 9 PRIMITIVES ─────────────────────────────────────────────────────────────
rep(
  '<div class="primitive-name">Discovery-Time Proof</div>',
  '<div class="primitive-name" data-i18n="p1Name">Discovery-Time Proof</div>',
  'p1Name'
);
rep(
  '<div class="primitive-desc">Prove <em>when</em> you knew what you knew — cryptographically timestamped.</div>',
  '<div class="primitive-desc" data-i18n="p1Desc">Prove <em>when</em> you knew what you knew — cryptographically timestamped.</div>',
  'p1Desc'
);
rep(
  '<div class="primitive-name">Deliberation Capture</div>',
  '<div class="primitive-name" data-i18n="p2Name">Deliberation Capture</div>',
  'p2Name'
);
rep(
  '<div class="primitive-desc">Record the full reasoning — every argument, trade-off, and vote.</div>',
  '<div class="primitive-desc" data-i18n="p2Desc">Record the full reasoning — every argument, trade-off, and vote.</div>',
  'p2Desc'
);
rep(
  '<div class="primitive-name">Override Accountability</div>',
  '<div class="primitive-name" data-i18n="p3Name">Override Accountability</div>',
  'p3Name'
);
rep(
  '<div class="primitive-desc">When humans overrule AI, the override is logged, justified, and tracked.</div>',
  '<div class="primitive-desc" data-i18n="p3Desc">When humans overrule AI, the override is logged, justified, and tracked.</div>',
  'p3Desc'
);
rep(
  '<div class="primitive-name">Continuity Memory</div>',
  '<div class="primitive-name" data-i18n="p4Name">Continuity Memory</div>',
  'p4Name'
);
rep(
  '<div class="primitive-desc">Institutional knowledge that survives leadership transitions.</div>',
  '<div class="primitive-desc" data-i18n="p4Desc">Institutional knowledge that survives leadership transitions.</div>',
  'p4Desc'
);
rep(
  '<div class="primitive-name">Drift Detection</div>',
  '<div class="primitive-name" data-i18n="p5Name">Drift Detection</div>',
  'p5Name'
);
rep(
  '<div class="primitive-desc">Detect when decisions deviate from policy — before crisis.</div>',
  '<div class="primitive-desc" data-i18n="p5Desc">Detect when decisions deviate from policy — before crisis.</div>',
  'p5Desc'
);
rep(
  '<div class="primitive-name">Cognitive Bias Mitigation</div>',
  '<div class="primitive-name" data-i18n="p6Name">Cognitive Bias Mitigation</div>',
  'p6Name'
);
rep(
  '<div class="primitive-desc">Identify and mitigate human cognitive biases in decision-making.</div>',
  '<div class="primitive-desc" data-i18n="p6Desc">Identify and mitigate human cognitive biases in decision-making.</div>',
  'p6Desc'
);
rep(
  '<div class="primitive-name">Quantum-Resistant Integrity</div>',
  '<div class="primitive-name" data-i18n="p7Name">Quantum-Resistant Integrity</div>',
  'p7Name'
);
rep(
  '<div class="primitive-desc">Evidence integrity survives quantum computing attacks.</div>',
  '<div class="primitive-desc" data-i18n="p7Desc">Evidence integrity survives quantum computing attacks.</div>',
  'p7Desc'
);
rep(
  '<div class="primitive-name">Synthetic Media Authentication</div>',
  '<div class="primitive-name" data-i18n="p8Name">Synthetic Media Authentication</div>',
  'p8Name'
);
rep(
  '<div class="primitive-desc">Detect deepfakes and synthetic media in evidence chains.</div>',
  '<div class="primitive-desc" data-i18n="p8Desc">Detect deepfakes and synthetic media in evidence chains.</div>',
  'p8Desc'
);
rep(
  '<div class="primitive-name">Cross-Jurisdiction Compliance</div>',
  '<div class="primitive-name" data-i18n="p9Name">Cross-Jurisdiction Compliance</div>',
  'p9Name'
);
rep(
  '<div class="primitive-desc">Decisions comply across 17 jurisdictions simultaneously.</div>',
  '<div class="primitive-desc" data-i18n="p9Desc">Decisions comply across 17 jurisdictions simultaneously.</div>',
  'p9Desc'
);
rep(
  "<p class=\"primitives-note\">These aren't features. They're the <em>structural antibodies</em> that make organizations immune to decision crises. <a href=\"dcii.html\" class=\"link-gold\">Learn the DCII framework →</a></p>",
  '<p class="primitives-note"><span data-i18n="primitivesNote">These aren\'t features. They\'re the <em>structural antibodies</em> that make organizations immune to decision crises.</span> <a href="dcii.html" class="link-gold" data-i18n="primitivesLearnLink">Learn the DCII framework →</a></p>',
  'primitivesNote'
);

// ── 3 CORE PILLARS ────────────────────────────────────────────────────────────
rep(
  '<p class="section-label">The Platform</p>',
  '<p class="section-label" data-i18n="platformLabel">The Platform</p>',
  'platformLabel'
);
rep(
  '<h2 class="iiss-title">3 Core Pillars</h2>',
  '<h2 class="iiss-title" data-i18n="pillarsTitle">3 Core Pillars</h2>',
  'pillarsTitle'
);
rep(
  '<p class="iiss-subtitle max-w-520" style="margin:0 auto;">Make decisions &rarr; Understand them &rarr; Prove them</p>',
  '<p class="iiss-subtitle max-w-520" style="margin:0 auto;" data-i18n="pillarsSubtitle">Make decisions → Understand them → Prove them</p>',
  'pillarsSubtitle'
);
// Council
rep(
  '<h3 class="pillar-title">The Council&trade;</h3>',
  '<h3 class="pillar-title" data-i18n="councilPillarTitle">The Council™</h3>',
  'councilPillarTitle'
);
rep(
  '<p class="pillar-subtitle">Multi-Agent Deliberation</p>',
  '<p class="pillar-subtitle" data-i18n="councilPillarSubtitle">Multi-Agent Deliberation</p>',
  'councilPillarSubtitle'
);
rep(
  '<p class="pillar-desc">15 C-suite AI agents debate every decision from their domain — surfacing blind spots, conflicts, and consensus before you commit.</p>',
  '<p class="pillar-desc" data-i18n="councilPillarDesc">15 C-suite AI agents debate every decision from their domain — surfacing blind spots, conflicts, and consensus before you commit.</p>',
  'councilPillarDesc'
);
rep(
  '<li class="pillar-feature"><span class="check">&#10003;</span> 15 core agents + premium packs</li>',
  '<li class="pillar-feature"><span class="check">&#10003;</span> <span data-i18n="councilFeature1">15 core agents + premium packs</span></li>',
  'councilFeature1'
);
rep(
  '<li class="pillar-feature"><span class="check">&#10003;</span> 35+ deliberation modes</li>',
  '<li class="pillar-feature"><span class="check">&#10003;</span> <span data-i18n="councilFeature2">35+ deliberation modes</span></li>',
  'councilFeature2'
);
rep(
  '<li class="pillar-feature"><span class="check">&#10003;</span> Live deliberation with avatars</li>',
  '<li class="pillar-feature"><span class="check">&#10003;</span> <span data-i18n="councilFeature3">Live deliberation with avatars</span></li>',
  'councilFeature3'
);
rep(
  '<li class="pillar-feature"><span class="check">&#10003;</span> 60-trait personality system</li>',
  '<li class="pillar-feature"><span class="check">&#10003;</span> <span data-i18n="councilFeature4">60-trait personality system</span></li>',
  'councilFeature4'
);
rep(
  '<a href="resources/the-council.html" class="pillar-link">Learn more &rarr;</a>',
  '<a href="resources/the-council.html" class="pillar-link" data-i18n="councilLearnMore">Learn more →</a>',
  'councilLearnMore'
);
// Decide
rep(
  '<h3 class="pillar-title">Decide&trade;</h3>',
  '<h3 class="pillar-title" data-i18n="decidePillarTitle">Decide™</h3>',
  'decidePillarTitle'
);
rep(
  '<p class="pillar-subtitle">Decision Intelligence Suite</p>',
  '<p class="pillar-subtitle" data-i18n="decidePillarSubtitle">Decision Intelligence Suite</p>',
  'decidePillarSubtitle'
);
rep(
  '<p class="pillar-desc">Intelligence for every decision — past, present, and future. Time machines, failure prediction, consequence mapping, and explainability.</p>',
  '<p class="pillar-desc" data-i18n="decidePillarDesc">Intelligence for every decision — past, present, and future. Time machines, failure prediction, consequence mapping, and explainability.</p>',
  'decidePillarDesc'
);
rep(
  '<li class="pillar-feature"><span class="check">&#10003;</span> CendiaChronos&trade; time machine</li>',
  '<li class="pillar-feature"><span class="check">&#10003;</span> <span data-i18n="decideFeature1">CendiaChronos™ time machine</span></li>',
  'decideFeature1'
);
rep(
  '<li class="pillar-feature"><span class="check">&#10003;</span> PreMortem&trade; failure prediction</li>',
  '<li class="pillar-feature"><span class="check">&#10003;</span> <span data-i18n="decideFeature2">PreMortem™ failure prediction</span></li>',
  'decideFeature2'
);
rep(
  '<li class="pillar-feature"><span class="check">&#10003;</span> Decision Debt&trade; (cost of inaction)</li>',
  '<li class="pillar-feature"><span class="check">&#10003;</span> <span data-i18n="decideFeature3">Decision Debt™ (cost of inaction)</span></li>',
  'decideFeature3'
);
rep(
  '<li class="pillar-feature"><span class="check">&#10003;</span> CendiaLens&trade; AI explainability</li>',
  '<li class="pillar-feature"><span class="check">&#10003;</span> <span data-i18n="decideFeature4">CendiaLens™ AI explainability</span></li>',
  'decideFeature4'
);
rep(
  '<a href="demos.html" class="pillar-link">See demos &rarr;</a>',
  '<a href="demos.html" class="pillar-link" data-i18n="decideSeeDemo">See demos →</a>',
  'decideSeeDemo'
);
// DCII pillar
rep(
  '<h3 class="pillar-title">DCII&trade;</h3>',
  '<h3 class="pillar-title" data-i18n="dciiPillarTitle">DCII™</h3>',
  'dciiPillarTitle'
);
rep(
  '<p class="pillar-subtitle">Crisis Immunization + Evidence</p>',
  '<p class="pillar-subtitle" data-i18n="dciiPillarSubtitle">Crisis Immunization + Evidence</p>',
  'dciiPillarSubtitle'
);
rep(
  '<p class="pillar-desc">The 9 primitives + cryptographic proof infrastructure. When regulators challenge your decisions, DCII is what you show them.</p>',
  '<p class="pillar-desc" data-i18n="dciiPillarDesc">The 9 primitives + cryptographic proof infrastructure. When regulators challenge your decisions, DCII is what you show them.</p>',
  'dciiPillarDesc'
);
rep(
  '<li class="pillar-feature"><span class="check">&#10003;</span> 9 crisis immunization primitives</li>',
  '<li class="pillar-feature"><span class="check">&#10003;</span> <span data-i18n="dciiFeature1">9 crisis immunization primitives</span></li>',
  'dciiFeature1'
);
rep(
  '<li class="pillar-feature"><span class="check">&#10003;</span> CendiaVault&trade; + CendiaNotary&trade;</li>',
  '<li class="pillar-feature"><span class="check">&#10003;</span> <span data-i18n="dciiFeature2">CendiaVault™ + CendiaNotary™</span></li>',
  'dciiFeature2'
);
rep(
  '<li class="pillar-feature"><span class="check">&#10003;</span> Regulator&rsquo;s Receipt&trade; (1-click PDF)</li>',
  '<li class="pillar-feature"><span class="check">&#10003;</span> <span data-i18n="dciiFeature3">Regulator\'s Receipt™ (1-click PDF)</span></li>',
  'dciiFeature3'
);
rep(
  '<li class="pillar-feature"><span class="check">&#10003;</span> IISS&trade; resilience scoring</li>',
  '<li class="pillar-feature"><span class="check">&#10003;</span> <span data-i18n="dciiFeature4">IISS™ resilience scoring</span></li>',
  'dciiFeature4'
);
rep(
  '<a href="dcii.html" class="pillar-link">Learn the framework &rarr;</a>',
  '<a href="dcii.html" class="pillar-link" data-i18n="dciiLearnFramework">Learn the framework →</a>',
  'dciiLearnFramework'
);
rep(
  '<p class="pillar-note">Foundation tier: Custom pricing &middot; <a href="pilot.html" class="link-gold">Start with a pilot &rarr;</a></p>',
  '<p class="pillar-note"><span data-i18n="pillarNote">Foundation tier: Custom pricing ·</span> <a href="pilot.html" class="link-gold" data-i18n="pillarNoteLink">Start with a pilot →</a></p>',
  'pillarNote'
);

// ── REGULATOR'S RECEIPT SHOWCASE ─────────────────────────────────────────────
rep(
  '<p style="font-size:.65rem; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--color-gold); margin-bottom:10px;">DCII &mdash; Evidence Infrastructure</p>',
  '<p style="font-size:.65rem; font-weight:600; letter-spacing:.14em; text-transform:uppercase; color:var(--color-gold); margin-bottom:10px;" data-i18n="rrLabel">DCII — Evidence Infrastructure</p>',
  'rrLabel'
);
rep(
  '<h2 style="font-size:1.6rem; font-weight:700; margin-bottom:12px; letter-spacing:-.02em;">Regulator&rsquo;s Receipt&trade;</h2>',
  '<h2 style="font-size:1.6rem; font-weight:700; margin-bottom:12px; letter-spacing:-.02em;" data-i18n="rrTitle">Regulator\'s Receipt™</h2>',
  'rrTitle'
);
rep(
  '<p style="font-size:.9rem; color:var(--color-text-muted); line-height:1.7; margin-bottom:20px; max-width:440px;">Every council deliberation generates three cryptographically signed PDFs automatically. SHA-256 hashed, Merkle tree verified, RFC&nbsp;3161 timestamped. Independently verifiable without Datacendia.</p>',
  '<p style="font-size:.9rem; color:var(--color-text-muted); line-height:1.7; margin-bottom:20px; max-width:440px;" data-i18n="rrDesc">Every council deliberation generates three cryptographically signed PDFs automatically. SHA-256 hashed, Merkle tree verified, RFC 3161 timestamped. Independently verifiable without Datacendia.</p>',
  'rrDesc'
);
rep(
  '<span style="font-size:.7rem; background:rgba(239,68,68,.1); color:#f87171; border-radius:4px; padding:3px 9px; font-weight:600;">Court-Admissible Record</span>',
  '<span style="font-size:.7rem; background:rgba(239,68,68,.1); color:#f87171; border-radius:4px; padding:3px 9px; font-weight:600;" data-i18n="rrBadge1">Court-Admissible Record</span>',
  'rrBadge1'
);
rep(
  '<span style="font-size:.7rem; background:rgba(59,130,246,.1); color:#60a5fa; border-radius:4px; padding:3px 9px; font-weight:600;">Evidence Package</span>',
  '<span style="font-size:.7rem; background:rgba(59,130,246,.1); color:#60a5fa; border-radius:4px; padding:3px 9px; font-weight:600;" data-i18n="rrBadge2">Evidence Package</span>',
  'rrBadge2'
);
rep(
  '<span style="font-size:.7rem; background:rgba(201,168,76,.1); color:var(--color-gold); border-radius:4px; padding:3px 9px; font-weight:600;">Executive Summary</span>',
  '<span style="font-size:.7rem; background:rgba(201,168,76,.1); color:var(--color-gold); border-radius:4px; padding:3px 9px; font-weight:600;" data-i18n="rrBadge3">Executive Summary</span>',
  'rrBadge3'
);
rep(
  'SHA-256 hash + Merkle root across deliberation, citations, responses, dissents</li>',
  '<span data-i18n="rrFeature1">SHA-256 hash + Merkle root across deliberation, citations, responses, dissents</span></li>',
  'rrFeature1'
);
rep(
  'Ed25519 digital signature &mdash; verifiable with standard openssl, no vendor needed</li>',
  '<span data-i18n="rrFeature2">Ed25519 digital signature — verifiable with standard openssl, no vendor needed</span></li>',
  'rrFeature2'
);
rep(
  'Compliance gates: [PASS]/[FAIL] per framework (SOC2, GDPR, EU AI Act, ISO 27001)</li>',
  '<span data-i18n="rrFeature3">Compliance gates: [PASS]/[FAIL] per framework (SOC2, GDPR, EU AI Act, ISO 27001)</span></li>',
  'rrFeature3'
);
rep(
  'Named dissenting agents, human approver record, full council participant table</li>',
  '<span data-i18n="rrFeature4">Named dissenting agents, human approver record, full council participant table</span></li>',
  'rrFeature4'
);
rep(
  '<a href="regulators-receipt.html" style="display:inline-block; background:var(--color-gold); color:#000; font-weight:600; font-size:.82rem; letter-spacing:.06em; padding:10px 22px; border-radius:6px; text-decoration:none;">See Full Showcase &rarr;</a>',
  '<a href="regulators-receipt.html" style="display:inline-block; background:var(--color-gold); color:#000; font-weight:600; font-size:.82rem; letter-spacing:.06em; padding:10px 22px; border-radius:6px; text-decoration:none;" data-i18n="rrCta">See Full Showcase →</a>',
  'rrCta'
);

fs.writeFileSync(FILE, html, 'utf8');
console.log('Part 2 done — ' + count + ' replacements applied.');
console.log('data-i18n count now: ' + (html.match(/data-i18n/g) || []).length);
