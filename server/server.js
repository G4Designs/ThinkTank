const express = require('express');
const app = express();
const port = 3000; // Change this port number if needed
const axios = require('axios');
const apiKey = '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';


async function sendMessageToChatGPT(message, chatProfile) {
    const url = 'https://api.openai.com/v1/chat/completions';
  
    try {
      const response = await axios.post(url, {
        model: 'gpt-4.0-turbo', // Change this to the desired model
        messages: [
          {
            role: 'system',
            content: 'You are ChatGPT,' // Initial system message
          },
          {
            role: 'user',
            content: message // User message
          }
        ],
        chatProfile: chatProfile // Pass the chat profile as a parameter
      }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
          }          
      });
  
      const { choices } = response.data;
      const chatGptReply = choices[0].message.content; // Extract the reply from the response
      return chatGptReply;
    } catch (error) {
        console.error('Error sending message to ChatGPT:', error.response.data);
        throw error;
      }
      
  }
  

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
