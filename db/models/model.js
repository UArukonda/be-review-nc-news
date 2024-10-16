const db = require("../connection.js");

function selectTopics() {
  return db.query("SELECT * FROM topics").then((response) => response.rows);
}

function selectArticles(sort_by = "article_id", order = "ASC") {
  //   console.log(sort_by);
  //   const allowed_sorts = ["article_id", "created_at", "topic", "author"];
  //   if (!allowed_sorts.includes(sort_by)) {
  //     return Promise.reject({ status: 404, msg: "Invalid input" });
  //   }
  //   let orderstring = "";
  //   if (order) {
  //     orderstring = order.toUpperCase();
  //   }
  //   let query = "SELECT * FROM articles";

  //   if (sort_by) {
  //     query += `ORDER BY ${sort_by}`;
  //   }

  return db
    .query(
      `SELECT articles.author,articles.title,articles.article_id,articles.topic,articles.created_at,articles.votes, articles.article_img_url,CAST(COUNT(comments.body) AS INTEGER) AS comment_count FROM articles LEFT JOIN comments on articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC`
    )
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

function selectCommentsByArticleId(id) {
  return db
    .query(
      `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments LEFT JOIN articles ON articles.article_id = comments.article_id WHERE articles.article_id = ${id}`
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
      return rows;
    });
}

module.exports = {
  selectTopics,
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
};
