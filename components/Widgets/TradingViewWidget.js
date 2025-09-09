import React, { useEffect, useRef, useState, memo } from 'react';
import { useAppContext } from "@/context/Context";
import Image from 'next/image';
import {motion} from 'framer-motion';

function TradingViewWidget({
  isHome = false,
  watchlist = [],
  interval = "d",
  width = "100%",
  height = 700
}) {
  const { isLightTheme } = useAppContext();
  const theme = isLightTheme ? 'dark' : 'light';
  const container = useRef(null);
  const [finalPrediction, setFinalPrediction] = useState(null);
  const [mode, setCurrentMode] = useState(null);
  const [tradingAdvice, setTradingAdvice] = useState(null);  // New state for trading advice
  const [tradingSubAdvice, setTradingSubAdvice] = useState(null);  // New state for trading advice
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState(watchlist.length > 0 ? watchlist[0] : "AAPL");
  const [logos, setLogos] = useState({}); // Store logos
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To toggle the custom dropdown
  const [stockNames, setStockNames] = useState({}); // Store stock names
  const token = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN; // Access environment variable

  const dropdownRef = useRef(null); // Reference to the dropdown element
  const dropdownButtonRef = useRef(null);

  const getClassName = () => {
    switch (mode) {
      case 'Bullish':
        return 'Green';
      case 'Bearish':
        return 'Red';
      case 'Neutral':
        return 'Yellow';
      default:
        return '';
    }
  };

  // Function to fetch stock name from quote API
  const fetchStockName = async (symbols) => {
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbols, type: "stockName" }), // Type "stockName" to get names
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stock names');
      }

      const data = await response.json();
      const stockNameData = {};
      data.forEach(item => {
        stockNameData[item.symbol] = item.stockName;
      });

      setStockNames(stockNameData); // Store stock names
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching stock names");
    }
  };

  // Fetch predictions
  const fetchPrediction = async (selectedSymbol, interval) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/historical", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedSymbol, interval }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch predictions');
      }

      const data = await response.json();
      // Extract the final prediction and trading advice from the response
      setFinalPrediction(data.statements.finalPredictionStatement);
      setCurrentMode(data.mode);
      setTradingAdvice(data.statements.tradingAdvice);
      setTradingSubAdvice(data.statements.tradingSubAdvice);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching predictions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSymbol) {
      fetchPrediction(selectedSymbol, interval);
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    // Clean up previous widget before appending new one
    if (container.current) {
      container.current.innerHTML = ''; // Clear any previous widget to avoid duplication
    }

    script.innerHTML = `{
      "autosize": true,
      "width": "${width}",
      "height": "${height}",
      "symbol": "${selectedSymbol}",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "${theme}",
      "style": "1",
      "locale": "en",
      "allow_symbol_change": true,
      "details": true,
      "studies": [
            "RSI@tv-basicstudies"
          ],
      "calendar": false,
      "support_host": "https://www.tradingview.com"
    }`;

    container.current.appendChild(script);

    // Fetch logos
    const fetchLogos = async () => {
      const logoData = {};
      for (const symbol of watchlist) {
        const symbolWithoutPrefix = symbol.split(":").pop();
        const logoUrl = `https://img.logo.dev/ticker/${symbolWithoutPrefix}?token=${token}`; // Replace with your public token
        try {
          const response = await fetch(logoUrl);
          if (response.ok) {
            logoData[symbol] = logoUrl;
          } else {
            logoData[symbol] = '/default-logo.png'; // Fallback logo
          }
        } catch (error) {
          logoData[symbol] = '/default-logo.png'; // Fallback logo if there’s an error
        }
      }
      setLogos(logoData);
    };

    fetchLogos();

    // Fetch stock names
    fetchStockName(watchlist); // Fetch stock names for the watchlist

  }, [selectedSymbol]); // Re-run when symbol or watchlist changes

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && dropdownRef.current.contains(event.target) || 
        dropdownButtonRef.current && dropdownButtonRef.current.contains(event.target) 
      ) {
        return; // Ignore clicks inside dropdown and on button
      }
      setIsDropdownOpen(false);
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  

  return (
    <div>
      <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }}>
        <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
      </div>

      {/* Custom Dropdown */}
<div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column-reverse' }}>
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={isDropdownOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    style={{
      position: 'absolute', background: '#262353', padding: '10px', borderRadius: '10px', marginBottom: '51px',
      zIndex: 9, width: 'auto', display: 'flex', flexDirection: 'column', maxHeight: '50%', overflow: 'auto',
      display: isDropdownOpen ? 'flex' : 'none'
    }}
    ref={dropdownRef} // Attach the ref to the dropdown
  >
    {watchlist.map((symbol, index) => (
      <div
        key={index}
        onClick={() => {
          setSelectedSymbol(symbol);
          setIsDropdownOpen(false);  // Close dropdown after selection
        }}
        style={{
          padding: '5px', margin: '5px', cursor: 'pointer', background: '#0E0C15', borderRadius: '5px',
          display: 'flex', alignItems: 'center', color: '#d1d4dc'
        }}
      >
        {logos[symbol] && (
          <Image
            src={logos[symbol]}
            alt={symbol}
            width={20}
            height={20}
            style={{ marginRight: '8px' }}
          />
        )}
        {stockNames[symbol] || symbol} {/* Show stock name or symbol if name is not available */}
      </div>
    ))}
  </motion.div>

  <div
  ref={dropdownButtonRef} // Attach ref to the button
  onClick={() => setIsDropdownOpen(prevState => !prevState)}
  style={{
    padding: '10px', fontSize: '16px', border: "2px solid #9A6FF8", borderRadius: '10px',
    background: '#0E0C15', color: 'white', cursor: 'pointer', display: 'inline-block',
    width: 'auto', display: 'flex', alignItems: 'center'
  }}
>
  {logos[selectedSymbol] && (
    <Image
      src={logos[selectedSymbol]}
      alt={selectedSymbol}
      width={20}
      height={20}
      style={{ marginRight: '8px' }}
    />
  )}
  {stockNames[selectedSymbol] || selectedSymbol}
</div>
</div>


      {/* Display predictions and trading advice */}
         
  <div className="prediction-result" style={{ marginTop: '20px', textAlign: 'center' }}>
    {loading ? (
      <p style={{ fontSize: '30px', fontWeight: "bolder" }}>Loading predictions...</p>
    ) : error ? (
      <p style={{ fontSize: '20px', fontWeight: "bolder" }}>{error}</p>
    ) : (
      <motion.div
      className="inner text-center h-100"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div>
        
        <p className={` ${getClassName()}`} style={{ fontSize: '30px', fontWeight: "bolder" }}>{tradingAdvice || "No advice available"}</p>
      {!isHome && (
        <div>
          <p style={{ fontSize: '25px', fontWeight: "bolder" }}>{finalPrediction || "No prediction available"}</p>
          <p className="theme-gradient" style={{ fontSize: '30px', fontWeight: "bolder", whiteSpace: "pre-line" }}>{tradingSubAdvice || "No advice available"}</p>
        </div>
      )}
      </div>
      </motion.div>
    )}
  </div>


    </div>
  );
}

export default memo(TradingViewWidget);
