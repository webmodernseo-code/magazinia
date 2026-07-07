import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import MagazineGrid from './components/MagazineGrid';
import ArticleDetail from './components/ArticleDetail';
import VideoModal from './components/VideoModal';
import PortfolioDashboard from './components/PortfolioDashboard';
import { magazineData } from './data/magazineData';
import { supabase } from './lib/supabaseClient';
import { BookOpen, Play, Calendar, Search, Sparkles, Cpu, Award } from 'lucide-react';

function App() {
  const [dbData, setDbData] = useState(magazineData);
  const [activePortal, setActivePortal] = useState('qhse'); // 'qhse' | 'finance'
  const [isPortfolioActive, setIsPortfolioActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState('qhse-humain');
  const [timeFilter, setTimeFilter] = useState('week'); // 'today' | 'week' | 'all' | 'archives'
  const [formatFilter, setFormatFilter] = useState('all'); // 'all' | 'videos' | 'articles'
  const [activeTagFilter, setActiveTagFilter] = useState('Tous'); // subcategory tag filter
  const [searchQuery, setSearchQuery] = useState(''); // search query
  const [activeArticle, setActiveArticle] = useState(null); // immersive reading view
  const [selectedVideo, setSelectedVideo] = useState(null); // video modal

  useEffect(() => {
    const loadSupabaseData = async () => {
      if (!supabase) {
        console.log("Supabase non configuré (variables d'environnement manquantes). Mode local actif (fallback).");
        return;
      }

      try {
        const { data: articles, error: articlesError } = await supabase
          .from('articles')
          .select('*');

        const { data: videos, error: videosError } = await supabase
          .from('videos')
          .select('*');

        if (articlesError || videosError) {
          throw new Error(articlesError?.message || videosError?.message);
        }

        if (!articles || !videos || (articles.length === 0 && videos.length === 0)) {
          console.log("Les tables Supabase sont vides ou inaccessibles. Mode local actif (fallback).");
          return;
        }

        // Reconstruct the magazineData structure dynamically around 5 QHSE pillars + 4 Finance categories
        const newData = {
          "qhse-humain": {
            label: "Humain & FOF",
            description: "Comprendre comment les comportements humains influencent la sécurité, la qualité et la performance.",
            items: [],
            archives: []
          },
          "qhse-risques": {
            label: "Risques & Fiabilité",
            description: "Comprendre comment construire des organisations sûres, robustes et résilientes.",
            items: [],
            archives: []
          },
          "qhse-performance": {
            label: "Performance & Qualité",
            description: "Comprendre comment améliorer durablement les processus et la performance.",
            items: [],
            archives: []
          },
          "qhse-science": {
            label: "Science & Données",
            description: "Comprendre comment les sciences et technologies transforment le métier QHSE.",
            items: [],
            archives: []
          },
          "qhse-strategie": {
            label: "Stratégie & Environnement",
            description: "Comprendre les transformations économiques, environnementales et industrielles.",
            items: [],
            archives: []
          },
          "fin-entreprises": {
            label: "Entreprises & Analyse",
            description: "Comprendre les entreprises cotées capables de créer de la valeur sur le long terme.",
            items: [],
            archives: []
          },
          "fin-valorisation": {
            label: "Valorisation & Finance",
            description: "Développer une capacité de lecture des états financiers, calcul de valeur intrinsèque et marge de sécurité.",
            items: [],
            archives: []
          },
          "fin-brvm": {
            label: "BRVM & Économie",
            description: "Comprendre le marché financier régional de la BRVM, les décisions de la BCEAO et l'économie ouest-africaine.",
            items: [],
            archives: []
          },
          "fin-psychologie": {
            label: "Psychologie & Patrimoine",
            description: "Développer la discipline de l'investisseur, allocation d'actifs, patience et étude des grands maîtres.",
            items: [],
            archives: []
          }
        };

        const mapArticle = (row) => ({
          id: row.id,
          type: 'article',
          category: row.category,
          title: row.title,
          summary: row.summary,
          content: row.content,
          thumbnail: row.thumbnail,
          author: row.author,
          authorOrg: row.author_org || '',
          publishedAt: row.published_at,
          readTime: row.read_time,
          url: row.url,
          isProtected: row.is_protected,
          ideas: row.ideas || [],
          concepts: row.concepts || [],
          methods: row.methods || [],
          whyImportant: row.why_important || '',
          businessApps: row.business_apps || '',
          relatedConcepts: row.related_concepts || [],
          expertiseLevel: row.expertise_level || 'Tous niveaux',
          qhseScore: Number(row.qhse_score) || 8.0
        });

        const mapVideo = (row) => ({
          id: row.id,
          type: 'video',
          category: row.category,
          title: row.title,
          summary: row.summary,
          content: row.content,
          thumbnail: row.thumbnail,
          author: row.author,
          authorOrg: row.author_org || '',
          publishedAt: row.published_at,
          duration: row.duration,
          url: row.url,
          videoId: row.video_id,
          localUrl: row.local_url,
          learnings: row.learnings || [],
          concepts: row.concepts || [],
          whyImportant: row.why_important || '',
          businessApps: row.business_apps || '',
          expertiseLevel: row.expertise_level || 'Tous niveaux',
          qhseScore: Number(row.qhse_score) || 8.0
        });

        articles.forEach(row => {
          const catKey = row.category_key;
          if (newData[catKey]) {
            const item = mapArticle(row);
            if (row.published_at.toLowerCase().includes('mois')) {
              newData[catKey].archives.push(item);
            } else {
              newData[catKey].items.push(item);
            }
          }
        });

        videos.forEach(row => {
          const catKey = row.category_key;
          if (newData[catKey]) {
            const item = mapVideo(row);
            if (row.published_at.toLowerCase().includes('mois')) {
              newData[catKey].archives.push(item);
            } else {
              newData[catKey].items.push(item);
            }
          }
        });

        setDbData(newData);
        console.log("Données de veille QHSE et Finance chargées avec succès depuis Supabase !");
      } catch (err) {
        console.error("Erreur lors de la récupération des données de Supabase. Mode local actif :", err);
      }
    };

    loadSupabaseData();
  }, []);

  const categories = dbData;
  const currentCategoryData = categories[activeCategory];
  const items = currentCategoryData ? currentCategoryData.items : [];
  const archives = currentCategoryData ? currentCategoryData.archives : [];

  const getAccentColor = (key) => {
    switch (key) {
      case 'qhse-humain': return '#8B5CF6';
      case 'qhse-risques': return '#EF4444';
      case 'qhse-performance': return '#10B981';
      case 'qhse-science': return '#3B82F6';
      case 'qhse-strategie': return '#F59E0B';
      case 'fin-entreprises': return '#F59E0B';
      case 'fin-valorisation': return '#10B981';
      case 'fin-brvm': return '#3B82F6';
      case 'fin-psychologie': return '#8B5CF6';
      default: return '#10B981';
    }
  };

  const accentColor = getAccentColor(activeCategory);

  const handlePortalChange = (portalKey) => {
    setActivePortal(portalKey);
    setIsPortfolioActive(false);
    setActiveArticle(null);
    const defaultCategory = portalKey === 'qhse' ? 'qhse-humain' : 'fin-entreprises';
    setActiveCategory(defaultCategory);
    setTimeFilter('week');
    setFormatFilter('all');
    setActiveTagFilter('Tous');
    setSearchQuery('');
  };

  const handleOpenPortfolio = () => {
    setIsPortfolioActive(true);
    setActiveArticle(null);
  };

  const getCategoriesForActivePortal = () => {
    const portalPrefix = activePortal === 'qhse' ? 'qhse-' : 'fin-';
    return Object.fromEntries(
      Object.entries(dbData).filter(([key]) => key.startsWith(portalPrefix))
    );
  };

  // Reset filters when changing category/subject from Header
  const handleCategoryChange = (categoryKey) => {
    setActiveCategory(categoryKey);
    setTimeFilter('week');
    setFormatFilter('all');
    setActiveTagFilter('Tous');
    setSearchQuery('');
    setActiveArticle(null);
  };

  const handleOpenInfoPage = (pageKey) => {
    const pages = {
      mentions: {
        id: "info-mentions",
        category: "Légal",
        title: "Mentions Légales",
        readTime: "3 min de lecture",
        author: "Directeur de la Publication",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        publishedAt: "Mis à jour le 5 Juillet 2026",
        thumbnail: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
        summary: "Informations légales obligatoires concernant l'éditeur, l'hébergeur et la propriété intellectuelle de la plateforme Magazine IA.",
        content: `### 1. ÉDITEUR DU SITE\nLe site internet Magazine IA est édité par la société d'édition éditoriale MAGAZINE IA SAS, au capital de 50 000 €, immatriculée au Registre du Commerce et des Sociétés (RCS) de Paris sous le numéro 987 654 321.\n\nSiège social : 45 Avenue des Champs-Élysées, 75008 Paris, France.\nDirecteur de la publication : Jonlois.\nContact : contact@magazineia.com\n\n### 2. HÉBERGEMENT DU SITE\nLa plateforme est hébergée par la société Vercel Inc., située à San Francisco, Californie, États-Unis.\nHébergement des bases de données : Supabase Inc., San Francisco, Californie, États-Unis.\n\n### 3. PROPRIÉTÉ INTELLECTUELLE\nTous les droits de propriété intellectuelle sur les éléments structurels du site (design, code source, graphiques) appartiennent exclusivement à MAGAZINE IA SAS. Les contenus tiers curés (miniatures YouTube, extraits d'articles) restent la propriété exclusive de leurs auteurs originaux. L'éditeur s'engage à citer systématiquement les sources et les créateurs originaux.`
      },
      politique: {
        id: "info-politique",
        category: "Confidentialité",
        title: "Politique de Confidentialité",
        readTime: "4 min de lecture",
        author: "Responsable RGPD",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        publishedAt: "Mis à jour le 5 Juillet 2026",
        thumbnail: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=800&q=80",
        summary: "Notre charte d'engagement concernant la protection de vos données personnelles et le respect de votre vie privée.",
        content: `### 1. COLLECTE DES DONNÉES\nWe collectons uniquement les données nécessaires au bon fonctionnement de la plateforme :\n- Adresse e-mail (si abonnement à la newsletter ou inscription au canal).\n- Données de navigation anonymes (via cookies essentiels) pour mesurer l'audience et la performance de notre site.\n\n### 2. UTILISATION DES DONNÉES\nVos données personnelles ne sont jamais partagées, vendues ou cédées à des tiers. Elles sont uniquement utilisées pour vous transmettre notre curation de veille quotidienne ou gérer vos préférences de lecture.\n\n### 3. VOS DROITS\nConformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de portabilité et de suppression de vos données personnelles. Pour exercer ce droit, vous pouvez nous contacter à l'adresse suivante : rgpd@magazineia.com.`
      },
      propos: {
        id: "info-propos",
        category: "À Propos",
        title: "À Propos de Magazine IA",
        readTime: "5 min de lecture",
        author: "Jonlois - Rédacteur en Chef",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        publishedAt: "Éditorial de Juillet 2026",
        thumbnail: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80",
        summary: "Découvrez notre mission, notre méthodologie de curation scientifique et l'équipe derrière le média leader en veille stratégique QHSE.",
        content: `### NOTRE MISSION\nDans un monde industriel et technologique en constante évolution, les professionnels de la Qualité, de l'Hygiène, de la Sécurité et de l'Environnement (QHSE) ont besoin de s'appuyer sur des connaissances solides, validées scientifiquement et directement applicables sur le terrain. La mission de Veille.IA QHSE est d'offrir un filtre ultra-sélectif pour extraire la substantifique moelle de la recherche et des conférences spécialisées.\n\n### NOS 5 PILIERS CLÉS\nNous structurons nos curations scientifiques et techniques autour de 5 piliers fondamentaux :\n- **Pilier 1 : L'Humain & FOF** : Analyse des comportements, culture sécurité, leadership et psychologie du travail.\n- **Pilier 2 : Risques & Fiabilité** : Méthodologies d'analyse de risques (HAZOP, AMDEC, RCA) et résilience.\n- **Pilier 3 : Performance & Qualité** : Lean management, excellence opérationnelle, normes ISO 9001.\n- **Pilier 4 : Science & Données** : Applications de l'IA, data analytics, IoT et maintenance prédictive.\n- **Pilier 5 : Stratégie & Environnement** : ISO 14001, transition écologique, critères ESG et économie circulaire.\n\n### NOTRE MÉTHODOLOGIE\nNotre équipe, secondée par des outils d'analyse sémantique, extrait quotidiennement des revues scientifiques internationales, des publications universitaires et des conférences de référence (INRS, ICSI, ADEME, etc.). Chaque ressource retenue fait l'objet d'une analyse rigoureuse (synthèse d'idées, concepts clés, méthodes) et reçoit une notation stricte sur 10 basée sur sa rigueur scientifique et son utilité opérationnelle.`
      }
    };
    
    if (pages[pageKey]) {
      setActiveArticle(pages[pageKey]);
    }
  };

  const getHeroTitle = () => {
    let subject = "Humain & FOF";
    if (activeCategory === 'qhse-humain') subject = "Humain & FOF";
    else if (activeCategory === 'qhse-risques') subject = "Risques & Fiabilité";
    else if (activeCategory === 'qhse-performance') subject = "Performance & Qualité";
    else if (activeCategory === 'qhse-science') subject = "Science & Données";
    else if (activeCategory === 'qhse-strategie') subject = "Stratégie & Environnement";
    else if (activeCategory === 'fin-entreprises') subject = "Entreprises & Analyse";
    else if (activeCategory === 'fin-valorisation') subject = "Finance & Valorisation";
    else if (activeCategory === 'fin-brvm') subject = "BRVM & Économie";
    else if (activeCategory === 'fin-psychologie') subject = "Psychologie & Patrimoine";

    return (
      <>
        Votre veille {subject}{" "}
        <span style={{ color: accentColor }}>quotidienne.</span>
      </>
    );
  };

  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('fr-FR', options);
  };

  const getTodayName = () => {
    const day = new Date().getDay();
    switch (day) {
      case 1: return 'Lundi';
      case 2: return 'Mardi';
      case 3: return 'Mercredi';
      case 4: return 'Jeudi';
      case 5: return 'Vendredi';
      default: return 'Vendredi'; // fallback to Friday on weekend
    }
  };

  // Get current raw list (archives or weekly items)
  const getCurrentContentList = () => {
    if (timeFilter === 'archives') return archives;
    return items;
  };

  const currentList = getCurrentContentList();
  const subcategories = ['Tous', ...new Set(currentList.map(item => item.category))];

  const getSubcategoryCount = (subcat) => {
    let list = currentList;
    
    // Apply time and format filters to subcategory counts
    if (timeFilter !== 'archives') {
      list = applyTimeFilter(list);
    }
    list = applyFormatFilter(list);

    if (subcat === 'Tous') return list.length;
    return list.filter(item => item.category === subcat).length;
  };

  const applyTimeFilter = (list) => {
    if (timeFilter === 'today') {
      const todayName = getTodayName();
      return list.filter(item => item.publishedAt === todayName);
    }
    // 'week' and 'all' returns all Lundi-Vendredi contents of the active week
    return list;
  };

  const applyFormatFilter = (list) => {
    if (formatFilter === 'videos') {
      return list.filter(item => item.type === 'video');
    } else if (formatFilter === 'articles') {
      return list.filter(item => item.type === 'article');
    }
    return list; // 'all'
  };

  // Global Filtering Logic
  const getFilteredList = () => {
    let list = currentList;

    // Apply time filter
    if (timeFilter !== 'archives') {
      list = applyTimeFilter(list);
    }

    // Apply format filter
    list = applyFormatFilter(list);

    // Apply subcategory tag filter
    if (activeTagFilter !== 'Tous') {
      list = list.filter(item => item.category === activeTagFilter);
    }

    // Apply search query filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      list = list.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.summary.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query)
      );
    }

    return list;
  };

  const filteredList = getFilteredList();

  return (
    <div className="w-screen h-screen flex flex-col bg-[#050505] text-white overflow-hidden">
      {/* Top Floating Header Capsule */}
      <Header 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange}
        categories={getCategoriesForActivePortal()}
        activePortal={activePortal}
        onPortalChange={handlePortalChange}
        onOpenPortfolio={handleOpenPortfolio}
        isPortfolioActive={isPortfolioActive}
      />

      {/* Main Content scrollable pane */}
      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col pt-4 bg-[#050505]">
        
        <AnimatePresence mode="wait">
          {isPortfolioActive ? (
            /* Immersive Private Portfolio View */
            <motion.div
              key="portfolio-dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <PortfolioDashboard accentColor={accentColor} />
            </motion.div>
          ) : activeArticle ? (
            /* Immersive Article Detail View */
            <motion.div
              key="article-detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <ArticleDetail 
                article={activeArticle} 
                onBack={() => setActiveArticle(null)}
                accentColor={accentColor}
                onWatchVideo={(video) => setSelectedVideo(video)}
              />
            </motion.div>
          ) : (
            /* Main Dashboard View */
            <motion.div
              key="main-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex flex-col"
            >
              {/* Central Hero Section */}
              <section className="w-full max-w-4xl mx-auto px-6 pt-10 pb-8 text-center flex flex-col items-center">
                <div 
                  style={{ 
                    borderColor: `${accentColor}25`,
                    backgroundColor: `${accentColor}12`
                  }}
                  className="flex items-center gap-2 mb-4 border px-3 py-1.5 rounded-full"
                >
                  <span className="relative flex h-2 w-2">
                    <span 
                      style={{ backgroundColor: accentColor }}
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    />
                    <span 
                      style={{ backgroundColor: accentColor }}
                      className="relative inline-flex rounded-full h-2 w-2"
                    />
                  </span>
                  <span style={{ color: accentColor }} className="text-[10px] font-black uppercase tracking-widest">
                    Veille Active
                  </span>
                  <span className="text-gray-800 text-xs font-bold">|</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    {items.length + archives.length} Contenus Analysés
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-4 max-w-2xl font-sans">
                  {getHeroTitle()}
                </h2>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl mb-6">
                  Chaque matin, l'IA passe l'actualité au crible, articles de presse et vidéos YouTube, et sort les <span className="text-white font-semibold">meilleurs contenus</span> qui valent vraiment la peine.
                </p>

                {/* Tag badges row */}
                <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0C0E0C] border border-[#1E221F] rounded-full text-[10px] font-extrabold tracking-wide text-[#9AA29E] shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    Sélection par IA
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0C0E0C] border border-[#1E221F] rounded-full text-[10px] font-extrabold tracking-wide text-[#9AA29E] shadow-sm">
                    <Cpu className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    Curation 100% vérifiée
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0C0E0C] border border-[#1E221F] rounded-full text-[10px] font-extrabold tracking-wide text-[#9AA29E] shadow-sm">
                    <Calendar className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    {getFormattedDate()}
                  </span>
                </div>
              </section>

              {/* Filters & Search Toolbar (Row 1) */}
              <div className="w-full max-w-4xl mx-auto px-6 py-5 bg-[#050505] border-y border-[#1E221F] flex flex-col md:flex-row items-center justify-between gap-4 shrink-0 z-10">
                
                {/* 1. Time Filter Pills (Period) */}
                <div className="flex gap-1.5 w-full md:w-auto bg-[#0C0E0C] p-1 rounded-full border border-[#1E221F] overflow-x-auto no-scrollbar">
                  {[
                    { id: 'today', label: "Aujourd'hui" },
                    { id: 'week', label: 'Cette semaine' },
                    { id: 'all', label: 'Tout' },
                    { id: 'archives', label: 'Archives (30j)' }
                  ].map((filter) => {
                    const isActive = timeFilter === filter.id;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => {
                          setTimeFilter(filter.id);
                          setActiveTagFilter('Tous');
                        }}
                        className={`relative flex items-center justify-center px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 select-none cursor-pointer border whitespace-nowrap ${
                          isActive 
                            ? 'text-black bg-white border-white shadow-sm' 
                            : 'text-gray-400 hover:text-white bg-transparent border-transparent hover:bg-white/5'
                        }`}
                      >
                        <span className="relative z-10">{filter.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 2. Format Filter Pills (Vidéos / Articles) */}
                <div className="flex gap-1.5 w-full md:w-auto bg-[#0C0E0C] p-1 rounded-full border border-[#1E221F] overflow-x-auto no-scrollbar">
                  {[
                    { id: 'all', label: 'Tous formats' },
                    { id: 'videos', label: 'Vidéos', icon: <Play className="w-3 h-3" /> },
                    { id: 'articles', label: 'Articles', icon: <BookOpen className="w-3 h-3" /> }
                  ].map((filter) => {
                    const isActive = formatFilter === filter.id;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => setFormatFilter(filter.id)}
                        className={`relative flex items-center gap-1.5 justify-center px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 select-none cursor-pointer border whitespace-nowrap ${
                          isActive 
                            ? 'text-white border-transparent' 
                            : 'text-gray-400 hover:text-white bg-transparent border-transparent hover:bg-white/5'
                        }`}
                        style={{ 
                          backgroundColor: isActive ? accentColor : '',
                          boxShadow: isActive ? `0 2px 10px ${accentColor}30` : ''
                        }}
                      >
                        {filter.icon && <span className="relative z-10">{filter.icon}</span>}
                        <span className="relative z-10">{filter.label}</span>
                      </button>
                    );
                  })}
                </div>
                
                {/* 3. Live Search Input */}
                <div className="relative w-full md:w-64">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-3.5 w-3.5 text-gray-500" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Recherche rapide..."
                    className="w-full pl-9 pr-4 py-2.5 border border-[#1E221F] rounded-full text-xs font-medium placeholder-gray-500 focus:outline-none focus:ring-1 bg-[#0C0E0C] text-white transition-colors"
                    style={{ 
                      borderColor: searchQuery.trim() !== '' ? accentColor : '#1E221F',
                    }}
                  />
                </div>
              </div>

              {/* Subcategories Tag filters bar (Row 2) */}
              <div className="w-full max-w-4xl mx-auto px-6 py-3.5 flex items-center justify-between overflow-x-auto no-scrollbar z-10 border-b border-[#1E221F] bg-[#050505] sticky top-[72px]">
                <div className="flex gap-2 min-w-max">
                  {subcategories.map((subcat) => {
                    const isActive = activeTagFilter === subcat;
                    const count = getSubcategoryCount(subcat);
                    if (count === 0 && !isActive) return null; // hide empty tags
                    return (
                      <button
                        key={subcat}
                        onClick={() => setActiveTagFilter(subcat)}
                        className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 select-none cursor-pointer border`}
                        style={{ 
                          backgroundColor: isActive ? accentColor : '#0C0E0C',
                          borderColor: isActive ? accentColor : '#1E221F',
                          color: isActive ? '#FFFFFF' : '#9AA29E'
                        }}
                      >
                        <span>{subcat}</span>
                        <span 
                          className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : '#1E221F',
                            color: isActive ? '#FFFFFF' : '#6E7672'
                          }}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="hidden sm:block text-[10px] text-gray-500 font-extrabold uppercase tracking-widest">
                  {filteredList.length} contenus
                </div>
              </div>

              {/* Magazine Grid View */}
              <main className="flex-1 bg-[#050505] pb-12">
                <MagazineGrid 
                  items={timeFilter === 'archives' ? [] : filteredList}
                  archives={timeFilter === 'archives' ? filteredList : []}
                  activeFilter={timeFilter}
                  onOpenArticle={setActiveArticle}
                  onOpenVideo={setActiveArticle}
                  accentColor={accentColor}
                />
              </main>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Editorial bar */}
        <footer className="w-full py-8 px-6 sm:px-12 bg-[#050505] border-t border-[#1E221F] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-sans mt-auto">
          <p>© 2026 Magazine IA. Tous droits réservés.</p>
          <div className="flex gap-6">
            <button 
              onClick={() => handleOpenInfoPage('mentions')} 
              className="hover:text-white transition-colors cursor-pointer select-none font-sans text-xs text-gray-500 bg-transparent border-none p-0 focus:outline-none"
            >
              Mentions Légales
            </button>
            <button 
              onClick={() => handleOpenInfoPage('politique')} 
              className="hover:text-white transition-colors cursor-pointer select-none font-sans text-xs text-gray-500 bg-transparent border-none p-0 focus:outline-none"
            >
              Politique de Confidentialité
            </button>
            <button 
              onClick={() => handleOpenInfoPage('propos')} 
              className="hover:text-white transition-colors cursor-pointer select-none font-sans text-xs text-gray-500 bg-transparent border-none p-0 focus:outline-none"
            >
              À Propos
            </button>
          </div>
        </footer>
      </div>

      {/* Video Reader Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal 
            video={selectedVideo} 
            onClose={() => setSelectedVideo(null)}
            accentColor={accentColor}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
