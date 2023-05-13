const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatContainer = document.getElementById('chat-container');

sendButton.addEventListener('click', async () => {
  const message = userInput.value.trim();
  if (message !== '') {
    userInput.value = '';

    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user');
    userMessage.textContent = message;
    chatContainer.appendChild(userMessage);

    try {
      const chatGptReply = await sendMessageToChatGPT(message, 'chatProfile');
      const chatGptMessage = document.createElement('div');
      chatGptMessage.classList.add('message', 'chatgpt');
      chatGptMessage.textContent = chatGptReply;
      chatContainer.appendChild(chatGptMessage);
    } catch (error) {
      console.error('Error sending message to ChatGPT:', error);
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('message', 'error');
      errorMessage.textContent = 'Failed to retrieve response from ChatGPT.';
      chatContainer.appendChild(errorMessage);
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
});

async function sendMessageToChatGPT(message, chatProfile) {
  const url = 'http://localhost:3000/api/send-message'; // Update the URL

  try {
    const response = await axios.post(
      url,
      {
        message,
        chatProfile
      }
    );

    return response.data.reply;
  } catch (error) {
    console.error('Error sending message to ChatGPT:', error);
    throw error;
  }
}
