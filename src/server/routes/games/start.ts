import { Request, Response } from "express";
import { Game } from "../../db";
import { broadcastGameState } from "./broadcast-game-state";

export const start = async (request: Request, response: Response) => {
  const { gameId: paramsGameId } = request.params;
  const gameId = parseInt(paramsGameId);

  const { id: userId } = request.session.user!;
  const hostId = await Game.getHost(gameId);

  if (hostId !== userId) {
    response.status(200).send();
    return;
  }

  const gameInfo = await Game.getInfo(gameId);

  if (gameInfo.player_count < gameInfo.min_players) {
    // TODO: Broadcast game update stating "not enough players"

    response.status(200).send();
    return;
  }

  await Game.start(gameId);
  await broadcastGameState(gameId, request.app.get("io"));

  response.status(200).send();
};
