import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import sal from "sal.js";
import TopBar from "../Common/TopBar";
import { motion, AnimatePresence } from "framer-motion";

// Image imports
import UserImage from "../../public/images/team/user.png";
import LoadingGif from "../../public/images/icons/loader-one.gif";
import GPTAvatar from "../../public/images/team/gpt.png";

const ImageGenerator = ({ payload, isLoading }) => {
  const [messages, setMessages] = useState([]);
  const pageId = "autio-generator"; // Unique identifier for this page
    const [showGreeting, setShowGreeting] = useState(true); // Flag to check if greeting is shown

  const isMounted = useRef(true);

  // Update messages whenever payload changes, avoiding duplicates
  useEffect(() => {
    if (payload.length > 0 && isMounted.current) {
      // Filter out any duplicates already in messages
      const newMessages = payload.filter(
        (newMessage) =>
          !messages.some(
            (existingMessage) =>
              existingMessage.type === newMessage.type &&
              (newMessage.type === "image"
                ? existingMessage.url === newMessage.url
                : existingMessage.content === newMessage.content)
          )
      );

      // If there are new, unique messages, append them
      if (newMessages.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      }
    }
  }, [payload]);

  useEffect(() => {
    sal(); // Initialize sal.js (if needed)

    return () => {
      isMounted.current = false; // Set to false when component is unmounted
    };
  }, []);

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
          // Save only messages from the current page
          const allMessages = JSON.parse(sessionStorage.getItem("messages") || "[]");
          const filteredMessages = allMessages.filter((msg) => msg.pageId !== pageId);
          sessionStorage.setItem("messages", JSON.stringify([...filteredMessages, ...messages]));
        }
      }, [messages]);

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
            <h1 className="prompt-heading">IMAGE</h1>
            <Image className="w-100" src={"/images/icons/ChatCenteredDots.svg"} width={40} height={40} alt="User Avatar" />
            <h2 className="prompt-heading">Try this prompt</h2>
            <nav className="prompt-list">
              <div className="prompt-item">
                <span className="prompt-text">Visualize quantum entanglement between two particles.</span>
                <i className="ti ti-arrow-right" aria-hidden="true"></i>
              </div>
              <div className="prompt-item">
                <span className="prompt-text">Illustrate the key components of a quantum computer.</span>
                <i className="ti ti-arrow-right" aria-hidden="true"></i>
              </div>
              <div className="prompt-item">
                <span className="prompt-text">Show a qubit in superposition of multiple states.</span>
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
                    src={message.source === "gpt" ? GPTAvatar : UserImage}
                    width={40}
                    height={40}
                    alt={message.source === "gpt" ? "GPT Avatar" : "User Avatar"}
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
                  {message.type === "image" ? (
                    <div className="img-box xl-size mb--20">
                      <Image
                        className="radius"
                        src={message.url}
                        width={522}
                        height={408}
                        alt="Generated Image"
                      />
                      <a
                        href={message.url}
                        download="generated-image.png" // Suggested filename
                        className="download-btn btn-default btn-small bg-solid-primary"
                      >
                        <i className="fa-sharp fa-regular fa-download"></i>
                        <span>Download</span>
                      </a>
                    </div>
                  ) : (
                    <p className="mb--20">{message.content}</p>
                  )}
                  {isLoading && message.source === "gpt" && (
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
    </>
  );
};

export default ImageGenerator;
