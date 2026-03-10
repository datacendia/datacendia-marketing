/**
 * gtranslate.mjs — Fast bulk translator using Google Translate free endpoint
 * 
 * Translates large text blocks (up to 5000 chars) per request.
 * ~3,933 keys per language in ~100-150 requests.
 *
 * Run: node scripts/gtranslate.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, '..', 'translations');

const LANGS = ['es','fr','de','pt','it','ja','ko','zh','ar','hi'];
const GT_CODES = { es:'es', fr:'fr', de:'de', pt:'pt', it:'it', ja:'ja', ko:'ko', zh:'zh-CN', ar:'ar', hi:'hi' };

const SEP = '\n§§§\n';
const MAX_CHARS = 4500;
const DELAY = 800;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function googleTranslate(text, from, to) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const resp = await fetch(url);
      if (resp.status === 429) {
        console.log('      Rate limited, waiting 10s...');
        await sleep(10000);
        continue;
      }
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      
      const data = await resp.json();
      // Response format: [[["translated","original","",""],...]...]
      if (data && data[0]) {
        return data[0].map(s => s[0]).join('');
      }
      return text;
    } catch (e) {
      if (attempt < 2) {
        await sleep(3000 * (attempt + 1));
        continue;
      }
      console.error(`      Translation error: ${e.message.slice(0, 60)}`);
      return text;
    }
  }
  return text;
}

async function processLanguage(lang) {
  const gtCode = GT_CODES[lang];
  const en = JSON.parse(fs.readFileSync(path.join(TRANS_DIR, 'en.json'), 'utf8'));
  const existing = JSON.parse(fs.readFileSync(path.join(TRANS_DIR, `${lang}.json`), 'utf8'));
  
  // Find untranslated keys (value same as English)
  const keys = [];
  const texts = [];
  for (const [key, value] of Object.entries(en)) {
    if (!existing[key] || existing[key] === value) {
      keys.push(key);
      texts.push(value);
    }
  }
  
  console.log(`\n[${lang.toUpperCase()}] ${texts.length} keys to translate`);
  if (texts.length === 0) return;
  
  // Build batches by char count
  const batches = [];
  let batch = [];
  let batchLen = 0;
  
  for (let i = 0; i < texts.length; i++) {
    const textLen = texts[i].length + SEP.length;
    if (batchLen + textLen > MAX_CHARS && batch.length > 0) {
      batches.push({ indices: batch.map(b => b.idx), texts: batch.map(b => b.text) });
      batch = [];
      batchLen = 0;
    }
    batch.push({ idx: i, text: texts[i] });
    batchLen += textLen;
  }
  if (batch.length > 0) {
    batches.push({ indices: batch.map(b => b.idx), texts: batch.map(b => b.text) });
  }
  
  console.log(`    ${batches.length} batches`);
  
  const translated = new Array(texts.length);
  let done = 0;
  
  for (let b = 0; b < batches.length; b++) {
    const { indices, texts: batchTexts } = batches[b];
    const joined = batchTexts.join(SEP);
    
    const result = await googleTranslate(joined, 'en', gtCode);
    const parts = result.split('§§§');
    
    for (let j = 0; j < indices.length; j++) {
      const idx = indices[j];
      if (j < parts.length && parts[j].trim()) {
        translated[idx] = parts[j].trim();
      } else {
        translated[idx] = texts[idx]; // fallback
      }
    }
    
    done += indices.length;
    process.stdout.write(`    [${lang.toUpperCase()}] ${done}/${texts.length} (batch ${b+1}/${batches.length})\r`);
    
    await sleep(DELAY);
  }
  
  // Apply translations
  let updated = 0;
  for (let i = 0; i < keys.length; i++) {
    if (translated[i] && translated[i] !== texts[i]) {
      existing[keys[i]] = translated[i];
      updated++;
    }
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
  
  console.log(`\n    [${lang.toUpperCase()}] ✓ ${updated} translated, ${keys.length - updated} fallback`);
}

async function main() {
  console.log('=== Google Translate Bulk Translation ===');
  console.log(`Languages: ${LANGS.join(', ')}\n`);
  
  for (const lang of LANGS) {
    try {
      await processLanguage(lang);
    } catch (e) {
      console.error(`[${lang}] ERROR: ${e.message}`);
    }
  }
  
  console.log('\n✅ All translations complete!');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
