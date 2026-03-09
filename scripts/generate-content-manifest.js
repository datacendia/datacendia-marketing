/**
 * generate-content-manifest.js
 * Scans all pages and locale variants, produces a JSON manifest
 * that tracks page inventory, locale coverage, and size drift.
 *
 * Run: node scripts/generate-content-manifest.js
 * Output: docs/content-manifest.json
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES = ['ar', 'de', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'pt', 'zh'];
const OUTPUT = path.join(ROOT, 'docs', 'content-manifest.json');

// ── Helpers ──────────────────────────────────────────────────────────────────

function fileSize(fp) {
  try { return fs.statSync(fp).size; } catch { return null; }
}

function extractTitle(fp) {
  try {
    const html = fs.readFileSync(fp, 'utf8').slice(0, 2000);
    const m = html.match(/<title[^>]*>(.*?)<\/title>/i);
    return m ? m[1].trim() : null;
  } catch { return null; }
}

function isRedirectStub(fp) {
  try {
    const html = fs.readFileSync(fp, 'utf8').slice(0, 1500);
    return html.includes('http-equiv="refresh"');
  } catch { return false; }
}

// ── Scan top-level HTML pages ────────────────────────────────────────────────

function scanTopLevelPages() {
  const pages = [];
  const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
  for (const file of files) {
    const fp = path.join(ROOT, file);
    const locales = {};

    for (const loc of LOCALES) {
      const locFile = path.join(ROOT, loc, file);
      if (fs.existsSync(locFile)) {
        locales[loc] = {
          size: fileSize(locFile),
          isRedirect: isRedirectStub(locFile),
        };
      }
    }

    pages.push({
      page: file,
      path: '/' + file,
      size: fileSize(fp),
      title: extractTitle(fp),
      localeCount: Object.keys(locales).length,
      missingLocales: LOCALES.filter(l => !locales[l]),
      locales,
    });
  }
  return pages;
}

// ── Scan resource pages (topic.locale.html pattern) ──────────────────────────

function scanResourcePages() {
  const resourceDir = path.join(ROOT, 'resources');
  if (!fs.existsSync(resourceDir)) return [];

  const files = fs.readdirSync(resourceDir).filter(f => f.endsWith('.html'));
  const topics = {};

  for (const file of files) {
    // Detect locale suffix: topic.xx.html vs topic.html
    let topic, locale;
    const locMatch = file.match(/^(.+)\.([a-z]{2})\.html$/);
    if (locMatch) {
      topic = locMatch[1];
      locale = locMatch[2];
    } else {
      topic = file.replace('.html', '');
      locale = 'en';
    }

    if (!topics[topic]) topics[topic] = { locales: {} };
    topics[topic].locales[locale] = {
      file,
      size: fileSize(path.join(resourceDir, file)),
    };
  }

  return Object.entries(topics).map(([topic, data]) => {
    const presentLocales = Object.keys(data.locales);
    const allExpected = ['en', ...LOCALES];
    return {
      topic,
      path: '/resources/' + topic + '.html',
      localeCount: presentLocales.length,
      missingLocales: allExpected.filter(l => !data.locales[l]),
      locales: data.locales,
    };
  });
}

// ── Scan learn articles ──────────────────────────────────────────────────────

function scanLearnArticles() {
  const learnDir = path.join(ROOT, 'learn');
  if (!fs.existsSync(learnDir)) return [];

  const articles = [];
  const entries = fs.readdirSync(learnDir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const articleDir = path.join(learnDir, entry.name);
    const indexFile = path.join(articleDir, 'index.html');

    const locales = {};
    const subFiles = fs.readdirSync(articleDir).filter(f => f.endsWith('.html'));
    for (const f of subFiles) {
      if (f === 'index.html') {
        locales['en'] = { file: f, size: fileSize(path.join(articleDir, f)) };
      } else {
        const m = f.match(/^index\.([a-z]{2})\.html$/);
        if (m) {
          locales[m[1]] = { file: f, size: fileSize(path.join(articleDir, f)) };
        }
      }
    }

    articles.push({
      slug: entry.name,
      path: '/learn/' + entry.name + '/',
      title: fs.existsSync(indexFile) ? extractTitle(indexFile) : null,
      localeCount: Object.keys(locales).length,
      missingLocales: ['en', ...LOCALES].filter(l => !locales[l]),
      locales,
    });
  }
  return articles;
}

// ── Detect size drift ────────────────────────────────────────────────────────

function detectDrift(manifest) {
  const warnings = [];

  for (const page of manifest.topLevelPages) {
    if (page.missingLocales.length > 0 && page.missingLocales.length < LOCALES.length) {
      warnings.push({
        type: 'missing_locale',
        page: page.path,
        missing: page.missingLocales,
      });
    }
  }

  for (const res of manifest.resourcePages) {
    if (res.missingLocales.length > 0) {
      warnings.push({
        type: 'missing_locale',
        page: res.path,
        missing: res.missingLocales,
      });
    }
    // Flag large size variance (>3x difference from English)
    const enSize = res.locales.en?.size;
    if (enSize) {
      for (const [loc, data] of Object.entries(res.locales)) {
        if (loc === 'en') continue;
        const ratio = data.size / enSize;
        if (ratio < 0.3 || ratio > 3.0) {
          warnings.push({
            type: 'size_drift',
            page: res.path,
            locale: loc,
            enSize,
            localeSize: data.size,
            ratio: Math.round(ratio * 100) / 100,
          });
        }
      }
    }
  }

  for (const article of manifest.learnArticles) {
    if (article.missingLocales.length > 0) {
      warnings.push({
        type: 'missing_locale',
        page: article.path,
        missing: article.missingLocales,
      });
    }
  }

  return warnings;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const manifest = {
  generated: new Date().toISOString(),
  locales: ['en', ...LOCALES],
  topLevelPages: scanTopLevelPages(),
  resourcePages: scanResourcePages(),
  learnArticles: scanLearnArticles(),
  warnings: [],
};

manifest.warnings = detectDrift(manifest);

// Summary
const summary = {
  topLevelPages: manifest.topLevelPages.length,
  resourceTopics: manifest.resourcePages.length,
  learnArticles: manifest.learnArticles.length,
  totalWarnings: manifest.warnings.length,
  missingLocaleWarnings: manifest.warnings.filter(w => w.type === 'missing_locale').length,
  sizeDriftWarnings: manifest.warnings.filter(w => w.type === 'size_drift').length,
};
manifest.summary = summary;

fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2), 'utf8');
console.log('Content manifest written to: docs/content-manifest.json');
console.log(`  Top-level pages: ${summary.topLevelPages}`);
console.log(`  Resource topics: ${summary.resourceTopics}`);
console.log(`  Learn articles:  ${summary.learnArticles}`);
console.log(`  Warnings:        ${summary.totalWarnings} (${summary.missingLocaleWarnings} missing locale, ${summary.sizeDriftWarnings} size drift)`);

if (manifest.warnings.length > 0) {
  console.log('\n=== WARNINGS ===');
  for (const w of manifest.warnings.slice(0, 20)) {
    if (w.type === 'missing_locale') {
      console.log(`  MISSING: ${w.page} → ${w.missing.join(', ')}`);
    } else if (w.type === 'size_drift') {
      console.log(`  DRIFT: ${w.page} [${w.locale}] ${w.localeSize}B vs en ${w.enSize}B (${w.ratio}x)`);
    }
  }
  if (manifest.warnings.length > 20) {
    console.log(`  ... and ${manifest.warnings.length - 20} more.`);
  }
}
