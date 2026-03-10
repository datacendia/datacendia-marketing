/**
 * batch-translate.mjs — Fast batch translator
 * 
 * Concatenates many texts with a separator, translates in one API call,
 * then splits back. ~80 requests per language instead of ~4000.
 *
 * Run: node scripts/batch-translate.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, '..', 'translations');

const LANGS = ['es','fr','de','pt','it','ja','ko','zh','ar','hi'];
const GTRANS_CODES = { es:'es', fr:'fr', de:'de', pt:'pt', it:'it', ja:'ja', ko:'ko', zh:'zh-CN', ar:'ar', hi:'hi' };

const SEP = '\n⟦⟧\n';
const BATCH_CHARS = 4000; // chars per API request
const DELAY = 500;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function translateBlock(text, targetLang) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}&de=stuart@datacendia.com`;
  
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    if (data.responseStatus === 200 && data.responseData) {
      return data.responseData.translatedText;
    }
    // Fallback: check matches
    if (data.matches && data.matches.length > 0) {
      return data.matches[0].translation;
    }
    return text;
  } catch (e) {
    console.error(`    API error: ${e.message}`);
    return text;
  }
}

async function translateTexts(texts, targetLang) {
  // Group texts into batches by character count
  const batches = [];
  let currentBatch = [];
  let currentLen = 0;
  
  for (const text of texts) {
    const addLen = text.length + SEP.length;
    if (currentLen + addLen > BATCH_CHARS && currentBatch.length > 0) {
      batches.push([...currentBatch]);
      currentBatch = [text];
      currentLen = text.length;
    } else {
      currentBatch.push(text);
      currentLen += addLen;
    }
  }
  if (currentBatch.length > 0) batches.push(currentBatch);

  console.log(`    ${batches.length} batches for ${texts.length} texts`);
  
  const allResults = [];
  let completed = 0;
  
  for (const batch of batches) {
    const joined = batch.join(SEP);
    const translated = await translateBlock(joined, targetLang);
    const parts = translated.split(/⟦⟧/);
    
    // Map results back
    for (let i = 0; i < batch.length; i++) {
      if (i < parts.length && parts[i].trim()) {
        allResults.push(parts[i].trim());
      } else {
        allResults.push(batch[i]); // fallback to English
      }
    }
    
    completed += batch.length;
    if (completed % 500 < BATCH_CHARS / 50) {
      process.stdout.write(`    ${completed}/${texts.length} done\r`);
    }
    
    await sleep(DELAY);
  }
  
  return allResults;
}

async function processLanguage(lang) {
  const langCode = GTRANS_CODES[lang];
  const en = JSON.parse(fs.readFileSync(path.join(TRANS_DIR, 'en.json'), 'utf8'));
  const existing = JSON.parse(fs.readFileSync(path.join(TRANS_DIR, `${lang}.json`), 'utf8'));
  
  // Find untranslated keys
  const untranslatedKeys = [];
  const untranslatedTexts = [];
  
  for (const [key, value] of Object.entries(en)) {
    if (!existing[key] || existing[key] === value) {
      untranslatedKeys.push(key);
      untranslatedTexts.push(value);
    }
  }
  
  console.log(`\n[${lang.toUpperCase()}] ${untranslatedTexts.length} keys to translate`);
  if (untranslatedTexts.length === 0) return;
  
  const translated = await translateTexts(untranslatedTexts, langCode);
  
  let updated = 0;
  for (let i = 0; i < untranslatedKeys.length; i++) {
    if (translated[i] && translated[i] !== untranslatedTexts[i]) {
      existing[untranslatedKeys[i]] = translated[i];
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
  
  console.log(`\n  [${lang.toUpperCase()}] ✓ ${updated} keys translated, ${untranslatedTexts.length - updated} fell back to English`);
}

async function main() {
  console.log('=== Batch Translation ===');
  console.log(`Target languages: ${LANGS.join(', ')}`);
  
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
