import FormData from 'form-data';
import Mailgun from 'mailgun.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    // Initialize Mailgun with the form data
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere', // Ensure the API key is set correctly in the environment
    });

    try {
        const emailRes = await mg.messages.create("sandbox58f0025928814861af169004836b7634.mailgun.org", {
            from: "Mailgun Sandbox <postmaster@sandbox58f0025928814861af169004836b7634.mailgun.org>",
            to: ["QUIC Quantum <quicquantum@gmail.com>"],
            subject: 'New Contact Form!',
    text: `Hello,

    You have a new form entry from: ${name} ${email}.

    ${message}
    `,
          });

      console.log('Email sent:', emailRes);
      // Send success response
      res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (err) {
      console.error('Error sending email:', err);
      res.status(500).json({ success: false, message: 'Error sending email', error: err.message });
    }
  } else {
    // If the request method is not POST, return Method Not Allowed
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
