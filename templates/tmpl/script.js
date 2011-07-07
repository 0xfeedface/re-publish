$(document).ready(function () {
  // jQuery.tmpl('<title>${resource.title()}</title>', {'resource': resource}).appendTo('head');
  // $('#vcard').tmpl({'resource': resource}).appendTo('.content');
  // jQuery.tmpl(template, {'resource' : resource}).appendTo('.content');
//  var templates = resource.getTemplatesTag();

  var backendSrv = 'http://localhost:8001/templates';
  var resources = _createResourceObjects(data);
  for (var res in resources.resourceObjects) {
    resources.resourceObjects[res].initWithURI(res); // res == uri
    resources.resourceObjects[res].registerNamespace('foaf','http://xmlns.com/foaf/0.1/');
    resources.getTemplate(backendSrv,resources.resourceObjects[res]);
  }

  //testResource
  var testResource = new RPResource(data);
  testResource.initWithURI('http://id.feedface.de/me');
  testResource.registerNamespace('foaf','http://xmlns.com/foaf/0.1/');
  console.log('testResource: http://id.feedface.de/me');
  console.log(testResource.valuesForProperty('foaf:knows'));
  console.log('hasValuesForProperty foaf:knows: '+testResource.hasValuesForProperty('foaf:knows'));
  console.log('hasValuesForProperty foaf:Document: '+testResource.hasValuesForProperty('foaf:Document'));
  console.log(testResource.allProperties());
  console.log(testResource.allPropertiesAndValues());
});

var data =  {
  "http://id.feedface.de/me": {
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
      {"type": "uri", "value": "http://xmlns.com/foaf/0.1/Person"}
    ],
    "http://xmlns.com/foaf/0.1/name": [
      {"type": "literal", "value": "Norman Heino"}
    ],
    "http://xmlns.com/foaf/0.1/birthDate": [
      {"value": "05-04", "type": "literal"}
    ],
    "http://xmlns.com/foaf/0.1/homepage": [
      {"type": "uri", "value": "http://feedface.de/"}
    ],
    "http://xmlns.com/foaf/0.1/phone": [
      {"type": "uri", "value": "+493419732368"}
    ],
    "http://xmlns.com/foaf/0.1/mbox": [
      {"type": "uri", "value": "mailto:heino@informatik.uni-leipzig.de"}
    ],
    "http://xmlns.com/foaf/0.1/depiction": [
      {"type": "uri", "value": "http://static.feedface.de/depiction180px.png"}
    ],
    "http://xmlns.com/foaf/0.1/knows": [
      {"type": "uri", "value": "http://id.feedface.de/ClemensHoffmann"},
      {"type": "uri", "value": "http://philipp.frischmuth24.de/id/me"},
      {"type": "uri", "value": "http://www.thomas-riechert.de/rdf/foaf.rdf#me"},
      {"type": "uri", "value": "http://michael-martin.info/rdf/foaf.rdf#me"}
    ]
  },
  "http://philipp.frischmuth24.de/id/me": {
    "http://xmlns.com/foaf/0.1/name": [
      {"type": "literal", "value": "Philipp Frischmuth"}
    ],
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
      {"type": "uri", "value": "http://xmlns.com/foaf/0.1/Person"}
    ]
  },
  "http://id.feedface.de/ClemensHoffmann": {
    "http://xmlns.com/foaf/0.1/name": [
      {"type": "literal", "value": "Clemens Hoffmann"},
    ],
    "http://xmlns.com/foaf/0.1/homepage": [
      {"type": "uri", "value": "http://clelicy.com"}
    ],
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [
      {"type": "uri", "value": "http://xmlns.com/foaf/0.1/Person"}
    ],
    "http://xmlns.com/foaf/0.1/birthDate": [
      {"value": "03-16", "type": "literal"}
    ]
  }
}

function _createResourceObjects(data) {
  var resources = {
    resourceObjects : {},
    tplCache: {},
    getTemplate: function (backendSrv,resourceObject) {
      var template;
      $.ajax({
        beforeSend: function(jqXHR) {
          jqXHR.setRequestHeader("Content-Type", "application/json");
          jqXHR.setRequestHeader("Accept", "application/json");
        },
        url: backendSrv,
        type: "POST",
        data: { 'vcard' : '', 'test-resource': ''},
        dataType: "json",
        success: function(data) {
          for (var template in data) {
            $.template(template,data[template]);
          }
          $.tmpl('vcard', {'resource' : resourceObject}).appendTo('.content');
        },
        error: function (err,status,text) {
          alert(text);
        }
      });
    }
  };
  for ( var uri in data ) {
    resources.resourceObjects[uri] = new RPResource(data);
  }
  return resources;
}

function formatPhoneNumber(phoneURI) {
  return phoneURI;
}

// Class Resource
function Resource(uri,prop) {
  var _ns = {'foaf': 'http://xmlns.com/foaf/0.1/',
             'rel' : 'http://purl.org/vocab/relationship/'};
  var _URI = uri;
  var _properties = prop;
  
  return {
    title: function () {
      return _properties['http://xmlns.com/foaf/0.1/name'][0].value;
    }, 
    URI: function () {
      return _URI;
    },
    getTemplateIDs: function () {
      var templates = {};
      for (var property in _properties) {
        console.log(property);
        var parts = property.split('/');
        var template  = parts[parts.length-1].toLowerCase();
        templates[template] = "";
      }
      return templates;
    },
    propertyValue: function (propertySpec) {
      var propertyURI;
      var parts = propertySpec.split(':', 2);
      if (parts.length > 1) {
        if (_ns[parts[0]]) {
          propertyURI = _ns[parts[0]] + parts[1];
        } else {
          propertyURI = propertySpec;
        }
      }
      if ( typeof(_properties[propertyURI]) != "undefined" ) {
        var test = _properties[propertyURI];
        if ( _properties[propertyURI].length == 1 ) {
          return _properties[propertyURI][0].value
        }else{
          return _properties[propertyURI];
        }
      }
    }
  }
};
