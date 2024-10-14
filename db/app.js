const express = require("express");
const { getTopics } = require("./controllers/topics.controller.js");
const app = express();

app.use(express.json());

//middleware
app.get("/api/topics", getTopics);

//last end point
app.all("*", (request, response, next) => {
  response.status(404).send({ msg: "Not Found" });
});

//error handling
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
