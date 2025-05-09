import { Server } from "socket.io";
import type { Express, RequestHandler } from "express";

const configureSockets = (
  io: Server,
  app: Express,
  sessionMiddleware: RequestHandler,
) => {
  app.set("io", io);

  io.engine.use(sessionMiddleware);

  io.on("connection", (socket) => {
    // @ts-ignore
    const { id, user } = socket.request.session;

    console.log(`User [${user.id}] connected with session id ${id}`);
    socket.join(`${user.id}`);

    socket.on("disconnect", () => {
      console.log(`User [${user.id}] disconnected`);
      socket.leave(`${user.id}`);
    });
  });
};

export default configureSockets;
