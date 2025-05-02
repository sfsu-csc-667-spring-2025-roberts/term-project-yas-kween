import { DbGameUser, GameInfo, PlayerInfo, User } from "global";
import db from "../connection";
import {
  ADD_PLAYER,
  CONDITIONALLY_JOIN_SQL,
  CREATE_SQL,
  DEAL_CARDS_SQL,
  GET_CARD_SQL,
  GET_GAME_INFO_SQL,
  GET_PLAYERS_SQL,
  IS_HOST_SQL,
  SET_IS_CURRENT_SQL,
  SETUP_DECK_SQL,
} from "./sql";

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

type GetGameInfoResponse = Pick<
  GameInfo,
  "name" | "password" | "min_players" | "max_players"
> & {
  player_count: number;
};

const getInfo = async (gameId: number): Promise<GetGameInfoResponse> => {
  return await db.one<GetGameInfoResponse>(GET_GAME_INFO_SQL, [gameId]);
};

const dealCards = async (
  userId: number,
  gameId: number,
  cardCount: number,
  pile: number,
) => {
  await db.none(DEAL_CARDS_SQL, { userId, gameId, cardCount, pile });
};

const getPlayers = async (gameId: number): Promise<(User & DbGameUser)[]> => {
  return await db.many(GET_PLAYERS_SQL, gameId);
};

const setCurrentPlayer = async (gameId: number, userId: number) => {
  await db.none(SET_IS_CURRENT_SQL, { gameId, userId });
};

export const STOCK_PILE = 0;
export const PLAYER_HAND = 1;
export const DISCARD_1 = 2;
export const DISCARD_2 = 3;
export const DISCARD_3 = 4;
export const DISCARD_4 = 5;

export const DRAW_PILE = 0;
export const NORTH_PILE = 1;
export const EAST_PILE = 2;
export const SOUTH_PILE = 3;
export const WEST_PILE = 4;

const start = async (gameId: number) => {
  await db.none(SETUP_DECK_SQL, { gameId });

  const players = await getPlayers(gameId);

  for (let i = 0; i < players.length; i++) {
    await dealCards(players[i].id, gameId, 20, STOCK_PILE);
    await dealCards(players[i].id, gameId, 5, PLAYER_HAND);
  }

  await setCurrentPlayer(gameId, players[0].id);
};

const getState = async (gameId: number) => {
  const { name } = await getInfo(gameId);

  const players = (await getPlayers(gameId)).map(
    ({ id, email, gravatar, seat, is_current: isCurrent }) => ({
      id,
      email,
      gravatar,
      seat,
      isCurrent,
    }),
  );

  const playerInfo: Record<number, PlayerInfo> = {};

  for (let i = 0; i < players.length; i++) {
    const { id } = players[i];

    try {
      playerInfo[id] = {
        ...players[id],
        hand: await db.manyOrNone(GET_CARD_SQL, {
          gameId,
          userId: id,
          limit: 6,
          pile: PLAYER_HAND,
        }),
        stockPileTop: await db.one(GET_CARD_SQL, {
          gameId,
          userId: id,
          limit: 1,
          pile: STOCK_PILE,
        }),
        discardPiles: await Promise.all(
          [DISCARD_1, DISCARD_2, DISCARD_3, DISCARD_4].map((pile) =>
            db.any(GET_CARD_SQL, { gameId, userId: id, limit: 162, pile }),
          ),
        ),
      };
    } catch (error) {
      console.error({ error });
    }
  }

  return {
    name,
    buildPiles: await Promise.all(
      [NORTH_PILE, EAST_PILE, SOUTH_PILE, WEST_PILE].map((pile) => {
        return db.oneOrNone(GET_CARD_SQL, {
          gameId,
          pile,
          userId: 0,
          limit: 1,
        });
      }),
    ),
    players: playerInfo,
  };
};

export default {
  create,
  dealCards,
  getHost,
  getInfo,
  getPlayers,
  getState,
  join,
  setCurrentPlayer,
  start,
  cardLocations: {
    STOCK_PILE: STOCK_PILE,
    PLAYER_HAND: PLAYER_HAND,
    DISCARD_1: DISCARD_1,
    DISCARD_2: DISCARD_2,
    DISCARD_3: DISCARD_3,
    DISCARD_4: DISCARD_4,
    DRAW_PILE: DRAW_PILE,
    NORTH_PILE: NORTH_PILE,
    EAST_PILE: EAST_PILE,
    SOUTH_PILE: SOUTH_PILE,
    WEST_PILE: WEST_PILE,
  },
};
