var fs = require('fs');

var stream = fs.createReadStream('./sample.txt', {encoding : 'utf8'});

/*stream.on('data', function(chunk){
	console.log(chunk);
});

stream.on('end', function(){
	console.log('Thats all folks!');
})*/

stream.pipe(process.stdout);

var readCount = 0;
stream.on('data', function(chunk){
	++readCount;
});

stream.on('end', function(){
	console.log('Thats all folks!');
	console.log('Read operation completed with ' + readCount + ' reads');
})

stream.on('error', function(err){
	console.log(err);
});
