import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { magazineData } from '../src/data/magazineData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function validateData() {
  const errors = [];
  const articles = [];
  const videos = [];

  // 1. Flatten all items
  Object.keys(magazineData).forEach(portalKey => {
    const portal = magazineData[portalKey];
    
    // Check portal label and description
    if (!portal.label || portal.label.trim() === '') {
      errors.push(`Portal [${portalKey}] is missing a label.`);
    }
    
    const processItems = (items, sectionName) => {
      items.forEach((item, index) => {
        const itemContext = `[${portalKey} -> ${sectionName} -> Index ${index}] ID: ${item.id || 'N/A'}`;
        
        // ID check
        if (!item.id || item.id.trim() === '') {
          errors.push(`${itemContext}: Missing unique ID.`);
          return;
        }

        // Category-ID prefix match check (detects wrong category copy-paste)
        const prefix = portalKey.split('-').map(part => part[0]).join(''); // e.g. ia-agents -> ia
        const portalShortName = portalKey.replace('ia-', 'ia').replace('qhse-', 'qhse').replace('fin-', 'fin').replace('ent-', 'ent');
        
        // Ensure ID is not a duplication of another portal's ID format
        const portalPrefix = portalKey.split('-')[0]; // ia, qhse, fin, ent
        if (!item.id.startsWith(portalPrefix)) {
          errors.push(`${itemContext}: ID "${item.id}" does not start with portal prefix "${portalPrefix}".`);
        }

        // Title and Summary checks
        if (!item.title || item.title.trim() === '') {
          errors.push(`${itemContext}: Missing title.`);
        } else if (item.title.toLowerCase().includes('placeholder') || item.title.toLowerCase().includes('a venir')) {
          errors.push(`${itemContext}: Title "${item.title}" contains template placeholder words.`);
        }

        if (!item.summary || item.summary.trim() === '') {
          errors.push(`${itemContext}: Missing summary.`);
        }

        // Author and AuthorOrg checks
        if (!item.author || item.author.trim() === '') {
          errors.push(`${itemContext}: Missing author.`);
        }

        // URL format validation
        if (!item.url || item.url.trim() === '') {
          errors.push(`${itemContext}: Missing URL.`);
        } else {
          try {
            const urlObj = new URL(item.url);
            if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
              errors.push(`${itemContext}: URL "${item.url}" has invalid protocol.`);
            }
          } catch (e) {
            errors.push(`${itemContext}: URL "${item.url}" is syntactically invalid.`);
          }
        }

        // Type specific checks
        if (item.type === 'video') {
          if (!item.videoId || item.videoId.trim() === '') {
            errors.push(`${itemContext}: Video item is missing videoId.`);
          }
          videos.push({ ...item, portalKey, sectionName });
        } else if (item.type === 'article') {
          articles.push({ ...item, portalKey, sectionName });
        } else {
          errors.push(`${itemContext}: Unknown type "${item.type}".`);
        }
      });
    };

    if (portal.items) processItems(portal.items, 'items');
    if (portal.archives) processItems(portal.archives, 'archives');
  });

  // 2. Scan for duplicate URLs
  const urlMap = {};
  articles.concat(videos).forEach(item => {
    if (item.url) {
      if (!urlMap[item.url]) {
        urlMap[item.url] = [];
      }
      urlMap[item.url].push(item);
    }
  });

  Object.keys(urlMap).forEach(url => {
    if (urlMap[url].length > 1) {
      const list = urlMap[url].map(item => `[Portal: ${item.portalKey}, ID: ${item.id}]`).join(', ');
      errors.push(`Duplicate URL found: "${url}" shared by items: ${list}`);
    }
  });

  // 3. Scan for duplicate Video IDs
  const videoIdMap = {};
  videos.forEach(item => {
    if (item.videoId) {
      if (!videoIdMap[item.videoId]) {
        videoIdMap[item.videoId] = [];
      }
      videoIdMap[item.videoId].push(item);
    }
  });

  Object.keys(videoIdMap).forEach(videoId => {
    if (videoIdMap[videoId].length > 1) {
      const list = videoIdMap[videoId].map(item => `[Portal: ${item.portalKey}, ID: ${item.id}]`).join(', ');
      errors.push(`Duplicate YouTube Video ID found: "${videoId}" shared by items: ${list}`);
    }
  });

  // 4. Reporting results
  if (errors.length > 0) {
    console.error('\x1b[31m%s\x1b[0m', '❌ DATA VALIDATION FAILED:');
    errors.forEach(err => console.error('\x1b[31m%s\x1b[0m', `  - ${err}`));
    process.exit(1);
  } else {
    console.log('\x1b[32m%s\x1b[0m', '✅ DATA VALIDATION SUCCESSFUL: No duplicates, empty fields, or placeholder values found!');
    process.exit(0);
  }
}

validateData();
