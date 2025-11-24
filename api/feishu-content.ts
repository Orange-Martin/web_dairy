import type { VercelRequest, VercelResponse } from '@vercel/node';
import http from 'http';
import axios from 'axios';

// ... (这里省略了之前的所有接口定义和函数，它们保持不变)

// 在 Vercel 的服务器环境中，我们使用 process.env 来访问环境变量
const APP_ID = process.env.FEISHU_APP_ID || process.env.VITE_FEISHU_APP_ID;
const APP_SECRET = process.env.FEISHU_APP_SECRET || process.env.VITE_FEISHU_APP_SECRET;
const APP_TOKEN = process.env.FEISHU_APP_TOKEN || process.env.VITE_FEISHU_APP_TOKEN;
const TABLE_ID = process.env.FEISHU_TABLE_ID || process.env.VITE_FEISHU_TABLE_ID;
const ARTICLES_TABLE_ID = process.env.FEISHU_ARTICLES_TABLE_ID || process.env.VITE_FEISHU_ARTICLES_TABLE_ID;
const USER_ACCESS_TOKEN = process.env.FEISHU_USER_ACCESS_TOKEN || process.env.VITE_FEISHU_USER_ACCESS_TOKEN;

const FEISHU_API_BASE = 'https://open.feishu.cn/open-apis';

interface TenantAccessTokenResponse {
  code: number;
  msg: string;
  tenant_access_token: string;
  expire: number;
}

interface BitableRecord {
  id: string;
  record_id: string;
  fields: {
    key: string;
    content_text?: string;
    content_image?: {
      file_token: string;
      name: string;
      url?: string;
    }[];
    description?: string;
  };
}

interface BitableRecordsResponse {
  code: number;
  msg: string;
  data: {
    items: BitableRecord[];
    total: number;
    has_more: boolean;
    page_token?: string;
  };
}

async function getTenantAccessToken(): Promise<string> {
  const response = await axios.post<TenantAccessTokenResponse>(
    `${FEISHU_API_BASE}/auth/v3/tenant_access_token/internal`,
    {
      app_id: APP_ID,
      app_secret: APP_SECRET,
    }
  );
  if (response.data.code !== 0) {
    throw new Error(`Failed to get tenant access token: ${response.data.msg}`);
  }
  return response.data.tenant_access_token;
}

