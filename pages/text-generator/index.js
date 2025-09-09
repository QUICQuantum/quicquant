import React, { useState } from "react";
import Context from "@/context/Context";

import PageHead from "../Head";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import BackToTop from "../backToTop";
import LeftDashboardSidebar from "@/components/Header/LeftDashboardSidebar";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import RightDashboardSidebar from "@/components/Header/RightDashboardSidebar";
import Modal from "@/components/Common/Modal";
import TextGenerator from "@/components/TextGenerator/TextGenerator";
import StaticbarDashboard from "@/components/Common/StaticBarDashboard";
import { motion, AnimatePresence } from "framer-motion";

const TextGeneratorPage = () => {
  // Shared state for generated text and loading state
  const [generatedText, setGeneratedText] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  // Function to handle response from StaticbarDashboard (update state with new payload)
  const handleTextGeneration = (newText) => {
    setGeneratedText(newText); // Update state with the new payload
    setIsLoading(false); // Set loading state to false after receiving the response
  };

  return (
    <>
      <PageHead title="Text Generator" />

      <main className="page-wrapper rbt-dashboard-page">
        <div className="rbt-panel-wrapper">
          <Context>
            <LeftDashboardSidebar />
            <HeaderDashboard display="" />
            <Modal />
            <PopupMobileMenu />

            <div className="rbt-main-content" style={{  overflowY: "auto",  height: "calc(100vh - 100px)", margin: "80px 20px 20px 20px",borderRadius: "24px",  backgroundColor: "#08133C", width: "-webkit-fill-available", justifyContent: "center", display: "flex"}}>
              <div className="rbt-daynamic-page-content" style={{width: "804px"}}>
                <div className="rbt-dashboard-content" style={{paddingBottom: "100px"}}>
                  <div className="content-page">
                    <div className="chat-box-section">
                      {/* Pass generatedText and isLoading to TextGenerator */}
                      <TextGenerator
                        payload={generatedText}
                        isLoading={isLoading}
                      />

                      {/* Pass handleTextGeneration to StaticbarDashboard */}
                      <StaticbarDashboard pageType={"text"} onTextGenerate={handleTextGeneration} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <BackToTop />
          </Context>
        </div>
      </main>
    </>
  );
};

export default TextGeneratorPage;
