var connect = require('connect');
var fs = require('fs');

var server = connect.createServer();

server.use(connect.static(__dirname));
server.use(require('browserify')({
    mount : '/browserify.js',
    require : [ 'fs' ]
}));

server.listen(8001);
console.log('Listening on 8001...');
