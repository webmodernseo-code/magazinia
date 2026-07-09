import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, ExternalLink, Check, Copy, Play, Award, Lightbulb, BookOpen, Layers, Briefcase, Zap, ShieldAlert } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const getRealDateForDay = (dayName) => {
  const daysOfWeek = {
    'Lundi': 1,
    'Mardi': 2,
    'Mercredi': 3,
    'Jeudi': 4,
    'Vendredi': 5
  };
  
  if (!daysOfWeek[dayName]) return dayName;
  
  const targetDayNumber = daysOfWeek[dayName];
  const today = new Date();
  const currentDayNumber = today.getDay() || 7; // 1 = Lundi, ..., 7 = Dimanche
  
  let diff = targetDayNumber - currentDayNumber;
  if (diff > 0) {
    diff -= 7;
  }
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + diff);
  
  const options = { weekday: 'long', day: 'numeric', month: 'short' };
  let formatted = targetDate.toLocaleDateString('fr-FR', options);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const getAuthorInitials = (authorName) => {
  if (!authorName) return 'Q';
  const cleanName = authorName.split(' - ')[0].trim();
  const parts = cleanName.split(' ').filter(p => p.length > 0);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleanName.slice(0, 2).toUpperCase();
};

const getShortCategoryLabel = (cat, catKey = '') => {
  if (!cat) return 'QHSE';
  const ck = catKey.toLowerCase();
  if (ck.startsWith('qhse')) {
    const c = cat.toLowerCase();
    if (c.includes('humain') || c.includes('fof')) return 'Pilier 1';
    if (c.includes('risqu') || c.includes('fiab') || c.includes('secur') || c.includes('conform') || c.includes('norm')) return 'Pilier 2';
    if (c.includes('perf') || c.includes('qual')) return 'Pilier 3';
    if (c.includes('scien') || c.includes('donn')) return 'Pilier 4';
    if (c.includes('strat') || c.includes('envir')) return 'Pilier 5';
    return 'QHSE';
  }
  
  const c = cat.toLowerCase();
  if (c.includes('humain') || c.includes('fof')) return 'Pilier 1';
  if (c.includes('risqu') || c.includes('fiab')) return 'Pilier 2';
  if (c.includes('perf') || c.includes('qual')) return 'Pilier 3';
  if (c.includes('scien') || c.includes('donn')) return 'Pilier 4';
  if (c.includes('strat') || c.includes('envir')) return 'Pilier 5';
  
  if (c.includes('entrepris') || c.includes('fondam')) return 'Catégorie 1';
  if (c.includes('valori') || c.includes('finance')) return 'Catégorie 2';
  if (c.includes('brvm') || c.includes('afriq') || c.includes('écono')) return 'Catégorie 3';
  if (c.includes('psych') || c.includes('patri') || c.includes('straté')) return 'Catégorie 4';

  if (c.includes('creation') || c.includes('opportu')) return 'Catégorie 1';
  if (c.includes('culture') || c.includes('manag')) return 'Catégorie 2';
  if (c.includes('strateg') || c.includes('croiss')) return 'Catégorie 3';
  if (c.includes('innov') || c.includes('techno')) return 'Catégorie 4';
  if (c.includes('monde') || c.includes('compr')) return 'Catégorie 5';
  return cat.toUpperCase();
};

