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
    color: '#3B82F6',       // Bleu IA
    colorMuted: 'rgba(59,130,246,0.15)',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=85',
    imageFallback: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=85',
  },
  {
    key: 'qhse',
    label: 'QHSE',
    sub: 'Qualité · Hygiène · Sécurité · Env.',
    desc: "Conformité réglementaire, prévention des risques et performance environnementale.",
    color: '#F97316',       // Orange QHSE
    colorMuted: 'rgba(249,115,22,0.15)',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=85',
    imageFallback: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=85',
  },
  {
    key: 'finance',
    label: 'Finance',
    sub: 'Marchés & Investissements',
    desc: "Suivez les marchés financiers, la BRVM, les tendances macro-économiques et les opportunités d'investissement.",
    color: '#10B981',       // Vert Finance
    colorMuted: 'rgba(16,185,129,0.15)',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=85',
    imageFallback: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=85',
  },
  {
    key: 'entrepreneuriat',
    label: 'Business',
    sub: 'Entrepreneuriat & Stratégie',
    desc: "Culture entrepreneuriale, stratégie d'entreprise, innovation et inspiration pour bâtir des projets qui durent.",
    color: '#D4A25A',       // Or doré Business (version sobre de #ebbb81)
    colorMuted: 'rgba(212,162,90,0.15)',
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

      {/* ── HERO ── */}
      <motion.section
        initial={{ opacity: 0, y: -16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
        className="w-full max-w-5xl mx-auto px-6 sm:px-10 pt-16 pb-8 text-center"
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
                border: `1px solid ${isHov ? portal.color + '60' : 'var(--border-color)'}`,
                boxShadow: isHov
                  ? `0 16px 48px rgba(0,0,0,0.22), 0 0 0 1px ${portal.color}25`
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
                  filter: isHov ? 'brightness(0.55) grayscale(0.05)' : 'brightness(0.42) grayscale(0.25)',
                  transition: 'filter 0.45s ease',
                }}
                loading="lazy"
              />

              {/* ── Gradient overlay bas → transparent ── */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)',
                  transition: 'opacity 0.35s ease',
                }}
              />

              {/* ── Bande couleur en bas de carte (accent sobre) ── */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: portal.color,
                  opacity: isHov ? 0.9 : 0.45,
                  transition: 'opacity 0.35s ease',
                }}
              />

              {/* ── Number top-left (dans la couleur du portail) ── */}
              <div
                style={{
                  position: 'absolute',
                  top: 18,
                  left: 20,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: portal.color,
                  opacity: 0.85,
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
                {/* Catégorie label (couleur du portail) */}
                <p
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: portal.color,
                    opacity: 0.9,
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

                {/* Description — toujours visible */}
                <p
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.62)',
                    lineHeight: 1.6,
                    marginTop: 6,
                    marginBottom: 4,
                  }}
                >
                  {portal.desc}
                </p>

                {/* CTA — toujours visible */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: isHov ? portal.color : 'rgba(255,255,255,0.55)',
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
                      color: isHov ? portal.color : 'rgba(255,255,255,0.45)',
                      transform: isHov ? 'translateX(3px)' : 'translateX(0)',
                      transition: 'transform 0.25s ease, color 0.25s ease',
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
