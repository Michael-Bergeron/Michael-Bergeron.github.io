create database checkout;

use checkout;

create table purchase (
  id serial,
	name varchar(35),
	email varchar(30),
	password varchar(15),
	address varchar(15),
	address2 varchar(15),
	city varchar(15),
	state varchar(15),
	zipCode varchar(15),
	phone varchar(15),
	CC varchar(16),
	exp varchar(15),
	CVV varchar(3),
	billZip varchar(15)
)