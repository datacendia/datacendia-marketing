/**
 * Add navLaunchApp and btnLaunchApp i18n keys to all translation JSON files.
 */
const fs = require('fs');
const path = require('path');

const TRANSLATIONS_DIR = path.resolve(__dirname, '..', 'translations');

const translations = {
  en: { navLaunchApp: "Launch App →", btnLaunchApp: "Launch App →" },
  es: { navLaunchApp: "Abrir App →", btnLaunchApp: "Abrir App →" },
  fr: { navLaunchApp: "Lancer l'App →", btnLaunchApp: "Lancer l'App →" },
  de: { navLaunchApp: "App starten →", btnLaunchApp: "App starten →" },
  pt: { navLaunchApp: "Abrir App →", btnLaunchApp: "Abrir App →" },
  it: { navLaunchApp: "Apri App →", btnLaunchApp: "Apri App →" },
  ja: { navLaunchApp: "アプリを起動 →", btnLaunchApp: "アプリを起動 →" },
  ko: { navLaunchApp: "앱 실행 →", btnLaunchApp: "앱 실행 →" },
  zh: { navLaunchApp: "启动应用 →", btnLaunchApp: "启动应用 →" },
  ar: { navLaunchApp: "تشغيل التطبيق →", btnLaunchApp: "تشغيل التطبيق →" },
  hi: { navLaunchApp: "ऐप लॉन्च करें →", btnLaunchApp: "ऐप लॉन्च करें →" },
};

for (const [lang, keys] of Object.entries(translations)) {
  const filePath = path.join(TRANSLATIONS_DIR, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ ${lang}.json not found, skipping`);
    continue;
  }
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Add after navRequestBriefing key
  data.navLaunchApp = keys.navLaunchApp;
  data.btnLaunchApp = keys.btnLaunchApp;
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`✓ ${lang}.json — added navLaunchApp + btnLaunchApp`);
}

// Also update .js files if they exist
for (const [lang, keys] of Object.entries(translations)) {
  const filePath = path.join(TRANSLATIONS_DIR, `${lang}.js`);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('navLaunchApp')) {
    console.log(`⚠ ${lang}.js already has navLaunchApp, skipping`);
    continue;
  }
  
  // Insert after navRequestBriefing line
  const anchor = `"navRequestBriefing"`;
  const idx = content.indexOf(anchor);
  if (idx === -1) {
    console.log(`⚠ ${lang}.js — navRequestBriefing not found, appending`);
    continue;
  }
  
  // Find end of that line
  const lineEnd = content.indexOf('\n', idx);
  const insertAfter = content.substring(0, lineEnd + 1);
  const rest = content.substring(lineEnd + 1);
  
  const newLines = `  "navLaunchApp": "${keys.navLaunchApp}",\n  "btnLaunchApp": "${keys.btnLaunchApp}",\n`;
  
  content = insertAfter + newLines + rest;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ ${lang}.js — added navLaunchApp + btnLaunchApp`);
}

console.log('\nDone.');
