const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
	user: 'root',
	password: '',
	database: 'connect4'
})

app.listen(3000, () => console.log('Listening on port 3000'));

app.use(parser.json());
app.use(cors());
app.use('/', express.static('./client/dist'));

app.get('/winner', function(req, res) {
	db.query('select * from winner;', function(err, results) {
		res.send(results);
	})
})

app.post('/winner', function(req, res) {
	db.query(`select * from winner where name = "${req.body.name}";`, function(err, results) {
		if (results) {
			results.total++;
			db.query(`update winner set total = ${results.total} where name = "${results.name}";`, function(err, results) {
				res.send('post updated')
			})
		} else {
			db.query(`insert into winner (name, total) values ("${req.body.name}", 1)`)
			res.send('post updated')
		}
	})
})