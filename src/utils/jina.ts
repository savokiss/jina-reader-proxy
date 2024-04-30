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