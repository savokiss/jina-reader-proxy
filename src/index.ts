import { Hono } from "hono";

const app = new Hono();

const jinaUrl = "https://r.jina.ai/";

function getTargetUrl(url: string) {
  return jinaUrl + url;
}

app.get("/", (c) => {
  return c.text("Hello, This is Jina Reader Proxy!");
});

app.get("/reader", async (c) => {
  const url = c.req.query("url") || "";
  if (!url || !url.startsWith("http")) {
    return c.text("Url invalid", 400);
  }
  const target = getTargetUrl(url);

  const markdown: string = await fetch(target).then((res) => res.text());

  return c.text(markdown);
});

app.get("/markdown", async (c) => {
  const url = c.req.query("url") || "";
  if (!url || !url.startsWith("http")) {
    return c.text("Url invalid", 400);
  }
  const target = getTargetUrl(url);

  const markdown: string = await fetch(target).then((res) => res.text());

  return c.json({
    code: 200,
    data: {
      markdown,
    },
  });
});

app.get("/text", async (c) => {
  const url = c.req.query("url") || "";
  if (!url || !url.startsWith("http")) {
    return c.text("Url invalid", 400);
  }
  const target = getTargetUrl(url);

  const res: Jina.TextResult = await fetch(target, {
    headers: {
      Accept: "application/json",
      "x-respond-with": "text",
    },
  }).then((res) => res.json());

  return c.json(res);
});

app.get("/html", async (c) => {
  const url = c.req.query("url") || "";
  if (!url || !url.startsWith("http")) {
    return c.text("Url invalid", 400);
  }
  const target = getTargetUrl(url);

  const res: Jina.HTMLResult = await fetch(target, {
    headers: {
      Accept: "application/json",
      "x-respond-with": "html",
    },
  }).then((res) => res.json());

  return c.json(res);
});

app.get("/json", async (c) => {
  const url = c.req.query("url") || "";
  if (!url || !url.startsWith("http")) {
    return c.text("Url invalid", 400);
  }
  const target = getTargetUrl(url);

  const res: Jina.JsonResult = await fetch(target, {
    headers: {
      Accept: "application/json",
    },
  }).then((res) => res.json());

  return c.json(res);
});

app.get("/screenshot", async (c) => {
  const url = c.req.query("url") || "";
  if (!url || !url.startsWith("http")) {
    return c.text("Url invalid", 400);
  }
  const target = getTargetUrl(url);

  const res: Jina.ScreenshotResult = await fetch(target, {
    headers: {
      Accept: "application/json",
      "x-respond-with": "screenshot",
    },
  }).then((res) => res.json());

  return c.json(res);
});

export default app;
