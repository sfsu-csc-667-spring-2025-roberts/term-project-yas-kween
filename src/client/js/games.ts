import { socket } from "./sockets";
import { getGameId } from "./utils";

const startGameButton = document.querySelector("#start-game-button");

startGameButton?.addEventListener("click", (event) => {
  event.preventDefault();

  fetch(`/games/${getGameId()}/start`, {
    method: "post",
  });
});

socket.on(`game:${getGameId()}:updated`, console.log);
