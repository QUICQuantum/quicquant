// pages/api/generate-image.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Store your API key in an environment variable
});

export default async function handler(req, res) {
    console.log("Generating image..");
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;

      // Make a request to the image generation API (this is a hypothetical endpoint)
      const response = await openai.images.generate({
        prompt: prompt,
        n: 1, // Number of images to generate
        size: "512x512", // Image size
      });

      const imageUrl = response.data[0].url;
      console.log("Image generated.");
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' }); // Handle non-POST requests
  }
}
