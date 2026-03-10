/**
 * translate-all.mjs — Batch-translate all English placeholder keys
 * into real translations for all 10 non-English languages.
 *
 * Uses @vitalets/google-translate-api (free, no API key needed).
 * Run: node scripts/translate-all.mjs
 */
import { translate } from '@vitalets/google-translate-api';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TRANS_DIR = path.resolve(__dirname, '..', 'translations');

const LANGS = ['es','fr','de','pt','it','ja','ko','zh','ar','hi'];
const LANG_CODES = { es:'es', fr:'fr', de:'de', pt:'pt', it:'it', ja:'ja', ko:'ko', zh:'zh-CN', ar:'ar', hi:'hi' };

const BATCH_SIZE = 10;
const DELAY_MS = 300;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Strip HTML tags for translation, restore after
function stripHtml(text) {
  const tags = [];
  let i = 0;
  const stripped = text.replace(/<[^>]+>/g, (match) => {
    const placeholder = `__HTML${i}__`;
    tags.push({ placeholder, tag: match });
    i++;
    return placeholder;
  });
  return { stripped, tags };
}

function restoreHtml(text, tags) {
  let result = text;
  for (const { placeholder, tag } of tags) {
    result = result.replace(placeholder, tag);
  }
  return result;
}

async function translateText(text, targetLang) {
  if (!text || text.length < 2) return text;
  
  const { stripped, tags } = stripHtml(text);
  
  try {
    const result = await translate(stripped, { to: targetLang });
    return tags.length > 0 ? restoreHtml(result.text, tags) : result.text;
  } catch (e) {
    if (e.message && e.message.includes('Too Many Requests')) {
      await sleep(5000);
      try {
        const result = await translate(stripped, { to: targetLang });
        return tags.length > 0 ? restoreHtml(result.text, tags) : result.text;
      } catch(e2) {
        return text; // fallback to English
      }
    }
    return text; // fallback to English
  }
}

async function translateBatch(texts, targetLang) {
  // Join short texts with a separator for batch translation
  const results = [];
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(t => translateText(t, targetLang))
    );
    results.push(...batchResults);
    if (i + BATCH_SIZE < texts.length) {
      await sleep(DELAY_MS);
    }
  }
  return results;
}

async function processLanguage(lang) {
  const langCode = LANG_CODES[lang];
  const enPath = path.join(TRANS_DIR, 'en.json');
  const langJsonPath = path.join(TRANS_DIR, `${lang}.json`);
  const langJsPath = path.join(TRANS_DIR, `${lang}.js`);
  
  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const existing = JSON.parse(fs.readFileSync(langJsonPath, 'utf8'));
  
  // Find untranslated keys (value same as English)
  const untranslated = [];
  const untranslatedKeys = [];
  for (const [key, value] of Object.entries(en)) {
    if (existing[key] === value || !existing[key]) {
      untranslated.push(value);
      untranslatedKeys.push(key);
    }
  }
  
  console.log(`\n[${lang}] ${untranslated.length} keys need translation...`);
  if (untranslated.length === 0) return;
  
  // Translate in batches
  const translated = await translateBatch(untranslated, langCode);
  
  // Merge translations
  let updated = 0;
  for (let i = 0; i < untranslatedKeys.length; i++) {
    if (translated[i] && translated[i] !== untranslated[i]) {
      existing[untranslatedKeys[i]] = translated[i];
      updated++;
    }
  }
  
  // Write updated JSON
  fs.writeFileSync(langJsonPath, JSON.stringify(existing, null, 2), 'utf8');
  
  // Also update the JS file
  const jsLines = [`const translations_${lang} = {`];
  for (const [key, value] of Object.entries(existing)) {
    const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    jsLines.push(`  "${key}": "${escaped}",`);
  }
  jsLines.push('};');
  jsLines.push(`if (typeof window !== 'undefined') window.translations_${lang} = translations_${lang};`);
  fs.writeFileSync(langJsPath, jsLines.join('\n'), 'utf8');
  
  console.log(`[${lang}] ✓ ${updated}/${untranslated.length} keys translated, saved.`);
}

async function main() {
  console.log('Starting batch translation of all languages...');
  console.log(`Languages: ${LANGS.join(', ')}`);
  
  for (const lang of LANGS) {
    try {
      await processLanguage(lang);
    } catch (e) {
      console.error(`[${lang}] FAILED:`, e.message);
    }
  }
  
  console.log('\n✅ All translations complete!');
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
