const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => res.json({ ok: true }));

// 404 handler
app.use((req, res) => {
  console.log(`No route for ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
