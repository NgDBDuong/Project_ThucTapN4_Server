const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/thuctap',{useNewUrlParser: true }).then(() => {
    console.log('Connect completed');
}).catch((err) => {
    console.log(`Connect failed ${err}`);
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.listen(port,() => {
    console.log(`Server is running at the ${port}`);
})