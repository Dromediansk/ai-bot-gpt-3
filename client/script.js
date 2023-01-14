import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const submitButton = document.querySelector("#submit_button");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return `
      <div class="wrapper ${isAi && "ai"}">
        <div class="chat">
          <div class="profile">
            <img src="${isAi ? bot : user}" alt="${isAi ? "bot" : "user"}"/>
          </div>
          <div class="message" id=${uniqueId}>${value}</div>
        </div>
      </div>
    `;
}

async function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(form);
  const prompt = data.get("prompt");

  if (!prompt.trim()) {
    return;
  }

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, prompt);

  form.reset();
  submitButton.disabled = true;

  // bot's chatstripe
  const id = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", id);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(id);
  loader(messageDiv);

  // fetch data from server -> bot's response
  const response = await fetch("https://ai-bot-codex.onrender.com/api/prompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  clearInterval(loadInterval);
  messageDiv.innerHTML = "";

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim();

    typeText(messageDiv, parsedData);
  } else {
    const error = await response.text();

    messageDiv.innerHTML = "Ops. Something went wrong.";

    alert(error);
  }
}

submitButton.disabled = true;
form.addEventListener("input", (event) => {
  const value = event.target.value;

  if (value) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});
form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    handleSubmit(event);
  }
});

// Check if there is a new service worker available
if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then((reg) => {
    reg.addEventListener("updatefound", () => {
      const newWorker = reg.installing;

      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            // Show a notification to the user asking them to update the site
            const notification = new Notification(
              "A new version of this site is available. Click to update."
            );
            notification.onclick = function () {
              window.location.reload();
            };
          }
        }
      });
    });
  });

  navigator.serviceWorker.getRegistration().then(function (reg) {
    if (reg && reg.waiting) {
      reg.waiting.postMessage({ type: "SKIP_WAITING" });
      // Show a notification asking the user to update the site
      const notification = new Notification(
        "A new version of this site is available. Click to update."
      );
      notification.onclick = function () {
        window.location.reload();
      };
    }
  });
}
