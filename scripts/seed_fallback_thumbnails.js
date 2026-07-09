import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
const loadEnv = () => {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf8');
  const config = {};
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split('=');
    if (parts.length >= 2) {
      config[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  });
  return config;
};

const env = loadEnv();
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const filesToUpload = [
  // IA
  { local: 'public/images/articles/ia-t-1.png', remote: 'ia/ia-t-1.png' },
  { local: 'public/images/articles/ia-t-2.png', remote: 'ia/ia-t-2.png' },
  { local: 'public/images/articles/ia-ag-2.jpg', remote: 'ia/ia-ag-2.jpg' },
  { local: 'public/images/articles/ia-b-1.png', remote: 'ia/ia-b-1.png' },
  // QHSE
  { local: 'public/images/articles/qhse-legifrance.png', remote: 'qhse/qhse-legifrance.png' },
  { local: 'public/images/articles/qhse-aida.png', remote: 'qhse/qhse-aida.png' },
  { local: 'public/images/articles/qhse-barpi.png', remote: 'qhse/qhse-barpi.png' },
  { local: 'public/images/articles/qhse-actuenv.png', remote: 'qhse/qhse-actuenv.png' },
  // Cybersecurite (reuses circuits/abstract graphics)
  { local: 'public/images/articles/ia-ag-2.jpg', remote: 'cybersecurite/cyber-1.jpg' },
  // Hardware (reuses tech graphics)
  { local: 'public/images/articles/ia-b-1.png', remote: 'hardware/hardware-1.png' },
  // Business
  { local: 'public/images/articles/fin-ent-2.png', remote: 'business/fin-ent-2.png' },
  { local: 'public/images/articles/fin-val-2.png', remote: 'business/fin-val-2.png' },
  { local: 'public/images/articles/ent-cre-2.png', remote: 'business/ent-cre-2.png' },
  // Science
  { local: 'public/images/articles/qhse-aida.png', remote: 'science/science-1.png' }
];

async function seed() {
  console.log("=== DÉMARRAGE DU SEED DU BUCKET STORAGE ===");
  const bucketName = 'thumbnails-fallback';

  // 1. Essai de création du bucket
  console.log(`Tentative de création du bucket public "${bucketName}"...`);
  try {
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
      fileSizeLimit: 5242880 // 5MB
    });

    if (error) {
      // Si le bucket existe déjà, Supabase renvoie une erreur que l'on peut ignorer
      if (error.message.includes('already exists') || error.message.includes('duplicate')) {
        console.log(`Le bucket "${bucketName}" existe déjà.`);
      } else {
        console.warn(`⚠️ Impossible de créer le bucket automatiquement : ${error.message}`);
        console.warn(`Assurez-vous que le bucket public "${bucketName}" est bien créé manuellement dans votre console Supabase.`);
      }
    } else {
      console.log(`✅ Bucket "${bucketName}" créé avec succès !`);
    }
  } catch (err) {
    console.warn("⚠️ Erreur lors de la création du bucket :", err.message);
  }

  // 2. Upload des images
  console.log("\nDébut du téléversement des images de repli...");
  for (const item of filesToUpload) {
    const localPath = path.join(process.cwd(), item.local);
    if (!fs.existsSync(localPath)) {
      console.error(`❌ Fichier local manquant : ${localPath}`);
      continue;
    }

    const fileBody = fs.readFileSync(localPath);
    const contentType = item.remote.endsWith('.png') ? 'image/png' : 'image/jpeg';

    console.log(`Téléversement de ${item.local} vers ${item.remote}...`);
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(item.remote, fileBody, {
          contentType: contentType,
          upsert: true
        });

      if (error) {
        console.error(`❌ Erreur lors de l'upload de ${item.remote} :`, error.message);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(item.remote);
        console.log(`✅ Réussi ! URL publique : ${publicUrlData.publicUrl}`);
      }
    } catch (err) {
      console.error(`❌ Exception lors de l'upload de ${item.remote} :`, err.message);
    }
  }

  console.log("\n=== SEED DU BUCKET STORAGE TERMINÉ ===");
}

seed();
