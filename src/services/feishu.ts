import axios from 'axios';

// 这个函数现在变得非常简单。
// 它不再直接与飞书通信，而是请求我们自己的 Vercel Serverless Function。
export async function fetchWebsiteContent() {
  try {
    const url = typeof window !== 'undefined'
      ? new URL('/api/feishu-content', window.location.origin).toString()
      : '/api/feishu-content';
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch website content from our API:', error);
    // 如果我们自己的 API 失败了，也返回一个空对象，以防应用崩溃。
    return {};
  }
}