import axios from 'axios';

// 这个函数现在变得非常简单。
// 它不再直接与飞书通信，而是请求我们自己的 Vercel Serverless Function。
export async function fetchWebsiteContent() {
  try {
    // 注意这里的 URL。在开发环境中，Vercel CLI 会自动将 /api 的请求
    // 代理到我们创建的 api/feishu-content.ts 文件。
    // 在生产环境中，Vercel 平台也会做同样的事情。
    const response = await axios.get('/api/feishu-content');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch website content from our API:', error);
    // 如果我们自己的 API 失败了，也返回一个空对象，以防应用崩溃。
    return {};
  }
}