import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", (_request: Request, response: Response) => {
  response.send("Hello, World from inside a route again!");
});

export default router;
