var url = require('url'),
	querystring = require('querystring')

module.exports = function(req, res, next){
	req['urlObj'] = url.parse(req.url === '/' ? '/index.html' : req.url);
	req['queryData'] = querystring.parse(req.urlObj.query);
	var rawData = '';
	req.on('data', function(chunk){
		rawData += chunk;
	});
	req.on('end', function(){
		req['bodyData'] = querystring.parse(rawData);
		next();
	});
}

