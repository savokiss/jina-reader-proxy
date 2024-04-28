declare namespace Jina {
  export type JsonResult = {
    code: number;
    status: number;
    data: {
      title: string;
      url: string;
      content: string;
    };
  };

  export type HTMLResult = {
    code: number;
    status: number;
    data: {
      html: string;
    };
  };

  export type TextResult = {
    code: number;
    status: number;
    data: {
      text: string;
    };
  };

  export type ScreenshotResult = {
    code: number;
    status: number;
    data: {
      screenshotUrl: string;
    };
  };
}
