import type { VercelRequest, VercelResponse } from '@vercel/node';
import http from 'http';
import axios from 'axios';

// ... (这里省略了之前的所有接口定义和函数，它们保持不变)

// 在 Vercel 的服务器环境中，我们使用 process.env 来访问环境变量
const APP_ID = process.env.FEISHU_APP_ID;
const APP_SECRET = process.env.FEISHU_APP_SECRET;
const APP_TOKEN = process.env.FEISHU_APP_TOKEN;
const TABLE_ID = process.env.FEISHU_TABLE_ID;

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

function formatRecords(records: BitableRecord[]): Record<string, any> {
  const contentMap: Record<string, any> = {};
  for (const record of records) {
    const key = record.fields.key;
    if (!key) continue;

    if (record.fields.content_text) {
      contentMap[key] = record.fields.content_text;
    } else if (record.fields.content_image && record.fields.content_image.length > 0) {
      contentMap[key] = record.fields.content_image.map(img => ({
        file_token: img.file_token,
        name: img.name,
      }));
    }
  }
  return contentMap;
}


// 这是我们之前写的核心逻辑，现在我们让它既能被 Vercel 调用，也能被本地的 http 服务器调用
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const accessToken = await getTenantAccessToken();
    const records = await getBitableRecords(accessToken);
    const formattedContent = formatRecords(records);
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate');
    res.status(200).json(formattedContent);
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
    // 我们不再直接调用 handler，而是手动实现一个精简版的逻辑
    try {
      const accessToken = await getTenantAccessToken();
      const records = await getBitableRecords(accessToken);
      const formattedContent = formatRecords(records);

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*'); // 允许跨域
      res.writeHead(200);
      res.end(JSON.stringify(formattedContent));

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