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

var s = http.createServer(function (req, res) {
  //paperboy
  pb.deliver(WEBROOT, req, res).otherwise(function (err) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end("Error 404: File not found");
    // util.log(404, req.url, err);
  });
  //handle post requests
  if ( req.method === 'POST') {
    var data;
    req.addListener('data', function(chunk) {
      data = qs.parse(String(chunk));
      for (var template in data) {
        switch(template) {
          case 'vcard': data['vcard'] = fs.readFileSync('tmpl/vcard.tpl','utf-8');
            break;
          case 'workswith': data['workswith'] = fs.readFileSync('tmpl/workswith.tpl','utf-8');
            break;
          case 'propertyTemplate': data['propertyTemplate'] = fs.readFileSync('tmpl/propertyTemplate.tpl','utf-8');
            break;
        }
      }
    });
    req.addListener('end', function() {
      res.writeHead(200,{'Content-Type': 'application/json' });
      res.write(JSON.stringify(data));
      res.end();
    });
  }

});

s.listen(PORT);
