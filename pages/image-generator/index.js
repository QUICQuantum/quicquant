import React, { useState } from "react";
import Context from "@/context/Context";
import PageHead from "../Head";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import BackToTop from "../backToTop";
import LeftDashboardSidebar from "@/components/Header/LeftDashboardSidebar";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import Modal from "@/components/Common/Modal";
import StaticbarDashboard from "@/components/Common/StaticBarDashboard";
import ImageGenerator from "@/components/ImageGenerator/ImageGenerator";

const ImageGeneratorPage = () => {
  const [generatedContent, setGeneratedContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageGeneration = (newImage) => {
    setGeneratedContent((prevContent) => [...prevContent, ...newImage]);
    setIsLoading(false);
  };

  return (
    <>
      <PageHead title="Image Generator" />

      <main className="page-wrapper rbt-dashboard-page">
        
        <div className="rbt-panel-wrapper">
          <Context>
            <LeftDashboardSidebar />
            <HeaderDashboard display="" />
            <Modal />
            <PopupMobileMenu />

            <div className="rbt-main-content" style={{   overflowY: "auto",  height: "calc(100vh - 100px)", margin: "80px 20px 20px 20px",borderRadius: "24px",  backgroundColor: "#08133C", width: "-webkit-fill-available", justifyContent: "center", display: "flex"}}>
              <div className="rbt-daynamic-page-content" style={{width: "804px"}}>
                <div className="rbt-dashboard-content" style={{paddingBottom: "100px"}}>
                  <div className="content-page">
                    <div className="chat-box-section">
                    <ImageGenerator payload={generatedContent} isLoading={isLoading} />
                      <StaticbarDashboard
                        pageType={"image"}
                        onImageGenerate={handleImageGeneration}
                      />
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

export default ImageGeneratorPage;
