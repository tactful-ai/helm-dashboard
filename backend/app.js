const express = require("express");

const app = express();

const cors = require("cors");

const helmRouter = require("./routes/helmRoter");

app.use(cors());

// middlewares
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use("/api/v1/helm", helmRouter);

module.exports = app;
