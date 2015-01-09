var express = require('express')
var math = require('mathjs')
var app = express()

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', function(req, res) {
	res.type('text/plain');
	res.send('i am a beautiful butterfly')
})

app.get('/operation/add', function(req, res) {
	res.type('text/plain');
	var matrices = parseParameters(req);
	var result = math.add(matrices[0], matrices[1]);
	res.send(result);
})

app.get('/operation/multiply', function(req, res) {
	res.type('text/plain');
	var matrices = parseParameters(req);
	var result = math.multiply(matrices[0], matrices[1]);
	res.send(result);
})

function parseParameters(requestParams) {
	var data = [];
	var firstArrayMatrix = JSON.parse(requestParams.query['firstMatrix']);
	if (firstArrayMatrix) {
		data.push(math.matrix(firstArrayMatrix))
	}
	var secondArrayMatrix = JSON.parse(requestParams.query['secondMatrix']);
	if (secondArrayMatrix) {
		data.push(math.matrix(secondArrayMatrix))
	}
	return data;
}


app.listen(process.env.PORT || 4730)