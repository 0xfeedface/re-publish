var http = require('http'),
    fs   = require('fs'),
    util = require('util'),
    pb   = require('paperboy'),
    path = require('path'),
    sys  = require('sys'),
    con  = require('connect'),
    qs   = require('querystring'),

    PORT = 8001,
    WEBROOT = path.dirname(__filename);

//available templates for a resource type
var templateLibrary = {
  'http://xmlns.com/foaf/0.1/person' : {
    'init' : fs.readFileSync('tmpl/vcard.tpl','utf-8'),
    'workswith' : fs.readFileSync('tmpl/workswith.tpl','utf-8'),
    'propertyTemplate': fs.readFileSync('tmpl/propertyTemplate.tpl','utf-8')
  }
}

var s = http.createServer(function (req, res) {
  //paperboy
  pb.deliver(WEBROOT, req, res).otherwise(function (err) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end("Error 404: File not found");
  });
  //handle post requests
  if ( req.method === 'POST') {
    var request = {};
    var response = {};
    req.addListener('data', function(chunk) {
      request = qs.parse(String(chunk));
      console.log(request);
      for ( var type in templateLibrary ) {
        if ( request['type'].toLowerCase() === type ) {
          response['tmpl'] = templateLibrary[type];
          console.log(response);
        }
      }
    });
    req.addListener('end', function() {
      res.writeHead(200,{'Content-Type': 'application/json' });
      res.write(JSON.stringify(response));
      res.end();
    });
  }

});

s.listen(PORT);
