const db = require("../connection.js");

function selectTopics() {
  return db.query("SELECT * FROM topics").then((response) => response.rows);
}

module.exports = { selectTopics };
