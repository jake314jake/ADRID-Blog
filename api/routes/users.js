import express from "express";
import { dbAll, dbRun } from "../database/connectionDB.js";

import verifyToken from "./auth.js"
const router = express.Router();


// GET /api/users - Retrieve all users
router.get('/', verifyToken,(req, res) => {
  dbAll('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST /api/users - Create a new user
router.post('/', (req, res) => {
  const { username, password } = req.body;
  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  const params = [username, password];

  dbRun(sql, params, function(err) {
    if(!username || !password){
      res.status(500).json({ error: "username and password can't be empty!" });
      return;
    }
    if (err ) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

// PUT /api/users/:id - Update a user by ID
router.put('/:id', (req, res) => {
  const { username, password } = req.body;
  const { id } = req.query;
  const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
  const params = [username, password, id];

  dbRun(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

// DELETE /api/users/:id - Delete a user by ID
router.delete('/:id', (req, res) => {
  const { id } = req.query;
  const sql = 'DELETE FROM users WHERE id = ?';
  const params = [id];

  dbRun(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ changes: this.changes });
  });
});

export default router;
