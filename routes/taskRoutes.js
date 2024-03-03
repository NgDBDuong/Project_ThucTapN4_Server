const express = require('express');
const router = express.Router();
const { addTask, getAllTasks, updateTask, deleteTask } = require('../controllers/tasksController');

// Endpoint để thêm nhiệm vụ mới
router.post('/', addTask);

// Endpoint để lấy tất cả nhiệm vụ
router.get('/', getAllTasks);

// Endpoint để cập nhật nhiệm vụ
router.put('/:taskId', updateTask);

// Endpoint để xóa nhiệm vụ
router.delete('/:taskId', deleteTask);

module.exports = router;
