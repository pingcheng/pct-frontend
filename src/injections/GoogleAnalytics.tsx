import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID ?? "");
ReactGA.pageview(window.location.pathname + window.location.search);

export default function usePageViews() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
    console.log(location.pathname + location.search);
  }, [location]);
}
