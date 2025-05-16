import db from "../connection";

const SQL = `
UPDATE game_users 
SET is_current=false, has_drawn=false
WHERE game_id=$(gameId) 
  AND user_id=$(userId)
`;

export const endPlayerTurn = async (gameId: string, userId: number) => {
  return await db.none(SQL, { gameId, userId });
};
