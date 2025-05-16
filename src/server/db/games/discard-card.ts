import db from "../connection";

const SQL = `
UPDATE game_cards 
SET pile=$(discardPileId)
WHERE game_id=$(gameId)
  AND user_id=$(userId)
  AND card_id=$(cardId)
`;

export const discardCard = async (
  gameId: number,
  userId: number,
  cardId: number,
  discardPileId: number,
) => {
  return await db.none(SQL, { gameId, userId, cardId, discardPileId });
};
