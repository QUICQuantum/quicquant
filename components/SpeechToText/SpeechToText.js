import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import pako from 'pako';
import UserImage from "../../public/images/team/user.png";
import LoadingGif from "../../public/images/icons/loader-one.gif";
import GPTAvatar from "../../public/images/team/gpt.png";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const SpeechToText = ({payload, isRecording}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [userVolume, setUserVolume] = useState(0);
  const [aiVolume, setAIVolume] = useState(0);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isWaitingToSend, setIsWaitingToSend] = useState(false);
  const pageId = "autio-generator"; // Unique identifier for this page
  const [showGreeting, setShowGreeting] = useState(false); // Flag to check if greeting is shown

  const playAudio = async (audioData, audioMimeType, fallbackText) => {
    try {
      console.log("Attempting to play audio, length:", audioData.length);

      // Convert base64 to ArrayBuffer
      const binaryString = atob(audioData);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      console.log("Converted to Uint8Array, length:", bytes.length);
      console.log("First 20 bytes:", bytes.slice(0, 20));
      console.log("Last 20 bytes:", bytes.slice(-20));

      // Convert PCM to WAV
      const wavBuffer = createWavFromPcm(bytes);

      // Create blob and URL
      const blob = new Blob([wavBuffer], { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);

      // Create audio element and play
      const audio = new Audio(audioUrl);
      
      audio.oncanplay = () => {
        console.log('Audio can be played');
        audio.play().catch(e => console.error('Error playing audio:', e));
      };

      audio.onended = () => {
        console.log('Audio playback finished');
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = (e) => {
        console.error('Audio error:', e);
        // Fallback to speech synthesis
        const utterance = new SpeechSynthesisUtterance(fallbackText);
        window.speechSynthesis.speak(utterance);
      };

    } catch (error) {
      console.error('Error setting up audio playback:', error);
      // Fallback: Use browser's built-in speech synthesis
      const utterance = new SpeechSynthesisUtterance(fallbackText);
      window.speechSynthesis.speak(utterance);
    }
  };

  function createWavFromPcm(pcmData) {
    const numChannels = 1; // Mono
    const sampleRate = 24000; // Assuming 24kHz sample rate, adjust if needed
    const bitsPerSample = 16; // Assuming 16-bit PCM, adjust if needed

    const wavHeader = new ArrayBuffer(44);
    const view = new DataView(wavHeader);

    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + pcmData.length, true);
    writeString(view, 8, 'WAVE');

    // fmt sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, 1, true); // AudioFormat (PCM)
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true); // ByteRate
    view.setUint16(32, numChannels * (bitsPerSample / 8), true); // BlockAlign
    view.setUint16(34, bitsPerSample, true);

    // data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, pcmData.length, true);

    // Combine header and PCM data
    const wavBuffer = new Uint8Array(wavHeader.byteLength + pcmData.length);
    wavBuffer.set(new Uint8Array(wavHeader), 0);
    wavBuffer.set(pcmData, wavHeader.byteLength);

    return wavBuffer.buffer;
  }

  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  const startRecording = async () => {
    try {
      console.log("Starting recording...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks = [];

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const updateVolume = () => {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        const volume = dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        setUserVolume(volume);
        if (isRecording) {
          animationFrameRef.current = requestAnimationFrame(updateVolume);
        }
      };

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const newaudioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(newaudioBlob);
        console.log(newaudioBlob);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        setUserVolume(0);
      };

      mediaRecorder.start();
      setIsWaitingToSend(false);
      updateVolume();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      // Only run stopRecording and sendAudioMessage if currently recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      stopRecording();
    }
    }
  }, [isRecording]);

  useEffect(() => {
    if (audioBlob) {
      // Only call sendAudioMessage after the audioBlob has been updated
      sendAudioMessage();
      setMessages((prevMessages) => [...prevMessages, { type: 'user', url: URL.createObjectURL(audioBlob) }]);
    }
  }, [audioBlob]);  // Trigger this effect when audioBlob changes
  

  const sendAudioMessage = async () => {
    if (audioBlob) {
      setIsLoading(true);
      try {
        console.time('audioProcessing');
        console.log('Starting audio processing');
        const arrayBuffer = await audioBlob.arrayBuffer();
        console.log('ArrayBuffer created, size:', arrayBuffer.byteLength);

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('AudioContext created');

        console.time('decodeAudioData');
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        console.timeEnd('decodeAudioData');
        console.log('Audio decoded, duration:', audioBuffer.duration);

        const channelData = audioBuffer.getChannelData(0);
        console.log('Channel data extracted, length:', channelData.length);

        console.time('base64Encode');
        const base64AudioData = base64EncodeAudio(channelData);
        console.timeEnd('base64Encode');
        console.log('Audio data encoded to base64, length:', base64AudioData.length);

        console.time('compression');
        const compressedData = pako.deflate(base64AudioData);
        console.timeEnd('compression');
        console.log('Data compressed, size:', compressedData.length);

        console.time('compressedBase64');
        const compressedBase64 = btoa(new Uint8Array(compressedData).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        console.timeEnd('compressedBase64');
        console.log('Compressed data encoded to base64, length:', compressedBase64.length);

        console.timeEnd('audioProcessing');
        console.log('Audio processing completed, sending to server');

        console.time('serverRequest');
        await sendMessage(compressedBase64, true);
        console.timeEnd('serverRequest');
      } catch (error) {
        console.error('Error processing audio:', error);
        let errorMessage = 'An error occurred while processing the audio';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setMessages((prevMessages) => [...prevMessages, { type: 'gpt', content: `Error: ${errorMessage}` }]);
      } finally {
        setIsLoading(false);
        setAudioBlob(null);
        setIsWaitingToSend(false);
      }
    } else {
      console.warn('No audio blob available to send');
      setIsWaitingToSend(false);
    }
  };

  function floatTo16BitPCM(float32Array) {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    let offset = 0;
    for (let i = 0; i < float32Array.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return buffer;
  }

  function base64EncodeAudio(float32Array) {
    const buffer = floatTo16BitPCM(float32Array);
    return btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  }

  const sendMessage = async (content, isAudio = false) => {
    setIsLoading(true);
    try {
      console.time('apiRequest');
      console.log('Sending request to API');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: isAudio ? undefined : content,
          audioData: isAudio ? content : undefined,
          isCompressed: isAudio
        }),
      });
      console.timeEnd('apiRequest');
      console.log('API response received');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.time('jsonParse');
      const data = await response.json();
      console.timeEnd('jsonParse');
      console.log('Response data parsed');

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("Received data:", {
        responseLength: data.response.length,
        audioDataLength: data.audioData ? data.audioData.length : 0,
        audioMimeType: data.audioMimeType
      });
      
      
      if (data.audioData && data.audioMimeType) {
        console.log("Audio data received, length:", data.audioData.length);
        setIsAISpeaking(true);
        simulateAISpeaking();
        console.time('audioPlayback');
        await playAudio(data.audioData, data.audioMimeType, data.response);
        console.timeEnd('audioPlayback');
        setIsAISpeaking(false);
        
      
        console.log(data.transcript, data.transcript.length);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: 'gpt',
            content: data.transcript // or apply any further logic here, like checking for null content
          }
        ]);
      } else {
        console.warn('No audio data received');
        setMessages((prevMessages) => [...prevMessages, { type: 'error', content: 'No audio data received' }]);
      }
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'An unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      setMessages((prevMessages) => [...prevMessages, { type: 'error', content: `Error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const simulateAISpeaking = () => {
    let frame = 0;
    const animate = () => {
      frame++;
      const volume = Math.sin(frame / 5) * 50 + 50; // Oscillate between 0 and 100
      setAIVolume(volume);
      if (isAISpeaking) {
        requestAnimationFrame(animate);
      } else {
        setAIVolume(0);
      }
    };
    animate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
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

  useEffect(() => {
    console.log('Messages updated:', messages);
  }, [messages]);
  useEffect(() => {
    if (payload.length > 0) {
      // Filter out any duplicates already in messages
      const newMessages = payload.filter(
        (newMessage) =>
          !messages.some((existingMessage) => existingMessage.content === newMessage.content)
      );
  
      console.log('Payload:', payload);
console.log('Messages:', messages);

      // If there are new, unique messages, convert payload to a string and send
      if (newMessages.length > 0) {
        // Convert the payload to a single string
        const payloadAsString = newMessages.map(msg => msg.content).join(' ');
    setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        // Send the concatenated string to sendMessage
        sendMessage(payloadAsString);
      }
    }
  }, [payload]); // Re-run the effect whenever the payload changes


  // Check if messages are empty, and if so, show greeting
    useEffect(() => {
      if (messages.length === 0) {
        setShowGreeting(true);
      } else {
        setShowGreeting(false);
      }
    }, [messages]);

  return (
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
            <h1 className="prompt-heading">AUDIO</h1>
            <Image className="w-100" src={"/images/icons/ChatCenteredDots.svg"} width={40} height={40} alt="User Avatar" />
            <h2 className="prompt-heading">Try this prompt</h2>
            <nav className="prompt-list">
              <div className="prompt-item">
                <span className="prompt-text">How will quantum computing affect everyday life?</span>
                <i className="ti ti-arrow-right" aria-hidden="true"></i>
              </div>
              <div className="prompt-item">
                <span className="prompt-text">What is quantum error correction and why is it needed?</span>
                <i className="ti ti-arrow-right" aria-hidden="true"></i>
              </div>
              <div className="prompt-item">
                <span className="prompt-text">How far are we from functional quantum computers?</span>
                <i className="ti ti-arrow-right" aria-hidden="true"></i>
              </div>
            </nav>
          </section>
          </motion.div>
        )}
        {messages.map((message, index) => (
          <motion.div
          className="inner text-center h-100"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div key={index}  className={`chat-box ${message.type === "gpt" ? "gpt-message" : message.type === "error" ? "Red p-3 w-50 mx-auto" : "user-message"}`}>
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
                  <p className="mb--20">{message.content}</p>
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
          {isLoading && <div className="text-center"><p>Processing...</p></div>}
    </div>
  );
};

export default SpeechToText;
