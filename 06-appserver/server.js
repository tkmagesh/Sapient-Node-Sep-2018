var http = require('http'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');


var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url);
	if (urlObj.pathname === '/calculator'){
		var queryData = querystring.parse(urlObj.query);
		var op = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2);
		var result = calculator[op](n1,n2);
		res.write(result.toString());
		res.end();
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8085);
console.log('calculator server listening on 8085');