# Product Design Document : AI Magazine Interactive Platform (Veille.IA)

## 1. Vision du Produit
Création d'une plateforme web éditoriale haut de gamme multi-sujet, fonctionnant comme un magazine moderne et minimaliste de veille active. L'objectif est de proposer une curation stricte et ultra-sélective sur 4 grands sujets :
*   **IA & Tech** (Intelligence Artificielle, Agents autonomes, Vibecoding, n8n)
*   **Bourse BRVM** (Analyses financières de la zone UEMOA, SGI, dividendes)
*   **Risques ATEX** (Normes de sécurité industrielle, DRPCE, atmosphères explosives)
*   **Entreprendre USA** (Tendances business transposables à l'Afrique et l'Europe)

**Règle de Curation Hebdomadaire :** Exactement **1 vidéo et 1 article par jour, du lundi au vendredi**, représentant les pépites absolues du jour sur chaque sujet.

---

## 2. Identité Visuelle & Expérience Utilisateur (UX/UI)

### Esthétique "Premium Editorial Sombre & Dynamique"
- **Mode :** Dark Mode exclusif (fond noir profond `#050505`).
- **Thémage dynamique par sujet :** Afin d'identifier immédiatement le sujet actif, l'interface change de couleur d'accent (boutons, lueurs de cartes, surbrillances, lettrines) et le logo s'adapte dynamiquement :
  *   **IA & Tech :** Logo `Veille.IA` | Accent Vert émeraude `#2BB373` | Fond de badge transparent `#112318`
  *   **Bourse BRVM :** Logo `Veille.BRVM` | Accent Doré/Or `#F59E0B` | Fond de badge transparent `#241A0A`
  *   **Risques ATEX :** Logo `Veille.ATEX` | Accent Orange sécurité `#F97316` | Fond de badge transparent `#24130A`
  *   **Entreprendre USA :** Logo `Veille.USA` | Accent Bleu royal `#3B82F6` | Fond de badge transparent `#0A162D`
- **Structure :** Conteneur principal avec des bordures arrondies de **48px** pour un aspect "bulle" moderne et haut de gamme.
- **Grille Bento :** Grille asymétrique triée chronologiquement de **Lundi à Vendredi** affichant les paires de contenus quotidiens.
- **Cartes :** "Vibrant Cards" sombres avec des micro-interactions au survol (léger scale, lueur subtile sur les bordures reprenant la couleur d'accent du sujet).
- **Typographie :** Utilisation exclusive de la police **Inter, sans-serif** pour l'intégralité du site (titres, corps, badges).

### Éléments Visuels Riches
- Affichage des miniatures HD des vidéos ou images de couverture.
- Badge très visible indiquant le **Jour de la Semaine** (LUNDI, MARDI, MERCREDI, JEUDI, VENDREDI) pour chaque contenu.
- Redirection vers la source originale ou lecture immersive locale de l'article ou de la vidéo.

---

## 3. Structure de Navigation & Filtres

### Header Capsule Sombre
*   **Logo dynamique à gauche :** Logo textuel dynamique aux couleurs du sujet actif.
*   **Navigation centrale :** Liens d'accès direct aux 4 sujets (`IA & Tech`, `Bourse BRVM`, `Risques ATEX`, `Entreprendre USA`) avec soulignement fluide par ressort Framer Motion.
*   **Bouton d'action à droite :** Rejoindre le groupe Telegram (`Rejoindre le groupe` sur desktop / Icône seule sur mobile).

### Barre d'Outils (Toolbar)
*   **Groupe de filtres temporels (à gauche) :** "Aujourd'hui" | "Cette semaine" | "Tout" | "Archives (30j)" (permettant de basculer sur l'historique chronologique).
*   **Groupe de filtres de format (au centre/droite) :** "Tous" | "Vidéos" | "Articles" (permettant de distinguer de manière évidente les formats).
*   **Recherche rapide (à droite) :** Barre de recherche en temps réel par mot-clé.

---

## 4. Spécifications Techniques
- **Frontend :** React (Vite) avec Tailwind CSS v4.
- **Animations :** Framer Motion pour les transitions de filtres et de modals.
- **Données :** Structure statique dans `magazineData.js` contenant exactement 10 items (5 vidéos + 5 articles du Lundi au Vendredi) par catégorie.

---
**Dernière mise à jour :** 6 Juillet 2026 - Curation Lundi-Vendredi & Thémage Dynamique par Sujet.
**Statut :** Spécifications Validées.
