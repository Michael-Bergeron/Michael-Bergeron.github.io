const express = require('express');
const mysql = require('mysql');
const parser = require('body-parser');
const cors = require('cors')


const app = express();
app.use(parser.json());
app.use(cors());

app.listen(3000, () => {
	console.log(`Items is listening on 3000`);
});

const db = mysql.createConnection({
		user: 'root',
		password: '',
		database: 'tic'
	});

app.use(express.static(__dirname));

app.post('/winner', (req, res) => {
    db.query(`select player, wins from games where player = "${req.body.player}";`, function (err, results) {
			if (err){
				console.log(err)
			}
			if (results[0]){
				let wins = results[0].wins + 1;
				db.query(`update games set wins = "${wins}" where player = "${results[0].player}";`, function(err, results) {
					res.send('success entry');
				})
			} else {
				db.query(`insert into games (player, wins) values ("${req.body.player}", 1);`, function(err, results) {
					res.send('success entry');
				})
			}
    })
})

app.get('/winner', (req, res) => {
	db.query('select * from games;', function (err, results) {
		if (err){ console.log(err); }
		console.log(results)
		res.send(results);
	})
})