const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

async function sendMessageToChatGPT(message, chatProfile) {
  const url = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await axios.post(
      url,
      {
        model: 'gpt-3.5-turbo-0301',
        messages: [
          { role: 'system', content: 'You are ChatGPT' },
          { role: 'user', content: message }
        ],
        chatProfile
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`
        }
      }
    );

    const { choices } = response.data;
    const chatGptReply = choices[0].message.content;
    return chatGptReply;
  } catch (error) {
    console.error('Error sending message to ChatGPT:', error.response.data);
    throw error;
  }
}

app.post('/api/send-message', async (req, res) => {
  const { message, chatProfile } = req.body;
  const chatGptReply = await sendMessageToChatGPT(message, chatProfile);
  res.json({ reply: chatGptReply });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
