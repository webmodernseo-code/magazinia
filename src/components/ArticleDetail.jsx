import React, { useState } from 'react';
import { ArrowLeft, Share2, ExternalLink, Check, Copy, Play, Award, Lightbulb, BookOpen, Layers, Briefcase, Zap, ShieldAlert } from 'lucide-react';

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
  
  const diff = targetDayNumber - currentDayNumber;
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

const getShortCategoryLabel = (cat) => {
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
  return cat.toUpperCase();
};

export default function ArticleDetail({ 
  article, 
  onBack, 
  accentColor = '#10B981', 
  onWatchVideo 
}) {
  const [copied, setCopied] = useState(false);
  const [backHovered, setBackHovered] = useState(false);

  const {
    id,
    type,
    category,
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
    relatedConcepts = [],
    expertiseLevel = 'Tous niveaux',
    qhseScore = 8.0
  } = article;

  const isFinance = id.startsWith('fin');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSourceLang = () => {
    if (url && (url.includes('.fr') || url.includes('.io/fr') || url.includes('inrs') || url.includes('socotec') || url.includes('afnor') || url.includes('ademe') || url.includes('icsi') || url.includes('brvm') || url.includes('sika') || url.includes('jeuneafrique'))) {
      return 'fr';
    }
    return 'us';
  };

  // Render Score Badge
  const renderScoreBadge = () => {
    return (
      <div 
        style={{ borderColor: `${accentColor}30` }}
        className="flex items-center gap-3 bg-[#111311]/80 backdrop-blur border rounded-2xl p-4 shadow-md font-sans"
      >
        <div className="relative flex items-center justify-center w-12 h-12">
          {/* Circular SVG Tracker */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle 
              cx="24" cy="24" r="20" 
              stroke="#1A1C1A" strokeWidth="3" 
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
          <span className="text-sm font-black text-white">{qhseScore}</span>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">
            {isFinance ? 'Valeur Investissement' : 'Valeur QHSE'}
          </span>
          <span className="text-[10px] font-bold text-gray-300">Score global / 10</span>
        </div>
      </div>
    );
  };

  // RENDER DYNAMIC ANALYSIS FIELDS
  const renderAnalysis = () => {
    return (
      <div className="space-y-8 mt-10 border-t border-[#1E221F] pt-8">
        
        {/* Core summary or findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Key Ideas or Learnings */}
          <div 
            style={{ backgroundColor: `${accentColor}05`, borderColor: `${accentColor}15` }}
            className="border rounded-2xl p-6 text-left font-sans"
          >
            <h3 style={{ color: accentColor }} className="text-xs font-black uppercase tracking-wider mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              {type === 'article' 
                ? (isFinance ? "Idées principales de l'analyse" : "Idées clés de la publication") 
                : "Enseignements majeurs de la vidéo"}
            </h3>
            <ul className="space-y-3">
              {(type === 'article' ? ideas : learnings).map((item, index) => (
                <li key={index} className="flex gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                  <span style={{ color: accentColor }} className="font-bold select-none">{index + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concepts Clés et Méthodes */}
          <div className="flex flex-col gap-6">
            
            {/* Concepts */}
            <div className="bg-[#0C0E0C] border border-[#1E221F] rounded-2xl p-6 text-left font-sans">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4" style={{ color: accentColor }} />
                Concepts importants traités
              </h3>
              <div className="flex flex-wrap gap-2">
                {concepts.map((concept, index) => (
                  <span 
                    key={index}
                    style={{ backgroundColor: `${accentColor}10`, color: accentColor, borderColor: `${accentColor}25` }}
                    className="border text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Methods (Only for QHSE / Finance valuation articles) */}
            {type === 'article' && methods.length > 0 && (
              <div className="bg-[#0C0E0C] border border-[#1E221F] rounded-2xl p-6 text-left font-sans">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4" style={{ color: accentColor }} />
                  {isFinance ? "Méthodes de valorisation ou ratios" : "Méthodes ou modèles présentés"}
                </h3>
                <div className="flex flex-col gap-2">
                  {methods.map((method, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                      <span style={{ backgroundColor: accentColor }} className="w-1.5 h-1.5 rounded-full shrink-0"></span>
                      <span className="font-medium">{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Niveau requis & Archive infos */}
            <div className="bg-[#0C0E0C] border border-[#1E221F] rounded-2xl p-6 text-left font-sans flex justify-between items-center">
              <div>
                <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Niveau requis</span>
                <span className="text-xs font-bold text-gray-200">{expertiseLevel}</span>
              </div>
              <div className="text-right">
                <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Type de source</span>
                <span className="text-xs font-bold text-gray-200 uppercase">{type === 'article' ? 'Revue / Rapport' : 'Conférence / Vidéo'}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Why this is important & Business application */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* Importance */}
          <div className="bg-[#0C0E0C] border border-[#1E221F] rounded-2xl p-6 text-left font-sans">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" style={{ color: accentColor }} />
              {isFinance ? "Ce que l'investisseur apprend" : "Intérêt stratégique QHSE"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {whyImportant}
            </p>
          </div>

          {/* Applications terrains */}
          <div 
            style={{ borderColor: `${accentColor}25` }}
            className="bg-[#0C0E0C] border rounded-2xl p-6 text-left font-sans"
          >
            <h3 style={{ color: accentColor }} className="text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              {isFinance ? "Application pratique pour un portefeuille" : "Applications possibles en entreprise"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {businessApps}
            </p>
          </div>

        </div>

      </div>
    );
  };

  // --- 1. DETAILED VIDEO VIEW ---
  if (type === 'video') {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 py-10 text-left bg-[#050505] text-white rounded-[32px] mb-12 mt-6 animate-fade-in">
        
        {/* Return Button */}
        <button 
          onClick={onBack}
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
          style={{ color: backHovered ? accentColor : '#6E7672' }}
          className="flex items-center gap-1.5 text-[9px] font-black transition-colors uppercase tracking-widest mb-8 cursor-pointer select-none font-sans bg-transparent border-none p-0 focus:outline-none"
        >
          &larr; Retour
        </button>

        {/* Header content and score row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
          <div className="text-left">
            {/* Badges row */}
            <div className="flex flex-wrap gap-2 mb-4 font-sans">
              <span className="bg-red-955/80 border border-red-900/35 text-red-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                YOUTUBE
              </span>
              <span className="border border-white/10 text-gray-300 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-[#111311]">
                {category}
              </span>
              <span className="border border-white/10 text-gray-300 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-[#111311]">
                {duration || '15 min'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight font-sans">
              {title}
            </h1>
          </div>
          <div className="shrink-0">
            {renderScoreBadge()}
          </div>
        </div>

        {/* Author / Date Details */}
        <div className="flex items-center gap-2.5 mb-8 font-sans border-b border-[#1E221F] pb-6">
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
            style={{ 
              backgroundColor: '#111311',
              borderColor: '#1E221F',
              color: '#9AA29E'
            }}
            className="w-6 h-6 rounded-full border flex items-center justify-center text-[8px] font-bold shadow-sm"
          >
            {getAuthorInitials(author)}
          </div>
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wide">{author}</span>
          {authorOrg && (
            <>
              <span className="text-gray-600 text-xs font-bold">•</span>
              <span className="text-xs text-gray-400 font-semibold">{authorOrg}</span>
            </>
          )}
          <span className="text-gray-600 text-xs font-bold">•</span>
          <span className="text-xs text-gray-500 font-medium">{getRealDateForDay(publishedAt)}</span>
        </div>

        {/* Video Cover Image (Acts as preview) */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-[#1E221F] mb-8 bg-[#050505] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <img 
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Summary Description */}
        <div className="text-left font-sans">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
            Description
          </h3>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
            {summary}
          </p>
        </div>

        {/* Detailed Analysis Block */}
        {renderAnalysis()}

        {/* Detailed context text */}
        {content && (
          <div className="border-t border-[#1E221F] pt-8 mt-8 text-left font-sans">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">
              Transcription & Contexte
            </h3>
            <div className="text-gray-400 text-sm sm:text-base leading-relaxed space-y-4">
              {content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {/* Watch Video CTA Button */}
        <div className="flex flex-wrap gap-4 pt-8 mt-8 border-t border-[#1E221F]">
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
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-red-955/40 border border-red-900/30 hover:bg-red-900/20 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-200 select-none cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ouvrir sur YouTube
            </a>
          )}
        </div>

      </div>
    );
  }

  // --- 2. DETAILED ARTICLE VIEW ---
  return (
    <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 py-10 text-left bg-[#050505] text-white mb-12 mt-6 animate-fade-in">
      
      {/* Return Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-1 text-[9px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-widest mb-8 cursor-pointer select-none font-sans bg-transparent border-none p-0 focus:outline-none"
      >
        &larr; Retour
      </button>

      {/* Header and score row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
        <div className="text-left">
          {/* Badges row */}
          <div className="flex flex-wrap gap-1.5 mb-4 font-sans">
            <span className="bg-black/60 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
              {getShortCategoryLabel(category)}
            </span>
            <span className="bg-black/60 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
              {getSourceLang() === 'fr' ? 'FR FRANCE' : 'US UNITED STATES'}
            </span>
            <span className="bg-black/60 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
              {getRealDateForDay(publishedAt).toUpperCase()}
            </span>
            {isProtected && (
              <span className="bg-[#241A0A] border border-[#F59E0B]/20 text-[#F59E0B] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                CONTENU PROTÉGÉ
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-5xl font-black text-white leading-tight tracking-tight font-sans">
            {title}
          </h1>
        </div>
        <div className="shrink-0">
          {renderScoreBadge()}
        </div>
      </div>

      {/* Author Bar */}
      <div className="flex items-center justify-between border-b border-[#1E221F] pb-6 mb-8 w-full">
        <div className="flex items-center gap-2 font-sans">
          <div 
            style={{ 
              backgroundColor: '#111311',
              borderColor: '#1E221F',
              color: '#9AA29E'
            }}
            className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold shadow-sm"
          >
            {getAuthorInitials(author)}
          </div>
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{author.toUpperCase()}</span>
          {authorOrg && (
            <>
              <span className="text-gray-600 text-xs font-bold">•</span>
              <span className="text-xs text-gray-400 font-semibold">{authorOrg}</span>
            </>
          )}
          <span className="text-gray-600 text-xs font-bold">•</span>
          <span className="text-xs text-gray-500 font-medium">{getRealDateForDay(publishedAt)}</span>
        </div>

        {/* Share Copy Button */}
        <div className="flex gap-2">
          <button 
            onClick={handleCopyLink}
            style={{ 
              borderColor: copied ? `${accentColor}50` : '#1E221F'
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#111311] border rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-white hover:bg-white/5 transition-all select-none cursor-pointer focus:outline-none"
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

      {/* Cover Image */}
      <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-[#1E221F] mb-8 bg-[#050505] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Paywall warning card */}
      {isProtected && (
        <div 
          style={{ 
            backgroundColor: `${accentColor}08`, 
            borderColor: `${accentColor}25` 
          }}
          className="border rounded-2xl p-5 mb-8 font-sans flex flex-col gap-2.5 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">🔒</span>
            <h3 style={{ color: accentColor }} className="text-xs font-black uppercase tracking-widest">
              Source sous Abonnement
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            L'accès à l'article d'origine sur la revue technique ou financière exige une inscription ou un abonnement payant. L'IA de <strong>veille.qhse</strong> a extrait pour vous une synthèse scientifique et méthodologique complète ci-dessous.
          </p>
        </div>
      )}

      {/* Summary Paragraph */}
      <div className="text-left font-sans">
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">
          Résumé Analytique
        </h3>
        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-8">
          {summary}
        </p>
      </div>

      {/* Detailed Analysis Block */}
      {renderAnalysis()}

      {/* Full Content (if available) */}
      {content && (
        <div className="border-t border-[#1E221F] pt-8 mt-8 text-left font-sans">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">
            Analyse et Publications
          </h3>
          <div className="text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Read original source button */}
      {url && (
        <div className="flex justify-start pt-8 mt-8 border-t border-[#1E221F]">
          <button 
            onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
            style={{ backgroundColor: accentColor }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-md cursor-pointer border-none focus:outline-none"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Consulter l'original
          </button>
        </div>
      )}

    </div>
  );
}
