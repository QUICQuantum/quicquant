import { useEffect, useState } from "react";
import { fetchLastUpdated } from "../../utils/lastupdated";

const BlogUpdateStatus = ({ isBlogDetails }) => {
  const [timeRemaining, setTimeRemaining] = useState(null); // Remaining time in seconds
  const [lastUpdated, setLastUpdated] = useState(null);
  const [nextUpdateTime, setNextUpdateTime] = useState(null);

  // Fetch the initial last updated timestamp from the API
  const fetchUpdateStatus = async () => {
    try {
      const data = await fetchLastUpdated();
      setLastUpdated(new Date(data).toISOString()); // Process the timestamp
    } catch (error) {
      console.error("Error in fetchUpdateStatus:", error);
    }
  };
  // Calculate the next update time (48 hours ahead)
  const calculateNextUpdateTime = () => {
    if (lastUpdated) {
      // Parse the lastUpdated timestamp as UTC
      const lastUpdatedDate = new Date(lastUpdated);
  
      // Calculate the next update in UTC
      const nextUpdate = new Date(
        Date.UTC(
          lastUpdatedDate.getUTCFullYear(),
          lastUpdatedDate.getUTCMonth(),
          lastUpdatedDate.getUTCDate(),
          lastUpdatedDate.getUTCHours(),
          lastUpdatedDate.getUTCMinutes(),
          lastUpdatedDate.getUTCSeconds()
        ) + 48 * 60 * 60 * 1000 // Add 48 hours in milliseconds
      );
      setNextUpdateTime(nextUpdate.toISOString()); // Store as ISO string
    }
  };
  

  useEffect(() => {
    // Fetch last updated timestamp when the component mounts
    fetchUpdateStatus();
  }, []);

  useEffect(() => {
    // Calculate the next update time after lastUpdated is set
    calculateNextUpdateTime();
    
  }, [lastUpdated]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (nextUpdateTime) {
        const now = new Date(); // Current time in local timezone
        const nextUpdateUTC = new Date(nextUpdateTime); // UTC Next Update Time
  
        // Adjust for your local timezone (UTC+5)
        const offsetInMilliseconds = 5 * 60 * 60 * 1000; // Add 5 hours
        const nextUpdateLocal = new Date(nextUpdateUTC.getTime() + offsetInMilliseconds);
  
        const diffInSeconds = Math.floor((nextUpdateLocal - now) / 1000); // Calculate difference in seconds
        setTimeRemaining(diffInSeconds > 0 ? diffInSeconds : 0); // Prevent negative values
      }
    }, 1000);
  
    return () => clearInterval(interval); // Cleanup interval
  }, [nextUpdateTime]);
  
  

  // Display the countdown in hours, minutes, and seconds
  const hours = timeRemaining !== null ? String(Math.floor(timeRemaining / 3600)).padStart(2, '0') : '--';
  const minutes = timeRemaining !== null ? String(Math.floor((timeRemaining % 3600) / 60)).padStart(2, '0') : '--';
  const seconds = timeRemaining !== null ? String(timeRemaining % 60).padStart(2, '0') : '--';

  return (
    <div className="text-center">
      <div className="container">
        <div className="inner text-center mt--140">
          <h1 className="heading-major-mob theme-gradient-dark" style={{ fontFamily: 'Outfit', fontSize: '50px', color: '#907EFF', fontWeight: '300', fontStyle: 'normal' }}>Next Reset In</h1>
        </div>  
        <div className="row theme-gradient-dark justify-content-center countdown-row">
          <>
            <div className={`${isBlogDetails ? 'col-lg-4 col-md-2' : 'col-lg-2 col-md-3 col-sm-4 '} countdown-item`}>
              <p style={{ fontSize: isBlogDetails ? '80px' : '100px', fontFamily: 'monospace' }}>{hours}</p>
              <p className="theme-blanktext time-label">Hours</p>
            </div>
            <div className={`${isBlogDetails ? 'col-lg-4 col-md-2' : 'col-lg-2 col-md-3 col-sm-4 '} countdown-item`}>
              <p style={{ fontSize: isBlogDetails ? '80px' : '100px', fontFamily: 'monospace' }}>{minutes}</p>
              <p className="theme-blanktext time-label">Minutes</p>
            </div>
            <div className={`${isBlogDetails ? 'col-lg-4 col-md-2' : 'col-lg-2 col-md-3 col-sm-4 '} countdown-item`}>
              <p style={{ fontSize: isBlogDetails ? '80px' : '100px', fontFamily: 'monospace' }}>{seconds}</p>
              <p className="theme-blanktext time-label">Seconds</p>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default BlogUpdateStatus;
