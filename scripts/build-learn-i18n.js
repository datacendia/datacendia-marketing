#!/usr/bin/env node
/**
 * Build Script: Generate localized learn article pages for new articles.
 * Creates {lang}/learn/{article}/index.html for each language.
 * 
 * Usage: node scripts/build-learn-i18n.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

const LANGUAGES = [
  { code: 'es', name: 'Español', locale: 'es_ES' },
  { code: 'fr', name: 'Français', locale: 'fr_FR' },
  { code: 'de', name: 'Deutsch', locale: 'de_DE' },
  { code: 'pt', name: 'Português', locale: 'pt_BR' },
  { code: 'it', name: 'Italiano', locale: 'it_IT' },
  { code: 'ja', name: '日本語', locale: 'ja_JP' },
  { code: 'ko', name: '한국어', locale: 'ko_KR' },
  { code: 'zh', name: '中文', locale: 'zh_CN' },
  { code: 'ar', name: 'العربية', locale: 'ar_SA' },
  { code: 'hi', name: 'हिन्दी', locale: 'hi_IN' }
];

const ARTICLES = ['ai-governance', 'hipaa-ai-compliance', 'air-gapped-ai-deployment', 'multi-agent-vs-single-model', 'eu-ai-act-high-risk'];

// Navigation translations
const NAV = {
  es: { demos: 'Demos', industries: 'Industrias', learn: 'Aprender', pricing: 'Precios', briefing: 'Solicitar Briefing', home: 'Inicio', footer: '© 2026 Datacendia. Inteligencia Empresarial Soberana.' },
  fr: { demos: 'Démos', industries: 'Industries', learn: 'Apprendre', pricing: 'Tarifs', briefing: 'Demander un Briefing', home: 'Accueil', footer: '© 2026 Datacendia. Intelligence Souveraine d\'Entreprise.' },
  de: { demos: 'Demos', industries: 'Branchen', learn: 'Lernen', pricing: 'Preise', briefing: 'Briefing Anfordern', home: 'Startseite', footer: '© 2026 Datacendia. Souveräne Unternehmens-Intelligenz.' },
  pt: { demos: 'Demos', industries: 'Indústrias', learn: 'Aprender', pricing: 'Preços', briefing: 'Solicitar Briefing', home: 'Início', footer: '© 2026 Datacendia. Inteligência Empresarial Soberana.' },
  it: { demos: 'Demo', industries: 'Settori', learn: 'Apprendere', pricing: 'Prezzi', briefing: 'Richiedi Briefing', home: 'Home', footer: '© 2026 Datacendia. Intelligenza Aziendale Sovrana.' },
  ja: { demos: 'デモ', industries: '業界', learn: '学ぶ', pricing: '価格', briefing: 'ブリーフィング依頼', home: 'ホーム', footer: '© 2026 Datacendia. ソブリン・エンタープライズ・インテリジェンス。' },
  ko: { demos: '데모', industries: '산업', learn: '학습', pricing: '가격', briefing: '브리핑 요청', home: '홈', footer: '© 2026 Datacendia. 주권 엔터프라이즈 인텔리전스.' },
  zh: { demos: '演示', industries: '行业', learn: '学习', pricing: '价格', briefing: '请求简报', home: '首页', footer: '© 2026 Datacendia. 主权企业智能。' },
  ar: { demos: 'عروض', industries: 'الصناعات', learn: 'تعلم', pricing: 'الأسعار', briefing: 'طلب إحاطة', home: 'الرئيسية', footer: '© 2026 Datacendia. الذكاء المؤسسي السيادي.' },
  hi: { demos: 'डेमो', industries: 'उद्योग', learn: 'सीखें', pricing: 'मूल्य', briefing: 'ब्रीफिंग अनुरोध', home: 'होम', footer: '© 2026 Datacendia. सॉवरेन एंटरप्राइज़ इंटेलिजेंस।' }
};

// Article metadata translations
const ARTICLE_META = {
  'ai-governance': {
    en: { title: 'What is AI Governance? Complete Enterprise Guide 2026', breadcrumb: 'AI Governance', h1: 'What is AI Governance?', desc: 'AI governance is the framework of policies, processes, and controls that ensure AI systems are developed and deployed responsibly.', readTime: '12 minutes', category: 'AI Governance' },
    es: { title: '¿Qué es la Gobernanza de IA? Guía Empresarial Completa 2026', breadcrumb: 'Gobernanza de IA', h1: '¿Qué es la Gobernanza de IA?', desc: 'La gobernanza de IA es el marco de políticas, procesos y controles que garantizan que los sistemas de IA se desarrollen de manera responsable.', readTime: '12 min de lectura', category: 'Gobernanza de IA' },
    fr: { title: 'Qu\'est-ce que la Gouvernance de l\'IA ? Guide Complet 2026', breadcrumb: 'Gouvernance IA', h1: 'Qu\'est-ce que la Gouvernance de l\'IA ?', desc: 'La gouvernance de l\'IA est le cadre de politiques, processus et contrôles garantissant un développement responsable des systèmes d\'IA.', readTime: '12 min de lecture', category: 'Gouvernance IA' },
    de: { title: 'Was ist KI-Governance? Vollständiger Unternehmensguide 2026', breadcrumb: 'KI-Governance', h1: 'Was ist KI-Governance?', desc: 'KI-Governance ist der Rahmen aus Richtlinien, Prozessen und Kontrollen für verantwortungsvolle KI-Entwicklung.', readTime: '12 Min. Lesezeit', category: 'KI-Governance' },
    pt: { title: 'O que é Governança de IA? Guia Empresarial Completo 2026', breadcrumb: 'Governança de IA', h1: 'O que é Governança de IA?', desc: 'Governança de IA é o framework de políticas, processos e controles para desenvolvimento responsável de IA.', readTime: '12 min de leitura', category: 'Governança de IA' },
    it: { title: 'Cos\'è la Governance dell\'IA? Guida Aziendale Completa 2026', breadcrumb: 'Governance IA', h1: 'Cos\'è la Governance dell\'IA?', desc: 'La governance dell\'IA è il framework di politiche, processi e controlli per lo sviluppo responsabile dell\'IA.', readTime: '12 min di lettura', category: 'Governance IA' },
    ja: { title: 'AIガバナンスとは？企業向け完全ガイド2026', breadcrumb: 'AIガバナンス', h1: 'AIガバナンスとは？', desc: 'AIガバナンスは、AIシステムの責任ある開発と展開を保証するポリシー、プロセス、制御のフレームワークです。', readTime: '12分', category: 'AIガバナンス' },
    ko: { title: 'AI 거버넌스란? 기업 완전 가이드 2026', breadcrumb: 'AI 거버넌스', h1: 'AI 거버넌스란?', desc: 'AI 거버넌스는 AI 시스템의 책임 있는 개발을 보장하는 정책, 프로세스 및 통제의 프레임워크입니다.', readTime: '12분 읽기', category: 'AI 거버넌스' },
    zh: { title: '什么是AI治理？2026企业完全指南', breadcrumb: 'AI治理', h1: '什么是AI治理？', desc: 'AI治理是确保AI系统负责任地开发和部署的政策、流程和控制框架。', readTime: '12分钟阅读', category: 'AI治理' },
    ar: { title: 'ما هي حوكمة الذكاء الاصطناعي؟ الدليل المؤسسي الكامل 2026', breadcrumb: 'حوكمة الذكاء الاصطناعي', h1: 'ما هي حوكمة الذكاء الاصطناعي؟', desc: 'حوكمة الذكاء الاصطناعي هي إطار السياسات والعمليات والضوابط لتطوير أنظمة ذكاء اصطناعي مسؤولة.', readTime: '12 دقيقة قراءة', category: 'حوكمة الذكاء الاصطناعي' },
    hi: { title: 'AI गवर्नेंस क्या है? संपूर्ण एंटरप्राइज़ गाइड 2026', breadcrumb: 'AI गवर्नेंस', h1: 'AI गवर्नेंस क्या है?', desc: 'AI गवर्नेंस नीतियों, प्रक्रियाओं और नियंत्रणों का ढांचा है जो AI सिस्टम के जिम्मेदार विकास को सुनिश्चित करता है।', readTime: '12 मिनट पढ़ने का समय', category: 'AI गवर्नेंस' }
  },
  'hipaa-ai-compliance': {
    en: { title: 'HIPAA AI Compliance Guide', breadcrumb: 'HIPAA AI Compliance', h1: 'HIPAA AI Compliance Guide', desc: 'How to deploy AI systems that handle PHI while maintaining HIPAA compliance.', readTime: '14 minutes', category: 'Healthcare Compliance' },
    es: { title: 'Guía de Cumplimiento HIPAA para IA', breadcrumb: 'Cumplimiento HIPAA', h1: 'Guía de Cumplimiento HIPAA para IA', desc: 'Cómo desplegar sistemas de IA que manejan PHI manteniendo el cumplimiento de HIPAA.', readTime: '14 min de lectura', category: 'Cumplimiento en Salud' },
    fr: { title: 'Guide de Conformité HIPAA pour l\'IA', breadcrumb: 'Conformité HIPAA', h1: 'Guide de Conformité HIPAA pour l\'IA', desc: 'Comment déployer des systèmes d\'IA traitant des PHI tout en respectant la conformité HIPAA.', readTime: '14 min de lecture', category: 'Conformité Santé' },
    de: { title: 'HIPAA KI-Compliance Leitfaden', breadcrumb: 'HIPAA Compliance', h1: 'HIPAA KI-Compliance Leitfaden', desc: 'KI-Systeme HIPAA-konform einsetzen: Technische Schutzmaßnahmen und BAA-Anforderungen.', readTime: '14 Min. Lesezeit', category: 'Gesundheits-Compliance' },
    pt: { title: 'Guia de Conformidade HIPAA para IA', breadcrumb: 'Conformidade HIPAA', h1: 'Guia de Conformidade HIPAA para IA', desc: 'Como implantar sistemas de IA que lidam com PHI mantendo a conformidade HIPAA.', readTime: '14 min de leitura', category: 'Conformidade em Saúde' },
    it: { title: 'Guida alla Conformità HIPAA per l\'IA', breadcrumb: 'Conformità HIPAA', h1: 'Guida alla Conformità HIPAA per l\'IA', desc: 'Come implementare sistemi di IA che gestiscono PHI mantenendo la conformità HIPAA.', readTime: '14 min di lettura', category: 'Conformità Sanitaria' },
    ja: { title: 'HIPAA AI コンプライアンスガイド', breadcrumb: 'HIPAAコンプライアンス', h1: 'HIPAA AI コンプライアンスガイド', desc: 'HIPAAコンプライアンスを維持しながらPHIを扱うAIシステムの導入方法。', readTime: '14分', category: '医療コンプライアンス' },
    ko: { title: 'HIPAA AI 컴플라이언스 가이드', breadcrumb: 'HIPAA 컴플라이언스', h1: 'HIPAA AI 컴플라이언스 가이드', desc: 'HIPAA 준수를 유지하면서 PHI를 처리하는 AI 시스템 배포 방법.', readTime: '14분 읽기', category: '의료 컴플라이언스' },
    zh: { title: 'HIPAA AI合规指南', breadcrumb: 'HIPAA合规', h1: 'HIPAA AI合规指南', desc: '如何在保持HIPAA合规的同时部署处理PHI的AI系统。', readTime: '14分钟阅读', category: '医疗合规' },
    ar: { title: 'دليل امتثال HIPAA للذكاء الاصطناعي', breadcrumb: 'امتثال HIPAA', h1: 'دليل امتثال HIPAA للذكاء الاصطناعي', desc: 'كيفية نشر أنظمة الذكاء الاصطناعي التي تتعامل مع المعلومات الصحية المحمية مع الحفاظ على امتثال HIPAA.', readTime: '14 دقيقة قراءة', category: 'امتثال الرعاية الصحية' },
    hi: { title: 'HIPAA AI अनुपालन गाइड', breadcrumb: 'HIPAA अनुपालन', h1: 'HIPAA AI अनुपालन गाइड', desc: 'HIPAA अनुपालन बनाए रखते हुए PHI को संभालने वाले AI सिस्टम कैसे तैनात करें।', readTime: '14 मिनट पढ़ने का समय', category: 'स्वास्थ्य अनुपालन' }
  },
  'air-gapped-ai-deployment': {
    en: { title: 'Air-Gapped AI Deployment: Complete Guide', breadcrumb: 'Air-Gapped AI', h1: 'Air-Gapped AI Deployment', desc: 'How to deploy AI systems in air-gapped environments with zero internet connectivity.', readTime: '15 minutes', category: 'Sovereign AI' },
    es: { title: 'Despliegue de IA Air-Gapped: Guía Completa', breadcrumb: 'IA Air-Gapped', h1: 'Despliegue de IA Air-Gapped', desc: 'Cómo desplegar sistemas de IA en entornos air-gapped sin conectividad a internet.', readTime: '15 min de lectura', category: 'IA Soberana' },
    fr: { title: 'Déploiement d\'IA Air-Gap : Guide Complet', breadcrumb: 'IA Air-Gap', h1: 'Déploiement d\'IA Air-Gap', desc: 'Comment déployer des systèmes d\'IA en environnements air-gap sans connectivité internet.', readTime: '15 min de lecture', category: 'IA Souveraine' },
    de: { title: 'Air-Gapped KI-Deployment: Vollständiger Leitfaden', breadcrumb: 'Air-Gapped KI', h1: 'Air-Gapped KI-Deployment', desc: 'KI-Systeme in isolierten Umgebungen ohne Internetverbindung einsetzen.', readTime: '15 Min. Lesezeit', category: 'Souveräne KI' },
    pt: { title: 'Implantação de IA Air-Gapped: Guia Completo', breadcrumb: 'IA Air-Gapped', h1: 'Implantação de IA Air-Gapped', desc: 'Como implantar sistemas de IA em ambientes air-gapped sem conectividade com a internet.', readTime: '15 min de leitura', category: 'IA Soberana' },
    it: { title: 'Deployment IA Air-Gapped: Guida Completa', breadcrumb: 'IA Air-Gapped', h1: 'Deployment IA Air-Gapped', desc: 'Come implementare sistemi di IA in ambienti air-gapped senza connettività internet.', readTime: '15 min di lettura', category: 'IA Sovrana' },
    ja: { title: 'エアギャップAI導入：完全ガイド', breadcrumb: 'エアギャップAI', h1: 'エアギャップAI導入', desc: 'インターネット接続なしのエアギャップ環境でAIシステムを導入する方法。', readTime: '15分', category: 'ソブリンAI' },
    ko: { title: '에어갭 AI 배포: 완전 가이드', breadcrumb: '에어갭 AI', h1: '에어갭 AI 배포', desc: '인터넷 연결 없는 에어갭 환경에서 AI 시스템을 배포하는 방법.', readTime: '15분 읽기', category: '주권 AI' },
    zh: { title: '气隙AI部署：完全指南', breadcrumb: '气隙AI', h1: '气隙AI部署', desc: '如何在零互联网连接的气隙环境中部署AI系统。', readTime: '15分钟阅读', category: '主权AI' },
    ar: { title: 'نشر الذكاء الاصطناعي المعزول: الدليل الكامل', breadcrumb: 'ذكاء اصطناعي معزول', h1: 'نشر الذكاء الاصطناعي المعزول', desc: 'كيفية نشر أنظمة الذكاء الاصطناعي في بيئات معزولة بدون اتصال بالإنترنت.', readTime: '15 دقيقة قراءة', category: 'الذكاء الاصطناعي السيادي' },
    hi: { title: 'एयर-गैप्ड AI डिप्लॉयमेंट: संपूर्ण गाइड', breadcrumb: 'एयर-गैप्ड AI', h1: 'एयर-गैप्ड AI डिप्लॉयमेंट', desc: 'शून्य इंटरनेट कनेक्टिविटी वाले एयर-गैप्ड वातावरण में AI सिस्टम कैसे तैनात करें।', readTime: '15 मिनट पढ़ने का समय', category: 'सॉवरेन AI' }
  },
  'multi-agent-vs-single-model': {
    en: { title: 'Multi-Agent AI vs Single-Model', breadcrumb: 'Multi-Agent vs Single-Model', h1: 'Why Multi-Agent AI Makes Better Decisions', desc: 'Why multi-agent AI systems outperform single-model approaches for enterprise decisions.', readTime: '11 minutes', category: 'Multi-Agent AI' },
    es: { title: 'IA Multi-Agente vs Modelo Único', breadcrumb: 'Multi-Agente vs Modelo Único', h1: 'Por Qué la IA Multi-Agente Toma Mejores Decisiones', desc: 'Por qué los sistemas multi-agente superan a los enfoques de modelo único para decisiones empresariales.', readTime: '11 min de lectura', category: 'IA Multi-Agente' },
    fr: { title: 'IA Multi-Agent vs Modèle Unique', breadcrumb: 'Multi-Agent vs Modèle Unique', h1: 'Pourquoi l\'IA Multi-Agent Prend de Meilleures Décisions', desc: 'Pourquoi les systèmes multi-agents surpassent les approches à modèle unique pour les décisions d\'entreprise.', readTime: '11 min de lecture', category: 'IA Multi-Agent' },
    de: { title: 'Multi-Agent KI vs Einzelmodell', breadcrumb: 'Multi-Agent vs Einzelmodell', h1: 'Warum Multi-Agent KI bessere Entscheidungen trifft', desc: 'Warum Multi-Agent-KI-Systeme Einzelmodell-Ansätze bei Unternehmensentscheidungen übertreffen.', readTime: '11 Min. Lesezeit', category: 'Multi-Agent KI' },
    pt: { title: 'IA Multi-Agente vs Modelo Único', breadcrumb: 'Multi-Agente vs Modelo Único', h1: 'Por Que a IA Multi-Agente Toma Melhores Decisões', desc: 'Por que sistemas multi-agente superam abordagens de modelo único para decisões empresariais.', readTime: '11 min de leitura', category: 'IA Multi-Agente' },
    it: { title: 'IA Multi-Agente vs Modello Singolo', breadcrumb: 'Multi-Agente vs Modello Singolo', h1: 'Perché l\'IA Multi-Agente Decide Meglio', desc: 'Perché i sistemi multi-agente superano gli approcci a modello singolo per le decisioni aziendali.', readTime: '11 min di lettura', category: 'IA Multi-Agente' },
    ja: { title: 'マルチエージェントAI vs シングルモデル', breadcrumb: 'マルチエージェント vs シングルモデル', h1: 'マルチエージェントAIがより良い意思決定を行う理由', desc: 'マルチエージェントAIがシングルモデルよりも優れた企業意思決定を行う理由。', readTime: '11分', category: 'マルチエージェントAI' },
    ko: { title: '멀티에이전트 AI vs 단일 모델', breadcrumb: '멀티에이전트 vs 단일 모델', h1: '멀티에이전트 AI가 더 나은 결정을 내리는 이유', desc: '멀티에이전트 AI가 기업 의사결정에서 단일 모델을 능가하는 이유.', readTime: '11분 읽기', category: '멀티에이전트 AI' },
    zh: { title: '多智能体AI vs 单模型', breadcrumb: '多智能体 vs 单模型', h1: '为什么多智能体AI做出更好的决策', desc: '为什么多智能体AI系统在企业决策中优于单模型方法。', readTime: '11分钟阅读', category: '多智能体AI' },
    ar: { title: 'الذكاء الاصطناعي متعدد الوكلاء مقابل النموذج الواحد', breadcrumb: 'متعدد الوكلاء مقابل نموذج واحد', h1: 'لماذا الذكاء الاصطناعي متعدد الوكلاء يتخذ قرارات أفضل', desc: 'لماذا تتفوق أنظمة الذكاء الاصطناعي متعددة الوكلاء على مناهج النموذج الواحد.', readTime: '11 دقيقة قراءة', category: 'ذكاء اصطناعي متعدد الوكلاء' },
    hi: { title: 'मल्टी-एजेंट AI बनाम सिंगल मॉडल', breadcrumb: 'मल्टी-एजेंट बनाम सिंगल मॉडल', h1: 'मल्टी-एजेंट AI बेहतर निर्णय क्यों लेता है', desc: 'मल्टी-एजेंट AI सिस्टम एंटरप्राइज़ निर्णयों में सिंगल मॉडल दृष्टिकोण से बेहतर क्यों हैं।', readTime: '11 मिनट पढ़ने का समय', category: 'मल्टी-एजेंट AI' }
  },
  'eu-ai-act-high-risk': {
    en: { title: 'EU AI Act Article 6: High-Risk AI Classification', breadcrumb: 'EU AI Act High-Risk', h1: 'EU AI Act Article 6: High-Risk Classification', desc: 'Which AI systems are high-risk under the EU AI Act? Article 6, Annex III, and compliance obligations.', readTime: '13 minutes', category: 'EU AI Act' },
    es: { title: 'Ley de IA de la UE Artículo 6: Clasificación de IA de Alto Riesgo', breadcrumb: 'Ley IA UE Alto Riesgo', h1: 'Ley de IA de la UE: Clasificación de Alto Riesgo', desc: '¿Qué sistemas de IA son de alto riesgo bajo la Ley de IA de la UE? Artículo 6, Anexo III y obligaciones.', readTime: '13 min de lectura', category: 'Ley de IA de la UE' },
    fr: { title: 'AI Act UE Article 6 : Classification IA à Haut Risque', breadcrumb: 'AI Act Haut Risque', h1: 'AI Act UE : Classification à Haut Risque', desc: 'Quels systèmes d\'IA sont à haut risque selon l\'AI Act ? Article 6, Annexe III et obligations.', readTime: '13 min de lecture', category: 'AI Act UE' },
    de: { title: 'EU KI-Verordnung Artikel 6: Hochrisiko-KI-Klassifizierung', breadcrumb: 'EU KI-Verordnung Hochrisiko', h1: 'EU KI-Verordnung: Hochrisiko-Klassifizierung', desc: 'Welche KI-Systeme sind unter der EU KI-Verordnung hochriskant? Artikel 6, Anhang III und Pflichten.', readTime: '13 Min. Lesezeit', category: 'EU KI-Verordnung' },
    pt: { title: 'Lei de IA da UE Artigo 6: Classificação de IA de Alto Risco', breadcrumb: 'Lei IA UE Alto Risco', h1: 'Lei de IA da UE: Classificação de Alto Risco', desc: 'Quais sistemas de IA são de alto risco segundo a Lei de IA da UE? Artigo 6, Anexo III e obrigações.', readTime: '13 min de leitura', category: 'Lei de IA da UE' },
    it: { title: 'AI Act UE Articolo 6: Classificazione IA ad Alto Rischio', breadcrumb: 'AI Act Alto Rischio', h1: 'AI Act UE: Classificazione ad Alto Rischio', desc: 'Quali sistemi di IA sono ad alto rischio secondo l\'AI Act? Articolo 6, Allegato III e obblighi.', readTime: '13 min di lettura', category: 'AI Act UE' },
    ja: { title: 'EU AI法第6条：ハイリスクAI分類ガイド', breadcrumb: 'EU AI法ハイリスク', h1: 'EU AI法：ハイリスク分類', desc: 'EU AI法でハイリスクに分類されるAIシステムとは？第6条、附属書IIIと遵守義務。', readTime: '13分', category: 'EU AI法' },
    ko: { title: 'EU AI법 제6조: 고위험 AI 분류 가이드', breadcrumb: 'EU AI법 고위험', h1: 'EU AI법: 고위험 분류', desc: 'EU AI법에 따라 고위험으로 분류되는 AI 시스템은? 제6조, 부속서 III 및 준수 의무.', readTime: '13분 읽기', category: 'EU AI법' },
    zh: { title: 'EU AI法案第6条：高风险AI分类指南', breadcrumb: 'EU AI法案高风险', h1: 'EU AI法案：高风险分类', desc: 'EU AI法案下哪些AI系统属于高风险？第6条、附件III及合规义务。', readTime: '13分钟阅读', category: 'EU AI法案' },
    ar: { title: 'قانون الذكاء الاصطناعي الأوروبي المادة 6: تصنيف الذكاء الاصطناعي عالي المخاطر', breadcrumb: 'قانون AI عالي المخاطر', h1: 'قانون AI الأوروبي: التصنيف عالي المخاطر', desc: 'ما هي أنظمة الذكاء الاصطناعي عالية المخاطر وفقاً لقانون AI الأوروبي؟', readTime: '13 دقيقة قراءة', category: 'قانون AI الأوروبي' },
    hi: { title: 'EU AI अधिनियम अनुच्छेद 6: उच्च-जोखिम AI वर्गीकरण', breadcrumb: 'EU AI अधिनियम उच्च-जोखिम', h1: 'EU AI अधिनियम: उच्च-जोखिम वर्गीकरण', desc: 'EU AI अधिनियम के तहत कौन से AI सिस्टम उच्च-जोखिम हैं? अनुच्छेद 6, अनुलग्नक III और अनुपालन दायित्व।', readTime: '13 मिनट पढ़ने का समय', category: 'EU AI अधिनियम' }
  }
};

function generateHreflangTags(article) {
  let tags = `  <link rel="alternate" hreflang="en" href="https://datacendia.com/learn/${article}/">\n`;
  for (const lang of LANGUAGES) {
    tags += `  <link rel="alternate" hreflang="${lang.code}" href="https://datacendia.com/${lang.code}/learn/${article}/">\n`;
  }
  tags += `  <link rel="alternate" hreflang="x-default" href="https://datacendia.com/learn/${article}/">`;
  return tags;
}

function generatePage(langCode, article, englishContent) {
  const nav = NAV[langCode];
  const meta = ARTICLE_META[article][langCode];
  const lang = LANGUAGES.find(l => l.code === langCode);

  // Extract the article body content from English (between <div class="learn-content"> and its closing)
  const contentStart = englishContent.indexOf('<div class="learn-content">');
  const contentEnd = englishContent.lastIndexOf('</div>\n    </div>\n    </main>');
  let articleContent = '';
  if (contentStart !== -1 && contentEnd !== -1) {
    articleContent = englishContent.substring(contentStart, contentEnd + 6);
  }

  // Extract definition-box if present (before learn-content)
  let definitionBox = '';
  const defStart = englishContent.indexOf('<div class="definition-box">');
  const defEnd = englishContent.indexOf('</div>', defStart);
  if (defStart !== -1 && defStart < contentStart) {
    definitionBox = englishContent.substring(defStart, defEnd + 6) + '\n\n      ';
  }

  // Extract warning-box if present
  let warningBox = '';
  const warnStart = englishContent.indexOf('<div class="warning-box">');
  if (warnStart !== -1 && warnStart < contentStart) {
    const warnEnd = englishContent.indexOf('</div>', warnStart);
    warningBox = englishContent.substring(warnStart, warnEnd + 6) + '\n\n      ';
  }

  // Extract the <style> block
  const styleStart = englishContent.indexOf('<style>');
  const styleEnd = englishContent.indexOf('</style>') + 8;
  const styleBlock = englishContent.substring(styleStart, styleEnd);

  return `<!DOCTYPE html>
<html lang="${langCode}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${meta.title} | Datacendia</title>
  <meta name="description" content="${meta.desc}">
  <meta name="author" content="Datacendia">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.desc}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://datacendia.com/${langCode}/learn/${article}/">
  <meta property="og:locale" content="${lang.locale}">
  <link rel="canonical" href="https://datacendia.com/${langCode}/learn/${article}/">
${generateHreflangTags(article)}
  <link rel="icon" type="image/svg+xml" href="../../../assets/favicon.svg">
  <meta name="theme-color" content="#0a0a0a">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../../styles.css">
  ${styleBlock}
</head>
<body>
  <div class="container">
    <header>
      <div class="header-top">
        <a href="../../" style="text-decoration: none;"><h1 class="logo"><span class="brand-name">DATACENDIA</span></h1></a>
      </div>
      <nav class="main-nav">
        <a href="/demos.html?lang=${langCode}">${nav.demos}</a>
        <a href="/verticals.html?lang=${langCode}">${nav.industries}</a>
        <a href="../">${nav.learn}</a>
        <a href="/pricing.html?lang=${langCode}">${nav.pricing}</a>
        <a href="/briefing.html?lang=${langCode}">${nav.briefing}</a>
      </nav>
    </header>

    <main class="learn-container">
      <nav class="learn-breadcrumb">
        <a href="../../">${nav.home}</a> / <a href="../">${nav.learn}</a> / ${meta.breadcrumb}
      </nav>

      <article>
        <h1 class="learn-title">${meta.h1}</h1>
        <p class="learn-subtitle">${meta.desc}</p>

        <div class="learn-meta">
          <span>${meta.readTime}</span>
          <span>${meta.category}</span>
        </div>

        ${warningBox}${definitionBox}${articleContent}
      </article>
    </main>

    <footer style="text-align: center; padding: 40px 24px; border-top: 1px solid var(--color-border); margin-top: 60px;">
      <p style="font-size: 0.75rem; color: var(--color-text-dim);">${nav.footer}</p>
    </footer>
  </div>
  <script src="../../../translations.js"></script>
  <script src="../../../app.js"></script>
</body>
</html>
`;
}

function main() {
  console.log('🌐 Building localized learn article pages...\n');
  let count = 0;

  for (const article of ARTICLES) {
    const enPath = path.join(ROOT_DIR, 'learn', article, 'index.html');
    if (!fs.existsSync(enPath)) {
      console.error(`✗ English source not found: ${enPath}`);
      continue;
    }
    const englishContent = fs.readFileSync(enPath, 'utf8');

    for (const lang of LANGUAGES) {
      try {
        const outDir = path.join(ROOT_DIR, lang.code, 'learn', article);
        const outFile = path.join(outDir, 'index.html');

        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir, { recursive: true });
        }

        const content = generatePage(lang.code, article, englishContent);
        fs.writeFileSync(outFile, content, 'utf8');
        console.log(`✓ ${lang.code}/learn/${article}/index.html (${(content.length / 1024).toFixed(1)} KB)`);
        count++;
      } catch (err) {
        console.error(`✗ ${lang.code}/learn/${article}: ${err.message}`);
      }
    }
  }

  console.log(`\n✅ Generated ${count} localized learn pages`);
}

main();
