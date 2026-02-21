// Script to generate translated redirect pages for all languages
// Run with: node scripts/generate-translations.js

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LANGS = ['ar','de','es','fr','hi','it','ja','ko','pt','zh'];

// Page definitions: [filename, { lang: [title, description] }]
const pages = {
  'privacy.html': {
    ar: ['سياسة الخصوصية', 'سياسة خصوصية Datacendia: كيف نحمي بياناتك ونتعامل معها.'],
    de: ['Datenschutzrichtlinie', 'Datacendia Datenschutzrichtlinie: Wie wir Ihre Daten schützen und verarbeiten.'],
    es: ['Política de Privacidad', 'Política de privacidad de Datacendia: cómo protegemos y manejamos sus datos.'],
    fr: ['Politique de Confidentialité', 'Politique de confidentialité Datacendia : comment nous protégeons et traitons vos données.'],
    hi: ['गोपनीयता नीति', 'Datacendia गोपनीयता नीति: हम आपके डेटा की सुरक्षा और प्रबंधन कैसे करते हैं।'],
    it: ['Informativa sulla Privacy', 'Informativa sulla privacy di Datacendia: come proteggiamo e gestiamo i tuoi dati.'],
    ja: ['プライバシーポリシー', 'Datacendiaプライバシーポリシー：お客様のデータの保護と取り扱いについて。'],
    ko: ['개인정보 보호정책', 'Datacendia 개인정보 보호정책: 귀하의 데이터를 보호하고 관리하는 방법.'],
    pt: ['Política de Privacidade', 'Política de privacidade da Datacendia: como protegemos e gerenciamos seus dados.'],
    zh: ['隐私政策', 'Datacendia隐私政策：我们如何保护和管理您的数据。']
  },
  'terms.html': {
    ar: ['شروط الخدمة', 'شروط خدمة Datacendia: الأحكام والشروط لاستخدام منصتنا.'],
    de: ['Nutzungsbedingungen', 'Datacendia Nutzungsbedingungen: Geschäftsbedingungen für die Nutzung unserer Plattform.'],
    es: ['Términos de Servicio', 'Términos de servicio de Datacendia: condiciones para el uso de nuestra plataforma.'],
    fr: ['Conditions d\'Utilisation', 'Conditions d\'utilisation Datacendia : termes et conditions d\'utilisation de notre plateforme.'],
    hi: ['सेवा की शर्तें', 'Datacendia सेवा की शर्तें: हमारे प्लेटफ़ॉर्म के उपयोग के लिए नियम और शर्तें।'],
    it: ['Termini di Servizio', 'Termini di servizio di Datacendia: condizioni per l\'utilizzo della nostra piattaforma.'],
    ja: ['利用規約', 'Datacendia利用規約：プラットフォーム利用の条件。'],
    ko: ['서비스 약관', 'Datacendia 서비스 약관: 플랫폼 사용을 위한 이용약관.'],
    pt: ['Termos de Serviço', 'Termos de serviço da Datacendia: condições para uso da nossa plataforma.'],
    zh: ['服务条款', 'Datacendia服务条款：使用我们平台的条款和条件。']
  },
  'changelog.html': {
    ar: ['سجل التغييرات', 'سجل تغييرات Datacendia: الميزات الجديدة والتحسينات والتحديثات.'],
    de: ['Änderungsprotokoll', 'Datacendia Änderungsprotokoll: Neue Funktionen, Verbesserungen und Updates.'],
    es: ['Registro de Cambios', 'Registro de cambios de Datacendia: nuevas funciones, mejoras y actualizaciones.'],
    fr: ['Journal des Modifications', 'Journal des modifications Datacendia : nouvelles fonctionnalités, améliorations et mises à jour.'],
    hi: ['परिवर्तन लॉग', 'Datacendia परिवर्तन लॉग: नई सुविधाएँ, सुधार और अपडेट।'],
    it: ['Registro delle Modifiche', 'Registro delle modifiche di Datacendia: nuove funzionalità, miglioramenti e aggiornamenti.'],
    ja: ['変更履歴', 'Datacendia変更履歴：新機能、改善、アップデート。'],
    ko: ['변경 이력', 'Datacendia 변경 이력: 새로운 기능, 개선 사항 및 업데이트.'],
    pt: ['Registro de Alterações', 'Registro de alterações da Datacendia: novos recursos, melhorias e atualizações.'],
    zh: ['更新日志', 'Datacendia更新日志：新功能、改进和更新。']
  },
  'partners.html': {
    ar: ['الشركاء', 'برنامج شركاء Datacendia: التكامل والتحالفات وشراكات القنوات.'],
    de: ['Partner', 'Datacendia Partnerprogramm: Integrationen, Allianzen und Vertriebspartnerschaften.'],
    es: ['Socios', 'Programa de socios de Datacendia: integraciones, alianzas y asociaciones de canal.'],
    fr: ['Partenaires', 'Programme partenaires Datacendia : intégrations, alliances et partenariats de distribution.'],
    hi: ['साझेदार', 'Datacendia साझेदार कार्यक्रम: एकीकरण, गठबंधन और चैनल साझेदारियाँ।'],
    it: ['Partner', 'Programma partner di Datacendia: integrazioni, alleanze e partnership di canale.'],
    ja: ['パートナー', 'Datacendiaパートナープログラム：インテグレーション、アライアンス、チャネルパートナーシップ。'],
    ko: ['파트너', 'Datacendia 파트너 프로그램: 통합, 제휴 및 채널 파트너십.'],
    pt: ['Parceiros', 'Programa de parceiros da Datacendia: integrações, alianças e parcerias de canal.'],
    zh: ['合作伙伴', 'Datacendia合作伙伴计划：集成、联盟和渠道合作。']
  },
  'briefing.html': {
    ar: ['طلب إحاطة', 'اطلب إحاطة تنفيذية حول منصة Datacendia للذكاء الاصطناعي المؤسسي.'],
    de: ['Briefing Anfordern', 'Fordern Sie ein Executive Briefing über die Datacendia Enterprise-KI-Plattform an.'],
    es: ['Solicitar Briefing', 'Solicite un briefing ejecutivo sobre la plataforma de IA empresarial Datacendia.'],
    fr: ['Demander un Briefing', 'Demandez un briefing exécutif sur la plateforme IA entreprise Datacendia.'],
    hi: ['ब्रीफिंग का अनुरोध', 'Datacendia एंटरप्राइज़ AI प्लेटफ़ॉर्म के बारे में एक कार्यकारी ब्रीफिंग का अनुरोध करें।'],
    it: ['Richiedi un Briefing', 'Richiedi un briefing esecutivo sulla piattaforma IA aziendale Datacendia.'],
    ja: ['ブリーフィングを依頼', 'DatacendiaエンタープライズAIプラットフォームに関するエグゼクティブブリーフィングをリクエスト。'],
    ko: ['브리핑 요청', 'Datacendia 엔터프라이즈 AI 플랫폼에 대한 임원 브리핑을 요청하세요.'],
    pt: ['Solicitar Briefing', 'Solicite um briefing executivo sobre a plataforma de IA empresarial Datacendia.'],
    zh: ['申请简报', '申请Datacendia企业AI平台的高管简报。']
  },
  'team.html': {
    ar: ['الفريق', 'تعرف على فريق قيادة Datacendia.'],
    de: ['Team', 'Lernen Sie das Datacendia-Führungsteam kennen.'],
    es: ['Equipo', 'Conozca al equipo de liderazgo de Datacendia.'],
    fr: ['Équipe', 'Découvrez l\'équipe de direction de Datacendia.'],
    hi: ['टीम', 'Datacendia नेतृत्व टीम से मिलें।'],
    it: ['Team', 'Scopri il team di leadership di Datacendia.'],
    ja: ['チーム', 'Datacendiaリーダーシップチームのご紹介。'],
    ko: ['팀', 'Datacendia 리더십 팀을 만나보세요.'],
    pt: ['Equipe', 'Conheça a equipe de liderança da Datacendia.'],
    zh: ['团队', '了解Datacendia领导团队。']
  },
  'manifesto.html': {
    ar: ['البيان', 'بيان Datacendia: مبادئنا وقيمنا ورؤيتنا للذكاء الاصطناعي المسؤول.'],
    de: ['Manifest', 'Das Datacendia Manifest: Unsere Prinzipien, Werte und Vision für verantwortungsvolle KI.'],
    es: ['Manifiesto', 'Manifiesto de Datacendia: nuestros principios, valores y visión para una IA responsable.'],
    fr: ['Manifeste', 'Manifeste Datacendia : nos principes, valeurs et vision pour une IA responsable.'],
    hi: ['घोषणापत्र', 'Datacendia घोषणापत्र: जिम्मेदार AI के लिए हमारे सिद्धांत, मूल्य और दृष्टिकोण।'],
    it: ['Manifesto', 'Manifesto di Datacendia: i nostri principi, valori e visione per un\'IA responsabile.'],
    ja: ['マニフェスト', 'Datacendiaマニフェスト：責任あるAIのための原則、価値観、ビジョン。'],
    ko: ['매니페스토', 'Datacendia 매니페스토: 책임 있는 AI를 위한 원칙, 가치 및 비전.'],
    pt: ['Manifesto', 'Manifesto da Datacendia: nossos princípios, valores e visão para IA responsável.'],
    zh: ['宣言', 'Datacendia宣言：我们对负责任AI的原则、价值观和愿景。']
  },
  'architecture.html': {
    ar: ['الهندسة المعمارية', 'الهندسة المعمارية التقنية لمنصة Datacendia: نشر معزول، وتشفير، وأمان على مستوى المؤسسات.'],
    de: ['Architektur', 'Technische Architektur der Datacendia-Plattform: Air-Gapped-Bereitstellung, Verschlüsselung und Enterprise-Sicherheit.'],
    es: ['Arquitectura', 'Arquitectura técnica de la plataforma Datacendia: despliegue air-gapped, cifrado y seguridad empresarial.'],
    fr: ['Architecture', 'Architecture technique de la plateforme Datacendia : déploiement air-gapped, chiffrement et sécurité entreprise.'],
    hi: ['आर्किटेक्चर', 'Datacendia प्लेटफ़ॉर्म तकनीकी आर्किटेक्चर: एयर-गैप्ड डिप्लॉयमेंट, एन्क्रिप्शन और एंटरप्राइज़ सुरक्षा।'],
    it: ['Architettura', 'Architettura tecnica della piattaforma Datacendia: distribuzione air-gapped, crittografia e sicurezza aziendale.'],
    ja: ['アーキテクチャ', 'Datacendiaプラットフォーム技術アーキテクチャ：エアギャップデプロイメント、暗号化、エンタープライズセキュリティ。'],
    ko: ['아키텍처', 'Datacendia 플랫폼 기술 아키텍처: 에어갭 배포, 암호화 및 엔터프라이즈 보안.'],
    pt: ['Arquitetura', 'Arquitetura técnica da plataforma Datacendia: implantação air-gapped, criptografia e segurança empresarial.'],
    zh: ['架构', 'Datacendia平台技术架构：气隙部署、加密和企业安全。']
  },
  'case-studies.html': {
    ar: ['دراسات الحالة', 'دراسات حالة Datacendia: نتائج حقيقية من برامج تجريبية في القطاعات المنظمة.'],
    de: ['Fallstudien', 'Datacendia Fallstudien: Echte Ergebnisse aus Pilotprogrammen in regulierten Branchen.'],
    es: ['Casos de Estudio', 'Casos de estudio de Datacendia: resultados reales de programas piloto en industrias reguladas.'],
    fr: ['Études de Cas', 'Études de cas Datacendia : résultats réels de programmes pilotes dans les industries réglementées.'],
    hi: ['केस स्टडी', 'Datacendia केस स्टडी: विनियमित उद्योगों में पायलट कार्यक्रमों से वास्तविक परिणाम।'],
    it: ['Casi di Studio', 'Casi di studio di Datacendia: risultati reali da programmi pilota in settori regolamentati.'],
    ja: ['ケーススタディ', 'Datacendiaケーススタディ：規制産業でのパイロットプログラムからの実績。'],
    ko: ['사례 연구', 'Datacendia 사례 연구: 규제 산업의 파일럿 프로그램에서 실제 결과.'],
    pt: ['Estudos de Caso', 'Estudos de caso da Datacendia: resultados reais de programas piloto em indústrias reguladas.'],
    zh: ['案例研究', 'Datacendia案例研究：受监管行业试点计划的真实成果。']
  },
  'api-docs.html': {
    ar: ['وثائق API', 'وثائق API لمنصة Datacendia: المراجع والنقاط النهائية والتكامل.'],
    de: ['API-Dokumentation', 'Datacendia Plattform API-Dokumentation: Referenzen, Endpunkte und Integration.'],
    es: ['Documentación API', 'Documentación de API de la plataforma Datacendia: referencias, endpoints e integración.'],
    fr: ['Documentation API', 'Documentation API de la plateforme Datacendia : références, endpoints et intégration.'],
    hi: ['API दस्तावेज़', 'Datacendia प्लेटफ़ॉर्म API दस्तावेज़: संदर्भ, एंडपॉइंट और एकीकरण।'],
    it: ['Documentazione API', 'Documentazione API della piattaforma Datacendia: riferimenti, endpoint e integrazione.'],
    ja: ['APIドキュメント', 'DatacendiaプラットフォームAPIドキュメント：リファレンス、エンドポイント、インテグレーション。'],
    ko: ['API 문서', 'Datacendia 플랫폼 API 문서: 참조, 엔드포인트 및 통합.'],
    pt: ['Documentação API', 'Documentação de API da plataforma Datacendia: referências, endpoints e integração.'],
    zh: ['API文档', 'Datacendia平台API文档：参考、端点和集成。']
  },
  'protocol.html': {
    ar: ['البروتوكول', 'بروتوكول Datacendia: كيف نبني ونختبر وننشر الذكاء الاصطناعي المؤسسي.'],
    de: ['Protokoll', 'Datacendia Protokoll: Wie wir Enterprise-KI entwickeln, testen und bereitstellen.'],
    es: ['Protocolo', 'Protocolo de Datacendia: cómo construimos, probamos y desplegamos IA empresarial.'],
    fr: ['Protocole', 'Protocole Datacendia : comment nous construisons, testons et déployons l\'IA entreprise.'],
    hi: ['प्रोटोकॉल', 'Datacendia प्रोटोकॉल: हम एंटरप्राइज़ AI कैसे बनाते, परीक्षण करते और डिप्लॉय करते हैं।'],
    it: ['Protocollo', 'Protocollo Datacendia: come costruiamo, testiamo e distribuiamo l\'IA aziendale.'],
    ja: ['プロトコル', 'Datacendiaプロトコル：エンタープライズAIの構築、テスト、デプロイ方法。'],
    ko: ['프로토콜', 'Datacendia 프로토콜: 엔터프라이즈 AI를 구축, 테스트 및 배포하는 방법.'],
    pt: ['Protocolo', 'Protocolo Datacendia: como construímos, testamos e implantamos IA empresarial.'],
    zh: ['协议', 'Datacendia协议：我们如何构建、测试和部署企业AI。']
  },
  'security-controls.html': {
    ar: ['ضوابط الأمان', 'ضوابط أمان Datacendia: التشفير، والتحكم في الوصول، ومعايير الأمان.'],
    de: ['Sicherheitskontrollen', 'Datacendia Sicherheitskontrollen: Verschlüsselung, Zugangskontrolle und Sicherheitsstandards.'],
    es: ['Controles de Seguridad', 'Controles de seguridad de Datacendia: cifrado, control de acceso y estándares de seguridad.'],
    fr: ['Contrôles de Sécurité', 'Contrôles de sécurité Datacendia : chiffrement, contrôle d\'accès et normes de sécurité.'],
    hi: ['सुरक्षा नियंत्रण', 'Datacendia सुरक्षा नियंत्रण: एन्क्रिप्शन, एक्सेस कंट्रोल और सुरक्षा मानक।'],
    it: ['Controlli di Sicurezza', 'Controlli di sicurezza di Datacendia: crittografia, controllo degli accessi e standard di sicurezza.'],
    ja: ['セキュリティコントロール', 'Datacendiaセキュリティコントロール：暗号化、アクセス制御、セキュリティ基準。'],
    ko: ['보안 제어', 'Datacendia 보안 제어: 암호화, 접근 제어 및 보안 표준.'],
    pt: ['Controles de Segurança', 'Controles de segurança da Datacendia: criptografia, controle de acesso e padrões de segurança.'],
    zh: ['安全控制', 'Datacendia安全控制：加密、访问控制和安全标准。']
  },
  'wargames.html': {
    ar: ['ألعاب الحرب', 'ألعاب الحرب لمحاكاة أزمات القرار: اختبر مرونة مؤسستك.'],
    de: ['War Games', 'Entscheidungskrisen-Simulationswargames: Testen Sie die Resilienz Ihres Unternehmens.'],
    es: ['War Games', 'War Games de simulación de crisis decisionales: pruebe la resiliencia de su organización.'],
    fr: ['War Games', 'War Games de simulation de crises décisionnelles : testez la résilience de votre organisation.'],
    hi: ['वॉर गेम्स', 'निर्णय संकट सिमुलेशन वॉर गेम्स: अपने संगठन की लचीलापन का परीक्षण करें।'],
    it: ['War Games', 'War Games di simulazione delle crisi decisionali: testa la resilienza della tua organizzazione.'],
    ja: ['ウォーゲーム', '意思決定危機シミュレーションウォーゲーム：組織のレジリエンスをテスト。'],
    ko: ['워 게임', '의사결정 위기 시뮬레이션 워 게임: 조직의 회복력을 테스트하세요.'],
    pt: ['War Games', 'War Games de simulação de crises decisórias: teste a resiliência da sua organização.'],
    zh: ['兵棋推演', '决策危机模拟兵棋推演：测试您组织的韧性。']
  },
  'honesty-matrices.html': {
    ar: ['مصفوفات الصدق', 'مصفوفات صدق Datacendia: شفافية كاملة حول ما يعمل وما لا يعمل.'],
    de: ['Ehrlichkeitsmatrizen', 'Datacendia Ehrlichkeitsmatrizen: Volle Transparenz darüber, was funktioniert und was nicht.'],
    es: ['Matrices de Honestidad', 'Matrices de honestidad de Datacendia: transparencia total sobre qué funciona y qué no.'],
    fr: ['Matrices d\'Honnêteté', 'Matrices d\'honnêteté Datacendia : transparence totale sur ce qui fonctionne et ce qui ne fonctionne pas.'],
    hi: ['ईमानदारी मैट्रिक्स', 'Datacendia ईमानदारी मैट्रिक्स: क्या काम करता है और क्या नहीं, इसकी पूर्ण पारदर्शिता।'],
    it: ['Matrici di Onestà', 'Matrici di onestà di Datacendia: piena trasparenza su cosa funziona e cosa no.'],
    ja: ['正直マトリックス', 'Datacendia正直マトリックス：何が機能し、何が機能しないかの完全な透明性。'],
    ko: ['정직 매트릭스', 'Datacendia 정직 매트릭스: 무엇이 작동하고 무엇이 작동하지 않는지에 대한 완전한 투명성.'],
    pt: ['Matrizes de Honestidade', 'Matrizes de honestidade da Datacendia: total transparência sobre o que funciona e o que não funciona.'],
    zh: ['诚实矩阵', 'Datacendia诚实矩阵：关于什么有效、什么无效的完全透明。']
  },
  'diagrams.html': {
    ar: ['الرسوم البيانية', 'رسوم بيانية لهندسة منصة Datacendia ومكوناتها.'],
    de: ['Diagramme', 'Diagramme der Datacendia-Plattformarchitektur und -komponenten.'],
    es: ['Diagramas', 'Diagramas de la arquitectura y componentes de la plataforma Datacendia.'],
    fr: ['Diagrammes', 'Diagrammes de l\'architecture et des composants de la plateforme Datacendia.'],
    hi: ['आरेख', 'Datacendia प्लेटफ़ॉर्म आर्किटेक्चर और घटकों के आरेख।'],
    it: ['Diagrammi', 'Diagrammi dell\'architettura e dei componenti della piattaforma Datacendia.'],
    ja: ['ダイアグラム', 'Datacendiaプラットフォームアーキテクチャとコンポーネントのダイアグラム。'],
    ko: ['다이어그램', 'Datacendia 플랫폼 아키텍처 및 구성 요소 다이어그램.'],
    pt: ['Diagramas', 'Diagramas da arquitetura e componentes da plataforma Datacendia.'],
    zh: ['图表', 'Datacendia平台架构和组件图表。']
  },
  'dgi.html': {
    ar: ['DGI — حوكمة الذكاء القراري', 'إطار عمل حوكمة الذكاء القراري (DGI): الحوكمة والمساءلة للذكاء الاصطناعي المؤسسي.'],
    de: ['DGI — Decision Governance Intelligence', 'Das Decision Governance Intelligence (DGI) Framework: Governance und Verantwortlichkeit für Enterprise-KI.'],
    es: ['DGI — Inteligencia de Gobernanza Decisional', 'El marco de Inteligencia de Gobernanza Decisional (DGI): gobernanza y rendición de cuentas para IA empresarial.'],
    fr: ['DGI — Intelligence de Gouvernance Décisionnelle', 'Le cadre d\'Intelligence de Gouvernance Décisionnelle (DGI) : gouvernance et responsabilité pour l\'IA entreprise.'],
    hi: ['DGI — निर्णय शासन बुद्धिमत्ता', 'निर्णय शासन बुद्धिमत्ता (DGI) फ्रेमवर्क: एंटरप्राइज़ AI के लिए शासन और जवाबदेही।'],
    it: ['DGI — Intelligence di Governance Decisionale', 'Il framework di Intelligence di Governance Decisionale (DGI): governance e responsabilità per l\'IA aziendale.'],
    ja: ['DGI — 意思決定ガバナンスインテリジェンス', '意思決定ガバナンスインテリジェンス（DGI）フレームワーク：エンタープライズAIのガバナンスと説明責任。'],
    ko: ['DGI — 의사결정 거버넌스 인텔리전스', '의사결정 거버넌스 인텔리전스(DGI) 프레임워크: 엔터프라이즈 AI를 위한 거버넌스와 책임.'],
    pt: ['DGI — Inteligência de Governança Decisória', 'O framework de Inteligência de Governança Decisória (DGI): governança e responsabilidade para IA empresarial.'],
    zh: ['DGI — 决策治理智能', '决策治理智能（DGI）框架：企业AI的治理和问责。']
  },
  'dgi-dcii-comparison.html': {
    ar: ['مقارنة DGI و DCII', 'مقارنة بين إطاري DGI وDCII: الفروق والتكامل والاستخدامات.'],
    de: ['DGI vs DCII Vergleich', 'Vergleich der DGI- und DCII-Frameworks: Unterschiede, Komplementarität und Anwendungsfälle.'],
    es: ['Comparación DGI vs DCII', 'Comparación de los marcos DGI y DCII: diferencias, complementariedad y casos de uso.'],
    fr: ['Comparaison DGI vs DCII', 'Comparaison des cadres DGI et DCII : différences, complémentarité et cas d\'usage.'],
    hi: ['DGI vs DCII तुलना', 'DGI और DCII फ्रेमवर्क की तुलना: अंतर, पूरकता और उपयोग के मामले।'],
    it: ['Confronto DGI vs DCII', 'Confronto tra i framework DGI e DCII: differenze, complementarità e casi d\'uso.'],
    ja: ['DGI vs DCII比較', 'DGIとDCIIフレームワークの比較：違い、相互補完性、ユースケース。'],
    ko: ['DGI vs DCII 비교', 'DGI와 DCII 프레임워크 비교: 차이점, 상호보완성 및 사용 사례.'],
    pt: ['Comparação DGI vs DCII', 'Comparação dos frameworks DGI e DCII: diferenças, complementaridade e casos de uso.'],
    zh: ['DGI vs DCII对比', 'DGI和DCII框架对比：差异、互补性和使用场景。']
  },
  'platform-capabilities.html': {
    ar: ['قدرات المنصة', 'قدرات منصة Datacendia الكاملة: 12 ركيزة، و82 مسار API، وأكثر.'],
    de: ['Plattformfähigkeiten', 'Vollständige Datacendia-Plattformfähigkeiten: 12 Säulen, 82 API-Routen und mehr.'],
    es: ['Capacidades de la Plataforma', 'Capacidades completas de la plataforma Datacendia: 12 pilares, 82 rutas API y más.'],
    fr: ['Capacités de la Plateforme', 'Capacités complètes de la plateforme Datacendia : 12 piliers, 82 routes API et plus.'],
    hi: ['प्लेटफ़ॉर्म क्षमताएँ', 'Datacendia प्लेटफ़ॉर्म की पूर्ण क्षमताएँ: 12 स्तंभ, 82 API रूट और बहुत कुछ।'],
    it: ['Capacità della Piattaforma', 'Capacità complete della piattaforma Datacendia: 12 pilastri, 82 route API e altro.'],
    ja: ['プラットフォーム機能', 'Datacendiaプラットフォームの全機能：12の柱、82のAPIルート、その他。'],
    ko: ['플랫폼 기능', 'Datacendia 플랫폼 전체 기능: 12개 필러, 82개 API 라우트 및 기타.'],
    pt: ['Capacidades da Plataforma', 'Capacidades completas da plataforma Datacendia: 12 pilares, 82 rotas de API e mais.'],
    zh: ['平台能力', 'Datacendia平台完整能力：12个支柱、82个API路由及更多。']
  },
  'premium.html': {
    ar: ['المنتجات المميزة', 'منتجات Datacendia المميزة: حلول الذكاء الاصطناعي المتقدمة للمؤسسات.'],
    de: ['Premium-Produkte', 'Datacendia Premium-Produkte: Fortgeschrittene Enterprise-KI-Lösungen.'],
    es: ['Productos Premium', 'Productos premium de Datacendia: soluciones avanzadas de IA empresarial.'],
    fr: ['Produits Premium', 'Produits premium Datacendia : solutions avancées d\'IA entreprise.'],
    hi: ['प्रीमियम उत्पाद', 'Datacendia प्रीमियम उत्पाद: उन्नत एंटरप्राइज़ AI समाधान।'],
    it: ['Prodotti Premium', 'Prodotti premium di Datacendia: soluzioni avanzate di IA aziendale.'],
    ja: ['プレミアム製品', 'Datacendiaプレミアム製品：先進的なエンタープライズAIソリューション。'],
    ko: ['프리미엄 제품', 'Datacendia 프리미엄 제품: 고급 엔터프라이즈 AI 솔루션.'],
    pt: ['Produtos Premium', 'Produtos premium da Datacendia: soluções avançadas de IA empresarial.'],
    zh: ['高级产品', 'Datacendia高级产品：先进的企业AI解决方案。']
  },
  'roi-calculator.html': {
    ar: ['حاسبة العائد على الاستثمار', 'احسب العائد على الاستثمار لنشر Datacendia في مؤسستك.'],
    de: ['ROI-Rechner', 'Berechnen Sie den ROI der Datacendia-Bereitstellung in Ihrem Unternehmen.'],
    es: ['Calculadora de ROI', 'Calcule el ROI del despliegue de Datacendia en su organización.'],
    fr: ['Calculateur de ROI', 'Calculez le ROI du déploiement de Datacendia dans votre organisation.'],
    hi: ['ROI कैलकुलेटर', 'अपने संगठन में Datacendia डिप्लॉयमेंट के ROI की गणना करें।'],
    it: ['Calcolatore ROI', 'Calcola il ROI dell\'implementazione di Datacendia nella tua organizzazione.'],
    ja: ['ROI計算機', 'お客様の組織でのDatacendiaデプロイメントのROIを計算。'],
    ko: ['ROI 계산기', '조직에서 Datacendia 배포의 ROI를 계산하세요.'],
    pt: ['Calculadora de ROI', 'Calcule o ROI da implantação da Datacendia em sua organização.'],
    zh: ['ROI计算器', '计算您组织中部署Datacendia的投资回报率。']
  },
  'verticals.html': {
    ar: ['القطاعات', 'حلول Datacendia للقطاعات: بنية هيمنة صناعية عبر 29 قطاعاً.'],
    de: ['Branchen', 'Datacendia Branchenlösungen: Branchen-Dominanz-Infrastruktur über 29 Vertikalen.'],
    es: ['Verticales', 'Soluciones verticales de Datacendia: infraestructura de dominio industrial en 29 verticales.'],
    fr: ['Verticaux', 'Solutions verticales Datacendia : infrastructure de domination industrielle sur 29 verticaux.'],
    hi: ['वर्टिकल', 'Datacendia वर्टिकल समाधान: 29 वर्टिकल में उद्योग प्रभुत्व बुनियादी ढांचा।'],
    it: ['Verticali', 'Soluzioni verticali di Datacendia: infrastruttura di dominio industriale su 29 verticali.'],
    ja: ['バーティカル', 'Datacendiaバーティカルソリューション：29業種にわたる業界支配インフラストラクチャ。'],
    ko: ['버티컬', 'Datacendia 버티컬 솔루션: 29개 버티컬에 걸친 산업 지배 인프라.'],
    pt: ['Verticais', 'Soluções verticais da Datacendia: infraestrutura de domínio industrial em 29 verticais.'],
    zh: ['垂直行业', 'Datacendia垂直行业解决方案：覆盖29个垂直行业的产业主导基础设施。']
  },
  'hospitality.html': {
    ar: ['الضيافة', 'حلول Datacendia للذكاء الاصطناعي في قطاع الضيافة: تحسين القرارات للفنادق والمنتجعات.'],
    de: ['Gastgewerbe', 'Datacendia KI-Lösungen für das Gastgewerbe: Entscheidungsoptimierung für Hotels und Resorts.'],
    es: ['Hostelería', 'Soluciones de IA de Datacendia para hostelería: optimización de decisiones para hoteles y resorts.'],
    fr: ['Hôtellerie', 'Solutions IA Datacendia pour l\'hôtellerie : optimisation des décisions pour hôtels et complexes.'],
    hi: ['आतिथ्य', 'Datacendia आतिथ्य AI समाधान: होटलों और रिसॉर्ट्स के लिए निर्णय अनुकूलन।'],
    it: ['Ospitalità', 'Soluzioni IA Datacendia per l\'ospitalità: ottimizzazione delle decisioni per hotel e resort.'],
    ja: ['ホスピタリティ', 'Datacendiaホスピタリティ向けAIソリューション：ホテル・リゾートの意思決定最適化。'],
    ko: ['호스피탈리티', 'Datacendia 호스피탈리티 AI 솔루션: 호텔 및 리조트의 의사결정 최적화.'],
    pt: ['Hospitalidade', 'Soluções de IA da Datacendia para hospitalidade: otimização de decisões para hotéis e resorts.'],
    zh: ['酒店业', 'Datacendia酒店业AI解决方案：酒店和度假村的决策优化。']
  },
  'trading.html': {
    ar: ['التداول', 'حلول Datacendia للذكاء الاصطناعي في التداول: ذكاء القرار للأسواق المالية.'],
    de: ['Trading', 'Datacendia KI-Lösungen für den Handel: Entscheidungsintelligenz für Finanzmärkte.'],
    es: ['Trading', 'Soluciones de IA de Datacendia para trading: inteligencia decisional para mercados financieros.'],
    fr: ['Trading', 'Solutions IA Datacendia pour le trading : intelligence décisionnelle pour les marchés financiers.'],
    hi: ['ट्रेडिंग', 'Datacendia ट्रेडिंग AI समाधान: वित्तीय बाजारों के लिए निर्णय बुद्धिमत्ता।'],
    it: ['Trading', 'Soluzioni IA Datacendia per il trading: intelligenza decisionale per i mercati finanziari.'],
    ja: ['トレーディング', 'Datacendiaトレーディング向けAIソリューション：金融市場の意思決定インテリジェンス。'],
    ko: ['트레이딩', 'Datacendia 트레이딩 AI 솔루션: 금융 시장을 위한 의사결정 인텔리전스.'],
    pt: ['Trading', 'Soluções de IA da Datacendia para trading: inteligência decisória para mercados financeiros.'],
    zh: ['交易', 'Datacendia交易AI解决方案：金融市场的决策智能。']
  },
  '404.html': {
    ar: ['الصفحة غير موجودة', 'الصفحة التي تبحث عنها غير موجودة.'],
    de: ['Seite nicht gefunden', 'Die gesuchte Seite wurde nicht gefunden.'],
    es: ['Página no encontrada', 'La página que busca no se ha encontrado.'],
    fr: ['Page non trouvée', 'La page que vous recherchez est introuvable.'],
    hi: ['पृष्ठ नहीं मिला', 'आप जो पृष्ठ ढूंढ रहे हैं वह नहीं मिला।'],
    it: ['Pagina non trovata', 'La pagina che stai cercando non è stata trovata.'],
    ja: ['ページが見つかりません', 'お探しのページは見つかりませんでした。'],
    ko: ['페이지를 찾을 수 없습니다', '찾고 있는 페이지를 찾을 수 없습니다.'],
    pt: ['Página não encontrada', 'A página que você procura não foi encontrada.'],
    zh: ['页面未找到', '您查找的页面未找到。']
  }
};

