import React from 'react';
import { ArrowLeft, Shield, FileText, Info, Mail, Calendar, User } from 'lucide-react';

export default function InfoPageDetail({ pageKey, onBack }) {
  const pages = {
    mentions: {
      title: "Mentions Légales",
      icon: <FileText className="w-4 h-4 text-[var(--text-color)]" />,
      updatedAt: "Mis à jour le 5 Juillet 2026",
      readTime: "3 min de lecture",
      sections: [
        {
          title: "1. Éditeur du Site",
          content: [
            "La plateforme Magazinia est éditée par l'agence digitale WebModernSEO (https://webmodernseo.co).",
            "Téléphone : +33 7 53 74 10 30",
            "Contact électronique : contact@webmodernseo.co",
            "Directeur de la publication : Équipe de rédaction WebModernSEO."
          ]
        },
        {
          title: "2. Hébergement",
          content: [
            "Le site internet est hébergé par la société Vercel Inc., dont le siège social est situé à San Francisco, Californie, États-Unis (https://vercel.com).",
            "La base de données et les services de stockage associés sont hébergés par la société Supabase Inc., dont le siège social est situé à San Francisco, Californie, États-Unis (https://supabase.com)."
          ]
        },
        {
          title: "3. Propriété Intellectuelle",
          content: [
            "L'ensemble des éléments structurels, la charte graphique, les algorithmes de notation et le code source de la plateforme Magazinia sont la propriété exclusive de l'agence WebModernSEO.",
            "Les contenus tiers faisant l'objet de notre veille stratégique (extraits d'articles originaux, illustrations de couverture, vidéos YouTube) restent la propriété exclusive de leurs auteurs et éditeurs respectifs. Magazinia s'engage à citer rigoureusement les sources, à faire des liens directs vers les contenus d'origine et à respecter le droit de citation.",
            "Toute reproduction, représentation, modification ou adaptation totale ou partielle des éléments du site sans autorisation écrite préalable est strictement interdite."
          ]
        },
        {
          title: "4. Responsabilité",
          content: [
            "Magazinia propose une curation et une synthèse d'informations à forte valeur ajoutée. Toutefois, les analyses et conclusions fournies ne constituent en aucun cas des conseils juridiques, financiers, d'ingénierie ou de sécurité opposables.",
            "L'éditeur ne saurait être tenu responsable des décisions opérationnelles prises par les lecteurs sur la base des synthèses rédigées sur le site."
          ]
        }
      ]
    },
    politique: {
      title: "Politique de Confidentialité",
      icon: <Shield className="w-4 h-4 text-[var(--text-color)]" />,
      updatedAt: "Mis à jour le 5 Juillet 2026",
      readTime: "4 min de lecture",
      sections: [
        {
          title: "1. Collecte des Données Personnelles",
          content: [
            "Magazinia s'engage à ce que la collecte et le traitement de vos données soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.",
            "Nous collectons uniquement les données strictement nécessaires aux services demandés :",
            "• Votre adresse e-mail lors de l'inscription à notre newsletter de veille ou lors de la création d'un compte.",
            "• Des données techniques de navigation (cookies essentiels) pour la sécurité et la mesure d'audience anonyme du site."
          ]
        },
        {
          title: "2. Finalités et Utilisation des Données",
          content: [
            "Vos données sont collectées pour des finalités précises :",
            "• L'envoi périodique des synthèses de veille thématique (IA, QHSE, Finance, Business).",
            "• La gestion de vos accès de connexion et la sécurisation de votre compte.",
            "Nous garantissons que vos données personnelles ne seront jamais vendues, louées ou partagées avec des tiers à des fins publicitaires ou commerciales."
          ]
        },
        {
          title: "3. Durée de Conservation",
          content: [
            "Les adresses e-mail utilisées pour l'envoi de la veille sont conservées tant que l'utilisateur ne manifeste pas sa volonté de se désabonner (via le lien de désinscription présent dans chaque e-mail).",
            "Les données de connexion associées à votre compte utilisateur sont conservées pendant toute la durée active du compte, et supprimées après 12 mois d'inactivité consécutive."
          ]
        },
        {
          title: "4. Vos Droits (RGPD)",
          content: [
            "Conformément à la réglementation européenne, vous disposez des droits suivants sur vos données :",
            "• Droit d'accès et de rectification.",
            "• Droit à l'effacement (droit à l'oubli).",
            "• Droit d'opposition ou de limitation du traitement.",
            "• Droit à la portabilité de vos données.",
            "Pour exercer ces droits ou pour toute question relative à la protection de vos données, vous pouvez contacter notre délégué à la protection des données (DPO) à l'adresse suivante : contact@webmodernseo.co."
          ]
        }
      ]
    },
    propos: {
      title: "À Propos de Magazinia",
      icon: <Info className="w-4 h-4 text-[var(--text-color)]" />,
      updatedAt: "Éditorial de Juillet 2026",
      readTime: "5 min de lecture",
      sections: [
        {
          title: "Notre Mission",
          content: [
            "Dans un monde noyé sous l'infobésité et où les innovations technologiques et réglementaires s'accélèrent, les dirigeants, ingénieurs et professionnels ont besoin d'outils de décision fiables et rigoureux.",
            "Magazinia a été conçu comme un filtre ultra-sélectif. Notre vocation est d'extraire la quintessence des publications scientifiques, des rapports de recherche, des brevets et des conférences mondiales pour vous en fournir une synthèse actionnable."
          ]
        },
        {
          title: "Nos 4 Portails de Veille",
          content: [
            "Nous organisons notre curation autour de quatre univers fondamentaux pour l'entreprise moderne :",
            "• Intelligence Artificielle & Tech : Suivi de l'automatisation (n8n), des agents cognitifs autonomes, des modèles de langage locaux (SLM) et du développement no-code.",
            "• QHSE & Ingénierie : Veille sur les facteurs organisationnels et humains (FOH), la gestion des risques, la résilience opérationnelle et le Lean Management.",
            "• Finance & Valorisation : Analyses financières rigoureuses, suivi de la BRVM, macroéconomie et psychologie comportementale de l'investisseur.",
            "• Business & Stratégie : Méthodologies de validation d'idées, culture organisationnelle, disruption technologique et modèles de différenciation."
          ]
        },
        {
          title: "Notre Méthodologie et Curation",
          content: [
            "Chaque ressource référencée sur notre plateforme subit une double validation : sémantique (via nos modèles d'analyse) et éditoriale (par notre équipe de rédacteurs).",
            "Nous attribuons à chaque article et vidéo un Score d'Utilité Opérationnelle sur 10. Ce score répercute la rigueur scientifique de la source ainsi que le potentiel de transposition directe dans vos processus métiers."
          ]
        },
        {
          title: "Contact & Informations",
          content: [
            "Magazinia est édité par l'agence WebModernSEO. Pour toute demande de partenariat, suggestion de source à surveiller ou retour d'expérience utilisateur, n'hésitez pas à nous écrire à l'adresse : contact@webmodernseo.co."
          ]
        }
      ]
    }
  };

  const page = pages[pageKey];

  if (!page) {
    return (
      <div className="w-full min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] py-20 text-center font-sans transition-colors duration-300">
        <p>Page non trouvée.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-[var(--text-color)] text-[var(--bg-color)] rounded transition-colors duration-300">
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] font-sans transition-colors duration-300">
      {/* Top Banner / Navigation */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-color)] sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-5 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-black text-[var(--text-muted)] hover:text-[var(--text-color)] transition-colors uppercase tracking-widest cursor-pointer bg-transparent border-none p-0 focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Retour au magazine
          </button>
          
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] bg-[var(--pill-bg)] border border-[var(--border-color)] px-3 py-1.5 rounded-full transition-colors duration-300">
            {page.icon}
            <span className="text-[var(--text-color)] font-extrabold uppercase tracking-wide">{page.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-16">
        
        {/* Header Hero */}
        <div className="border-b border-[var(--border-color)] pb-10 mb-12 text-left transition-colors duration-300">
          <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-color)] tracking-tight leading-none mb-6">
            {page.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)] font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              {page.updatedAt}
            </span>
            <span className="text-[var(--border-color)]">•</span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              Magazinia Team
            </span>
            <span className="text-[var(--border-color)]">•</span>
            <span className="bg-[var(--pill-bg)] border border-[var(--border-color)] text-[var(--text-color)] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[9px] transition-colors duration-300">
              {page.readTime}
            </span>
          </div>
        </div>

        {/* Detailed Sections (Professional Legal Style Layout) */}
        <div className="space-y-12 text-left max-w-3xl">
          {page.sections.map((section, idx) => (
            <div key={idx} className="group">
              <h2 className="text-lg sm:text-xl font-black text-[var(--text-color)] mb-5 border-b border-[var(--border-color)] pb-2 group-hover:border-[var(--text-color)] transition-colors duration-300">
                {section.title}
              </h2>
              <div className="space-y-4 text-[var(--text-muted)] text-sm sm:text-base leading-relaxed font-normal transition-colors duration-300">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className={paragraph.startsWith('•') ? "pl-4 font-medium text-[var(--text-color)]" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Support/Contact Badge */}
        <div className="mt-20 border-t border-[var(--border-color)] pt-10 text-left transition-colors duration-300">
          <div className="bg-[var(--pill-bg)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors duration-300">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-color)] mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--text-muted)]" />
                Besoin d'assistance juridique ou technique ?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Notre secrétariat de rédaction répond à vos questions sous 24 à 48 heures.
              </p>
            </div>
            <a 
              href="mailto:contact@webmodernseo.co"
              className="inline-flex items-center justify-center bg-[var(--text-color)] hover:opacity-90 text-[var(--bg-color)] text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95 text-center decoration-none border-none cursor-pointer font-sans"
            >
              Contacter le support
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
