// Node.js includes
var
  fs   = require('fs'),
  util = require('util'),
  http = require('http'),
  path = require('path'),
  paperboy = require('paperboy');

var
  BASE_PATH = path.dirname(__filename),
  conf      = require(path.join(BASE_PATH, '../config')),
  raptor    = require('raptor');

var
  fileName = process.argv[2] || conf.defaults.dataFilePath,
  filePath = path.normalize(fileName);

if (!path.existsSync(filePath)) {
  console.log('Unable to read file: ' + fileName);
  process.exit(1);
}

var
  // TODO: support formats other than Turtle
  parser = raptor.newParser('turtle'),
  DataProvider = require(path.join(BASE_PATH, 'memory')).Memory,
  dataProvider = new DataProvider(),
  mimeparse = require(path.join(BASE_PATH, 'mimeparse')).Mimeparse;

// Parse and fill provider
var ready = false;
var count = 0;
parser.on('statement', function (statement) {
  dataProvider.addStatement(statement);
  count++;
}).on('message', function (type, message, code) {
  if (type == 'error' || type == 'warning') {
    console.log('Parser ' + type + ': ' + message + ' (' + code + ')');
  }
}).on('end', function () {
  dataProvider.save();
  ready = true;
  console.log(count + ' statements parsed.');
});

// Set a watch on the data file
fs.watchFile(fileName, function (curr, prev) {
  if (curr.mtime > prev.mtime) {
    // TODO: parse
    console.log('Data file changed. Parsing again ...');
    dataProvider.reset();
    // Reparse on file change
    parser.parseFile(filePath);
    ready = false;
  }
});

var server = http.createServer(function (req, res) {
  // Check for static files and deliver
  if (req.url.indexOf(conf.defaults.staticPrefix) > -1) {
    req.url = req.url.replace(conf.defaults.staticPrefix, '').replace('//', '/');
    paperboy
      .deliver(path.join(BASE_PATH, conf.defaults.staticProvider), req, res)
      .otherwise(function (err) {
        res.writeHead(404);
        res.end();
        return;
      });
  } else {
    // Data file still parsed
    if (!ready) {
      res.writeHead(503);
      res.end();
      return;
    }

    var uri = conf.defaults.namespace;
    uri += req.url[0] === '/' ? req.url.slice(1) : req.url;
    console.log('Received request for <' + uri + '>.');

    if (!dataProvider.hasResource(uri)) {
      // Resource not found
      console.log('Resource <' + uri + '> not found (404).');
      res.writeHead(404);
      res.end();
      return;
    }

    var
      accept = req.headers['accept'],
      mimeTypes = Object.keys(conf.typeMapping),
      bestMatch = mimeparse.bestMatch(mimeTypes, accept) || conf.defaults.type
      outputName = conf.outputMapping[bestMatch],
      outputPath = path.join(BASE_PATH, outputName),
      Provider = require(path.join(outputPath, outputName)).Provider,
      outputProvider = new Provider(conf.typeMapping[bestMatch]),
      description = dataProvider.descriptionForResource(uri);

    console.log('Mime type requested: ' + bestMatch + ' (' + outputName+ ')');

    // At this point we have a URI, so send a success header
    res.writeHead(200);

    // Pipe output stream to response
    try {
      outputProvider.pipe(res);
      outputProvider.stream(description);
    } catch (error) {
      res.writeHead(500);
      res.end('Internal server error.');
      console.log('Internal processing error: ' + error);
    }
  }
});

// After establishing callbacks
process.nextTick(function () {
  // parse file
  parser.parseFile(filePath);
  // log server info
  server.listen(conf.defaults.serverPort);
  console.log('Server listening on port ' + conf.defaults.serverPort);
});
