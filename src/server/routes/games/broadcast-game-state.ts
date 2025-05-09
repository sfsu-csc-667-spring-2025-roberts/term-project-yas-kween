import { Server } from "socket.io";
import { Game } from "../../db";

export const broadcastGameState = async (gameId: number, io: Server) => {
  const gameState = await Game.getState(gameId);

  io.emit(`game:${gameId}:updated`, gameState);
};
