document.getElementById("chat-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const userInput = document.getElementById("user-input").value;
    if (userInput === "") return;

    addMessageToChat(userInput, "user");

    document.getElementById("user-input").value = "";

    const response = await sendMessageToAPI(userInput);

    addMessageToChat(response, "bot");
});

function addMessageToChat(message, sender) {
    const chatBox = document.getElementById("chat-box");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");

    messageDiv.innerText = message;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessageToAPI(userInput) {
    const apiKey = "sk-svcacct-XG-glgugRelR2_mYHVFqRZ_t3-hpbtcVZ8XkNsCxGbMc7GT3BlbkFJOZwcmhPiiVZsLxGM2HjCgTAXZCx4zZI0rp9EmQOIIcVVUA";  // Replace this with your OpenAI API key
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    };

    const body = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }],
    });

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: body,
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Error:", error);
        return "There was an error connecting to the API.";
    }
}
