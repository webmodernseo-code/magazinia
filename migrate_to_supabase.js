import fs from 'fs';
import { execSync } from 'child_process';
import { createClient } from '@supabase/supabase-js';
import { magazineData } from './src/data/magazineData.js';

const envContent = fs.readFileSync('.env', 'utf-8');
const envLines = envContent.split('\n');
const envConfig = {};
envLines.forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0) {
    envConfig[key.trim()] = values.join('=').trim();
  }
});

const SUPABASE_URL = envConfig.VITE_SUPABASE_URL;
const SUPABASE_KEY = envConfig.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Mappings for all 19 categories to their exact premium local illustrations
function getCategoryFallbackImage(portalKey) {
  const mappings = {
    // QHSE
    'qhse-humain': '/images/articles/qhse-h-2.png',
    'qhse-risques': '/images/articles/qhse-h-2.png',
    'qhse-performance': '/images/articles/qhse-p-2.png',
    'qhse-science': '/images/articles/qhse-e-2.png',
    'qhse-strategie': '/images/articles/qhse-e-2.png',
    // Finance
    'fin-entreprises': '/images/articles/fin-ent-2.png',
    'fin-brvm': '/images/articles/fin-ent-2.png',
    'fin-psychologie': '/images/articles/fin-val-2.png',
    // Entrepreneuriat
    'ent-creation': '/images/articles/ent-cre-2.png',
    'ent-strategie': '/images/articles/ent-cre-2.png',
    'ent-innovation': '/images/articles/ent-inn-2.png',
    // IA
    'ia-informer': '/images/articles/ia-t-1.png',
    'ia-comprendre': '/images/articles/ia-ag-2.jpg',
    'ia-pratiquer': '/images/articles/ia-b-1.png'
  };
  return mappings[portalKey] || '/images/articles/ia-t-1.png';
}

// Helper to fetch OpenGraph og:image or twitter:image from a URL
async function fetchOgImage(url) {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      signal: controller.signal
    });
    clearTimeout(id);

    if (!res.ok) return null;
    const html = await res.text();

    const ogRegex = /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i;
    const ogRegexAlt = /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i;
    
    let match = html.match(ogRegex) || html.match(ogRegexAlt);
    
    if (!match) {
      const twitterRegex = /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i;
      match = html.match(twitterRegex);
    }

    if (match && match[1]) {
      let imgUrl = match[1];
      if (imgUrl.startsWith('//')) {
        imgUrl = 'https:' + imgUrl;
      } else if (imgUrl.startsWith('/')) {
        const urlObj = new URL(url);
        imgUrl = urlObj.origin + imgUrl;
      }
      return imgUrl;
    }
    return null;
  } catch (err) {
    return null;
  }
}

