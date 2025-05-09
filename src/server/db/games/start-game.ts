import db from "../connection";
import { PLAYER_HAND, STOCK_PILE } from "./constants";
import { dealCards } from "./deal-cards";
import { getPlayers } from "./get-players";
import { setCurrentPlayer } from "./set-current-player";

const SQL = `
INSERT INTO game_cards (game_id, user_id, card_id, card_order, pile)
  SELECT $(gameId), 0, id, FLOOR(random() * 10000), 0
  FROM cards
`;

export const start = async (gameId: number) => {
  await db.none(SQL, { gameId });

  const players = await getPlayers(gameId);

  for (let i = 0; i < players.length; i++) {
    await dealCards(players[i].id, gameId, 20, STOCK_PILE);
    await dealCards(players[i].id, gameId, 5, PLAYER_HAND);
  }

  await setCurrentPlayer(gameId, players[0].id);
};
