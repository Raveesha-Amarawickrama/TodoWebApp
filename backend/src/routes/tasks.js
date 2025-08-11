const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createTask,
  listTasks,
  markDone,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

router.use(auth);
router.post('/', createTask);
router.get('/', listTasks);
router.put('/:id', updateTask);    // Added
router.delete('/:id', deleteTask); // Added
router.post('/:id/done', markDone);

module.exports = router;
