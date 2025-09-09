import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Form = ({ onGeneratedText, onGeneratedImage, onGeneratedAudio, type, onRecordingChange }) => {
  const [message, setMessage] = useState(""); // State for user input
  const [loading, setLoading] = useState(false); // Loading state
  const [isRecording, setIsRecording] = useState(false); // State for recording status
  // Handle user input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle form submission (send message to API)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (message.trim()) {
      // Append user message to conversation immediately
      const userPayload = { type: "user", content: message };
      setMessage(""); // Clear input field
      setLoading(true); // Show loading indicator
      if (type === "text") {
        onGeneratedText([userPayload]);
      } else if (type === "image") {
        onGeneratedImage([userPayload]);
      } else if (type === "audio") {
        onGeneratedAudio([userPayload]);
        return;
      }

      
      try {
        let apiUrl = "/api/chatgpt";
        let payload = { message };

        if (type === "image") {
          apiUrl = "/api/image-generate"; // Adjust endpoint for image generation
          payload = { prompt: message };
        }

        // Send request to the appropriate API route
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        // Check if the request was successful
        if (res.ok) {
          const data = await res.json();

          if (type === "text") {
            // Append GPT response to conversation
            const gptPayload = { type: "gpt", content: data.response };
            onGeneratedText([gptPayload]);
          } else if (type === "image") {
            // Append generated image to conversation
            const imagePayload = { type: "image", url: data.imageUrl, source: "gpt" };
            onGeneratedImage([imagePayload]);
          } 
        } else {
          // Append error message to conversation
          const errorPayload = { type: "error", content: "Error fetching response from API" };
          if (type === "text") {
            onGeneratedText([errorPayload]);
          } else if (type === "image") {
            onGeneratedImage([errorPayload]);
          } else if (type === "audio") {
            onGeneratedAudio([errorPayload]);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        const errorPayload = { type: "error", content: "Error fetching response" };
        if (type === "text") {
          onGeneratedText([errorPayload]);
        } else if (type === "image") {
          onGeneratedImage([errorPayload]);
        }
      } finally {
        setLoading(false); // Hide loading indicator
      }
    }
  };

  // Handle Enter key press for form submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Handle microphone button click to toggle recording state
  const handleAudioButtonClick = () => {
    setIsRecording((prevState) => {
      const newRecordingState = !prevState; // Toggle the recording state
      onRecordingChange(newRecordingState); // Pass the updated state back to the parent
      return newRecordingState; // Update the state locally
    });
  };

  return (
    <>
      
      <Tooltip  id="my-tooltip" className="custom-tooltip tooltip-inner" />
      <motion.div
                          className="inner text-center h-100"
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1 }}
                        >
      <form className="d-flex" onSubmit={handleSubmit}>
      <div className="new-chat-form border-gradient" style={{flex: 10}} >
        <div>
        <textarea
          rows="1"
          placeholder="Send a message..."
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown} // Add keydown event listener
          style={{
    resize: 'none'}}
        ></textarea>

        <div className="right-icons">
          {type === "audio" && (
            <a
              className="form-icon icon-mic"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={
                isRecording ? "Stop recording" : "Start recording"
              }
              onClick={handleAudioButtonClick} // Call this function to toggle isRecording state
            >
              <i
                className={
                  isRecording
                    ? "fa-regular fa-square"
                    : "fa-regular fa-waveform-lines"
                }
              ></i>
            </a>
          )}

        
        </div>
        </div>
      </div>
      <button
            type="submit"
            className="form-icon icon-send"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Send message"
            style={{padding: 0, background: "#A47BF7", border: 'none', borderRadius: '50%', marginLeft: '10px', cursor: 'pointer', width: '52px', height: '52px'}}
          >
            <Image src="/images/icons/Send.svg" width='20' height='20' alt='YES'/>
          </button>
          </form>
      </motion.div>
      {loading && (
        <div className="loading-indicator">
          <i className="fa fa-spinner fa-spin"></i> Generating...
        </div>
      )}
    </>
  );
};

export default Form;
