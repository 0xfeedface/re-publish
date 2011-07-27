var defaults = exports.defaults = {
    /* 
     * The namespace under which you serve your data  (e.g. your domain).
     */
    namespace: 'http://id.feedface.de/', 
    
    /*
     * Which type to serve by default; choose a value from typeMapping (below).
     */
    type: 'rdfxml', 
    
    /*
     * If enabled, node_linkeddate will log requests and whether resources were found.
     */
    enableLogging: true, 
    
    /*
     * Port to listen on.
     */
    serverPort: 8000, 
    
    /*
     * The file that contains the resources to serve.
     */
    dataFilePath: './data.ttl'
};

/**
 * Mapping of mime types to raptor parser names.
 */
var typeMapping = exports.typeMapping = {
    'application/rdf+xml':  'rdfxml', 
    'text/turtle':          'turtle', 
    'application/rdf+json': 'json', 
    'text/plain':           'ntriples', 
    '*/*':                  defaults.type,
};
