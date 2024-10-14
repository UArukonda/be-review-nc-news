const { selectTopics } = require("../models/topics.model.js");

function getTopics(req, res, next) {
  return selectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
}

module.exports = { getTopics };
