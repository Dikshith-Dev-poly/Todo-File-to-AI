const express = require("express");
require("dotenv").config({ path: [".env.local", ".env"], override: true });
const createDB = require("./lib/createDB");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.disable("x-powered-by");


app.use("/todo/v1", todoRoutes);

createDB();

module.exports = app;