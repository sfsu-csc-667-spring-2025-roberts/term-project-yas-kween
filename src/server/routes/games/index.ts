import express from "express";

import { create } from "./create";
import { discard } from "./discard";
import { draw } from "./draw";
import { get } from "./get";
import { join } from "./join";
import { ping } from "./ping";
import { start } from "./start";

const router = express.Router();

router.post("/create", create);
router.post("/join/:gameId", join);
router.get("/:gameId", get);
router.post("/:gameId/start", start);
router.post("/:gameId/ping", ping);
router.post("/:gameId/draw", draw);
router.post("/:gameId/discard", discard);

export default router;
