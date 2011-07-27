$(document).ready(function () {
  // jQuery.tmpl('<title>${resource.title()}</title>', {'resource': resource}).appendTo('head');
  // $('#vcard').tmpl({'resource': resource}).appendTo('.content');
  // jQuery.tmpl(template, {'resource' : resource}).appendTo('.content');
//  var templates = resource.getTemplatesTag();

  var backendSrv = 'http://localhost:8001/templates';
  var resources = _createResourceObjects(data);
  for (var res in resources.resourceObjects) {
    resources.resourceObjects[res].registerNamespace('foaf','http://xmlns.com/foaf/0.1/');
    resources.getTemplate(backendSrv,resources.resourceObjects[res]);
  }

  // test RPResource functionality
  var testResource = new RPResource('http://id.feedface.de/me',data);
  console.log('Is instance of RPResource: ' + (testResource instanceof RPResource));
  testResource.registerNamespace('foaf','http://xmlns.com/foaf/0.1/');
  console.log('testResource: http://id.feedface.de/me');
  console.log('valuesForProperty: ' + testResource.valuesForProperty('foaf:knows'));
  console.log('hasValuesForProperty foaf:knows: '+testResource.hasValuesForProperty('foaf:knows'));
  console.log('hasValuesForProperty foaf:Document: '+testResource.hasValuesForProperty('foaf:Document'));
  console.log('allProperties (Array):');
  console.log(testResource.allProperties());
  console.log('allPropertiesAndValues:');
  console.log(testResource.allPropertiesAndValues());
});

// hardcoded testdata
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
    resourceObjects : {}, // container of RPTemplate instances
    tplCache: {},
    getTemplate: function (backendSrv,resourceObject) {
      // request templates here, which will be response from the node server
      var requestTemplates = ['vcard','propertyTemplate'];
      $.ajax({
        beforeSend: function(jqXHR) {
          jqXHR.setRequestHeader("Content-Type", "application/json");
          jqXHR.setRequestHeader("Accept", "application/json");
        },
        url: backendSrv,
        type: "POST",
        data: {requestTemplates: requestTemplates},
        dataType: "json",
        traditional: true,
        success: function(data) {
          for (var template in data) {
            $.template(template,data[template]);
          }
          var template = $.tmpl('vcard', {'resource' : resourceObject}).appendTo('.content');
          //register template
          RPTemplate.registerTemplate(template);
          //test RPTemplate
          console.log('resourceObject is an instance of RPResource: ' + (resourceObject instanceof RPResource));
          console.log('Template for resource http://id.feedface.de/me: ' );
          console.log(RPTemplate.templateForResource('http://id.feedface.de/me'));
          console.log('Template for each instance of RPResource: ');
          console.log(RPTemplate.templateForResource(resourceObject));
        },
        error: function (err,status,text) {
          alert(text);
        }
      });
    }
  };
  for ( var uri in data ) {
    resources.resourceObjects[uri] = new RPResource(uri, data);
  }
  return resources;
}

function formatPhoneNumber(phoneURI) {
  return phoneURI;
}