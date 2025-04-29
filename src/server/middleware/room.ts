import type { Request, Response, NextFunction } from "express";

const getGameMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { gameId } = request.params;

  if (gameId == undefined || request.url.includes("lobby")) {
    response.locals.gameId = 0;
  } else if (gameId !== undefined) {
    response.locals.gameId = gameId;
  }

  next();
};

export default getGameMiddleware;