export default function ArticleDetail({ 
  article, 
  onBack, 
  accentColor = '#3B82F6', 
  onWatchVideo 
}) {
  const [copied, setCopied] = useState(false);
  const [backHovered, setBackHovered] = useState(false);
  const [reported, setReported] = useState(false);
  const [showReportSuccess, setShowReportSuccess] = useState(false);

  const {
    id,
    type,
    category,
    categoryKey,
    category_key,
    title,
    summary,
    content,
    thumbnail,
    author,
    authorOrg,
    publishedAt,
    readTime,
    duration,
    url,
    videoId,
    isProtected,
    ideas = [],
    learnings = [],
    concepts = [],
    methods = [],
    whyImportant = '',
    businessApps = '',
    entrepreneurialApps = '',
    relatedConcepts = [],
    expertiseLevel = 'Tous niveaux',
    qhseScore = 8.0
  } = article;

  const [imgSrc, setImgSrc] = useState(thumbnail || '/favicon.svg');

  useEffect(() => {
    setImgSrc(thumbnail || '/favicon.svg');
  }, [thumbnail]);

  const getCategoryLocalFallback = (catKey, itemTitle = '') => {
    const c = catKey ? catKey.toLowerCase() : '';
    const t = itemTitle ? itemTitle.toLowerCase() : '';
    if (c.includes('qhse')) {
      if (t.includes('légifrance') || t.includes('employeur') || t.includes('sécurité')) {
        return '/images/articles/qhse-legifrance.png';
      }
      if (t.includes('aida') || t.includes('seveso') || t.includes('inspection')) {
        return '/images/articles/qhse-aida.png';
      }
      if (t.includes('barpi') || t.includes('aria') || t.includes('déversement') || t.includes('solvant')) {
        return '/images/articles/qhse-barpi.png';
      }
      if (t.includes('actu-environnement') || t.includes('csrd') || t.includes('carbone')) {
        return '/images/articles/qhse-actuenv.png';
      }
      const fallbackList = [
        '/images/articles/qhse-legifrance.png',
        '/images/articles/qhse-aida.png',
        '/images/articles/qhse-barpi.png',
        '/images/articles/qhse-actuenv.png'
      ];
      const idx = itemTitle ? (itemTitle.length % fallbackList.length) : 0;
      return fallbackList[idx];
    }
    if (c.includes('fin') || c.includes('brvm')) {
      return '/images/articles/fin-ent-2.png';
    }
    if (c.includes('ent') || c.includes('usa')) {
      return '/images/articles/ent-cre-2.png';
    }
    if (c.includes('ia') || c.includes('tech')) {
      return '/images/articles/ia-t-1.png';
    }
    return '/images/articles/ia-t-1.png';
  };

  const handleImageError = () => {
    const catK = categoryKey || category_key || category || '';
    const fallbackLocal = getCategoryLocalFallback(catK, title);
    if (imgSrc !== fallbackLocal) {
      setImgSrc(fallbackLocal);
    } else if (imgSrc !== '/favicon.svg') {
      setImgSrc('/favicon.svg');
    }
  };

  const handleReportBroken = async () => {
    if (reported) return;
    setReported(true);
    setShowReportSuccess(true);
    setTimeout(() => setShowReportSuccess(false), 5000);
    
    if (supabase) {
      try {
        await supabase
          .from('broken_reports')
          .insert([{ article_id: id, url: url, reported_at: new Date().toISOString() }]);
      } catch (err) {
        console.warn("Could not sync broken report to database:", err);
      }
    }
  };

  const isFinance = id.startsWith('fin');
  const isEntrepreneuriat = id.startsWith('ent');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSourceLang = () => {
    if (url && (url.includes('.fr') || url.includes('.io/fr') || url.includes('inrs') || url.includes('socotec') || url.includes('afnor') || url.includes('ademe') || url.includes('icsi') || url.includes('brvm') || url.includes('sika') || url.includes('jeuneafrique') || url.includes('lemonde') || url.includes('lesechos'))) {
      return 'fr';
    }
    return 'us';
  };

  // Render Score Badge
  const renderScoreBadge = () => {
    const getScoreLabel = () => {
      if (isFinance) return 'Valeur Investissement';
      if (isEntrepreneuriat) return 'Valeur Éducative';
      return 'Valeur QHSE';
    };

    return (
      <div 
        className="flex items-center gap-3 bg-[var(--card-bg)]/80 backdrop-blur border border-[var(--border-color)] rounded-2xl p-4 shadow-md font-sans transition-colors duration-300"
      >
        <div className="relative flex items-center justify-center w-12 h-12">
          {/* Circular SVG Tracker */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle 
              cx="24" cy="24" r="20" 
              stroke="var(--border-color)" strokeWidth="3" 
              fill="transparent" 
            />
            <circle 
              cx="24" cy="24" r="20" 
              stroke={accentColor} strokeWidth="3" 
              fill="transparent" 
              strokeDasharray={125.6} 
              strokeDashoffset={125.6 - (125.6 * qhseScore) / 10} 
            />
          </svg>
          <span className="text-sm font-black text-[var(--text-color)]">{qhseScore}</span>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest">
            {getScoreLabel()}
          </span>
          <span className="text-[10px] font-bold text-[var(--text-muted)]">Score global / 10</span>
        </div>
      </div>
    );
  };

  // RENDER DYNAMIC ANALYSIS FIELDS
  const renderAnalysis = () => {
    return (
      <div className="space-y-8 mt-10 border-t border-[var(--border-color)] pt-8 transition-colors">
        
        {/* Core summary or findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Key Ideas or Learnings */}
          <div 
            style={{ backgroundColor: `${accentColor}05`, borderColor: `${accentColor}15` }}
            className="border rounded-2xl p-6 text-left font-sans transition-colors"
          >
            <h3 style={{ color: accentColor }} className="text-xs font-black uppercase tracking-wider mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              {type === 'article' 
                ? (isFinance ? "Idées principales de l'analyse" : isEntrepreneuriat ? "5 idées principales" : "Idées clés de la publication") 
                : "Enseignements majeurs de la vidéo"}
            </h3>
            <ul className="space-y-3">
              {(type === 'article' ? ideas : learnings).map((item, index) => (
                <li key={index} className="flex gap-2.5 text-xs sm:text-sm text-[var(--text-color)] leading-relaxed">
                  <span style={{ color: accentColor }} className="font-bold select-none">{index + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concepts Clés et Méthodes */}
          <div className="flex flex-col gap-6">
            
            {/* Concepts */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 text-left font-sans transition-colors">
              <h3 className="text-xs font-black text-[var(--text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" style={{ color: accentColor }} />
                Concepts importants traités
              </h3>
              <div className="flex flex-wrap gap-2">
                {concepts.map((concept, index) => (
                  <span 
                    key={index}
                    style={{ backgroundColor: `${accentColor}10`, color: accentColor, borderColor: `${accentColor}25` }}
                    className="border text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Methods */}
            {type === 'article' && methods.length > 0 && (
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 text-left font-sans transition-colors">
                <h3 className="text-xs font-black text-[var(--text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4" style={{ color: accentColor }} />
                  {isFinance ? "Méthodes de valorisation ou ratios" : "Méthodes ou modèles présentés"}
                </h3>
                <div className="flex flex-col gap-2">
                  {methods.map((method, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-[var(--text-muted)]">
                      <span style={{ backgroundColor: accentColor }} className="w-1.5 h-1.5 rounded-full shrink-0"></span>
                      <span className="font-medium">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Niveau requis & Archive infos */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 text-left font-sans flex justify-between items-center transition-colors">
              <div>
                <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Niveau requis</span>
                <span className="text-xs font-bold text-[var(--text-color)]">{expertiseLevel}</span>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Type de source</span>
                <span className="text-xs font-bold text-[var(--text-color)] uppercase">{type === 'article' ? 'Revue / Rapport' : 'Conférence / Vidéo'}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Why this is important & Business application */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* Importance */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 text-left font-sans transition-colors">
            <h3 className="text-xs font-black text-[var(--text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" style={{ color: accentColor }} />
              {isFinance 
                ? "Ce que l'investisseur apprend" 
                : isEntrepreneuriat 
                  ? "Ce que l'utilisateur apprend" 
                  : "Intérêt stratégique QHSE"}
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {whyImportant}
            </p>
          </div>

          {/* Applications terrains */}
          <div 
            style={{ borderColor: `${accentColor}25` }}
            className="bg-[var(--card-bg)] border rounded-2xl p-6 text-left font-sans animate-fade-in transition-colors"
          >
            <h3 style={{ color: accentColor }} className="text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {isFinance 
                ? "Application pratique pour un portefeuille" 
                : isEntrepreneuriat 
                  ? "Application professionnelle & managériale" 
                  : "Applications possibles en entreprise"}
            </h3>
            
            {isEntrepreneuriat ? (
              <div className="space-y-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                <div>
                  <strong className="text-[var(--text-color)] block mb-0.5">Application Professionnelle :</strong>
                  <p>{businessApps}</p>
                </div>
                {entrepreneurialApps && (
                  <div className="border-t border-white/5 pt-3 mt-3">
                    <strong className="text-[var(--text-color)] block mb-0.5">Application Entrepreneuriale :</strong>
                    <p>{entrepreneurialApps}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                {businessApps}
              </p>
            )}
          </div>

        </div>

      </div>
    );
  };

  // --- 1. DETAILED VIDEO VIEW ---
  if (type === 'video') {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 py-10 text-left bg-[var(--bg-color)] text-[var(--text-color)] rounded-[32px] mb-12 mt-6 animate-fade-in transition-colors duration-300">
        
        {/* Return Button */}
        <button 
          onClick={onBack}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
          style={{ color: backHovered ? accentColor : 'var(--text-muted)' }}
          className="flex items-center gap-1.5 text-[9px] font-black transition-colors uppercase tracking-widest mb-8 cursor-pointer select-none font-sans bg-transparent border-none p-0 focus:outline-none"
        >
          &larr; Retour
        </button>

        {/* Header content and score row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
          <div className="text-left">
            {/* Badges row */}
            <div className="flex flex-wrap gap-2 mb-4 font-sans">
              <span className="bg-red-500/10 border border-red-500/30 text-red-500 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                YOUTUBE
              </span>
              <span className="border border-[var(--border-color)] text-[var(--pill-text)] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-[var(--pill-bg)] transition-colors">
                {category}
              </span>
              <span className="border border-[var(--border-color)] text-[var(--pill-text)] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-[var(--pill-bg)] transition-colors">
                {duration || '15 min'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-color)] leading-tight tracking-tight font-sans transition-colors">
              {title}
            </h1>
          </div>
          <div className="shrink-0">
            {renderScoreBadge()}
          </div>
        </div>

        {/* Author / Date Details */}
        <div className="flex items-center gap-2.5 mb-8 font-sans border-b border-[var(--border-color)] pb-6 transition-colors">
          <div 
            style={{ 
              backgroundColor: `${accentColor}15`,
              borderColor: `${accentColor}30`,
              color: accentColor
            }}
            className="w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0 shadow-sm"
          >
            <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
          </div>
          <div 
            className="w-6 h-6 rounded-full border border-[var(--border-color)] bg-[var(--pill-bg)] text-[var(--pill-text)] flex items-center justify-center text-[8px] font-bold shadow-sm transition-colors"
          >
            {getAuthorInitials(author)}
          </div>
          <span className="text-xs font-bold text-[var(--text-color)] uppercase tracking-wide">{author}</span>
          {authorOrg && (
            <>
              <span className="text-[var(--text-muted)] text-xs font-bold">•</span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">{authorOrg}</span>
            </>
          )}
          <span className="text-[var(--text-muted)] text-xs font-bold">•</span>
          <span className="text-xs text-[var(--text-muted)] font-medium">{getRealDateForDay(publishedAt)}</span>
        </div>

        {/* Video Player */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-[var(--border-color)] mb-8 bg-[var(--bg-color)] shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-colors">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId || (url && url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1])}?autoplay=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Summary Description */}
        <div className="text-left font-sans">
          <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3">
            Description
          </h3>
          <div className="text-sm sm:text-base text-[var(--text-color)] leading-relaxed mb-8 space-y-4">
            {summary.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Detailed Analysis Block */}
        {renderAnalysis()}

        {/* Detailed context text */}
        {content && (
          <div className="border-t border-[var(--border-color)] pt-8 mt-8 text-left font-sans transition-colors">
            <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4">
              Transcription & Contexte
            </h3>
            <div className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed space-y-4">
              {content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {/* Watch Video CTA Button */}
        <div className="flex flex-wrap gap-4 pt-8 mt-8 border-t border-[var(--border-color)] transition-colors">
          <button
            onClick={() => onWatchVideo && onWatchVideo(article)}
            style={{ backgroundColor: accentColor }}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 select-none cursor-pointer border-none focus:outline-none"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Regarder la vidéo
          </button>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 select-none cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ouvrir sur YouTube
            </a>
          )}
          {url && (
            <button
              onClick={handleReportBroken}
              style={{ 
                borderColor: reported ? '#EF4444' : 'var(--border-color)', 
                color: reported ? '#EF4444' : 'var(--text-muted)',
                backgroundColor: reported ? 'rgba(239, 68, 68, 0.05)' : 'transparent' 
              }}
              className="inline-flex items-center gap-2 px-5 py-3.5 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-95 select-none cursor-pointer focus:outline-none"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              {reported ? "Lien signalé" : "Signaler un lien mort"}
            </button>
          )}
        </div>

      </div>
    );
  }

  // --- 2. DETAILED ARTICLE VIEW ---
  return (
    <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 py-10 text-left bg-[var(--bg-color)] text-[var(--text-color)] mb-12 mt-6 animate-fade-in transition-colors duration-300">
      
      {/* Return Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-1 text-[9px] font-black text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors uppercase tracking-widest mb-8 cursor-pointer select-none font-sans bg-transparent border-none p-0 focus:outline-none"
      >
        &larr; Retour
      </button>

      {/* Header and score row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
        <div className="text-left">
          {/* Badges row */}
          <div className="flex flex-wrap gap-1.5 mb-4 font-sans">
            <span className="bg-[var(--pill-bg)] border border-[var(--border-color)] text-[var(--pill-text)] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded transition-colors">
              {getShortCategoryLabel(category, category_key || categoryKey || id || '')}
            </span>
            <span className="bg-[var(--pill-bg)] border border-[var(--border-color)] text-[var(--pill-text)] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded transition-colors">
              {getSourceLang() === 'fr' ? 'FR FRANCE' : 'US UNITED STATES'}
            </span>
            <span className="bg-[var(--pill-bg)] border border-[var(--border-color)] text-[var(--pill-text)] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded transition-colors">
              {getRealDateForDay(publishedAt).toUpperCase()}
            </span>
            {isProtected && (
              <span className="bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                CONTENU PROTÉGÉ
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-5xl font-black text-[var(--text-color)] leading-tight tracking-tight font-sans transition-colors">
            {title}
          </h1>
        </div>
        <div className="shrink-0">
          {renderScoreBadge()}
        </div>
      </div>

      {/* Author Bar */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-6 mb-8 w-full transition-colors">
        <div className="flex items-center gap-2 font-sans">
          <div 
            className="w-6 h-6 rounded-full border border-[var(--border-color)] bg-[var(--pill-bg)] text-[var(--pill-text)] flex items-center justify-center text-[10px] font-bold shadow-sm transition-colors"
          >
            {getAuthorInitials(author)}
          </div>
          <span className="text-[10px] font-black text-[var(--text-color)] uppercase tracking-widest">{(author || '').toUpperCase()}</span>
          {authorOrg && (
            <>
              <span className="text-[var(--text-muted)] text-xs font-bold">•</span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">{authorOrg}</span>
            </>
          )}
          <span className="text-[var(--text-muted)] text-xs font-bold">•</span>
          <span className="text-xs text-[var(--text-muted)] font-medium">{getRealDateForDay(publishedAt)}</span>
        </div>

        {/* Share Copy Button */}
        <div className="flex gap-2">
          <button 
            onClick={handleCopyLink}
            style={{ 
              borderColor: copied ? `${accentColor}50` : 'var(--border-color)'
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[var(--pill-bg)] border border-[var(--border-color)] rounded-full text-[10px] font-bold uppercase tracking-wider text-[var(--pill-text)] hover:text-[var(--text-color)] hover:bg-[var(--text-color)]/5 transition-all select-none cursor-pointer focus:outline-none"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" style={{ color: accentColor }} />
                Copié !
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copier le lien
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cover Image / Video Player */}
      <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-[var(--border-color)] mb-8 bg-[var(--bg-color)] shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-colors">
        {(videoId || (url && url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/))) ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId || url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)[1]}?autoplay=0`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img 
            src={imgSrc} 
            alt={title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        )}
      </div>

      {/* Paywall warning card */}
      {isProtected && (
        <div 
          style={{ 
            backgroundColor: `${accentColor}08`, 
            borderColor: `${accentColor}25` 
          }}
          className="border rounded-2xl p-5 mb-8 font-sans flex flex-col gap-2.5 text-left transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">🔒</span>
            <h3 style={{ color: accentColor }} className="text-xs font-black uppercase tracking-widest">
              Source sous Abonnement
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            L'accès à l'article d'origine sur la revue technique ou financière exige une inscription ou un abonnement payant. L'IA de <strong>Magazinia</strong> a extrait pour vous une synthèse scientifique et méthodologique complète ci-dessous.
          </p>
        </div>
      )}

      {/* Summary Paragraph */}
      <div className="text-left font-sans">
        <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-3">
          Résumé Analytique
        </h3>
        <p className="text-sm sm:text-base text-[var(--text-color)] leading-relaxed mb-8">
          {summary}
        </p>
      </div>

      {/* Detailed Analysis Block */}
      {renderAnalysis()}

      {/* Full Content (if available) */}
      {content && (
        <div className="border-t border-[var(--border-color)] pt-8 mt-8 text-left font-sans transition-colors">
          <h3 className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-4">
            Analyse et Publications
          </h3>
          <div className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed space-y-4">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Read original source button */}
      {url && (
        <div className="flex flex-wrap gap-4 pt-8 mt-8 border-t border-[var(--border-color)] transition-colors">
          <button 
            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
            style={{ backgroundColor: accentColor }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-md cursor-pointer border-none focus:outline-none"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Consulter l'original
          </button>
          <button
            onClick={handleReportBroken}
            style={{ 
              borderColor: reported ? '#EF4444' : 'var(--border-color)', 
              color: reported ? '#EF4444' : 'var(--text-muted)',
              backgroundColor: reported ? 'rgba(239, 68, 68, 0.05)' : 'transparent' 
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 hover:scale-[1.02] active:scale-95 select-none cursor-pointer focus:outline-none"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            {reported ? "Lien signalé" : "Signaler un lien mort"}
          </button>
        </div>
      )}

      {/* Floating Broken Link Feedback Toast */}
      {showReportSuccess && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in pointer-events-none">
          <div className="bg-[var(--card-bg)]/95 backdrop-blur-md border border-red-500/30 shadow-[0_8px_30px_rgba(239,68,68,0.15)] rounded-2xl p-4 flex items-center gap-3 max-w-sm sm:max-w-md transition-colors duration-300">
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-left font-sans">
              <h4 className="text-xs font-black text-[var(--text-color)] uppercase tracking-wider">Signalement enregistré</h4>
              <p className="text-[11px] text-[var(--text-muted)] font-semibold mt-0.5 leading-relaxed">
                Merci ! Ce lien a été signalé comme potentiellement rompu. Notre équipe de veille va le vérifier et le remplacer sous 24h.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
