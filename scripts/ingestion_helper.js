import https from 'https';
import http from 'http';
import { URL } from 'url';

// User-Agent configuration
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

/**
 * Resolves a relative URL to an absolute one using base URL.
 */
export function resolveAbsoluteUrl(relativeUrl, baseUrl) {
  try {
    return new URL(relativeUrl, baseUrl).href;
  } catch (err) {
    return relativeUrl;
  }
}

/**
 * Checks a URL status and resolves potential redirections.
 * Returns { ok, finalUrl, statusCode, error }
 */
export function requestHttp(targetUrl, method = 'HEAD', timeoutMs = 5000, redirectCount = 0) {
  return new Promise((resolve) => {
    if (redirectCount > 5) {
      resolve({ ok: false, finalUrl: targetUrl, statusCode: 310, error: 'Too many redirects' });
      return;
    }

    let urlObj;
    try {
      urlObj = new URL(targetUrl);
    } catch (e) {
      resolve({ ok: false, finalUrl: targetUrl, statusCode: 400, error: 'Invalid URL format' });
      return;
    }

    const client = urlObj.protocol === 'https:' ? https : http;
    const options = {
      method: method,
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      headers: {
        'User-Agent': USER_AGENT
      },
      timeout: timeoutMs
    };

    const req = client.request(options, (res) => {
      const code = res.statusCode;

      // Handle Redirections (301, 302, 307, 308)
      if (code >= 300 && code < 400 && res.headers.location) {
        const absoluteRedirect = resolveAbsoluteUrl(res.headers.location, targetUrl);
        // Follow redirect using HEAD (or same method)
        requestHttp(absoluteRedirect, method, timeoutMs, redirectCount + 1).then(resolve);
        return;
      }

      resolve({
        ok: code >= 200 && code < 300,
        finalUrl: targetUrl,
        statusCode: code,
        headers: res.headers
      });
    });

    req.on('error', (err) => {
      resolve({ ok: false, finalUrl: targetUrl, statusCode: 0, error: err.message });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, finalUrl: targetUrl, statusCode: 0, error: 'Request timeout' });
    });

    req.end();
  });
}

/**
 * High-reliability URL validator.
 * Tests using HEAD, fallbacks to GET on 403/405/501, follows redirects up to 5 times.
 */
export async function validateAndResolveUrl(urlEntry) {
  if (!urlEntry) {
    return { ok: false, error: 'Empty URL' };
  }

  // 1. Initial check using HEAD
  let res = await requestHttp(urlEntry, 'HEAD', 8000);

  // Retry once if network error or timeout
  if (!res.ok && res.statusCode === 0) {
    console.log(`[INGESTION] Tentative de secours (retry) pour ${urlEntry} suite à une erreur réseau/timeout...`);
    await new Promise(r => setTimeout(r, 1500));
    res = await requestHttp(urlEntry, 'HEAD', 15000);
  }

  // 2. Fallback to GET if HEAD method is forbidden, not allowed, or not implemented
  if (!res.ok && (res.statusCode === 405 || res.statusCode === 403 || res.statusCode === 501)) {
    res = await requestHttp(urlEntry, 'GET', 12000);
  }

  // Legifrance and OpenAI specific anti-bot 403 bypass
  if (!res.ok && res.statusCode === 403 && (urlEntry.toLowerCase().includes('legifrance.gouv.fr') || urlEntry.toLowerCase().includes('openai.com'))) {
    console.log(`[INGESTION] ${urlEntry.toLowerCase().includes('openai.com') ? 'OpenAI' : 'Légifrance'} a retourné 403 (sécurité anti-robot), acceptation par dérogation.`);
    return {
      ok: true,
      finalUrl: urlEntry,
      statusCode: 200
    };
  }

  if (!res.ok) {
    return {
      ok: false,
      statusCode: res.statusCode,
      error: res.error || `HTTP Status ${res.statusCode}`
    };
  }

  // 3. Try to fetch the HTML body to extract canonical tags (link rel="canonical" or og:url)
  const finalUrl = res.finalUrl;
  let canonicalUrl = finalUrl;

  try {
    const html = await fetchHtmlContent(finalUrl);
    if (html) {
      // RegEx to search for <link rel="canonical" href="..." />
      const canonicalRegex = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i;
      const canonicalRegexAlt = /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i;
      let match = html.match(canonicalRegex) || html.match(canonicalRegexAlt);

      if (!match) {
        // Fallback to og:url meta tag
        const ogUrlRegex = /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i;
        const ogUrlRegexAlt = /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:url["']/i;
        match = html.match(ogUrlRegex) || html.match(ogUrlRegexAlt);
      }

      if (match && match[1]) {
        const extractedCanonical = resolveAbsoluteUrl(match[1].trim(), finalUrl);
        // Quick validate canonical url
        const canonicalCheck = await requestHttp(extractedCanonical, 'HEAD');
        if (canonicalCheck.ok) {
          canonicalUrl = canonicalCheck.finalUrl;
        }
      }
    }
  } catch (err) {
    // Gracefully fallback to final resolved redirect url if HTML canonical parsing fails
  }

  return {
    ok: true,
    finalUrl: canonicalUrl,
    statusCode: res.statusCode
  };
}

/**
 * Fetch HTML body helper.
 */
function fetchHtmlContent(targetUrl) {
  return new Promise((resolve, reject) => {
    let urlObj;
    try {
      urlObj = new URL(targetUrl);
    } catch (e) {
      reject(e);
      return;
    }

    const client = urlObj.protocol === 'https:' ? https : http;
    const options = {
      method: 'GET',
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      headers: {
        'User-Agent': USER_AGENT
      },
      timeout: 5000
    };

    const req = client.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout fetching HTML'));
    });
  });
}

