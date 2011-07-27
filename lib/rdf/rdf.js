var
  raptor = require('raptor'),
  stream = require('stream'),
  util   = require('util');

var Provider = exports.Provider = function (format) {
  stream.Stream.call(this);

  var self = this;
  this.serializer = raptor.newSerializer(format);
  this.serializer.on('data', function (data) {
    self.emit('data', data);
  }).on('message', function (type, message, code) {
    if (type == 'error' || type == 'warning') {
      console.log('Serializer ' + type + ': ' + message + ' (' + code + ')');
    }
  }).on('end', function () {
    self.emit('end');
  });
}

util.inherits(Provider, stream.Stream);

Provider.prototype.stream = function (description) {
  this.serializer.serializeStart();
  for (var subject in description) {
    var
      type = 'uri',
      subjectName = subject,
      parts = subject.split(':', 2);

    if ((parts.length === 2) && (parts[0] === '_')) {
      type = 'bnode';
      subjectName = parts[1];
    }

    for (var predicate in description[subject]) {
      for (var index in description[subject][predicate]) {

        var object = description[subject][predicate][index];
        var statement = {
          'subject': {type: type, value: subjectName},
          'predicate': {type: 'uri', value: predicate},
          'object': {type: object.type, value: object.value}
        }

        if (object.datatype) {
          statement.object.datatype = object.datatype;
          statement.object.type = 'typed-literal';
        } else if (object.lang) {
          statement.object.lang = object.lang;
        }

        this.serializer.serializeStatement(statement);
      }
    }
  }
  this.serializer.serializeEnd();
}

