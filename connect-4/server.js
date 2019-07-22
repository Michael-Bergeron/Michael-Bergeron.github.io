const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// const db = mysql.createConnection({
//     user: 'root',
//     password: '',
//     database: 'connectFour'
// })

app.listen(3000, () => console.log('Listening on port 3000'));

app.use('/',express.static('./client/dist'));
