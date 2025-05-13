import { Request } from "express";
import { Server } from "socket.io";

export const getIo = (request: Request) => {
  return request.app.get("io") as Server;
};
