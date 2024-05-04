export async function extractNextData (html: string) {
  const response = new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });

  let scriptContent = ''; // 用于存储 script 标签内容的变量

  // 创建 HTMLRewriter 并对指定 script 标签应用处理器
  const rewriter = new HTMLRewriter().on('script#__NEXT_DATA__', {
    text(text) {
      // 将每个文本片段追加到 scriptContent 变量中
      scriptContent += text.text;
    }
  })

  // 使用 HTMLRewriter 修改响应
  await rewriter.transform(response).text(); // 确保 HTMLRewriter 完成处理
  
  return JSON.parse(scriptContent);
}

export async function extractMetaData (html: string) {
  const response = new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });

  let title = '';
  let description = '';

  const rewriter = new HTMLRewriter().on('title', {
    text(text) {
      if (!text.lastInTextNode) {
        title += text.text;
      }
    }
  }).on('meta[name="description"]', {
    element(element) {
      const desc = element.getAttribute('content');
      description = desc || '';
    }
  })

  await rewriter.transform(response).text();
  
  return {
    title,
    description
  };
}
