require("dotenv").config();
const express = require("express");
const routes = require("./src/router/post");

const app = express();
app.use("/posts", routes);
app.listen(3000);
