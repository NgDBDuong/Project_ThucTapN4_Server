const User = require('../models/usermodel');

// Thêm điểm thưởng vào tài khoản người dùng
exports.addReward = async (req, res) => {
  try {
    const { userId, pointsToAdd } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.points += pointsToAdd; // Cộng điểm thưởng vào số dư hiện tại
    await user.save();

    res.status(200).json({
      message: 'Rewards added successfully',
      totalPoints: user.points
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Lấy số dư điểm thưởng của người dùng
exports.getRewardsBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).json({
      userId: user._id,
      totalPoints: user.points
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Chuyển điểm thưởng từ người này sang người khác
exports.transferRewards = async (req, res) => {
  try {
    const { fromUserId, toUserId, pointsToTransfer } = req.body;
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser) {
      return res.status(404).send('One or both users not found');
    }

    if (fromUser.points < pointsToTransfer) {
      return res.status(400).send('Insufficient points');
    }

    // Thực hiện chuyển điểm
    fromUser.points -= pointsToTransfer;
    toUser.points += pointsToTransfer;
    await fromUser.save();
    await toUser.save();

    res.status(200).json({
      message: 'Rewards transferred successfully',
      fromUser: { userId: fromUser._id, totalPoints: fromUser.points },
      toUser: { userId: toUser._id, totalPoints: toUser.points }
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
