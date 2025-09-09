import React, { useState } from "react";
import Form from "./Form";

const StaticbarDashboard = ({ onTextGenerate, onImageGenerate, onAudioGenerate, pageType, onIsRecordingChange }) => {
  // Function to handle response from Form and update messages
  const handleGeneratedText = (payload) => {
    onTextGenerate(payload); // Pass the updated payload to the parent (TextGeneratorPage)
  };

  // Function to handle image generation
  const handleGeneratedImage = (payload) => {
    onImageGenerate(payload); // Pass the updated payload to the parent (ImageGeneratorPage)
  };

  // Function to handle image generation
  const handleGeneratedAudio = (payload) => {
    onAudioGenerate(payload); // Pass the updated payload to the parent (AudioGeneratorPage)
  };
  const handleRecordingChange= (isRecording) => {
    onIsRecordingChange(isRecording);
    
  }
  return (
    <>
    <div className="rbt-static-bar ">
        {/* Conditionally render Form based on pageType */}

        <Form 
          onGeneratedText={handleGeneratedText}
          onGeneratedImage={handleGeneratedImage}
          onGeneratedAudio={handleGeneratedAudio}
          onRecordingChange={handleRecordingChange}
          type={pageType}
        />
        
      
      <p className="warningtext" style={{margin: "10px 0 0 0"}}>
          QUIC might showcase information that is either inaccurate or offensive
      </p>
      </div>
     
    </> 
  );
};

export default StaticbarDashboard;
