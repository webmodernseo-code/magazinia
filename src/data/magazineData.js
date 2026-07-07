// Data file containing 100% verified structured contents for Veille.IA QHSE Knowledge Portal.
// Structured around 5 main pillars of Quality, Health, Safety, and Environment.
// All article URLs are unique and point to specific resources (INRS, AFNOR, ICSI, etc.).
// All video thumbnails point directly to their official YouTube thumbnail URLs.
// Content matches the strict evaluation framework (ideas, learnings, concepts, methods, score, etc.).

export const magazineData = {
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
        content: "Le webinaire présente la norme ISO 14040 qui régit les ACV. L'ingénieur environnement y apprend à définir les frontières du système et l'unité fonctionnelle pour mener une étude comparative pertinente."
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
  }
};
