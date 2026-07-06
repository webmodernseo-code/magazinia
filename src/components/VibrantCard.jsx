import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Heart } from 'lucide-react';

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

export default function VibrantCard({ 
  item, 
  onOpenArticle, 
  onOpenVideo, 
  layout = 'bento',
  accentColor = '#2BB373'
}) {
  const [isLiked, setIsLiked] = useState(false);
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
    videoId
  } = item;

  const initialThumbnail = type === 'video' && videoId 
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` 
    : thumbnail;

  const [imgSrc, setImgSrc] = useState(initialThumbnail);

  useEffect(() => {
    setImgSrc(type === 'video' && videoId 
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` 
      : thumbnail);
  }, [thumbnail, type, videoId]);

  const handleImageError = () => {
    if (imgSrc.includes('maxresdefault.jpg')) {
      setImgSrc(imgSrc.replace('maxresdefault.jpg', 'hqdefault.jpg'));
    } else {
      setImgSrc('https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80');
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
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
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '43, 179, 115';
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
        className="bg-[#0C0E0C] border border-[#1E221F] rounded-3xl overflow-hidden flex flex-col md:flex-row group cursor-pointer transition-all duration-350 h-full min-h-[340px]"
        onClick={handleClick}
      >
        {/* Left Side Image */}
        <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto md:min-h-full overflow-hidden bg-[#050505] shrink-0">
          <img 
            src={imgSrc} 
            alt={title}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500 ease-out"
          />
          
          {/* Category overlay badge top-right */}
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
            {getShortCategoryLabel(category)}
          </div>

          {/* Duration overlay bottom-right */}
          {isVideo && (
            <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-sm text-white text-[9px] font-black px-1.5 py-0.5 rounded">
              {getMockDuration()}
            </div>
          )}
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-left">
          <div>
            {/* Day of week badge + Lang */}
            <div className="flex items-center gap-2 mb-3.5 font-sans">
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
                {getSourceLang().toUpperCase()} • {getRealDateForDay(publishedAt).toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h2 
              style={{ color: isHovered ? accentColor : '#FFFFFF' }}
              className="text-xl sm:text-2xl font-black leading-snug tracking-tight mb-3 transition-colors duration-300"
            >
              {title}
            </h2>

            {/* Summary */}
            <p className="text-xs sm:text-sm text-[#9AA29E] leading-relaxed line-clamp-3 font-sans">
              {summary}
            </p>
          </div>

          {/* Footer Card for Article vs Video */}
          <div className="w-full mt-6">
            <div className="w-full h-px bg-[#1E221F] mb-4" />
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
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{author.toUpperCase()}</span>
                </>
              ) : (
                <>
                  <div 
                    style={{ 
                      backgroundColor: '#111311',
                      borderColor: '#1E221F',
                      color: '#9AA29E'
                    }}
                    className="w-5.5 h-5.5 rounded-full border flex items-center justify-center text-[9px] font-black shadow-sm"
                  >
                    {getAuthorInitials(author)}
                  </div>
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{author.toUpperCase()}</span>
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
      whileHover={{
        scale: 1.01,
        borderColor: `${accentColor}50`,
        boxShadow: `0 12px 40px -10px rgba(${rgbAccent}, 0.15)`
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-[#0C0E0C] border border-[#1E221F] rounded-3xl overflow-hidden flex flex-col justify-between group h-full cursor-pointer transition-all duration-350"
      onClick={handleClick}
    >
      <div>
        {/* Card Thumbnail */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#050505] shrink-0">
          <img 
            src={imgSrc} 
            alt={title}
            onError={handleImageError}
            className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-500 ease-out"
          />

          {/* Category outline badge top-right */}
          <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-white/10 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
            {getShortCategoryLabel(category)}
          </div>

          {/* Duration overlay bottom-right */}
          {isVideo && (
            <div className="absolute bottom-4 right-4 bg-black/85 backdrop-blur-sm text-white text-[9px] font-black px-1.5 py-0.5 rounded">
              {getMockDuration()}
            </div>
          )}

          {/* Like Heart Button */}
          <button 
            onClick={handleLike}
            className="absolute top-4 left-4 bg-[#0C0E0C]/80 hover:bg-[#1E221F] border border-[#1E221F] backdrop-blur-sm p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:scale-105 transition-all shadow-sm cursor-pointer opacity-0 group-hover:opacity-100 focus:outline-none"
          >
            <Heart className={`w-3.5 h-3.5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 text-left flex flex-col">
          {/* Day of week badge + Lang */}
          <div className="flex items-center gap-2 mb-3.5 font-sans">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">
              {getSourceLang().toUpperCase()} • {getRealDateForDay(publishedAt).toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h3 
            style={{ color: isHovered ? accentColor : '#FFFFFF' }}
            className="text-base font-extrabold leading-snug line-clamp-2 transition-colors duration-300"
          >
            {title}
          </h3>

          {/* Summary */}
          <p className="text-xs text-[#9AA29E] leading-relaxed line-clamp-2 mt-2 font-sans">
            {summary}
          </p>
        </div>
      </div>

      {/* Footer Area */}
      <div className="px-6 pb-6 w-full mt-auto">
        <div className="w-full h-px bg-[#1E221F] mb-4" />
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
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{author.toUpperCase()}</span>
            </>
          ) : (
            <>
              <div 
                style={{ 
                  backgroundColor: '#111311',
                  borderColor: '#1E221F',
                  color: '#9AA29E'
                }}
                className="w-5.5 h-5.5 rounded-full border flex items-center justify-center text-[9px] font-black shadow-sm"
              >
                {getAuthorInitials(author)}
              </div>
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{author.toUpperCase()}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
