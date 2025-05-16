import { Request, Response } from "express";
import { Game } from "../../db";
import { PLAYER_HAND } from "../../db/games/constants";
import { broadcastGameState } from "./broadcast-game-state";

export const play = async (request: Request, response: Response) => {
  const { id: userId } = request.session.user!;
  const { gameId } = request.params;
  const io = request.app.get("io");

  // is it players turn
  const { user_id: activePlayer } = await Game.getCurrentPlayer(gameId);
  if (activePlayer !== userId) {
    io.to(`${userId}`).emit(`game:${gameId}:error`, {
      error: "It isn't your turn.",
    });

    response.status(400).send();
    return;
  }

  // does the player have the card
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

  // is the pile playing on valid card (i.e. card value - 1, unless skip-bo)
  const { value: topCardValue } = await Game.getBuildPileTop(gameId, pileId);
  const selectedCardValue = await Game.getCardValue(selectedCardId);

  const isValidPlay =
    (topCardValue === -1 &&
      (selectedCardValue === 1 || selectedCardValue === 0)) ||
    selectedCardValue === topCardValue + 1 ||
    selectedCardValue === 0;

  if (isValidPlay) {
    await Game.playCard(gameId, selectedCardId, pileId);

    // If a 12 is played, clean up the build pile
    if (
      selectedCardValue === 12 ||
      (selectedCardValue === 0 && topCardValue === 11)
    ) {
      await Game.cleanUpBuildPile(gameId, pileId);
    }

    await broadcastGameState(parseInt(gameId), io);
  } else {
    io.to(`${userId}`).emit(`game:${gameId}:error`, {
      error: "Not a valid play.",
    });

    response.status(400).send();
  }
};