const redirectText = {
  ar: 'جارٍ إعادة التوجيه...',
  de: 'Weiterleitung...',
  es: 'Redirigiendo...',
  fr: 'Redirection...',
  hi: 'पुनर्निर्देशित हो रहा है...',
  it: 'Reindirizzamento...',
  ja: 'リダイレクト中...',
  ko: '리디렉션 중...',
  pt: 'Redirecionando...',
  zh: '正在重定向...'
};

const clickHere = {
  ar: 'اضغط هنا',
  de: 'Klicken Sie hier',
  es: 'Haga clic aquí',
  fr: 'Cliquez ici',
  hi: 'यहाँ क्लिक करें',
  it: 'Clicca qui',
  ja: 'こちらをクリック',
  ko: '여기를 클릭하세요',
  pt: 'Clique aqui',
  zh: '点击这里'
};

let created = 0;
let skipped = 0;

for (const [filename, translations] of Object.entries(pages)) {
  for (const lang of LANGS) {
    const [title, desc] = translations[lang];
    const dir = lang === 'ar' ? `dir="rtl"` : '';
    const targetDir = path.join(ROOT, lang);
    const targetFile = path.join(targetDir, filename);
    
    if (fs.existsSync(targetFile)) {
      skipped++;
      continue;
    }

    const url = `/${filename}?lang=${lang}`;
    const html = `<!DOCTYPE html>
<html lang="${lang}"${dir ? ' ' + dir : ''}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Datacendia</title>
  <meta name="description" content="${desc}">
  <meta http-equiv="refresh" content="0;url=${url}">
  <link rel="canonical" href="https://datacendia.com${url}">
  <meta property="og:title" content="${title} — Datacendia">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://datacendia.com/${lang}/${filename}">
  <meta property="og:image" content="https://datacendia.com/og-image.png">
  <meta property="og:site_name" content="Datacendia">
</head>
<body><p>${redirectText[lang]} <a href="${url}">${clickHere[lang]}</a></p></body>
</html>
`;

    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.writeFileSync(targetFile, html, 'utf8');
    created++;
  }
}

console.log(`Done. Created: ${created}, Skipped (already exist): ${skipped}`);
