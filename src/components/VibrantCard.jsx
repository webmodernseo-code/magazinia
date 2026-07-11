import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';

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
  if (!authorName) return 'V';
  const cleanName = authorName.split(' - ')[0].trim();
  const parts = cleanName.split(' ').filter(p => p.length > 0);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleanName.slice(0, 2).toUpperCase();
};

const getShortCategoryLabel = (cat, catKey) => {
  const k = (catKey || '').toLowerCase();
  if (k.startsWith('qhse-')) return 'QHSE';
  if (k.startsWith('ia-')) return 'AI';
  if (k.startsWith('fin-')) return 'BRVM';
  if (k.startsWith('ent-')) return 'BUSINESS';

  if (!cat) return 'HSE';
  const c = cat.toLowerCase();
  if (c.includes('qhse') || c.includes('conform') || c.includes('prevent') || c.includes('risqu') || c.includes('secur')) return 'QHSE';
  if (c.includes('agent') || c.includes('auto') || c.includes('proto') || c.includes('infra') || c.includes('frame') || c.includes('ia') || c.includes('tech')) return 'AI';
  if (c.includes('brvm') || c.includes('invest') || c.includes('anal') || c.includes('régle') || c.includes('éduc')) return 'BRVM';
  if (c.includes('atex') || c.includes('norm') || c.includes('matér')) return 'ATEX';
  if (c.includes('usa') || c.includes('tend') || c.includes('finan') || c.includes('oppo')) return 'USA';
  return cat.toUpperCase();
};

