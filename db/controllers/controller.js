const { request } = require("../app.js");
const {
  selectTopics,
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
} = require("../models/model.js");

function getTopics(req, res, next) {
  return selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
}

function getArticles(req, res, next) {
  //   let sort_by, order;
  //   if (req.query) {
  //     sort_by = req.query.sort_by;
  //     order = req.query.order;
  //   }
  return selectArticles() //sort_by, order
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => console.log(err));
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

module.exports = {
  getTopics,
  getArticleById,
  getArticles,
  getCommentsByArticleId,
};
