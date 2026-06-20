const express = require("express");
require("dotenv").config({ path: [".env.local", ".env"], override: true });
const createDB = require("./lib/createDB");

const app = express();

createDB();

module.exports = app;