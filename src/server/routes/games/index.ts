import express, { Request, Response } from "express";

import { Game } from "../../db";
import { broadcastGameState } from "./broadcast-game-state";

const router = express.Router();

router.post("/create", async (request: Request, response: Response) => {
  // @ts-ignore
  const { id: userId } = request.session.user;
  const { description, minPlayers, maxPlayers, password } = request.body;

  try {
    const gameId = await Game.create(
      description,
      minPlayers,
      maxPlayers,
      password,
      userId,
    );

    response.redirect(`/games/${gameId}`);
  } catch (error) {
    console.log({ error });

    response.redirect("/lobby");
  }
});

router.post("/join/:gameId", async (request: Request, response: Response) => {
  const { gameId } = request.params;
  const { password } = request.body;
  // @ts-ignore
  const { id: userId } = request.session.user;

  try {
    const playerCount = await Game.join(userId, parseInt(gameId), password);

    response.redirect(`/games/${gameId}`);
  } catch (error) {
    console.log({ error });

    response.redirect("/lobby");
  }
});

router.get("/:gameId", async (request: Request, response: Response) => {
  const { gameId: paramsGameId } = request.params;
  const gameId = parseInt(paramsGameId);

  const { id: userId } = request.session.user!;
  const hostId = await Game.getHost(gameId);

  response.render("games", { gameId, isHost: hostId === userId });
});

router.post("/:gameId/start", async (request: Request, response: Response) => {
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
});

export default router;
