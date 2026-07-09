-- Migration SQL : Ajout de la colonne thumbnail_source et contraintes d'unicité

-- 1. Ajout de la colonne thumbnail_source dans la table articles
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS thumbnail_source TEXT DEFAULT 'og';

-- 2. Ajout de la colonne thumbnail_source dans la table videos
ALTER TABLE videos 
ADD COLUMN IF NOT EXISTS thumbnail_source TEXT DEFAULT 'og';

-- 3. Vérification/Ajout de la contrainte d'unicité sur la colonne url pour la table articles
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE table_name = 'articles' 
          AND constraint_type = 'UNIQUE' 
          AND constraint_name = 'articles_url_key'
    ) THEN
        ALTER TABLE articles ADD CONSTRAINT articles_url_key UNIQUE (url);
    END IF;
END $$;

-- 4. Vérification/Ajout de la contrainte d'unicité sur la colonne url pour la table videos
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE table_name = 'videos' 
          AND constraint_type = 'UNIQUE' 
          AND constraint_name = 'videos_url_key'
    ) THEN
        ALTER TABLE videos ADD CONSTRAINT videos_url_key UNIQUE (url);
    END IF;
END $$;
