var http = require('http'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	fs = require('fs'),
	calculator = require('./calculator');

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) >= 0;
}

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url === '/' ? '/index.html' : req.url);
	console.log(req.method + '\t' + urlObj.pathname);
	if (isStatic(urlObj.pathname)){
		var resourceName = path.join(__dirname, urlObj.pathname);
		if (!fs.existsSync(resourceName)){
			res.statusCode=404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resourceName);
		stream.pipe(res);
	}
	else if (urlObj.pathname === '/calculator' && req.method === 'GET'){
		var queryData = querystring.parse(urlObj.query);
		var op = queryData.op,
			n1 = parseInt(queryData.n1),
			n2 = parseInt(queryData.n2);
		var result = calculator[op](n1,n2);
		res.write(result.toString());
		res.end();
	} else if (urlObj.pathname === '/calculator' && req.method === 'POST'){
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var bodyData = querystring.parse(rawData);
			var op = bodyData.op,
				n1 = parseInt(bodyData.n1),
				n2 = parseInt(bodyData.n2);
			var result = calculator[op](n1,n2);
			res.write(result.toString());
			res.end();	
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);
console.log('server listening on 8080');