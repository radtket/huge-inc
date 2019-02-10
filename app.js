const express = require("express");
const logger = require("morgan");
const path = require("path");
const api = require("./api");

const app = express();

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", api);

module.exports = app;
