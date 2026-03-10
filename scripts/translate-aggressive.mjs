/**
 * translate-aggressive.mjs — Force-translate ALL remaining English keys
 * Only skips pure single-word brand names (CendiaX™), version strings, prices, paths
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, '..', 'translations');

const LANGS = ['es','fr','de','pt','it','ja','ko','zh','ar','hi'];
const GT = { es:'es', fr:'fr', de:'de', pt:'pt', it:'it', ja:'ja', ko:'ko', zh:'zh-CN', ar:'ar', hi:'hi' };
const CONCURRENCY = 8;
const DELAY = 250;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function shouldSkip(value) {
  if (!value || value.trim().length < 2) return true;
  if (/^v\d+\.\d+/.test(value)) return true;
  if (/^\$[\d,]+$/.test(value)) return true;
  if (/^\/[a-z\-\/]/.test(value) && !value.includes(' ')) return true;
  if (/^[\d\s$%.,+→·—\-:;#@&()|<>\/\\*]+$/.test(value)) return true;
  // Only skip EXACT single brand-name matches (no spaces = no English words mixed in)
  if (/^(Cendia|Datacendia)[A-Z]\w*™?$/.test(value.trim())) return true;
  if (/^(DCII|IISS|SGAS|RBAC|RLHF|C2PA|OWASP|NIST|GDPR)™?$/.test(value.trim())) return true;
  // Language names
  if (['English','Español','Français','Deutsch','Português','Italiano','العربية','हिन्दी','日本語','한국어','中文'].includes(value.trim())) return true;
  return false;
}

async function translateOne(text, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const resp = await fetch(url);
      if (resp.status === 429) { await sleep(5000 + attempt * 5000); continue; }
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      if (data && data[0]) return data[0].map(s => s[0]).join('');
      return null;
    } catch (e) {
      if (attempt < 2) { await sleep(2000 * (attempt + 1)); continue; }
      return null;
    }
  }
  return null;
}

async function processLanguage(lang) {
  const gtCode = GT[lang];
  const en = JSON.parse(fs.readFileSync(path.join(TRANS_DIR, 'en.json'), 'utf8'));
  const existing = JSON.parse(fs.readFileSync(path.join(TRANS_DIR, `${lang}.json`), 'utf8'));

  const toTranslate = [];
  for (const [key, value] of Object.entries(en)) {
    if (shouldSkip(value)) continue;
    if (existing[key] && existing[key] !== value) continue;
    toTranslate.push({ key, value });
  }

  console.log(`\n[${lang.toUpperCase()}] ${toTranslate.length} keys remaining`);
  if (toTranslate.length === 0) return;

  let done = 0, ok = 0;
  for (let i = 0; i < toTranslate.length; i += CONCURRENCY) {
    const batch = toTranslate.slice(i, i + CONCURRENCY);
    const results = await Promise.all(batch.map(async ({ key, value }) => {
      const result = await translateOne(value, gtCode);
      return { key, value, result };
    }));
    for (const { key, value, result } of results) {
      done++;
      if (result && result !== value) { existing[key] = result; ok++; }
    }
    process.stdout.write(`  [${lang.toUpperCase()}] ${done}/${toTranslate.length} (${ok} ok)\r`);
    await sleep(DELAY);
  }

  fs.writeFileSync(path.join(TRANS_DIR, `${lang}.json`), JSON.stringify(existing, null, 2), 'utf8');
  const jsLines = [`const translations_${lang} = {`];
  for (const [key, value] of Object.entries(existing)) {
    const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    jsLines.push(`  "${key}": "${escaped}",`);
  }
  jsLines.push('};');
  jsLines.push(`if (typeof window !== 'undefined') window.translations_${lang} = translations_${lang};`);
  fs.writeFileSync(path.join(TRANS_DIR, `${lang}.js`), jsLines.join('\n'), 'utf8');
  console.log(`\n  [${lang.toUpperCase()}] Done: ${ok} new translations`);
}

async function main() {
  console.log('=== Aggressive Translation Pass ===');
  for (const lang of LANGS) {
    try { await processLanguage(lang); } catch (e) { console.error(`[${lang}] ERROR: ${e.message}`); }
  }
  console.log('\nDone!');
}
main().catch(e => { console.error('Fatal:', e); process.exit(1); });
