import express from "express";
import httpErrors from "http-errors";

import rootRoutes from "./routes/root";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", rootRoutes);
app.use("/test", () => {});

app.use((_request, _response, next) => {
  next(httpErrors(404));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
