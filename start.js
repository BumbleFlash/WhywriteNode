var http= require("http");
var fs = require('fs');
var index = fs.readFileSync('file.js');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/javascript'});
  res.sendfile(index);
}).listen(8081);