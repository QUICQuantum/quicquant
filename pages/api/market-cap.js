// pages/api/chatgpt.js
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
        console.log("Received POST request to /api/market-cap", req.body);
        const { symbols } = req.body; // Expect an array of symbols in the request body
        if (!Array.isArray(symbols) || symbols.length === 0) {
            return res.status(400).json({ error: "Invalid symbols array" });
        }

        const marketCapData = await Promise.all(
            symbols.map(async (symbol) => {
            try {
                // Remove the exchange prefix (e.g., "NASDAQ:", "NYSE:", etc.)
                const symbolWithoutPrefix = symbol.split(":").pop();

                // Fetch market data from Yahoo Finance using the cleaned symbol
                const data = await yahooFinance.quote(symbolWithoutPrefix);
                return { symbol, marketCap: data.marketCap || "N/A" };
            } catch (error) {
                console.error(`Error fetching data for ${symbol}:`, error.message);
                return { symbol, marketCap: "Error fetching data" };
            }
            })
        );

        res.json(marketCapData);
        } catch (error) {
        console.error("Error in /api/market-cap:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
        }
    }
}