import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, TrendingUp, ShieldAlert } from 'lucide-react';

const TelegramIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.47-.52-.17l-9.49 5.96-4.11-1.28c-.9-.28-.92-.9.19-1.33l16.05-6.19c.74-.27 1.39.17 1.13 1.29l-2.73 12.83c-.2.92-.75 1.15-1.52.72l-4.16-3.07-2.01 1.94c-.22.22-.41.41-.84.41z"/>
  </svg>
);

export default function Header({ 
  activeCategory, 
  onCategoryChange, 
  categories
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getAccentColor = (key) => {
    switch (key) {
      case 'ia-tech': return '#2BB373';
      case 'bourse-brvm': return '#F59E0B';
      case 'risques-atex': return '#F97316';
      case 'entreprendre-usa': return '#3B82F6';
      default: return '#2BB373';
    }
  };

  const getAccentBg = (key) => {
    switch (key) {
      case 'ia-tech': return 'bg-[#2BB373]';
      case 'bourse-brvm': return 'bg-[#F59E0B]';
      case 'risques-atex': return 'bg-[#F97316]';
      case 'entreprendre-usa': return 'bg-[#3B82F6]';
      default: return 'bg-[#2BB373]';
    }
  };

  const getAccentShadow = (key) => {
    switch (key) {
      case 'ia-tech': return 'shadow-[0_2px_10px_rgba(43,179,115,0.2)]';
      case 'bourse-brvm': return 'shadow-[0_2px_10px_rgba(245,158,11,0.2)]';
      case 'risques-atex': return 'shadow-[0_2px_10px_rgba(249,115,22,0.2)]';
      case 'entreprendre-usa': return 'shadow-[0_2px_10px_rgba(59,130,246,0.2)]';
      default: return 'shadow-[0_2px_10px_rgba(43,179,115,0.2)]';
    }
  };

  const getAccentHoverBg = (key) => {
    switch (key) {
      case 'ia-tech': return 'hover:bg-[#228f5c]';
      case 'bourse-brvm': return 'hover:bg-[#d97706]';
      case 'risques-atex': return 'hover:bg-[#ea580c]';
      case 'entreprendre-usa': return 'hover:bg-[#2563eb]';
      default: return 'hover:bg-[#228f5c]';
    }
  };

  const getLogoText = (key) => {
    switch (key) {
      case 'ia-tech':
        return <>magazine<span className="text-[#2BB373] font-black">.</span>ia</>;
      case 'bourse-brvm':
        return <>magazine<span className="text-[#F59E0B] font-black">.</span>brvm</>;
      case 'risques-atex':
        return <>magazine<span className="text-[#F97316] font-black">.</span>atex</>;
      case 'entreprendre-usa':
        return <>magazine<span className="text-[#3B82F6] font-black">.</span>usa</>;
      default:
        return <>magazine<span className="text-[#2BB373] font-black">.</span>ia</>;
    }
  };

  const getCategoryIcon = (key) => {
    switch (key) {
      case 'ia-tech':
        return <span className="text-sm">🤖</span>;
      case 'bourse-brvm':
        return <TrendingUp className="w-3.5 h-3.5 text-[#F59E0B]" />;
      case 'risques-atex':
        return <ShieldAlert className="w-3.5 h-3.5 text-[#F97316]" />;
      case 'entreprendre-usa':
        return <span className="text-sm">🇺🇸</span>;
      default:
        return null;
    }
  };

  const handleSelectCategory = (key) => {
    onCategoryChange(key);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full max-w-6xl mx-auto px-4 mt-6 sticky top-4 z-50 shrink-0">
      {/* Top Navbar Capsule (Glassmorphism Dark Style) */}
      <div className="w-full dark-glass rounded-full px-6 py-2.5 sm:py-3.5 flex justify-between items-center shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
        
        {/* Brand Logo - Dynamic based on active category */}
        <div className="flex items-center gap-1.5 text-sm font-black text-white uppercase tracking-widest font-sans cursor-pointer select-none">
          {getLogoText(activeCategory)}
        </div>

        {/* Central Subject Navigation (Visible on Desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {Object.entries(categories).map(([key, category]) => {
            const isSelected = activeCategory === key;
            const accentColor = getAccentColor(key);
            return (
              <button
                key={key}
                onClick={() => onCategoryChange(key)}
                style={{ color: isSelected ? accentColor : '' }}
                className={`relative py-1 text-[10px] font-black uppercase tracking-widest transition-colors duration-200 cursor-pointer select-none focus:outline-none ${
                  isSelected ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {category.label}
                {isSelected && (
                  <motion.div
                     layoutId="activeHeaderNav"
                     className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                     style={{ backgroundColor: accentColor }}
                     transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons (Telegram + Mobile Menu) */}
        <div className="flex items-center gap-2">
          {/* Telegram Action with dynamic hover and shadow color matching the active category */}
          <a 
            href="https://t.me/veilleia"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: getAccentColor(activeCategory) }}
            className={`flex items-center gap-1.5 px-4 py-2 sm:py-2.5 text-white rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${getAccentShadow(activeCategory)} ${getAccentHoverBg(activeCategory)} select-none cursor-pointer`}
          >
            <TelegramIcon className="w-3.5 h-3.5 text-white" />
            <span className="hidden lg:inline">Rejoindre le groupe</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2.5 bg-[#111311] border border-[#1E221F] rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer focus:outline-none"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Covered Panel (Full screen overlay style) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#050505] p-6 flex flex-col justify-between"
          >
            <div>
              {/* Header inside menu */}
              <div className="flex justify-between items-center pb-6 border-b border-[#1E221F] mb-8">
                <div className="text-sm font-black text-white uppercase tracking-widest font-sans">
                  {getLogoText(activeCategory)}
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Telegram Circle in Mobile Menu */}
                  <a 
                    href="https://t.me/veilleia"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: getAccentColor(activeCategory) }}
                    className="p-2.5 text-white rounded-full flex items-center justify-center shadow-md cursor-pointer"
                  >
                    <TelegramIcon className="w-4 h-4 text-white" />
                  </a>

                  {/* Close button */}
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2.5 bg-[#111311] border border-[#1E221F] rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer focus:outline-none"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subject Navigation Links for Mobile */}
              <div className="flex flex-col gap-3 text-left">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 px-1">
                  Sujets de veille
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {Object.entries(categories).map(([key, category]) => {
                    const isSelected = activeCategory === key;
                    const accentColor = getAccentColor(key);
                    return (
                      <button
                        key={key}
                        onClick={() => handleSelectCategory(key)}
                        style={{ 
                          backgroundColor: isSelected ? `${accentColor}15` : '',
                          borderColor: isSelected ? `${accentColor}30` : '#1E221F',
                          color: isSelected ? '#FFFFFF' : '' 
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-left transition-colors cursor-pointer select-none border ${
                          isSelected 
                            ? 'text-white' 
                            : 'text-gray-400 bg-[#0C0E0C] hover:text-white'
                        }`}
                      >
                        {getCategoryIcon(key)}
                        <span className="flex-1">{category.label}</span>
                        {isSelected && (
                          <span 
                            className="w-1.5 h-1.5 rounded-full" 
                            style={{ backgroundColor: accentColor }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer inside mobile menu */}
            <div className="text-[10px] text-gray-600 uppercase tracking-widest text-center pt-6 border-t border-[#1E221F]">
              © 2026 Veille.IA — Premium Editorial
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
