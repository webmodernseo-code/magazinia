import React, { useState } from 'react';
import { ArrowLeft, Share2, ExternalLink, Check, Copy, Play } from 'lucide-react';

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
  if (!authorName) return 'V';
  const cleanName = authorName.split(' - ')[0].trim();
  const parts = cleanName.split(' ').filter(p => p.length > 0);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleanName.slice(0, 2).toUpperCase();
};

const getShortCategoryLabel = (cat) => {
  const c = cat.toLowerCase();
  if (c.includes('agent') || c.includes('auto') || c.includes('proto') || c.includes('infra') || c.includes('frame') || c.includes('ia') || c.includes('tech')) return 'AI';
  if (c.includes('brvm') || c.includes('invest') || c.includes('anal') || c.includes('régle') || c.includes('éduc')) return 'BRVM';
  if (c.includes('atex') || c.includes('norm') || c.includes('secu') || c.includes('matér')) return 'ATEX';
  if (c.includes('usa') || c.includes('tend') || c.includes('finan') || c.includes('oppo')) return 'USA';
  return cat.toUpperCase();
};

export default function ArticleDetail({ 
  article, 
  onBack, 
  accentColor = '#2BB373', 
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
    publishedAt,
    readTime,
    points,
    url,
    videoId,
    isProtected
  } = article;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSourceLang = () => {
    if (url && (url.includes('.fr') || url.includes('.io/fr') || url.includes('inrs') || url.includes('socotec') || url.includes('brvm') || url.includes('sika') || url.includes('jeuneafrique') || url.includes('lesechos'))) {
      return 'fr';
    }
    return 'us';
  };

  const getDuration = () => {
    const durations = {
      'ia-1': '13:54',
      'ia-2': '9:55',
      'ia-3': '1:02:15',
      'brvm-1': '15:20',
      'brvm-2': '8:45',
      'brvm-3': '11:10',
      'atex-1': '14:30',
      'atex-2': '22:15',
      'atex-3': '6:50',
      'usa-1': '18:40',
      'usa-2': '12:15',
      'usa-3': '25:10'
    };
    return durations[id] || '12:34';
  };

  const getFormattedDate = () => {
    if (publishedAt.toLowerCase().includes('il y a') || publishedAt.toLowerCase().includes('publié le')) {
      return publishedAt.replace('Publié le ', '');
    }
    return getRealDateForDay(publishedAt);
  };

  // --- 1. DETAILED VIDEO VIEW ---
  if (type === 'video') {
    return (
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 py-10 text-left bg-[#0C0E0C] border border-[#1E221F] text-white rounded-[32px] shadow-sm mb-12 mt-6 animate-fade-in">
        
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

        {/* Badges row */}
        <div className="flex flex-wrap gap-2 mb-4 font-sans">
          <span className="bg-red-955/80 border border-red-900/35 text-red-400 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
            YOUTUBE
          </span>
          <span className="border border-white/10 text-gray-300 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-[#050505]/40">
            {getShortCategoryLabel(category)}
          </span>
          <span className="border border-white/10 text-gray-300 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-[#050505]/40">
            {getDuration()}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight font-sans mb-6">
          {title}
        </h1>

        {/* Author / Date Details */}
        <div className="flex items-center gap-2.5 mb-8 font-sans">
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
          <span className="text-gray-600 text-xs font-bold">•</span>
          <span className="text-xs text-gray-500 font-medium">{getRealDateForDay(publishedAt)}</span>
        </div>

        {/* Video Cover Image (Acts as preview) */}
        <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-[#1E221F] mb-10 bg-[#050505] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
          <img 
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Summary Title */}
        <div className="border-t border-[#1E221F] pt-8 mt-6">
          <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 font-sans">
            Résumé IA
          </h2>

          {/* Key points to take away */}
          {points && points.length > 0 && (
            <div 
              style={{ 
                backgroundColor: `${accentColor}08`, 
                borderColor: `${accentColor}20` 
              }}
              className="border rounded-2xl p-6 mb-8 text-left font-sans"
            >
              <h3 style={{ color: accentColor }} className="text-xs font-extrabold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <span style={{ backgroundColor: accentColor }} className="w-1.5 h-1.5 rounded-full"></span>
                Points clés à retenir
              </h3>
              <ul className="space-y-2.5">
                {points.map((point, index) => (
                  <li key={index} className="flex gap-2.5 text-xs sm:text-sm text-gray-300 leading-relaxed">
                    <span style={{ color: accentColor }} className="font-bold select-none">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Paragraphs */}
          <div className="text-gray-300 font-sans text-base sm:text-lg leading-relaxed space-y-6 mb-10">
            {content ? (
              content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>Aucun résumé détaillé n'est disponible pour cette vidéo.</p>
            )}
          </div>

          {/* Watch Video CTA Button */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-[#1E221F]">
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

      </div>
    );
  }

  // --- 2. DETAILED ARTICLE VIEW (Matches capture 2 and 3 layout perfectly) ---
  return (
    <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 py-10 text-left bg-[#050505] text-white mb-12 mt-6 animate-fade-in">
      
      {/* Return Button (Discreet link top-left) */}
      <button 
        onClick={onBack}
        className="flex items-center gap-1 text-[9px] font-black text-gray-500 hover:text-white transition-colors uppercase tracking-widest mb-8 cursor-pointer select-none font-sans bg-transparent border-none p-0 focus:outline-none"
      >
        &larr; Retour
      </button>

      {/* Badges row (Compact dark badges top-left) */}
      <div className="flex flex-wrap gap-1.5 mb-5 font-sans">
        <span className="bg-black/60 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
          {getShortCategoryLabel(category)}
        </span>
        <span className="bg-black/60 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
          {getSourceLang() === 'fr' ? 'FR FRANCE' : 'US UNITED STATES'}
        </span>
        <span className="bg-black/60 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
          {getFormattedDate().toUpperCase()}
        </span>
        {isProtected && (
          <span className="bg-[#241A0A] border border-[#F59E0B]/20 text-[#F59E0B] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
            CONTENU PROTÉGÉ
          </span>
        )}
      </div>

      {/* Title (Giant bold white title) */}
      <h1 className="text-2xl sm:text-5xl font-black text-white leading-tight tracking-tight font-sans mb-5">
        {title}
      </h1>

      {/* Author Bar (Badge, author in grey caps, date, copy link on the right) */}
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

      {/* Cover Image (Centered under author bar) */}
      <div className="w-full aspect-[16/9] rounded-3xl overflow-hidden border border-[#1E221F] mb-10 bg-[#050505] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content (Full width 1-column layout) */}
      <div className="w-full text-left pt-6">
        {/* Section title "RÉSUMÉ IA" in grey small caps spaced */}
        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 font-sans">
          Résumé IA
        </h3>
        
        {isProtected && (
          /* Paywall alert card in case of protected article */
          <div 
            style={{ 
              backgroundColor: `${accentColor}08`, 
              borderColor: `${accentColor}25` 
            }}
            className="border rounded-2xl p-5 mb-6 font-sans flex flex-col gap-2.5"
          >
            <div className="flex items-center gap-2 text-amber-550">
              <span className="text-sm">🔒</span>
              <h3 style={{ color: accentColor }} className="text-xs font-black uppercase tracking-widest">
                Source sous Abonnement
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              L'accès à l'article d'origine sur le média partenaire exige une inscription ou un abonnement payant. L'IA de <strong>magazine.ia</strong> a extrait pour vous une synthèse claire sous forme de points clés et de résumé exclusif ci-dessous.
            </p>
          </div>
        )}

        {/* IA summary text paragraph (Sobere grey/white very legible) */}
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans mb-8">
          {summary}
        </p>

        {/* Separator line */}
        <div className="w-full h-px bg-[#1E221F] my-6" />

        {/* Read original source button in bottom left */}
        {url && (
          <div className="flex justify-start">
            <button 
              onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
              style={{ backgroundColor: accentColor }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-md cursor-pointer border-none focus:outline-none"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Lire la source originale
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
