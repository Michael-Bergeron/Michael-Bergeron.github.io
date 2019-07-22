const express = require('express');
const mysql = require('mysql');
const parser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const db = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'checkout'
})

db.connect();

app.listen(3000, ()=> {
    console.log('listening on port 3000')
})

app.use(cookieParser())
app.use('/',express.static('public'));
app.use(parser.json());
app.use(cors());

app.get('/newAccount', function(req, res) {
	if (Object.keys(req.cookies).length){
		db.query(`select * from purchase where id = ${req.cookies.checkoutCookie};`, function(err, results) {
			if (err){console.log(err)}
			else {
				res.send(results)
			}
		})
	} else {
	db.query('insert into purchase (id) values (null);', function(err, results) {
		if (err){console.log(err)}
		else {
			res.cookie('checkoutCookie', results.insertId).send(results)
		}
	})
}
})

app.post('/updateAccount', function(req, res) {
	db.query(`update purchase set name = '${req.body.name}', email = '${req.body.email}', password = '${req.body.password}'
	, address = '${req.body.address}', address2 = '${req.body.address2}', city = '${req.body.city}', state = '${req.body.state}', zipCode = '${req.body.zipCode}'
	, phone = '${req.body.phone}', CC = '${req.body.CC}', exp = '${req.body.exp}', CVV = '${req.body.CVV}', billZip = '${req.body.billZip}' where id = ${req.body.id};`, 
	function(err, results) {
		if (err){console.log(err)}
			res.send('successful post');
		})
})

app.post('/complete', function(req,res) {
	db.query
	res.cookie('checkoutCookie', req.cookies.checkoutCookie, {maxAge: 0})
	res.send('purchase finished and cookies cleared')
})