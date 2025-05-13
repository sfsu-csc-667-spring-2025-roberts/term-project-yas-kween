import { ChatMessage } from "global";
import Ui from "./elements";
import { socket } from "./sockets";
import { cloneTemplate, getGameId } from "./utils";

socket.on(
  `chat:message:${getGameId()}`,
  ({ message, sender, timestamp }: ChatMessage) => {
    const container = cloneTemplate<HTMLDivElement>("#chat-message-template");

    const img = container.querySelector<HTMLImageElement>("img")!;
    img.src = `https://gravatar.com/avatar/${sender.gravatar}?d=identicon`;
    img.alt = `Gravatar for ${sender.email}`;

    container.querySelector<HTMLSpanElement>(
      "div span:first-of-type",
    )!.innerText = message;
    container.querySelector<HTMLSpanElement>(
      "div span:last-of-type",
    )!.innerText = new Date(timestamp).toLocaleTimeString();

    Ui.CHAT_MESSAGES.appendChild(container);

    Ui.CHAT_MESSAGES?.scrollTo({
      top: Ui.CHAT_MESSAGES.scrollHeight,
      behavior: "smooth",
    });
  },
);

Ui.CHAT_FORM.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = Ui.CHAT_INPUT.value;
  if (!message) {
    return;
  }

  Ui.CHAT_INPUT.value = "";

  fetch(`/chat/${getGameId()}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  }).catch((error) => {
    console.error("Error sending message:", error);
  });
});
