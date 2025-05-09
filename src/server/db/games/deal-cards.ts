import db from "../connection";

const SQL = `
UPDATE game_cards
SET user_id=$(userId), pile=$(pile)
WHERE game_id=$(gameId) 
  AND card_id IN (
    SELECT card_id 
    FROM game_cards 
    WHERE user_id=0 
    ORDER BY card_order, card_id 
    LIMIT $(cardCount)
  )
`;

export const dealCards = async (
  userId: number,
  gameId: number,
  cardCount: number,
  pile: number,
) => {
  await db.none(SQL, { userId, gameId, cardCount, pile });
};
