import { Server } from "socket.io";
import { Game } from "../../db";
import { GameState, OtherPlayerInfo, PlayerInfo } from "global";

const createPlayerState = (game: GameState, currentPlayer: PlayerInfo) => {
  const players = Object.entries(game.players)
    .filter(([playerId]) => {
      return parseInt(playerId) !== currentPlayer.id;
    })
    .reduce(
      (acc, [playerId, playerInfo]) => {
        const {
          hand,
          stockPileTop,
          discardPiles,
          stockPileCount,
          isCurrent,
          ...rest
        } = playerInfo;

        acc[playerId] = {
          ...rest,
          handCount: hand.length,
          stockPileCount,
          stockPileTop,
          isCurrent,
        };

        return acc;
      },
      {} as Record<string, OtherPlayerInfo>,
    );

  return {
    players,
    currentPlayer,
  };
};

export const broadcastGameState = async (gameId: number, io: Server) => {
  const gameState = await Game.getState(gameId);

  Object.entries(gameState.players).forEach(([playerId, playerInfo]) => {
    io.to(playerId).emit(
      `game:${gameId}:updated`,
      createPlayerState(gameState, playerInfo),
    );
  });
};
