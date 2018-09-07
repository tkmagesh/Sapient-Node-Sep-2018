var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url');

var server = http.createServer(function(req, res){
	console.log(req.method + '\t' + req.url);
	var urlObj = url.parse(req.url);
	var resourceName = path.join(__dirname, urlObj.pathname);
	if (!fs.existsSync(resourceName)){
		res.statusCode=404;
		res.end();
		return;
	}
	var stream = fs.createReadStream(resourceName);
	stream.pipe(res);
});
server.listen(8080);
console.log('server listening on port 8080');