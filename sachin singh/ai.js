const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = input.value.trim();
  if (userInput === "") return;

  appendMessage("user", userInput);
  input.value = "";

  // Call the bot (dummy or API)
  appendMessage("bot", "Thinking...");

  const botResponse = await getBotResponse(userInput);

  // Replace "Thinking..." with real response
  chatBox.lastChild.textContent = botResponse;
});

function appendMessage(sender, message) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = message;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Dummy response (replace with real API call)
async function getBotResponse(userInput) {
  // Simulate a delay
  await new Promise((res) => setTimeout(res, 1000));

  // Replace this with real OpenAI API call if desired
  return `You said: "${userInput}"`;
}
