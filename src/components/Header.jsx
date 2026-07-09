import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Lock, Cpu, ShieldCheck, TrendingUp, Rocket, ChevronRight } from 'lucide-react';

const TelegramIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" stroke="none">
    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.47-.52-.17l-9.49 5.96-4.11-1.28c-.9-.28-.92-.9.19-1.33l16.05-6.19c.74-.27 1.39.17 1.13 1.29l-2.73 12.83c-.2.92-.75 1.15-1.52.72l-4.16-3.07-2.01 1.94c-.22.22-.41.41-.84.41z"/>
  </svg>
);

// Updated portal color themes:
// IA -> Blue Original (#3B82F6)
// QHSE -> Safety Orange (#F97316)
// FINANCE -> Green (#10B981)
// BUSINESS (entrepreneuriat) -> #ebbb81
const PortalIconBadge = ({ Icon, color, gradientFrom, gradientTo, size = 'md' }) => {
  const sizeClass = size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const iconSize = size === 'lg' ? 18 : 15;
  return (
    <div
      className={`${sizeClass} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}
      style={{ background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)` }}
    >
      <Icon size={iconSize} color="white" strokeWidth={2} />
    </div>
  );
};

const portals = [
  {
    id: 'ia', label: 'IA', desc: 'Intelligence Artificielle & Tech',
    color: '#3B82F6', gradientFrom: '#3B82F6', gradientTo: '#6366F1',
    Icon: Cpu
  },
  {
    id: 'qhse', label: 'QHSE', desc: 'Qualité · Hygiène · Sécurité · Env.',
    color: '#F97316', gradientFrom: '#F97316', gradientTo: '#EF4444',
    Icon: ShieldCheck
  },
  {
    id: 'finance', label: 'FINANCE', desc: 'Marchés financiers & Économie',
    color: '#10B981', gradientFrom: '#10B981', gradientTo: '#059669',
    Icon: TrendingUp
  },
  {
    id: 'entrepreneuriat', label: 'BUSINESS', desc: 'Entrepreneuriat & Stratégie',
    color: '#F59E0B', gradientFrom: '#F59E0B', gradientTo: '#D97706',
    Icon: Rocket
  }
];

