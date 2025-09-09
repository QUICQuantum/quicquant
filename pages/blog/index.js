import React, { useEffect, useState } from "react";
import Context from "@/context/Context";

import PageHead from "../Head";

import Header from "@/components/Header/Header";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import Footer from "@/components/Footers/Footer";
import Copyright from "@/components/Footers/Copyright";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BlogUpdateStatus from "@/components/BlogUpdateStatus/BlogUpdateStatus";
import BackToTop from "../backToTop";
import CtaTwo from "@/components/CallToActions/Cta-Two";
import Blog from "@/components/Blog/Blog";

import { motion } from "framer-motion";

const BlogPage = () => {
  const [isMobile, setIsMobile] = useState(false);

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
      <PageHead title="Blog" />

      <main
        className="page-wrapper container-padding"
        style={{
          background:
            "linear-gradient(180deg, rgba(2, 6, 23, 0.00) 0%, #020617 80%)",
        }}
      >
        <Context>
          <Header
            headerTransparent="header-transparent"
            headerSticky="header-sticky"
            btnClass="rainbow-gradient-btn"
          />
          <PopupMobileMenu />
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
          <div
            className="rainbow-timer-area rainbow-section-gap"
            style={{ marginBottom: "-5%" }}
          >
            <div className="theme-gradient  mt--50">
              <BlogUpdateStatus />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Blog/>
          </motion.div>

          <BackToTop />
          <Footer />
          <Copyright />
        </Context>
      </main>
    </>
  );
};

export default BlogPage;
