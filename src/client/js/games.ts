import { PlayerGameState } from "global";
import { createDrawArea } from "./game/create-draw-area";
import { currentPlayer, otherPlayer } from "./game/create-players";
import { socket } from "./sockets";
import { getGameId } from "./utils";

const startGameButton =
  document.querySelector<HTMLButtonElement>("#start-game-button");
const overlay = document.querySelector<HTMLDivElement>(
  "#game-table-waiting-overlay",
);
const playArea = document.querySelector<HTMLDivElement>("#play-area")!;

startGameButton?.addEventListener("click", (event) => {
  event.preventDefault();

  fetch(`/games/${getGameId()}/start`, {
    method: "post",
  });
});

socket.on(`game:${getGameId()}:updated`, (gameState: PlayerGameState) => {
  console.log(gameState);
  overlay?.parentElement?.removeChild(overlay);

  playArea.replaceChildren(
    createDrawArea(gameState.buildPiles),
    currentPlayer(gameState.currentPlayer),
    ...Object.values(gameState.players).map((player) =>
      otherPlayer(player, gameState),
    ),
  );
});
