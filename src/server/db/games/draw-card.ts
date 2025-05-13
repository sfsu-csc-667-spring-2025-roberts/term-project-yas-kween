import { Game } from "..";
import db from "../connection";
import { PLAYER_HAND } from "./constants";

const SQL = `
UPDATE game_users 
SET has_drawn=true 
WHERE game_id=$(gameId) AND user_id=$(userId)
`;

export const drawCard = async (userId: number, gameId: string) => {
  await Game.dealCards(userId, parseInt(gameId), 1, PLAYER_HAND);
  await db.none(SQL, { gameId, userId });
};
