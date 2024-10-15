const db = require("../connection.js");

function selectTopics() {
  return db.query("SELECT * FROM topics").then((response) => response.rows);
}

function selectArticle(id) {
  return db
    .query("SELECT * FROM articles WHERE article_id=$1", [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows;
    });
}

module.exports = { selectTopics, selectArticle };
