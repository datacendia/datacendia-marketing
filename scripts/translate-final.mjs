/**
 * translate-final.mjs — Final translation pass
 * 
 * Translates EVERYTHING that has the same value as English,
 * with very minimal skip list (only pure brand names with no English words).
 *
 * Run: node scripts/translate-final.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, '..', 'translations');
const ROOT = path.resolve(__dirname, '..');

const LANGS = ['es','fr','de','pt','it','ja','ko','zh','ar','hi'];
const GT = { es:'es', fr:'fr', de:'de', pt:'pt', it:'it', ja:'ja', ko:'ko', zh:'zh-CN', ar:'ar', hi:'hi' };

const CONCURRENCY = 8;
const DELAY = 200;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Only skip things that are truly untranslatable
function shouldSkip(key, value) {
  if (!value || value.trim().length < 2) return true;
  // Pure version strings
  if (/^v\d+\.\d+/.test(value)) return true;
  // Pure prices
  if (/^\$[\d,]+$/.test(value)) return true;
  // Pure paths/URLs
  if (/^\/[a-z\-\/]/.test(value) && !value.includes(' ')) return true;
  // Pure numbers/symbols only
  if (/^[\d\s$%.,+→·—\-:;#@&()|<>\/\\]+$/.test(value)) return true;
  // Exact brand-only names (no English words mixed in)
  const brandOnly = ['CendiaOmniTranslate™','CendiaDissent™','CendiaVeto™','CendiaGuard™',
    'CendiaHelm™','CendiaPredict™','CendiaFlow™','CendiaHealth™','CendiaDataDiode™',
    'CendiaLocalRLHF™','CendiaFederatedMesh™','CendiaQuantumKMS™','CendiaCourt™',
    'CendiaTimeLock™','CendiaDCII™','CendiaVault™','CendiaNotary™','CendiaRecall™',
    'CendiaChronos™','CendiaCascade™','CendiaApotheosis™','DCII™','IISS™','SGAS™',
    'JSON','PDF','CSV','HTML','XML','REST','API','SDK','CLI','URL','KMS','HSM','TPM',
    'C2PA','CCPA/CPRA','HIPAA','FedRAMP','NIST 800-53','ISO 27001','Ed25519','SHA-256',
    'LinkedIn','GitHub','AWS','Azure','GCP','RBAC','RLHF','EO 14028','GDPR'];
  if (brandOnly.includes(value.trim())) return true;
  // Language names  
  if (['English','Español','Français','Deutsch','Português','Italiano','العربية','हिन्दी','日本語','한국어','中文'].includes(value.trim())) return true;
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

// First, collect all keys from ALL HTML pages
function collectAllKeys() {
  const allKeys = new Set();
  const htmlFiles = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
  
  for (const file of htmlFiles) {
    const content = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const re = /data-i18n="([^"]+)"/g;
    let m;
    while ((m = re.exec(content)) !== null) {
      allKeys.add(m[1]);
    }
  }
  return allKeys;
}

async function processLanguage(lang) {
  const gtCode = GT[lang];
  const en = JSON.parse(fs.readFileSync(path.join(TRANS_DIR, 'en.json'), 'utf8'));
  const existing = JSON.parse(fs.readFileSync(path.join(TRANS_DIR, `${lang}.json`), 'utf8'));
  
  // Find ALL keys that still match English
  const toTranslate = [];
  for (const [key, value] of Object.entries(en)) {
    if (shouldSkip(key, value)) continue;
    if (existing[key] && existing[key] !== value) continue; // already translated
    toTranslate.push({ key, value });
  }
  
  console.log(`\n[${lang.toUpperCase()}] ${toTranslate.length} keys to translate`);
  if (toTranslate.length === 0) return;
  
  let done = 0, translated = 0, failed = 0;
  
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
    
    process.stdout.write(`  [${lang.toUpperCase()}] ${done}/${toTranslate.length} (${translated} ok)\r`);
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
  
  console.log(`\n  [${lang.toUpperCase()}] Done: ${translated} translated, ${failed} unchanged`);
}

async function main() {
  console.log('=== Final Translation Pass ===\n');
  
  // Step 1: Find missing keys and add to en.json
  const allHtmlKeys = collectAllKeys();
  const en = JSON.parse(fs.readFileSync(path.join(TRANS_DIR, 'en.json'), 'utf8'));
  let added = 0;
  for (const key of allHtmlKeys) {
    if (!en[key]) {
      en[key] = key; // placeholder
      added++;
    }
  }
  if (added > 0) {
    fs.writeFileSync(path.join(TRANS_DIR, 'en.json'), JSON.stringify(en, null, 2), 'utf8');
    console.log(`Added ${added} missing keys to en.json`);
    // Also add to all language files
    for (const lang of LANGS) {
      const langJson = JSON.parse(fs.readFileSync(path.join(TRANS_DIR, `${lang}.json`), 'utf8'));
      for (const key of allHtmlKeys) {
        if (!langJson[key]) langJson[key] = en[key];
      }
      fs.writeFileSync(path.join(TRANS_DIR, `${lang}.json`), JSON.stringify(langJson, null, 2), 'utf8');
    }
  }
  
  // Step 2: Translate all languages
  for (const lang of LANGS) {
    try {
      await processLanguage(lang);
    } catch (e) {
      console.error(`[${lang}] ERROR: ${e.message}`);
    }
  }
  
  console.log('\n✅ Final translation complete!');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
