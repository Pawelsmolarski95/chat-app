const express = require('express');
const path = require('path');
const app = express();

let message = [];


app.use(express.static(path.join(__dirname, '/client')))


app.listen(8000, () => {
    console.log('Server is running');
})