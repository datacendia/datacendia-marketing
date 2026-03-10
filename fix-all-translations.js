/**
 * COMPREHENSIVE TRANSLATION FIX SCRIPT
 * 
 * Part 1: Add 19 missing keys to ALL translation JSON files
 * Part 2: Fix remaining English text in language index pages
 * Part 3: Fix Italian Leadership link
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const LANGS = ['ar','de','es','fr','hi','it','ja','ko','pt','zh'];

// ============================================================
// PART 1: Add missing keys to all translation JSON files
// ============================================================

const missingKeys = {
  en: {
    iissBenefit1: '<strong>Insurance carriers:</strong> Projected 20–40% premium reduction for scores >800 <em style="font-size:0.75em; color:var(--color-text-dim);">(target — not yet verified by carriers)</em>',
    iissBenefit2: '<strong>Institutional investors:</strong> ESG funds targeting scores >700 <em style="font-size:0.75em; color:var(--color-text-dim);">(projected threshold)</em>',
    iissBenefit3: '<strong>Regulators:</strong> Scores >850 designed for streamlined review eligibility',
    iissBenefit4: '<strong>Competition:</strong> "What\'s your IISS?" becomes the question',
    newsletterPlaceholder: 'your@email.com',
    trustIso42001Desc: 'AI Management Systems. Self-attested conformance statement published (not third-party audited).',
    trustIso42001Status: 'Self-Attested · <a href="trust/iso-42001-conformance.pdf" style="color: inherit;">PDF</a>',
    trustNistRmfDesc: 'AI Risk Management Framework. GOVERN, MAP, MEASURE, MANAGE functions mapped (self-attested).',
    trustNistRmfStatus: 'Self-Attested · <a href="trust/nist-ai-rmf-alignment.pdf" style="color: inherit;">PDF</a>',
    trustEuAiActDesc: 'Regulation (EU) 2024/1689. Articles 5–15 mapped, deployer obligations addressed (self-attested).',
    trustEuAiActStatus: 'Self-Attested · <a href="trust/eu-ai-act-conformance.pdf" style="color: inherit;">PDF</a>',
    trustCmmcDesc: 'Cybersecurity Maturity Model Certification. Architecture supports Level 2 (Advanced) controls for CUI protection. Level 3 (Expert) pathway documented for defense contractors.',
    trustCmmcStatus: 'Architecture-Ready',
    trustHipaaDesc: 'PHI never processed by Datacendia — runs entirely on customer infrastructure. BAA available for private cloud deployments where applicable.',
    trustHipaaStatus: 'Architecture-Aligned',
    trustResDcii: 'DCII Framework',
    trustResWargames: 'War Games',
    trustResCaseStudies: 'Case Studies',
    trustResRoi: 'ROI Calculator',
  },
  ar: {
    iissBenefit1: '<strong>شركات التأمين:</strong> تخفيض أقساط متوقع 20-40% للدرجات >800 <em style="font-size:0.75em; color:var(--color-text-dim);">(هدف — لم يتم التحقق منه بعد من قبل شركات التأمين)</em>',
    iissBenefit2: '<strong>المستثمرون المؤسسيون:</strong> صناديق ESG تستهدف درجات >700 <em style="font-size:0.75em; color:var(--color-text-dim);">(عتبة متوقعة)</em>',
    iissBenefit3: '<strong>الجهات التنظيمية:</strong> درجات >850 مصممة لأهلية المراجعة المبسطة',
    iissBenefit4: '<strong>المنافسة:</strong> "ما هي درجة IISS الخاصة بك؟" يصبح السؤال',
    newsletterPlaceholder: 'بريدك@email.com',
    trustIso42001Desc: 'أنظمة إدارة الذكاء الاصطناعي. بيان مطابقة ذاتي منشور (غير مدقق من طرف ثالث).',
    trustIso42001Status: 'تصديق ذاتي · <a href="trust/iso-42001-conformance.pdf" style="color: inherit;">PDF</a>',
    trustNistRmfDesc: 'إطار إدارة مخاطر الذكاء الاصطناعي. تم تعيين وظائف الحوكمة والتخطيط والقياس والإدارة (تصديق ذاتي).',
    trustNistRmfStatus: 'تصديق ذاتي · <a href="trust/nist-ai-rmf-alignment.pdf" style="color: inherit;">PDF</a>',
    trustEuAiActDesc: 'اللائحة (EU) 2024/1689. تم تعيين المواد 5-15، ومعالجة التزامات الناشر (تصديق ذاتي).',
    trustEuAiActStatus: 'تصديق ذاتي · <a href="trust/eu-ai-act-conformance.pdf" style="color: inherit;">PDF</a>',
    trustCmmcDesc: 'شهادة نموذج نضج الأمن السيبراني. البنية تدعم ضوابط المستوى 2 (متقدم) لحماية CUI. مسار المستوى 3 (خبير) موثق لمقاولي الدفاع.',
    trustCmmcStatus: 'جاهز معمارياً',
    trustHipaaDesc: 'لا تتم معالجة PHI بواسطة Datacendia — يعمل بالكامل على البنية التحتية للعميل. BAA متاح لعمليات النشر السحابية الخاصة عند الاقتضاء.',
    trustHipaaStatus: 'متوافق معمارياً',
    trustResDcii: 'إطار DCII',
    trustResWargames: 'ألعاب الحرب',
    trustResCaseStudies: 'دراسات الحالة',
    trustResRoi: 'حاسبة العائد على الاستثمار',
  },
  de: {
    iissBenefit1: '<strong>Versicherungsträger:</strong> Prognostizierte 20–40% Prämienreduzierung für Scores >800 <em style="font-size:0.75em; color:var(--color-text-dim);">(Ziel — noch nicht von Versicherern verifiziert)</em>',
    iissBenefit2: '<strong>Institutionelle Investoren:</strong> ESG-Fonds zielen auf Scores >700 <em style="font-size:0.75em; color:var(--color-text-dim);">(prognostizierter Schwellenwert)</em>',
    iissBenefit3: '<strong>Regulierungsbehörden:</strong> Scores >850 für vereinfachte Prüfungsberechtigung konzipiert',
    iissBenefit4: '<strong>Wettbewerb:</strong> „Was ist Ihr IISS?" wird zur entscheidenden Frage',
    newsletterPlaceholder: 'ihre@email.com',
    trustIso42001Desc: 'KI-Managementsysteme. Selbstbestätigte Konformitätserklärung veröffentlicht (nicht von Dritten geprüft).',
    trustIso42001Status: 'Selbstbestätigt · <a href="trust/iso-42001-conformance.pdf" style="color: inherit;">PDF</a>',
    trustNistRmfDesc: 'KI-Risikomanagement-Framework. GOVERN-, MAP-, MEASURE-, MANAGE-Funktionen abgebildet (selbstbestätigt).',
    trustNistRmfStatus: 'Selbstbestätigt · <a href="trust/nist-ai-rmf-alignment.pdf" style="color: inherit;">PDF</a>',
    trustEuAiActDesc: 'Verordnung (EU) 2024/1689. Artikel 5–15 abgebildet, Betreiberpflichten adressiert (selbstbestätigt).',
    trustEuAiActStatus: 'Selbstbestätigt · <a href="trust/eu-ai-act-conformance.pdf" style="color: inherit;">PDF</a>',
    trustCmmcDesc: 'Cybersecurity Maturity Model Certification. Architektur unterstützt Level 2 (Advanced) Kontrollen zum CUI-Schutz. Level 3 (Expert) Pfad für Verteidigungsauftragnehmer dokumentiert.',
    trustCmmcStatus: 'Architektur-bereit',
    trustHipaaDesc: 'PHI wird nie von Datacendia verarbeitet — läuft vollständig auf der Kundeninfrastruktur. BAA verfügbar für Private-Cloud-Deployments wo zutreffend.',
    trustHipaaStatus: 'Architektur-konform',
    trustResDcii: 'DCII-Framework',
    trustResWargames: 'Kriegsspiele',
    trustResCaseStudies: 'Fallstudien',
    trustResRoi: 'ROI-Rechner',
  },
  es: {
    iissBenefit1: '<strong>Aseguradoras:</strong> Reducción de primas proyectada del 20–40% para puntuaciones >800 <em style="font-size:0.75em; color:var(--color-text-dim);">(objetivo — aún no verificado por aseguradoras)</em>',
    iissBenefit2: '<strong>Inversores institucionales:</strong> Fondos ESG apuntando a puntuaciones >700 <em style="font-size:0.75em; color:var(--color-text-dim);">(umbral proyectado)</em>',
    iissBenefit3: '<strong>Reguladores:</strong> Puntuaciones >850 diseñadas para elegibilidad de revisión simplificada',
    iissBenefit4: '<strong>Competencia:</strong> "¿Cuál es tu IISS?" se convierte en la pregunta',
    newsletterPlaceholder: 'tu@email.com',
    trustIso42001Desc: 'Sistemas de Gestión de IA. Declaración de conformidad autoatestada publicada (no auditada por terceros).',
    trustIso42001Status: 'Autoatestado · <a href="trust/iso-42001-conformance.pdf" style="color: inherit;">PDF</a>',
    trustNistRmfDesc: 'Marco de Gestión de Riesgos de IA. Funciones GOVERN, MAP, MEASURE, MANAGE mapeadas (autoatestado).',
    trustNistRmfStatus: 'Autoatestado · <a href="trust/nist-ai-rmf-alignment.pdf" style="color: inherit;">PDF</a>',
    trustEuAiActDesc: 'Regulación (UE) 2024/1689. Artículos 5–15 mapeados, obligaciones del implementador abordadas (autoatestado).',
    trustEuAiActStatus: 'Autoatestado · <a href="trust/eu-ai-act-conformance.pdf" style="color: inherit;">PDF</a>',
    trustCmmcDesc: 'Certificación del Modelo de Madurez de Ciberseguridad. La arquitectura soporta controles de Nivel 2 (Avanzado) para protección CUI. Ruta de Nivel 3 (Experto) documentada para contratistas de defensa.',
    trustCmmcStatus: 'Listo arquitectónicamente',
    trustHipaaDesc: 'PHI nunca es procesada por Datacendia — se ejecuta completamente en la infraestructura del cliente. BAA disponible para despliegues en nube privada cuando corresponda.',
    trustHipaaStatus: 'Alineado arquitectónicamente',
    trustResDcii: 'Marco DCII',
    trustResWargames: 'Juegos de Guerra',
    trustResCaseStudies: 'Estudios de Caso',
    trustResRoi: 'Calculadora de ROI',
  },
  fr: {
    iissBenefit1: '<strong>Assureurs :</strong> Réduction de prime projetée de 20–40% pour les scores >800 <em style="font-size:0.75em; color:var(--color-text-dim);">(objectif — pas encore vérifié par les assureurs)</em>',
    iissBenefit2: '<strong>Investisseurs institutionnels :</strong> Fonds ESG ciblant les scores >700 <em style="font-size:0.75em; color:var(--color-text-dim);">(seuil projeté)</em>',
    iissBenefit3: '<strong>Régulateurs :</strong> Scores >850 conçus pour l\'éligibilité à l\'examen simplifié',
    iissBenefit4: '<strong>Concurrence :</strong> « Quel est votre IISS ? » devient la question',
    newsletterPlaceholder: 'votre@email.com',
    trustIso42001Desc: 'Systèmes de gestion de l\'IA. Déclaration de conformité auto-attestée publiée (non auditée par un tiers).',
    trustIso42001Status: 'Auto-attesté · <a href="trust/iso-42001-conformance.pdf" style="color: inherit;">PDF</a>',
    trustNistRmfDesc: 'Cadre de gestion des risques IA. Fonctions GOVERN, MAP, MEASURE, MANAGE mappées (auto-attesté).',
    trustNistRmfStatus: 'Auto-attesté · <a href="trust/nist-ai-rmf-alignment.pdf" style="color: inherit;">PDF</a>',
    trustEuAiActDesc: 'Règlement (UE) 2024/1689. Articles 5–15 mappés, obligations du déployeur traitées (auto-attesté).',
    trustEuAiActStatus: 'Auto-attesté · <a href="trust/eu-ai-act-conformance.pdf" style="color: inherit;">PDF</a>',
    trustCmmcDesc: 'Certification du modèle de maturité en cybersécurité. L\'architecture prend en charge les contrôles de niveau 2 (Avancé) pour la protection CUI. Parcours niveau 3 (Expert) documenté pour les sous-traitants de la défense.',
    trustCmmcStatus: 'Prêt architecturalement',
    trustHipaaDesc: 'PHI jamais traité par Datacendia — fonctionne entièrement sur l\'infrastructure du client. BAA disponible pour les déploiements en cloud privé le cas échéant.',
    trustHipaaStatus: 'Aligné architecturalement',
    trustResDcii: 'Cadre DCII',
    trustResWargames: 'Jeux de Guerre',
    trustResCaseStudies: 'Études de Cas',
    trustResRoi: 'Calculateur de ROI',
  },
  hi: {
    iissBenefit1: '<strong>बीमा वाहक:</strong> >800 स्कोर के लिए 20-40% प्रीमियम कटौती का अनुमान <em style="font-size:0.75em; color:var(--color-text-dim);">(लक्ष्य — अभी तक बीमाकर्ताओं द्वारा सत्यापित नहीं)</em>',
    iissBenefit2: '<strong>संस्थागत निवेशक:</strong> ESG फंड >700 स्कोर लक्षित कर रहे हैं <em style="font-size:0.75em; color:var(--color-text-dim);">(अनुमानित सीमा)</em>',
    iissBenefit3: '<strong>नियामक:</strong> >850 स्कोर सरलीकृत समीक्षा पात्रता के लिए डिज़ाइन किए गए',
    iissBenefit4: '<strong>प्रतिस्पर्धा:</strong> "आपका IISS क्या है?" यह सवाल बन जाता है',
    newsletterPlaceholder: 'आपका@email.com',
    trustIso42001Desc: 'AI प्रबंधन प्रणालियाँ। स्व-प्रमाणित अनुरूपता विवरण प्रकाशित (तृतीय-पक्ष द्वारा ऑडिट नहीं किया गया)।',
    trustIso42001Status: 'स्व-प्रमाणित · <a href="trust/iso-42001-conformance.pdf" style="color: inherit;">PDF</a>',
    trustNistRmfDesc: 'AI जोखिम प्रबंधन फ्रेमवर्क। GOVERN, MAP, MEASURE, MANAGE कार्य मैप किए गए (स्व-प्रमाणित)।',
    trustNistRmfStatus: 'स्व-प्रमाणित · <a href="trust/nist-ai-rmf-alignment.pdf" style="color: inherit;">PDF</a>',
    trustEuAiActDesc: 'विनियमन (EU) 2024/1689। अनुच्छेद 5-15 मैप किए गए, तैनातकर्ता दायित्व संबोधित (स्व-प्रमाणित)।',
    trustEuAiActStatus: 'स्व-प्रमाणित · <a href="trust/eu-ai-act-conformance.pdf" style="color: inherit;">PDF</a>',
    trustCmmcDesc: 'साइबर सुरक्षा परिपक्वता मॉडल प्रमाणन। आर्किटेक्चर CUI सुरक्षा के लिए स्तर 2 (उन्नत) नियंत्रणों का समर्थन करता है। रक्षा ठेकेदारों के लिए स्तर 3 (विशेषज्ञ) पथ प्रलेखित।',
    trustCmmcStatus: 'आर्किटेक्चर-तैयार',
    trustHipaaDesc: 'PHI कभी Datacendia द्वारा संसाधित नहीं — पूरी तरह ग्राहक बुनियादी ढांचे पर चलता है। जहां लागू हो, निजी क्लाउड तैनाती के लिए BAA उपलब्ध।',
    trustHipaaStatus: 'आर्किटेक्चर-संरेखित',
    trustResDcii: 'DCII फ्रेमवर्क',
    trustResWargames: 'वॉर गेम्स',
    trustResCaseStudies: 'केस स्टडीज़',
    trustResRoi: 'ROI कैलकुलेटर',
  },
  it: {
    iissBenefit1: '<strong>Compagnie assicurative:</strong> Riduzione dei premi prevista del 20–40% per punteggi >800 <em style="font-size:0.75em; color:var(--color-text-dim);">(obiettivo — non ancora verificato dagli assicuratori)</em>',
    iissBenefit2: '<strong>Investitori istituzionali:</strong> Fondi ESG che mirano a punteggi >700 <em style="font-size:0.75em; color:var(--color-text-dim);">(soglia prevista)</em>',
    iissBenefit3: '<strong>Regolatori:</strong> Punteggi >850 progettati per l\'idoneità alla revisione semplificata',
    iissBenefit4: '<strong>Concorrenza:</strong> "Qual è il tuo IISS?" diventa la domanda',
    newsletterPlaceholder: 'tua@email.com',
    trustIso42001Desc: 'Sistemi di gestione dell\'IA. Dichiarazione di conformità auto-attestata pubblicata (non verificata da terzi).',
    trustIso42001Status: 'Auto-attestato · <a href="trust/iso-42001-conformance.pdf" style="color: inherit;">PDF</a>',
    trustNistRmfDesc: 'Framework di gestione dei rischi IA. Funzioni GOVERN, MAP, MEASURE, MANAGE mappate (auto-attestato).',
    trustNistRmfStatus: 'Auto-attestato · <a href="trust/nist-ai-rmf-alignment.pdf" style="color: inherit;">PDF</a>',
    trustEuAiActDesc: 'Regolamento (UE) 2024/1689. Articoli 5–15 mappati, obblighi del deployer affrontati (auto-attestato).',
    trustEuAiActStatus: 'Auto-attestato · <a href="trust/eu-ai-act-conformance.pdf" style="color: inherit;">PDF</a>',
    trustCmmcDesc: 'Certificazione del Modello di Maturità della Cybersicurezza. L\'architettura supporta i controlli di Livello 2 (Avanzato) per la protezione CUI. Percorso Livello 3 (Esperto) documentato per appaltatori della difesa.',
    trustCmmcStatus: 'Pronto architetturalmente',
    trustHipaaDesc: 'PHI mai elaborato da Datacendia — funziona interamente sull\'infrastruttura del cliente. BAA disponibile per implementazioni cloud private dove applicabile.',
    trustHipaaStatus: 'Allineato architetturalmente',
    trustResDcii: 'Framework DCII',
    trustResWargames: 'Giochi di Guerra',
    trustResCaseStudies: 'Casi di Studio',
    trustResRoi: 'Calcolatore ROI',
  },
  ja: {
    iissBenefit1: '<strong>保険会社：</strong> スコア>800で20〜40%の保険料削減を予測 <em style="font-size:0.75em; color:var(--color-text-dim);">(目標 — 保険会社によるまだ未検証)</em>',
    iissBenefit2: '<strong>機関投資家：</strong> ESGファンドがスコア>700を目標 <em style="font-size:0.75em; color:var(--color-text-dim);">(予測閾値)</em>',
    iissBenefit3: '<strong>規制当局：</strong> スコア>850は簡素化された審査適格性のために設計',
    iissBenefit4: '<strong>競争：</strong>「あなたのIISSは？」が問いになる',
    newsletterPlaceholder: 'あなた@email.com',
    trustIso42001Desc: 'AI管理システム。自己証明適合性声明を公開（第三者監査なし）。',
    trustIso42001Status: '自己証明 · <a href="trust/iso-42001-conformance.pdf" style="color: inherit;">PDF</a>',
    trustNistRmfDesc: 'AIリスク管理フレームワーク。GOVERN、MAP、MEASURE、MANAGE機能をマッピング（自己証明）。',
    trustNistRmfStatus: '自己証明 · <a href="trust/nist-ai-rmf-alignment.pdf" style="color: inherit;">PDF</a>',
    trustEuAiActDesc: '規則(EU) 2024/1689。第5〜15条をマッピング、展開者義務に対応（自己証明）。',
    trustEuAiActStatus: '自己証明 · <a href="trust/eu-ai-act-conformance.pdf" style="color: inherit;">PDF</a>',
    trustCmmcDesc: 'サイバーセキュリティ成熟度モデル認証。アーキテクチャはCUI保護のためのレベル2（上級）コントロールをサポート。防衛請負業者向けレベル3（エキスパート）パスを文書化。',
    trustCmmcStatus: 'アーキテクチャ対応',
    trustHipaaDesc: 'PHIはDatacendiaでは処理されません — 完全に顧客インフラ上で実行。該当する場合、プライベートクラウド展開にBAA利用可能。',
    trustHipaaStatus: 'アーキテクチャ整合',
    trustResDcii: 'DCIIフレームワーク',
    trustResWargames: 'ウォーゲーム',
    trustResCaseStudies: 'ケーススタディ',
    trustResRoi: 'ROI計算機',
  },
  ko: {
    iissBenefit1: '<strong>보험사:</strong> 점수 >800에 대해 20–40% 보험료 절감 예상 <em style="font-size:0.75em; color:var(--color-text-dim);">(목표 — 아직 보험사에 의해 검증되지 않음)</em>',
    iissBenefit2: '<strong>기관 투자자:</strong> ESG 펀드가 점수 >700 목표 <em style="font-size:0.75em; color:var(--color-text-dim);">(예상 임계값)</em>',
    iissBenefit3: '<strong>규제 기관:</strong> 점수 >850은 간소화된 검토 자격을 위해 설계',
    iissBenefit4: '<strong>경쟁:</strong> "당신의 IISS는?" 이 핵심 질문이 됩니다',
    newsletterPlaceholder: '당신@email.com',
    trustIso42001Desc: 'AI 관리 시스템. 자체 증명 적합성 선언서 게시(제3자 감사 아님).',
    trustIso42001Status: '자체 증명 · <a href="trust/iso-42001-conformance.pdf" style="color: inherit;">PDF</a>',
    trustNistRmfDesc: 'AI 리스크 관리 프레임워크. GOVERN, MAP, MEASURE, MANAGE 기능 매핑(자체 증명).',
    trustNistRmfStatus: '자체 증명 · <a href="trust/nist-ai-rmf-alignment.pdf" style="color: inherit;">PDF</a>',
    trustEuAiActDesc: '규정(EU) 2024/1689. 제5–15조 매핑, 배포자 의무 처리(자체 증명).',
    trustEuAiActStatus: '자체 증명 · <a href="trust/eu-ai-act-conformance.pdf" style="color: inherit;">PDF</a>',
    trustCmmcDesc: '사이버보안 성숙도 모델 인증. 아키텍처가 CUI 보호를 위한 레벨 2(고급) 컨트롤 지원. 방위 계약업체를 위한 레벨 3(전문가) 경로 문서화.',
    trustCmmcStatus: '아키텍처 준비',
    trustHipaaDesc: 'PHI는 Datacendia에서 처리되지 않음 — 전적으로 고객 인프라에서 실행. 해당하는 경우 프라이빗 클라우드 배포에 BAA 제공.',
    trustHipaaStatus: '아키텍처 정렬',
    trustResDcii: 'DCII 프레임워크',
    trustResWargames: '워 게임',
    trustResCaseStudies: '사례 연구',
    trustResRoi: 'ROI 계산기',
  },
  pt: {
    iissBenefit1: '<strong>Seguradoras:</strong> Redução de prêmio projetada de 20–40% para scores >800 <em style="font-size:0.75em; color:var(--color-text-dim);">(meta — ainda não verificado por seguradoras)</em>',
    iissBenefit2: '<strong>Investidores institucionais:</strong> Fundos ESG visando scores >700 <em style="font-size:0.75em; color:var(--color-text-dim);">(limite projetado)</em>',
    iissBenefit3: '<strong>Reguladores:</strong> Scores >850 projetados para elegibilidade de revisão simplificada',
    iissBenefit4: '<strong>Concorrência:</strong> "Qual é o seu IISS?" se torna a pergunta',
    newsletterPlaceholder: 'seu@email.com',
    trustIso42001Desc: 'Sistemas de Gestão de IA. Declaração de conformidade autoatestada publicada (não auditada por terceiros).',
    trustIso42001Status: 'Autoatestado · <a href="trust/iso-42001-conformance.pdf" style="color: inherit;">PDF</a>',
    trustNistRmfDesc: 'Framework de Gestão de Riscos de IA. Funções GOVERN, MAP, MEASURE, MANAGE mapeadas (autoatestado).',
    trustNistRmfStatus: 'Autoatestado · <a href="trust/nist-ai-rmf-alignment.pdf" style="color: inherit;">PDF</a>',
    trustEuAiActDesc: 'Regulamento (UE) 2024/1689. Artigos 5–15 mapeados, obrigações do implantador abordadas (autoatestado).',
    trustEuAiActStatus: 'Autoatestado · <a href="trust/eu-ai-act-conformance.pdf" style="color: inherit;">PDF</a>',
    trustCmmcDesc: 'Certificação do Modelo de Maturidade em Cibersegurança. Arquitetura suporta controles de Nível 2 (Avançado) para proteção CUI. Caminho de Nível 3 (Especialista) documentado para empreiteiros de defesa.',
    trustCmmcStatus: 'Pronto arquiteturalmente',
    trustHipaaDesc: 'PHI nunca processado pela Datacendia — roda inteiramente na infraestrutura do cliente. BAA disponível para implantações em nuvem privada quando aplicável.',
    trustHipaaStatus: 'Alinhado arquiteturalmente',
    trustResDcii: 'Framework DCII',
    trustResWargames: 'Jogos de Guerra',
    trustResCaseStudies: 'Estudos de Caso',
    trustResRoi: 'Calculadora de ROI',
  },
  zh: {
    iissBenefit1: '<strong>保险公司：</strong> 预计对>800分降低20-40%保费 <em style="font-size:0.75em; color:var(--color-text-dim);">（目标——尚未经保险公司验证）</em>',
    iissBenefit2: '<strong>机构投资者：</strong> ESG基金目标分数>700 <em style="font-size:0.75em; color:var(--color-text-dim);">（预计阈值）</em>',
    iissBenefit3: '<strong>监管机构：</strong> >850分设计用于简化审查资格',
    iissBenefit4: '<strong>竞争：</strong> "你的IISS是多少？"成为核心问题',
    newsletterPlaceholder: '您的@email.com',
    trustIso42001Desc: 'AI管理系统。已发布自我证明合规声明（非第三方审计）。',
    trustIso42001Status: '自我证明 · <a href="trust/iso-42001-conformance.pdf" style="color: inherit;">PDF</a>',
    trustNistRmfDesc: 'AI风险管理框架。GOVERN、MAP、MEASURE、MANAGE功能已映射（自我证明）。',
    trustNistRmfStatus: '自我证明 · <a href="trust/nist-ai-rmf-alignment.pdf" style="color: inherit;">PDF</a>',
    trustEuAiActDesc: '法规(EU) 2024/1689。第5-15条已映射，部署者义务已处理（自我证明）。',
    trustEuAiActStatus: '自我证明 · <a href="trust/eu-ai-act-conformance.pdf" style="color: inherit;">PDF</a>',
    trustCmmcDesc: '网络安全成熟度模型认证。架构支持CUI保护的二级（高级）控制。为国防承包商记录了三级（专家）路径。',
    trustCmmcStatus: '架构就绪',
    trustHipaaDesc: 'PHI从未由Datacendia处理——完全在客户基础设施上运行。适用时可为私有云部署提供BAA。',
    trustHipaaStatus: '架构对齐',
    trustResDcii: 'DCII框架',
    trustResWargames: '战争游戏',
    trustResCaseStudies: '案例研究',
    trustResRoi: 'ROI计算器',
  },
};

// Add missing keys to each translation JSON file
let totalKeysAdded = 0;
for (const lang of ['en', ...LANGS]) {
  const jsonPath = path.join(ROOT, 'translations', `${lang}.json`);
  let content = fs.readFileSync(jsonPath, 'utf8');
  
  const keysToAdd = missingKeys[lang];
  if (!keysToAdd) continue;
  
  // Check which keys are actually missing
  const fn = new Function(`return ${content}`);
  const obj = fn();
  const actuallyMissing = {};
  for (const [key, val] of Object.entries(keysToAdd)) {
    if (obj[key] === undefined) {
      actuallyMissing[key] = val;
    }
  }
  
  if (Object.keys(actuallyMissing).length === 0) {
    console.log(`  ${lang}.json: all keys already present`);
    continue;
  }
  
  // Build the entries to append before the closing }
  const entries = Object.entries(actuallyMissing).map(([k, v]) => {
    const escaped = v.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    return `    ${k}: '${escaped}'`;
  }).join(',\n');
  
  // Find the last } and insert before it
  const lastBrace = content.lastIndexOf('}');
  const before = content.substring(0, lastBrace).trimEnd();
  // Add comma after last existing entry if needed
  const needsComma = !before.endsWith(',');
  const newContent = before + (needsComma ? ',' : '') + '\n' + entries + '\n}';
  
  fs.writeFileSync(jsonPath, newContent, 'utf8');
  totalKeysAdded += Object.keys(actuallyMissing).length;
  console.log(`  ${lang}.json: added ${Object.keys(actuallyMissing).length} keys`);
}
console.log(`\nPart 1 complete: ${totalKeysAdded} total keys added across all JSON files\n`);

// ============================================================
// PART 2: Fix remaining English in language index pages
// ============================================================
console.log('--- Part 2: Fix remaining English in language index pages ---');

const indexTranslations = {
  ar: {
    'Cryptographic signing authority for all decisions. Every action signed with customer-owned keys (AWS KMS, Azure Key Vault, HashiCorp Vault, or local). We never see your keys. Non-repudiation guaranteed.':
      'سلطة التوقيع المشفر لجميع القرارات. كل إجراء موقع بمفاتيح يملكها العميل (AWS KMS, Azure Key Vault, HashiCorp Vault, أو محلية). نحن لا نرى مفاتيحك أبداً. عدم الإنكار مضمون.',
    'Unified evidence storage for decision packets, audit ledger, evidence bundles, and signed reports. Immutable, searchable, retention-policy compliant. Legal hold support for litigation.':
      'تخزين موحد للأدلة لحزم القرارات، سجل التدقيق، حزم الأدلة، والتقارير الموقعة. غير قابل للتغيير، قابل للبحث، متوافق مع سياسة الاحتفاظ. دعم الحجز القانوني للتقاضي.',
  },
  de: {
    'Cryptographic signing authority for all decisions. Every action signed with customer-owned keys (AWS KMS, Azure Key Vault, HashiCorp Vault, or local). We never see your keys. Non-repudiation guaranteed.':
      'Kryptographische Signaturautorität für alle Entscheidungen. Jede Aktion mit kundeneigenen Schlüsseln signiert (AWS KMS, Azure Key Vault, HashiCorp Vault oder lokal). Wir sehen Ihre Schlüssel nie. Nichtabstreitbarkeit garantiert.',
    'Unified evidence storage for decision packets, audit ledger, evidence bundles, and signed reports. Immutable, searchable, retention-policy compliant. Legal hold support for litigation.':
      'Einheitliche Beweisspeicherung für Entscheidungspakete, Prüfungsbuch, Beweisbündel und signierte Berichte. Unveränderlich, durchsuchbar, aufbewahrungsrichtlinienkonform. Unterstützung für rechtliche Aufbewahrung bei Rechtsstreitigkeiten.',
  },
  es: {
    'Cryptographic signing authority for all decisions. Every action signed with customer-owned keys (AWS KMS, Azure Key Vault, HashiCorp Vault, or local). We never see your keys. Non-repudiation guaranteed.':
      'Autoridad de firma criptográfica para todas las decisiones. Cada acción firmada con claves propiedad del cliente (AWS KMS, Azure Key Vault, HashiCorp Vault o local). Nunca vemos sus claves. No repudio garantizado.',
    'Unified evidence storage for decision packets, audit ledger, evidence bundles, and signed reports. Immutable, searchable, retention-policy compliant. Legal hold support for litigation.':
      'Almacenamiento unificado de evidencia para paquetes de decisiones, libro mayor de auditoría, paquetes de evidencia e informes firmados. Inmutable, buscable, compatible con políticas de retención. Soporte de retención legal para litigios.',
  },
  fr: {
    'Cryptographic signing authority for all decisions. Every action signed with customer-owned keys (AWS KMS, Azure Key Vault, HashiCorp Vault, or local). We never see your keys. Non-repudiation guaranteed.':
      'Autorité de signature cryptographique pour toutes les décisions. Chaque action signée avec des clés appartenant au client (AWS KMS, Azure Key Vault, HashiCorp Vault ou local). Nous ne voyons jamais vos clés. Non-répudiation garantie.',
    'Unified evidence storage for decision packets, audit ledger, evidence bundles, and signed reports. Immutable, searchable, retention-policy compliant. Legal hold support for litigation.':
      'Stockage unifié des preuves pour les paquets de décision, le registre d\'audit, les lots de preuves et les rapports signés. Immuable, recherchable, conforme aux politiques de rétention. Prise en charge de la conservation légale pour les litiges.',
  },
  hi: {
    'Cryptographic signing authority for all decisions. Every action signed with customer-owned keys (AWS KMS, Azure Key Vault, HashiCorp Vault, or local). We never see your keys. Non-repudiation guaranteed.':
      'सभी निर्णयों के लिए क्रिप्टोग्राफिक हस्ताक्षर प्राधिकरण। हर कार्रवाई ग्राहक-स्वामित्व वाली कुंजियों (AWS KMS, Azure Key Vault, HashiCorp Vault, या स्थानीय) से हस्ताक्षरित। हम कभी आपकी कुंजियाँ नहीं देखते। गैर-अस्वीकृति गारंटीकृत।',
    'Unified evidence storage for decision packets, audit ledger, evidence bundles, and signed reports. Immutable, searchable, retention-policy compliant. Legal hold support for litigation.':
      'निर्णय पैकेट, ऑडिट लेजर, साक्ष्य बंडल और हस्ताक्षरित रिपोर्ट के लिए एकीकृत साक्ष्य भंडारण। अपरिवर्तनीय, खोजने योग्य, प्रतिधारण-नीति अनुपालक। मुकदमेबाजी के लिए कानूनी होल्ड समर्थन।',
  },
  it: {
    'Cryptographic signing authority for all decisions. Every action signed with customer-owned keys (AWS KMS, Azure Key Vault, HashiCorp Vault, or local). We never see your keys. Non-repudiation guaranteed.':
      'Autorità di firma crittografica per tutte le decisioni. Ogni azione firmata con chiavi di proprietà del cliente (AWS KMS, Azure Key Vault, HashiCorp Vault o locale). Non vediamo mai le vostre chiavi. Non ripudio garantito.',
    'Unified evidence storage for decision packets, audit ledger, evidence bundles, and signed reports. Immutable, searchable, retention-policy compliant. Legal hold support for litigation.':
      'Archiviazione unificata delle prove per pacchetti di decisione, registro di audit, pacchetti di prove e report firmati. Immutabile, ricercabile, conforme alle politiche di conservazione. Supporto per il blocco legale per contenziosi.',
    '>Leadership</a>': '>Leadership</a>',
  },
  ja: {
    'Cryptographic signing authority for all decisions. Every action signed with customer-owned keys (AWS KMS, Azure Key Vault, HashiCorp Vault, or local). We never see your keys. Non-repudiation guaranteed.':
      'すべての決定に対する暗号署名権限。すべてのアクションが顧客所有のキー（AWS KMS、Azure Key Vault、HashiCorp Vault、またはローカル）で署名されます。お客様のキーを私たちが見ることはありません。否認防止保証。',
    'Unified evidence storage for decision packets, audit ledger, evidence bundles, and signed reports. Immutable, searchable, retention-policy compliant. Legal hold support for litigation.':
      '決定パケット、監査台帳、証拠バンドル、署名付きレポートの統合証拠ストレージ。不変、検索可能、保持ポリシー準拠。訴訟のための法的ホールドサポート。',
  },
  ko: {
    'Cryptographic signing authority for all decisions. Every action signed with customer-owned keys (AWS KMS, Azure Key Vault, HashiCorp Vault, or local). We never see your keys. Non-repudiation guaranteed.':
      '모든 결정에 대한 암호화 서명 권한. 모든 작업이 고객 소유 키(AWS KMS, Azure Key Vault, HashiCorp Vault 또는 로컬)로 서명됩니다. 우리는 귀하의 키를 절대 보지 않습니다. 부인 방지 보장.',
    'Unified evidence storage for decision packets, audit ledger, evidence bundles, and signed reports. Immutable, searchable, retention-policy compliant. Legal hold support for litigation.':
      '결정 패킷, 감사 원장, 증거 번들 및 서명된 보고서를 위한 통합 증거 저장소. 불변, 검색 가능, 보존 정책 준수. 소송을 위한 법적 보류 지원.',
  },
  pt: {
    'Cryptographic signing authority for all decisions. Every action signed with customer-owned keys (AWS KMS, Azure Key Vault, HashiCorp Vault, or local). We never see your keys. Non-repudiation guaranteed.':
      'Autoridade de assinatura criptográfica para todas as decisões. Cada ação assinada com chaves de propriedade do cliente (AWS KMS, Azure Key Vault, HashiCorp Vault ou local). Nunca vemos suas chaves. Não repúdio garantido.',
    'Unified evidence storage for decision packets, audit ledger, evidence bundles, and signed reports. Immutable, searchable, retention-policy compliant. Legal hold support for litigation.':
      'Armazenamento unificado de evidências para pacotes de decisão, livro-razão de auditoria, pacotes de evidências e relatórios assinados. Imutável, pesquisável, compatível com políticas de retenção. Suporte de retenção legal para litígios.',
  },
  zh: {
    'Cryptographic signing authority for all decisions. Every action signed with customer-owned keys (AWS KMS, Azure Key Vault, HashiCorp Vault, or local). We never see your keys. Non-repudiation guaranteed.':
      '所有决策的加密签名权限。每个操作均使用客户拥有的密钥（AWS KMS、Azure Key Vault、HashiCorp Vault或本地）签名。我们永远看不到您的密钥。不可否认性保证。',
    'Unified evidence storage for decision packets, audit ledger, evidence bundles, and signed reports. Immutable, searchable, retention-policy compliant. Legal hold support for litigation.':
      '决策数据包、审计分类账、证据包和签名报告的统一证据存储。不可变、可搜索、符合保留策略。诉讼法律保全支持。',
  },
};

// Fix Italian Leadership specifically
const itFixMap = {
  '>Leadership</a>': '>Dirigenza</a>',
};

let totalIndexFixes = 0;
for (const lang of LANGS) {
  const indexPath = path.join(ROOT, lang, 'index.html');
  if (!fs.existsSync(indexPath)) continue;
  
  let content = fs.readFileSync(indexPath, 'utf8');
  let fixes = 0;
  
  const map = indexTranslations[lang] || {};
  for (const [en, translated] of Object.entries(map)) {
    if (content.includes(en)) {
      content = content.replace(en, translated);
      fixes++;
    }
  }
  
  // Italian-specific fix
  if (lang === 'it') {
    for (const [en, translated] of Object.entries(itFixMap)) {
      if (content.includes(en)) {
        content = content.replace(en, translated);
        fixes++;
      }
    }
  }
  
  if (fixes > 0) {
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log(`  ${lang}/index.html: ${fixes} fixes`);
    totalIndexFixes += fixes;
  } else {
    console.log(`  ${lang}/index.html: already clean`);
  }
}

console.log(`\nPart 2 complete: ${totalIndexFixes} total fixes in language index pages\n`);
console.log('=== ALL FIXES APPLIED ===');
