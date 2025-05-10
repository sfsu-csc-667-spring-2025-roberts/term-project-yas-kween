import express from "express";

import { create } from "./create";
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

export default router;
