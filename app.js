const express = require("express");
require("dotenv").config({ path: [".env.local", ".env"], override: true });
const createDB = require("./lib/createDB");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.disable("x-powered-by");
app.use(express.json());


app.use("/todo/v1", todoRoutes);

//404
app.use((req, res) => {
    res.status(404);
    res.json({ success: false, response: "This api endpoint doesn't exist,Navigate to working api endpoint" });
})


createDB();

module.exports = app;