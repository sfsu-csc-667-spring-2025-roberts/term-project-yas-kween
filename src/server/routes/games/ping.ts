import { Request, Response } from "express";
import { broadcastGameStateToPlayer } from "./broadcast-game-state";

export const ping = async (request: Request, response: Response) => {
  const { id: userId } = request.session.user!;
  const { gameId: paramsGameId } = request.params;
  const gameId = parseInt(paramsGameId);

  await broadcastGameStateToPlayer(gameId, `${userId}`, request.app.get("io"));
};
