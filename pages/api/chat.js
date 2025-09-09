const WebSocket = require('ws');
const pako = require('pako');

let ws = null;

function getWebSocket() {
  return new Promise((resolve, reject) => {
    console.time('websocketConnection');
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.timeEnd('websocketConnection');
      console.log('Using existing WebSocket connection');
      resolve(ws);
    } else {
      const url = "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01";
      ws = new WebSocket(url, {
        headers: {
          "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
          "OpenAI-Beta": "realtime=v1",
        },
      });

      ws.on('open', () => {
        console.timeEnd('websocketConnection');
        console.log("WebSocket connected");
        resolve(ws);
      });

      ws.on('error', (error) => {
        console.error("WebSocket error:", error);
        reject(error);
      });

      ws.on('close', () => {
        console.log("WebSocket closed");
        ws = null;
      });
    }
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.time('totalApiTime');
    const { message, audioData, isCompressed } = req.body;

    try {
      console.time('socketConnection');
      const socket = await getWebSocket();
      console.timeEnd('socketConnection');

      let response = '';
      let audioChunks = [];
      let isResponseComplete = false;
      let gpttranscript = '';
      console.time('audioDataProcessing');
      let processedAudioData = audioData;
      if (isCompressed) {
        console.time('decompression');
        const compressedData = Uint8Array.from(atob(audioData), c => c.charCodeAt(0));
        const decompressedData = pako.inflate(compressedData);
        processedAudioData = new TextDecoder().decode(decompressedData);
        console.timeEnd('decompression');
      }
      console.timeEnd('audioDataProcessing');

      const userEvent = {
        type: 'conversation.item.create',
        item: {
          type: 'message',
          role: 'user',
          content: processedAudioData
            ? [{ type: 'input_audio', audio: processedAudioData }]
            : [{ type: 'input_text', text: message }]
        }
      };
      const event = {
        type:'session.update',
        session: {
          input_audio_format: "pcm16",
        output_audio_format: "pcm16",
        input_audio_transcription: {
        model: 'whisper-1',
        },
        },
      }
      // Log the session details before sending
      console.log("Session Event:", JSON.stringify(event, null, 2));
      socket.se
      console.time('socketSend');
      socket.send(JSON.stringify(event));
      socket.send(JSON.stringify(userEvent));
      socket.send(JSON.stringify({ type: 'response.create' }));
      console.timeEnd('socketSend');

      console.time('aiResponseTime');
      
      await new Promise((resolve, reject) => {
        const messageHandler = (data) => {
          const parsedData = JSON.parse(data.toString());
          console.log("Received message type:", parsedData.type);
          
          if (parsedData.type === 'error') {
            console.error("API Error:", parsedData.error);
            reject(new Error(parsedData.error.message));
            return;
          }
          
          if (parsedData.type === 'conversation.item.create' && parsedData.item.role === 'user') {
            response += parsedData.item.content[0].text;
          }
          if (parsedData.type === 'response.audio.delta') {
            const chunk = Buffer.from(parsedData.delta, 'base64');
            audioChunks.push(chunk);
          }
          if (parsedData.type === 'response.audio_transcript.done') {
            gpttranscript = parsedData.transcript;
          }
          if (parsedData.type === 'response.done') {
            console.timeEnd('aiResponseTime');
            isResponseComplete = true;
            socket.removeListener('message', messageHandler);
            resolve();
          }
        };

        socket.on('message', messageHandler);
      });

      if (isResponseComplete) {
        const audioBuffer = Buffer.concat(audioChunks);
        console.log("Sending response:", response);
        console.log("Sending audio data, length:", audioBuffer.length);
        console.timeEnd('totalApiTime');
        res.status(200).json({ 
          transcript: gpttranscript,
          response: response,
          audioData: audioBuffer.toString('base64'),
          audioMimeType: determineAudioMimeType(audioBuffer)
        });
      } else {
        throw new Error('Response was not completed');
      }

    } catch (error) {
      console.error("Error in API handler:", error);
      res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function determineAudioMimeType(buffer) {
  const header = buffer.slice(0, 4).toString('hex');
  console.log("Audio header:", header);
  if (header.startsWith('fff3') || header.startsWith('fff2')) return 'audio/mpeg';
  if (header.startsWith('5249')) return 'audio/wav'; // "RIFF" in hex
  if (header.startsWith('4f676753')) return 'audio/ogg';
  if (header.startsWith('664c6143')) return 'audio/flac'; // "fLaC" in hex
  return 'audio/mp3'; // Default to MP3 if unknown
}
