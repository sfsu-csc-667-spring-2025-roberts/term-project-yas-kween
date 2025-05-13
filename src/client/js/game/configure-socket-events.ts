import { PlayerGameState } from "global";
import UI from "../elements";
import { socket } from "../sockets";
import { getGameId } from "../utils";
import { createDrawArea } from "./create-draw-area";
import { currentPlayer, otherPlayer } from "./create-players";

const MESSAGE_MAP: Record<string, Function> = {
  [`game:${getGameId()}:updated`]: (gameState: PlayerGameState) => {
    console.log(gameState);

    UI.OVERLAY?.parentElement?.removeChild(UI.OVERLAY);

    UI.PLAY_AREA.replaceChildren(
      createDrawArea(gameState.buildPiles),
      currentPlayer(gameState.currentPlayer),
      ...Object.values(gameState.players).map((player) =>
        otherPlayer(player, gameState),
      ),
    );
  },
  [`game:${getGameId()}:error`]: ({ error }: { error: string }) => {
    const errDiv = document.createElement("div");
    errDiv.classList.add("error", "message");
    errDiv.textContent = error;

    UI.CHAT_MESSAGES.appendChild(errDiv);
  },
};

export const configureSocketEvents = () => {
  Object.entries(MESSAGE_MAP).forEach(([messageName, handler]) => {
    socket.on(messageName, handler);
  });
};
