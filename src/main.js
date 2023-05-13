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

    const chatGptReply = await sendMessageToChatGPT(message, 'chatProfile');
    const chatGptMessage = document.createElement('div');
    chatGptMessage.classList.add('message', 'chatgpt');
    chatGptMessage.textContent = chatGptReply;
    chatContainer.appendChild(chatGptMessage);

    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
});
