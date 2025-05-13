import db from "../connection";

const SQL = `
SELECT user_id, has_drawn 
FROM game_users 
WHERE game_id=$(gameId) AND is_current=true`;

export const getCurrentPlayer = async (gameId: string) => {
  return await db.one<{ user_id: number; has_drawn: boolean }>(SQL, { gameId });
};