export default function VibrantCard({ 
  item, 
  onOpenArticle, 
  onOpenVideo, 
  isBookmarked = false,
  onToggleBookmark,
  layout = 'bento',
  accentColor = '#3B82F6'
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    type,
    category,
    title,
    summary,
    thumbnail,
    author,
    publishedAt,
    readTime,
    url,
    id,
    videoId,
    categoryKey,
    category_key
  } = item;

  const catKey = categoryKey || category_key;

  const getYoutubeId = () => {
    if (videoId) return videoId;
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^#&?]+)/);
    return match ? match[1] : null;
  };

  const activeVideoId = type === 'video' ? getYoutubeId() : null;

  const initialThumbnail = type === 'video' && activeVideoId 
    ? `https://img.youtube.com/vi/${activeVideoId}/maxresdefault.jpg` 
    : (thumbnail || '/favicon.svg');

  const [imgSrc, setImgSrc] = useState(initialThumbnail);

  useEffect(() => {
    const activeId = type === 'video' ? getYoutubeId() : null;
    const nextSrc = type === 'video' && activeId 
      ? `https://img.youtube.com/vi/${activeId}/maxresdefault.jpg` 
      : (thumbnail || '/favicon.svg');
    setImgSrc(nextSrc);
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
    if (imgSrc && imgSrc.includes('maxresdefault.jpg')) {
      setImgSrc(imgSrc.replace('maxresdefault.jpg', 'hqdefault.jpg'));
    } else {
      const fallbackLocal = getCategoryLocalFallback(item.categoryKey || item.category_key, title);
      if (imgSrc !== fallbackLocal) {
        setImgSrc(fallbackLocal);
      } else if (imgSrc !== '/favicon.svg') {
        setImgSrc('/favicon.svg');
      }
    }
  };

  const handleClick = () => {
    if (type === 'article') {
      onOpenArticle(item);
    } else {
      onOpenVideo(item);
    }
  };

  const getSourceLang = () => {
    if (url && (url.includes('.fr') || url.includes('.io/fr') || url.includes('inrs') || url.includes('socotec') || url.includes('brvm') || url.includes('sika') || url.includes('jeuneafrique') || url.includes('lesechos'))) {
      return 'fr';
    }
    return 'us';
  };

  const getMockDuration = () => {
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

  // Hex colors to RGBA for shadows
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '59, 130, 246';
  };

  const rgbAccent = hexToRgb(accentColor);

  const isVideo = type === 'video';

  // --- 1. HERO/BANNER LAYOUT ---
  if (layout === 'hero') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.008,
          borderColor: `${accentColor}50`,
          boxShadow: `0 12px 40px -10px rgba(${rgbAccent}, 0.15)`
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 h-full"
        onClick={handleClick}
      >
        {/* Top Image */}
        <div className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden bg-[var(--bg-color)] shrink-0">
          <img 
            src={imgSrc} 
            alt={title}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500 ease-out"
          />
          
          {/* Category overlay badge top-left */}
          <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm z-10">
            {getShortCategoryLabel(category, catKey)}
          </div>

          {/* Bookmark Button top-right */}
          {onToggleBookmark && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(item);
              }}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 border border-white/10"
              style={{
                boxShadow: isBookmarked ? `0 0 12px ${accentColor}40` : '',
                borderColor: isBookmarked ? accentColor : 'rgba(255,255,255,0.1)'
              }}
            >
              <Star className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
            </button>
          )}

          {/* Duration overlay bottom-right */}
          {isVideo && (
            <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-sm text-white text-[9px] font-black px-1.5 py-0.5 rounded">
              {getMockDuration()}
            </div>
          )}
        </div>

        {/* Bottom Content */}
        <div className="w-full p-6 sm:p-8 flex flex-col justify-between text-left">
          <div>
            {/* Day of week badge + Lang */}
            <div className="flex items-center gap-2 mb-3.5 font-sans">
              <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
                {getSourceLang().toUpperCase()} • {getRealDateForDay(publishedAt).toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h2 
              style={{ color: isHovered ? accentColor : 'var(--text-color)' }}
              className="text-xl sm:text-2xl font-black leading-snug tracking-tight mb-3 transition-colors duration-300"
            >
              {title}
            </h2>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3 font-sans transition-colors">
              {summary}
            </p>
          </div>

          {/* Footer Card for Article vs Video */}
          <div className="w-full mt-6">
            <div className="w-full h-px bg-[var(--border-color)] mb-4" />
            <div className="flex items-center gap-2">
              {isVideo ? (
                <>
                  <div 
                    style={{ 
                      backgroundColor: `${accentColor}15`,
                      borderColor: `${accentColor}30`,
                      color: accentColor
                    }}
                    className="w-5.5 h-5.5 rounded-full border flex items-center justify-center shrink-0"
                  >
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                  </div>
                  <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">{author.toUpperCase()}</span>
                </>
              ) : (
                <>
                  <div 
                    className="w-5.5 h-5.5 rounded-full border border-[var(--border-color)] bg-[var(--pill-bg)] text-[var(--pill-text)] flex items-center justify-center text-[9px] font-black shadow-sm"
                  >
                    {getAuthorInitials(author)}
                  </div>
                  <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">{author.toUpperCase()}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // --- 2. BENTO/STANDARD LAYOUT ---
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015, boxShadow: '0 12px 30px -8px rgba(15, 15, 17, 0.12)' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl flex flex-col justify-between group h-full cursor-pointer transition-all duration-300 p-4 shadow-[var(--card-shadow)]"
      onClick={handleClick}
    >
      <div>
        {/* Card Thumbnail */}
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-[var(--bg-color)] shrink-0 mb-4">
          <img 
            src={imgSrc} 
            alt={title}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />

          {/* Top-left badge: YOUTUBE */}
          {isVideo && (
            <div className="absolute top-3 left-3 bg-black/70 border border-red-500/30 text-red-500 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm backdrop-blur-sm z-10">
              YOUTUBE
            </div>
          )}

          {/* Category outline badge top-left / beside YOUTUBE */}
          <div className={`absolute top-3 ${isVideo ? 'left-20' : 'left-3'} bg-[var(--card-bg)]/80 backdrop-blur-md text-[var(--text-color)] text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm border border-[var(--border-color)]`}>
            {getShortCategoryLabel(category, catKey)}
          </div>

          {/* Bookmark Button top-right */}
          {onToggleBookmark && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(item);
              }}
              className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-200 border border-white/10"
              style={{
                boxShadow: isBookmarked ? `0 0 10px ${accentColor}30` : '',
                borderColor: isBookmarked ? accentColor : 'rgba(255,255,255,0.1)'
              }}
            >
              <Star className={`w-3 h-3 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
            </button>
          )}

          {/* Duration overlay bottom-right */}
          {isVideo && (
            <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              {getMockDuration()}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex flex-col text-left">
          {/* Day of week badge + Lang */}
          <div className="flex items-center gap-1.5 font-sans">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
              {getSourceLang().toUpperCase()}
            </span>
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">
              • {getRealDateForDay(publishedAt).toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h3 
            className="text-lg font-extrabold text-[var(--text-color)] leading-tight tracking-tight line-clamp-2 mt-2 transition-colors duration-300 group-hover:opacity-85"
          >
            {title}
          </h3>

          {/* Summary */}
          <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2 mt-2 font-sans">
            {summary}
          </p>
        </div>
      </div>

      {/* Footer Area */}
      <div className="w-full mt-auto pt-4">
        <div className="w-full h-px bg-[var(--border-color)] mb-4" />
        <div className="flex items-center gap-2">
          {isVideo ? (
            <>
              <div 
                className="w-6 h-6 rounded-full bg-[var(--pill-bg)] border border-[var(--border-color)] flex items-center justify-center shrink-0"
              >
                <Play className="w-2.5 h-2.5 fill-red-500 text-red-500 ml-0.5" />
              </div>
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{author.toUpperCase()}</span>
            </>
          ) : (
            <>
              <div 
                className="w-6 h-6 rounded-full bg-[var(--pill-bg)] text-[var(--pill-text)] border border-[var(--border-color)] flex items-center justify-center text-[10px] font-bold shadow-sm"
              >
                {getAuthorInitials(author)}
              </div>
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">{author.toUpperCase()}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
