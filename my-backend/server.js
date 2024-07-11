const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '', // your MySQL password
  database: 'prototype_react' // your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Login route
app.post('/login', (req, res) => {
  console.log(req.body); // Log request body
  const { username, password } = req.body;

  const query = 'SELECT * FROM user WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Audit data route
app.get('/hasil_audit', (req, res) => {
  const query = 'SELECT * FROM audit';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Input audit data
app.post('/audit', (req, res) => {
  const { id, user_id, judul, area, tanggal_audit, tanggal_close } = req.body;

  const query = 'INSERT INTO audit (id, user_id, judul, area, tanggal_audit, tanggal_close) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [id, user_id, judul, area, tanggal_audit, tanggal_close], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Audit data inserted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://192.168.186.122:${port}`);
});
