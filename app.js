var express = require('express')
var math = require('mathjs')
var numbers = require('numbers')
var numeric = require('numeric')
var app = express()

app.use('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept');
  next();
});

app.get('/operation/add', function(req, res) {
	res.type('text/plain');
	var matrices = parseParameters(req);
	if (matrices.length == 2) {
		var result = (math.add(math.matrix(matrices[0]), math.matrix(matrices[1]))).valueOf();
		res.send(result);
	} else {
		res.send('You have to send two Matrix objects.')
	}
})

app.get('/operation/multiply', function(req, res) {
	res.type('text/plain');
	var matrices = parseParameters(req);
	var result = (math.multiply(math.matrix(matrices[0]), math.matrix(matrices[1]))).valueOf();
	res.send(result);
})

app.get('/operation/determinant', function(req, res) {
	res.type('text/plain');
	var matrices = parseParameters(req);
	if (matrices.length > 0) {
		var result = math.det(math.matrix(matrices[0]));
		res.send(result.toString());
	} else {
		res.send('You have to provide matrix.')
	}
})

app.get('/operation/transposition', function(req, res) {
	res.type('text/plain');
	var matrices = parseParameters(req);
	var result = (math.transpose(math.matrix(matrices[0]))).valueOf();
	res.send(result);
})

app.get('/operation/trace', function(req, res) {
	res.type('text/plain');
	var matrices = parseParameters(req);
	if (matrices.length > 0) {
		var matrix = matrices[0]
		if (isMatrixSquare(matrix)) {
			var trace = 0;
			for (var i = 0; i < matrix.length; i++) {
				trace += matrix[i][i];
			}
			res.send(trace.toString());
		} else {
			res.send('Matrix must be squared');
		}
	} else {
		res.send('You have to provide matrix.')
	}
})

app.get('/operation/upperTriangeMatrix', function(req, res){
	res.type('text/plain');
	var matrices = parseParameters(req);
	if (matrices.length > 0) {
		var matrix = matrices[0];
		if (isMatrixSquare(matrix)) {
			for (var i = 0; i < matrix.length; i++) {
				for (var j = 0; j < matrix[i].length; j++) {
					if (i > j) {
						matrix[i][j] = 0;
					}
				}
			}
			res.send(matrix);
		} else {
			res.send('Matrix must be squared')
		}
	} else {
		res.send('You have to provide matrix');
	}
})

app.get('/operation/LUdecomposition', function(req, res) {
	res.type('text/plain');
	var matrices = parseParameters(req);
	if (matrices.length > 0) {
		var matrix = matrices[0];		
		var result = numeric.cLU(matrix);
		res.send(result);
	} else {
		res.send('You have to provide matrix');
	}
})

function parseParameters(requestParams) {
	var data = [];
	if (requestParams.query['firstMatrix']) {
		data.push(JSON.parse(requestParams.query['firstMatrix']));
	}

	if (requestParams.query['secondMatrix']) {
		data.push(JSON.parse(requestParams.query['secondMatrix']));
	}
	return data;
}

function isMatrixSquare(matrix) {
	for (var row = 0; row < matrix.length; row++ ) {
		if (matrix[row].length != matrix.length) {
			return false;
		}
	}
	return true
}

app.listen(process.env.PORT || 4730)