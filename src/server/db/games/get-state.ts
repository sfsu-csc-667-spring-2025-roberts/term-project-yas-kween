import { GameState, PlayerInfo } from "global";
import { getInfo } from "./get-info";
import { getPlayers } from "./get-players";
import db from "../connection";
import {
  DISCARD_1,
  DISCARD_2,
  DISCARD_3,
  DISCARD_4,
  EAST_PILE,
  NORTH_PILE,
  PLAYER_HAND,
  SOUTH_PILE,
  STOCK_PILE,
  WEST_PILE,
} from "./constants";

const GET_CARD_SQL = `
SELECT cards.*, game_cards.card_order 
FROM cards, game_cards 
WHERE user_id=$(userId) 
  AND pile=$(pile) 
  AND game_id=$(gameId)
  AND cards.id=game_cards.card_id
ORDER BY game_cards.card_order, game_cards.card_id DESC
LIMIT $(limit)
`;

const GET_STOCKPILE_COUNT_SQL = `
SELECT COUNT(*) FROM game_cards
WHERE game_cards.user_id=$(userId)
  AND game_cards.game_id=$(gameId)
  AND pile=${STOCK_PILE}
`;

export const getState = async (gameId: number): Promise<GameState> => {
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

  const playerInfo: Record<string, PlayerInfo> = {};

  for (let playerIndex = 0; playerIndex < players.length; playerIndex++) {
    const player = players[playerIndex];

    const { id: userId } = players[playerIndex];

    const hand = await db.manyOrNone(GET_CARD_SQL, {
      gameId,
      userId,
      limit: 5,
      pile: PLAYER_HAND,
    });
    const stockPileTop = await db.one(GET_CARD_SQL, {
      gameId,
      userId,
      limit: 1,
      pile: STOCK_PILE,
    });
    const { count: stockPileCount } = await db.one(GET_STOCKPILE_COUNT_SQL, {
      gameId,
      userId,
    });

    try {
      playerInfo[userId] = {
        ...player,
        hand,
        stockPileTop,
        stockPileCount: parseInt(stockPileCount),
        discardPiles: await Promise.all(
          [DISCARD_1, DISCARD_2, DISCARD_3, DISCARD_4].map((pile) =>
            db.any(GET_CARD_SQL, { gameId, userId, limit: 1, pile }),
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
