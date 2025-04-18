import type { Request, Response, NextFunction } from "express";

const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (request.params.roomId !== undefined) {
    response.locals.roomId = request.params.roomId;
  } else {
    response.locals.roomId = 0;
  }

  next();
};

export default authMiddleware;