async function migrate() {
  console.log("Running pre-flight data validation check...");
  try {
    execSync('node scripts/prune_old_data.js', { stdio: 'inherit' });
    execSync('node scripts/validate_data.js', { stdio: 'inherit' });
  } catch (err) {
    console.error("❌ Data validation failed. Database migration aborted to prevent bad data ingestion.");
    process.exit(1);
  }

  const articlesToInsert = [];
  const videosToInsert = [];

  for (const [portalKey, portalData] of Object.entries(magazineData)) {
    const processItems = (items) => {
      for (const item of items) {
        if (item.type === 'video') {
          // Extract video ID if not present
          let activeId = item.videoId;
          if (!activeId && item.url) {
            const match = item.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
            activeId = match ? match[1] : null;
          }

          // Use YouTube high quality thumbnail as priority/fallback if original is stock image or empty
          const fallbackThumb = activeId ? `https://img.youtube.com/vi/${activeId}/hqdefault.jpg` : '';
          const currentThumb = item.thumbnail || '';
          const hasStockPhoto = currentThumb.includes('unsplash') || currentThumb.includes('pexels');

          videosToInsert.push({
            id: item.id,
            category_key: portalKey,
            category: portalData.label,
            title: item.title,
            summary: item.summary,
            content: item.content || 'Contenu détaillé à venir...',
            thumbnail: (!currentThumb || hasStockPhoto) ? fallbackThumb : currentThumb,
            author: item.author,
            author_org: item.authorOrg || '',
            published_at: item.publishedAt,
            duration: item.duration || '12:34',
            url: item.url,
            video_id: activeId || '',
            local_url: item.localUrl || '',
            learnings: item.learnings || item.points || [],
            concepts: item.concepts || [],
            why_important: item.whyImportant || '',
            business_apps: item.businessApps || '',
            expertise_level: item.expertiseLevel || 'Tous niveaux',
            qhse_score: Number(item.qhseScore) || 8.0
          });
        } else {
          const currentThumb = item.thumbnail || '';
          const isPlaceholder = !currentThumb || 
                                currentThumb.includes('unsplash') || 
                                currentThumb.includes('pexels') ||
                                currentThumb.toLowerCase().includes('logo') ||
                                currentThumb.toLowerCase().includes('avatar') ||
                                currentThumb.toLowerCase().includes('fallback') ||
                                currentThumb.toLowerCase().includes('default') ||
                                currentThumb.toLowerCase().includes('pixel') ||
                                currentThumb.toLowerCase().includes('icon') ||
                                currentThumb.toLowerCase().includes('favicon');

          articlesToInsert.push({
            id: item.id,
            category_key: portalKey,
            category: portalData.label,
            title: item.title,
            summary: item.summary,
            content: item.content || 'Contenu détaillé à venir...',
            thumbnail: isPlaceholder ? getCategoryFallbackImage(portalKey) : currentThumb,
            author: item.author,
            author_org: item.authorOrg || '',
            published_at: item.publishedAt,
            read_time: item.readTime || '5 min',
            url: item.url,
            is_protected: item.isProtected || false,
            ideas: item.ideas || item.points || [],
            concepts: item.concepts || [],
            methods: item.methods || [],
            why_important: item.whyImportant || '',
            business_apps: item.businessApps || '',
            related_concepts: item.relatedConcepts || [],
            expertise_level: item.expertiseLevel || 'Tous niveaux',
            qhse_score: Number(item.qhseScore) || 8.0
          });
        }
      }
    };

    if (portalData.items) processItems(portalData.items);
    if (portalData.archives) processItems(portalData.archives);
  }

  // Real-time enrichment of articles using OpenGraph scraper for any new/placeholder thumbnails
  console.log("\nEnriching article thumbnails via OpenGraph scraper...");
  for (const article of articlesToInsert) {
    const currentThumb = article.thumbnail || '';
    const isPlaceholder = !currentThumb || 
                          currentThumb.includes('unsplash') || 
                          currentThumb.includes('pexels') ||
                          currentThumb.toLowerCase().includes('logo') ||
                          currentThumb.toLowerCase().includes('avatar') ||
                          currentThumb.toLowerCase().includes('fallback') ||
                          currentThumb.toLowerCase().includes('default') ||
                          currentThumb.toLowerCase().includes('pixel') ||
                          currentThumb.toLowerCase().includes('icon') ||
                          currentThumb.toLowerCase().includes('favicon');
    
    if (isPlaceholder) {
      console.log(`  -> [${article.id}] Scraped or placeholder image detected. Fetching actual article image from: ${article.url}...`);
      const ogImage = await fetchOgImage(article.url);
      
      const isGeneric = ogImage && (
        ogImage.toLowerCase().includes('logo') ||
        ogImage.toLowerCase().includes('avatar') ||
        ogImage.toLowerCase().includes('fallback') ||
        ogImage.toLowerCase().includes('default') ||
        ogImage.toLowerCase().includes('pixel') ||
        ogImage.toLowerCase().includes('icon') ||
        ogImage.toLowerCase().includes('favicon')
      );

      if (ogImage && !isGeneric) {
        article.thumbnail = ogImage;
        console.log(`     ✅ Success! Resolved thumbnail to: ${ogImage}`);
      } else {
        const fallback = getCategoryFallbackImage(article.category_key);
        article.thumbnail = fallback;
        console.log(`     ⚠️ Scraped image was generic, missing or blocked. Assigned premium fallback: ${fallback}`);
      }
    }
  }

  console.log(`\nDeleting old data from Supabase...`);
  const { error: delArtErr } = await supabase.from('articles').delete().neq('id', 'temp');
  if (delArtErr) console.error("Error deleting articles:", delArtErr);
  
  const { error: delVidErr } = await supabase.from('videos').delete().neq('id', 'temp');
  if (delVidErr) console.error("Error deleting videos:", delVidErr);

  console.log(`Inserting ${articlesToInsert.length} articles...`);
  const { error: artErr } = await supabase.from('articles').insert(articlesToInsert);
  if (artErr) {
    console.error("Error inserting articles:", artErr);
  } else {
    console.log("Successfully inserted articles.");
  }

  console.log(`Inserting ${videosToInsert.length} videos...`);
  const { error: vidErr } = await supabase.from('videos').insert(videosToInsert);
  if (vidErr) {
    console.error("Error inserting videos:", vidErr);
  } else {
    console.log("Successfully inserted videos.");
  }

  console.log('Migration Complete!');
}

migrate();
