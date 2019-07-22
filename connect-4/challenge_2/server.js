const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();


const db = mysql.createConnection({
	user: 'root',
	password: '',
	database: 'csv'}
)
app.listen(3000, ()=>{console.log('listening on port 3000')});

app.use(parser.json());
app.use(cors());

app.use(express.static(__dirname + '/client'));

app.get('/asdf', function(req, res) {
	res.send({text: 'hello everyone'})
})


app.post('/csv', function(req, res) {
	const getData = (obj) => {
		let tempData = [];
		for (let key in obj){
			tempData.push(obj[key]);
		}
		data.push(tempData);
		for (var individual of obj.children){
			getData(individual)
		}
		return data;
	}
	let object = req.body;
	var data = [];
	let titles = [];
	let string = '';
	for (let key in object){
		titles.push(key);
	}
	getData(object);
	for (let i = 0; i < titles.length-1; i++){
		string += titles[i]
		if (i !== (titles.length-2)){string += ', ';}
	}
	string += '<br>';
	for (let i = 0; i < data.length; i++){
		for (let j = 0; j < data[i].length; j++){
			if (typeof data[i][j] === 'string'|| typeof data[i][j] === 'number'){
				string += data[i][j];
				if (j < (titles.length-2)) {string += ', '}}
		} 
		if (i !== (data.length-1)){string += '<br>'}
	}
	res.send({text: string})
	// db.query(`select name from data where name = "${req.body.name}"`, function(err, results) {
	// 	if (err){
	// 		res.send(err);
	// 	} 
	// 	if (results[0]){
	// 		db.query(`insert into data (text) where name = "${req.body.name}" values ("${string}");`, function(err, results) {
	// 			res.send(results);
	// 		})
	// 		res.send({text:string});
	// 	} else{
	// 	db.query(`insert into data (name, text) values ("${req.body.name}", "${string}");`, function(err, results) {
	// 		if (err){res.send(err)}
	// 		res.send({text: string});
	// 		})
	// 	}
	// })
})
