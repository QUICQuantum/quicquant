import React, { useEffect, useState } from "react";
import PageHead from "../Head";
import Context from "@/context/Context";
import Header from "@/components/Header/Header";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import MarketQuotesWidget from "@/components/Widgets/MarketQuotesWidgets";
import MarketCap from "@/components/Widgets/MarketCap";
import BackToTop from "../backToTop";
import TradingViewWidget from "@/components/Widgets/TradingViewWidget";
import Footer from "@/components/Footers/Footer";
import Copyright from "@/components/Footers/Copyright";

import { motion } from "framer-motion";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Delay between children
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ComStocksPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const symbols = process.env.NEXT_PUBLIC_COMPANY_NAMES.split(",").map((name) =>
    name.trim()
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <PageHead title="Stocks & Technical Analysis" />

      <main className="page-wrapper">
        <Context>
          <Header
            headerTransparent="header-transparent"
            headerSticky="header-sticky"
            btnClass="rainbow-gradient-btn"
          />
          <PopupMobileMenu />

          <div className="rainbow-cta-area rainbow-section-gap rainbow-section-gapBottom-big bgcolor-1">
            <div className="bgvideo w-100">
              {isMobile ? (
                <video
                  src="/videos/homebg.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  className="w-100"
                ></video>
              ) : (
                <video
                  src="/videos/homebg.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  className="w-100"
                ></video>
              )}
            </div>
            <motion.div
              className="container"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div
                className="row"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gridGap: "20px",
                  marginTop: "100px",
                }}
              >
                <motion.div variants={itemVariants}>
                  <div>
                    <MarketCap symbols={symbols} />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div style={{ marginBottom: "20px" }}>
                    <MarketQuotesWidget symbols={symbols} />
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <div style={{ marginTop: "50px" }}>
                  <TradingViewWidget watchlist={symbols} />
                </div>
              </motion.div>
            </motion.div>
          </div>

          <BackToTop />
          <Footer />
          <Copyright />
        </Context>
      </main>
    </>
  );
};

export default ComStocksPage;
