const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool(config.db);

const createUser = async (username, password, address) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO players (user_name, password, address) VALUES ($1, $2, $4) RETURNING *",
    [username, hashedPassword, address]
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query(
    "SELECT * FROM players WHERE user_name = $1",
    [username]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByUsername,
};
