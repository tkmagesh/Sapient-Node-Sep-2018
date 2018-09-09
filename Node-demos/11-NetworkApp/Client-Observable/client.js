var net = require("net");
const split = require('split');

var RxNode = require('rx-node');

var socket = net.connect(8080);

socket.setEncoding("utf8");
socketStream = socket.pipe(split(/(\r?\n)/));

RxNode.fromStream(socket, 'data')
	.map(chunk => JSON.parse(chunk))
	.subscribe(message => {
		if (message.type === 'watching'){
        	console.log('The server has started watching the file');
	    } else if (message.type === 'change'){
	        console.log('The file has changed at ' + message.timestamp);
	    }	
	});
