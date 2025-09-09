// pages/api/stock-name.js

import { default as yahooFinance } from 'yahoo-finance2';

export default async function handler(req, res) {
  const { ticker } = req.query;

  if (!ticker) {
    return res.status(400).json({ error: 'Ticker symbol is required' });
  }

  try {
    const stock = await yahooFinance.quote(ticker);
    
    if (stock) {
      // Return the full name of the stock
      return res.status(200).json({ name: stock.longName });
    } else {
      return res.status(404).json({ error: 'Stock not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching stock data' });
  }
}
