let isUpdating = false; // Keep this state somewhere central if used in multiple files

export default function handler(req, res) {
  console.log('isUpdating:', isUpdating);
  res.status(200).json({ isUpdating });
}
