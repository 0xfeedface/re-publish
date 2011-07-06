function RPResource () {
  var _data = {};
  var _namespaces = {};
  var _uri;

  return {
    initWithURI: function (URI) {
      this._uri = URI;
    },

    registerNamespace: function (prefix, name) {
      this._namespaces[prefix] = name;
    },

    hasValuesForProperty: function(propertySpec) {
      var propertyURI;
      var parts = propertySpec.split(':',2);
      if (parts.length > 1) {
        if( _namespaces[parts[0]] ) {
          propertyURI = _namespaces[parts[0]] + parts[1];
        } else {
          propertyURI = propertyURI;
        }
      }
      if ( typeof(_data[_uri][property]) != 'undefined' ) {
        return true;
      }
      return false;
    },

    valuesForProperty: function (propertySpec) {
      var propertyURI;
      var parts = propertySpec.split(':',2);
      if (parts.length > 1) {
        if(_namespaces[parts[0]]) {
          propertyURI = _namespaces[parts[0]] + parts[1];
        } else {
          propertyURI = propertyURI;
        }
      }

      if ( _data[_uri][propertyURI].length == 1 ) {
        return _data[_uri][propertyURI][0].value
      } else if ( _data[_uri][propertyURI].length > 1 ){
        return _data[_uri][propertyURI];
      } else {
        throw "Error";
      }

    },

    allProperties: function () {
      var properties = [];
      for ( var property in _data[_uri] ) {
        properties.push(property);
      }
      return properties;
    },

    allPropertiesAndValues: function () {
      return _data[_uri];
    }
  }
}
