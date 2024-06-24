const { Pool } = require("pg");
require("dotenv").config();

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

// Chat controller
const chatController = {
  add: async (req, res) => {
    const { chat_id, user_id, isi } = req.body;
    const timestamp = new Date().toISOString();
    try {
      await pool.query("INSERT INTO chat (chat_id, user_id, isi, timestamp) VALUES ($1, $2, $3, $4)", [chat_id, user_id, isi, timestamp]);
      res.status(201).send("Chat added successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const { isi } = req.body;
    try {
      await pool.query("UPDATE chat SET isi = $1, timestamp = $2 WHERE id = $3", [isi, new Date().toISOString(), id]);
      res.status(200).send("Chat updated successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query("DELETE FROM chat WHERE id = $1", [id]);
      res.status(200).send("Chat deleted successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getChatById: async (req, res) => {
    const { id } = req.params;
    try {
      const chat = await pool.query("SELECT * FROM chat WHERE chat_id = $1", [id]);
      if (chat.rows.length === 0) {
        return res.status(404).send("Chat not found");
      }
      res.status(200).send(chat.rows);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = chatController;
