import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Sal from "sal.js";
import PricingData from "../../data/pricing.json";

import SplitImg from "../../public/images/split/split-2.png";
import SplitLogo from "../../public/images/split/split-2-logo.png";
import DarkSplitImg from "../../public/images/light/split/split-2.png";
import DarkSplitLogo from "../../public/images/light/split/split-2-logo.png";
import bannerImg from "../../public/images/bg/slider-main-image.png";
import bannerWhiteImg from "../../public/images/light/bg/slider-main-image.png";
import launchIcon from "../../public/images/icons/launch.svg";
import shapeOne from "../../public/images/bg/icon-shape/icon-shape-one.png";
import shapeTwo from "../../public/images/bg/icon-shape/icon-shape-two.png";
import shapeThree from "../../public/images/bg/icon-shape/icon-shape-three.png";
import shapeFour from "../../public/images/bg/icon-shape/icon-shape-four.png";
import bgShape from "../../public/images/bg/split-bg-shape.png";
import bgShapeOne from "../../public/images/bg/bg-shape-four.png";
import bgShapeTwo from "../../public/images/bg/bg-shape-five.png";
import bgShapeThree from "../../public/images/bg/bg-shape-two.png";
import Efficiency from "../Efficiency/Efficiency";
import EfficiencySecond from "../EfficiencySecond/EfficiencySecond";
import ContactComponent from "../ContactComponent/ContactComponent";
import TradingViewWidget from "../Widgets/TradingViewWidget";
import Roadmap from "../Roadmap/Roadmap";
import GptSection from "../GptSection/GptSection";
import TabStyleOne from "../TabStyles/TabStyle-One";
import ServiceStyleOne from "../Services/ServiceStyle-One";
import CtaOne from "../CallToActions/Cta-One";
import Pricing from "../Pricing/Pricing";
import NewsItem from "../NewsItem/NewsItem";
import Testimonial from "../Testimonials/Testimonial";
import BrandTwo from "../Brands/Brand-Two";
import CtaTwo from "../CallToActions/Cta-Two";
import { useAppContext } from "@/context/Context";
import BlogPost from "../Blog/BlogItems/BlogPost";
import BlogUpdateStatus from "../BlogUpdateStatus/BlogUpdateStatus";

import { motion, AnimatePresence } from "framer-motion";

const Home = ({ blog }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const popupRef = useRef(null);
  const symbols = process.env.NEXT_PUBLIC_COMPANY_NAMES.split(",").map((name) =>
    name.trim()
  );

// ANIMATION FOR POPUP
const audioRef = useRef(null);

useEffect(() => {
  if (showPopup) {
  
    const playSound = async () => {
      if (audioRef.current) {
        audioRef.current.pause(); 
        audioRef.current.currentTime = 0; 
        await audioRef.current.play().catch(() => {}); 
      }
    };

   
    playSound();

    // Play sound after 1.5 seconds
    const t1 = setTimeout(() => {
      playSound();
    }, 1500);

    // Play sound after 3 seconds
    const t2 = setTimeout(() => {
      playSound();
    }, 3000);

  
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }
}, [showPopup]);  



const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 1.5, // 3 seconds between each button
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};



