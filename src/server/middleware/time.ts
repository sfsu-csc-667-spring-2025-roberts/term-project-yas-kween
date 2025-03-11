import { NextFunction, Request, Response } from "express";

const timeMiddleware = (
  _request: Request,
  _response: Response,
  next: NextFunction
) => {
  console.log(`Request made at ${new Date().toISOString()}`);

  next();
};

export { timeMiddleware };
