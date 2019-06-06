require("dotenv").config();
const express = require("express");
const cors = require("cors");
const postRoute = require("./src/router/post");
const categoriesRoute = require("./src/router/categories");

const app = express();
app.use(cors());
app.use("/posts", postRoute);
app.use("/categories", categoriesRoute);
app.listen(process.env.PORT);
