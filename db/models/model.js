const db = require("../connection.js");
const format = require("pg-format");

function selectTopics() {
  return db.query("SELECT * FROM topics").then((response) => response.rows);
}

function selectArticles(sort_by = "article_id", order = "ASC") {
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
        return Promise.reject({ status: 404, msg: "Id Not Found" });
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

function addComment(comment, id) {
  return db
    .query(
      format(
        `INSERT INTO comments (body, author, article_id) VALUES %L RETURNING *`,
        [[comment.comment, comment.username, id]]
      )
    )
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      if (
        err.detail === 'Key (author)=(abc) is not present in table "users".'
      ) {
        return Promise.reject({ status: 404, msg: "username does not exist" });
      } else if (err.code === "23503") {
        return Promise.reject({
          status: 404,
          msg: "Id Not Found(foreign key constraint violated)",
        });
      } else if (err.code === "23502") {
        return Promise.reject({
          status: 400,
          msg: "missing username to insert",
        });
      }
      return Promise.reject(err);
    });
}

module.exports = {
  selectTopics,
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  addComment,
};
