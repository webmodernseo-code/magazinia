import fs from 'fs';
import path from 'path';

const targetFilePath = 'c:/Users/monep/OneDrive/Desktop/Tous mes dossiers/PROJET WEB/Magazine IA/src/data/magazineData.js';
const imagesDir = 'c:/Users/monep/OneDrive/Desktop/Tous mes dossiers/PROJET WEB/Magazine IA/public/images/articles';

// Regex to detect if an item is older than 2 months (e.g. "3 mois", "4 mois", etc.)
function isOlderThanTwoMonths(publishedAt) {
  if (!publishedAt) return false;
  const lower = publishedAt.toLowerCase();
  
  // Match things like "il y a 3 mois", "il y a 4 mois", etc.
  const match = lower.match(/(\d+)\s+mois/);
  if (match) {
    const months = parseInt(match[1], 10);
    return months > 2;
  }
  
  return false;
}

async function pruneOldData() {
  console.log('Starting data pruning lifecycle check...');
  
  // We dynamic import the magazineData to traverse it
  const { magazineData } = await import(`file:///${targetFilePath}`);

  let prunedCount = 0;
  const deletedImagePaths = [];

  // 1. Process each category and filter out old non-favorite items
  Object.keys(magazineData).forEach(portalKey => {
    const portal = magazineData[portalKey];
    
    const filterItems = (items) => {
      if (!items) return [];
      return items.filter(item => {
        // Keep favorites indefinitely (even if they are old)
        if (item.isFavorite) {
          return true;
        }

        // Check if older than 2 months
        if (isOlderThanTwoMonths(item.publishedAt)) {
          prunedCount++;
          console.log(`Pruning old item [${item.id}]: "${item.title}" (${item.publishedAt})`);
          
          // Keep track of the local image to delete it later
          if (item.thumbnail && item.thumbnail.startsWith('/images/articles/')) {
            deletedImagePaths.push(path.join('c:/Users/monep/OneDrive/Desktop/Tous mes dossiers/PROJET WEB/Magazine IA/public', item.thumbnail));
          }
          return false;
        }
        return true;
      });
    };

    if (portal.items) portal.items = filterItems(portal.items);
    if (portal.archives) portal.archives = filterItems(portal.archives);
  });

  // 2. If we found items to prune, rewrite the file with the filtered structure
  if (prunedCount > 0) {
    console.log(`\nPruned ${prunedCount} old items. Updating magazineData.js...`);
    
    const fileContent = `// Data file containing 100% verified structured contents for Veille.IA QHSE, Finance & Entrepreneuriat.
// Structured around three portals: QHSE (5 Pillars), Finance (4 Categories), and Entrepreneuriat (5 Categories).

export const magazineData = ${JSON.stringify(magazineData, null, 2)};
`;
    fs.writeFileSync(targetFilePath, fileContent, 'utf8');

    // Clean up local images
    deletedImagePaths.forEach(imgPath => {
      try {
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
          console.log(`  Deleted local image: ${path.basename(imgPath)}`);
        }
      } catch (err) {
        console.error(`  Failed to delete image ${imgPath}:`, err.message);
      }
    });

    console.log('Local assets and data file pruned successfully!');
  } else {
    console.log('No old articles/videos (older than 2 months) found to prune.');
  }
}

pruneOldData();
