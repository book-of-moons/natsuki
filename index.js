require("dotenv").config();
const express = require("express");
const postRoute = require("./src/router/post");
const categoriesRoute = require("./src/router/categories");

const app = express();
app.use("/posts", postRoute);
app.use("/categories", categoriesRoute);
app.listen(process.env.PORT);
