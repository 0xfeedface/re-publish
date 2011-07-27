var Memory = exports.Memory = function () {
  var
    _statements = {},   // plain statements
    _descriptions = {}; // cached descriptions

  function _nodeID(key) {
    return ('_:' + key);
  };

  function _descriptionForResource(resourceID) {
    if (undefined !== _descriptions[resourceID]) {
      return _descriptions[resourceID];
    }

    _descriptions[resourceID] = {};
    _descriptions[resourceID][resourceID] = {};

    var bNodes = [];
    _statements[resourceID].forEach(function (statement) {
      if (statement.object.type === 'bnode') {
        bNodes.push(_nodeID(statement.object.value));
      }
    
      if (undefined === _descriptions[resourceID][resourceID]) {
        _descriptions[resourceID][resourceID] = {};
      }

      if (undefined === _descriptions[resourceID][resourceID][statement.predicate.value]) {
        _descriptions[resourceID][resourceID][statement.predicate.value] = [];
      }
      
      var object = {
        type: statement.object.type,
        value: statement.object.value
      };

      if (statement.object.datatype) {
        object.datatype = statement.object.datatype;
        object.type = 'literal';  // replace typed-literal
      } else if (statement.object.lang) {
        object.lang = statement.object.lang;
      }

      _descriptions[resourceID][resourceID][statement.predicate.value].push(object);
    });

    bNodes.forEach(function (nodeID) {
      // Recursively add bNode descriptions
      _descriptions[resourceID][nodeID] = _descriptionForResource(nodeID)[nodeID];
    });

    return _descriptions[resourceID];
  };

  Memory.prototype.reset = function () {
    _statements = {};
    _descriptions = {};
  };

  Memory.prototype.addStatement = function (statement) {
    var subject = statement.subject.type === 'uri'
                ? statement.subject.value 
                : _nodeID(statement.subject.value);

    if (undefined === _statements[subject]) {
      _statements[subject] = [];
    }
    _statements[subject].push(statement);
  };

  Memory.prototype.hasResource = function (uri) {
    return (undefined !== _statements[uri]);
  };

  Memory.prototype.descriptionForResource = function (uri) {
    return _descriptionForResource(uri);
  };

  Memory.prototype.save = function () {};
};

