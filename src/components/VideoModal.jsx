import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Video } from 'lucide-react';

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" stroke="none">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.387.51A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.882.51 9.387.51 9.387.51s7.505 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.107C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

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

export default function VideoModal({ video, onClose, accentColor = '#2BB373' }) {
  if (!video) return null;

  const {
    title,
    videoId,
    localUrl,
    author,
    publishedAt,
    category
  } = video;

  // Hybrid player mode state: 'local' or 'youtube'
  const [playerMode, setPlayerMode] = useState('youtube');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
      {/* Backdrop blur overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative w-full max-w-4xl bg-[#0C0E0C] border border-[#1E221F] rounded-[32px] overflow-hidden shadow-2xl z-10 flex flex-col"
      >
        {/* Close Button floating */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-2.5 rounded-full transition-all hover:scale-105 active:scale-95 border border-[#1E221F] focus:outline-none cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Player Controls Tab (Local Hybrid Player vs YouTube) */}
        <div className="flex bg-black/50 border-b border-[#1E221F] p-2 gap-2 z-20 justify-start items-center">
          <button
            onClick={() => setPlayerMode('local')}
            style={{ 
              backgroundColor: playerMode === 'local' ? accentColor : '' 
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none ${
              playerMode === 'local'
                ? 'text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Lecteur local
          </button>
          <button
            onClick={() => setPlayerMode('youtube')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer focus:outline-none ${
              playerMode === 'youtube'
                ? 'bg-red-700 text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <YoutubeIcon />
            Lecteur YouTube
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative w-full aspect-video bg-black select-none">
          {playerMode === 'local' ? (
            <video
              src={localUrl}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full object-contain"
            />
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
        </div>

        {/* Metadata Section */}
        <div className="p-6 sm:p-8 text-left bg-[#0C0E0C] border-t border-[#1E221F]">
          <div className="flex items-center gap-2 mb-3">
            <span 
              style={{ 
                color: accentColor, 
                borderColor: `${accentColor}25`,
                backgroundColor: `${accentColor}12`
              }}
              className="border text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full font-sans shadow-sm"
            >
              {category}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white font-sans leading-tight mb-4">
            {title}
          </h2>

          {/* Author & Publish Date Row */}
          <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-450 font-sans border-t border-[#1E221F] pt-4 mt-2">
            <div className="flex items-center gap-2">
              <div 
                style={{ 
                  backgroundColor: `${accentColor}15`,
                  borderColor: `${accentColor}30`,
                  color: accentColor
                }}
                className="w-6 h-6 rounded-full border flex items-center justify-center text-[8px] font-bold shadow-sm"
              >
                {getAuthorInitials(author)}
              </div>
              <span className="font-semibold text-gray-300">{author}</span>
            </div>
            <span className="text-gray-600">•</span>
            <span>Publié {getRealDateForDay(publishedAt)}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
