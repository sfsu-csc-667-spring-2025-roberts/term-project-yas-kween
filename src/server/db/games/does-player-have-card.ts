import db from "../connection";

const SQL = `
SELECT card_id FROM game_cards AS gc
WHERE gc.game_id=$(gameId)
  AND gc.user_id=$(userId)
  AND gc.card_id=$(cardId)
  AND pile=$(pile)
`;

export const doesPlayerHaveCard = async (
  gameId: number,
  userId: number,
  cardId: number,
  pile: number,
) => {
  try {
    await db.one(SQL, { gameId, userId, cardId, pile });

    return true;
  } catch {
    return false;
  }
};
