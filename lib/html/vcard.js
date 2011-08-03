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
  },
  'default': {
    'init' : fs.readFileSync(path.join(WEBROOT, 'tmpl/default.tpl'),'utf-8')
  }
}

var s = http.createServer(function (req, res) {
  //paperboy
  pb.deliver(WEBROOT, req, res).otherwise(function (err) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end("Error 404: File not found");
  });
  //handle requests
  if ( req.method === 'GET') {
    var request = qs.parse(String(req.url.replace(/\/\?/gm,"")));
    var response = {};
    //create regex
    var regex = new RegExp(request['type'],'gi');
    //check, which template would be returned
    for ( var type in templateLibrary ) {
      if ( regex.test(type) ) {
        //response with requested template
        response['tmpl'] = templateLibrary[type];
        console.log(response);
        break;
      } else {
        //response with default template
        response['tmpl'] = templateLibrary['default'];
        console.log(response);
        break;
      }
    }
    //response
    res.writeHead(200,{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    res.write(JSON.stringify(response));
    res.end();
  }

});

s.listen(PORT);
console.log('Server listening on port ' + PORT);
