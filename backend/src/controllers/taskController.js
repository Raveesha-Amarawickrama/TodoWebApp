const pool = require('../db');

const createTask = async (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });

  try {
    const [result] = await pool.query(
      'INSERT INTO task (user_id, title, description) VALUES (?, ?, ?)',
      [userId, title, description || null]
    );

    const [rows] = await pool.query(
      'SELECT id, title, description, created_at FROM task WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const listTasks = async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await pool.query(
      'SELECT id, title, description, created_at FROM task WHERE user_id = ? AND completed = 0 ORDER BY created_at DESC LIMIT 5',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const markDone = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const [result] = await pool.query(
      'UPDATE task SET completed = 1 WHERE id = ? AND user_id = ?',
      [taskId, userId]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Task not found' });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;
  const { title, description } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE task SET title = ?, description = ? WHERE id = ? AND user_id = ?',
      [title, description, taskId, userId]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Task not found' });

    const [rows] = await pool.query(
      'SELECT id, title, description, created_at FROM task WHERE id = ?',
      [taskId]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const [result] = await pool.query(
      'DELETE FROM task WHERE id = ? AND user_id = ?',
      [taskId, userId]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createTask, listTasks, markDone, updateTask, deleteTask };
