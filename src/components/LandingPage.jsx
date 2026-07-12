import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * Photos Unsplash HD libres de droit — licence gratuite usage commercial
 * Chaque image est orientée "portrait carré" pour les cartes 1:1
 */
const PORTALS = [
  {
    key: 'ia',
    label: 'IA & Tech',
    sub: 'Intelligence Artificielle',
    desc: "LLMs, agents, vibecoding — l'essentiel de l'IA au quotidien.",
    color: '#3B82F6',       // Bleu IA
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=85',
    imageFallback: 'https://images.unsplash.com/photo-1684369175833-3725c88b0d47?auto=format&fit=crop&w=800&q=85',
  },
  {
    key: 'qhse',
    label: 'QHSE',
    sub: 'Sécurité & Environnement',
    desc: "Conformité ISO, risques ATEX, prévention et performance durable.",
    color: '#F97316',       // Orange QHSE
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=85',
    imageFallback: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=85',
  },
  {
    key: 'finance',
    label: 'Finance',
    sub: 'Marchés & Investissements',
    desc: "Bourse BRVM, analyses macro, dividendes et stratégies d'investissement.",
    color: '#10B981',       // Vert Finance
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=85',
    imageFallback: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=85',
  },
  {
    key: 'entrepreneuriat',
    label: 'Business',
    sub: 'Entrepreneuriat & Stratégie',
    desc: "Méthodes Lean, culture startup, opportunités aux USA et en Afrique.",
    color: '#ebbb81',       // Or doré Business
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85',
    imageFallback: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=85',
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function LandingPage({ onSelectPortal, isDarkMode, setIsDarkMode }) {
  const [hovered, setHovered] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 30);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: isDarkMode ? '#050505' : 'var(--bg-gradient)',
        color: 'var(--text-color)',
        fontFamily: "'Inter', sans-serif",
        transition: 'background-color 0.3s ease, color 0.3s ease, background 0.3s ease',
      }}
      className="flex flex-col w-full"
    >
      {/* ── TOP NAVBAR WITH THEME TOGGLE ── */}
      <div className="w-full max-w-[960px] mx-auto px-6 pt-6 flex justify-end items-center">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-color)] text-[10px] font-black uppercase tracking-wider cursor-pointer shadow-[var(--card-shadow)] hover:scale-105 active:scale-95 transition-all duration-300 select-none focus:outline-none"
        >
          {isDarkMode ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--accent-bright)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <span>Mode Clair</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
              <span>Mode Sombre</span>
            </>
          )}
        </button>
      </div>

      {/* ── HERO ── */}
      <motion.section
        initial={{ opacity: 0, y: -12 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
        className="w-full max-w-3xl mx-auto px-6 pt-10 pb-8 text-center"
      >
        <p
          className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--text-muted)] mb-3"
        >
          Choisissez votre univers
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'var(--text-color)',
            marginBottom: 16,
          }}
        >
          Votre veille,{' '}
          <span style={{ color: 'var(--accent-primary)', fontStyle: 'normal' }}>sur-mesure.</span>
        </h1>
        <p
          className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xl mx-auto font-medium"
        >
          Sélectionnez votre domaine d&apos;expertise. Chaque matin, l&apos;IA analyse des centaines de sources de presse et vidéos YouTube, et vous livre uniquement ce qui compte vraiment.
        </p>
      </motion.section>

      {/* ── CARDS GRID ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={ready ? 'visible' : 'hidden'}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-[860px] mx-auto px-6 pb-16"
      >
        {PORTALS.map((portal) => {
          const isHov = hovered === portal.key;
          return (
            <motion.div
              key={portal.key}
              variants={fadeUp}
              onMouseEnter={() => setHovered(portal.key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelectPortal(portal.key)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 24,
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: 'var(--card-bg)',
                border: `1px solid ${isHov ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                boxShadow: isHov ? '0 20px 40px -10px rgba(15, 15, 17, 0.08), 0 0 0 1px var(--accent-primary)' : 'var(--card-shadow)',
                transform: isHov ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className="group"
            >
              {/* Image Container */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-color)',
                }}
              >
                <img
                  src={portal.image}
                  alt={portal.label}
                  onError={(e) => { e.target.src = portal.imageFallback; }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: isDarkMode 
                      ? (isHov ? 'brightness(0.65) grayscale(0)' : 'brightness(0.45) grayscale(0.15)') 
                      : (isHov ? 'brightness(0.95)' : 'brightness(0.85) grayscale(0.1)'),
                    transform: isHov ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.45s ease',
                  }}
                  loading="lazy"
                />
                
                {/* Visual Accent border in card */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: portal.color,
                    opacity: isHov ? 0.9 : 0.4,
                    transition: 'all 0.3s ease',
                  }}
                />

                {/* Arrow indicator top-right */}
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    backgroundColor: isHov ? 'var(--accent-primary)' : 'rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isHov ? 1 : 0.8,
                    transform: isHov ? 'scale(1)' : 'scale(0.9)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>

              {/* Bottom Content Area */}
              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  textAlign: 'left',
                }}
              >
                {/* Category label / number row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: portal.color,
                    }}
                  >
                    {portal.sub}
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', opacity: 0.4 }}>
                    0{PORTALS.indexOf(portal) + 1}
                  </span>
                </div>

                {/* Portal Title */}
                <h2
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: 'var(--text-color)',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15,
                    marginBottom: 8,
                  }}
                >
                  {portal.label}
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                    marginBottom: 16,
                    flex: 1,
                  }}
                >
                  {portal.desc}
                </p>

                {/* Carbon Black CTA / Orange hover button */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    alignSelf: 'flex-start',
                    padding: '8px 18px',
                    borderRadius: '99px',
                    backgroundColor: isHov ? 'var(--accent-primary)' : 'var(--cta-bg)',
                    color: isHov ? '#ffffff' : 'var(--cta-text)',
                    fontSize: 10,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    boxShadow: isHov ? '0 8px 20px -6px var(--accent-primary)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <span>Accéder à la veille</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      width: 11,
                      height: 11,
                      transform: isHov ? 'translateX(3px)' : 'translateX(0)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── FOOTER ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-full mt-auto py-6 px-6 text-center text-[10px] font-black uppercase tracking-[0.06em] text-[var(--text-muted)] border-t border-[var(--border-color)]"
      >
        © 2026 Magazinia &mdash; Curation IA quotidienne &mdash; Tous droits réservés
      </motion.footer>
    </div>
  );
}
