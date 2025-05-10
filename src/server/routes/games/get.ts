import { Request, Response } from "express";
import { Game } from "../../db";

export const get = async (request: Request, response: Response) => {
  const { gameId: paramsGameId } = request.params;
  const gameId = parseInt(paramsGameId);

  const { id: userId } = request.session.user!;
  const hostId = await Game.getHost(gameId);
  const hasStarted = await Game.hasStarted(gameId);

  response.render("games", { gameId, isHost: hostId === userId, hasStarted });
};
