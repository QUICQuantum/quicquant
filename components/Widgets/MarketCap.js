import React, { useEffect, useState, useRef } from "react";

const MarketCap = ({ symbols }) => {
  const [loading, setLoading] = useState(true);
  const [totalMarketCap, setTotalMarketCap] = useState(null);
  const hasFetchedData = useRef(false); // Ref to track data fetching

  useEffect(() => {
    if (hasFetchedData.current) {
      console.log("Data has already been fetched.");
      return;
    }

    if (!symbols || symbols.length === 0) return;

    const fetchMarketCapData = async () => {
      try {
        console.log("Fetching market cap data...");
        const response = await fetch("/api/quote", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ symbols, type: "marketCap" }),
        });

        const data = await response.json();

        // Calculate total market cap
        let totalMarketCapValue = 0;
        data.forEach((item) => {
          if (item.marketCap) {
            totalMarketCapValue += parseFloat(item.marketCap);
          }
        });

        setTotalMarketCap(new Intl.NumberFormat().format(totalMarketCapValue) + "$");
        hasFetchedData.current = true; // Mark data as fetched
      } catch (error) {
        console.error("Error fetching market cap data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketCapData();
  }, [symbols]);



  return (
    <div>
      <div
        style={{
          padding: "20px",
          borderBottom: '5px solid rgba(192, 143, 253, 0.48)',
          textAlign: "center",
          maxWidth: "850px",
          margin: "0 auto",
          marginBottom: "30px",
          marginTop: "-30px",
          textTransform: "uppercase",
          letterSpacing: "3px",
          borderRadius: "50px",
          boxShadow: " 0px 15px 21px 0px #201947",
          background: "rgb(2 8 31)"
        }}
      >
        <h3 className="theme-gradient-newndefaultsize">Quantum Stocks ○ Total Market Capitalization</h3>
        <h1

        >
          {loading ? (
            <span>...</span>
          ) : (
            <span style={{
              fontWeight: "bold",
              margin: "10px 0",
              color: '#C18FFD',
              fontFamily: 'monospace'
            }}
              className="theme-gradient-lighterdark" >
              {totalMarketCap}
            </span>
          )}
        </h1>
      </div>
    </div>
  );
};

export default MarketCap;
