const { selectTopics, selectArticle } = require("../models/topics.model.js");

function getTopics(req, res, next) {
  return selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
}

function getArticle(req, res, next) {
  const articleId = req.params.article_id;
  return selectArticle(articleId)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getTopics, getArticle };
