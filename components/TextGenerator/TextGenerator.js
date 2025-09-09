import React, { useState, useEffect } from "react";
import Image from "next/image";
import sal from "sal.js";
import TopBar from "../Common/TopBar";

// Image imports
import UserImage from "../../public/images/team/user.png";
import LoadingGif from "../../public/images/icons/loader-one.gif";
import GPTAvatar from "../../public/images/team/gpt.png";
import { motion, AnimatePresence } from "framer-motion";

const TextGenerator = ({ payload, isLoading }) => {
  const [messages, setMessages] = useState([]);
  const [showGreeting, setShowGreeting] = useState(true); // Flag to check if greeting is shown
  const pageId = "text-generator"; // Unique identifier for this page

  // Load messages from sessionStorage on component mount
  useEffect(() => {
    const savedMessages = sessionStorage.getItem("messages");
    
    if (savedMessages) {
      // Filter messages to include only those with the current pageId
      const parsedMessages = JSON.parse(savedMessages);
      const filteredMessages = parsedMessages.filter(
        (message) => message.pageId === pageId
      );
      setMessages(filteredMessages); // Load saved messages if available
    }
  }, []);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      // Get all saved messages from sessionStorage
      const allMessages = JSON.parse(sessionStorage.getItem("messages") || "[]");
  
      // Filter out messages from the current pageId before saving the new ones
      const filteredMessages = allMessages.filter((msg) => msg.pageId !== pageId);
  
      // Combine the existing messages with the new messages, ensuring each message has the correct pageId
      const updatedMessages = [...filteredMessages, ...messages.map(msg => ({ ...msg, pageId }))];
  
      // Save updated messages back to sessionStorage
      sessionStorage.setItem("messages", JSON.stringify(updatedMessages));
    }
  }, [messages]); // Re-run when messages or pageId change
  

  // Update messages whenever payload changes, avoiding duplicates
  useEffect(() => {
    if (payload.length > 0) {
      // Filter out any duplicates already in messages
      const newMessages = payload.filter(
        (newMessage) =>
          !messages.some((existingMessage) => existingMessage.content === newMessage.content)
      );
      // If there are new, unique messages, append them
      if (newMessages.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      }
    }
  }, [payload]); // Re-run the effect whenever the payload changes

  useEffect(() => {
    sal(); // Initialize sal.js (if needed)
  }, []);

  // Check if messages are empty, and if so, show greeting
  useEffect(() => {
    if (messages.length === 0) {
      setShowGreeting(true);
    } else {
      setShowGreeting(false);
    }
  }, [messages]);

  return (
    <>
      <div className="chat-box-list pb-0" id="chatContainer">
        {/* Show greeting message if it's the first interaction */}
        {showGreeting && (
          <motion.div
                          className="inner text-center h-100"
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1 }}
                        >
          <section className="start-guide">
            <h1 className="prompt-heading">TEXT</h1>
            <Image className="w-100" src={"/images/icons/ChatCenteredDots.svg"} width={40} height={40} alt="User Avatar" />
            <h2 className="prompt-heading">Try this prompt</h2>
            <nav className="prompt-list">
              <div className="prompt-item">
                <span className="prompt-text">Explain quantum computing in simple terms.</span>
                <i className="ti ti-arrow-right" aria-hidden="true"></i>
              </div>
              <div className="prompt-item">
                <span className="prompt-text">Summarize important quantum algorithms like Shor's and Grover's.</span>
                <i className="ti ti-arrow-right" aria-hidden="true"></i>
              </div>
              <div className="prompt-item">
                <span className="prompt-text">How do I make an HTTP request in javascript?</span>
                <i className="ti ti-arrow-right" aria-hidden="true"></i>
              </div>
            </nav>
          </section>
          </motion.div>
        )}

        {/* Loop through messages and display each one */}
        {messages.map((message, index) => (
          <motion.div
          className="inner text-center h-100"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div
            key={index}
            className={`chat-box ${message.type === "gpt" ? "gpt-message" : message.type === "error" ? "Red p-3 w-50 mx-auto" : "user-message"}`}
          >
            <div className="inner">
              <div
                className="chat-section"
                style={{
                  display: 'flex',
                  flexDirection: message.type === "gpt" ? 'row' : message.type === "error" ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  justifyContent: message.type === "error" ? 'center' : 'flex-start',
                }}
              >
                {/* Avatar section */}
                {message.type !== "error" && (
                  <div
                    className="author"
                    style={{
                      marginRight: message.type === "gpt" ? '15px' : '0',
                      marginLeft: message.type === "user" ? '15px' : '0',
                    }}
                  >
                    <Image
                      className="w-100"
                      src={message.type === "gpt" ? GPTAvatar : UserImage}
                      width={40}
                      height={40}
                      alt={message.type === "gpt" ? "GPT Avatar" : "User Avatar"}
                    />
                  </div>
                )}

                {/* Message content section */}
                <div
                  className={`chat-content ${message.type === "error" ? "error-content" : ""}`}
                  style={{
                    textAlign: message.type === "gpt" ? 'left' : message.type === "error" ? 'center' : 'right',
                  }}
                >
                  <h6 className="title">{message.type === "gpt" ? "Bot" : message.type === "error" ? "Error" : "You"}</h6>
                  <p>{message.content}</p>
                  {message.type === "gpt" && isLoading && (
                    <Image
                      className="loading-gif"
                      src={LoadingGif}
                      width={50}
                      height={50}
                      alt="Loading"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        ))}
      </div>

      <style jsx>{`
        .error-message {
          background-color: #ffdddd;
          border-left: 5px solid #f44336;
          margin-bottom: 10px;
          padding: 10px;
        }
        .error-content {
          color: #f44336;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default TextGenerator;
