import { getPlayers } from "./get-players";

export const getNextPlayer = async (gameId: number, currentUserId: number) => {
  const allPlayers = await getPlayers(gameId);

  const currentIndex = allPlayers.findIndex(
    (player) => player.user_id == currentUserId,
  );
  const nextIndex = (currentIndex + 1) % allPlayers.length;

  return allPlayers[nextIndex];
};
