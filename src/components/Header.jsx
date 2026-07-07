import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, TrendingUp, ShieldAlert, Lock, BookOpen } from 'lucide-react';

const TelegramIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.47-.52-.17l-9.49 5.96-4.11-1.28c-.9-.28-.92-.9.19-1.33l16.05-6.19c.74-.27 1.39.17 1.13 1.29l-2.73 12.83c-.2.92-.75 1.15-1.52.72l-4.16-3.07-2.01 1.94c-.22.22-.41.41-.84.41z"/>
  </svg>
);

export default function Header({ 
  activeCategory, 
  onCategoryChange, 
  categories,
  activePortal,
  onPortalChange,
  onOpenPortfolio,
  isPortfolioActive
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getAccentColor = (key) => {
    switch (key) {
      case 'qhse-humain': return '#8B5CF6';
      case 'qhse-risques': return '#EF4444';
      case 'qhse-performance': return '#10B981';
      case 'qhse-science': return '#3B82F6';
      case 'qhse-strategie': return '#F59E0B';
      case 'fin-entreprises': return '#F59E0B';
      case 'fin-valorisation': return '#10B981';
      case 'fin-brvm': return '#3B82F6';
      case 'fin-psychologie': return '#8B5CF6';
      case 'ent-creation': return '#F59E0B';
      case 'ent-culture': return '#10B981';
      case 'ent-strategie': return '#3B82F6';
      case 'ent-innovation': return '#8B5CF6';
      case 'ent-monde': return '#EF4444';
      default: return '#10B981';
    }
  };

  const getAccentShadow = (key) => {
    switch (key) {
      case 'qhse-humain': return 'shadow-[0_2px_10px_rgba(139,92,246,0.2)]';
      case 'qhse-risques': return 'shadow-[0_2px_10px_rgba(239,68,68,0.2)]';
      case 'qhse-performance': return 'shadow-[0_2px_10px_rgba(16,185,129,0.2)]';
      case 'qhse-science': return 'shadow-[0_2px_10px_rgba(59,130,246,0.2)]';
      case 'qhse-strategie': return 'shadow-[0_2px_10px_rgba(245,158,11,0.2)]';
      case 'fin-entreprises': return 'shadow-[0_2px_10px_rgba(245,158,11,0.2)]';
      case 'fin-valorisation': return 'shadow-[0_2px_10px_rgba(16,185,129,0.2)]';
      case 'fin-brvm': return 'shadow-[0_2px_10px_rgba(59,130,246,0.2)]';
      case 'fin-psychologie': return 'shadow-[0_2px_10px_rgba(139,92,246,0.2)]';
      case 'ent-creation': return 'shadow-[0_2px_10px_rgba(245,158,11,0.2)]';
      case 'ent-culture': return 'shadow-[0_2px_10px_rgba(16,185,129,0.2)]';
      case 'ent-strategie': return 'shadow-[0_2px_10px_rgba(59,130,246,0.2)]';
      case 'ent-innovation': return 'shadow-[0_2px_10px_rgba(139,92,246,0.2)]';
      case 'ent-monde': return 'shadow-[0_2px_10px_rgba(239,68,68,0.2)]';
      default: return 'shadow-[0_2px_10px_rgba(16,185,129,0.2)]';
    }
  };

  const getAccentHoverBg = (key) => {
    switch (key) {
      case 'qhse-humain': return 'hover:bg-[#7c3aed]';
      case 'qhse-risques': return 'hover:bg-[#dc2626]';
      case 'qhse-performance': return 'hover:bg-[#059669]';
      case 'qhse-science': return 'hover:bg-[#2563eb]';
      case 'qhse-strategie': return 'hover:bg-[#d97706]';
      case 'fin-entreprises': return 'hover:bg-[#d97706]';
      case 'fin-valorisation': return 'hover:bg-[#059669]';
      case 'fin-brvm': return 'hover:bg-[#2563eb]';
      case 'fin-psychologie': return 'hover:bg-[#7c3aed]';
      case 'ent-creation': return 'hover:bg-[#d97706]';
      case 'ent-culture': return 'hover:bg-[#059669]';
      case 'ent-strategie': return 'hover:bg-[#2563eb]';
      case 'ent-innovation': return 'hover:bg-[#7c3aed]';
      case 'ent-monde': return 'hover:bg-[#dc2626]';
      default: return 'hover:bg-[#059669]';
    }
  };

  const getLogoText = (key) => {
    const color = getAccentColor(key);
    return <>veille<span style={{ color }} className="font-black">.</span>ia</>;
  };

  const getCategoryIcon = (key) => {
    switch (key) {
      case 'qhse-humain':
        return <span className="text-sm">🧠</span>;
      case 'qhse-risques':
        return <ShieldAlert className="w-3.5 h-3.5 text-[#EF4444]" />;
      case 'qhse-performance':
        return <span className="text-sm">🎯</span>;
      case 'qhse-science':
        return <span className="text-sm">💻</span>;
      case 'qhse-strategie':
        return <span className="text-sm">🌱</span>;
      case 'fin-entreprises':
        return <span className="text-sm">🏢</span>;
      case 'fin-valorisation':
        return <span className="text-sm">📊</span>;
      case 'fin-brvm':
        return <span className="text-sm">🌍</span>;
      case 'fin-psychologie':
        return <span className="text-sm">🧠</span>;
      case 'ent-creation':
        return <span className="text-sm">💡</span>;
      case 'ent-culture':
        return <span className="text-sm">👥</span>;
      case 'ent-strategie':
        return <span className="text-sm">📈</span>;
      case 'ent-innovation':
        return <span className="text-sm">🚀</span>;
      case 'ent-monde':
        return <span className="text-sm">🌍</span>;
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
        
        {/* Logo and Portal Selector (Left) */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => onPortalChange(activePortal)}
            className="flex items-center gap-1.5 text-sm font-black text-white uppercase tracking-widest font-sans cursor-pointer select-none"
          >
            {getLogoText(activeCategory)}
          </div>
          
          {/* Portal Switcher Capsule */}
          <div className="hidden sm:flex bg-[#111311] border border-[#1E221F] rounded-full p-0.5 text-[8px] font-black uppercase tracking-widest">
            <button 
              onClick={() => onPortalChange('qhse')}
              className={`px-3 py-1 rounded-full cursor-pointer transition-all ${activePortal === 'qhse' ? 'bg-[#10B981] text-white' : 'text-gray-500 hover:text-white bg-transparent'}`}
            >
              QHSE
            </button>
            <button 
              onClick={() => onPortalChange('finance')}
              className={`px-3 py-1 rounded-full cursor-pointer transition-all ${activePortal === 'finance' ? 'bg-[#F59E0B] text-white' : 'text-gray-500 hover:text-white bg-transparent'}`}
            >
              FINANCE
            </button>
            <button 
              onClick={() => onPortalChange('entrepreneuriat')}
              className={`px-3 py-1 rounded-full cursor-pointer transition-all ${activePortal === 'entrepreneuriat' ? 'bg-[#3B82F6] text-white' : 'text-gray-500 hover:text-white bg-transparent'}`}
            >
              BUSINESS
            </button>
          </div>
        </div>

        {/* Central Subject Navigation (Visible on Desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {Object.entries(categories).map(([key, category]) => {
            const isSelected = activeCategory === key && !isPortfolioActive;
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

        {/* Action Buttons (Telegram + Private Portfolio + Mobile Menu) */}
        <div className="flex items-center gap-2">
          {/* Private Portfolio Action (Only for Finance Portal) */}
          {activePortal === 'finance' && (
            <button 
              onClick={onOpenPortfolio}
              style={{ 
                borderColor: isPortfolioActive ? '#F59E0B' : '#1E221F',
                backgroundColor: isPortfolioActive ? 'rgba(245,158,11,0.1)' : 'transparent',
                color: isPortfolioActive ? '#FFFFFF' : '#F59E0B'
              }}
              className="flex items-center gap-1.5 px-4 py-2 border rounded-full text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer bg-transparent focus:outline-none"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Carnet Privé</span>
            </button>
          )}

          {/* Telegram Action */}
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

      {/* Mobile Covered Panel */}
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
              <div className="flex justify-between items-center pb-6 border-b border-[#1E221F] mb-6">
                <div className="text-sm font-black text-white uppercase tracking-widest font-sans">
                  {getLogoText(activeCategory)}
                </div>
                
                <div className="flex items-center gap-3">
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

              {/* Portal Selector for Mobile */}
              <div className="flex gap-1.5 mb-6 p-1 bg-[#0C0E0C] border border-[#1E221F] rounded-2xl">
                <button 
                  onClick={() => { onPortalChange('qhse'); setIsMobileMenuOpen(false); }}
                  className={`flex-1 py-2.5 text-center rounded-xl text-[9px] font-black uppercase tracking-wider cursor-pointer ${activePortal === 'qhse' ? 'bg-[#10B981] text-white' : 'text-gray-500 bg-transparent'}`}
                >
                  QHSE
                </button>
                <button 
                  onClick={() => { onPortalChange('finance'); setIsMobileMenuOpen(false); }}
                  className={`flex-1 py-2.5 text-center rounded-xl text-[9px] font-black uppercase tracking-wider cursor-pointer ${activePortal === 'finance' ? 'bg-[#F59E0B] text-white' : 'text-gray-500 bg-transparent'}`}
                >
                  Finance
                </button>
                <button 
                  onClick={() => { onPortalChange('entrepreneuriat'); setIsMobileMenuOpen(false); }}
                  className={`flex-1 py-2.5 text-center rounded-xl text-[9px] font-black uppercase tracking-wider cursor-pointer ${activePortal === 'entrepreneuriat' ? 'bg-[#3B82F6] text-white' : 'text-gray-500 bg-transparent'}`}
                >
                  Business
                </button>
              </div>

              {/* Subject Navigation Links for Mobile */}
              <div className="flex flex-col gap-3 text-left">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Sujets de veille</span>
                  {activePortal === 'finance' && (
                    <button 
                      onClick={() => { onOpenPortfolio(); setIsMobileMenuOpen(false); }}
                      className="text-[9px] font-black text-[#F59E0B] uppercase tracking-widest flex items-center gap-1 bg-transparent border-none cursor-pointer"
                    >
                      <Lock className="w-3 h-3" />
                      Carnet Privé
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {Object.entries(categories).map(([key, category]) => {
                    const isSelected = activeCategory === key && !isPortfolioActive;
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
