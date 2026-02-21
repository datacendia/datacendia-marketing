/**
 * Add auditProvenanceShowcaseTitle and auditProvenanceShowcaseDesc
 * to the 10 non-hi language blocks in the workspace translations.js.
 * Values sourced from each language's split file.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

// Values per language (sourced from split files)
const VALUES = {
  en: {
    auditProvenanceShowcaseTitle: 'Audit Provenance\u2122',
    auditProvenanceShowcaseDesc: 'Cryptographic audit trail with immutable evidence ledger. Every decision, every vote, every dissent\u2014hashed, signed, and exportable for regulators. When they ask \u2018prove it,\u2019 you can.'
  },
  es: {
    auditProvenanceShowcaseTitle: 'Audit Provenance\u2122',
    auditProvenanceShowcaseDesc: 'Rastro de auditor\u00eda criptogr\u00e1fico con libro de evidencias inmutable. Cada decisi\u00f3n, cada voto, cada disidencia\u2014hasheado, firmado y exportable para reguladores.'
  },
  fr: {
    auditProvenanceShowcaseTitle: 'Audit Provenance\u2122',
    auditProvenanceShowcaseDesc: 'Piste d\u2019audit cryptographique avec registre de preuves immuable. Chaque d\u00e9cision, chaque vote, chaque dissidence\u2014hach\u00e9, sign\u00e9 et exportable pour les r\u00e9gulateurs.'
  },
  de: {
    auditProvenanceShowcaseTitle: 'Audit Provenance\u2122',
    auditProvenanceShowcaseDesc: 'Kryptografischer Pr\u00fcfpfad mit unver\u00e4nderlichem Beweisregister. Jede Entscheidung, jede Abstimmung, jeder Widerspruch\u2014gehasht, signiert und f\u00fcr Regulatoren exportierbar.'
  },
  pt: {
    auditProvenanceShowcaseTitle: 'Audit Provenance\u2122',
    auditProvenanceShowcaseDesc: 'Trilha de auditoria criptogr\u00e1fica com registro de evid\u00eancias imut\u00e1vel. Cada decis\u00e3o, cada voto, cada discord\u00e2ncia\u2014hasheado, assinado e export\u00e1vel para reguladores.'
  },
  it: {
    auditProvenanceShowcaseTitle: 'Audit Provenance\u2122',
    auditProvenanceShowcaseDesc: 'Traccia di audit crittografica con registro prove immutabile. Ogni decisione, ogni voto, ogni dissenso\u2014hashato, firmato ed esportabile per i regolatori.'
  },
  ja: {
    auditProvenanceShowcaseTitle: 'Audit Provenance\u2122',
    auditProvenanceShowcaseDesc: '不変の証拠台帳を持つ暗号化監査トレイル。すべての意思決定、投票、反対意見\u2014ハッシュ化、署名され、規制当局向けにエクスポート可能。'
  },
  ko: {
    auditProvenanceShowcaseTitle: 'Audit Provenance\u2122',
    auditProvenanceShowcaseDesc: '불변 증거 장부를 갖춘 암호화 감사 추적. 모든 결정, 모든 투표, 모든 반대 의견\u2014해시, 서명, 규제 기관에 내보낼 수 있습니다.'
  },
  zh: {
    auditProvenanceShowcaseTitle: 'Audit Provenance\u2122',
    auditProvenanceShowcaseDesc: '具有不可变证据账本的加密审计跟踪。每个决定、每次投票、每次异议\u2014哈希、签名，可导出给监管机构。'
  },
  ar: {
    auditProvenanceShowcaseTitle: 'Audit Provenance\u2122',
    auditProvenanceShowcaseDesc: 'مسار تدقيق تشفيري مع سجل أدلة غير قابل للتغيير. كل قرار، كل تصويت، كل معارضة\u2014مجزأ، موقع، وقابل للتصدير للجهات التنظيمية.'
  }
};

// Language block order in monolith
const LANG_ORDER = ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh', 'ar', 'hi'];
const TARGET_LANGS = Object.keys(VALUES); // all except hi (already done)

let content = fs.readFileSync(path.join(ROOT, 'translations.js'), 'utf8');
let added = 0;

TARGET_LANGS.forEach(lang => {
  const vals = VALUES[lang];
  const langIdx = LANG_ORDER.indexOf(lang);

  // Find block start
  const blockMarker = '\n  ' + lang + ': {';
  const blockStart = content.indexOf(blockMarker);
  if (blockStart === -1) { console.log('Block not found: ' + lang); return; }

  // Find block end — closing },  before next lang block
  let blockEnd;
  if (langIdx < LANG_ORDER.length - 1) {
    const nextLang = LANG_ORDER[langIdx + 1];
    blockEnd = content.indexOf('\n  ' + nextLang + ': {', blockStart);
  } else {
    blockEnd = content.indexOf('\n};', blockStart);
  }
  if (blockEnd === -1) { console.log('Block end not found: ' + lang); return; }

  // Find the closing },  of this block — last occurrence of \n  }, before blockEnd
  const closingIdx = content.lastIndexOf('\n  },', blockEnd);
  if (closingIdx === -1 || closingIdx < blockStart) {
    console.log('Closing }, not found for: ' + lang);
    return;
  }

  Object.entries(vals).forEach(([key, val]) => {
    // Check if already present in this block
    const blockSlice = content.slice(blockStart, blockEnd);
    if (blockSlice.includes(key + ':') || blockSlice.includes('"' + key + '"')) {
      console.log('SKIP (exists): [' + lang + '] ' + key);
      return;
    }
    const newEntry = '\n    ' + key + ': "' + val.replace(/"/g, '\\"') + '",';
    // Re-find closingIdx since content shifts after each insertion
    const ci = content.lastIndexOf('\n  },', content.indexOf('\n  ' + (LANG_ORDER[langIdx + 1] || '};'), content.indexOf('\n  ' + lang + ': {')));
    content = content.slice(0, ci) + newEntry + content.slice(ci);
    console.log('ADDED [' + lang + ']: ' + key);
    added++;
  });
});

fs.writeFileSync(path.join(ROOT, 'translations.js'), content, 'utf8');
console.log('\nTotal added: ' + added);

// Verify counts
['auditProvenanceShowcaseTitle', 'auditProvenanceShowcaseDesc'].forEach(key => {
  const count = (content.match(new RegExp(key, 'g')) || []).length;
  console.log(key + ': ' + count + ' occurrences (expected 11)');
});
