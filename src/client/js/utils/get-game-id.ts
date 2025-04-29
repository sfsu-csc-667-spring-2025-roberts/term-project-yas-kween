let gameId: string | undefined = undefined;

const getGameId = (): string => {
  if (gameId == undefined) {
    gameId = document.querySelector<HTMLInputElement>("#game-id")?.value;
  }

  if (gameId == undefined) {
    throw new Error("Game ID not found");
  }

  return gameId;
};

export { getGameId };
