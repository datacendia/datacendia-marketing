#!/usr/bin/env node
/**
 * Build Script: Generate full i18n HTML pages from English template + translations.js
 * 
 * This script reads the English index.html and translations.js, then generates
 * fully localized HTML pages for each language with inline fallback text for SEO.
 * 
 * Usage: node scripts/build-i18n-pages.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const ROOT_DIR = path.join(__dirname, '..');
const ENGLISH_TEMPLATE = path.join(ROOT_DIR, 'index.html');
const TRANSLATIONS_FILE = path.join(ROOT_DIR, 'translations.js');

const LANGUAGES = [
  { code: 'es', name: 'Español', locale: 'es_ES', dir: 'ltr' },
  { code: 'fr', name: 'Français', locale: 'fr_FR', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', locale: 'de_DE', dir: 'ltr' },
  { code: 'pt', name: 'Português', locale: 'pt_BR', dir: 'ltr' },
  { code: 'it', name: 'Italiano', locale: 'it_IT', dir: 'ltr' },
  { code: 'ja', name: '日本語', locale: 'ja_JP', dir: 'ltr' },
  { code: 'ko', name: '한국어', locale: 'ko_KR', dir: 'ltr' },
  { code: 'zh', name: '中文', locale: 'zh_CN', dir: 'ltr' },
  { code: 'ar', name: 'العربية', locale: 'ar_SA', dir: 'rtl' },
  { code: 'hi', name: 'हिन्दी', locale: 'hi_IN', dir: 'ltr' }
];

// Load translations
function loadTranslations() {
  const content = fs.readFileSync(TRANSLATIONS_FILE, 'utf8');
  // Find the end of the translations object (ends with }; on its own line)
  const endIndex = content.indexOf('\n};') + 3;
  if (endIndex < 3) {
    throw new Error('Could not find end of translations object');
  }
  const translationsCode = content.substring(0, endIndex);
  
  // Use Function constructor to safely evaluate
  const fn = new Function(translationsCode + '\nreturn translations;');
  return fn();
}

// Load English template
function loadTemplate() {
  return fs.readFileSync(ENGLISH_TEMPLATE, 'utf8');
}

// Replace data-i18n attributes with translated text
function replaceI18nAttributes(html, translations, langCode) {
  const t = translations[langCode] || translations.en;
  
  // Collect all matches first, then replace from end to start
  function replaceWithTagMatch(html, attrName) {
    const attrRegex = new RegExp(`<([a-z][a-z0-9]*)([^>]*\\s+${attrName}="([^"]+)"[^>]*)>`, 'gi');
    const matches = [];
    let match;
    
    while ((match = attrRegex.exec(html)) !== null) {
      const tagName = match[1];
      const key = match[3];
      const fullOpenTag = match[0];
      const startIndex = match.index;
      
      // Find the matching closing tag
      const closeTag = `</${tagName}>`;
      let depth = 1;
      let searchIndex = startIndex + fullOpenTag.length;
      let contentEnd = -1;
      
      while (depth > 0 && searchIndex < html.length) {
        const nextOpen = html.indexOf(`<${tagName}`, searchIndex);
        const nextClose = html.indexOf(closeTag, searchIndex);
        
        if (nextClose === -1) break;
        
        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          searchIndex = nextOpen + tagName.length + 1;
        } else {
          depth--;
          if (depth === 0) contentEnd = nextClose;
          searchIndex = nextClose + closeTag.length;
        }
      }
      
      if (contentEnd !== -1) {
        const translated = t[key] || translations.en[key];
        if (translated) {
          matches.push({
            start: startIndex,
            end: contentEnd + closeTag.length,
            replacement: fullOpenTag + translated + closeTag
          });
        }
      }
    }
    
    // Replace from end to start to maintain indices
    let result = html;
    for (let i = matches.length - 1; i >= 0; i--) {
      const m = matches[i];
      result = result.substring(0, m.start) + m.replacement + result.substring(m.end);
    }
    
    return result;
  }
  
  html = replaceWithTagMatch(html, 'data-i18n');
  html = replaceWithTagMatch(html, 'data-i18n-html');
  
  return html;
}

// Update meta tags for language
function updateMetaTags(html, lang, translations) {
  const t = translations[lang.code] || translations.en;
  
  // Update html lang attribute
  html = html.replace(/<html lang="en">/, `<html lang="${lang.code}"${lang.dir === 'rtl' ? ' dir="rtl"' : ''}>`);
  
  // Update title - use translated tagline if available
  const titleTranslations = {
    es: 'Plataforma de Inteligencia Soberana Empresarial | IA Air-Gapped | Datacendia',
    fr: 'Plateforme d\'Intelligence Souveraine d\'Entreprise | IA Air-Gapped | Datacendia',
    de: 'Souveräne Unternehmens-Intelligenz-Plattform | Air-Gapped KI | Datacendia',
    pt: 'Plataforma de Inteligência Soberana Empresarial | IA Air-Gapped | Datacendia',
    it: 'Piattaforma di Intelligenza Sovrana Aziendale | IA Air-Gapped | Datacendia',
    ja: 'ソブリン・エンタープライズ・インテリジェンス・プラットフォーム | エアギャップAI | Datacendia',
    ko: '주권 엔터프라이즈 인텔리전스 플랫폼 | 에어갭 AI | Datacendia',
    zh: '主权企业智能平台 | 气隙AI | Datacendia',
    ar: 'منصة الذكاء المؤسسي السيادي | AI معزول | Datacendia',
    hi: 'सॉवरेन एंटरप्राइज़ इंटेलिजेंस प्लेटफ़ॉर्म | एयर-गैप्ड AI | Datacendia'
  };
  
  const descTranslations = {
    es: 'Plataforma de inteligencia empresarial soberana que funciona en su infraestructura. IA air-gapped y auditable para bancos, contratistas de defensa e industrias reguladas.',
    fr: 'Plateforme d\'intelligence d\'entreprise souveraine fonctionnant sur votre infrastructure. IA air-gapped et auditable pour les banques, les sous-traitants de défense et les industries réglementées.',
    de: 'Souveräne Unternehmens-Intelligenzplattform, die auf Ihrer Infrastruktur läuft. Air-Gapped, auditierbare KI für Banken, Verteidigungsunternehmen und regulierte Industrien.',
    pt: 'Plataforma de inteligência empresarial soberana que funciona em sua infraestrutura. IA air-gapped e auditável para bancos, contratantes de defesa e indústrias reguladas.',
    it: 'Piattaforma di intelligenza aziendale sovrana che funziona sulla tua infrastruttura. IA air-gapped e verificabile per banche, appaltatori della difesa e industrie regolamentate.',
    ja: 'お客様のインフラストラクチャで稼働するソブリン・エンタープライズ・インテリジェンス・プラットフォーム。銀行、防衛請負業者、規制産業向けのエアギャップ対応、監査可能なAI。',
    ko: '귀하의 인프라에서 실행되는 주권 엔터프라이즈 인텔리전스 플랫폼. 은행, 방위 계약업체 및 규제 산업을 위한 에어갭, 감사 가능한 AI.',
    zh: '在您的基础设施上运行的主权企业智能平台。适用于银行、国防承包商和受监管行业的气隙、可审计AI。',
    ar: 'منصة ذكاء مؤسسي سيادية تعمل على بنيتك التحتية. ذكاء اصطناعي معزول وقابل للتدقيق للبنوك ومقاولي الدفاع والصناعات المنظمة.',
    hi: 'आपके बुनियादी ढांचे पर चलने वाला सॉवरेन एंटरप्राइज़ इंटेलिजेंस प्लेटफ़ॉर्म। बैंकों, रक्षा ठेकेदारों और विनियमित उद्योगों के लिए एयर-गैप्ड, ऑडिट योग्य AI।'
  };
  
  if (titleTranslations[lang.code]) {
    html = html.replace(/<title>[^<]+<\/title>/, `<title>${titleTranslations[lang.code]}</title>`);
  }
  
  if (descTranslations[lang.code]) {
    html = html.replace(
      /<meta name="description" content="[^"]+"/,
      `<meta name="description" content="${descTranslations[lang.code]}"`
    );
    html = html.replace(
      /<meta property="og:description" content="[^"]+"/,
      `<meta property="og:description" content="${descTranslations[lang.code]}"`
    );
    html = html.replace(
      /<meta name="twitter:description" content="[^"]+"/,
      `<meta name="twitter:description" content="${descTranslations[lang.code]}"`
    );
  }
  
  // Update canonical and og:url
  html = html.replace(
    /<link rel="canonical" href="https:\/\/datacendia\.com\/">/,
    `<link rel="canonical" href="https://datacendia.com/${lang.code}/">`
  );
  html = html.replace(
    /<meta property="og:url" content="https:\/\/datacendia\.com\/">/,
    `<meta property="og:url" content="https://datacendia.com/${lang.code}/">`
  );
  
  // Update og:locale
  html = html.replace(
    /<meta property="og:locale" content="en_US">/,
    `<meta property="og:locale" content="${lang.locale}">`
  );
  
  // Add hreflang tags if not present
  if (!html.includes('hreflang="en"')) {
    const hreflangs = LANGUAGES.map(l => 
      `<link rel="alternate" hreflang="${l.code}" href="https://datacendia.com/${l.code}/">`
    ).join('\n  ');
    html = html.replace(
      /<link rel="canonical"/,
      `<link rel="alternate" hreflang="en" href="https://datacendia.com/">\n  ${hreflangs}\n  <link rel="alternate" hreflang="x-default" href="https://datacendia.com/">\n  <link rel="canonical"`
    );
  }
  
  return html;
}

// Update navigation links to include lang parameter
function updateNavLinks(html, langCode) {
  // Update internal links to include ?lang=xx
  html = html.replace(/href="([^"]+\.html)"/g, (match, url) => {
    if (url.startsWith('http') || url.includes('?lang=')) return match;
    return `href="${url}?lang=${langCode}"`;
  });
  
  // Update relative asset paths to absolute
  html = html.replace(/href="assets\//g, 'href="/assets/');
  html = html.replace(/src="assets\//g, 'src="/assets/');
  html = html.replace(/href="styles\.css"/g, 'href="/styles.css"');
  
  return html;
}

// Update language selector
function updateLangSelector(html, langCode, langName) {
  html = html.replace(
    /<span class="lang-current">English<\/span>/,
    `<span class="lang-current">${langName}</span>`
  );
  
  // Mark current language as active in dropdown
  html = html.replace(
    new RegExp(`<button onclick="setLanguage\\('${langCode}'\\)">`),
    `<a href="/${langCode}/" class="active">`
  );
  
  // Convert buttons to links for non-JS fallback
  html = html.replace(/<button onclick="setLanguage\('en'\)">English<\/button>/, '<a href="/">English</a>');
  LANGUAGES.forEach(l => {
    const activeClass = l.code === langCode ? ' class="active"' : '';
    html = html.replace(
      new RegExp(`<button onclick="setLanguage\\('${l.code}'\\)">${l.name}<\\/button>`),
      `<a href="/${l.code}/"${activeClass}>${l.name}</a>`
    );
  });
  
  return html;
}

// Add language initialization script
function addLangInit(html, langCode) {
  html = html.replace(
    /<script src="translations\.js[^"]*"><\/script>/,
    `<script src="/translations.js"></script>`
  );
  html = html.replace(
    /<script src="app\.js"><\/script>/,
    `<script src="/app.js"></script>\n  <script>localStorage.setItem('datacendia-lang', '${langCode}'); if (typeof setLanguage === 'function') setLanguage('${langCode}');</script>`
  );
  
  return html;
}

// Main build function
function buildLanguagePage(lang, template, translations) {
  let html = template;
  
  // Apply transformations
  html = updateMetaTags(html, lang, translations);
  html = replaceI18nAttributes(html, translations, lang.code);
  html = updateNavLinks(html, lang.code);
  html = updateLangSelector(html, lang.code, lang.name);
  html = addLangInit(html, lang.code);
  
  return html;
}

// Write output file
function writeLanguagePage(langCode, content) {
  const outputDir = path.join(ROOT_DIR, langCode);
  const outputFile = path.join(outputDir, 'index.html');
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputFile, content, 'utf8');
  console.log(`✓ Generated: ${langCode}/index.html (${(content.length / 1024).toFixed(1)} KB)`);
}

// Main execution
function main() {
  console.log('🌐 Building i18n pages...\n');
  
  try {
    const translations = loadTranslations();
    const template = loadTemplate();
    
    console.log(`📄 Loaded English template (${(template.length / 1024).toFixed(1)} KB)`);
    console.log(`🔤 Loaded translations for ${Object.keys(translations).length} languages\n`);
    
    let successCount = 0;
    
    for (const lang of LANGUAGES) {
      try {
        const content = buildLanguagePage(lang, template, translations);
        writeLanguagePage(lang.code, content);
        successCount++;
      } catch (err) {
        console.error(`✗ Failed: ${lang.code} - ${err.message}`);
      }
    }
    
    console.log(`\n✅ Built ${successCount}/${LANGUAGES.length} language pages`);
    
  } catch (err) {
    console.error('Build failed:', err.message);
    process.exit(1);
  }
}

main();
