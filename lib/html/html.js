var
  stream = require('stream'),
  util   = require('util'),
  fs     = require('fs'),
  path   = require('path');

const DESCRIPTION_PLACEHOLDER = '__DESCRIPTION__';

var Provider = exports.Provider = function (format) {
  stream.Stream.call(this);

  this.fstream = fs.createReadStream(path.dirname(__filename) + '/body.html', {encoding: 'utf8'});
  this.fstream.pause();

  var self = this;
  this.fstream.on('error', function (error) {
    console.log('Stream error: ' + error);
  }).on('data', function (data) {
    self.emit('data', data.replace(DESCRIPTION_PLACEHOLDER, self.description));
  }).on('end', function () {
    self.emit('end');
  });
}

util.inherits(Provider, stream.Stream);

Provider.prototype.stream = function (description) {
  // TODO: render description as HTML and stream it
  this.description = 'var resourceDescription = ' + JSON.stringify(description);
  this.fstream.resume();
}

Provider.prototype.staticPrefix = function () {
  return 'html_static';
}
