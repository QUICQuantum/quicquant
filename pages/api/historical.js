import yahooFinance from "yahoo-finance2";
import { RSI, SMA, EMA, MACD, ADX } from 'technicalindicators';

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { selectedSymbol, interval } = req.body;
      if (!selectedSymbol || typeof selectedSymbol !== "string") {
        return res.status(400).json({ error: "Invalid symbol" });
      }

      // Set period1 to 12 months before the current date
      const currentDate = new Date();
      const period1 = new Date(currentDate.setMonth(currentDate.getMonth() - 100)).toISOString().split('T')[0];
      const period2 = new Date().toISOString().split('T')[0];

      // Declare symbolWithoutPrefix outside the try block so it's accessible in catch as well
      const symbolWithoutPrefix = selectedSymbol.split(":").pop();

      try {
        // Fetch historical data
        const historical = await yahooFinance.historical(symbolWithoutPrefix, {
          period1,
          period2,
          interval: '1d'
        });

        // Extract closing prices
        const closingPrices = historical.map(data => data.close);

        // Calculate indicators
        const rsiValues = RSI.calculate({ period: 14, values: closingPrices });
        const smaValues = SMA.calculate({ period: 50, values: closingPrices });
        const emaValues = EMA.calculate({ period: 50, values: closingPrices });
        const macdValues = MACD.calculate({ 
          values: closingPrices, 
          fastPeriod: 12, 
          slowPeriod: 26, 
          signalPeriod: 9 
        });
        const adxValues = ADX.calculate({ 
          period: 14, 
          high: historical.map(data => data.high), 
          low: historical.map(data => data.low), 
          close: closingPrices 
        });

        // Extract the latest values
        const latestRSI = rsiValues.length > 0 ? rsiValues[rsiValues.length - 1] : null;
        const latestSMA = smaValues.length > 0 ? smaValues[smaValues.length - 1] : null;
        const latestEMA = emaValues.length > 0 ? emaValues[emaValues.length - 1] : null;
        const latestMACD = macdValues.length > 0 ? macdValues[macdValues.length - 1].histogram : null;
        const latestADX = adxValues.length > 0 ? adxValues[adxValues.length - 1] : null;

        console.log("MACD:", latestMACD);

        // Predictions
        let rsiPrediction = latestRSI > 70 ? "Bearish" : latestRSI < 30 ? "Bullish" : "Neutral";
        let smaPrediction = closingPrices[closingPrices.length - 1] > latestSMA ? "Bullish" : "Bearish";
        let emaPrediction = closingPrices[closingPrices.length - 1] > latestEMA ? "Bullish" : "Bearish";
        let macdPrediction = latestMACD > 0.05 ? "Bullish" : latestMACD < -0.05 ? "Bearish" : "Neutral";
        let adxPrediction = latestADX > 25 ? (macdPrediction === "Bullish" ? "Bullish" : "Bearish") : "Neutral";

        // Determine final prediction
        const predictions = [rsiPrediction, smaPrediction, emaPrediction, macdPrediction, adxPrediction];
        const bullishCount = predictions.filter(p => p === "Bullish").length;
        const bearishCount = predictions.filter(p => p === "Bearish").length;

        let finalPrediction = "Neutral";
        if (bullishCount > bearishCount) {
          finalPrediction = "Bullish";
        } else if (bearishCount > bullishCount) {
          finalPrediction = "Bearish";
        }

        let predictionStrength = finalPrediction;
        if (bullishCount === 5) predictionStrength = "Very Strong Bullish";
        else if (bearishCount === 5) predictionStrength = "Very Strong Bearish";
        else if (bullishCount > bearishCount + 1) predictionStrength = "Strong Bullish";
        else if (bearishCount > bullishCount + 1) predictionStrength = "Strong Bearish";

        // Ensure latestADX is valid before calling toFixed
        const formattedADX = isNaN(latestADX) ? 0 : latestADX.toFixed(2);   

        // Generate trading advice
        const [advice, subadvice] = getTradingAdvice(finalPrediction, rsiPrediction, smaPrediction, emaPrediction, macdPrediction, adxPrediction);

        // Create statements
        const statements = {
          stockName: symbolWithoutPrefix,
          rsiStatement: `The RSI is currently at ${latestRSI?.toFixed(2)}, indicating the stock is ${rsiPrediction}.`,
          smaStatement: `The current price is ${closingPrices[closingPrices.length - 1]} which is ${smaPrediction} compared to the 50-day SMA.`,
          emaStatement: `The current price is ${closingPrices[closingPrices.length - 1]} which is ${emaPrediction} compared to the 50-day EMA.`,
          macdStatement: `The MACD histogram is currently at ${latestMACD?.toFixed(2)}, indicating a ${macdPrediction} trend.`,
          adxStatement: `The ADX is ${formattedADX}, indicating a ${adxPrediction} market condition.`,
          finalPredictionStatement: `Future Prediction for ${symbolWithoutPrefix} is ${predictionStrength} (${finalPrediction}).`,
          tradingAdvice: advice,
          tradingSubAdvice: subadvice
        };

        res.json({ selectedSymbol, statements, mode: finalPrediction });

      } catch (error) {
        console.error(`Error fetching data for ${symbolWithoutPrefix}:`, error.message);
        return res.status(500).json({ error: `Error fetching data for ${selectedSymbol}` });
      }
    } catch (error) {
      console.error("Error in /api/historical:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}


function getTradingAdvice(finalPrediction, rsiPrediction, smaPrediction, emaPrediction, macdPrediction, adxPrediction) {
  let advice = "Hold position.";
  let subadvice = [];

  if (finalPrediction === "Bullish") {
    advice = "It is a good time to buy more.";
    if (rsiPrediction === "Bullish") subadvice.push("RSI suggests the stock is oversold and may rise.");
    if (macdPrediction === "Bullish") subadvice.push("MACD confirms a positive trend.");
    if (adxPrediction === "Bullish") subadvice.push("ADX confirms strong momentum, supporting an uptrend.");
    if (smaPrediction === "Bullish") subadvice.push("SMA indicates a stable upward movement.");
    if (emaPrediction === "Bullish") subadvice.push("EMA shows recent price action is favoring an uptrend.");
  } else if (finalPrediction === "Bearish") {
    advice = "It is a good time to sell.";
    if (rsiPrediction === "Bearish") subadvice.push("RSI indicates the stock is overbought and may decrease.");
    if (macdPrediction === "Bearish") subadvice.push("MACD suggests a downward trend.");
    if (adxPrediction === "Bearish") subadvice.push("ADX confirms strong bearish momentum.");
    if (smaPrediction === "Bearish") subadvice.push("SMA suggests a long-term downtrend.");
    if (emaPrediction === "Bearish") subadvice.push("EMA indicates recent selling pressure is increasing.");
  } else {
    advice = "Hold position and wait for clearer signals.";
    if (rsiPrediction === "Neutral") subadvice.push("RSI is neutral, indicating no strong buying or selling pressure.");
    if (macdPrediction === "Neutral") subadvice.push("MACD is showing no clear trend.");
    if (smaPrediction === "Neutral") subadvice.push("SMA does not indicate a significant trend shift.");
    if (emaPrediction === "Neutral") subadvice.push("EMA confirms the market is lacking direction.");
  }

  return [advice, subadvice.join("\n")];
}

