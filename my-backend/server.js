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

// Reset password route
app.post('/profile', (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'your_secret_key');
    const { email } = decoded;

    // Update user's password in database
    const query = 'UPDATE user SET password = ? WHERE email = ?';
    db.query(query, [newPassword, email], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: err.message });
      }

      res.json({ message: 'Password updated successfully' });
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
});

// Register route
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Example: Insert user into database (you need to sanitize and hash passwords in production)
  const query = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to register user' });
    }
    res.json({ message: 'User registered successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://192.168.1.7:${port}`);
});
