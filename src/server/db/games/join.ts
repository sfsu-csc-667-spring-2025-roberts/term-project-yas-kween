import db from "../connection";

const SQL = `
INSERT INTO game_users (game_id, user_id)
SELECT $(gameId), $(userId) 
WHERE NOT EXISTS (
  SELECT 'value-doesnt-matter' 
  FROM game_users 
  WHERE game_id=$(gameId) AND user_id=$(userId)
)
AND (
  SELECT COUNT(*) FROM games WHERE id=$(gameId) AND password=$(password)
) = 1
AND (
  (
    SELECT COUNT(*) FROM game_users WHERE game_id=$(gameId)
  ) < (
    SELECT max_players FROM games WHERE id=$(gameId)
  )
)
RETURNING (
  SELECT COUNT(*) AS playerCount FROM game_users WHERE game_id=$(gameId)
)
`;

export const join = async (
  userId: number,
  gameId: number,
  password: string = "",
) => {
  const { playerCount } = await db.one<{ playerCount: number }>(SQL, {
    gameId,
    userId,
    password,
  });

  return playerCount;
};
