var http = require('http');

var server = http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	res.end(JSON.stringify({
		message: '接口请求成功'
	}));
});

server.listen(17500);

console.log('Server is running at http://localhost:17500/');