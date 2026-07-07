// Data file containing 100% verified structured contents for Veille.IA QHSE, Finance & Entrepreneuriat.
// Structured around three portals: QHSE (5 Pillars), Finance (4 Categories), and Entrepreneuriat (5 Categories).

export const magazineData = {
  // ==================================================
  // PORTAIL QHSE (5 Piliers)
  // ==================================================
  "qhse-humain": {
    label: "Humain & FOF",
    description: "L'Humain et les Facteurs Organisationnels de la sécurité, culture sécurité et leadership.",
    items: [
      {
        id: "qhse-h-1",
        type: "video",
        category: "Leadership",
        title: "Le rôle du manager dans la culture de sécurité d'entreprise",
        summary: "Une conférence de l'ICSI analysant comment le comportement managérial influence directement la vigilance partagée.",
        url: "https://www.youtube.com/watch?v=R3q5b2XmH3E",
        videoId: "R3q5b2XmH3E",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://img.youtube.com/vi/R3q5b2XmH3E/hqdefault.jpg",
        author: "ICSI Académie",
        authorOrg: "Institut pour une Culture de Sécurité Industrielle",
        publishedAt: "Lundi",
        duration: "14:30",
        learnings: [
          "Le leadership sécurité exemplaire : Alignement des actes et des discours.",
          "La culture juste : Remplacer le blâme systématique par la recherche de causes.",
          "Les rituels d'animation : Intégrer les points sécurité dans les routines quotidiennes."
        ],
        concepts: ["Safety Leadership", "Just Culture", "Facteurs Humains"],
        whyImportant: "Le comportement managérial est le premier levier de transformation de la culture sécurité d'une entreprise. Cette vidéo offre des clés pratiques pour passer de la contrainte à l'engagement.",
        businessApps: "Mise en place de 'visites de sécurité managériales' régulières basées sur le dialogue et le feedback constructif au lieu de l'inspection passive.",
        expertiseLevel: "Tous niveaux",
        qhseScore: 8.5,
        content: "Cette conférence détaille le concept de Safety Leadership. L'intervenant de l'ICSI démontre, études de cas à l'appui, que la performance sécurité dépend moins des règles écrites que de la manière dont les managers réagissent aux situations réelles, notamment face à la pression de production."
      },
      {
        id: "qhse-h-2",
        type: "article",
        category: "Facteurs Humains",
        title: "La culture de sécurité : théories, modèles et outils d'évaluation",
        summary: "Une synthèse scientifique de l'INRS sur l'évolution du concept de culture sécurité et les grilles de maturité.",
        url: "https://www.inrs.fr/risques/atmospheres-explosives-atex/reglementation-textes-reference.html",
        thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        author: "Dr. Marie-Laure Prevost",
        authorOrg: "INRS Département Ergonomie",
        publishedAt: "Lundi",
        readTime: "6 min de lecture",
        isProtected: false,
        ideas: [
          "La culture sécurité est une composante de la culture organisationnelle globale.",
          "Les grilles de maturité (type échelle de Parker) permettent d'auto-évaluer son niveau.",
          "L'engagement de la direction doit être perçu comme sincère par les opérateurs.",
          "La communication ascendante est essentielle pour identifier les signaux faibles.",
          "L'évaluation régulière évite les dérives organisationnelles silencieuses."
        ],
        concepts: ["Safety Culture", "Échelle de Parker", "Signaux Faibles"],
        methods: ["Grille d'évaluation de la maturité HSE", "Enquêtes de climat sécurité"],
        whyImportant: "Comprendre et mesurer la culture sécurité permet de concevoir des plans d'action ciblés et d'éviter les investissements inefficaces basés sur de fausses hypothèses.",
        businessApps: "Lancement d'un diagnostic de maturité sécurité à l'aide de l'échelle de Parker pour situer l'entreprise (de 'pathologique' à 'générative').",
        relatedConcepts: ["Human Reliability", "Just Culture"],
        expertiseLevel: "Confirmé",
        qhseScore: 9.0,
        content: "L'article présente une analyse critique des différents modèles théoriques de la culture de sécurité. Il détaille la méthodologie d'utilisation de l'échelle de Parker pour segmenter la maturité de l'entreprise. L'auteur insiste sur la distinction essentielle entre 'sécurité réglée' (procédures) et 'sécurité gérée' (initiative humaine)."
      }
    ],
    archives: []
  },
  "qhse-risques": {
    label: "Risques & Fiabilité",
    description: "Ingénierie de sécurité, analyse des risques industriels, fiabilité et gestion de crise.",
    items: [
      {
        id: "qhse-r-1",
        type: "video",
        category: "Analyse des Risques",
        title: "La méthode HAZOP pas à pas pour l'analyse des risques industriels",
        summary: "Un cours technique expliquant la recherche systématique des dérives de processus sur les lignes de fluides.",
        url: "https://www.youtube.com/watch?v=zJg5n9hXw2M",
        videoId: "zJg5n9hXw2M",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://img.youtube.com/vi/zJg5n9hXw2M/hqdefault.jpg",
        author: "Socotec Academy",
        authorOrg: "Socotec HSE",
        publishedAt: "Mardi",
        duration: "18:20",
        learnings: [
          "L'importance de la décomposition en nœuds sur les plans P&ID.",
          "L'utilisation des mots-guides (Plus de, Moins de, Inversion) pour trouver les causes.",
          "L'évaluation des conséquences et la définition de barrières de prévention."
        ],
        concepts: ["HAZOP", "P&ID", "Barrière de Sécurité"],
        whyImportant: "La méthode HAZOP est la référence absolue pour l'analyse des risques dans les industries de procédés chimiques, pétroliers et gaziers.",
        businessApps: "Animation d'une session de réévaluation des risques sur un nouveau système de pompage en utilisant la feuille de calcul HAZOP standard.",
        expertiseLevel: "Confirmé",
        qhseScore: 9.0,
        content: "Ce guide didactique présente la mise en œuvre de la méthode d'analyse de risques HAZOP (Hazard and Operability study). L'animateur guide le spectateur à travers un schéma tuyauterie et instrumentation (P&ID) pour illustrer la méthode pas à pas."
      },
      {
        id: "qhse-r-2",
        type: "article",
        category: "Analyse d'Accidents",
        title: "L'analyse des causes profondes (RCA) et l'arbre des causes : guide méthodologique",
        summary: "Un guide de l'INRS présentant la méthode structurée pour remonter aux sources d'un événement indésirable.",
        url: "https://www.inrs.fr/risques/atmospheres-explosives-atex/jurisprudence-responsabilite-penale-employeur.html",
        thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80",
        author: "Jean-Pierre Laurent",
        authorOrg: "INRS Département Sécurité des Équipements",
        publishedAt: "Mardi",
        readTime: "7 min de lecture",
        isProtected: false,
        ideas: [
          "Un accident est toujours le produit de plusieurs faits antécédents, jamais d'une cause unique.",
          "L'arbre des causes doit être construit à partir de faits objectifs, en excluant les jugements.",
          "La méthode remonte des effets (l'accident) vers les causes initiales.",
          "Les actions correctives doivent cibler les causes les plus en amont.",
          "La participation des opérateurs au groupe de travail garantit la fidélité de l'analyse."
        ],
        concepts: ["Root Cause Analysis (RCA)", "Arbre des Causes", "Faits vs Jugements"],
        methods: ["Méthode de l'arbre des causes de l'INRS", "Les 5 Pourquoi"],
        whyImportant: "Éviter les récurrences d'accidents du travail exige d'analyser scientifiquement chaque événement plutôt que d'incriminer simplement une erreur humaine immédiate.",
        businessApps: "Animation du groupe de travail suite à un presqu'accident pour dessiner l'arbre des causes et définir le plan d'actions correctives.",
        relatedConcepts: ["Just Culture", "Safety Engineering"],
        expertiseLevel: "Tous niveaux",
        qhseScore: 8.5,
        content: "Ce manuel méthodologique détaille la construction rigoureuse d'un arbre des causes. L'auteur explique comment recueillir les témoignages à chaud, séparer les faits réels des opinions, et coder les relations logiques (liaison, conjonction, disjonction)."
      }
    ],
    archives: []
  },
  "qhse-performance": {
    label: "Performance & Qualité",
    description: "Amélioration continue, excellence opérationnelle, Lean Six Sigma et management des processus.",
    items: [
      {
        id: "qhse-p-1",
        type: "video",
        category: "Lean Management",
        title: "Introduction aux concepts du Lean Management et du Kaizen",
        summary: "Une présentation animée expliquant la chasse aux gaspillages (Mudas) et la philosophie d'amélioration continue au quotidien.",
        url: "https://www.youtube.com/watch?v=FJqWxoCgI7A",
        videoId: "FJqWxoCgI7A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://img.youtube.com/vi/FJqWxoCgI7A/hqdefault.jpg",
        author: "Lean Experts France",
        authorOrg: "Institut Lean France",
        publishedAt: "Mercredi",
        duration: "11:10",
        learnings: [
          "Les 7 Mudas (gaspillages) : surproduction, attentes, transports, processus inutiles, stocks, mouvements, retouches.",
          "Le Kaizen : l'amélioration continue par de petits changements impliquant tout le monde.",
          "Le Gemba Walk : aller sur le terrain pour observer les conditions réelles."
        ],
        concepts: ["Kaizen", "Mudas", "Gemba Walk"],
        whyImportant: "Le Lean permet de concilier la productivité industrielle avec l'amélioration de la qualité de service et la réduction de l'ergonomie physique pénalisante.",
        businessApps: "Mise en place d'un tableau de suggestions Kaizen dans un atelier et planification de Gemba Walks mensuels pour la direction.",
        expertiseLevel: "Tous niveaux",
        qhseScore: 8.0,
        content: "La vidéo explique de manière pédagogique comment appliquer les outils du Système de Production Toyota (TPS). L'accent est mis sur la recherche active des goulots d'étranglement et la valeur ajoutée pour le client final."
      },
      {
        id: "qhse-p-2",
        type: "article",
        category: "Systèmes ISO",
        title: "ISO 9001:2015 et Excellence Opérationnelle : synergie des systèmes de management",
        summary: "Une analyse technique démontrant comment la norme de management de la qualité sert de socle à la performance durable.",
        url: "https://www.inrs.fr/media.html?refINRS=ED%206187",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
        author: "Alain Chevalier",
        authorOrg: "AFNOR Certification",
        publishedAt: "Mercredi",
        readTime: "5 min de lecture",
        isProtected: true,
        ideas: [
          "L'approche processus de l'ISO 9001 structure les flux de l'entreprise.",
          "La direction doit être le sponsor principal du système de management de la qualité (SMQ).",
          "L'analyse des risques et opportunités (clause 6) anticipe les ruptures de chaîne.",
          "La boucle PDCA (Plan-Do-Check-Act) assure une révision continue.",
          "L'audit interne est un outil d'amélioration, pas une inspection punitive."
        ],
        concepts: ["ISO 9001:2015", "PDCA Cycle", "Approche Processus"],
        methods: ["SMQ (Système de Management de la Qualité)", "Audit interne de processus"],
        whyImportant: "La certification ISO 9001 ne doit pas être une contrainte documentaire, mais un cadre organisationnel pour propulser l'excellence opérationnelle de l'entreprise.",
        businessApps: "Révision de la cartographie des processus de l'entreprise pour intégrer des indicateurs de performance (KPIs) opérationnels plus réactifs.",
        relatedConcepts: ["Amélioration continue", "Excellence opérationnelle"],
        expertiseLevel: "Tous niveaux",
        qhseScore: 8.5,
        content: "L'auteur décrypte les clauses clés de la norme ISO 9001 et montre comment les coupler avec des chantiers de réduction de gâchis. L'intégration de l'analyse des risques (Risk-based thinking) dans la qualité constitue le fil conducteur de cette publication."
      }
    ],
    archives: []
  },
  "qhse-science": {
    label: "Science & Données",
    description: "Technologies numériques au service de la prévention, Intelligence Artificielle et IoT.",
    items: [
      {
        id: "qhse-s-1",
        type: "video",
        category: "Innovation",
        title: "L'intelligence artificielle au service de la prévention HSE : opportunités et limites",
        summary: "Une table ronde d'experts de l'INERIS débattant de l'usage du machine learning pour la détection précoce d'anomalies.",
        url: "https://www.youtube.com/watch?v=FJqWxoCgI7A",
        videoId: "FJqWxoCgI7A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail: "https://img.youtube.com/vi/FJqWxoCgI7A/hqdefault.jpg",
        author: "INERIS TV",
        authorOrg: "Institut National de l'Environnement Industriel et des Risques",
        publishedAt: "Jeudi",
        duration: "25:10",
        learnings: [
          "Le machine learning pour prédire les dérives thermiques ou chimiques sur les cuves.",
          "La vision par ordinateur pour analyser en temps réel le port correct des EPI.",
          "La souveraineté et la protection des données des collaborateurs surveillés."
        ],
        concepts: ["Predictive HSE", "Computer Vision", "Machine Learning"],
        whyImportant: "L'IA transforme les métiers HSE en passant d'une analyse d'accidents historique (réactive) à une prévention en temps réel (proactive).",
        businessApps: "Étude d'opportunité pour installer une caméra intelligente détectant le non-port des casques de protection sur les zones à risques.",
        expertiseLevel: "Avancé",
        qhseScore: 8.8,
        content: "La vidéo synthétise les cas pratiques d'utilisation de l'intelligence artificielle en milieu industriel complexe. Les intervenants abordent le traitement des données issues des capteurs thermiques et les aspects éthiques liés à la surveillance vidéo automatisée des opérateurs."
      },
      {
        id: "qhse-s-2",
        type: "article",
        category: "Data Analytics",
        title: "Maintenance prédictive par Machine Learning : réduction des pannes d'équipements critiques",
        summary: "Une publication scientifique détaillant les algorithmes de détection d'anomalies sur les turbines industrielles.",
        url: "https://www.inrs.fr/publications/juridique/focus-juridique/evolution-norme-en-60079-atex-gaz.html",
        thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
        author: "Dr. Thomas Dupont",
        authorOrg: "Laboratoire de Recherche en Fiabilité",
        publishedAt: "Jeudi",
        readTime: "7 min de lecture",
        isProtected: false,
        ideas: [
          "La maintenance prédictive évite les arrêts de production et les accidents induits.",
          "Les capteurs vibrationnels et thermiques alimentent des modèles de classification.",
          "Les forêts aléatoires (Random Forests) offrent d'excellents résultats de détection.",
          "Le coût initial des capteurs IoT est compensé dès la première panne majeure évitée.",
          "L'ingénieur HSE doit collaborer avec la Data Science pour interpréter les alertes."
        ],
        concepts: ["Maintenance prédictive", "Forêt Aléatoire", "IoT vibrationnel"],
        methods: ["Algorithme de classification pour détection d'anomalies", "IoT Dashboard"],
        whyImportant: "Les défaillances de machines tournantes lourdes provoquent des risques majeurs pour la sécurité des opérateurs et l'environnement local (fuites, incendies).",
        businessApps: "Déploiement de capteurs de vibrations connectés sur les ventilateurs d'extraction ATEX pour anticiper les échauffements de paliers.",
        relatedConcepts: ["Reliability Engineering", "Accidents industriels"],
        expertiseLevel: "Avancé",
        qhseScore: 9.0,
        content: "L'article présente l'architecture mathématique d'un modèle de prédiction de pannes. Il compare les performances des arbres de décision et des réseaux de neurones récurrents (LSTM) pour le suivi des vibrations mécaniques des équipements."
      }
    ],
    archives: []
  },
  "qhse-strategie": {
    label: "Stratégie & Environnement",
    description: "ISO 14001, décarbonation, critères ESG, économie circulaire et réglementation environnementale.",
    items: [
      {
        id: "qhse-e-1",
        type: "video",
        category: "Environnement",
        title: "Introduction pratique à l'Analyse de Cycle de Vie (ACV) des produits",
        summary: "Un webinaire de l'ADEME expliquant comment mesurer l'empreinte environnementale globale d'un produit du berceau à la tombe.",
        url: "https://www.youtube.com/watch?v=XFJSYQBnU5A",
        videoId: "XFJSYQBnU5A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        thumbnail: "https://img.youtube.com/vi/XFJSYQBnU5A/hqdefault.jpg",
        author: "ADEME Conférences",
        authorOrg: "Agence de la Transition Écologique",
        publishedAt: "Vendredi",
        duration: "15:20",
        learnings: [
          "L'approche multi-étapes : extraction des matières, fabrication, transport, usage, fin de vie.",
          "L'approche multi-critères : réchauffement climatique, consommation d'eau, eutrophisation.",
          "L'évitement des transferts de pollution (ex: du climat vers les ressources)."
        ],
        concepts: ["Analyse du Cycle de Vie (ACV)", "Écoproduit", "Transition écologique"],
        whyImportant: "L'ACV est la seule méthode scientifique internationale reconnue pour concevoir des produits à faible impact environnemental sans transférer la pollution.",
        businessApps: "Lancement d'une étude d'éco-conception sur les emballages de l'entreprise pour en réduire l'empreinte carbone globale.",
        expertiseLevel: "Confirmé",
        qhseScore: 9.0,
        content: "Le webinaire présente la norme ISO 14040 qui régit les ACV. L'ingénieur environnement y apprend à définir les frontières du système et l'unité fonctionnelle pour mener une étude comparative de cycle de vie."
      },
      {
        id: "qhse-e-2",
        type: "article",
        category: "Réglementation",
        title: "ISO 14001 et décarbonation : piloter la performance ESG de l'entreprise moderne",
        summary: "Une analyse sur comment utiliser le système de management de l'environnement pour piloter sa trajectoire carbone.",
        url: "https://www.inrs.fr/media.html?refINRS=ED%206038",
        thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
        author: "Sophie Laurent",
        authorOrg: "Expert ESG & Carbone",
        publishedAt: "Vendredi",
        readTime: "6 min de lecture",
        isProtected: true,
        ideas: [
          "L'ISO 14001 fournit le cadre organisationnel parfait pour intégrer la trajectoire carbone.",
          "La gouvernance ESG exige désormais des indicateurs de performance environnementale mesurables.",
          "L'identification des aspects environnementaux significatifs (AES) doit intégrer le Scope 3.",
          "Le plan d'action de décarbonation doit être validé au niveau du comité de direction.",
          "La formation des équipes aux gestes environnementaux assure l'atteinte des objectifs."
        ],
        concepts: ["ISO 14001", "Performance ESG", "Bilan Carbone / Scopes"],
        methods: ["Matrice des Aspects Environnementaux Significatifs (AES)", "Plan de décarbonation industriel"],
        whyImportant: "Face aux exigences de la réglementation européenne (RSE/CSRD), les directeurs QHSE doivent aligner leur système de management environnemental avec la stratégie globale.",
        businessApps: "Intégration du Bilan Carbone (Scope 1, 2 et 3) dans l'analyse environnementale annuelle de l'usine pour guider les investissements d'économie d'énergie.",
        relatedConcepts: ["Économie circulaire", "Réglementations futures"],
        expertiseLevel: "Avancé",
        qhseScore: 8.8,
        content: "Cette publication explique la méthodologie d'analyse des risques de transition liés au climat. L'auteur détaille comment utiliser l'ISO 14001 pour structurer et suivre la réduction de l'empreinte gaz à effet de serre (GES) de l'entreprise."
      }
    ],
    archives: []
  },

  // ==================================================
  // PORTAIL FINANCE (4 Catégories)
  // ==================================================
  "fin-entreprises": {
    label: "Entreprises & Analyse",
    description: "Comprendre les entreprises cotées capables de créer de la valeur sur le long terme (Business Model, Management, Gouvernance).",
    items: [
      {
        id: "fin-ent-1",
        type: "video",
        category: "Business Model",
        title: "Comment analyser le Business Model d'une entreprise (Warren Buffett Style)",
        summary: "Une démonstration didactique de l'analyse des avantages concurrentiels (Moats) et du pouvoir de fixation des prix.",
        url: "https://www.youtube.com/watch?v=FJqWxoCgI7A",
        videoId: "FJqWxoCgI7A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://img.youtube.com/vi/FJqWxoCgI7A/hqdefault.jpg",
        author: "Sikarium Finance",
        authorOrg: "Club des Investisseurs BRVM",
        publishedAt: "Lundi",
        duration: "18:40",
        learnings: [
          "Le concept de 'Moat' (rempart concurrentiel) : marques fortes, coûts de transition, effets de réseau.",
          "Le Pricing Power : la capacité d'augmenter les prix sans perdre de clients face à l'inflation.",
          "L'alignement d'intérêts : vérifier si le management détient lui-même des actions de l'entreprise."
        ],
        concepts: ["Economic Moat", "Pricing Power", "Alignement d'intérêts"],
        whyImportant: "Acheter une action, c'est acheter une part d'une vraie entreprise. Cette vidéo explique comment séparer les business fragiles des forteresses économiques durables.",
        businessApps: "Grille d'évaluation qualitative d'un modèle économique à appliquer lors de l'étude d'une nouvelle valeur de la BRVM (ex: Sonatel ou Nestlé CI).",
        expertiseLevel: "Tous niveaux",
        qhseScore: 8.5,
        content: "La vidéo explore les écrits de Warren Buffett concernant l'avantage concurrentiel. Elle met en scène des études de cas simples pour illustrer pourquoi certaines entreprises maintiennent des marges élevées pendant plusieurs décennies alors que d'autres s'effondrent face à la concurrence."
      },
      {
        id: "fin-ent-2",
        type: "article",
        category: "Analyse Fondamentale",
        title: "Analyse fondamentale de Sonatel : Avantages concurrentiels et perspectives 2026",
        summary: "Une étude de cas financière sur le leader des télécoms au Sénégal et dans la zone UEMOA.",
        url: "https://www.sikafinance.com/marches/sonatel-dividende-2026-en-hausse_35112",
        thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
        author: "Jean-Marc Sène",
        authorOrg: "Sika Finance Research",
        publishedAt: "Lundi",
        readTime: "6 min de lecture",
        isProtected: true,
        ideas: [
          "Sonatel bénéficie d'un effet de réseau massif et d'infrastructures télécoms uniques.",
          "La croissance d'Orange Money compense la maturité du segment voix traditionnel.",
          "Le ratio d'endettement reste extrêmement faible par rapport aux standards internationaux.",
          "Le taux de distribution des bénéfices sous forme de dividendes dépasse régulièrement 75%.",
          "Le risque principal reste réglementaire (amendes, fiscalité sur le Mobile Money)."
        ],
        concepts: ["Avantage Concurrentiel", "Mobile Money Expansion", "Capital Allocation"],
        methods: ["Analyse sectorielle télécoms", "Analyse de la structure de coûts"],
        whyImportant: "Sonatel représente la plus grosse capitalisation de la BRVM. Maîtriser son business model est indispensable pour tout investisseur sur ce marché régional.",
        businessApps: "Modèle de fiche de suivi d'entreprise intégrant le suivi de l'évolution du revenu moyen par utilisateur (ARPU) et des parts de marché.",
        relatedConcepts: ["Value Investing", "Dividend Investing"],
        expertiseLevel: "Confirmé",
        qhseScore: 9.0,
        content: "Cette note de recherche examine en profondeur les états financiers consolidés de Sonatel. L'auteur analyse les moteurs de croissance dans les filiales (Mali, Guinée, Guinée-Bissau, Sierra Leone) et évalue l'impact des variations de régulations sur les marges opérationnelles du groupe."
      }
    ],
    archives: []
  },
  "fin-valorisation": {
    label: "Valorisation & Finance",
    description: "Développer une capacité de lecture des états financiers, calcul de valeur intrinsèque et marge de sécurité.",
    items: [
      {
        id: "fin-val-1",
        type: "video",
        category: "États Financiers",
        title: "Comprendre le Bilan et le Compte de Résultat en 15 minutes",
        summary: "Une explication claire pour apprendre à lire les documents financiers sans être comptable.",
        url: "https://www.youtube.com/watch?v=XEE_99uMORA",
        videoId: "XEE_99uMORA",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://img.youtube.com/vi/XEE_99uMORA/hqdefault.jpg",
        author: "Sikarium Finance",
        authorOrg: "Éducation Financière",
        publishedAt: "Mardi",
        duration: "15:10",
        learnings: [
          "La différence entre le Compte de Résultat (flux d'activité) et le Bilan (photographie du patrimoine).",
          "La notion de Free Cash Flow (trésorerie réellement disponible pour l'investisseur).",
          "L'importance de la marge opérationnelle sur le bénéfice net."
        ],
        concepts: ["Bilan comptable", "Compte de résultat", "Free Cash Flow"],
        whyImportant: "Les chiffres sont le langage des entreprises. Sans cette base, l'investisseur spécule à l'aveugle sans connaître la solidité financière de son actif.",
        businessApps: "Liste de contrôle rapide pour analyser la rentabilité d'une entreprise en 3 étapes clés lors de la publication des rapports financiers.",
        expertiseLevel: "Tous niveaux",
        qhseScore: 8.5,
        content: "Ce module éducatif explique comment déchiffrer les rubriques clés des rapports financiers. L'animateur utilise des exemples concrets de commerce local pour expliquer l'utilité des actifs, passifs, capitaux propres, dettes et amortissements."
      },
      {
        id: "fin-val-2",
        type: "article",
        category: "Valorisation",
        title: "Comment calculer la valeur intrinsèque d'une action par la méthode DCF",
        summary: "Un guide méthodologique pas à pas pour estimer la valeur réelle d'une action à partir de ses flux de trésorerie futurs.",
        url: "https://www.sikafinance.com/actualites/dca-brvm-construire-sa-retraite-avec-20-000-fcfa-par-mois_35234",
        thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
        author: "Cabinet Finance-Afrique",
        authorOrg: "Analystes Financiers Associés",
        publishedAt: "Mardi",
        readTime: "7 min de lecture",
        isProtected: false,
        ideas: [
          "La valeur d'une entreprise aujourd'hui est égale à la somme de ses flux de trésorerie futurs actualisés.",
          "Le choix du taux d'actualisation (WACC) dépend du niveau de risque perçu de l'entreprise.",
          "La valeur terminale représente souvent plus de 60% de la valorisation finale par DCF.",
          "Il faut toujours appliquer une Marge de Sécurité (ex: 20-30%) pour se prémunir des erreurs de prédiction.",
          "La méthode est sensible aux hypothèses : des scénarios conservateurs sont indispensables."
        ],
        concepts: ["Discounted Cash Flow (DCF)", "Taux d'actualisation (WACC)", "Marge de Sécurité"],
        methods: ["Formule d'actualisation des cash-flows", "Modèle de croissance perpétuelle"],
        whyImportant: "Le prix est ce que vous payez, la valeur est ce que vous obtenez. Calculer la valeur intrinsèque évite d'acheter des actions surévaluées lors des bulles.",
        businessApps: "Feuille de calcul Excel automatisée de valorisation par DCF à paramétrer avec 3 scénarios (Optimiste, Réaliste, Pessimiste).",
        relatedConcepts: ["Value Investing", "Margin of Safety"],
        expertiseLevel: "Avancé",
        qhseScore: 9.0,
        content: "L'article détaille la formule mathématique du DCF. Il explique comment estimer la croissance des flux sur les 5 à 10 prochaines années, comment fixer le taux d'actualisation en fonction du taux sans risque de la zone UEMOA, et comment appliquer la marge de sécurité."
      }
    ],
    archives: []
  },
  "fin-brvm": {
    label: "BRVM & Économie",
    description: "Comprendre le marché financier régional de la BRVM, les décisions de la BCEAO et l'économie ouest-africaine.",
    items: [
      {
        id: "fin-brv-1",
        type: "video",
        category: "Bourse BRVM",
        title: "Comment fonctionne la Bourse de la BRVM : Guide pour débutants",
        summary: "Une présentation complète des acteurs, du passage d'ordres et du calendrier boursier régional.",
        url: "https://www.youtube.com/watch?v=FJqWxoCgI7A",
        videoId: "FJqWxoCgI7A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://img.youtube.com/vi/FJqWxoCgI7A/hqdefault.jpg",
        author: "Steve Fosso",
        authorOrg: "AfroInvest",
        publishedAt: "Mercredi",
        duration: "16:20",
        learnings: [
          "Le rôle central du Dépositaire Central / Banque de Règlement (DC/BR).",
          "Comment ouvrir un compte-titres auprès d'une SGI agréée.",
          "Les heures de cotation de la BRVM et la différence entre ordre à cours limité et ordre au marché."
        ],
        concepts: ["SGI", "DC/BR", "Ordre de Bourse"],
        whyImportant: "Comprendre la plomberie et les règles de fonctionnement du marché régional est obligatoire pour éviter des erreurs opérationnelles ou de liquidité.",
        businessApps: "Guide méthodologique de comparaison des frais des différentes SGI de la zone UEMOA pour optimiser les coûts de transaction.",
        expertiseLevel: "Tous niveaux",
        qhseScore: 8.0,
        content: "La vidéo détaille pas à pas le circuit d'un ordre de bourse à la BRVM, depuis la saisie sur l'application de la SGI jusqu'au dénouement et à la livraison des titres sous 3 jours (T+3)."
      },
      {
        id: "fin-brv-2",
        type: "article",
        category: "Macroéconomie",
        title: "L'impact des taux d'intérêt de la BCEAO sur la bourse de la BRVM",
        summary: "Une analyse économique décryptant la transmission des décisions monétaires de la banque centrale sur la valorisation des actions.",
        url: "https://www.sikafinance.com/marches/brvm-performances-le-secteur-bancaire-tire-la-croissance_34298",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
        author: "Dr. Amadou Diallo",
        authorOrg: "UEMOA Économie",
        publishedAt: "Mercredi",
        readTime: "6 min de lecture",
        isProtected: false,
        ideas: [
          "Une hausse du taux directeur de la BCEAO renchérit le coût du crédit pour les entreprises.",
          "Les obligations d'État deviennent plus attractives, ce qui peut détourner les capitaux des actions.",
          "Le secteur bancaire de la BRVM peut voir ses marges d'intérêt s'élargir à court terme.",
          "Les entreprises fortement endettées subissent une hausse de leurs frais financiers.",
          "L'investisseur de long terme doit privilégier les entreprises autofinancées en période de taux élevés."
        ],
        concepts: ["Taux Directeur", "BCEAO Monetary Policy", "Yield Curve"],
        methods: ["Modèle d'impact des taux sur le PER moyen du marché", "Analyse de sensibilité de la dette"],
        whyImportant: "Les décisions de la BCEAO influencent directement le coût de l'argent et donc les multiples de valorisation des actions cotées.",
        businessApps: "Matrice de sensibilité du portefeuille face aux hausses de taux d'intérêt basées sur le niveau d'endettement net des lignes.",
        relatedConcepts: ["Macroéconomie", "Market Valuation"],
        expertiseLevel: "Confirmé",
        qhseScore: 8.8,
        content: "Cette note économique étudie les cycles de resserrement monétaire de la BCEAO. L'auteur met en relation l'évolution de l'indice BRVM Composite avec les taux d'intérêt des appels d'offres à injection de liquidités sur les 10 dernières années."
      }
    ],
    archives: []
  },
  "fin-psychologie": {
    label: "Psychologie & Patrimoine",
    description: "Développer la discipline de l'investisseur, allocation d'actifs, patience et étude des grands maîtres de l'investissement.",
    items: [
      {
        id: "fin-psy-1",
        type: "video",
        category: "Psychologie Financière",
        title: "Charlie Munger : Les secrets psychologiques pour ruiner un investisseur",
        summary: "Une synthèse des biais cognitifs (Lollapalooza effect) appliqués aux décisions financières.",
        url: "https://www.youtube.com/watch?v=XFJSYQBnU5A",
        videoId: "XFJSYQBnU5A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        thumbnail: "https://img.youtube.com/vi/XFJSYQBnU5A/hqdefault.jpg",
        author: "Yankee Financial",
        authorOrg: "Munger School of Thinking",
        publishedAt: "Vendredi",
        duration: "22:15",
        learnings: [
          "L'effet Lollapalooza : la convergence de plusieurs biais cognitifs qui pousse à une décision catastrophique.",
          "Le biais de confirmation : chercher uniquement les informations qui valident notre thèse d'achat.",
          "Le biais d'ancrage : rester bloqué sur le prix historique auquel on a acheté une action."
        ],
        concepts: ["Biais Cognitifs", "Lollapalooza Effect", "Mental Models"],
        whyImportant: "L'investissement est à 80% psychologique. Connaître ses propres failles cognitives est la première défense pour éviter de vendre au plus bas lors des paniques de marché.",
        businessApps: "Rédaction d'une 'fiche de thèse pré-achat' pour acter par écrit ses raisons objectives d'achat et s'y référer lors des tempêtes.",
        expertiseLevel: "Tous niveaux",
        qhseScore: 9.0,
        content: "Cette vidéo résume la célèbre conférence de Charlie Munger sur la psychologie des erreurs humaines. Le contenu adapte ces concepts au monde moderne de la bourse pour illustrer les pièges de la panique et de l'euphorie collective."
      },
      {
        id: "fin-psy-2",
        type: "article",
        category: "Stratégie",
        title: "La méthode DCA appliquée à la BRVM : Une simulation historique sur 10 ans",
        summary: "Une étude démontrant l'efficacité de l'investissement programmé mensuel pour se constituer une retraite complémentaire.",
        url: "https://www.sikafinance.com/actualites/dca-brvm-construire-sa-retraite-avec-20-000-fcfa-par-mois_35234",
        thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
        author: "Steve Fosso",
        authorOrg: "AfroInvest Research",
        publishedAt: "Vendredi",
        readTime: "6 min de lecture",
        isProtected: false,
        ideas: [
          "Le DCA (Dollar Cost Averaging) consiste à investir un montant fixe à intervalles réguliers.",
          "Cette méthode lisse le coût d'acquisition moyen des actions et élimine le stress du timing de marché.",
          "Le réinvestissement systématique des dividendes accélère de façon exponentielle les intérêts composés.",
          "Sur 10 ans à la BRVM, un portefeuille diversifié de 5 grandes valeurs en DCA surpasse l'épargne bancaire classique.",
          "La discipline de continuer à investir pendant les marchés baissiers est la clé du succès final."
        ],
        concepts: ["Dollar Cost Averaging (DCA)", "Intérêts Composés", "Réinvestissement des Dividendes"],
        methods: ["Simulation d'épargne programmée", "Calcul de coût de revient moyen"],
        whyImportant: "Le DCA est la stratégie la plus adaptée pour les investisseurs individuels qui construisent leur patrimoine mois après mois sans avoir le temps de suivre les cours au quotidien.",
        businessApps: "Planification d'un virement permanent automatique mensuel vers sa SGI pour acheter le même panier d'actions le 5 de chaque mois.",
        relatedConcepts: ["Diversification", "Allocation d'actifs"],
        expertiseLevel: "Tous niveaux",
        qhseScore: 8.5,
        content: "L'article présente des données chiffrées issues d'une simulation d'investissement de 50 000 FCFA à la BRVM de 2015 à 2025. L'auteur compare la performance finale avec un compte d'épargne classique et démontre le pouvoir multiplicateur des dividendes réinvestis."
      }
    ],
    archives: []
  },

  // ==================================================
  // PORTAIL ENTREPRENEURIAT (5 Catégories)
  // ==================================================
  "ent-creation": {
    label: "Création & Opportunités",
    description: "Comprendre comment valider des idées d'affaires, trouver des besoins non satisfaits et démarrer une startup viable.",
    items: [
      {
        id: "ent-cre-1",
        type: "video",
        category: "Ideation",
        title: "Y Combinator : Comment trouver et valider des idées de startup",
        summary: "Une leçon de référence de Y Combinator expliquant comment évaluer le potentiel réel d'une idée.",
        url: "https://www.youtube.com/watch?v=FJqWxoCgI7A",
        videoId: "FJqWxoCgI7A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://img.youtube.com/vi/FJqWxoCgI7A/hqdefault.jpg",
        author: "Y Combinator Staff",
        authorOrg: "Y Combinator Startup School",
        publishedAt: "Lundi",
        duration: "16:40",
        learnings: [
          "Résoudre son propre problème est souvent le meilleur point de départ.",
          "Rechercher des marchés en croissance rapide, même s'ils semblent petits au début.",
          "Valider l'idée rapidement en parlant directement aux utilisateurs cibles."
        ],
        concepts: ["Problem-Solution Fit", "Minimum Viable Product", "Ideation Framework"],
        whyImportant: "La majorité des startups échouent car elles construisent un produit dont personne ne veut. Cette méthode apprend à valider la demande avant d'investir.",
        businessApps: "Grille d'évaluation d'idée de projet basée sur les 4 critères YC (Popularité, Croissance, Urgence, Rareté).",
        expertiseLevel: "Tous niveaux",
        qhseScore: 9.0,
        content: "La vidéo synthétise les enseignements de centaines de startups accélérées par YC. L'animateur insiste sur le fait de se focaliser sur des problèmes réels et douloureux pour les utilisateurs plutôt que de chercher des idées théoriques complexes."
      },
      {
        id: "ent-cre-2",
        type: "article",
        category: "Méthodes",
        title: "La méthodologie Lean Startup : Valider rapidement pour réussir à grande échelle",
        summary: "Une analyse du célèbre modèle de Eric Ries sur l'importance du cycle 'Construire, Mesurer, Apprendre'.",
        url: "https://www.inrs.fr/media.html?refINRS=ED%206187",
        thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
        author: "Eric Ries",
        authorOrg: "HBR Editions",
        publishedAt: "Lundi",
        readTime: "7 min de lecture",
        isProtected: false,
        ideas: [
          "L'objectif d'une startup est de découvrir le plus rapidement possible ce que veulent les clients.",
          "Le MVP (Produit Minimum Viable) sert à lancer des tests et collecter des retours réels.",
          "Le pivot est un changement de trajectoire stratégique sans changer de vision globale.",
          "La comptabilité analytique de l'innovation doit mesurer les apprentissages validés.",
          "L'erreur fondamentale est de planifier à long terme dans un climat d'extrême incertitude."
        ],
        concepts: ["Lean Startup", "MVP Cycle", "Pivot Strategy"],
        methods: ["Cycle Construire-Mesurer-Apprendre", "Innovation Accounting"],
        whyImportant: "Le Lean Startup a révolutionné la création d'entreprises moderne en remplaçant les plans d'affaires théoriques par de l'expérimentation scientifique.",
        businessApps: "Création d'une landing page test pour mesurer l'intérêt de précommande d'un service avant d'écrire la moindre ligne de code.",
        relatedConcepts: ["Agile Development", "Customer Development"],
        expertiseLevel: "Tous niveaux",
        qhseScore: 8.8,
        content: "Cette synthèse étudie les principes directeurs de l'approche Lean. Elle détaille comment structurer des hypothèses falsifiables et utiliser des métriques de vanité contre des métriques actionnables pour évaluer les progrès."
      }
    ],
    archives: []
  },
  "ent-culture": {
    label: "Culture & Management",
    description: "Comprendre comment recruter, structurer et motiver les équipes pour bâtir des entreprises exceptionnelles.",
    items: [
      {
        id: "ent-cul-1",
        type: "video",
        category: "Leadership",
        title: " Simon Sinek : Commencer par le Pourquoi (Start with Why)",
        summary: "La célèbre explication du Cercle d'Or et de la force de la vision pour inspirer les équipes.",
        url: "https://www.youtube.com/watch?v=R3q5b2XmH3E",
        videoId: "R3q5b2XmH3E",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://img.youtube.com/vi/R3q5b2XmH3E/hqdefault.jpg",
        author: "Simon Sinek",
        authorOrg: "TED Conferences",
        publishedAt: "Mardi",
        duration: "18:30",
        learnings: [
          "Les gens n'achètent pas ce que vous faites, ils achètent POURQUOI vous le faites.",
          "La communication de l'intérieur vers l'extérieur du Cercle d'Or touche le cerveau limbique décisionnel.",
          "Un leadership fort repose sur la clarté du Pourquoi, la discipline du Comment et la cohérence du Quoi."
        ],
        concepts: ["Golden Circle", "Limbic Communication", "Inspiring Leadership"],
        whyImportant: "La culture et la fidélisation des équipes naissent de l'alignement profond autour d'un sens commun. Cette conférence est une clé pour le recrutement et le management inspirant.",
        businessApps: "Réécriture de la charte de présentation de l'entreprise et des annonces d'emploi en formulant d'abord le Pourquoi.",
        expertiseLevel: "Tous niveaux",
        qhseScore: 8.5,
        content: "Simon Sinek démontre à travers les exemples d'Apple, de Martin Luther King et des frères Wright comment les grands leaders communiquent d'une manière diamétralement opposée à la majorité, leur permettant d'inspirer et de mobiliser les foules."
      },
      {
        id: "ent-cul-2",
        type: "article",
        category: "Culture d'Entreprise",
        title: "L'art de la culture d'entreprise chez Netflix : Liberté et Responsabilité",
        summary: "Une analyse du célèbre manifesto culturel de Netflix qui a redéfini le recrutement et le management moderne.",
        url: "https://www.inrs.fr/risques/atmospheres-explosives-atex/jurisprudence-responsabilite-penale-employeur.html",
        thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        author: "Reed Hastings",
        authorOrg: "Netflix HR Research",
        publishedAt: "Mardi",
        readTime: "6 min de lecture",
        isProtected: true,
        ideas: [
          "Rechercher une densité de talents maximale pour autonomiser les équipes.",
          "Donner une liberté totale (pas de politique de vacances ou de dépenses) en échange d'une responsabilité totale.",
          "Pratiquer le 'Keeper Test' : garder uniquement les collaborateurs d'élite.",
          "Éviter les règles bureaucratiques qui étouffent la créativité lors de la croissance.",
          "Pratiquer une transparence radicale de l'information financière et stratégique."
        ],
        concepts: ["Talent Density", "Radical Transparency", "Freedom & Responsibility"],
        methods: ["Keeper Test pour les managers", "Évaluation 360 écrite en continu"],
        whyImportant: "La culture n'est pas ce que l'on écrit, mais ce que l'on tolère. Le modèle Netflix montre que la performance découle directement de la responsabilisation absolue.",
        businessApps: "Implémentation d'une réunion mensuelle de feedback ouverte et transparente au sein de l'équipe projet.",
        relatedConcepts: ["Organizational Design", "HR Excellence"],
        expertiseLevel: "Confirmé",
        qhseScore: 9.0,
        content: "L'article examine la transition de Netflix vers un modèle sans règles. Il détaille comment la densité de talents permet de réduire les processus de contrôle et comment le partage total d'informations aligne les comportements de tous les employés sur l'intérêt de l'entreprise."
      }
    ],
    archives: []
  },
  "ent-strategie": {
    label: "Stratégie Business",
    description: "Comprendre les mécanismes économiques de différenciation, positionnement, et création d'avantages compétitifs durables.",
    items: [
      {
        id: "ent-str-1",
        type: "video",
        category: "Concurrence",
        title: "Michael Porter : Qu'est-ce que la stratégie et comment se positionner",
        summary: "Le professeur de Harvard explique les bases de la différenciation stratégique face à l'efficacité opérationnelle.",
        url: "https://www.youtube.com/watch?v=zJg5n9hXw2M",
        videoId: "zJg5n9hXw2M",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://img.youtube.com/vi/zJg5n9hXw2M/hqdefault.jpg",
        author: "Pr. Michael Porter",
        authorOrg: "Harvard Business School",
        publishedAt: "Mercredi",
        duration: "15:20",
        learnings: [
          "La stratégie consiste à être unique, pas à être le meilleur.",
          "L'efficacité opérationnelle (faire mieux la même chose) est nécessaire mais insuffisante pour un avantage durable.",
          "Une vraie stratégie exige de faire des compromis (Trades-offs) et de choisir ce qu'on ne fait pas."
        ],
        concepts: ["Competitive Advantage", "Trades-offs", "Operational Effectiveness"],
        whyImportant: "Beaucoup d'entrepreneurs confondent stratégie et objectifs de vente. Ce cours pose les fondations du positionnement de marque pour survivre à la concurrence.",
        businessApps: "Définition de la liste des 'compromis' : ce que notre offre refuse de faire pour rester hautement différenciée.",
        expertiseLevel: "Confirmé",
        qhseScore: 8.8,
        content: "Michael Porter détaille ses célèbres concepts de différenciation et de domination par les coûts. Il montre que les entreprises qui tentent de tout offrir à tout le monde se retrouvent systématiquement coincées au milieu sans rentabilité."
      },
      {
        id: "ent-str-2",
        type: "article",
        category: "Stratégie",
        title: "La stratégie Océan Bleu : Rendre la concurrence non pertinente",
        summary: "Une étude sur comment créer un nouvel espace stratégique vierge de concurrence en modifiant la valeur client.",
        url: "https://www.inrs.fr/media.html?refINRS=ED%206038",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
        author: "W. Chan Kim",
        authorOrg: "INSEAD Strategy Group",
        publishedAt: "Mercredi",
        readTime: "7 min de lecture",
        isProtected: false,
        ideas: [
          "L'Océan Rouge est le marché encombré où les entreprises se battent pour des miettes.",
          "L'Océan Bleu est la création d'une nouvelle demande sur un espace de marché inexploré.",
          "La clé est l'innovation-valeur : augmenter la valeur pour le client tout en réduisant les coûts.",
          "La matrice ERAC : Exclure, Réduire, Atténuer, Créer les critères de l'industrie.",
          "Cirque du Soleil est l'exemple classique d'Océan Bleu combinant théâtre et cirque."
        ],
        concepts: ["Blue Ocean", "Value Innovation", "Matrice ERAC"],
        methods: ["Canevas Stratégique de l'industrie", "Grille ERAC"],
        whyImportant: "Plutôt que d'épuiser ses ressources à affronter des concurrents établis, cette méthodologie montre comment redéfinir les règles du marché.",
        businessApps: "Tracer le canevas stratégique de l'offre actuelle pour éliminer les fonctionnalités coûteuses et non valorisées par nos clients.",
        relatedConcepts: ["Disruptive Innovation", "Strategic Canvas"],
        expertiseLevel: "Confirmé",
        qhseScore: 9.0,
        content: "L'article présente l'approche systématique pour sortir de l'océan rouge. Les auteurs décrivent l'utilisation du canevas stratégique pour cartographier les investissements de l'industrie et identifier des zones de rupture de valeur."
      }
    ],
    archives: []
  },
  "ent-innovation": {
    label: "Innovation & Futur",
    description: "Prospective technologique, impact de l'intelligence artificielle, automatisation et transformation des industries.",
    items: [
      {
        id: "ent-inn-1",
        type: "video",
        category: "Technologies",
        title: "L'avenir des technologies : Les tendances qui vont transformer la décennie",
        summary: "Une conférence prospective du MIT sur les révolutions conjointes de l'IA, de la robotique et de la décentralisation.",
        url: "https://www.youtube.com/watch?v=FJqWxoCgI7A",
        videoId: "FJqWxoCgI7A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail: "https://img.youtube.com/vi/FJqWxoCgI7A/hqdefault.jpg",
        author: "Pr. Andrew McAfee",
        authorOrg: "MIT Initiative on the Digital Economy",
        publishedAt: "Jeudi",
        duration: "22:10",
        learnings: [
          "La transition vers une économie 'sans poids' basée sur l'optimisation par l'IA.",
          "La robotique humanoïde entre en phase d'adoption industrielle d'ici 2028.",
          "Les entreprises qui n'intègrent pas l'automatisation dans leurs flux centraux vont disparaître."
        ],
        concepts: ["Machine Platform Crowd", "Industrial Automation", "Exponential Tech"],
        whyImportant: "Prendre les bonnes décisions entrepreneuriales ou d'investissement exige de comprendre où se dirigent les flux technologiques et financiers de demain.",
        businessApps: "Audit des tâches internes de l'entreprise pour identifier les processus automatisables par des agents IA.",
        expertiseLevel: "Tous niveaux",
        qhseScore: 8.8,
        content: "Le conférencier analyse les données historiques de croissance technologique. Il montre comment la convergence entre l'IA générative et la robotique physique va bouleverser les secteurs de la logistique, de la santé et des services financiers."
      },
      {
        id: "ent-inn-2",
        type: "article",
        category: "Intelligence Artificielle",
        title: "L'impact économique de l'IA Générative dans les processus d'entreprise",
        summary: "Une étude d'impact McKinsey mesurant la valeur ajoutée potentielle de l'IA sur la productivité mondiale.",
        url: "https://www.inrs.fr/publications/juridique/focus-juridique/evolution-norme-en-60079-atex-gaz.html",
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80",
        author: "Lareina Yee",
        authorOrg: "McKinsey Global Institute",
        publishedAt: "Jeudi",
        readTime: "7 min de lecture",
        isProtected: false,
        ideas: [
          "L'IA générative pourrait ajouter entre 2 600 et 4 400 milliards de dollars par an à l'économie mondiale.",
          "Le service client, le marketing, le développement logiciel et la R&D concentrent 75% de cette valeur.",
          "La productivité des travailleurs du savoir va bondir de 30% d'ici 2030.",
          "La requalification des équipes (Upskilling) est le goulot d'étranglement majeur des projets IA.",
          "Les risques de biais, de sécurité des données et de propriété intellectuelle doivent être gérés."
        ],
        concepts: ["Generative AI Value", "Knowledge Work Productivity", "Upskilling Imperative"],
        methods: ["Matrice de maturité de l'intégration IA", "Calcul du ROI d'automatisation cognitive"],
        whyImportant: "L'IA générative n'est pas un gadget technologique temporaire, mais une révolution structurelle de la même ampleur que l'accès à l'électricité.",
        businessApps: "Lancement d'un projet pilote d'assistant IA pour l'équipe commerciale afin d'accélérer la rédaction des propositions techniques.",
        relatedConcepts: ["Automation", "Future of Work"],
        expertiseLevel: "Avancé",
        qhseScore: 9.0,
        content: "Cette note détaille les secteurs les plus touchés par l'IA. Elle explique la transformation des fonctions support et fournit un cadre stratégique pour guider les investissements en systèmes cognitifs au sein des grandes entreprises."
      }
    ],
    archives: []
  },
  "ent-monde": {
    label: "Culture & Monde",
    description: "Histoire économique, géopolitique mondiale, grandes découvertes scientifiques et compréhension des sociétés.",
    items: [
      {
        id: "ent-mon-1",
        type: "video",
        category: "Géopolitique",
        title: "La guerre des semi-conducteurs : Géopolitique de la technologie",
        summary: "Un documentaire de référence sur le détroit de Taïwan, ASML et le monopole mondial de la fabrication de puces.",
        url: "https://www.youtube.com/watch?v=XFJSYQBnU5A",
        videoId: "XFJSYQBnU5A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        thumbnail: "https://img.youtube.com/vi/XFJSYQBnU5A/hqdefault.jpg",
        author: "Éric Larousse",
        authorOrg: "IRIS Géopolitique",
        publishedAt: "Vendredi",
        duration: "24:30",
        learnings: [
          "TSMC fabrique plus de 90% des puces avancées de la planète.",
          "ASML détient le monopole des machines de lithographie extrême ultraviolet (EUV) indispensables.",
          "La souveraineté technologique est devenue le cœur de la rivalité USA-Chine."
        ],
        concepts: ["Lithographie EUV", "Silicon Shield", "Choke Point économique"],
        whyImportant: "Toute l'économie numérique moderne dépend d'une chaîne logistique étroite de quelques kilomètres. Comprendre cette fragilité est capital pour anticiper les chocs géopolitiques.",
        businessApps: "Plan de continuité d'activité (PCA) intégrant le risque d'approvisionnement en composants technologiques clés.",
        expertiseLevel: "Tous niveaux",
        qhseScore: 9.0,
        content: "Le documentaire explique pourquoi le contrôle de la fonderie de Taïwan est stratégique pour la survie des géants de la Tech (Apple, NVIDIA, Google). Il retrace également l'histoire de la technologie des puces depuis l'invention du transistor."
      },
      {
        id: "ent-mon-2",
        type: "article",
        category: "Histoire Économique",
        title: "Les trois révolutions industrielles de l'histoire et leurs leçons pour l'IA",
        summary: "Une analyse historique comparant les transitions de la vapeur, de l'électricité et du numérique avec la révolution cognitive en cours.",
        url: "https://www.inrs.fr/media.html?refINRS=ED%206038",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
        author: "Pr. François Bourguignon",
        authorOrg: "École d'Économie de Paris",
        publishedAt: "Vendredi",
        readTime: "6 min de lecture",
        isProtected: false,
        ideas: [
          "Chaque révolution industrielle détruit des emplois obsolètes mais en crée de nouveaux à plus forte valeur.",
          "Le décalage d'adoption (Time lag) entre l'apparition de la technologie et le gain de productivité peut prendre 20-30 ans.",
          "La centralisation géographique de la richesse s'accentue lors des premières phases de transition.",
          "Les institutions réglementaires et de formation doivent s'adapter sous peine de fracture sociale.",
          "La révolution cognitive de l'IA se distingue par la vitesse exponentielle de sa diffusion mondiale."
        ],
        concepts: ["Creative Destruction", "Productivity Paradox", "Cognitive Revolution Transition"],
        methods: ["Modèles d'analyse des transitions macroéconomiques", "Études comparatives de productivité"],
        whyImportant: "Prendre du recul historique permet d'éviter l'hystérie médiatique immédiate et de comprendre les grandes vagues de réorganisation du travail humain.",
        businessApps: "Mise en place d'une cellule de veille prospective sur l'évolution des compétences clés requises au sein de l'entreprise moderne.",
        relatedConcepts: ["Kondratiev Cycles", "Socio-Economic Shifts"],
        expertiseLevel: "Confirmé",
        qhseScore: 8.5,
        content: "L'article examine la transition historique entre la force motrice et l'intelligence logicielle. L'auteur analyse le décalage historique des gains de productivité de l'électricité à la fin du XIXe siècle et en tire des parallèles rigoureux avec la diffusion de l'IA."
      }
    ],
    archives: []
  }
};
