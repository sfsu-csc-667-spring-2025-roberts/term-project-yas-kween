import db from "../connection";

const SQL = `
UPDATE game_cards 
SET user_id=0, pile=$(playPileId)
WHERE game_id=$(gameId)
  AND card_id=$(cardId)
`;

export const playCard = async (
  gameId: string,
  cardId: number,
  playPileId: number,
) => {
  await db.none(SQL, { gameId, cardId, playPileId });
};
