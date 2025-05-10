import db from "../connection";

const SQL = `
SELECT (
  SELECT COUNT(*) FROM game_users
  WHERE game_id=$1 AND is_current=true
) > 0 AS has_started
`;

export const hasStarted = async (gameId: number) => {
  const { has_started } = await db.one(SQL, [gameId]);

  return has_started;
};
