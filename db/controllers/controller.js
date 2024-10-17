const { request } = require("../app.js");
const {
  selectTopics,
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  addComment,
} = require("../models/model.js");

function getTopics(req, res, next) {
  return selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
}

function getArticles(req, res, next) {
  return selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

function getArticleById(req, res, next) {
  const articleId = req.params.article_id;
  return selectArticleById(articleId)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

function getCommentsByArticleId(req, res, next) {
  const articleId = req.params.article_id;
  return selectCommentsByArticleId(articleId)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
}

function addCommentByArticleId(req, res, next) {
  const comment = req.body;
  const articleId = req.params.article_id;
  return addComment(comment, articleId)
    .then(([response]) => {
      res.status(201).send({ insertedComment: response });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  addCommentByArticleId,
};
