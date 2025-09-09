import React from "react";
import Context from "@/context/Context";

import PageHead from "../Head";
import BlogData from "../../data/blog.json";
import Header from "../../components/Header/Header";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import Footer from "@/components/Footers/Footer";
import Copyright from "@/components/Footers/Copyright";
import Breadcrumb from "@/components/Common/Breadcrumb";
import BackToTop from "../backToTop";
import Utilize from "@/components/Utilize/Utilize";

import { motion } from "framer-motion";


const UtilizePage = () => {
  return (
    <>
      <PageHead title="Learn Quantum Computing" />

      <main className="page-wrapper">
        <Context>
          <Header
            headerTransparent="header-transparent"
            headerSticky="header-sticky"
            btnClass="rainbow-gradient-btn"
          />
          <PopupMobileMenu />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Utilize />
          </motion.div>

          <BackToTop />
          <Footer />
          <Copyright />
        </Context>
      </main>
    </>
  );
};

export default UtilizePage;
  