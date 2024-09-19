import { getScreenshot } from './jina'

export async function getOGImage(url: string, options: Jina.XOptions = {}) {
  const screenshot = await getScreenshot(url, options);
  
  if (screenshot.code !== 200) {
    throw new Error('Failed to get screenshot');
  }

  const imageUrl = screenshot.data.screenshotUrl;

  // 构建 Cloudflare Image Resizing URL
  const pathname = `/cdn-cgi/image/width=1200,height=630,fit=cover/${imageUrl}`;
  return pathname;
}