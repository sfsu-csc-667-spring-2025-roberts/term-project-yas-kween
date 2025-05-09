import db from "../connection";

const SQL = `
SELECT *, (
  SELECT COUNT(*) FROM game_users WHERE game_users.game_id=games.id
)::int as player_count 
FROM game_users, games 
WHERE game_users.game_id=games.id
AND $1 NOT IN (
  SELECT user_id 
  FROM game_users 
  WHERE games.id=game_users.game_id
)`;

export const getAvailablGames = async (userId: number) => {
  // any game that has less than max players that userId isnt in
  return db.any(SQL, [userId]);
};
