import yahooFinance from "yahoo-finance2";
// pages/api/chatgpt.js
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            console.log("Received POST request to /api/quote", req.body);
            const { symbols, type } = req.body; // Expect an array of symbols and a 'type' (either 'stockName' or 'marketCap') in the request body

            if (!Array.isArray(symbols) || symbols.length === 0) {
                return res.status(400).json({ error: "Invalid symbols array" });
            }

            if (type !== "stockName" && type !== "marketCap") {
                return res.status(400).json({ error: "Invalid 'type' parameter, expected 'stockName' or 'marketCap'" });
            }

            const stockData = await Promise.all(
                symbols.map(async (symbol) => {
                    try {
                        // Remove the exchange prefix (e.g., "NASDAQ:", "NYSE:", etc.)
                        const symbolWithoutPrefix = symbol.split(":").pop();

                        // Fetch stock data from Yahoo Finance using the cleaned symbol
                        const data = await yahooFinance.quote(symbolWithoutPrefix);

                        // Return the appropriate data based on 'type' parameter
                        if (type === "stockName") {
                            return { symbol, stockName: data.longName || "N/A" };
                        } else {
                            return { symbol, marketCap: data.marketCap || "N/A" };
                        }
                    } catch (error) {
                        console.error(`Error fetching data for ${symbol}:`, error.message);
                        return { symbol, [type]: "Error fetching data" };  // Return appropriate data field based on 'type'
                    }
                })
            );

            res.json(stockData);
        } catch (error) {
            console.error("Error in /api/quote:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" }); // If method is not POST, return 405
    }
}
