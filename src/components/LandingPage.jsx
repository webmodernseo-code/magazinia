import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Photos Unsplash HD libres de droit — licence gratuite usage commercial
 * Chaque image est orientée "portrait carré" pour les cartes 1:1
 */
const PORTALS = [
  {
    key: 'ia',
    label: 'IA & Tech',
    sub: 'Intelligence Artificielle',
    desc: "Décryptez l'actualité de l'IA, des LLMs, de la robotique et des technologies de demain.",
    // Chip électronique CPU — représente la tech & IA
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=85',
    // fallback: circuit board macro
    imageFallback: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=85',
  },
  {
    key: 'qhse',
    label: 'QHSE',
    sub: 'Qualité · Hygiène · Sécurité · Env.',
    desc: "Conformité réglementaire, prévention des risques et performance environnementale.",
    // Casque de protection + équipement EPI sur chantier
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=85',
    imageFallback: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=85',
  },
  {
    key: 'finance',
    label: 'Finance',
    sub: 'Marchés & Investissements',
    desc: "Suivez les marchés financiers, la BRVM, les tendances macro-économiques et les opportunités d'investissement.",
    // Graphiques financiers / trading screens
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=85',
    imageFallback: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=85',
  },
  {
    key: 'entrepreneuriat',
    label: 'Business',
    sub: 'Entrepreneuriat & Stratégie',
    desc: "Culture entrepreneuriale, stratégie d'entreprise, innovation et inspiration pour bâtir des projets qui durent.",
    // Bureau moderne / réunion stratégique
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=85',
    imageFallback: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=800&q=85',
  },
];

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function LandingPage({ onSelectPortal, isDarkMode, setIsDarkMode }) {
  const [hovered, setHovered] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        fontFamily: "'Inter', sans-serif",
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
      className="flex flex-col"
    >
      {/* ── HEADER ── */}
      <header className="w-full max-w-5xl mx-auto px-6 sm:px-10 pt-8 pb-0 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 select-none">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: 'var(--text-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                color: 'var(--bg-color)',
                fontWeight: 900,
                fontSize: 14,
                letterSpacing: '-0.03em',
              }}
            >
              M
            </span>
          </div>
          <span
            style={{
              fontWeight: 900,
              fontSize: 16,
              letterSpacing: '-0.03em',
              color: 'var(--text-color)',
            }}
          >
            Magazinia
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Live indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 99,
              border: '1px solid var(--border-color)',
              background: 'var(--pill-bg)',
            }}
          >
            <span style={{ position: 'relative', display: 'flex', width: 6, height: 6 }}>
              <span
                className="animate-ping"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'var(--text-color)',
                  opacity: 0.5,
                }}
              />
              <span
                style={{
                  position: 'relative',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--text-color)',
                }}
              />
            </span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--text-muted)',
              }}
            >
              Veille Active
            </span>
          </div>

          {/* Dark / Light mode toggle — même style que l'app */}
          {setIsDarkMode && (
            <div
              onClick={() => setIsDarkMode(!isDarkMode)}
              title={isDarkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
              style={{
                width: 44,
                height: 44,
                borderRadius: 99,
                border: '1px solid var(--border-color)',
                background: 'var(--pill-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                flexShrink: 0,
              }}
            >
              {isDarkMode ? (
                /* Sun icon — cliquer pour passer en clair */
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, color: 'var(--text-muted)' }}>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                /* Moon icon — cliquer pour passer en sombre */
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, color: 'var(--text-muted)' }}>
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ── HERO ── */}
      <motion.section
        initial={{ opacity: 0, y: -16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
        className="w-full max-w-5xl mx-auto px-6 sm:px-10 pt-10 pb-8 text-center"
      >
        <p
          style={{
            fontSize: 10,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.22em',
            color: 'var(--text-muted)',
            marginBottom: 14,
          }}
        >
          Choisissez votre univers
        </p>
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.08,
            color: 'var(--text-color)',
            marginBottom: 14,
          }}
        >
          Votre veille,{' '}
          <span style={{ color: 'var(--text-color)', fontStyle: 'italic' }}>sur-mesure.</span>
        </h1>
        <p
          style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            maxWidth: 480,
            margin: '0 auto',
            fontWeight: 400,
          }}
        >
          Sélectionnez votre domaine d&apos;expertise. Chaque matin, l&apos;IA analyse des centaines de sources et vous livre uniquement ce qui compte.
        </p>
      </motion.section>

      {/* ── CARDS 2×2 ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={ready ? 'visible' : 'hidden'}
        style={{
          width: '100%',
          maxWidth: 860,
          margin: '0 auto',
          padding: '0 24px 48px',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
        }}
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
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                cursor: 'pointer',
                aspectRatio: '1 / 1',
                border: `1px solid ${isHov ? 'var(--text-color)' : 'var(--border-color)'}`,
                boxShadow: isHov
                  ? '0 16px 48px rgba(0,0,0,0.22)'
                  : '0 2px 12px rgba(0,0,0,0.08)',
                transform: isHov ? 'translateY(-4px) scale(1.012)' : 'translateY(0) scale(1)',
                transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.25s ease',
              }}
            >
              {/* ── Image ── */}
              <img
                src={portal.image}
                alt={portal.label}
                onError={(e) => { e.target.src = portal.imageFallback; }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  filter: isHov ? 'brightness(0.38) grayscale(0.15)' : 'brightness(0.22) grayscale(0.4)',
                  transition: 'filter 0.45s ease',
                }}
                loading="lazy"
              />

              {/* ── Gradient overlay bas → transparent ── */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                  transition: 'opacity 0.35s ease',
                }}
              />

              {/* ── Number top-left ── */}
              <div
                style={{
                  position: 'absolute',
                  top: 18,
                  left: 20,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                0{PORTALS.indexOf(portal) + 1}
              </div>

              {/* ── Arrow top-right ── */}
              <div
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 18,
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isHov ? 1 : 0,
                  transform: isHov ? 'scale(1)' : 'scale(0.7)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>

              {/* ── Bottom text ── */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '0 20px 20px',
                }}
              >
                {/* Catégorie label */}
                <p
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.5)',
                    marginBottom: 6,
                  }}
                >
                  {portal.sub}
                </p>

                {/* Titre principal */}
                <h2
                  style={{
                    fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    marginBottom: isHov ? 10 : 0,
                    transition: 'margin-bottom 0.3s ease',
                  }}
                >
                  {portal.label}
                </h2>

                {/* Description — visible au hover */}
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: isHov ? 80 : 0,
                    opacity: isHov ? 1 : 0,
                    transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease',
                  }}
                >
                  <p
                    style={{
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.55,
                      marginBottom: 12,
                    }}
                  >
                    {portal.desc}
                  </p>
                </div>

                {/* CTA — toujours visible */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: isHov ? '#ffffff' : 'rgba(255,255,255,0.55)',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    Accéder à la veille
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      width: 12,
                      height: 12,
                      color: 'rgba(255,255,255,0.55)',
                      transform: isHov ? 'translateX(3px)' : 'translateX(0)',
                      transition: 'transform 0.25s ease',
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
        transition={{ delay: 1, duration: 0.5 }}
        style={{
          marginTop: 'auto',
          textAlign: 'center',
          padding: '20px 24px',
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.06em',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        © 2026 Magazinia &mdash; Curation IA quotidienne &mdash; Tous droits réservés
      </motion.footer>
    </div>
  );
}
