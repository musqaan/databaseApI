// Example DB operations like fetching users
const db = require('../config/db');

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT id, name, email, role FROM users', (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = { getAllUsers };
