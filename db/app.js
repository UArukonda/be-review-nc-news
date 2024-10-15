const express = require("express");
const { getTopics, getArticle } = require("./controllers/topics.controller.js");
const app = express();
const endpoints = require("../endpoints.json");

app.use(express.json());

//middleware
app.get("/api/topics", getTopics);

app.get("/api", (req, res) => {
  res.status(200).send({ endpoints });
});

app.get("/api/articles/:article_id", getArticle);

//last end point
app.all("*", (request, response, next) => {
  response.status(400).send({ msg: "Bad request" });
});

//error handling
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
