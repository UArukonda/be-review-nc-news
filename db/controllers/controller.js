const { request } = require("../app.js");
const {
  selectTopics,
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  addComment,
  updateArticle,
  deleteCommentById,
  selectUsers,
} = require("../models/model.js");

// TOPIC controllers
function getTopics(req, res, next) {
  return selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
}

// ARTICLE controllers
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

function updateArticleById(req, res, next) {
  const articleId = req.params.article_id;
  const { inc_votes } = req.body;
  return updateArticle(inc_votes, articleId)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

// COMMENT controllers
function getCommentsByArticleId(req, res, next) {
  const articleId = req.params.article_id;
  return selectCommentsByArticleId(articleId)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => next(err));
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

function deleteComment(req, res, next) {
  const { comment_id } = req.params;
  return deleteCommentById(comment_id)
    .then(([deletedComment]) => {
      res.status(204).send({ deletedComment });
    })
    .catch((err) => {
      next(err);
    });
}

// USERS controllers
function getUsers(req, res, next) {
  return selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => next(err));
}

module.exports = {
  getTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
  addCommentByArticleId,
  updateArticleById,
  deleteComment,
  getUsers,
};