/**
 * Validates og:image URL and falls back to Supabase Storage fallback pools if dead/missing.
 */
export async function validateAndResolveThumbnail(ogImage, categoryKey, title = '') {
  const supabaseUrl = 'https://muvmlvuhbxevqgppvcgf.supabase.co';
  const bucketName = 'thumbnails-fallback';

  // Fallback pool paths for storage
  const pools = {
    'ia': ['ia/ia-t-1.png', 'ia/ia-t-2.png', 'ia/ia-ag-2.jpg', 'ia/ia-b-1.png'],
    'qhse': ['qhse/qhse-legifrance.png', 'qhse/qhse-aida.png', 'qhse/qhse-barpi.png', 'qhse/qhse-actuenv.png'],
    'cybersecurite': ['cybersecurite/cyber-1.jpg'],
    'hardware': ['hardware/hardware-1.png'],
    'business': ['business/fin-ent-2.png', 'business/fin-val-2.png', 'business/ent-cre-2.png'],
    'science': ['science/science-1.png']
  };

  // Resolve simplified category folder key
  let catFolder = 'ia';
  const catLower = categoryKey.toLowerCase();
  if (catLower.includes('qhse')) catFolder = 'qhse';
  else if (catLower.includes('cyber')) catFolder = 'cybersecurite';
  else if (catLower.includes('hard')) catFolder = 'hardware';
  else if (catLower.includes('fin') || catLower.includes('ent') || catLower.includes('business')) catFolder = 'business';
  else if (catLower.includes('sci')) catFolder = 'science';

  // Helper to generate public storage fallback URL
  const getFallbackUrl = () => {
    const list = pools[catFolder] || pools['ia'];
    // Use title length or rotation index to select deterministic fallback from pool
    const idx = title ? (title.length % list.length) : 0;
    const remotePath = list[idx];
    return `${supabaseUrl}/storage/v1/object/public/${bucketName}/${remotePath}`;
  };

  // 1. If ogImage is provided, test it
  if (ogImage) {
    try {
      const res = await requestHttp(ogImage, 'GET');
      if (res.ok && res.headers['content-type'] && res.headers['content-type'].startsWith('image/')) {
        return {
          thumbnail: ogImage,
          source: 'og'
        };
      }
    } catch (err) {
      // Fall through to fallback
    }
  }

  // 2. Fallback execution
  return {
    thumbnail: getFallbackUrl(),
    source: 'fallback'
  };
}
