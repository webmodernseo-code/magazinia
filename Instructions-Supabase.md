# Guide de Configuration — Supabase & Veille Dynamique (Veille.IA)

Ce document vous guide pas à pas pour connecter votre site à **Supabase** afin de le rendre dynamique et prêt pour une automatisation complète chaque semaine.

---

## 1. Création de la Base de Données (Supabase)

1. Rendez-vous sur [Supabase](https://supabase.com) et connectez-vous ou créez un compte gratuit.
2. Créez un nouveau projet (ex: `Veille-IA`). Définissez un mot de passe de base de données et choisissez une région proche de chez vous (ex: Europe West).
3. Une fois le projet initialisé, rendez-vous dans le menu **SQL Editor** (dans le panneau de gauche, l'icône `SQL`).
4. Cliquez sur **New Query** et copiez-collez le script SQL de structure (DDL) ci-dessous, puis cliquez sur **Run** :

```sql
-- 1. Table des articles
CREATE TABLE public.articles (
    id text NOT NULL PRIMARY KEY,
    category_key text NOT NULL,
    category text NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    content text NOT NULL,
    thumbnail text NOT NULL,
    author text NOT NULL,
    published_at text NOT NULL,
    read_time text NOT NULL,
    points text[] NOT NULL DEFAULT '{}'::text[],
    url text NOT NULL,
    is_protected boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

-- Habiliter l'accès en lecture publique
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lecture publique pour tous" ON public.articles FOR SELECT USING (true);

-- 2. Table des vidéos
CREATE TABLE public.videos (
    id text NOT NULL PRIMARY KEY,
    category_key text NOT NULL,
    category text NOT NULL,
    title text NOT NULL,
    summary text NOT NULL,
    content text NOT NULL,
    thumbnail text NOT NULL,
    author text NOT NULL,
    published_at text NOT NULL,
    views text NOT NULL,
    points text[] NOT NULL DEFAULT '{}'::text[],
    url text NOT NULL,
    video_id text NOT NULL,
    local_url text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- Habiliter l'accès en lecture publique
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lecture publique pour tous" ON public.videos FOR SELECT USING (true);
```

---

## 2. Insertion des Données de Test (Seed)

Pour vérifier que la connexion fonctionne et peuple le site en temps réel, ouvrez une nouvelle requête (**New Query**) dans l'éditeur SQL de Supabase, copiez-collez le code d'insertion ci-dessous et cliquez sur **Run** :

```sql
-- Insertion d'un article test
INSERT INTO public.articles (id, category_key, category, title, summary, content, thumbnail, author, published_at, read_time, points, url, is_protected)
VALUES (
    'ia-test-1',
    'ia-tech',
    'Agents',
    'EXCLUSIF : Nelson lève 3 millions d euros pour structurer la veille IA',
    'Une levée de fonds majeure pour propulser l automatisation des entreprises par la donnée et l intelligence artificielle.',
    'Nelson, startup innovante spécialisée dans la structuration de données de veille, vient de clore une levée de fonds d amorçage de 3 millions d euros. Cette injection de capital permettra de recruter de nouveaux ingénieurs et de packager ses solutions de traitement sémantique automatique pour les flottes d entreprises. Le déploiement s effectuera au cours du second semestre.',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    'FRENCHWEB',
    'Lundi',
    '3 min de lecture',
    ARRAY['Levée de 3 millions d euros pour structurer les processus', 'Focus sur l automatisation et l intelligence artificielle', 'Recrutements clés prévus en France'],
    'https://blog.n8n.io/how-to-build-ai-agents/',
    false
);

-- Insertion d'une vidéo test
INSERT INTO public.videos (id, category_key, category, title, summary, content, thumbnail, author, published_at, views, points, url, video_id, local_url)
VALUES (
    'ia-test-vid-1',
    'ia-tech',
    'Agents',
    'Comment automatiser sa veille IA à 100% avec n8n en 2026',
    'Un tutoriel complet pour configurer un flux de capture de flux RSS et d analyse par IA.',
    'Dans cette vidéo, nous découvrons pas à pas comment connecter des flux RSS de grands journaux à un robot n8n. Les articles sont envoyés automatiquement à l API Gemini de Google pour en extraire un résumé concis et des points clés, avant d être enregistrés dans Supabase.',
    'https://img.youtube.com/vi/DEl-wvxhXGE/hqdefault.jpg',
    'Baptiste Simard - IA',
    'Lundi',
    '2.5K vues',
    ARRAY['Connecter un flux RSS au nœud Trigger de n8n', 'Exploiter l API Gemini gratuite avec Google AI Studio', 'Mise à jour en temps réel de votre base de données'],
    'https://www.youtube.com/watch?v=DEl-wvxhXGE',
    'DEl-wvxhXGE',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
);
```

---

## 3. Configuration des Variables d'Environnement

Pour que votre site se connecte à Supabase :
1. Créez un fichier nommé `.env` à la racine de votre projet (à côté du fichier `package.json`).
2. Récupérez vos clés d'API dans Supabase en allant dans **Project Settings** (icône d'engrenage en bas à gauche) > **API**.
3. Remplissez le fichier `.env` avec le modèle suivant :

```env
VITE_SUPABASE_URL=https://votre-identifiant.supabase.co
VITE_SUPABASE_ANON_KEY=votre-cle-api-anon-publique
```

*Dès que ce fichier est présent et rempli, le site charge instantanément et dynamiquement les données depuis Supabase ! Si les clés sont absentes, le site affiche les données locales statiques par sécurité.*

---

## 4. Automatisation avec n8n (Aperçu)

Une fois la base opérationnelle, voici comment structurer votre workflow dans **n8n** :
1. **Trigger Schedule :** Déclenche le flux toutes les semaines (ex : chaque dimanche à 23h00).
2. **HTTP Request / RSS Read :** Lit les flux RSS de vos sites sources (INRS, Sika Finance, etc.).
3. **Gemini Node (Google AI Studio) :** 
   * Prenez le modèle `Gemini 1.5 Flash` (gratuit sur Google AI Studio).
   * Envoyez le texte de l'article en prompt pour générer le résumé (environ 150 mots) et extraire les points clés en JSON.
4. **Supabase Node (Insert/Upsert) :** Pousse l'article formaté directement dans votre table `articles` de Supabase.
