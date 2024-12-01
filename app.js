const express = require("express");
const logger = require("morgan");
const path = require("path");
const api = require("./api");

const app = express();

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "docs")));
app.use("/api", api);

// Fetch Nav JSON
app.get("/api", (req, res) => {
	res.sendFile(path.join(__dirname, "data/nav.json"));
});

module.exports = app;
