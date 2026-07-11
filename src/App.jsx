import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import MagazineGrid from './components/MagazineGrid';
import ArticleDetail from './components/ArticleDetail';
import VibrantCard from './components/VibrantCard';
import VideoModal from './components/VideoModal';
import InfoPageDetail from './components/InfoPageDetail';
import PortfolioDashboard from './components/PortfolioDashboard';
import LandingPage from './components/LandingPage';
import { magazineData } from './data/magazineData';
import { supabase } from './lib/supabaseClient';
import { BookOpen, Play, Calendar, Search, Sparkles, Cpu, Star } from 'lucide-react';

function App() {
  const [dbData, setDbData] = useState(magazineData);
  const [showLanding, setShowLanding] = useState(true); // Show landing page on first load
  const [activePortal, setActivePortal] = useState('ia'); // Default to 'ia' portal
  const [isPortfolioActive, setIsPortfolioActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tous'); // Default to 'Tous' showing all categories
  const [timeFilter, setTimeFilter] = useState('week'); // 'today' | 'week' | 'all' | 'archives'
  const [formatFilter, setFormatFilter] = useState('all'); // 'all' | 'videos' | 'articles'
  const [searchQuery, setSearchQuery] = useState(''); // search query
  const [activeArticle, setActiveArticle] = useState(null); // immersive reading view
  const [activeInfoPage, setActiveInfoPage] = useState(null); // 'mentions' | 'politique' | 'propos' | null
  const [selectedVideo, setSelectedVideo] = useState(null); // video modal
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // Header and filter visibility on scroll
  const [lastScrollY, setLastScrollY] = useState(0); // Track last scroll position
  const [isDarkMode, setIsDarkMode] = useState(true); // Theme control

  // Bookmarks State & Persistence
  const [bookmarkedItems, setBookmarkedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('magazinia_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('magazinia_bookmarks', JSON.stringify(bookmarkedItems));
    } catch (e) {
      console.error("Échec de la sauvegarde des favoris :", e);
    }
  }, [bookmarkedItems]);

  const handleToggleBookmark = (item) => {
    setBookmarkedItems(prev => {
      const exists = prev.some(i => i.url === item.url);
      if (exists) {
        return prev.filter(i => i.url !== item.url);
      } else {
        return [...prev, item];
      }
    });
  };

  // Toggle Dark/Light class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle scroll to keep header sticky and visible
  const handleScroll = (e) => {
    setIsHeaderVisible(true);
  };

  // Set document title dynamically
  useEffect(() => {
    let portalName = 'IA';
    if (activePortal === 'qhse') portalName = 'QHSE';
    else if (activePortal === 'finance') portalName = 'Finance';
    else if (activePortal === 'entrepreneuriat') portalName = 'Business';

    document.title = `Magazinia - Magazin.${portalName}`;
  }, [activePortal]);

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

        // Clone the local magazineData to preserve all portals and categories
        const newData = JSON.parse(JSON.stringify(magazineData));
        
        // Reset local default items & archives to prevent duplication with Supabase entries
        Object.keys(newData).forEach(catKey => {
          newData[catKey].items = [];
          newData[catKey].archives = [];
        });

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
          entrepreneurialApps: row.entrepreneurial_apps || '',
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
            newData[catKey].items = (newData[catKey].items || []).filter(i => i.url !== item.url);
            newData[catKey].archives = (newData[catKey].archives || []).filter(i => i.url !== item.url);
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
            newData[catKey].items = (newData[catKey].items || []).filter(i => i.url !== item.url);
            newData[catKey].archives = (newData[catKey].archives || []).filter(i => i.url !== item.url);
            if (row.published_at.toLowerCase().includes('mois')) {
              newData[catKey].archives.push(item);
            } else {
              newData[catKey].items.push(item);
            }
          }
        });

        setDbData(newData);
        console.log("Données de veille Magazinia chargées avec succès depuis Supabase !");
      } catch (err) {
        console.error("Erreur lors de la récupération des données de Supabase. Mode local actif :", err);
      }
    };

    loadSupabaseData();
  }, []);

  // Helpers to resolve categories and merge active portal contents
  const getCategoriesForActivePortal = () => {
    const portalPrefix = activePortal === 'qhse' ? 'qhse-' : activePortal === 'finance' ? 'fin-' : activePortal === 'ia' ? 'ia-' : 'ent-';
    return Object.fromEntries(
      Object.entries(dbData).filter(([key]) => key.startsWith(portalPrefix))
    );
  };

  const portalCategories = getCategoriesForActivePortal();

  // Merge items and archives from all categories in the active portal
  const getAllPortalData = () => {
    let allItems = [];
    let allArchives = [];
    Object.entries(portalCategories).forEach(([catKey, catVal]) => {
      const mappedItems = (catVal.items || []).map(item => ({ ...item, categoryKey: catKey }));
      const mappedArchives = (catVal.archives || []).map(item => ({ ...item, categoryKey: catKey }));
      allItems = [...allItems, ...mappedItems];
      allArchives = [...allArchives, ...mappedArchives];
    });
    return { items: allItems, archives: allArchives };
  };

  const { items: allPortalItems, archives: allPortalArchives } = getAllPortalData();

  // Filter based on currently active tag (either 'Tous' or specific category)
  const getFilteredByCategoryData = () => {
    if (activeCategory === 'Tous') {
      return { items: allPortalItems, archives: allPortalArchives };
    }
    const catData = dbData[activeCategory];
    if (catData) {
      return { 
        items: (catData.items || []).map(item => ({ ...item, categoryKey: activeCategory })), 
        archives: (catData.archives || []).map(item => ({ ...item, categoryKey: activeCategory })) 
      };
    }
    return { items: [], archives: [] };
  };

  const { items, archives } = getFilteredByCategoryData();

  // Color updates requested by user:
  // IA: Blue Original (#3B82F6)
  // QHSE: Orange (#F97316)
  // FINANCE: Green (#10B981)
  // BUSINESS (entrepreneuriat): #ebbb81
  const getAccentColor = (key) => {
    if (key === 'Tous') {
      if (activePortal === 'ia') return '#3B82F6';
      if (activePortal === 'qhse') return '#F97316';
      if (activePortal === 'finance') return '#10B981';
      return '#ebbb81';
    }
    switch (key) {
      case 'ia-informer':
      case 'ia-comprendre':
      case 'ia-pratiquer':
        return '#3B82F6';
      case 'qhse-conformite':
      case 'qhse-prevention':
      case 'qhse-performance':
        return '#F97316';
      case 'fin-entreprises':
      case 'fin-valorisation':
      case 'fin-brvm':
      case 'fin-psychologie':
        return '#10B981';
      case 'ent-creation':
      case 'ent-culture':
      case 'ent-strategie':
      case 'ent-innovation':
      case 'ent-monde':
        return '#ebbb81';
      default: return '#10B981';
    }
  };

  const accentColor = getAccentColor(activeCategory === 'Tous' ? 'Tous' : activeCategory);

  const handlePortalChange = (portalKey) => {
    setActivePortal(portalKey);
    setIsPortfolioActive(false);
    setActiveArticle(null);
    setActiveInfoPage(null);
    setActiveCategory('Tous'); // Default to 'Tous' on portal change
    setTimeFilter('week');
    setFormatFilter('all');
    setSearchQuery('');
  };

  const handleLandingSelect = (portalKey) => {
    handlePortalChange(portalKey);
    setShowLanding(false);
  };

  const handleGoToLanding = () => {
    setShowLanding(true);
    setActiveArticle(null);
    setActiveInfoPage(null);
    setIsPortfolioActive(false);
  };

  const handleOpenPortfolio = () => {
    setIsPortfolioActive(true);
    setActiveArticle(null);
    setActiveInfoPage(null);
  };

  const handleCategoryChange = (categoryKey) => {
    setActiveCategory(categoryKey);
    setTimeFilter('week');
    setFormatFilter('all');
    setSearchQuery('');
    setActiveArticle(null);
    setActiveInfoPage(null);
  };

  const handleOpenArticle = (item) => {
    setActiveInfoPage(null);
    setIsPortfolioActive(false);
    setActiveArticle(item);
  };

  const handleOpenInfoPage = (pageKey) => {
    setActiveArticle(null);
    setIsPortfolioActive(false);
    setActiveInfoPage(pageKey);
  };

  const getHeroTitle = () => {
    let subject = "IA & Tech";
    if (activeCategory === 'Tous') {
      if (activePortal === 'ia') subject = "IA & Tech";
      else if (activePortal === 'qhse') subject = "QHSE";
      else if (activePortal === 'finance') subject = "Finance";
      else if (activePortal === 'entrepreneuriat') subject = "Business";
    } else {
      const catData = dbData[activeCategory];
      subject = catData ? catData.label : "veille";
    }

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

  const getCurrentContentList = () => {
    if (timeFilter === 'archives') return archives;
    return items;
  };

  const currentList = getCurrentContentList();

  const filterTags = ['Tous', ...Object.keys(portalCategories)];

  const getSubcategoryCount = (catKey) => {
    if (catKey === 'Tous') {
      let list = allPortalItems;
      if (timeFilter !== 'archives') {
        list = applyTimeFilter(list);
      }
      list = applyFormatFilter(list);
      return list.length;
    }
    const catData = dbData[catKey];
    if (!catData) return 0;
    let list = catData.items || [];
    if (timeFilter !== 'archives') {
      list = applyTimeFilter(list);
    }
    list = applyFormatFilter(list);
    return list.length;
  };

  const applyTimeFilter = (list) => {
    if (timeFilter === 'today') {
      const todayName = getTodayName();
      return list.filter(item => item.publishedAt === todayName);
    }
    return list;
  };

  const applyFormatFilter = (list) => {
    if (formatFilter === 'videos') {
      return list.filter(item => item.type === 'video');
    } else if (formatFilter === 'articles') {
      return list.filter(item => item.type === 'article');
    }
    return list;
  };

  const getFilteredList = () => {
    let list = currentList;

    if (timeFilter !== 'archives') {
      list = applyTimeFilter(list);
    }

    list = applyFormatFilter(list);

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
    <div 
      style={{ background: isDarkMode ? '#050505' : 'var(--bg-gradient)' }}
      className="w-screen h-screen flex flex-col text-[var(--text-color)] overflow-hidden transition-colors duration-300"
    >
      {/* ── LANDING PAGE ── */}
      <AnimatePresence mode="wait">
        {showLanding && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute inset-0 z-[100] overflow-y-auto no-scrollbar"
          >
            <LandingPage onSelectPortal={handleLandingSelect} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Top Floating Header Capsule */}
      <Header 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange}
        categories={portalCategories}
        activePortal={activePortal}
        onPortalChange={handlePortalChange}
        onOpenPortfolio={handleOpenPortfolio}
        isPortfolioActive={isPortfolioActive}
        isVisible={isHeaderVisible}
        onGoHome={handleGoToLanding}
        isLandingActive={showLanding}
      />

      {/* Floating Premium Dark/Light Mode Switch */}
      <div 
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed right-4 sm:right-6 bottom-20 z-50 w-12 h-24 bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-full flex flex-col justify-between items-center py-2.5 cursor-pointer shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl select-none hover:scale-105 active:scale-95 transition-all duration-300 group"
      >
        <div className="relative flex flex-col justify-between items-center h-full w-full">
          {/* Sliding background capsule/knob */}
          <motion.div
            className="absolute w-9 h-9 rounded-full bg-[var(--text-color)] flex items-center justify-center shadow-lg"
            animate={{ y: isDarkMode ? 40 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            {/* Inner dynamic icon inside the slider */}
            {isDarkMode ? (
              <motion.div
                initial={{ rotate: -90, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-[var(--bg-color)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 90, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-[var(--bg-color)]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              </motion.div>
            )}
          </motion.div>

          {/* Underlay Sun Icon (Muted, disappears under slider) */}
          <div className={`z-10 flex items-center justify-center w-9 h-9 transition-colors duration-300 ${!isDarkMode ? 'text-transparent' : 'text-[var(--text-muted)] group-hover:text-[var(--text-color)]'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
          </div>

          {/* Underlay Moon Icon (Muted, disappears under slider) */}
          <div className={`z-10 flex items-center justify-center w-9 h-9 transition-colors duration-300 ${isDarkMode ? 'text-transparent' : 'text-[var(--text-muted)] group-hover:text-[var(--text-color)]'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content scrollable pane */}
      <div 
        className="flex-1 overflow-y-auto no-scrollbar flex flex-col pt-4 bg-transparent transition-colors duration-300"
        onScroll={handleScroll}
      >
        
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
          ) : activeInfoPage ? (
            /* Immersive Professional White Info Page View */
            <motion.div
              key="info-page"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <InfoPageDetail 
                pageKey={activeInfoPage}
                onBack={() => setActiveInfoPage(null)}
              />
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
                  <span style={{ color: accentColor }} className="text-[10px] font-black uppercase tracking-widest font-sans">
                    Veille Active
                  </span>
                  <span className="text-[var(--text-color)]/20 text-xs font-bold font-sans">|</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] font-sans">
                    {items.length + archives.length} Contenus Analysés
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-color)] leading-tight tracking-tight mb-4 max-w-2xl font-sans transition-colors">
                  {getHeroTitle()}
                </h2>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-xl mb-6 font-sans transition-colors">
                  Chaque matin, l'IA passe l'actualité au crible, articles de presse et vidéos YouTube, et sort les <span className="text-[var(--text-color)] font-semibold">meilleurs contenus</span> qui valent vraiment la peine.
                </p>

                {/* Tag badges row */}
                <div className="flex flex-wrap justify-center gap-2 max-w-2xl font-sans font-black">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--pill-bg)] border border-[var(--border-color)] rounded-full text-[10px] font-extrabold tracking-wide text-[var(--pill-text)] shadow-sm transition-colors">
                    <Sparkles className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    Sélection par IA
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--pill-bg)] border border-[var(--border-color)] rounded-full text-[10px] font-extrabold tracking-wide text-[var(--pill-text)] shadow-sm transition-colors">
                    <Cpu className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    Curation 100% vérifiée
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--pill-bg)] border border-[var(--border-color)] rounded-full text-[10px] font-extrabold tracking-wide text-[var(--pill-text)] shadow-sm transition-colors">
                    <Calendar className="w-3.5 h-3.5" style={{ color: accentColor }} />
                    {getFormattedDate()}
                  </span>
                </div>
              </section>

              {/* Filters & Search Toolbar (Row 1) */}
              <div className="w-full max-w-4xl mx-auto px-6 py-5 bg-[var(--glass-bg)] backdrop-blur-md border-y border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-4 shrink-0 z-10 font-sans transition-colors duration-300">
                
                {/* 1. Time Filter Pills (Period) */}
                <div className="flex gap-1.5 w-full md:w-auto bg-[var(--pill-bg)] p-1 rounded-full border border-[var(--border-color)] overflow-x-auto no-scrollbar transition-colors">
                  {[
                    { id: 'today', label: "Aujourd'hui" },
                    { id: 'week', label: 'Cette semaine' },
                    { id: 'all', label: 'Tout' },
                    { id: 'archives', label: 'Archives (30j)' },
                    { id: 'bookmarks', label: 'Favoris' }
                  ].map((filter) => {
                    const isActive = timeFilter === filter.id;
                    return (
                      <button
                        key={filter.id}
                        onClick={() => {
                          setTimeFilter(filter.id);
                          setActiveCategory('Tous');
                        }}
                        className={`relative flex items-center justify-center px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 select-none cursor-pointer border whitespace-nowrap ${
                          isActive 
                            ? 'text-[var(--bg-color)] bg-[var(--text-color)] border-[var(--text-color)] shadow-sm' 
                            : 'text-[var(--pill-text)] hover:text-[var(--text-color)] bg-transparent border-transparent hover:bg-[var(--text-color)]/5'
                        }`}
                      >
                        <span className="relative z-10">{filter.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 2. Format Filter Pills (Vidéos / Articles) */}
                <div className="flex gap-1.5 w-full md:w-auto bg-[var(--pill-bg)] p-1 rounded-full border border-[var(--border-color)] overflow-x-auto no-scrollbar transition-colors">
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
                            : 'text-[var(--pill-text)] hover:text-[var(--text-color)] bg-transparent border-transparent hover:bg-[var(--text-color)]/5'
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
                    <Search className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Recherche rapide..."
                    className="w-full pl-9 pr-4 py-2.5 border border-[var(--border-color)] rounded-full text-xs font-medium placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 bg-[var(--pill-bg)] text-[var(--text-color)] transition-all"
                    style={{ 
                      borderColor: searchQuery.trim() !== '' ? accentColor : 'var(--border-color)',
                    }}
                  />
                </div>
              </div>

              {/* Categories Tag filters bar (Row 2) */}
              {activePortal !== 'ia' && (
                <div 
                  className={`w-full max-w-4xl mx-auto px-6 py-3.5 flex items-center justify-between overflow-x-auto no-scrollbar z-10 border-b border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-md sticky transition-all duration-300 font-sans ${
                    isHeaderVisible ? 'top-[78px] opacity-100' : 'top-0 -translate-y-full opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="flex gap-2 min-w-max">
                    {filterTags.map((tagKey) => {
                      const isActive = activeCategory === tagKey;
                      const label = tagKey === 'Tous' ? 'Tous' : portalCategories[tagKey]?.label;
                      const count = getSubcategoryCount(tagKey);
                      if (count === 0 && !isActive) return null; // hide empty tags
                      return (
                        <button
                          key={tagKey}
                          onClick={() => handleCategoryChange(tagKey)}
                          className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 select-none cursor-pointer border`}
                          style={{ 
                            backgroundColor: isActive ? accentColor : 'var(--pill-bg)',
                            borderColor: isActive ? accentColor : 'var(--border-color)',
                            color: isActive ? '#FFFFFF' : 'var(--pill-text)'
                          }}
                        >
                          <span>{label}</span>
                          <span 
                            className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                            style={{
                              backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--border-color)',
                              color: isActive ? '#FFFFFF' : 'var(--text-muted)'
                            }}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="hidden sm:block text-[10px] text-[var(--text-muted)] font-extrabold uppercase tracking-widest">
                    {filteredList.length} contenus
                  </div>
                </div>
              )}

              {/* Magazine Grid View */}
              <main className="flex-1 bg-transparent pb-12 transition-colors duration-300">
                {timeFilter === 'bookmarks' ? (
                  (() => {
                    const portalPrefix = activePortal === 'qhse' ? 'qhse-' : activePortal === 'finance' ? 'fin-' : activePortal === 'ia' ? 'ia-' : 'ent-';
                    const portalBookmarks = bookmarkedItems.filter(item => item.categoryKey && item.categoryKey.startsWith(portalPrefix));
                    
                    const filterBySearch = (list) => {
                      if (searchQuery.trim() === '') return list;
                      const q = searchQuery.toLowerCase();
                      return list.filter(item => 
                        item.title.toLowerCase().includes(q) || 
                        item.summary.toLowerCase().includes(q) ||
                        item.category.toLowerCase().includes(q) ||
                        item.author.toLowerCase().includes(q)
                      );
                    };

                    const bookmarkedArticles = filterBySearch(portalBookmarks.filter(item => item.type === 'article'));
                    const bookmarkedVideos = filterBySearch(portalBookmarks.filter(item => item.type === 'video'));

                    return (
                      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 pt-10 pb-16 bg-transparent flex flex-col gap-10 transition-colors duration-300">
                        {/* SECTION 1: VIDEOS */}
                        <div className="flex flex-col text-left">
                          <h2 className="text-xl font-black text-[var(--text-color)] font-sans mb-6 flex items-center gap-2 transition-colors duration-300">
                            <Play className="w-5 h-5" style={{ color: accentColor }} />
                            Vidéos favorites ({bookmarkedVideos.length})
                          </h2>
                          {bookmarkedVideos.length === 0 ? (
                            <p className="text-sm text-[var(--text-muted)] font-sans italic bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--border-color)]">
                              Aucune vidéo enregistrée dans vos favoris pour cette rubrique.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {bookmarkedVideos.map(item => (
                                <VibrantCard
                                  key={item.id}
                                  item={item}
                                  layout="bento"
                                  isBookmarked={true}
                                  onToggleBookmark={handleToggleBookmark}
                                  onOpenArticle={handleOpenArticle}
                                  onOpenVideo={(video) => setSelectedVideo(video)}
                                  accentColor={accentColor}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        {/* SECTION 2: ARTICLES */}
                        <div className="flex flex-col text-left">
                          <h2 className="text-xl font-black text-[var(--text-color)] font-sans mb-6 flex items-center gap-2 transition-colors duration-300">
                            <BookOpen className="w-5 h-5" style={{ color: accentColor }} />
                            Articles favoris ({bookmarkedArticles.length})
                          </h2>
                          {bookmarkedArticles.length === 0 ? (
                            <p className="text-sm text-[var(--text-muted)] font-sans italic bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--border-color)]">
                              Aucun article enregistré dans vos favoris pour cette rubrique.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {bookmarkedArticles.map(item => (
                                <VibrantCard
                                  key={item.id}
                                  item={item}
                                  layout="bento"
                                  isBookmarked={true}
                                  onToggleBookmark={handleToggleBookmark}
                                  onOpenArticle={handleOpenArticle}
                                  onOpenVideo={(video) => setSelectedVideo(video)}
                                  accentColor={accentColor}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <MagazineGrid 
                    items={timeFilter === 'archives' ? [] : filteredList}
                    archives={timeFilter === 'archives' ? filteredList : []}
                    activeFilter={timeFilter}
                    onOpenArticle={handleOpenArticle}
                    onOpenVideo={(video) => setSelectedVideo(video)}
                    bookmarkedIds={bookmarkedItems.map(i => i.url)}
                    onToggleBookmark={handleToggleBookmark}
                    accentColor={accentColor}
                  />
                )}
              </main>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Editorial bar */}
        <footer className="w-full py-8 px-6 sm:px-12 bg-transparent border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)] font-sans mt-auto transition-colors duration-300">
          <p>© 2026 Magazinia. Tous droits réservés.</p>
          <div className="flex gap-6">
            <button 
              onClick={() => handleOpenInfoPage('mentions')} 
              className="hover:text-[var(--text-color)] transition-colors cursor-pointer select-none font-sans text-xs text-[var(--text-muted)] bg-transparent border-none p-0 focus:outline-none"
            >
              Mentions Légales
            </button>
            <button 
              onClick={() => handleOpenInfoPage('politique')} 
              className="hover:text-[var(--text-color)] transition-colors cursor-pointer select-none font-sans text-xs text-[var(--text-muted)] bg-transparent border-none p-0 focus:outline-none"
            >
              Politique de Confidentialité
            </button>
            <button 
              onClick={() => handleOpenInfoPage('propos')} 
              className="hover:text-[var(--text-color)] transition-colors cursor-pointer select-none font-sans text-xs text-[var(--text-muted)] bg-transparent border-none p-0 focus:outline-none"
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
