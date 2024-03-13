const express = require('express');
const router = express.Router();
const { addReward, getRewardsBalance, transferRewards } = require('../controller/rewardsController');

// Endpoint để thêm điểm thưởng vào tài khoản người dùng
router.post('/add', addReward);

// Endpoint để lấy số dư điểm thưởng của người dùng
router.get('/balance/:userId', getRewardsBalance);

// Endpoint để chuyển điểm thưởng từ người này sang người khác
router.post('/transfer', transferRewards);

module.exports = router;
