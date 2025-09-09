import React, { useState } from "react";
import Context from "@/context/Context";

import PageHead from "../Head";
import PopupMobileMenu from "@/components/Header/PopUpMobileMenu";
import BackToTop from "../backToTop";
import LeftDashboardSidebar from "@/components/Header/LeftDashboardSidebar";
import HeaderDashboard from "@/components/Header/HeaderDashboard";
import RightDashboardSidebar from "@/components/Header/RightDashboardSidebar";
import Modal from "@/components/Common/Modal";
import SpeechToText from "@/components/SpeechToText/SpeechToText";
import StaticbarDashboard from "@/components/Common/StaticBarDashboard";

const SpeechToTextPage = () => {
  // Shared state for generated text and loading state
  const [audioText, setGeneratedText] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [isRecording, setIsRecording] = useState(false); // Track recording state


  // Function to handle response from StaticbarDashboard for audio generation
  const handleAudioGeneration = (newAudioText) => {
    setGeneratedText(newAudioText);
  };

  // Function to handle the change in recording state
  const handleRecordingChange = (newRecordingState) => {
    setIsRecording(newRecordingState); // Update the isRecording state
  };

  return (
    <>
      <PageHead title="Speech to Text" />

      <main className="page-wrapper rbt-dashboard-page">
        
        <div className="rbt-panel-wrapper">
          <Context>
            <LeftDashboardSidebar />
            <HeaderDashboard display="" />
            <Modal />
            <PopupMobileMenu />

            <div className="rbt-main-content" style={{   overflowY: "auto",  height: "calc(100vh - 100px)", margin: "80px 20px 20px 20px", backgroundColor: "#08133C", borderRadius: "24px", width: "-webkit-fill-available", justifyContent: "center", display: "flex"}}>
              <div className="rbt-daynamic-page-content" style={{width: "804px"}}>
                <div className="rbt-dashboard-content" style={{paddingBottom: "100px"}}>
                  <div className="content-page">
                    <div className="chat-box-section">
                    <SpeechToText
                        payload={audioText}
                        isLoading={isLoading}
                        isRecording={isRecording} // Pass isRecording prop here
                      />

                      {/* Pass handleTextGeneration, handleAudioGeneration, and handleRecordingChange to StaticbarDashboard */}
                      <StaticbarDashboard
                        pageType={"audio"}
                        onAudioGenerate={handleAudioGeneration}
                        onIsRecordingChange={handleRecordingChange} // Pass handleRecordingChange callback
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

export default SpeechToTextPage;
