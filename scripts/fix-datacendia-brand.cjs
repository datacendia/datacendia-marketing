/**
 * fix-datacendia-brand.cjs — Restore DATACENDIA brand name in all translations
 * 
 * Finds any key where the English value contains "DATACENDIA" or "Datacendia"
 * and ensures the translated value preserves the exact brand name.
 */
const fs = require('fs');
const path = require('path');

const TRANS_DIR = path.resolve(__dirname, '..', 'translations');
const LANGS = ['es','fr','de','pt','it','ja','ko','zh','ar','hi'];

const en = JSON.parse(fs.readFileSync(path.join(TRANS_DIR, 'en.json'), 'utf8'));

for (const lang of LANGS) {
  const jsonPath = path.join(TRANS_DIR, `${lang}.json`);
  const t = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  let fixed = 0;

  for (const [key, enValue] of Object.entries(en)) {
    if (!t[key]) continue;
    const transValue = t[key];
    
    // If English has DATACENDIA but translation mangled it
    if (enValue.includes('DATACENDIA') || enValue.includes('Datacendia') || enValue.includes('datacendia')) {
      let corrected = transValue;
      
      // Fix common mistranslations of the brand
      corrected = corrected.replace(/DATACENTENDIA/gi, 'DATACENDIA');
      corrected = corrected.replace(/DATACENDA/gi, 'DATACENDIA');
      corrected = corrected.replace(/DATACENTIA/gi, 'DATACENDIA');
      corrected = corrected.replace(/DATACENTDIA/gi, 'DATACENDIA');
      corrected = corrected.replace(/データセンディア/g, 'Datacendia');
      corrected = corrected.replace(/데이터센디아/g, 'Datacendia');
      corrected = corrected.replace(/数据中心/g, 'Datacendia');
      corrected = corrected.replace(/数据岑迪亚/g, 'Datacendia');
      corrected = corrected.replace(/داتاسنديا/g, 'Datacendia');
      corrected = corrected.replace(/डेटासेंडिया/g, 'Datacendia');
      
      // Preserve exact case from English
      // If English has "DATACENDIA", ensure translation has "DATACENDIA" not "Datacendia" etc.
      if (enValue.includes('DATACENDIA')) {
        corrected = corrected.replace(/datacendia/gi, 'DATACENDIA');
      }
      
      // Also handle "Datacendia" (title case)
      if (enValue.includes('Datacendia') && !enValue.includes('DATACENDIA')) {
        corrected = corrected.replace(/datacendia/gi, 'Datacendia');
      }
      
      if (corrected !== transValue) {
        t[key] = corrected;
        fixed++;
      }
    }
  }

  // Save JSON
  fs.writeFileSync(jsonPath, JSON.stringify(t, null, 2), 'utf8');
  
  // Save JS
  const jsLines = [`const translations_${lang} = {`];
  for (const [key, value] of Object.entries(t)) {
    const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
    jsLines.push(`  "${key}": "${escaped}",`);
  }
  jsLines.push('};');
  jsLines.push(`if (typeof window !== 'undefined') window.translations_${lang} = translations_${lang};`);
  fs.writeFileSync(path.join(TRANS_DIR, `${lang}.js`), jsLines.join('\n'), 'utf8');

  console.log(`[${lang.toUpperCase()}] ${fixed} brand name fixes`);
}

console.log('\nDone.');
