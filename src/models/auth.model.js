const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  selectByUsername: (username) =>
    new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE username=$1",
        [username],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
  register: (body) =>
    new Promise((resolve, reject) => {
      const { username, password } = body;

      db.query(
        "INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING id",
        [uuidv4(), username, password],
        (error, result) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    }),
};
