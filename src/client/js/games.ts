import { PlayerGameState } from "global";
import { createDrawArea } from "./game/create-draw-area";
import { currentPlayer, otherPlayer } from "./game/create-players";
import UI from "./game/elements";
import { socket } from "./sockets";
import { getGameId } from "./utils";

UI.START_GAME_BUTTON?.addEventListener("click", (event) => {
  event.preventDefault();

  fetch(`/games/${getGameId()}/start`, {
    method: "post",
  });
});

socket.on(`game:${getGameId()}:updated`, (gameState: PlayerGameState) => {
  console.log(gameState);
  UI.OVERLAY?.parentElement?.removeChild(UI.OVERLAY);

  UI.PLAY_AREA.replaceChildren(
    createDrawArea(gameState.buildPiles),
    currentPlayer(gameState.currentPlayer),
    ...Object.values(gameState.players).map((player) =>
      otherPlayer(player, gameState),
    ),
  );
});

if (UI.PLAY_AREA.classList.contains("started")) {
  fetch(`/games/${getGameId()}/ping`, { method: "post" });
}
