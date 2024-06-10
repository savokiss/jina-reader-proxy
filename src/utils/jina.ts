const optionsMap: Record<string, string> = {
  "withImageSummary": "X-With-Images-Summary",
  "withLinksSumarry": "X-With-Links-Summary",
  "withGeneratedAlt": "X-With-Generated-Alt",
  "noCache": "X-No-Cache",
  "targetSelector": "X-Target-Selector",
  "returnFormat": "X-Return-Format",
}

function generateOptions (options: Jina.XOptions) {
  const headers: Record<string, string> = {};
  Object.keys(options).forEach((key) => {
    const headerKey = optionsMap[key];
    const value = options[key];
    if (optionsMap[key]) {
      headers[headerKey] = value;
    }
  })
  return headers;
}

export async function getMarkdown (url: string, options: Jina.XOptions = {}) {
  const xOptions = generateOptions(options);
  const res: string = await fetch(url, {
    headers: {
      ...xOptions
    },
  }).then((res) => res.text());
  return res;
}

export async function getText (url: string) {
  const res: Jina.TextResult = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-respond-with": "text",
    },
  }).then((res) => res.json());
  return res;
}

export async function getHtml (url: string) {
  const res: Jina.HTMLResult = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-respond-with": "html",
    },
  }).then((res) => res.json());
  return res;
}

export async function getJson (url: string) {
  const res: Jina.JsonResult = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  }).then((res) => res.json());
  return res;
}

export async function getScreenshot(url: string){
  const res: Jina.ScreenshotResult = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-respond-with": "screenshot",
    },
  }).then((res) => res.json());
  return res;
}