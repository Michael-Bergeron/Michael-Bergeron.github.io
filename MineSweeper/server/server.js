const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const path = require('path');
const app = express();

app.use(cors());
app.use(parser.json());
app.use(express.static(path.join(__dirname, '../dist')))

app.listen(3005, ()=> console.log('listening on port 3005'));