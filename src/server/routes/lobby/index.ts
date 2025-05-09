import express from "express";
import { Request, Response } from "express";
import { getPlayerGames } from "./get-player-games";

const router = express.Router();

router.get("/", async (request: Request, response: Response) => {
  const { id: userId } = request.session.user!;

  const { availableGames, currentGames } = await getPlayerGames(userId);

  response.render("lobby", { availableGames, currentGames });
});

export default router;
