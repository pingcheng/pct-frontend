import { ReportHandler } from "@sentry/tracing/dist/browser/web-vitals/types";

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
