const db = require("../connection.js");
const format = require("pg-format");

// TOPIC models
function selectTopics() {
  return db.query("SELECT * FROM topics").then((response) => response.rows);
}

// ARTICLE models
function selectArticles(sort_by = "created_at", order = "asc") {
  const allowedSorts = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];
  const allowedOrders = ["asc", "desc"];
  if (!allowedSorts.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by value" });
  }

  if (!allowedOrders.includes(order.toLowerCase())) {
    return Promise.reject({ status: 400, msg: "Invalid order value" });
  }
  return db
    .query(
      `SELECT articles.author,articles.title,articles.article_id,articles.topic,articles.created_at,articles.votes, articles.article_img_url,CAST(COUNT(comments.body) AS INTEGER) AS comment_count FROM articles LEFT JOIN comments on articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.${sort_by} ${order}`
    )
    .then((response) => {
      return response.rows;
    })
    .catch((err) => console.log(err));
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

function updateArticle(votes, id) {
  if (typeof votes !== "number") {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  return db
    .query(
      `UPDATE articles SET votes = votes+$1 WHERE article_id = $2 RETURNING *`,
      [votes, id]
    )
    .then((res) => {
      if (res.rows.length === 0) {
        // Check if the article exists
        return db
          .query("SELECT * FROM articles WHERE article_id = $1", [id])
          .then((articleRes) => {
            if (articleRes.rows.length === 0) {
              return Promise.reject({ status: 404, msg: "Article Not Found" });
            }
          });
      }
      return res.rows;
    })
    .catch((err) => {
      if (err.code === "23502") {
        return Promise.reject({ status: 400, msg: "Bad request" });
      }
      return Promise.reject(err);
    });
}

// COMMENT models
function selectCommentsByArticleId(id) {
  return db
    .query(
      `SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body, comments.article_id FROM comments LEFT JOIN articles ON articles.article_id = comments.article_id WHERE articles.article_id = ${id}`
    )
    .then((response) => {
      if (response.rows.length === 0) {
        return db
          .query("SELECT * FROM articles WHERE article_id = $1", [id])
          .then((articleRes) => {
            if (articleRes.rows.length === 0) {
              return Promise.reject({ status: 404, msg: "Id Not Found" });
            } else {
              return []; // Article exists, but no comments
            }
          });
      }
      return response.rows;
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
        err.detail ===
        `Key (author)=(${comment.username}) is not present in table "users".`
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

function deleteCommentById(id) {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [id])
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
      return res.rows;
    });
}

// USERS models
function selectUsers() {
  return db.query("SELECT * FROM users").then((res) => {
    return res.rows;
  });
}

module.exports = {
  selectTopics,
  selectArticleById,
  selectArticles,
  selectCommentsByArticleId,
  addComment,
  updateArticle,
  deleteCommentById,
  selectUsers,
};
