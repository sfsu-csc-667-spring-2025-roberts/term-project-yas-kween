import UI from "./elements";
import { configureSocketEvents } from "./game/configure-socket-events";
import { getGameId } from "./utils";

configureSocketEvents();

UI.START_GAME_BUTTON?.addEventListener("click", (event) => {
  event.preventDefault();

  fetch(`/games/${getGameId()}/start`, {
    method: "post",
  });
});

if (UI.PLAY_AREA.classList.contains("started")) {
  fetch(`/games/${getGameId()}/ping`, { method: "post" });
}
