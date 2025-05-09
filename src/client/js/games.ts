import { PlayerGameState } from "global";
import { socket } from "./sockets";
import { getGameId } from "./utils";

const startGameButton =
  document.querySelector<HTMLButtonElement>("#start-game-button");

const playArea = document.querySelector<HTMLDivElement>("#play-area")!;

startGameButton?.addEventListener("click", (event) => {
  event.preventDefault();

  fetch(`/games/${getGameId()}/start`, {
    method: "post",
  });
});

const hideEl = (el: HTMLElement | null) => {
  if (!el) {
    return;
  }

  el.classList.remove("shown");
  el.classList.add("hidden");
};

const showEl = (el: HTMLElement | null) => {
  if (!el) {
    return;
  }

  el.classList.remove("hidden");
  el.classList.add("shown");
};

socket.on(`game:${getGameId()}:updated`, (gameState: PlayerGameState) => {
  hideEl(startGameButton);
  showEl(playArea);

  console.log(gameState);
});
