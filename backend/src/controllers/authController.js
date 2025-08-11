const pool = require('../db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  username = username.trim().toLowerCase();

  try {
    const [exists] = await pool.query('SELECT id FROM user_account WHERE LOWER(username) = ?', [username]);
    if (exists.length) return res.status(400).json({ error: 'username exists' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query('INSERT INTO user_account (username, password_hash) VALUES (?, ?)', [username, hash]);

    const id = result.insertId;
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET);

    // Respond with status 201 Created
    res.status(201).json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

const login = async (req, res) => {
  let { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  username = username.trim().toLowerCase();

  try {
    const [rows] = await pool.query('SELECT * FROM user_account WHERE LOWER(username) = ?', [username]);
    if (!rows.length) return res.status(400).json({ error: 'invalid credentials' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: 'invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

const me = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, username, created_at FROM user_account WHERE id = ?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ error: 'user not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
};

module.exports = { register, login, me };
