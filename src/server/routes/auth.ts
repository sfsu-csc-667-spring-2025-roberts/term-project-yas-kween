import express from "express";
import { Request, Response } from "express";

import { User } from "../db";

const router = express.Router();

router.get("/register", async (_request: Request, response: Response) => {
  response.render("auth/register");
});

router.post("/register", async (request: Request, response: Response) => {
  const { email, password } = request.body;

  try {
    const user = await User.register(email, password);

    response.json({ user });
  } catch (error) {
    console.error("Error registering user:", error);

    response.render("auth/register", { error: "Invalid credentials.", email });
  }
});

router.get("/login", async (_request: Request, response: Response) => {
  response.render("auth/login");
});

router.post("/login", async (request: Request, response: Response) => {
  const { email, password } = request.body;

  try {
    const user = await User.login(email, password);

    response.json({ user });
  } catch (error) {
    console.error("Error logging in user:", error);

    response.render("auth/login", { error: "Invalid credentials.", email });
  }
});

export default router;
