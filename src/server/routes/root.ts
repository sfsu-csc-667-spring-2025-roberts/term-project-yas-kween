import express from "express";

const router = express.Router();

router.get("/", (request, response) => {
  response.send("Hello World from route in another file!");
});

export default router;
