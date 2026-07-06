import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, Calendar, ExternalLink } from 'lucide-react';

export default function ArticleModal({ article, onClose }) {
  if (!article) return null;

  const {
    title,
    summary,
    content,
    points,
    author,
    avatar,
    readTime,
    publishedAt,
    category,
    thumbnail
  } = article;

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
        className="relative w-full max-w-4xl bg-[#0C0E0C] border border-[#1E221F] text-white rounded-[32px] overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header/Close bar floating */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-2.5 rounded-full transition-all hover:scale-105 active:scale-95 border border-[#1E221F]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content area */}
        <div className="overflow-y-auto w-full no-scrollbar">
          {/* Cover Image */}
          <div className="relative w-full h-[250px] sm:h-[350px] bg-[#050505]">
            <img 
              src={thumbnail} 
              alt={title} 
              className="w-full h-full object-cover"
            />
            {/* Soft dark gradient on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E0C] via-[#0C0E0C]/30 to-transparent"></div>

            {/* Title & Metadata inside cover */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-left">
              <span className="bg-[#112318] border border-[#2BB373]/20 text-[#2BB373] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full font-sans shadow-sm mb-3 inline-block">
                {category}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-sans leading-tight mb-4 drop-shadow-sm">
                {title}
              </h1>

              {/* Author & Stats row */}
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-xs sm:text-sm font-sans pt-1 border-t border-[#1E221F]">
                <div className="flex items-center gap-2">
                  <img src={avatar} alt={author} className="w-6 h-6 rounded-full object-cover border border-[#1E221F]" />
                  <span className="font-semibold">{author}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Calendar className="w-3.5 h-3.5 text-[#2BB373]" />
                  <span>{publishedAt}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-300">
                  <Clock className="w-3.5 h-3.5 text-[#2BB373]" />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-6 sm:p-10 text-left flex flex-col md:flex-row gap-8">
            {/* Left side: Principal Content */}
            <div className="flex-1">
              {/* Slogan/Summary in Inter italic style */}
              <p className="text-lg sm:text-xl text-[#2BB373] font-sans italic leading-relaxed mb-6 border-l-4 border-[#2BB373] pl-4">
                {summary}
              </p>

              {/* Real Content with Lettrine */}
              <div className="text-gray-305 font-sans text-base sm:text-lg leading-relaxed space-y-6">
                {content.split('\n\n').map((paragraph, index) => {
                  if (index === 0) {
                    const firstLetter = paragraph.charAt(0);
                    const restOfParagraph = paragraph.slice(1);
                    return (
                      <p key={index} className="clear-both">
                        <span className="first-letter:text-5xl first-letter:font-sans first-letter:font-extrabold first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:text-[#2BB373]">
                          {firstLetter}
                        </span>
                        {restOfParagraph}
                      </p>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>

              {/* External Original Link */}
              {article.url && (
                <div className="mt-8 pt-6 border-t border-[#1E221F] flex justify-start">
                  <a 
                    href={article.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2BB373] hover:bg-[#228f5c] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_2px_10px_rgba(43,179,115,0.2)] cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Consulter l'article original
                  </a>
                </div>
              )}
            </div>

            {/* Right side: Key Points Box */}
            {points && points.length > 0 && (
              <div className="w-full md:w-[280px] shrink-0 self-start bg-[#112318]/25 border border-[#2BB373]/20 rounded-2xl p-5">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 font-sans border-b border-[#1E221F] pb-2">
                  Points Clés de Lecture
                </h3>
                <ul className="space-y-4">
                  {points.map((pt, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 rounded-full bg-[#112318] border border-[#2BB373]/20 text-[#2BB373] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-gray-300 font-sans leading-snug">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
