const express = require("express");
const route = express.Router();
const getData = require("../controllers/getTodo");


route.get("/", getData)

module.exports = route;