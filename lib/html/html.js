var
  stream = require('stream'),
  util   = require('util'),
  fs     = require('fs'),
  path   = require('path');

var Provider = exports.Provider = function (format) {
  stream.Stream.call(this);

  this.fstream = fs.createReadStream(path.dirname(__filename) + '/body.html');
  this.fstream.pause();

  var self = this;
  this.fstream.on('error', function (error) {
    console.log('Stream error: ' + error);
  }).on('data', function (data) {
    self.emit('data', data);
  }).on('end', function () {
    self.emit('end');
  });
}

util.inherits(Provider, stream.Stream);

Provider.prototype.stream = function (description) {
  // TODO: render description as HTML and stream it
  this.fstream.resume();
}

Provider.prototype.staticPrefix = function () {
  return 'html_static';
}
