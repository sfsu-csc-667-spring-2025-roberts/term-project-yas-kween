import { Request, Response } from "express";
import { Game } from "../../db";
import { PLAYER_HAND } from "../../db/games/constants";
import { broadcastGameState } from "./broadcast-game-state";

export const discard = async (request: Request, response: Response) => {
  const { id: userId } = request.session.user!;
  const { gameId } = request.params;
  const io = request.app.get("io");

  // Validate
  // is it the current users turn
  // does the current user have the selected card id
  const { user_id: activePlayer } = await Game.getCurrentPlayer(gameId);
  if (activePlayer !== userId) {
    io.to(`${userId}`).emit(`game:${gameId}:error`, {
      error: "It isn't your turn.",
    });

    response.status(400).send();
    return;
  }

  const { pileId, selectedCardId } = request.body;
  if (
    !(await Game.doesPlayerHaveCard(
      parseInt(gameId),
      userId,
      selectedCardId,
      PLAYER_HAND,
    ))
  ) {
    io.to(`${userId}`).emit(`game:${gameId}:error`, { error: "Good try." });

    response.status(400).send();
    return;
  }

  // update the selected card id to be in the selected pile
  await Game.discardCard(parseInt(gameId), userId, selectedCardId, pileId);

  // set the next user to is current
  const nextPlayer = await Game.getNextPlayer(parseInt(gameId), userId);
  await Game.setCurrentPlayer(parseInt(gameId), nextPlayer.user_id);

  // reset the user hasdrawn to false
  // reset the user is current false
  await Game.endPlayerTurn(gameId, userId);

  // broadcast game state
  await broadcastGameState(parseInt(gameId), io);
};
