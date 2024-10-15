const db = require("../connection.js");

function selectTopics() {
  return db.query("SELECT * FROM topics").then((response) => response.rows);
}

function selectArticles() {
  //   const allowed_sorts = ["article_id", "created_at", "topic", "author"];
  //   if (allowed_sorts.includes(sort_by)) {
  //     return Promise.reject({ status: 404, msg: "Invalid input" });
  //   }
  return db
    .query("SELECT * FROM articles") //ORDER BY created_at DESC
    .then((response) => {
      return response.rows;
    });
}

function selectArticleById(id) {
  return db
    .query("SELECT * FROM articles WHERE article_id=$1", [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows;
    });
}

module.exports = { selectTopics, selectArticleById, selectArticles };
