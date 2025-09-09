import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Store your API key in an environment variable
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Extract user's message from request body
      const userMessage = req.body.message;

      // Make a request to OpenAI API
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // Use the desired model
        messages: [{ role: 'user', content: userMessage }],
      });

      // Extract and send response from OpenAI API
      const gptResponse = response.choices[0].message.content;
      res.status(200).json({ response: gptResponse });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' }); // Handle non-POST requests
  }
}
