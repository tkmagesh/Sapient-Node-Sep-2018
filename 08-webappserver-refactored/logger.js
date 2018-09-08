var chalk = require('chalk');

module.exports = function(req, res, next){
	console.log(chalk.underline.blue(req.method) + '\t' + chalk.red.bold(req.urlObj.pathname));
	next();
}