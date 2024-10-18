const express = require("express");
const {
  getTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  addCommentByArticleId,
  updateArticleById,
} = require("./controllers/controller.js");
const app = express();
const endpoints = require("../endpoints.json");

app.use(express.json());

//middleware

// task 2
app.get("/api/topics", getTopics);

// task 3
app.get("/api", (req, res) => {
  res.status(200).send({ endpoints });
});

// task 4
app.get("/api/articles/:article_id", getArticleById);

// task 5
app.get("/api/articles", getArticles);

// task 6
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

// task 7
app.post("/api/articles/:article_id/comments", addCommentByArticleId);

// task 8
app.patch("/api/articles/:article_id", updateArticleById);

//last end point
app.all("*", (request, response, next) => {
  response.status(400).send({ msg: "Bad request" });
});

//error handling
app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "42703") {
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
