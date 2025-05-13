import { Request, Response } from "express";
import { Game } from "../../db";
import { broadcastGameState } from "./broadcast-game-state";
import { getIo } from "./get-io";

export const draw = async (request: Request, response: Response) => {
  const { id: userId } = request.session.user!;
  const { gameId } = request.params;

  // When we receive a draw request, we need to:
  // 1. make sure its the players turn.
  // 2. make sure they havent drawn a card this turn.
  const { user_id: currentUserId, has_drawn } =
    await Game.getCurrentPlayer(gameId);

  if (currentUserId !== userId || has_drawn) {
    const io = getIo(request);

    io.to(`${currentUserId}`).emit(`game:${gameId}:error`, {
      error: "It is not your turn to draw.",
    });

    response.status(400).send();
    return;
  }

  // 3. assign the next card to the players hand
  await Game.drawCard(userId, gameId);

  // 4. broadcast game state
  await broadcastGameState(parseInt(gameId), getIo(request));
};
