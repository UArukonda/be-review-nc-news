const { request } = require("../app.js");
const {
  selectTopics,
  selectArticleById,
  selectArticles,
} = require("../models/topics.model.js");

function getTopics(req, res, next) {
  return selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
}

function getArticles(req, res, next) {
  //   const { sort_by, order } = request.query;
  return selectArticles().then((articles) => {
    res.status(200).send({ articles });
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

module.exports = { getTopics, getArticleById, getArticles };
