var app = (function(){
	function addAsync(x,y,callback){
		setTimeout(function(){
			result = x + y;
			callback(result);
		},3000)
	}

	function addAsyncPromise(x,y){
		var p = new Promise(function(resolveFn, rejectFn){
			setTimeout(function(){
				result = x + y;
				console.log('[@Service] operation completed');
				resolveFn(result);
			},3000)
		});
		return p;
	}

	return { 
		addAsync :  addAsync,
		addAsyncPromise : addAsyncPromise
	}

})();

//Using the above api

var p = app.addAsyncPromise(100,200);
var p2 = p.then(function(result){
	console.log('result = ', result);

	//Follow up operation is async
	/*return new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
			resolveFn(result * 2);
        }, 4000);
    });*/

    //Follow up operation is sync

    //option : 1
	/*return new Promise(function(resolveFn, rejectFn){
		resolveFn(result * 2);
    });*/
	
	//option : 2
	//return Promise.resolve(result * 2);
	
	//option : 3
	return result * 2;
});

p2.then(function(doubleResult){
	console.log('double Result = ', doubleResult);
})