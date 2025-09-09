import React, { useEffect, useRef } from "react";
import { useAppContext } from "@/context/Context";

const MarketQuotesWidget = ({ symbols }) => {
  const { isLightTheme } = useAppContext();
  const theme = isLightTheme ? 'dark' : 'light'; // Set theme based on context value
  const container = useRef(null);

  useEffect(() => {
    // Function to clean up previous widget
    const cleanUpWidget = () => {
      const widgetContainer = container.current;
      // Remove any previously loaded scripts
      const existingScript = document.querySelector(
        "script[src='https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js']"
      );
      if (existingScript) {
        existingScript.remove();
      }
      // Clear the widget container to prevent duplicates
      if (widgetContainer) {
        widgetContainer.innerHTML = '';
      }
    };

    // Call cleanup before adding new widget
    cleanUpWidget();

    // Add TradingView Widget script
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
    script.async = true;

    // Pass the correct settings dynamically
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 500,
      symbolsGroups: [
        {
          name: "Quantum Companies",
          originalName: "Quantum Companies",
          symbols: symbols.map((symbol) => ({ name: symbol })), // Add the symbols dynamically
        },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      colorTheme: theme, // Dynamically set colorTheme based on the current theme
      locale: "en",
    });

    // Append the script to the container after cleaning
    if (container.current) {
      container.current.appendChild(script);
    }
  }, [symbols, theme]); // Re-run the effect when symbols or theme change

  return (
    <div className="row">
      <div className="col-lg-12">
        {/* TradingView Widget */}
        <div
          className="tradingview-widget-container"
          ref={container}
          id="tradingview-widget-container"
        >
          <div className="tradingview-widget-container__widget"></div>
        </div>
      </div>
    </div>
  );
};

export default MarketQuotesWidget;
