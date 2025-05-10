import { create } from "./create";
import { dealCards } from "./deal-cards";
import { getAvailablGames } from "./get-available-games";
import { getCurrentGames } from "./get-current-games";
import { getHost } from "./get-host";
import { getInfo } from "./get-info";
import { getPlayers } from "./get-players";
import { getState } from "./get-state";
import { hasStarted } from "./has-started";
import { join } from "./join";
import { setCurrentPlayer } from "./set-current-player";
import { start } from "./start-game";

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
  hasStarted,
  join,
  setCurrentPlayer,
  start,
};
