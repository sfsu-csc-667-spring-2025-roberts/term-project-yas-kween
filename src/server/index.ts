import * as path from "path";

import express from "express";
import httpErrors from "http-errors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import rootRouter from "./routes/root";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use(express.static(path.join(process.cwd(), "public")));

app.set("views", path.join(process.cwd(), "src", "server", "views"));
app.set("view engine", "ejs");

app.use("/", rootRouter);

app.use((_request, _response, next) => {
  next(httpErrors(404));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
