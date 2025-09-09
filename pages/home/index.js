import React from "react";
import Context from "@/context/Context";

import PageHead from "../Head";
import Header from "@/components/Header/Header";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import Home from "@/components/Home/Home";
import Footer from "@/components/Footers/Footer";
import Copyright from "@/components/Footers/Copyright";

const HomePage = ({ blogs, copyrightText }) => {
  console.log("blogs:", blogs);
  console.log("copyrightText:", copyrightText);
  return (
    <>
      <PageHead title="Home" />

      <main className="page-wrapper">
        <Context>
          <Header
            headerTransparent="header-transparent"
            headerSticky="header-sticky"
            btnClass="rainbow-gradient-btn"
          />
          <PopupMobileMenu />

          <Home blog={blogs} />
          <Footer />
          <Copyright text={copyrightText} />
        </Context>
      </main>
    </>
  );
};

export default HomePage;

