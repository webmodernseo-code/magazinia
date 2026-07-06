import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import VibrantCard from './VibrantCard';
import { Calendar, BookOpen, Play } from 'lucide-react';

const daysOrder = {
  'Lundi': 1,
  'Mardi': 2,
  'Mercredi': 3,
  'Jeudi': 4,
  'Vendredi': 5
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

export default function MagazineGrid({ 
  items, 
  archives, 
  activeFilter, 
  onOpenArticle, 
  onOpenVideo,
  accentColor = '#2BB373'
}) {
  
  // --- 1. ARCHIVE VIEW LAYOUT (Timeline / Frise chronologique) ---
  if (activeFilter === 'archives') {
    if (!archives || archives.length === 0) {
      return (
        <div className="w-full max-w-4xl mx-auto py-20 text-center text-gray-400 font-sans px-6 bg-[#050505]">
          <Calendar className="w-12 h-12 mx-auto text-gray-500 mb-3" />
          <p>Aucune publication archivée trouvée pour cette recherche ou ce tag.</p>
        </div>
      );
    }

    return (
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 pt-10 pb-16 bg-[#050505] flex flex-col text-left">
        <h2 className="text-xl font-black text-white font-sans mb-8 flex items-center gap-2">
          <Calendar className="w-5 h-5" style={{ color: accentColor }} />
          Archives du mois dernier (30 derniers jours)
        </h2>

        {/* Timeline container */}
        <div className="relative border-l-2 pl-8 ml-4 space-y-10 py-2" style={{ borderColor: `${accentColor}20` }}>
          {archives.map((item, index) => {
            const isVideo = item.type === 'video';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative group animate-fade-in"
              >
                {/* Timeline node dot */}
                <div 
                  className="absolute -left-[41px] top-2 w-5 h-5 rounded-full bg-[#050505] border-4 transition-colors shadow-sm" 
                  style={{ borderColor: accentColor }}
                />

                {/* Content Card */}
                <div 
                  onClick={() => isVideo ? onOpenVideo(item) : onOpenArticle(item)}
                  className="bg-[#0C0E0C] border border-[#1E221F] rounded-2xl p-5 shadow-sm hover:border-transparent transition-all cursor-pointer flex flex-col md:flex-row gap-5 max-w-3xl"
                >
                  {/* Miniature Left */}
                  <div className="w-full md:w-44 h-28 rounded-xl overflow-hidden shrink-0 bg-[#050505] border border-[#1E221F] relative">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                    {isVideo && (
                      <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#0C0E0C]/90 rounded-full flex items-center justify-center shadow-md">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" style={{ color: accentColor }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Text Right */}
                  <div className="flex flex-col justify-between flex-1 text-left">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          style={{ 
                            color: accentColor, 
                            borderColor: `${accentColor}20`,
                            backgroundColor: `${accentColor}12`
                          }}
                          className="text-[9px] font-extrabold uppercase tracking-wider border px-2.5 py-0.5 rounded-full font-sans"
                        >
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500 font-sans font-bold">
                          Archivé le {item.publishedAt}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-extrabold text-white font-sans leading-snug mb-2 group-hover:text-gray-300 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-xs text-[#9AA29E] font-sans line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-4 text-xs font-sans text-gray-400">
                      <div 
                        style={{ 
                          backgroundColor: `${accentColor}15`,
                          borderColor: `${accentColor}30`,
                          color: accentColor
                        }}
                        className="w-5.5 h-5.5 rounded-full border flex items-center justify-center text-[8px] font-bold shadow-sm"
                      >
                        {getAuthorInitials(item.author)}
                      </div>
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">{item.author}</span>
                      <span>•</span>
                      <span>{isVideo ? item.views : item.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Sort weekly contents from Monday to Friday
  const sortedItems = [...items].sort((a, b) => {
    return (daysOrder[a.publishedAt] || 99) - (daysOrder[b.publishedAt] || 99);
  });

  // --- 2. VIDEOS FILTER VIEW ---
  if (activeFilter === 'videos') {
    if (sortedItems.length === 0) {
      return (
        <div className="w-full max-w-4xl mx-auto py-20 text-center text-gray-400 font-sans px-6 bg-[#050505]">
          <Play className="w-12 h-12 mx-auto text-gray-550 mb-3" />
          <p>Aucune vidéo disponible pour cette recherche ou ce tag.</p>
        </div>
      );
    }

    return (
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 pt-10 pb-16 bg-[#050505] flex flex-col text-left">
        <h2 className="text-xl font-black text-white font-sans mb-6 flex items-center gap-2">
          <Play className="w-5 h-5" style={{ color: accentColor }} />
          Vidéos de la rubrique ({sortedItems.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {sortedItems.map((item) => (
              <VibrantCard 
                key={item.id}
                item={item}
                layout="bento"
                onOpenArticle={onOpenArticle}
                onOpenVideo={onOpenVideo}
                accentColor={accentColor}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // --- 3. ARTICLES FILTER VIEW ---
  if (activeFilter === 'articles') {
    if (sortedItems.length === 0) {
      return (
        <div className="w-full max-w-4xl mx-auto py-20 text-center text-gray-400 font-sans px-6 bg-[#050505]">
          <BookOpen className="w-12 h-12 mx-auto text-gray-550 mb-3" />
          <p>Aucun article disponible pour cette recherche ou ce tag.</p>
        </div>
      );
    }

    return (
      <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 pt-10 pb-16 bg-[#050505] flex flex-col text-left">
        <h2 className="text-xl font-black text-white font-sans mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5" style={{ color: accentColor }} />
          Articles de la rubrique ({sortedItems.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {sortedItems.map((item) => (
              <VibrantCard 
                key={item.id}
                item={item}
                layout="bento"
                onOpenArticle={onOpenArticle}
                onOpenVideo={onOpenVideo}
                accentColor={accentColor}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // --- 4. BENTO "À LA UNE" DEFAULT VIEW ---
  if (!sortedItems || sortedItems.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto py-20 text-center text-gray-400 font-sans bg-[#050505]">
        Aucun contenu disponible correspondant aux critères.
      </div>
    );
  }

  const heroItem = sortedItems[0];
  const sideItem = sortedItems[1];
  const middleItems = sortedItems.slice(2, 5);
  const bannerItem = sortedItems[5];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 pt-10 pb-16 bg-[#050505] flex flex-col gap-8">
      {/* 3-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Card 1: Large Featured Hero Card */}
        {heroItem && (
          <div className="lg:col-span-2 md:col-span-2">
            <VibrantCard 
              item={heroItem}
              layout="hero"
              onOpenArticle={onOpenArticle}
              onOpenVideo={onOpenVideo}
              accentColor={accentColor}
            />
          </div>
        )}

        {/* Card 2: Regular Bento Card */}
        {sideItem && (
          <div className="lg:col-span-1 md:col-span-2 lg:md:col-span-1">
            <VibrantCard 
              item={sideItem}
              layout="bento"
              onOpenArticle={onOpenArticle}
              onOpenVideo={onOpenVideo}
              accentColor={accentColor}
            />
          </div>
        )}

        {/* Cards 3, 4, 5: Regular Bento Cards */}
        <AnimatePresence mode="popLayout">
          {middleItems.map((item) => (
            <div key={item.id} className="lg:col-span-1 md:col-span-1">
              <VibrantCard 
                key={item.id}
                item={item}
                layout="bento"
                onOpenArticle={onOpenArticle}
                onOpenVideo={onOpenVideo}
                accentColor={accentColor}
              />
            </div>
          ))}
        </AnimatePresence>

        {/* Card 6: Horizontal Banner Card */}
        {bannerItem && (
          <div className="lg:col-span-3 md:col-span-2">
            <VibrantCard 
              item={bannerItem}
              layout="hero"
              onOpenArticle={onOpenArticle}
              onOpenVideo={onOpenVideo}
              accentColor={accentColor}
            />
          </div>
        )}

        {/* Extra items (if any) in standard 3-column layout */}
        {sortedItems.length > 6 && (
          <AnimatePresence mode="popLayout">
            {sortedItems.slice(6).map((item) => (
              <div key={item.id} className="lg:col-span-1 md:col-span-1">
                <VibrantCard 
                  key={item.id}
                  item={item}
                  layout="bento"
                  onOpenArticle={onOpenArticle}
                  onOpenVideo={onOpenVideo}
                  accentColor={accentColor}
                />
              </div>
            ))}
          </AnimatePresence>
        )}

      </div>
    </div>
  );
}
