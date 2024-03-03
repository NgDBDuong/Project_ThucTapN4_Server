const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const rewardRoutes = require('./routes/rewardRoutes');

const app = express();
app.use(express.json());

const port = 3000;
const API_KEY ='r_dyunuuAWO7c5DU';


// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/thuctap',{useNewUrlParser: true }).then(() => {
    console.log('Connect completed');
}).catch((err) => {
    console.log(`Connect failed ${err}`);
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

// Định nghĩa các routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/rewards', rewardRoutes);  

// Endpoint để lấy thông tin về số dư của tài khoản
app.get('/api/rewardBalance/:walletAddress', async (req, res) => {
    try {
        const walletAddress = new PublicKey(req.params.walletAddress);
        const balance = await connection.getBalance(walletAddress);
        res.json({ balance: balance / LAMPORTS_PER_SOL });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port,() => {
    console.log(`Server is running at the ${port}`);
})