export default function Header({ 
  activeCategory, 
  onCategoryChange, 
  categories,
  activePortal,
  onPortalChange,
  onOpenPortfolio,
  isPortfolioActive,
  isVisible = true
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getPortalColor = (portalId) => {
    switch (portalId) {
      case 'ia': return '#3B82F6';
      case 'qhse': return '#F97316';
      case 'finance': return '#10B981';
      case 'entrepreneuriat': return '#ebbb81';
      default: return '#10B981';
    }
  };

  const getPortalShadow = (portalId) => {
    switch (portalId) {
      case 'ia': return 'shadow-[0_2px_10px_rgba(59,130,246,0.2)]';
      case 'qhse': return 'shadow-[0_2px_10px_rgba(249,115,22,0.2)]';
      case 'finance': return 'shadow-[0_2px_10px_rgba(16,185,129,0.2)]';
      case 'entrepreneuriat': return 'shadow-[0_2px_10px_rgba(235,187,129,0.2)]';
      default: return 'shadow-[0_2px_10px_rgba(16,185,129,0.2)]';
    }
  };

  const getPortalHoverBg = (portalId) => {
    switch (portalId) {
      case 'ia': return 'hover:bg-[#2563eb]';
      case 'qhse': return 'hover:bg-[#ea580c]';
      case 'finance': return 'hover:bg-[#059669]';
      case 'entrepreneuriat': return 'hover:bg-[#dca463]';
      default: return 'hover:bg-[#059669]';
    }
  };

  const getLogoText = () => {
    let portalName = 'IA';
    let color = '#3B82F6';
    if (activePortal === 'qhse') {
      portalName = 'QHSE';
      color = '#F97316';
    } else if (activePortal === 'finance') {
      portalName = 'Finance';
      color = '#10B981';
    } else if (activePortal === 'entrepreneuriat') {
      portalName = 'Business';
      color = '#ebbb81';
    }

    return (
      <>
        Magazin
        <span style={{ color }} className="font-black">.{portalName}</span>
      </>
    );
  };

  const portalColor = getPortalColor(activePortal);

  return (
    <header 
      className={`w-full max-w-6xl mx-auto px-4 mt-6 sticky top-4 z-50 shrink-0 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0 pointer-events-none'
      }`}
    >
      {/* Top Navbar Capsule (Glassmorphism Style) */}
      <div className="w-full dark-glass rounded-full px-6 py-2.5 sm:py-3.5 flex justify-between items-center shadow-[0_8px_30px_rgba(0,0,0,0.15)] pointer-events-auto transition-colors duration-300">
        
        {/* Logo (Left) */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => onPortalChange(activePortal)}
            className="flex items-center gap-1.5 text-sm font-sans font-black text-[var(--text-color)] uppercase tracking-widest cursor-pointer select-none transition-colors"
          >
            {getLogoText()}
          </div>
        </div>

        {/* Central Portals Navigation (Visible on Desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {portals.map((portal) => {
            const isSelected = activePortal === portal.id && !isPortfolioActive;
            return (
              <button
                key={portal.id}
                onClick={() => onPortalChange(portal.id)}
                style={{ color: isSelected ? portal.color : '' }}
                className={`relative py-1 text-[10px] font-black uppercase tracking-widest transition-colors duration-200 cursor-pointer select-none focus:outline-none ${
                  isSelected ? 'text-[var(--text-color)]' : 'text-[var(--pill-text)] hover:text-[var(--text-color)]'
                }`}
              >
                {portal.label}
                {isSelected && (
                  <motion.div
                     layoutId="activeHeaderNav"
                     className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                     style={{ backgroundColor: portal.color }}
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
                borderColor: isPortfolioActive ? '#10B981' : 'var(--border-color)',
                backgroundColor: isPortfolioActive ? 'rgba(16,185,129,0.1)' : 'transparent',
                color: isPortfolioActive ? 'var(--text-color)' : '#10B981'
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
            style={{ backgroundColor: portalColor }}
            className={`flex items-center gap-1.5 px-4 py-2 sm:py-2.5 text-white rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${getPortalShadow(activePortal)} ${getPortalHoverBg(activePortal)} select-none cursor-pointer`}
          >
            <TelegramIcon className="w-3.5 h-3.5 text-white" />
            <span className="hidden lg:inline">Rejoindre le groupe</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2.5 bg-[var(--pill-bg)] border border-[var(--border-color)] rounded-full text-[var(--pill-text)] hover:text-[var(--text-color)] transition-colors cursor-pointer focus:outline-none"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Menu — floating panel overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[199]"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            />

            {/* Floating panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="fixed inset-4 z-[200] rounded-3xl flex flex-col overflow-hidden"
              style={{ backgroundColor: '#0c0c0e', border: '1px solid rgba(255,255,255,0.09)' }}
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-sm font-sans font-black text-white uppercase tracking-widest">
                  {getLogoText()}
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full text-white/50 hover:text-white transition-colors cursor-pointer focus:outline-none"
                  style={{ backgroundColor: '#1e1e26', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Portal items */}
              <div className="flex-1 flex flex-col justify-center px-5 py-4 gap-1">
                {activePortal === 'finance' && (
                  <div className="flex justify-end px-2 mb-2">
                    <button
                      onClick={() => { onOpenPortfolio(); setIsMobileMenuOpen(false); }}
                      className="text-[9px] font-black text-[#10B981] uppercase tracking-widest flex items-center gap-1 bg-transparent border-none cursor-pointer"
                    >
                      <Lock className="w-3 h-3" />
                      Carnet Privé
                    </button>
                  </div>
                )}

                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#141417', border: '1px solid rgba(255,255,255,0.06)' }}>
                  {portals.map((portal, index) => {
                    const isSelected = activePortal === portal.id && !isPortfolioActive;
                    return (
                      <div key={portal.id}>
                        <button
                          onClick={() => { onPortalChange(portal.id); setIsMobileMenuOpen(false); }}
                          className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all cursor-pointer select-none active:scale-[0.99]"
                          style={{ backgroundColor: isSelected ? `${portal.color}12` : 'transparent' }}
                        >
                          <PortalIconBadge
                            Icon={portal.Icon}
                            color={portal.color}
                            gradientFrom={portal.gradientFrom}
                            gradientTo={portal.gradientTo}
                            size="lg"
                          />
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-xs font-black uppercase tracking-widest"
                              style={{ color: isSelected ? portal.color : 'rgba(255,255,255,0.88)' }}
                            >
                              {portal.label}
                            </div>
                            <div className="text-[10px] mt-0.5 truncate font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                              {portal.desc}
                            </div>
                          </div>
                          <ChevronRight
                            size={13}
                            style={{ color: isSelected ? portal.color : 'rgba(255,255,255,0.2)' }}
                            className="flex-shrink-0"
                          />
                        </button>
                        {index < portals.length - 1 && (
                          <div className="mx-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-5 text-center">
                <p className="text-[9px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  © 2026 Magazinia — Premium Editorial
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}
