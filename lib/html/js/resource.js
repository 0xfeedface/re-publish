// Class RPResource
var Resource = function (uri, data) {
  // Private variables
  var _type = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
  var _uri = uri;
  var _data = data;
  var _namespaces = {};
  
  // Private methods
  function trimPropertySpec () {
  
  }
  
  // Public methods
  this.resourceURI = function () {
    return _uri;
  };

  this.type = function() {
    return _data[_uri][_type][0].value;
  }

  this.registerNamespace = function (prefix, name) {
    _namespaces[prefix] = name;
  };

  this.hasValuesForProperty = function(propertySpec) {
   var propertyURI;
   var parts = propertySpec.split(':',2);

   if (parts.length > 1) {
     if( _namespaces[parts[0]] ) {
       propertyURI = _namespaces[parts[0]] + parts[1];
     } else {
       propertyURI = propertyURI;
     }
   }

   if ( typeof(_data[_uri][propertyURI]) != 'undefined' ) {
     return true;
   }
   return false;
  };

  this.valuesForProperty = function (propertySpec) {
    try {
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
        throw "error";
      }
    } catch (er) {
      if ( er == "error" ) {
        alert("Resource doesn't have a value for " + propertySpec);
      }
    }
  };

  this.allProperties = function () {
    var properties = [];
    for ( var property in _data[_uri] ) {
      properties.push(property);
    }
    return properties;
  };

  this.allPropertiesAndValues = function () {
    return _data[_uri];
  };

  return this;
};
