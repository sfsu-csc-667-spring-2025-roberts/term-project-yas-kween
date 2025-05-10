import { Request, Response } from "express";
import { Game } from "../../db";

export const join = async (request: Request, response: Response) => {
  const { gameId } = request.params;
  const { password } = request.body;
  const { id: userId } = request.session.user!;

  try {
    await Game.join(userId, parseInt(gameId), password);

    response.redirect(`/games/${gameId}`);
  } catch (error) {
    console.log({ error });

    response.redirect("/lobby");
  }
};
