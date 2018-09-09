function promisify(fn){
	return function(...args){
		return new Promise(function(resolveFn, rejectFn){
			fn(...args, function(err, ...resultArgs){
				if (err){
					rejectFn(err);
					return;
				}
				resolveFn(...resultArgs);
			});
		});
	}
}

/*function asyncApi(no, callback){
	setTimeout(function(){
		if (no % 2 === 0)
			return callback(null, no * 100);
		return callback(new Error('Invalid args'));
    }, 5000);
}

var newAsyncApi = promisify(asyncApi)

newAsyncApi(10)
	.then(result => console.log(result))
	.catch(err => console.log(err));


newAsyncApi(9)
	.then(result => console.log(result))
	.catch(err => console.log(err));
*/


module.exports.promisify = promisify;