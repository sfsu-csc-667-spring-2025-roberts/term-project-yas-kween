import type { ChatMessage } from "global";
import { socket } from "../socket";

const roomId = document.querySelector<HTMLInputElement>("input#room-id")?.value;
const parent = document.querySelector("section#chat div");
const messageInput = document.querySelector<HTMLInputElement>(
  "section#chat form input[name=message]",
);

document
  .querySelector("section#chat form.chat-form")
  ?.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = messageInput?.value;
    messageInput!.value = "";

    if (message?.trim().length === 0) {
      return;
    }

    fetch(`/chat/${roomId}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({ message }),
    });
  });

socket.on(
  `chat-message:${roomId}`,
  ({ message, sender, gravatar, timestamp }: ChatMessage) => {
    const container = document
      .querySelector<HTMLTemplateElement>("template#chat-message-template")
      ?.content.cloneNode(true) as HTMLDivElement;

    const img = container.querySelector<HTMLImageElement>("img");
    img!.src = `https://www.gravatar.com/avatar/${gravatar}`;
    img!.alt = `${sender}'s avatar`;

    const messageElement =
      container.querySelector<HTMLSpanElement>("span.message");
    messageElement!.innerText = message;

    const timestampElement =
      container.querySelector<HTMLSpanElement>("span.timestamp");
    timestampElement!.innerText = new Date(timestamp).toLocaleString();

    parent?.appendChild(container);
    parent?.scrollTo({ top: parent.scrollHeight, behavior: "smooth" });
  },
);
