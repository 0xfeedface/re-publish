var http = require('http'),
    fs   = require('fs'),
    util = require('util'),
    pb   = require('paperboy'),
    path = require('path'),
    sys  = require('sys'),
    qs   = require('querystring'),

    PORT = 8001,
    WEBROOT = path.dirname(__filename);

//available templates for a resource type
var templateLibrary = {
  'http://xmlns.com/foaf/0.1/person' : {
    'init' : fs.readFileSync(path.join(WEBROOT, 'tmpl/vcard.tpl'),'utf-8'),
    'workswith' : fs.readFileSync(path.join(WEBROOT, 'tmpl/workswith.tpl'),'utf-8'),
    'propertyTemplate': fs.readFileSync(path.join(WEBROOT, 'tmpl/propertyTemplate.tpl'),'utf-8')
  }
}

var s = http.createServer(function (req, res) {
  //paperboy
  pb.deliver(WEBROOT, req, res).otherwise(function (err) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end("Error 404: File not found");
  });
  //handle post requests
  if ( req.method === 'GET') {
    console.log('drin in get');
    var request = {};
    var response = {};
    console.log(req.url);
    request = qs.parse(String(req.url.replace(/\/\?/gm,"")));
    for ( var type in templateLibrary ) {
      if ( request['type'].toLowerCase() === type ) {
        response['tmpl'] = templateLibrary[type];
        console.log(response);
      }
    }
    // req.addListener('data', function(chunk) {
      // console.log(chunk);
      // request = qs.parse(String(chunk));
      // console.log(request);
      // for ( var type in templateLibrary ) {
        // if ( request['type'].toLowerCase() === type ) {
          // response['tmpl'] = templateLibrary[type];
          // console.log(response);
        // }
      // }
    // });
    req.addListener('end', function() {
      res.writeHead(200,{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.write(JSON.stringify(response));
      res.end();
    });
  }

});

s.listen(PORT);
