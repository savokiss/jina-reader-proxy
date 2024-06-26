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

  export type NextDataResult = {
    code: number;
    data: {
      nextData: any;
    };
  }

  export type XOptions = {
    [key: string]: any;
    withImageSummary?: boolean;
    withLinksSumarry?: boolean;
    withGeneratedAlt?: boolean;
    noCache?: boolean;
    targetSelector?: string;
    returnFormat?: string;
  }
}
