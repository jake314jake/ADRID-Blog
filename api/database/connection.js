import sqlite3 from "sqlite3";
import { promisify } from "util";

const db = new sqlite3.Database('./db.db', (err) => {
  if (err) {
    console.error('Database error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Promisify the necessary db methods
const dbGet = promisify(db.get).bind(db);
const dbRun = promisify(db.run).bind(db);
const dbAll = promisify(db.all).bind(db);

export  { db, dbGet, dbRun, dbAll };
