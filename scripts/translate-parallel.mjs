/**
 * translate-parallel.mjs — Reliable parallel translator
 * 
 * Translates each key individually with 8 concurrent requests.
 * ~3,200 keys per language in ~3-4 minutes each.
 *
 * Run: node scripts/translate-parallel.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, '..', 'translations');

const LANGS = ['es','fr','de','pt','it','ja','ko','zh','ar','hi'];
const GT = { es:'es', fr:'fr', de:'de', pt:'pt', it:'it', ja:'ja', ko:'ko', zh:'zh-CN', ar:'ar', hi:'hi' };

const CONCURRENCY = 8;
const DELAY = 200;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Skip keys that should stay English
function shouldSkip(key, value) {
  if (!value || value.length < 2) return true;
  // Brand names, technical terms
  if (/^(Cendia|Datacendia|DCII|IISS|SGAS)/.test(value)) return true;
  // Prices
  if (/^\$[\d,]+/.test(value)) return true;
  // API paths
  if (value.startsWith('/')) return true;
  // Pure numbers/symbols
  if (/^[\d\s$%.,+→·—\-:;#@&()|<>\/]+$/.test(value)) return true;
  // Language names that match the value exactly
  if (['Español','Français','Deutsch','Português','Italiano','العربية','हिन्दी','日本語','한국어','中文','English','JSON','PDF','CSV','HTML','XML','REST','API','SDK','CLI','URL','KMS','HSM','TPM','VPC','RBAC','RLHF','SHA-256','Ed25519','LinkedIn','GitHub'].includes(value.trim())) return true;
  return false;
}

async function translateOne(text, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const resp = await fetch(url);
      if (resp.status === 429) {
        await sleep(5000 + attempt * 5000);
        continue;
      }
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      if (data && data[0]) {
        return data[0].map(s => s[0]).join('');
      }
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
  
  // Find keys that need translation
  const toTranslate = [];
  for (const [key, value] of Object.entries(en)) {
    if (shouldSkip(key, value)) continue;
    if (existing[key] && existing[key] !== value) continue; // already translated
    toTranslate.push({ key, value });
  }
  
  console.log(`\n[${lang.toUpperCase()}] ${toTranslate.length} keys to translate`);
  if (toTranslate.length === 0) return;
  
  let done = 0, translated = 0, failed = 0;
  
  // Process in parallel batches
  for (let i = 0; i < toTranslate.length; i += CONCURRENCY) {
    const batch = toTranslate.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      batch.map(async ({ key, value }) => {
        const result = await translateOne(value, gtCode);
        return { key, value, result };
      })
    );
    
    for (const { key, value, result } of results) {
      done++;
      if (result && result !== value) {
        existing[key] = result;
        translated++;
      } else {
        failed++;
      }
    }
    
    process.stdout.write(`  [${lang.toUpperCase()}] ${done}/${toTranslate.length} (${translated} ok, ${failed} skip)\r`);
    await sleep(DELAY);
  }
  
  // Save JSON
  fs.writeFileSync(path.join(TRANS_DIR, `${lang}.json`), JSON.stringify(existing, null, 2), 'utf8');
  
  // Save JS  
  const jsLines = [`const translations_${lang} = {`];
  for (const [key, value] of Object.entries(existing)) {
    const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    jsLines.push(`  "${key}": "${escaped}",`);
  }
  jsLines.push('};');
  jsLines.push(`if (typeof window !== 'undefined') window.translations_${lang} = translations_${lang};`);
  fs.writeFileSync(path.join(TRANS_DIR, `${lang}.js`), jsLines.join('\n'), 'utf8');
  
  console.log(`\n  [${lang.toUpperCase()}] ✓ ${translated} translated, ${failed} unchanged`);
}

async function main() {
  console.log('=== Parallel Translation (individual keys) ===');
  
  for (const lang of LANGS) {
    try {
      await processLanguage(lang);
    } catch (e) {
      console.error(`[${lang}] ERROR: ${e.message}`);
    }
  }
  
  console.log('\n✅ Done!');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
