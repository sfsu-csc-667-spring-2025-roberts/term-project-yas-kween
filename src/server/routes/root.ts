import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", (_request: Request, response: Response) => {
  const title = "Jrob's site";
  const name = "John";

  response.render("root", { title, name });
});

export default router;
