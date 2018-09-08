var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.css', '.js', '.jpg', '.png', '.ico', '.xml', '.json', '.txt'];

function isStatic(resource){
	return staticExtns.indexOf(path.extname(resource)) >= 0;
}

module.exports = function(req, res, next){
	if (isStatic(req.urlObj.pathname)){
		var resourceName = path.join(__dirname, req.urlObj.pathname);
		if (!fs.existsSync(resourceName)){
			res.statusCode=404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resourceName);
		stream.pipe(res);
		stream.on('end', function(){
			res.end();
			next();
		});
	} else {
		next();
	}
}