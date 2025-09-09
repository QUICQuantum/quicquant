import { useEffect, useState, useRef } from 'react';

const Loader = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(true);  // Always set to true so it plays on each reload
  const videoRef = useRef(null);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error trying to play the video:', error);
      });
    }
  }, [isPlaying]); // Only run this effect when isPlaying state changes
  

  const handleVideoEnd = () => {
    setIsPlaying(false); // Video ended, stop the loader
    onComplete(); // Notify the parent component that the video has finished
  };

  if (!isPlaying) return null;  // If isPlaying is false, return null (don't render the loader)

  return (
    <div className="video-loader">
  <video
    ref={videoRef}
    style={{
      zIndex: 99999,
      objectFit: 'cover',
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
    }}
    autoPlay
    muted
    playsInline
    onEnded={handleVideoEnd}
    className="video-fullscreen"
  >
    <source src="/videos/loader.webm" type="video/webm" />
    <source src="/videos/loader.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

  );
};

export default Loader;
