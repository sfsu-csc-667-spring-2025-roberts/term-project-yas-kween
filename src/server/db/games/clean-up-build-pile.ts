import db from "../connection";
import { SHUFFLE_ME } from "./constants";

const SQL = `
UPDATE game_cards
SET pile=${SHUFFLE_ME}
WHERE game_id=$(gameId) 
  AND pile=$(pileId)
`;

export const cleanUpBuildPile = async (gameId: string, pileId: number) => {
  await db.none(SQL, { gameId, pileId });
};
