const { Pool } = require("pg");
require("dotenv").config();
const bcrypt = require("bcrypt");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // This disables certificate verification (not recommended for production)
  },
});

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    let hashPass = user.rows[0].password;
    let compare = await bcrypt.compare(password, hashPass);
    if (compare) {
      res.status(200).send({ message: "Sukses Login", body: user.rows[0] });
    } else {
      res.status(401).send("Password salah");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function signup(req, res) {
  const { username, password, img_url, bio } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await pool.query("INSERT INTO users (username, password, img_url, bio) VALUES ($1, $2, $3, $4)", [username, hashedPassword, img_url, bio]);
    res.status(201).send("Sukses signup");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getUserById(req, res) {
  const user_id = req.params.id;
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1;", [user_id]);
    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getUserByUsername(req, res) {
  const username = req.params.username;
  try {
    const user = await pool.query("SELECT * FROM users WHERE username = $1;", [username]);
    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(user.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

async function updateUserProfile(req, res) {
  const user_id = req.params.id;
  const { username, password, img_url, bio } = req.body;
  try {
    // Fetch the current user data
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [user_id]);
    if (userResult.rows.length === 0) {
      return res.status(404).send("User not found");
    }
    const user = userResult.rows[0];

    // Update fields if provided in the request body
    const newUsername = username || user.username;
    const newImgUrl = img_url || user.img_url;
    const newBio = bio || user.bio;

    // If password is provided, hash it
    let newPassword = user.password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(password, salt);
    }

    // Update user in the database
    await pool.query("UPDATE users SET username = $1, password = $2, img_url = $3, bio = $4 WHERE id = $5", [newUsername, newPassword, newImgUrl, newBio, user_id]);

    res.status(200).send("User profile updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  login,
  signup,
  getUserById,
  updateUserProfile,
  getUserByUsername,
};
