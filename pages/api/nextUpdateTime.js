import fs from 'fs';
import path from 'path';

let nextUpdateTime = null;

function calculateNextUpdateTime() {
  const now = new Date();
  nextUpdateTime = new Date(now.getTime() + 48 * 60 * 60 * 1000); // Next update in 48 hours
}

export default function handler(req, res) {
  if (!nextUpdateTime) {
    calculateNextUpdateTime(); // Calculate next update time if it hasn't been calculated yet
  }
  console.log('nextUpdateTime:', nextUpdateTime);
  res.status(200).json({ nextUpdateTime });
}
