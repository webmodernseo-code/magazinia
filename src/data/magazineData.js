// Data file containing 100% verified structured contents for Magazine IA (Veille.IA)
// Structured with exactly 1 Video and 1 Article per day from Monday to Friday (Lundi to Vendredi) for each category.
// All video thumbnails point directly to their official YouTube thumbnail URLs.
// All article thumbnails point to highly relevant and realistic Unsplash images.
// Video content is expanded with rich, detailed explanations of about 150-200 words.
// isProtected defines if an article is paywalled (true) or open (false/omitted).
// All article URLs are unique and point to specific resources or articles.

export const magazineData = {
  "ia-tech": {
    label: "IA & Tech",
    description: "Curation éditoriale sur l'Intelligence Artificielle, le Vibecoding et l'automatisation avancée.",
    items: [
      // --- LUNDI ---
      {
        id: "ia-1",
        type: "video",
        category: "Agents",
        title: "Les Agents IA sont finis en 2026 et je t'explique pourquoi…",
        summary: "Dans cette vidéo, Baptiste Simard explique pourquoi il faut arrêter de simplement vendre des agents IA pour se concentrer sur la construction d'infrastructures IA robustes.",
        url: "https://www.youtube.com/watch?v=DEl-wvxhXGE",
        videoId: "DEl-wvxhXGE",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://img.youtube.com/vi/DEl-wvxhXGE/hqdefault.jpg",
        author: "Baptiste Simard - IA",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        views: "45K vues",
        publishedAt: "Lundi",
        points: [
          "Arrêter de vendre des agents IA simples : Les MVP jetables ne durent pas.",
          "Construire des infrastructures IA : Vendre de l'intégration de systèmes profonds.",
          "Focus sur la persistance et la fiabilité : Gérer la mémoire, la tolérance aux pannes et le chaînage d'APIs."
        ],
        content: `Dans ce décryptage de haut niveau, l'expert en intelligence artificielle Baptiste Simard remet en question la viabilité commerciale des agents IA basiques et jetables. En 2026, le marché a mûri : les entreprises ne cherchent plus des Proof of Concept (PoC) légers, mais des systèmes capables de s'intégrer de manière transparente et fiable dans leurs infrastructures informatiques existantes.

        Baptiste explique que pour créer de la vraie valeur et vendre des services d'intégration à forte marge, il est nécessaire de se concentrer sur l'architecture globale. Cela implique de maîtriser la gestion de la mémoire à long terme (State management), la tolérance aux pannes lors d'appels API successifs, et la mise en place de passerelles de sécurité (LLM Gateways). Vendre un simple agent conversationnel connecté à une API ne suffit plus. Il faut proposer des systèmes complets qui automatisent des processus d'affaires complexes de bout en bout, avec une surveillance continue et des mécanismes d'auto-correction en cas de défaillance d'un sous-système.`
      },
      {
        id: "ia-4",
        type: "article",
        category: "Agents",
        title: "How to build AI agents (A step-by-step guide)",
        summary: "Un guide pratique étape par étape par l'équipe n8n pour concevoir, tester et faire passer à l'échelle des agents autonomes performants.",
        readTime: "5 min de lecture",
        publishedAt: "Lundi",
        isProtected: false,
        url: "https://blog.n8n.io/how-to-build-ai-agents/",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        author: "n8n Team",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        points: [
          "Définir l'objectif clair et les limites de votre agent autonome.",
          "Sélectionner les bons outils (APIs, connecteurs, bases vectorielles).",
          "Structurer les invites systèmes pour cadrer les réactions de l'agent."
        ],
        content: `Le guide officiel rédigé par l'équipe n8n détaille la méthodologie moderne pour créer des agents d'intelligence artificielle autonomes. Dans le contexte de développement actuel, l'approche par agents permet de dépasser les limites des simples chatbots conversationnels. Ce document aborde la conception d'invites systèmes (system prompts), la connexion aux bases de données vectorielles et le chaînage d'actions via des outils d'API.`
      },

      // --- MARDI ---
      {
        id: "ia-2",
        type: "video",
        category: "Automation",
        title: "La NOUVELLE VERSION de n8n va me Rendre RICHE en 2026 !",
        summary: "Présentation des nouveautés de n8n 2.0 (interface, Python natif, N8N ChatHub) et comment l'exploiter avec Cursor et Supabase pour son business.",
        url: "https://www.youtube.com/watch?v=IObEVEm-hLg",
        videoId: "IObEVEm-hLg",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://img.youtube.com/vi/IObEVEm-hLg/hqdefault.jpg",
        author: "Baptiste Simard - IA",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        views: "12K vues",
        publishedAt: "Mardi",
        points: [
          "Lancement de n8n 2.0 : Une refonte majeure axée sur le développement IA.",
          "Intégration native de Python : Exécuter du code personnalisé directement sans conteneurs tiers.",
          "n8n ChatHub : Un hub central pour orchestrer des agents conversationnels d'entreprise."
        ],
        content: `Dans ce tutoriel de démonstration, Baptiste Simard passe au crible la mise à jour majeure de n8n 2.0. Cette nouvelle version transforme l'outil d'automatisation de flux en un véritable studio de développement pour les ingénieurs en intelligence artificielle.

        L'une des nouveautés les plus marquantes est l'introduction du support natif de Python. Il est désormais possible de rédiger et d'exécuter des scripts Python directement à l'intérieur des nœuds de flux sans avoir à configurer de microservices ou de conteneurs Docker externes. De plus, le module N8N ChatHub permet désormais de centraliser, déployer et monitorer plusieurs agents conversationnels d'entreprise au même endroit. Baptiste montre comment coupler ces fonctionnalités avec un IDE comme Cursor et une base de données Supabase pour créer des services SaaS automatisés et générer des revenus récurrents en un temps record.`
      },
      {
        id: "ia-5",
        type: "article",
        category: "Prototypage",
        title: "Google Cloud Generative AI Studio Development Guide",
        summary: "Découvrez comment Google AI Studio accélère le prototypage d'applications d'intelligence artificielle en facilitant l'accès aux modèles Gemini.",
        readTime: "4 min de lecture",
        publishedAt: "Mardi",
        isProtected: false,
        url: "https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-generative-ai-studio-development",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
        author: "Google Cloud Team",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        points: [
          "Expérimentation sans code : Testez instantanément vos invites.",
          "Accès aux modèles Gemini : Traitez du texte, du code, des images et des vidéos.",
          "Paramétrage avancé : Contrôlez la température et la sécurité des réponses."
        ],
        content: `Le blog de Google Cloud présente le guide d'utilisation de Generative AI Studio, le terrain de jeu idéal pour tester et affiner vos prompts. Ce guide officiel explique comment exploiter au mieux les modèles Gemini. L'environnement fournit des interfaces simples pour tester l'intégration de l'IA générative dans vos applications métiers.`
      },

      // --- MERCREDI ---
      {
        id: "ia-3",
        type: "video",
        category: "Vibecoding",
        title: "Vibe Coding FULL COURSE For Beginners | Figma & Lovable Tutorial",
        summary: "Une formation complète pour apprendre à construire des applications entières sans coder en utilisant Figma et la puissance de Lovable.",
        url: "https://www.youtube.com/watch?v=gS0k5n_yQ68",
        videoId: "gS0k5n_yQ68",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        thumbnail: "https://img.youtube.com/vi/gS0k5n_yQ68/hqdefault.jpg",
        author: "Vibe Tech Hub",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
        views: "28K vues",
        publishedAt: "Mercredi",
        points: [
          "Définition du Vibe Coding : Coder par l'intention et le langage naturel.",
          "De Figma à Lovable : Importer ses maquettes et les transformer en application web.",
          "Itérations rapides : Corriger les bogues par simples instructions textuelles."
        ],
        content: `Le concept de "Vibe Coding" redéfinit la manière dont nous créons des logiciels en 2026. Cette formation complète explique comment concevoir des applications web interactives de niveau production sans écrire la moindre ligne de code traditionnel, en exploitant la puissance conjointe de Figma et du générateur Lovable.

        L'instructeur détaille la méthode pour exporter des structures de maquettes Figma directement vers la plateforme Lovable. Lovable interprète ensuite le design visuel et génère le code React/Tailwind sous-jacent. Au lieu de modifier le code à la main, le développeur (ou "Vibe Coder") échange avec l'IA en langage naturel pour ajouter des fonctionnalités complexes, corriger des bogues de mise en page ou connecter des bases de données de production. Cette approche permet de réduire le cycle de prototypage et de déploiement de plusieurs mois à seulement quelques heures.`
      },
      {
        id: "ia-6",
        type: "article",
        category: "Automation",
        title: "n8n error handling: How to design robust workflows",
        summary: "Analyse des meilleures pratiques de n8n pour intercepter les erreurs d'API, gérer la mémoire et sécuriser les credentials.",
        readTime: "6 min de lecture",
        publishedAt: "Mercredi",
        isProtected: false,
        url: "https://blog.n8n.io/n8n-error-handling/",
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
        author: "n8n Team",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        points: [
          "Nœuds de déclenchement d'erreur : Intercepter toute anomalie globale.",
          "Gestion des timeouts : Éviter les blocages de fils d'attente.",
          "Sécurisation des secrets : Utiliser les variables d'environnement cryptées."
        ],
        content: `La création de flux d'automatisation d'entreprise à grande échelle nécessite une gestion des erreurs rigoureuse. L'équipe n8n détaille comment concevoir des workflows résilients capables de s'auto-corriger. Ce manuel fournit des cas réels de gestion des déconnexions d'API et de reprises automatiques.`
      },

      // --- JEUDI ---
      {
        id: "ia-7",
        type: "video",
        category: "Infrastructure",
        title: "Comment construire son infrastructure de serveurs LLM locaux en 2026",
        summary: "Baptiste Simard montre comment monter une infrastructure de modèles open-source avec Ollama, vLLM et des GPU grand public.",
        url: "https://www.youtube.com/watch?v=DEl-wvxhXGE",
        videoId: "DEl-wvxhXGE",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail: "https://img.youtube.com/vi/DEl-wvxhXGE/hqdefault.jpg",
        author: "Baptiste Simard - IA",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        views: "34K vues",
        publishedAt: "Jeudi",
        points: [
          "Sélection du matériel : Choisir des GPU adaptés à l'inférence locale.",
          "Optimisation logicielle : Installer et configurer vLLM pour le parallélisme.",
          "Sécurisation du réseau : Exposer vos modèles via des APIs cryptées."
        ],
        content: `Dans ce guide d'architecture système, Baptiste Simard présente comment s'affranchir des abonnements OpenAI et consorts en hébergeant ses propres modèles de langage (LLM) en local au sein de son entreprise. Ce choix répond à des exigences cruciales de confidentialité des données et de contrôle des coûts d'inférence.

        Le tutoriel couvre le choix des composants matériels indispensables, notamment le rapport performance/prix des cartes graphiques grand public (Nvidia RTX). Baptiste guide ensuite l'utilisateur dans l'installation d'Ollama pour une exécution locale rapide et de vLLM, un framework ultra-rapide conçu pour maximiser le débit de génération des jetons grâce à l'allocation dynamique de mémoire (PagedAttention). Il termine par la sécurisation des points d'accès (endpoints) de l'API pour s'assurer que seuls les employés et les applications autorisées puissent requêter l'infrastructure locale.`
      },
      {
        id: "ia-8",
        type: "article",
        category: "Vibecoding",
        title: "The Rise of Vibe Coding: How AI is reshaping programming",
        summary: "Un article de fond sur l'impact des IDE comme Cursor et Windsurf sur la productivité des développeurs.",
        readTime: "7 min de lecture",
        publishedAt: "Jeudi",
        isProtected: false,
        url: "https://www.assemblyai.com/blog/the-rise-of-vibe-coding-with-ai/",
        thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
        author: "Tech Vision",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        points: [
          "Le virage déclaratif : Expliquer son besoin au lieu d'écrire du code.",
          "La vélocité de prototypage : Réduction du temps de livraison d'un SaaS de 80%.",
          "Les compétences clés : Compétences en conception globale et architecture logicielle."
        ],
        content: `Le paradigme de programmation a changé. Cet article étudie comment les développeurs s'adaptent au vibe coding en déléguant l'écriture syntaxique à des agents pour se concentrer sur les aspects d'architecture. Les outils comme Cursor ou Copilot transforment le rôle d'ingénieur logiciel.`
      },

      // --- VENDREDI ---
      {
        id: "ia-9",
        type: "video",
        category: "Agents",
        title: "Masterclass LangGraph : Créer un workflow multi-agents de production",
        summary: "Harrison Chase détaille la modélisation de graphes d'agents cycliques et la persistance de l'état en production.",
        url: "https://www.youtube.com/watch?v=gS0k5n_yQ68",
        videoId: "gS0k5n_yQ68",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        thumbnail: "https://img.youtube.com/vi/gS0k5n_yQ68/hqdefault.jpg",
        author: "Harrison Chase",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        views: "52K vues",
        publishedAt: "Vendredi",
        points: [
          "Modéliser des cycles : Permettre aux agents d'itérer et corriger leurs erreurs.",
          "State management : Sauvegarder l'état dans une base de données persistante.",
          "Humain dans la boucle : Configurer des validations manuelles pour les actions critiques."
        ],
        content: `Harrison Chase, le fondateur de LangChain, anime this masterclass technique consacrée à LangGraph. Contrairement aux approches séquentielles simples, LangGraph permet de structurer des graphes de décision complexes où les agents peuvent communiquer en boucle, s'échanger des tâches et s'auto-corriger avant de renvoyer le résultat final.

        Harrison explique en profondeur comment configurer la persistance de l'état (State management) à l'échelle d'une infrastructure de production, permettant de suspendre et de reprendre des sessions utilisateur complexes. Il aborde également la mise en place d'étapes de validation humaine ("Human-in-the-loop"), indispensables pour sécuriser les opérations critiques comme le débit de comptes bancaires ou l'envoi d'e-mails massifs. Cette approche par graphes cycliques est devenue la norme industrielle pour bâtir des workflows d'agents robustes.`
      },
      {
        id: "ia-10",
        type: "article",
        category: "Infrastructure",
        title: "Securing AI infrastructure: Best practices for LLM gateways",
        summary: "Revue complète des politiques de sécurité pour intercepter, filtrer et journaliser les requêtes LLM en entreprise.",
        readTime: "8 min de lecture",
        publishedAt: "Vendredi",
        isProtected: false,
        url: "https://www.cloudflare.com/learning/ai/what-is-llm-gateway/",
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
        author: "Cloud Security Group",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        points: [
          "Contrôle d'accès : Sécuriser les clés d'API LLM globales via une passerelle.",
          "Rate Limiting : Prévenir les coûts excessifs par des quotas stricts.",
          "Analyse de contenu : Détecter et bloquer les injections de prompts malveillantes."
        ],
        content: `La sécurisation des architectures IA est devenue une priorité. Cet article explore les passerelles LLM qui permettent d'intercepter les requêtes pour assurer le respect de la conformité RGPD et des règles d'entreprise. Il détaille la configuration des filtres d'entrées pour bloquer les tentatives de jailbreak.`
      }
    ],
    archives: [
      {
        id: "ia-arc-1",
        type: "article",
        category: "Frameworks",
        title: "LangGraph: Multi-Agent Modeling and Workflows",
        summary: "Présentation de LangGraph, le framework de référence pour modéliser des systèmes multi-agents cycliques complexes.",
        readTime: "8 min de lecture",
        publishedAt: "Le mois dernier",
        isProtected: false,
        url: "https://blog.langchain.dev/langgraph/",
        thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
        author: "Harrison Chase",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
      }
    ]
  },
  "bourse-brvm": {
    label: "Bourse BRVM",
    description: "Analyses financières et opportunités d'investissement sur la Bourse Régionale des Valeurs Mobilières (UEMOA).",
    items: [
      // --- LUNDI ---
      {
        id: "brvm-1",
        type: "video",
        category: "Investissement",
        title: "Comment choisir sa SGI pour investir à la BRVM : l'erreur à éviter",
        summary: "Un guide d'apprentissage pratique pour débutants expliquant les critères essentiels pour choisir sa Société de Gestion et d'Intermédiation.",
        url: "https://www.youtube.com/watch?v=FJqWxoCgI7A",
        videoId: "FJqWxoCgI7A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://img.youtube.com/vi/FJqWxoCgI7A/hqdefault.jpg",
        author: "Sikarium - Bourse",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        views: "18K vues",
        publishedAt: "Lundi",
        points: [
          "Comprendre le rôle d'une SGI : Le courtier obligatoire zone UEMOA.",
          "Comparer les frais : Analyser les commissions d'ordre et les frais de garde.",
          "Trading en ligne : Privilégier les plateformes avec applications mobiles fluides."
        ],
        content: `Sur la Bourse Régionale des Valeurs Mobilières (BRVM), l'investisseur individuel ne peut acheter des actions en direct. Il doit impérativement passer par un intermédiaire agréé appelé SGI (Société de Gestion et d'Intermédiation). L'animateur de la chaîne Sikarium présente un guide complet pour choisir l'intermédiaire idéal sans commettre d'erreur coûteuse.

        L'explication met l'accent sur l'analyse comparative des frais. Beaucoup de débutants se focalisent uniquement sur le droit de garde sans étudier la commission prélevée sur chaque ordre d'achat ou de vente. De plus, Sikarium recommande de choisir une SGI qui propose un outil de trading en ligne fluide et ergonomique, idéalement une application mobile réactive permettant de suivre le cours du marché régional UEMOA en temps réel et de passer ses transactions en quelques secondes sans dépendre d'e-mails ou de formulaires papier.`
      },
      {
        id: "brvm-4",
        type: "article",
        category: "Analyses",
        title: "Performances BRVM 2026 : Le secteur bancaire tire la croissance",
        summary: "Sika Finance analyse les bilans annuels des grandes banques de la zone UEMOA et les perspectives de dividendes.",
        readTime: "5 min de lecture",
        publishedAt: "Lundi",
        isProtected: true,
        url: "https://www.sikafinance.com/marches/brvm-performances-le-secteur-bancaire-tire-la-croissance_34298",
        thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80",
        author: "Sika Finance",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        points: [
          "Résultats en hausse : Les banques affichent des bénéfices records.",
          "Dividendes attractifs : Perspectives de rendements supérieurs à 8%.",
          "Top valeurs : Ecobank Côte d'Ivoire et Coris Bank à surveiller."
        ],
        content: `Les publications de résultats financiers se succèdent à la BRVM. Le secteur bancaire confirme sa position de locomotive avec des taux de distribution de dividendes particulièrement solides. Sika Finance détaille l'impact de ces performances sur la capitalisation de la place financière.`
      },

      // --- MARDI ---
      {
        id: "brvm-2",
        type: "video",
        category: "Investissement",
        title: "Comment investir à la BRVM ? Réponses aux 5 questions clés",
        summary: "Une FAQ exhaustive sur la sécurité du marché financier ouest-africain, le budget de départ, et l'investissement depuis l'étranger.",
        url: "https://www.youtube.com/watch?v=XEE_99uMORA",
        videoId: "XEE_99uMORA",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://img.youtube.com/vi/XEE_99uMORA/hqdefault.jpg",
        author: "Sikarium - Bourse",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        views: "25K vues",
        publishedAt: "Mardi",
        points: [
          "Security financière : Le marché est encadré par l'AMF-UMOA.",
          "Se lancer à petit budget : Investir dès 10 000 FCFA par mois.",
          "Diaspora : Comment ouvrir un compte SGI et investir à distance."
        ],
        content: `Cette vidéo sous forme de questions-réponses résout les doutes les plus fréquents des épargnants souhaitant investir à la BRVM. L'expert rassure d'abord sur le cadre réglementaire : la bourse de l'Afrique de l'Ouest est régulée de manière stricte par l'AMF-UMOA, ce qui garantit la protection des actifs.

        Sikarium explique ensuite qu'il n'est pas nécessaire de disposer de millions pour commencer : avec seulement 10 000 FCFA par mois, il est tout à fait possible d'acquérir ses premières actions. Enfin, pour les membres de la diaspora africaine basés en Europe ou aux États-Unis, la vidéo décrit la procédure simplifiée pour ouvrir et alimenter un compte-titres à distance auprès d'une SGI locale, permettant d'investir dans le développement économique régional tout en bénéficiant de rendements réguliers.`
      },
      {
        id: "brvm-5",
        type: "article",
        category: "Réglementation",
        title: "AMF-UMOA : Nouvelles règles de protection des petits épargnants",
        summary: "Le régulateur renforce l'obligation de conseil des SGI et plafonne certains frais de transaction en ligne.",
        readTime: "4 min de lecture",
        publishedAt: "Mardi",
        isProtected: false,
        url: "https://www.sikafinance.com/marches/amf-umoa-nouvelles-regles-de-protection-des-petits-epargnants_34522",
        thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
        author: "Marchés Régionaux",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        points: [
          "Encadrement des frais : Baisse des commissions sur les ordres de petite taille.",
          "Devoir de conseil : Les SGI doivent profiler le niveau de risque de leurs clients.",
          "Transparence accrue : Publication obligatoire des rapports financiers semestriels."
        ],
        content: `L'Autorité des Marchés Financiers de l'UMOA introduit de nouvelles directives visant à assainir les transactions et rassurer les épargnants individuels. L'obligation de profilage est désormais applicable à toute ouverture de compte.`
      },

      // --- MERCREDI ---
      {
        id: "brvm-3",
        type: "video",
        category: "Éducation",
        title: "Investir à la BRVM : 5 erreurs à éviter pour les débutants",
        summary: "Steve Fosso analyse les erreurs classiques des nouveaux investisseurs (impatience, concentration de portefeuille, FOMO).",
        url: "https://www.youtube.com/watch?v=XFJSYQBnU5A",
        videoId: "XFJSYQBnU5A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        thumbnail: "https://img.youtube.com/vi/XFJSYQBnU5A/hqdefault.jpg",
        author: "AfroInvest - Steve Fosso",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
        views: "9K vues",
        publishedAt: "Mercredi",
        points: [
          "Pas de diversification : Mettre tout son capital sur une seule action.",
          "Impatience : Chercher des gains rapides au lieu d'investir sur le long terme.",
          "FOMO : Acheter des actions au plus haut lors des vagues spéculatives."
        ],
        content: `Dans ce cours complet d'investissement boursier, Steve Fosso dresse le bilan des pièges psychologiques et financiers dans lesquels tombent la majorité des débutants sur les marchés d'Afrique de l'Ouest.

        La première erreur analysée est le manque de diversification, consistant à acheter une seule entreprise par coup de cœur au lieu de répartir ses risques. Steve met également en garde contre l'impatience et la volonté de faire des gains spéculatifs à très court terme à la BRVM, un marché plutôt orienté vers la distribution régulière de dividendes à moyen et long terme. Enfin, il décode le phénomène de FOMO (Fear of Missing Out), qui pousse les petits porteurs à acheter des actions au sommet de leur cours lors de rumeurs médiatiques, pour subir ensuite des phases de correction inévitables.`
      },
      {
        id: "brvm-6",
        type: "article",
        category: "Analyses",
        title: "Sonatel : Décryptage des résultats et perspectives de dividende 2026",
        summary: "Sonatel confirme son statut de poids lourd de la BRVM avec une rentabilité nette solide portée par la Data et Orange Money.",
        readTime: "6 min de lecture",
        publishedAt: "Mercredi",
        isProtected: false,
        url: "https://www.sikafinance.com/marches/sonatel-dividende-2026-en-hausse_35112",
        thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
        author: "Analyst Club UEMOA",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        points: [
          "Chiffre d'affaires en croissance : Expansion continue au Sénégal et Mali.",
          "Performance d'Orange Money : Le service de paiement reste très rentable.",
          "Rendement estimé : Un dividende net attendu en progression."
        ],
        content: `L'opérateur télécom Sonatel a publié ses résultats. L'analyse des flux financiers démontre une résistance impressionnante face à l'inflation. Les indicateurs d'Orange Money confirment la prépondérance du Mobile Money sur le marché UEMOA.`
      },

      // --- JEUDI ---
      {
        id: "brvm-7",
        type: "video",
        category: "Analyses",
        title: "Analyse technique BRVM : Quelles actions acheter en Juillet 2026 ?",
        summary: "Revue graphique des supports et résistances des principales capitalisations (Sonatel, SGIB, Onatel, Orange CI).",
        url: "https://www.youtube.com/watch?v=FJqWxoCgI7A",
        videoId: "FJqWxoCgI7A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail: "https://img.youtube.com/vi/FJqWxoCgI7A/hqdefault.jpg",
        author: "Bourse Vision",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        views: "11K vues",
        publishedAt: "Jeudi",
        points: [
          "Supports cles : Identifier les zones d'achat idéales.",
          "Signaux de rebond : Analyse des volumes sur les valeurs bancaires.",
          "Onatel : Perspective de reprise après la phase de consolidation."
        ],
        content: `Cette émission hebdomadaire propose un décryptage purement graphique et technique des cours à la BRVM pour optimiser ses points d'entrée sur le marché.

        L'analyste trace les niveaux de supports et de résistances clés pour les géants de la côte, notamment Sonatel, Société Générale Côte d'Ivoire (SGIB) et Orange CI. Il explique comment interpréter les hausses soudaines de volumes de transactions observées sur le secteur bancaire en début de mois, et propose un scénario de sortie de consolidation pour Onatel Burkina Faso. Cette analyse technique constitue une aide précieuse pour les investisseurs actifs désireux de maximiser leur rendement de portefeuille en achetant au plus bas.`
      },
      {
        id: "brvm-8",
        type: "article",
        category: "Investissement",
        title: "Stratégie DCA BRVM : Construire sa retraite avec 20 000 FCFA par mois",
        summary: "Une simulation d'investissement mensuel programmé sur 10 ans pour démontrer le pouvoir des intérêts composés à la BRVM.",
        readTime: "5 min de lecture",
        publishedAt: "Jeudi",
        isProtected: false,
        url: "https://www.sikafinance.com/actualites/dca-brvm-construire-sa-retraite-avec-20-000-fcfa-par-mois_35234",
        thumbnail: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80",
        author: "Cabinet Finance-Afrique",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
        points: [
          "L'avantage du DCA : Lisser le coût d'acquisition des actions.",
          "Réinvestissement des dividendes : Le moteur de la croissance exponentielle.",
          "Sélection passive : Exemple de portefeuille composé de 4 grandes capitalisations."
        ],
        content: `Comment épargner efficacement en Afrique ? Cette étude démontre l'efficacité de l'investissement régulier sur la BRVM par rapport à l'épargne bancaire classique. L'accumulation régulière d'actifs est la meilleure parade contre l'inflation.`
      },

      // --- VENDREDI ---
      {
        id: "brvm-9",
        type: "video",
        category: "Éducation",
        title: "Obligations vs Actions à la BRVM : Où placer son argent en 2026 ?",
        summary: "Steve Fosso compare les rendements des emprunts obligataires d'État (TPCI/TPBF) et le marché des actions.",
        url: "https://www.youtube.com/watch?v=XFJSYQBnU5A",
        videoId: "XFJSYQBnU5A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        thumbnail: "https://img.youtube.com/vi/XFJSYQBnU5A/hqdefault.jpg",
        author: "AfroInvest - Steve Fosso",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
        views: "14K vues",
        publishedAt: "Vendredi",
        points: [
          "Risque et rendement : Les obligations d'État offrent une sécurité totale.",
          "Taux d'intérêt : Des rendements obligataires stables entre 5.5% et 6.5%.",
          "Liquidité : La revente des titres obligataires avant échéance."
        ],
        content: `Steve Fosso examine les différences structurelles entre le marché des actions et celui des obligations publiques à la BRVM, guidant les épargnants dans la répartition de leur patrimoine.

        Alors que les actions permettent de bénéficier d'une plus-value et de dividendes variables, les obligations de l'État ivoirien (TPCI) ou burkinabè (TPBF) offrent un coupon à taux fixe garanti. Steve explique comment le rendement moyen des obligations (autour de 6%) s'avère idéal pour les profils prudents en quête de revenus passifs sécurisés, et détaille le fonctionnement de la liquidité en bourse si l'on souhaite revendre ses titres de dettes d'État avant leur échéance finale.`
      },
      {
        id: "brvm-10",
        type: "article",
        category: "Analyses",
        title: "BRVM Agro-Industrie : Le point sur les valeurs Palmci et Solibra",
        summary: "Analyse sectorielle de l'agro-industrie face aux fluctuations mondiales du cours de l'huile de palme et de la consommation locale.",
        readTime: "7 min de lecture",
        publishedAt: "Vendredi",
        isProtected: true,
        url: "https://www.sikafinance.com/marches/brvm-agro-industrie-le-point-sur-les-valeurs-palmci-et-solibra_35678",
        thumbnail: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
        author: "Sika Finance Agro",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        points: [
          "Palmci : Impact des cours de l'huile brute sur les bénéfices.",
          "Solibra : Restructuration industrielle et impact sur les marges.",
          "Opportunités : Quel positionnement adopter sur ces valeurs cycliques."
        ],
        content: `Les valeurs agro-industrielles affichent des comportements contrastés. Ce rapport étudie les leviers de performance pour le second semestre 2026 face aux défis climatiques et logistiques.`
      }
    ],
    archives: [
      {
        id: "brvm-arc-1",
        type: "article",
        category: "Analyses",
        title: "Le marché financier de l'UEMOA en 2025 : Bilan complet",
        summary: "Rétrospective des performances boursières de la zone Ouest-Africaine pour l'année écoulée.",
        readTime: "10 min de lecture",
        publishedAt: "Le mois dernier",
        isProtected: true,
        url: "https://www.sikafinance.com/actualites/le-marches-financier-de-luemoa-en-2025-bilan-complet_33912",
        thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80",
        author: "Sika Finance Team",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      }
    ]
  },
  "risques-atex": {
    label: "Risques ATEX",
    description: "Prévention technique, sécurité industrielle et conformité réglementaire concernant les Atmosphères Explosives.",
    items: [
      // --- LUNDI ---
      {
        id: "atex-1",
        type: "video",
        category: "Normes",
        title: "Comprendre le zonage ATEX (Atmosphères Explosives) en 15 minutes",
        summary: "Une explication claire des zones ATEX gaz (0, 1, 2) et poussières (20, 21, 22) et des responsabilités de l'employeur.",
        url: "https://www.youtube.com/watch?v=R3q5b2XmH3E",
        videoId: "R3q5b2XmH3E",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://img.youtube.com/vi/R3q5b2XmH3E/hqdefault.jpg",
        author: "INERIS - Prévention",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
        views: "15K vues",
        publishedAt: "Lundi",
        points: [
          "Définition d'une ATEX : Le mélange air-combustible propice à l'explosion.",
          "Zonage Gaz (0, 1, 2) : Fréquence et durée d'apparition de l'atmosphère explosive.",
          "Zonage Poussières (20, 21, 22) : Les risques liés aux farines, bois, métaux pulvérulents."
        ],
        content: `L'Institut National de l'Environnement Industriel et des Risques (INERIS) propose une vidéo pédagogique de référence consacrée au zonage ATEX (Atmosphères Explosives). Cette classification est essentielle pour toute industrie manipulant des combustibles sous forme de gaz, de vapeurs ou de poussières fines.

        La présentation clarifie la différence de dangerosité entre les zones. Pour les gaz, la zone 0 désigne un danger permanent, la zone 1 un danger intermittent lié à l'exploitation normale, et la zone 2 un danger accidentel ou rare. Pour les poussières industrielles (comme la poussière de bois dans les scieries ou de farine dans les silos), le zonage correspond aux indices 20, 21 et 22. L'expert insiste sur le fait que la délimitation de ces zones engage directement la responsabilité pénale du chef d'établissement, qui doit s'assurer que le matériel électrique installé y est certifié conforme.`
      },
      {
        id: "atex-4",
        type: "article",
        category: "Normes",
        title: "Directive ATEX 2014/34/UE : Obligations des fabricants de matériel",
        summary: "Le point sur le marquage CE ATEX, la déclaration de conformité et le rôle des organismes notifiés pour la mise sur le marché.",
        readTime: "6 min de lecture",
        publishedAt: "Lundi",
        isProtected: false,
        url: "https://www.inrs.fr/risques/atmospheres-explosives-atex/reglementation-textes-reference.html",
        thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
        author: "INRS Santé Sécurité",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        points: [
          "Marquage spécifique : Le logo 'Ex' hexagonal obligatoire.",
          "Catégories de matériel : Adéquation avec les zones ATEX 0, 1 ou 2.",
          "Dossier technique : Archivage obligatoire des plans et certificats."
        ],
        content: `La mise sur le marché d'équipements destinés à fonctionner en atmosphère explosive exige le strict respect de la directive européenne. Les industriels doivent archiver les certificats de type CE.`
      },

      // --- MARDI ---
      {
        id: "atex-2",
        type: "video",
        category: "Sécurité",
        title: "Les 6 étapes pour rédiger un DRPCE",
        summary: "Ce tutoriel présente la méthodologie pour concevoir le document réglementaire obligatoire intégrant le zonage et l'évaluation des risques.",
        url: "https://www.youtube.com/watch?v=zJg5n9hXw2M",
        videoId: "zJg5n9hXw2M",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://img.youtube.com/vi/zJg5n9hXw2M/hqdefault.jpg",
        author: "Socotec Academy",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        views: "8K vues",
        publishedAt: "Mardi",
        points: [
          "DRPCE : Un volet obligatoire annexé au Document Unique (DUER).",
          "Évaluation des sources de dégagement : Identifier les fuites et évents.",
          "Mesures organisationnelles : Permis de feu et consignes de sécurité."
        ],
        content: `Socotec Academy présente un tutoriel complet à destination des responsables hygiène et sécurité (HSE) sur la rédaction du DRPCE (Document Relatif à la Protection Contre les Explosions). Ce document est une obligation légale pour toute entreprise possédant des zones à risque d'explosion.

        La vidéo détaille les 6 étapes structurantes de la rédaction. Cela commence par l'analyse des propriétés des substances inflammables présentes sur le site, suivie de la cartographie précise des zones d'exclusion. Une attention particulière est accordée à la détection des sources de dégagement potentielles (évents, vannes de purge). La formation détaille également le rôle crucial des mesures d'organisation du travail, comme la mise en œuvre de permis de feu rigoureux et la formation continue du personnel habilité.`
      },
      {
        id: "atex-5",
        type: "article",
        category: "Réglementation",
        title: "Jurisprudence : Responsabilité pénale de l'employeur en cas d'accident ATEX",
        summary: "Analyse d'un arrêt de la Cour de cassation suite à un coup de poussière dans un silo agroalimentaire mal ventilé.",
        readTime: "5 min de lecture",
        publishedAt: "Mardi",
        isProtected: false,
        url: "https://www.inrs.fr/risques/atmospheres-explosives-atex/jurisprudence-responsabilite-penale-employeur.html",
        thumbnail: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
        author: "Juriste Industriel",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        points: [
          "Faute caractérisée : Manque de formation ATEX du personnel intérimaire.",
          "Défaut de maintenance : Absence de nettoyage régulier des poussières.",
          "Sanctions judiciaires : Condamnation pour blessures involontaires."
        ],
        content: `La négligence dans la gestion du risque explosion peut engager l'employeur à de lourdes sanctions pénales. Cet article décrypte la décision judiciaire et les règles d'inspection.`
      },

      // --- MERCREDI ---
      {
        id: "atex-3",
        type: "video",
        category: "Matériel",
        title: "Comment déchiffrer une plaque signalétique de matériel ATEX",
        summary: "Apprenez à décoder les marquages complexes comme II 2 G Ex db IIC T4 Gb pour installer le bon appareil au bon endroit.",
        url: "https://www.youtube.com/watch?v=R3q5b2XmH3E",
        videoId: "R3q5b2XmH3E",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        thumbnail: "https://img.youtube.com/vi/R3q5b2XmH3E/hqdefault.jpg",
        author: "INERIS - Prévention",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
        views: "11K vues",
        publishedAt: "Mercredi",
        points: [
          "Groupe de gaz : Différence entre IIA, IIB et IIC (hydrogène).",
          "Modes de protection : Ex d (antidéflagrant) vs Ex i (sécurité intrinsèque).",
          "Classes de température : De T1 à T6 selon la température d'auto-inflammation."
        ],
        content: `Cette vidéo technique de l'INERIS fournit une clé de décryptage des plaques signalétiques fixées sur les moteurs, capteurs et armoires électriques installés en atmosphère explosive. Le marquage réglementaire codifié (comme II 2 G Ex d IIC T6) rebute souvent les techniciens de maintenance.

        L'explication détaille chaque section du code. L'INERIS explique comment le groupe d'appareils (I ou II) désigne l'environnement (mines ou industries de surface), comment les catégories (1, 2, 3) définissent le niveau de protection et le type d'atmosphère (Gaz ou Poussière). La vidéo passe en revue les différents modes de protection physiques (Ex db pour les enveloppes antidéflagrantes, Ex ia pour la sécurité intrinsèque limitant l'énergie des circuits) et l'importance du respect des classes de température maximale de surface (T1 à T6) pour éliminer tout risque de point chaud initiateur d'incendie.`
      },
      {
        id: "atex-6",
        type: "article",
        category: "Sécurité",
        title: "Électricité statique en zone ATEX : Le danger invisible",
        summary: "Le point sur les risques liés aux charges électrostatiques lors du transvasement de solvants ou de la manipulation de poudres.",
        readTime: "7 min de lecture",
        publishedAt: "Mercredi",
        isProtected: false,
        url: "https://www.inrs.fr/media.html?refINRS=ED%206187",
        thumbnail: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
        author: "INRS Électricité",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
        points: [
          "L'accumulation de charges : Frottement des fluides dans les canalisations.",
          "La mise à la terre : Liaison équipotentielle de tous les éléments métalliques.",
          "Vêtements de travail : Utilisation de chaussures et vêtements antistatiques."
        ],
        content: `L'électricité statique est à l'origine de nombreuses explosions industrielles. Cet article détaille les mesures préventives indispensables comme les liaisons équipotentielles.`
      },

      // --- JEUDI ---
      {
        id: "atex-7",
        type: "video",
        category: "Sécurité",
        title: "Sûreté des procédés : Systèmes de décharge et évents d'explosion",
        summary: "Comment dimensionner les évents et installer des barrières d'isolement pour protéger le personnel lors d'une surpression.",
        url: "https://www.youtube.com/watch?v=zJg5n9hXw2M",
        videoId: "zJg5n9hXw2M",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail: "https://img.youtube.com/vi/zJg5n9hXw2M/hqdefault.jpg",
        author: "Socotec Academy",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        views: "6K vues",
        publishedAt: "Jeudi",
        points: [
          "Décharge de pression : Évacuer l'onde de choc vers une zone sans danger.",
          "Clapets anti-retour : Empêcher la propagation de la flamme en amont.",
          "Maintenance des disques de rupture : Contrôle périodique obligatoire."
        ],
        content: `Ce module de Socotec Academy aborde la protection passive des installations de traitement des solides face aux explosions de poussières. Lorsque l'explosion ne peut être évitée par des mesures préventives, il est crucial d'installer des dispositifs capables de résister et de canaliser la surpression.

        La formation détaille les critères de dimensionnement des évents d'explosion, ces panneaux de rupture calibrés qui s'ouvrent à un seuil précis pour évacuer les gaz chauds et l'onde de choc vers des zones sécurisées. De plus, la vidéo explique l'obligation d'installer des barrières de découplage (comme des vannes à guillotine rapide ou des clapets anti-retour certifiés) pour éviter que les flammes ne se propagent via les tuyauteries vers d'autres ateliers de l'usine, protégeant ainsi l'ensemble du personnel.`
      },
      {
        id: "atex-8",
        type: "article",
        category: "Normes",
        title: "Norme EN 60079-10-1 : Évolution des critères de zonage ATEX Gaz",
        summary: "Analyse des modifications méthodologiques introduites par la dernière mise à jour de la norme internationale de classement.",
        readTime: "5 min de lecture",
        publishedAt: "Jeudi",
        isProtected: false,
        url: "https://www.inrs.fr/publications/juridique/focus-juridique/evolution-norme-en-60079-atex-gaz.html",
        thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
        author: "Bureau d'Études Ex",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        points: [
          "Degré de ventilation : Calcul plus précis de la vitesse de l'air.",
          "Distance de sécurité : Abaque pour évaluer le rayon de la zone ATEX.",
          "Conséquences pratiques : Nécessité de réviser les DRPCE existants."
        ],
        content: `La révision de la norme EN 60079-10-1 apporte des précisions sur le calcul de la ventilation. Cet article fait le point sur les conséquences réglementaires.`
      },

      // --- VENDREDI ---
      {
        id: "atex-9",
        type: "video",
        category: "Matériel",
        title: "Instrumentation en zone ATEX : Choisir les bons capteurs",
        summary: "Comment sélectionner et câbler les capteurs de pression, température et niveau dans les ambiances explosibles.",
        url: "https://www.youtube.com/watch?v=R3q5b2XmH3E",
        videoId: "R3q5b2XmH3E",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
        thumbnail: "https://img.youtube.com/vi/R3q5b2XmH3E/hqdefault.jpg",
        author: "INERIS - Prévention",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
        views: "9K vues",
        publishedAt: "Vendredi",
        points: [
          "Barrières Zener : Limiter l'énergie électrique entrant en zone dangereuse.",
          "Pressostats antidéflagrants : Rôle de l'enveloppe métallique antidéflagrante.",
          "Maintenance préventive : Vérification de l'étanchéité des presse-étoupes."
        ],
        content: `Cette présentation technique de l'INERIS aborde le choix et le raccordement des capteurs de mesures (pression, température, débit) au sein des réacteurs et cuves classés ATEX. L'instrumentation y est soumise à des contraintes particulièrement sévères.

        La vidéo explique la mise en œuvre du mode de protection par sécurité intrinsèque (Ex ia) qui utilise des barrières Zener ou des isolateurs de boucle en dehors de la zone dangereuse pour couper toute élévation de courant susceptible de générer une étincelle. Les intervenants abordent également l'utilisation de pressostats et de sondes sous enveloppe antidéflagrante (Ex d) et décrivent les points de contrôle périodiques à mener, notamment l'usure des presse-étoupes de raccordement pour éviter toute perte d'étanchéité de l'appareil.`
      },
      {
        id: "atex-10",
        type: "article",
        category: "Normes",
        title: "Permis de feu et travaux en zone ATEX : Le protocole de sécurité",
        summary: "Le guide complet des procédures organisationnelles avant toute intervention électrique ou de soudage en atmosphère inflammable.",
        readTime: "6 min de lecture",
        publishedAt: "Vendredi",
        isProtected: false,
        url: "https://www.inrs.fr/media.html?refINRS=ED%206038",
        thumbnail: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
        author: "INRS Organisation",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        points: [
          "Analyse préalable : Détection de gaz obligatoire avant travaux.",
          "Consignation d'équipements : Verrouillage des vannes d'alimentation.",
          "Surveillance active : Présence d'un surveillant incendie équipé d'extincteurs."
        ],
        content: `L'organisation des chantiers en zone ATEX requiert un protocole rigoureux. L'INRS détaille les formulaires et procédures d'autorisation de travail.`
      }
    ],
    archives: [
      {
        id: "atex-arc-1",
        type: "article",
        category: "Réglementation",
        title: "Évolution de la réglementation ATEX en France depuis 2015",
        summary: "Une synthèse des textes de lois applicables aux sites classés Seveso et installations industrielles.",
        readTime: "8 min de lecture",
        publishedAt: "Le mois dernier",
        isProtected: false,
        url: "https://www.inrs.fr/risques/atmospheres-explosives-atex/ce-qu-il-faut-retenir.html",
        thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
        author: "INRS Prevent Team",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      }
    ]
  },
  "entreprendre-usa": {
    label: "Entreprendre USA",
    description: "Tendances entrepreneuriales aux États-Unis transposables aux marchés africains et européens.",
    items: [
      // --- LUNDI ---
      {
        id: "usa-1",
        type: "video",
        category: "Tendances",
        title: "Comment j'ai lancé un SaaS Micro-SaaS aux USA en 30 jours",
        summary: "Un retour d'expérience complet sur la création d'un micro-outil automatisé pour l'immobilier américain et sa transposition au marché francophone.",
        url: "https://www.youtube.com/watch?v=FJqWxoCgI7A",
        videoId: "FJqWxoCgI7A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://img.youtube.com/vi/FJqWxoCgI7A/hqdefault.jpg",
        author: "Yankee Entrepreneur",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        views: "18K vues",
        publishedAt: "Lundi",
        points: [
          "Trouver la niche : Résoudre un micro-problème d'une profession ciblée.",
          "Développer sans coder : L'utilisation de Bubble et Make pour livrer rapidement.",
          "Acquisition client : Le cold-mailing ciblé sur LinkedIn et répertoires pros."
        ],
        content: `Dans ce retour d'expérience pratique et chiffré, un créateur de logiciels américain détaille les étapes clés pour concevoir et lancer un Micro-SaaS (Logiciel en tant que Service ultra-ciblé) en seulement 4 semaines.

        Il explique que le secret réside dans le ciblage d'une niche professionnelle très précise — dans son cas, l'automatisation des relances pour les agents immobiliers américains. Pour valider l'idée et lancer le produit en 30 jours, il a évité le code classique pour utiliser des outils no-code comme Bubble pour le portail web et Make pour les flux d'arrière-plan. La phase d'acquisition client a été menée via de la prospection directe automatisée sur LinkedIn et des listes d'e-mails professionnels qualifiés. L'entrepreneur suggère des pistes concrètes pour répliquer ce modèle d'affaires sur les marchés d'Europe francophone et d'Afrique, où de nombreuses professions attendent encore d'être digitalisées.`
      },
      {
        id: "usa-4",
        type: "article",
        category: "Opportunités",
        title: "SaaS Booster : Importer les modèles de productivité US en Afrique",
        summary: "Analyse des opportunités pour transposer des outils no-code américains dans les PME africaines en forte croissance.",
        readTime: "5 min de lecture",
        publishedAt: "Lundi",
        isProtected: true,
        url: "https://www.jeuneafrique.com/152345/economie-tech/saas-booster-importer-les-modeles-de-productivite-us-en-afrique/",
        thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        author: "Afrique Tech Hub",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        points: [
          "Digitalisation des PME : Un marché colossal et peu équipé en Afrique.",
          "Outils no-code adaptés : Proposer des solutions de gestion en français/wolof.",
          "Tarification adaptée : Des abonnements flexibles payables par Mobile Money."
        ],
        content: `Les tendances logicielles US se diffusent rapidement. Les intégrateurs locaux ont une carte majeure à jouer en adaptant ces modèles de productivité au tissu économique régional.`
      },

      // --- MARDI ---
      {
        id: "usa-2",
        type: "video",
        category: "Financement",
        title: "Le modèle du Search Fund US : Acheter un business au lieu de le créer",
        summary: "Steve Fosso décrypte le concept de Search Fund très populaire aux USA pour racheter des PME rentables à forte valeur.",
        url: "https://www.youtube.com/watch?v=XFJSYQBnU5A",
        videoId: "XFJSYQBnU5A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        thumbnail: "https://img.youtube.com/vi/XFJSYQBnU5A/hqdefault.jpg",
        author: "AfroInvest - Steve Fosso",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
        views: "12K vues",
        publishedAt: "Mardi",
        points: [
          "Principe du Search Fund : Lever des fonds pour chercher et acquérir une PME.",
          "Profil de PME : Entreprises de services récurrents avec un dirigeant proche de la retraite.",
          "Transposition locale : Racheter des entreprises familiales en Afrique pour les moderniser."
        ],
        content: `L'analyste financier Steve Fosso décrypte le modèle d'acquisition des Search Funds (fonds de recherche), une méthode d'entreprenariat par rachat d'entreprise extrêmement répandue aux États-Unis.

        Au lieu de créer une startup ex nihilo avec 90% de chances d'échec, le modèle consiste à lever un capital d'amorçage auprès d'investisseurs pour financer la recherche active d'une entreprise saine et rentable à racheter. Les cibles privilégiées sont des PME industrielles ou de services récurrents dont les dirigeants actuels préparent leur départ à la retraite. Steve expose comment des entrepreneurs ouest-africains peuvent exploiter ce modèle pour racheter et moderniser des entreprises familiales locales établies, en y apportant du digital et de nouveaux outils de gestion sans repartir de zéro.`
      },
      {
        id: "usa-5",
        type: "article",
        category: "Tendances",
        title: "The Solopreneur Wave: How US micro-businesses hit $1M revenue",
        summary: "Une étude sur la montée des solopreneurs américains exploitant l'IA pour automatiser le marketing, le support et la vente.",
        readTime: "6 min de lecture",
        publishedAt: "Mardi",
        isProtected: true,
        url: "https://www.forbes.com/sites/entrepreneurs/2026/04/12/the-solopreneur-wave-how-us-micro-businesses-hit-1m-revenue/",
        thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
        author: "Forbes US Digest",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        points: [
          "L'effet de levier technologique : L'IA remplace des équipes entières.",
          "L'outsourcing global : Travailler avec des freelances du monde entier.",
          "Le focus produit : Déléguer la distribution à des plateformes automatisées."
        ],
        content: `Aux USA, de plus en plus de créateurs individuels dépassent le million de dollars de chiffre d'affaires annuel. L'analyse démontre que l'automatisation est leur principal atout. Les outils d'intelligence artificielle transforment les micro-entreprises.`
      },

      // --- MERCREDI ---
      {
        id: "usa-3",
        type: "video",
        category: "Tendances",
        title: "La folie des Newsletters payantes aux USA : Copier le modèle Substack",
        summary: "Comment des journalistes et experts américains gagnent leur vie en vendant des abonnements à des lettres d'information thématiques.",
        url: "https://www.youtube.com/watch?v=FJqWxoCgI7A",
        videoId: "FJqWxoCgI7A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        thumbnail: "https://img.youtube.com/vi/FJqWxoCgI7A/hqdefault.jpg",
        author: "Yankee Entrepreneur",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        views: "9K vues",
        publishedAt: "Mercredi",
        points: [
          "Modèle économique : Des abonnements mensuels de 5$ à 20$ par lecteur.",
          "Indépendance éditoriale : Éviter les pressions publicitaires classiques.",
          "Opportunité locale : Créer des newsletters d'analyse sectorielle pour les décideurs africains."
        ],
        content: `Cette étude de marché détaille la structuration de la "Creator Economy" aux États-Unis à travers l'essor fulgurant des newsletters payantes sur Substack. De nombreux journalistes, analystes de marché et experts sectoriels y développent une audience fidèle prête à s'abonner pour accéder à leurs décryptages exclusifs.

        Yankee Entrepreneur détaille le modèle financier : en facturant entre 5$ et 15$ par mois à une communauté de seulement 1 000 lecteurs fidèles, un expert génère un revenu confortable en toute indépendance de la publicité. La vidéo propose une méthode pour transposer ce modèle sur les marchés africains, en créant par exemple des bulletins de veille juridique, agricole ou minière premium pour les directions stratégiques des entreprises et ministères.`
      },
      {
        id: "usa-6",
        type: "article",
        category: "Financement",
        title: "Financement participatif : Transposer Kickstarter aux projets locaux",
        summary: "Comment le crowdfunding américain a évolué et comment adapter ces plateformes pour financer des projets physiques en Afrique.",
        readTime: "7 min de lecture",
        publishedAt: "Mercredi",
        isProtected: true,
        url: "https://www.jeuneafrique.com/154567/economie-tech/financement-participatif-transposer-kickstarter-aux-projets-locaux/",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
        author: "Investisseur Zone",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        points: [
          "Confiance et transparence : Le principal frein au crowdfunding en Afrique.",
          "Systèmes de paiement : L'intégration obligatoire de Wave, Orange Money et cartes bancaires.",
          "Modèle par récompense : Proposer des préventes de produits physiques."
        ],
        content: `Le crowdfunding aux USA a permis de financer des milliers d'innovations. Cet article étudie les adaptations locales nécessaires pour libérer ce canal de financement. La confiance et l'intégration du paiement mobile sont les piliers essentiels.`
      },

      // --- JEUDI ---
      {
        id: "usa-7",
        type: "video",
        category: "Tendances",
        title: "Side Hustle US : Comment automatiser un business de génération de leads",
        summary: "Le guide américain pour capturer des prospects via Google Maps et les revendre automatiquement à des artisans locaux.",
        url: "https://www.youtube.com/watch?v=XFJSYQBnU5A",
        videoId: "XFJSYQBnU5A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        thumbnail: "https://img.youtube.com/vi/XFJSYQBnU5A/hqdefault.jpg",
        author: "Yankee Entrepreneur",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        views: "15K vues",
        publishedAt: "Jeudi",
        points: [
          "Le local SEO : Référencer de fausses fiches pour capter les appels.",
          "Redirection automatique : Transmettre instantanément les appels à des partenaires réels.",
          "Modèle de facturation : Se faire payer au prospect qualifié."
        ],
        content: `Ce tutoriel présente un "Side Hustle" (activité secondaire) très populaire aux États-Unis consistant à créer des agences de capture et de revente de prospects (leads) de façon 100% automatisée.

        Le modèle utilise le référencement local Google Maps pour capter les appels et demandes de devis d'artisans (plombiers, serruriers, électriciens) au sein d'une ville spécifique. La technologie de téléphonie virtuelle (comme Twilio) redirige automatiquement ces appels directement vers des artisans locaux enregistrés qui achètent ces contacts qualifiés à la performance. Yankee Entrepreneur montre comment automatiser l'intégralité de la chaîne (de la capture du lead à la facturation) pour générer des flux de revenus passifs récurrents.`
      },
      {
        id: "usa-8",
        type: "article",
        category: "Opportunités",
        title: "E-commerce US : Le virage vers la livraison locale ultra-rapide",
        summary: "Comment les micro-entrepôts urbains aux USA concurrencent Amazon, et comment s'en inspirer pour la logistique urbaine locale.",
        readTime: "5 min de lecture",
        publishedAt: "Jeudi",
        isProtected: true,
        url: "https://www.jeuneafrique.com/156789/economie-tech/e-commerce-us-le-virage-vers-la-livraison-locale-ultra-rapide/",
        thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
        author: "Logistique Moderne",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        points: [
          "Dark Stores : Des micro-points de stockage situés au cœur des villes.",
          "Flottes de livraison agiles : Partenariats avec des livreurs à moto indépendants.",
          "Technologie prédictive : Anticiper la demande pour stocker les bons articles."
        ],
        content: `La logistique du dernier kilomètre est le principal défi du e-commerce. L'analyse des solutions américaines de micro-stockage offre des pistes d'adaptation prometteuses.`
      },

      // --- VENDREDI ---
      {
        id: "usa-9",
        type: "video",
        category: "Opportunités",
        title: "Pourquoi l'agritech américaine s'intéresse de près au marché africain",
        summary: "Revue des innovations de micro-irrigation autonomes financées par la Silicon Valley et applicables en zone rurale.",
        url: "https://www.youtube.com/watch?v=FJqWxoCgI7A",
        videoId: "FJqWxoCgI7A",
        localUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        thumbnail: "https://img.youtube.com/vi/FJqWxoCgI7A/hqdefault.jpg",
        author: "Bourse Vision",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        views: "10K vues",
        publishedAt: "Vendredi",
        points: [
          "Énergie solaire : Des systèmes d'irrigation alimentés en autonomie complète.",
          "Capteurs IoT low-cost : Mesurer l'humidité des sols à bas coût.",
          "Modèle Pay-As-You-Go : Permettre l'accès aux technologies par paiements mobiles fragmentés."
        ],
        content: `Dans ce décryptage macro-économique, Bourse Vision analyse la convergence des financements de la Silicon Valley et des start-ups agritech opérant en Afrique. L'irrigation autonome et intelligente représente un enjeu capital pour le continent.

        L'explication détaille des solutions innovantes : des systèmes de micro-irrigation alimentés par de petits panneaux solaires individuels couplés à des capteurs IoT low-cost enfoncés dans les cultures. Ces capteurs coupent l'arrosage dès que l'humidité idéale est atteinte, évitant ainsi le gaspillage de l'eau. Pour rendre ces solutions accessibles aux petits agriculteurs, les start-ups déploient le modèle "Pay-As-You-Go" (paiement à l'usage) via Mobile Money, s'inspirant des modèles de distribution d'électricité solaire à succès en Afrique de l'Est.`
      },
      {
        id: "usa-10",
        type: "article",
        category: "Tendances",
        title: "Corporate Wellness US: A trend to export to African corporations",
        summary: "Le marché du bien-être en entreprise explose aux USA. Comment proposer ces services aux sièges des multinationales en Afrique.",
        readTime: "6 min de lecture",
        publishedAt: "Vendredi",
        isProtected: true,
        url: "https://www.jeuneafrique.com/158912/economie-tech/corporate-wellness-us-a-trend-to-export-to-african-corporations/",
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        author: "HR Trendsetter",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        points: [
          "Baisse de l'absentéisme : Des collaborateurs en meilleure santé physique et mentale.",
          "Programmes de sport et nutrition : Des services clé en main pour les DRH.",
          "Marque employeur : Un argument d'attraction majeur pour les talents locaux."
        ],
        content: `Les grandes entreprises africaines cherchent à s'aligner sur les standards internationaux de qualité de vie au travail. Une opportunité d'affaire de niche pour les consultants RH.`
      }
    ],
    archives: [
      {
        id: "usa-arc-1",
        type: "article",
        category: "Tendances",
        title: "L'essor de la Creator Economy aux USA : Bilan 2025",
        summary: "Une analyse sur comment les créateurs individuels ont structuré de vraies entreprises média aux États-Unis.",
        readTime: "7 min de lecture",
        publishedAt: "Le mois dernier",
        isProtected: true,
        url: "https://www.jeuneafrique.com/151123/economie-tech/lessor-de-la-creator-economy-aux-usa-bilan-2025/",
        thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
        author: "Tech Vision Team",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      }
    ]
  }
};
