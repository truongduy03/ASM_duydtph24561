import Express from "express";
import router from "./routes/product.js";
import routerUser from "./routes/user.js";
import mongoose from "mongoose";

const app = Express();
app.use(Express.json());

app.use("/api", router);
app.use("/api", routerUser);
const port = 8080;

mongoose
  .connect("mongodb://127.0.0.1:27017/testWe17306")
  .then(() => console.log("Connect to DB successfully"));

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});