// ANIMATED ENDED


  useEffect(() => {
    Sal();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const intervalId = setInterval(() => {
      setPreviousIndex(visibleIndex);
      setVisibleIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId);
    };
  }, [visibleIndex, symbols.length]);


  const handlePopupOpen = () => setShowPopup(true);
  const handlePopupClose = () => {
    if (popupRef.current) {
      popupRef.current.style.backgroundColor = "transparent"; // Adjust this to fit your needs
    }
    setShowPopup(false);
  };
  

  return (
    <>
      <div className="slider-area slider-style-1 variation-default slider-bg-image slider-bg-shape " data-black-overlay="1">
        <div className="bgvideo w-100">
          <video autoPlay muted loop playsInline controls={false} className="w-100">
            <source src="/videos/homebg.webm" type="video/webm" />
            <source src="/videos/homebg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="container" style={{ height: "100vh" }}>
          <div className="row justify-content-center h-100">
            <div className="col-lg-12">
              <motion.div
                className="inner text-center h-100"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <Image
                  style={{ marginBottom: "30px" }}
                  src="/images/logo/miniLogo.svg"
                  width="56"
                  height="56"
                  alt="YES"
                />
                <h1 className="title display-one heading-major-mob ">
                  Explore the Frontiers of <br />
                  <span className="header-caption animatedtextmargin w-100">
                    <span className="cd-headline rotate-1 w-100">
                      <span className="cd-words-wrapper heading-major-mob animatedtexthome text-center w-100">
                        <b className={visibleIndex === 0 ? "is-visible theme-gradient" : previousIndex === 0 ? "is-hidden theme-gradient" : "theme-gradient"}>
                          Quantum Computing
                        </b>
                        <b className={visibleIndex === 1 ? "is-visible theme-gradient" : previousIndex === 1 ? "is-hidden theme-gradient" : "theme-gradient"}>
                          Quantum Algorithms
                        </b>
                        <b className={visibleIndex === 2 ? "is-visible theme-gradient" : previousIndex === 2 ? "is-hidden theme-gradient" : "theme-gradient"}>
                          Quantum Research
                        </b>
                      </span>
                    </span>
                  </span>
                  <span className="animatedmarginfix" style={{ display: "block", marginTop: "10px" }}>
                    with Quantum Tech
                  </span>
                </h1>
                <p className="description text-mob ">
                  Discover the power of quantum mechanics to revolutionize computation. Dive into the future today.
                </p>
                <button
                  onClick={handlePopupOpen}
                  style={{
                    height: "40px",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    background: "transparent",
                    color: "white",
                    border: "1px solid var(--slate-700, #334155)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  LAUNCH APP (LIVE)
                  <Image src={launchIcon} width={23} height={23} alt="Launch Icon" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
        ;

        ;

<AnimatePresence>
  {showPopup && (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(17, 11, 30, 0.7)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      ref={popupRef}
      onClick={handlePopupClose}
    >
      <audio ref={audioRef} src="/audio/popup.mp3" preload="auto" />
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        style={{
          background: "#02071c",
          padding: "60px",
          borderRadius: "60px",
          boxShadow: "inset 0px 0px 30px 1px #5343b3",
          maxWidth: "800px",
          textAlign: "center",
          color: "#fff",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="popup-buttons"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            marginTop: "10px",
            flexWrap: "wrap",
          }}
        >
          <motion.div variants={itemVariants}>
            <Link href="/text-generator" className="popup-btn" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.2rem" }}>
              <Image src="/images/icons/Gpt.svg" alt="GPT Icon" width={30} height={30} />
              <span>GPT-s</span>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/blog" className="popup-btn" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.2rem" }}>
              <Image src="/images/icons/Contact.svg" alt="Contact Icon" width={30} height={30} />
              <span>News Algorithm</span>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/com-stocks" className="popup-btn" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "1.2rem" }}>
              <Image src="/images/icons/stocks.svg" alt="Stocks Icon" width={30} height={30} />
              <span>Quantum Stocks Analysis</span>
            </Link>
          </motion.div>
        </motion.div>

        <button
          onClick={handlePopupClose}
          style={{
            marginTop: "30px",
            padding: "10px 15px",
            borderRadius: "50%",
            background: "#5343b3",
            border: "2px solid #5343b3",
            color: "#fff",
          }}
        >
          X
        </button>
      </motion.div>
    </div>
  )}
</AnimatePresence>
      </div>

      <motion.div
        className="rainbow-service-area rainbow-section-gap rainbow-section-gapBottom-big eff container-padding"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Efficiency />
      </motion.div>

      <motion.div
        className="rainbow-service-area rainbow-section-gap rainbow-section-gapBottom-big container-padding"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <GptSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          marginTop: "-100px",
          border: "2px solid #7FFFBF",
          borderRadius: "10px",
          padding: "12px 24px",
          textAlign: "center",
          color: "white",
          backgroundColor: "#06141b",
          fontWeight: "500",
          fontSize: "40px",
          width: "70%",
          margin: "0 auto",
        }}
      >
        PRESALE IS LIVE IN PINKSALE
      </motion.div>

      <motion.div
        className="rainbow-service-area rainbow-section-gap rainbow-section-gapBottom-big eff2 container-padding"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <EfficiencySecond />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Roadmap isMainPage={true} />
      </motion.div>

      <motion.div
        className="aiwave-pricing-area wrapper rainbow-section-gap-big"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center" data-sal="slide-up" data-sal-duration="400" data-sal-delay="150">
                <h4 className="subtitle">
                  <span className="theme-gradient">TOKENOMICS</span>
                </h4>
                <h3 className="title w-600 mb--40" style={{ fontFamily: "Satoshi-Regular", fontSize: "40px", fontWeight: "500", fontStyle: "normal" }}>
                  Token Flow & Utility
                </h3>
                <h1 className="title w-600 mb--40">
                  <font className="numticker heading-major-mob">1,000,000,000</font>{" "}
                  <font className="ticker heading-major-mob">$QUIC</font>
                </h1>
                <Image style={{ marginTop: "50px" }} src="/images/pricing/piechart.svg" width="1195" height="578" alt="YES" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div style={{ marginTop: "50px" }}>
          <TradingViewWidget isHome={true} watchlist={symbols} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          marginTop: "50px",
          border: "2px solid #7FFFBF",
          borderRadius: "10px",
          padding: "12px 24px",
          textAlign: "center",
          color: "white",
          backgroundColor: "#06141b",
          fontWeight: "500",
          fontSize: "40px",
          width: "70%",
          margin: "0 auto",
        }}
      >
        PRESALE IS LIVE IN PINKSALE
      </motion.div>

      <motion.div
        className="rainbow-service-area rainbow-section-gap rainbow-section-gapBottom-big"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container ">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center " data-sal="slide-up" data-sal-duration="400" data-sal-delay="150">
                <h4 className="subtitle">
                  <span className="theme-gradient-new">NEWS</span>
                </h4>
                <h2 className="title mb--60">Latest News You Need to Read</h2>
              </div>
            </div>
          </div>
        </div>
        <NewsItem/>
      </motion.div>

      <motion.div
        className="rainbow-contact-area rainbow-section-gap rainbow-section-gapBottom-big"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ContactComponent />
      </motion.div>
    </>
  );
};

export default Home;
