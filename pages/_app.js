import { Router } from "next/router";
import { useEffect, useState } from "react";
import Loader from "./Loader"; // Import the updated VideoLoader component
import "bootstrap/scss/bootstrap.scss";
import { AppProvider } from "@/context/DataContext"; // Import your context provider

// ========= Plugins CSS START =========
import "../public/css/plugins/feature.css";
import "../public/css/plugins/fontawesome-all.min.css";
import "../public/css/plugins/animation.css";
import "../node_modules/sal.js/dist/sal.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-tooltip/dist/react-tooltip.css";
// ========= Plugins CSS END =========

import "../public/scss/style.scss";
import { SpeedInsights } from "@vercel/speed-insights/next";
import '../utils/suppressLogs';

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    const handleStart = (url) => {
      if (url !== Router.asPath && !isInitialLoad) {
        setLoading(true);
      }
    };

    const handleComplete = () => {
      setLoading(false);
      if (isInitialLoad) {
        setIsInitialLoad(false);
      }
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, [isInitialLoad]);

  const handleVideoComplete = () => {
    setLoading(false); // End the loader when video completes
  };

  return (
    <>
      {loading && isInitialLoad ? (
        <Loader onComplete={handleVideoComplete} />
      ) : (
        <>
          <div className="hidden-content">
            <AppProvider
              blogs={pageProps.blogs || []} // Blogs passed from pages with getStaticProps
              copyrightText={pageProps.copyrightText || ""} // Copyright text passed from pages
              privacyPolicyText={pageProps.privacyPolicyText || ""} // Privacy Policy text passed from pages
              cookiesSettingsText={pageProps.cookiesSettingsText || ""} // Cookies Settings text passed from pages
            >
              <Component {...pageProps} />
            </AppProvider>
          </div>
        </>
      )}
      <SpeedInsights />
    </>
  );
}

