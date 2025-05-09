import db from "../connection";

export const SQL = `
UPDATE game_users 
SET is_current=(game_users.user_id=$(userId))
WHERE game_id=$(gameId)`;

export const setCurrentPlayer = async (gameId: number, userId: number) => {
  await db.none(SQL, { gameId, userId });
};
