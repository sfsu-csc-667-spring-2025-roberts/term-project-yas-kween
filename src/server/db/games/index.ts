import { getAvailablGames } from "./get-available-games";
import { getCurrentGames } from "./get-current-games";
import { dealCards } from "./deal-cards";
import { getPlayers } from "./get-players";
import { setCurrentPlayer } from "./set-current-player";
import { start } from "./start-game";
import { getState } from "./get-state";
import { getInfo } from "./get-info";
import { create } from "./create";
import { join } from "./join";
import { getHost } from "./get-host";

export * as cardLocations from "./constants";

export default {
  create,
  dealCards,
  getHost,
  getInfo,
  getAvailablGames,
  getCurrentGames,
  getPlayers,
  getState,
  join,
  setCurrentPlayer,
  start,
};
