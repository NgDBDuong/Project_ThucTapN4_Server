const Task = require('../models/taskModel');

// Thêm nhiệm vụ mới
exports.addTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: req.user._id // Giả sử req.user chứa thông tin người dùng đã xác thực
    });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Lấy danh sách tất cả nhiệm vụ
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Cập nhật nhiệm vụ
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.taskId, createdBy: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    Object.keys(req.body).forEach(key => task[key] = req.body[key]);
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Xóa nhiệm vụ
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.taskId, createdBy: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
};
