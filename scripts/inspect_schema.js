import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envContent = fs.readFileSync('.env', 'utf-8');
const envConfig = {};
envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const parts = trimmed.split('=');
  if (parts.length >= 2) {
    envConfig[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
});

const supabase = createClient(envConfig.VITE_SUPABASE_URL, envConfig.VITE_SUPABASE_ANON_KEY);

async function inspectSchema() {
  const { data: art, error: artErr } = await supabase.from('articles').select('*').limit(1);
  if (artErr) {
    console.error("Error articles:", artErr.message);
  } else if (art && art.length > 0) {
    console.log("=== Columns in articles table ===");
    console.log(Object.keys(art[0]).join(', '));
  } else {
    console.log("Articles table is empty.");
  }

  const { data: vid, error: vidErr } = await supabase.from('videos').select('*').limit(1);
  if (vidErr) {
    console.error("Error videos:", vidErr.message);
  } else if (vid && vid.length > 0) {
    console.log("=== Columns in videos table ===");
    console.log(Object.keys(vid[0]).join(', '));
  } else {
    console.log("Videos table is empty.");
  }
}

inspectSchema();
