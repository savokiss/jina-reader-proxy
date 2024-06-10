import { Hono } from "hono";
import { getText, getHtml, getJson, getScreenshot, getMarkdown } from "./utils/jina";
import { extractMetaData, extractNextData } from "./utils/html";
import { removeImageTag } from './utils/markdown'

type Variables = {
  url: string;
};

const app = new Hono<{ Variables: Variables }>();

const jinaUrl = "https://r.jina.ai/";

function getTargetUrl(url: string) {
  return jinaUrl + url;
}

app.get("/", (c) => {
  return c.text("Hello, This is Jina Reader Proxy!");
});

app.use(async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`);
  const url = c.req.query("url") || "";
  if (!url || !url.startsWith("http")) {
    return c.text("Url invalid", 400);
  }
  c.set("url", url);
  await next();
});

app.get("/reader", async (c) => {
  const url = c.get("url");
  const noImage = c.req.query("noimage");
  const queries = c.req.queries();

  const target = getTargetUrl(url);
  let markdown = await getMarkdown(target, queries);

  if (noImage) {
    markdown = removeImageTag(markdown);
  }

  return c.text(markdown);
});

app.get("/markdown", async (c) => {
  const url = c.get("url");
  const noImage = c.req.query("noimage");

  const target = getTargetUrl(url);

  let markdown = await getMarkdown(target)

  if (noImage) {
    markdown = removeImageTag(markdown);
  }

  return c.json({
    code: 200,
    data: {
      markdown,
    },
  });
});

app.get("/text", async (c) => {
  const url = c.get("url");

  const target = getTargetUrl(url);
  const res = await getText(target);

  return c.json(res);
});

app.get("/html", async (c) => {
  const url = c.get("url");

  const target = getTargetUrl(url);
  const res = await getHtml(target);

  return c.json(res);
});

app.get("/json", async (c) => {
  const url = c.get("url");

  const target = getTargetUrl(url);
  const res = await getJson(target);

  return c.json(res);
});

app.get("/screenshot", async (c) => {
  const url = c.get("url");

  const target = getTargetUrl(url);
  const res = await getScreenshot(target);

  return c.json(res);
});

app.get("/nextdata", async (c) => {
  const url = c.get("url");

  const target = getTargetUrl(url);
  const res = await getHtml(target);

  if (!res.data.html) {
    return c.json({
      code: 400,
      error: "Jina error",
    });
  }

  const nextData = await extractNextData(res.data.html);
  
  return c.json({
    code: 200,
    data: {
      nextData,
    },
  });
});

app.get("/meta", async (c) => {
  const url = c.get("url");

  const target = getTargetUrl(url);
  const res = await getHtml(target);

  if (!res.data.html) {
    return c.json({
      code: 400,
      error: "Jina error",
    });
  }

  const meta = await extractMetaData(res.data.html);
  
  return c.json({
    code: 200,
    data: {
      meta,
    },
  });
});

export default app;
