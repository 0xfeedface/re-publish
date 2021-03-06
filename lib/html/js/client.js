$(document).ready(function () {
  //data
  console.log(resourceDescription);
  for (var resource in resourceDescription) {
    console.log(resourceDescription[resource]);
    var res = new Resource(resource,resourceDescription);
    res.registerNamespace('foaf','http://xmlns.com/foaf/0.1/');
    res.registerNamespace('rel','http://purl.org/vocab/relationship/');
    TemplateFactory.templateForResource(res, function(template) {
      template.toHTML(res,'.content');
    });
  }
  /*
  //init resources
  var me = new Resource("http://id.feedface.de/me",data);
  var clemens = new Resource("http://id.feedface.de/ClemensHoffmann",data);
  var philipp = new Resource("http://philipp.frischmuth24.de/id/me",data);
  //register namespace
  me.registerNamespace('foaf','http://xmlns.com/foaf/0.1/');
  clemens.registerNamespace('foaf','http://xmlns.com/foaf/0.1/');
  philipp.registerNamespace('foaf','http://xmlns.com/foaf/0.1/');
  //get templates
  TemplateFactory.templateForResource(me, function(template) {
    template.toHTML(me,'.content');
  });
  TemplateFactory.templateForResource(clemens, function(template) {
    template.toHTML(clemens,'.content');
  });
  TemplateFactory.templateForResource(philipp, function(template) {
    template.toHTML(philipp,'.content');
  });

  TemplateFactory.templateForResource('http://xmlns.com/foaf/0.1/person', function(template) {
    console.log(template.toJSON());
  });
  */
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