async function getBitableRecords(token: string): Promise<BitableRecord[]> {
  const response = await axios.get<BitableRecordsResponse>(
    `${FEISHU_API_BASE}/bitable/v1/apps/${APP_TOKEN}/tables/${TABLE_ID}/records`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (response.data.code !== 0) {
    throw new Error(`Failed to get bitable records: ${response.data.msg}`);
  }
  return response.data.data.items;
}

async function getFileDownloadUrl(fileToken: string, useToken: string): Promise<string | null> {
  const map = await batchGetTmpDownloadUrls([fileToken], useToken);
  return map[fileToken] || null;
}

async function batchGetTmpDownloadUrls(fileTokens: string[], token: string): Promise<Record<string, string>> {
  if (!fileTokens.length) return {};
  try {
    const r = await axios.post(
      `${FEISHU_API_BASE}/drive/v1/media/batch_get_tmp_download_url`,
      { file_tokens: fileTokens },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (r.data && r.data.code === 0) {
      const list = r.data.data?.tmp_download_urls || r.data.data?.items || [];
      const map: Record<string, string> = {};
      for (const item of list) {
        const tok = item.file_token || item.token || item.fileToken;
        const url = item.tmp_download_url || item.url || item.download_url;
        if (tok && url) map[tok] = url;
      }
      return map;
    }
  } catch {}
  return {};
}

async function formatRecords(records: BitableRecord[], driveToken: string): Promise<Record<string, any>> {
  const contentMap: Record<string, any> = {};
  for (const record of records) {
    const key = record.fields.key;
    if (!key) continue;

    if (record.fields.content_text) {
      contentMap[key] = record.fields.content_text;
    }

    if (record.fields.content_image && record.fields.content_image.length > 0) {
      const tokens = record.fields.content_image.map(i => i.file_token).filter(Boolean);
      const batchMap = await batchGetTmpDownloadUrls(tokens, driveToken);
      const urls: string[] = [];
      for (const img of record.fields.content_image) {
        const url = img.url || batchMap[img.file_token] || null;
        if (!url) {
          const single = await getFileDownloadUrl(img.file_token, driveToken);
          if (single) urls.push(single);
        } else {
          urls.push(url);
        }
      }
      const hasText = typeof contentMap[key] === 'string' && contentMap[key].trim() !== '';
      if (!hasText) {
        if (/gallery/i.test(key) || /_gallery_urls$/.test(key)) {
          contentMap[key] = urls;
        } else if (/image/i.test(key) || /cover/i.test(key) || /_image_url$/.test(key) || /_cover_url$/.test(key)) {
          contentMap[key] = urls[0] || contentMap[key];
        }
      }
    }
  }
  return contentMap;
}

function formatArticles(records: any[]): any[] {
  const list: any[] = [];
  for (const r of records) {
    const f = r.fields || {};
    list.push({
      id: String(f.id || r.id || r.record_id || ''),
      title: String(f.title || ''),
      subtitle: String(f.subtitle || ''),
      date: String(f.date || ''),
      location: String(f.location || ''),
      coverImage: String(f.cover_image_url || ''),
      category: String(f.category || ''),
      readTime: String(f.read_time || ''),
      content: String(f.content || ''),
      gallery: Array.isArray(f.gallery_urls) ? f.gallery_urls.map((x: any) => String(x)) : [],
    });
  }
  return list;
}


// 这是我们之前写的核心逻辑，现在我们让它既能被 Vercel 调用，也能被本地的 http 服务器调用
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log(`[api/feishu-content] Received request for: ${req.url}`);
  const missing: string[] = [];
  if (!APP_ID) missing.push('FEISHU_APP_ID');
  if (!APP_SECRET) missing.push('FEISHU_APP_SECRET');
  if (!APP_TOKEN) missing.push('FEISHU_APP_TOKEN');
  if (!TABLE_ID) missing.push('FEISHU_TABLE_ID');
  if (!ARTICLES_TABLE_ID) console.warn('FEISHU_ARTICLES_TABLE_ID not set, articles will be empty');
  if (missing.length) {
    res.status(500).json({ error: `Missing env: ${missing.join(', ')}` });
    return;
  }
  try {
    const accessToken = await getTenantAccessToken();
    const configRecords = await getBitableRecords(accessToken);
    const formattedContent = await formatRecords(configRecords, USER_ACCESS_TOKEN || accessToken);
    let articlesList: any[] = [];
    if (ARTICLES_TABLE_ID) {
      const response = await axios.get<BitableRecordsResponse>(
        `${FEISHU_API_BASE}/bitable/v1/apps/${APP_TOKEN}/tables/${ARTICLES_TABLE_ID}/records`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (response.data.code === 0) {
        articlesList = formatArticles(response.data.data.items);
      }
    }
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
    res.status(200).json({ config: formattedContent, articles: articlesList });
  } catch (error) {
    console.error('Error in serverless function:', error);
    // @ts-ignore
    const message = error.message || 'Failed to fetch website content.';
    res.status(500).json({ error: message });
  }
}

// --- 以下是为本地开发新增的代码 ---
// 如果这个文件是直接被 node 运行的，而不是被 Vercel 作为模块导入的，
// 那么就启动一个本地服务器。
if (require.main === module) {
  const PORT = 3001;
  const server = http.createServer(async (req, res) => {
    console.log(`[Local API Server] Received request for: ${req.url}`);
    try {
      const accessToken = await getTenantAccessToken();
      const u = new URL(req.url || '/', 'http://localhost');
      if (u.pathname === '/tmp-download') {
        const t = u.searchParams.getAll('token');
        const map = await batchGetTmpDownloadUrls(t, USER_ACCESS_TOKEN || accessToken);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200);
        res.end(JSON.stringify(map));
        return;
      }

      const configRecords = await getBitableRecords(accessToken);
      const formattedContent = await formatRecords(configRecords, USER_ACCESS_TOKEN || accessToken);
      let articlesList: any[] = [];
      if (ARTICLES_TABLE_ID) {
        const response = await axios.get<BitableRecordsResponse>(
          `${FEISHU_API_BASE}/bitable/v1/apps/${APP_TOKEN}/tables/${ARTICLES_TABLE_ID}/records`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (response.data.code === 0) {
          articlesList = formatArticles(response.data.data.items);
        }
      }

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.writeHead(200);
      res.end(JSON.stringify({ config: formattedContent, articles: articlesList }));

    } catch (error) {
      console.error('Error in local API server:', error);
      const message = error instanceof Error ? error.message : 'Failed to fetch content';
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(500);
      res.end(JSON.stringify({ error: message }));
    }
  });

  server.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}`);
  });
}
