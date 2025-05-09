import db from "../connection";
import {
  ADD_PLAYER,
  CONDITIONALLY_JOIN_SQL,
  CREATE_SQL,
  IS_HOST_SQL,
} from "./sql";
import { getAvailablGames } from "./get-available-games";
import { getCurrentGames } from "./get-current-games";
import { dealCards } from "./deal-cards";
import { getPlayers } from "./get-players";
import { setCurrentPlayer } from "./set-current-player";
import { start } from "./start-game";
import { getState } from "./get-state";
import { getInfo } from "./get-info";

const create = async (
  name: string,
  minPlayers: string,
  maxPlayers: string,
  password: string,
  userId: number,
) => {
  const { id: gameId } = await db.one<{ id: number }>(CREATE_SQL, [
    name,
    minPlayers,
    maxPlayers,
    password,
  ]);

  await db.none(ADD_PLAYER, [gameId, userId]);

  return gameId;
};

const join = async (userId: number, gameId: number, password: string = "") => {
  const { playerCount } = await db.one<{ playerCount: number }>(
    CONDITIONALLY_JOIN_SQL,
    {
      gameId,
      userId,
      password,
    },
  );

  return playerCount;
};

const getHost = async (gameId: number) => {
  const { user_id } = await db.one<{ user_id: number }>(IS_HOST_SQL, [gameId]);

  return user_id;
};

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
