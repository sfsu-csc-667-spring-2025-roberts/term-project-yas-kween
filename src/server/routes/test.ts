import express from "express";
import { Request, Response } from "express";
import type { Server } from "socket.io";

import db from "../db/connection";

const router = express.Router();

router.get("/", async (_request: Request, response: Response) => {
  try {
    await db.none("INSERT INTO test_table (test_string) VALUES ($1)", [
      `Test string ${new Date().toISOString()}`,
    ]);

    response.json(await db.any("SELECT * FROM test_table"));
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/promise_version", (request: Request, response: Response) => {
  db.none("INSERT INTO test_table (test_string) VALUES ($1)", [
    `Test string ${new Date().toISOString()}`,
  ])
    .then(() => {
      return db.any("SELECT * FROM test_table");
    })
    .then((result) => {
      response.json(result);
    })
    .catch((error) => {
      console.error(error);
      response.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/socket-test", (request: Request, response: Response) => {
  const io = request.app.get("io");
  // @ts-ignore
  const { id } = request.session.user;

  if (io) {
    console.log("io not null");

    io.emit("test-event", {
      message: "Hello from the server!",
      timestamp: new Date(),
    });
    io.to(id).emit("test-event", {
      message: `Secret message for user ${id}`,
      timestamp: new Date(),
    });

    response.status(200).send();
  } else {
    response.status(500).send();
  }
});

export default router;
