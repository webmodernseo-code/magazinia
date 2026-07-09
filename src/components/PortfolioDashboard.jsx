import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Plus, ChevronRight, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, BookOpen, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function PortfolioDashboard({ accentColor = '#F59E0B' }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Forms state
  const [transactions, setTransactions] = useState([]);
  const [errorsLog, setErrorsLog] = useState([]);

  // Transaction form
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('');
  const [decision, setDecision] = useState('Achat');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [thesis, setThesis] = useState('');
  const [hypotheses, setHypotheses] = useState('');
  const [risks, setRisks] = useState('');
  const [horizon, setHorizon] = useState('10 ans');

  // Error form
  const [errCompany, setErrCompany] = useState('');
  const [errReasonBuy, setErrReasonBuy] = useState('');
  const [errResult, setErrResult] = useState('');
  const [errHadReason, setErrHadReason] = useState('Oui');
  const [errType, setErrType] = useState("Erreur d'analyse");
  const [errLessons, setErrLessons] = useState('');

  // Active sub-tab
  const [activeSubTab, setActiveSubTab] = useState('portfolio'); // 'portfolio' | 'decisions' | 'errors'

  // Load from local storage (or Supabase if set up later)
  useEffect(() => {
    const savedAuth = localStorage.getItem('portfolio_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
    const savedTransactions = localStorage.getItem('portfolio_tx');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Default seed data
      const defaultTx = [
        {
          id: '1',
          company: 'Sonatel',
          date: '2026-06-15',
          decision: 'Achat',
          amount: 152000,
          price: 19000,
          quantity: 8,
          thesis: 'Leader télécoms incontournable, croissance continue Orange Money, dividende historique supérieur à 8%.',
          hypotheses: 'Le taux de pénétration internet mobile au Mali et en Guinée va continuer de croître.',
          risks: 'Nouvelle taxe gouvernementale sur les transactions de paiement mobile.',
          horizon: '10 ans'
        },
        {
          id: '2',
          company: 'Ecobank CI',
          date: '2026-07-02',
          decision: 'Achat',
          amount: 72000,
          price: 7200,
          quantity: 10,
          thesis: 'Banque la plus efficace de la place BRVM, croissance des dépôts de 12% par an.',
          hypotheses: 'Stabilité macroéconomique de la Côte d\'Ivoire.',
          risks: 'Hausse des créances douteuses.',
          horizon: '5 ans'
        }
      ];
      setTransactions(defaultTx);
      localStorage.setItem('portfolio_tx', JSON.stringify(defaultTx));
    }

    const savedErrors = localStorage.getItem('portfolio_errors');
    if (savedErrors) {
      setErrorsLog(JSON.parse(savedErrors));
    } else {
      const defaultErrors = [
        {
          id: '1',
          company: 'Onatel BF',
          reasonBuy: 'Achat basé uniquement sur le rendement historique élevé du dividende.',
          result: 'Baisse du cours de 40% suite aux problèmes de sécurité au Burkina Faso et réduction du dividende.',
          hadReason: 'Non',
          errType: 'Erreur de gestion du risque',
          lessons: 'Ne jamais acheter une action uniquement pour son dividende sans analyser la pérennité du business model et la situation géopolitique.'
        }
      ];
      setErrorsLog(defaultErrors);
      localStorage.setItem('portfolio_errors', JSON.stringify(defaultErrors));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Default credentials
    const defaultUser = 'admin';
    const defaultPass = 'brvm2026';

    if (username === defaultUser && password === defaultPass) {
      setIsAuthenticated(true);
      setAuthError('');
      localStorage.setItem('portfolio_auth', 'true');
    } else {
      setAuthError('Identifiant ou mot de passe incorrect.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('portfolio_auth');
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!company || !amount || !price || !quantity) return;

    const newTx = {
      id: Date.now().toString(),
      company,
      date: date || new Date().toISOString().split('T')[0],
      decision,
      amount: Number(amount),
      price: Number(price),
      quantity: Number(quantity),
      thesis,
      hypotheses,
      risks,
      horizon
    };

    const updated = [newTx, ...transactions];
    setTransactions(updated);
    localStorage.setItem('portfolio_tx', JSON.stringify(updated));

    // Clear form
    setCompany('');
    setAmount('');
    setPrice('');
    setQuantity('');
    setThesis('');
    setHypotheses('');
    setRisks('');
  };

  const handleDeleteTransaction = (id) => {
    const updated = transactions.filter(t => t.id !== id);
    setTransactions(updated);
    localStorage.setItem('portfolio_tx', JSON.stringify(updated));
  };

  const handleAddError = (e) => {
    e.preventDefault();
    if (!errCompany || !errReasonBuy || !errLessons) return;

    const newErr = {
      id: Date.now().toString(),
      company: errCompany,
      reasonBuy: errReasonBuy,
      result: errResult,
      hadReason: errHadReason,
      errType,
      lessons: errLessons
    };

    const updated = [newErr, ...errorsLog];
    setErrorsLog(updated);
    localStorage.setItem('portfolio_errors', JSON.stringify(updated));

    // Clear form
    setErrCompany('');
    setErrReasonBuy('');
    setErrResult('');
    setErrLessons('');
  };

  const handleDeleteError = (id) => {
    const updated = errorsLog.filter(e => e.id !== id);
    setErrorsLog(updated);
    localStorage.setItem('portfolio_errors', JSON.stringify(updated));
  };

  // Calculates total valuation
  const totalValuation = transactions.reduce((acc, t) => {
    if (t.decision === 'Achat' || t.decision === 'Renforcement') {
      return acc + (t.price * t.quantity);
    }
    return acc;
  }, 0);

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-md mx-auto px-6 py-12 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-[32px] text-center my-12 font-sans shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
        <div 
          style={{ backgroundColor: `${accentColor}10`, color: accentColor }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/5"
        >
          <Lock className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-black text-[var(--text-color)] tracking-tight mb-2 uppercase">Carnet d'Investissement Privé</h2>
        <p className="text-xs text-[var(--text-muted)] mb-8 leading-relaxed">
          Ce module contient vos données de portefeuille, votre journal de décisions et vos analyses de risques. Veuillez vous authentifier pour y accéder.
        </p>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Identifiant</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ex: admin"
              className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
            />
          </div>
          <div>
            <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ex: brvm2026"
              className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
            />
          </div>

          {authError && (
            <p className="text-[10px] text-red-500 font-semibold">{authError}</p>
          )}

          <button 
            type="submit"
            style={{ backgroundColor: accentColor }}
            className="w-full py-3.5 mt-4 text-[var(--text-color)] text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.01] active:scale-95 transition-all duration-200 border-none cursor-pointer"
          >
            S'authentifier
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 text-left bg-[var(--bg-color)] text-[var(--text-color)] rounded-[32px] mb-12 mt-6 animate-fade-in font-sans">
      
      {/* Upper Navigation Bar */}
      <div className="flex justify-between items-center border-b border-[var(--border-color)] pb-6 mb-8">
        <div>
          <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Espace Personnel</span>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            Carnet d'Investissement
          </h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 border border-red-900/35 hover:bg-red-950/20 text-red-400 rounded-full text-[9px] font-black uppercase tracking-widest transition-all cursor-pointer bg-transparent focus:outline-none"
        >
          <LogOut className="w-3.5 h-3.5" />
          Déconnexion
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 mb-8 border-b border-[var(--border-color)]/40 pb-4">
        {[
          { key: 'portfolio', label: 'Portefeuille & Suivi' },
          { key: 'decisions', label: 'Journal des Décisions' },
          { key: 'errors', label: 'Journal des Erreurs' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSubTab(tab.key)}
            style={{ 
              borderColor: activeSubTab === tab.key ? accentColor : 'transparent',
              color: activeSubTab === tab.key ? '#white' : '#6E7672'
            }}
            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest border-b-2 bg-transparent cursor-pointer focus:outline-none transition-colors"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeSubTab === 'portfolio' && (
        <div className="space-y-8">
          {/* Key Figures Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden">
              <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Capital Investi</span>
              <span className="text-2xl font-black text-[var(--text-color)]">{totalValuation.toLocaleString('fr-FR')} FCFA</span>
              <div className="absolute right-4 bottom-4 text-emerald-500 flex items-center gap-1 text-[10px] font-bold">
                <TrendingUp className="w-3.5 h-3.5" /> +8.4%
              </div>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
              <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Nombre de Lignes</span>
              <span className="text-2xl font-black text-[var(--text-color)]">{transactions.length} entreprises</span>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 relative overflow-hidden">
              <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-1">Rendement Moyen</span>
              <span className="text-2xl font-black text-[var(--text-color)]">6.8%</span>
            </div>
          </div>

          {/* Portfolio Lines */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[var(--border-color)] bg-[var(--pill-bg)]/40">
              <h3 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)]">Vos Lignes en Portefeuille</h3>
            </div>
            <div className="divide-y divide-[#1E221F]">
              {transactions.length === 0 ? (
                <div className="p-6 text-center text-xs text-[var(--text-muted)]">Aucune entreprise en portefeuille pour le moment.</div>
              ) : (
                transactions.map((tx) => (
                  <div key={tx.id} className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span style={{ backgroundColor: accentColor }} className="w-2 h-2 rounded-full"></span>
                        <h4 className="text-base font-black text-[var(--text-color)]">{tx.company}</h4>
                        <span className="text-[9px] font-extrabold uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[var(--pill-text)]">
                          {tx.horizon}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--pill-text)] max-w-xl leading-relaxed">
                        <strong className="text-[var(--text-muted)]">Thèse : </strong> {tx.thesis}
                      </p>
                      {tx.hypotheses && (
                        <p className="text-xs text-[var(--pill-text)] max-w-xl leading-relaxed">
                          <strong className="text-[var(--text-muted)]">Hypothèses clés : </strong> {tx.hypotheses}
                        </p>
                      )}
                    </div>
                    <div className="flex md:flex-col items-end gap-2 shrink-0">
                      <span className="text-xs text-[var(--text-muted)]">
                        {tx.quantity} actions @ {tx.price.toLocaleString('fr-FR')} FCFA
                      </span>
                      <span className="text-sm font-extrabold text-[var(--text-color)]">
                        {(tx.price * tx.quantity).toLocaleString('fr-FR')} FCFA
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Hypothèses vs Réalités Alert Board */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6">
            <h3 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Suivi d'Alertes : Hypothèses vs Résultats observés
            </h3>
            <div className="space-y-4">
              <div className="border border-white/5 rounded-xl p-4 bg-[var(--pill-bg)]/40 flex gap-4">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-color)]">Sonatel — Résistance opérationnelle au Mali</h4>
                  <p className="text-xs text-[var(--pill-text)] mt-1">
                    Les résultats du premier semestre confirment une hausse de 6.4% du trafic de données au Mali, validant l'hypothèse de résilience du marché local.
                  </p>
                </div>
              </div>
              <div className="border border-white/5 rounded-xl p-4 bg-[var(--pill-bg)]/40 flex gap-4">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-color)]">Ecobank CI — Risque de crédit en hausse</h4>
                  <p className="text-xs text-[var(--pill-text)] mt-1">
                    Augmentation temporaire de 1.2% du coût du risque par rapport à nos hypothèses de base. À surveiller lors des prochains trimestres.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeSubTab === 'decisions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form to add decision */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 h-fit">
            <h3 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] mb-6 flex items-center gap-2">
              <Plus className="w-4 h-4" style={{ color: accentColor }} />
              Nouvelle Décision
            </h3>
            <form onSubmit={handleAddTransaction} className="space-y-4 text-left">
              <div>
                <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Entreprise</label>
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Ex: Sonatel"
                  required
                  className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Décision</label>
                  <select 
                    value={decision}
                    onChange={(e) => setDecision(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                  >
                    <option value="Achat">Achat</option>
                    <option value="Renforcement">Renforcement</option>
                    <option value="Vente">Vente</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Horizon</label>
                  <select 
                    value={horizon}
                    onChange={(e) => setHorizon(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                  >
                    <option value="5 ans">5 ans</option>
                    <option value="10 ans">10 ans</option>
                    <option value="20 ans">20 ans</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Quantité</label>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="10"
                    required
                    className="w-full px-3 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Prix unitaire (FCFA)</label>
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="19000"
                    required
                    className="w-full px-3 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Montant global (FCFA)</label>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="190000"
                  required
                  className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Thèse d'investissement</label>
                <textarea 
                  value={thesis}
                  onChange={(e) => setThesis(e.target.value)}
                  placeholder="Pourquoi cette entreprise ?"
                  className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 h-20 transition-colors resize-none font-sans"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Hypothèses clés</label>
                <textarea 
                  value={hypotheses}
                  onChange={(e) => setHypotheses(e.target.value)}
                  placeholder="Qu'est-ce qui va générer de la croissance ?"
                  className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 h-16 transition-colors resize-none font-sans"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Risques identifiés</label>
                <textarea 
                  value={risks}
                  onChange={(e) => setRisks(e.target.value)}
                  placeholder="Ce qui pourrait invalider la thèse"
                  className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 h-16 transition-colors resize-none font-sans"
                />
              </div>
              <button 
                type="submit"
                style={{ backgroundColor: accentColor }}
                className="w-full py-3 text-[var(--text-color)] text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.01] active:scale-95 transition-all duration-200 border-none cursor-pointer mt-2"
              >
                Acter la décision
              </button>
            </form>
          </div>

          {/* List of decisions */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-wider text-[var(--pill-text)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--text-muted)]" />
              Journal Historique des Décisions
            </h3>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 relative">
                  <button 
                    onClick={() => handleDeleteTransaction(tx.id)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center gap-2 mb-4 font-sans">
                    <span 
                      style={{ 
                        backgroundColor: tx.decision === 'Achat' || tx.decision === 'Renforcement' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                        color: tx.decision === 'Achat' || tx.decision === 'Renforcement' ? '#10B981' : '#EF4444',
                        borderColor: tx.decision === 'Achat' || tx.decision === 'Renforcement' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                      }}
                      className="border text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded"
                    >
                      {tx.decision}
                    </span>
                    <span className="text-[10px] font-black text-[var(--pill-text)]">{tx.date}</span>
                  </div>

                  <h4 className="text-base font-black text-[var(--text-color)] mb-3">{tx.company}</h4>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-[var(--bg-color)]/40 border border-white/5 rounded-xl p-4 text-left font-sans">
                    <div>
                      <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Montant</span>
                      <span className="text-xs font-bold text-[var(--text-muted)]">{tx.amount.toLocaleString('fr-FR')} F</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Prix</span>
                      <span className="text-xs font-bold text-[var(--text-muted)]">{tx.price.toLocaleString('fr-FR')} F</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Quantité</span>
                      <span className="text-xs font-bold text-[var(--text-muted)]">{tx.quantity}</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-black text-[var(--text-muted)] uppercase tracking-widest block mb-0.5">Horizon</span>
                      <span className="text-xs font-bold text-[var(--text-muted)]">{tx.horizon}</span>
                    </div>
                  </div>

                  <div className="space-y-3 font-sans text-xs text-[var(--text-muted)] leading-relaxed text-left">
                    <p><strong className="text-[var(--pill-text)]">Thèse :</strong> {tx.thesis}</p>
                    <p><strong className="text-[var(--pill-text)]">Hypothèses :</strong> {tx.hypotheses}</p>
                    <p><strong className="text-[var(--pill-text)]">Risques :</strong> {tx.risks}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'errors' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form to add error */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 h-fit">
            <h3 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] mb-6 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Déclarer une Erreur
            </h3>
            <form onSubmit={handleAddError} className="space-y-4 text-left">
              <div>
                <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Entreprise concernée</label>
                <input 
                  type="text" 
                  value={errCompany}
                  onChange={(e) => setErrCompany(e.target.value)}
                  placeholder="Ex: Onatel BF"
                  required
                  className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Type d'erreur</label>
                  <select 
                    value={errType}
                    onChange={(e) => setErrType(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                  >
                    <option value="Erreur d'analyse">Erreur d'analyse</option>
                    <option value="Erreur émotionnelle">Erreur émotionnelle</option>
                    <option value="Erreur de valorisation">Erreur de valorisation</option>
                    <option value="Erreur de gestion du risque">Erreur de gestion du risque</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Thèse correcte au départ ?</label>
                  <select 
                    value={errHadReason}
                    onChange={(e) => setErrHadReason(e.target.value)}
                    className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                  >
                    <option value="Oui">Oui</option>
                    <option value="Non">Non</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Pourquoi ai-je acheté ?</label>
                <textarea 
                  value={errReasonBuy}
                  onChange={(e) => setErrReasonBuy(e.target.value)}
                  placeholder="Rappeler l'intention de départ"
                  required
                  className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 h-16 transition-colors resize-none font-sans"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Résultat obtenu</label>
                <textarea 
                  value={errResult}
                  onChange={(e) => setErrResult(e.target.value)}
                  placeholder="Qu'est-ce qui s'est réellement passé ?"
                  className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 h-16 transition-colors resize-none font-sans"
                />
              </div>
              <div>
                <label className="text-[9px] font-black text-[var(--pill-text)] uppercase tracking-widest block mb-2">Enseignements / Règle d'or à en tirer</label>
                <textarea 
                  value={errLessons}
                  onChange={(e) => setErrLessons(e.target.value)}
                  placeholder="La règle d'or pour enrichir mon manuel personnel d'investissement"
                  required
                  className="w-full px-4 py-3 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-xl text-xs text-[var(--text-color)] placeholder-gray-600 focus:outline-none focus:border-[#F59E0B]/50 h-20 transition-colors resize-none font-sans"
                />
              </div>
              <button 
                type="submit"
                style={{ backgroundColor: accentColor }}
                className="w-full py-3 text-[var(--text-color)] text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.01] active:scale-95 transition-all duration-200 border-none cursor-pointer mt-2"
              >
                Inscrire au Manuel
              </button>
            </form>
          </div>

          {/* Errors log */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-wider text-[var(--pill-text)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--text-muted)]" />
              Manuel Personnel d'Investissement (Journal des Erreurs)
            </h3>
            <div className="space-y-4">
              {errorsLog.map((err) => (
                <div key={err.id} className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 relative">
                  <button 
                    onClick={() => handleDeleteError(err.id)}
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2 mb-4 font-sans">
                    <span className="bg-amber-955/80 border border-amber-900/35 text-amber-500 text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded">
                      {err.errType}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[var(--pill-text)]">
                      Thèse valide ? {err.hadReason}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-[var(--text-color)] mb-4">{err.company}</h4>

                  <div className="space-y-4 font-sans text-xs text-[var(--text-muted)] leading-relaxed text-left">
                    <div className="border-l-2 border-[var(--border-color)] pl-4">
                      <strong className="text-[var(--pill-text)] block mb-1">Pourquoi l'achat a été effectué :</strong>
                      {err.reasonBuy}
                    </div>
                    {err.result && (
                      <div className="border-l-2 border-[var(--border-color)] pl-4">
                        <strong className="text-[var(--pill-text)] block mb-1">Résultat :</strong>
                        {err.result}
                      </div>
                    )}
                    <div 
                      style={{ backgroundColor: `${accentColor}06`, borderColor: `${accentColor}20` }}
                      className="border rounded-xl p-4"
                    >
                      <strong style={{ color: accentColor }} className="block mb-1 font-bold uppercase tracking-wider text-[10px]">
                        Règle d'or & Leçon apprise :
                      </strong>
                      <p className="text-gray-200">{err.lessons}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
