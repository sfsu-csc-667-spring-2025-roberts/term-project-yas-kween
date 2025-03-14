import express from "express";

import httpErrors from "http-errors";

import rootRouter from "./routes/root";
import { timeMiddleware } from "./middleware/time";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(timeMiddleware);

app.use("/", rootRouter);

app.use((_request, _response, next) => {
  next(httpErrors(404));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
