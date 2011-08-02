var TemplateFactory = (function ($) {
  /* var _templates = {
   *   <typeUri> : { //instance of Template
   *     init : 'ttt',
   *     <partialName>: 'ttt',
   *         .
   *         .
   *     <partialName>: 'ttt'
   *   }
   * }
   */
  var _templates = {};
  /*
   * var _callbacks = {
   *   <resourceUri> : callback,
   *        .
   *        .
   *   <resourceUri> : callback
   * }
   */
  var _callbacks = {};
  var _srv = 'http://localhost:8001'; // possibly a config attribute?

  return {
    templateForResource: function(ResourceOrType, callback) {
    var self = this;
      try {
        // get template for an instance of resource
        if ( ResourceOrType instanceof Resource ) {
          var type = ResourceOrType.type().toLowerCase();
          // check, if available
          if ( typeof(_templates[type]) != 'undefined' ) {
            if (_templates[type] == true) {
              if( $.isFunction(callback) ) {
                _callbacks[ResourceOrType.resourceURI()] = callback;
              }
            } else {
              if( $.isFunction(callback) ) {
                callback(_templates[type]);
              }
            }
          } else {
            throw 'noMatch';
          }
        // get template for an type uri
        } else if ( typeof(ResourceOrType) == 'string' ) {
          var type = ResourceOrType.toLowerCase();
          // check, if available
          if ( typeof(_templates[type]) != 'undefined' ) {
            if (_templates[type] == true) {
              if( $.isFunction(callback) ) {
                _callbacks[type] = callback;
              }
            } else {
              if( $.isFunction(callback) ) {
                callback(_templates[type]);
              }
            }
          } else {
            throw 'noMatch';
          }
        // type error
        }  else if ( typeof(ResourceOrType) != 'string' ) {
          throw 'typeError';
        }
      } catch (er) {
        switch(er) {
          // not yet registered
          case 'noMatch':
              console.info('No matched template! Request template...');
              // request templates
              var type = ResourceOrType instanceof Resource ? ResourceOrType.type()
                                                                            .toLowerCase()
                                                            : ResourceOrType.toLowerCase();
              _templates[type] = true;
              $.ajax({
                beforeSend: function(jqXHR) {
                  jqXHR.setRequestHeader("Content-Type", "application/json");
                  jqXHR.setRequestHeader("Accept", "application/json");
                },
                url: _srv,
                data: { type: type},
                dataType: 'json',
                type: 'GET',
                traditional: true,
                crossDomain: true,
                success: function(data){
                  // registerTemplate(type, data)
                  var newTemplate = new Template();
                  for ( var tmpl in data['tmpl'] ) {
                    if ( tmpl === 'init' ) {
                      newTemplate.setInit(data['tmpl'][tmpl]);
                    } else {
                      newTemplate.setPartial(tmpl,data['tmpl'][tmpl]);
                    }
                  }
                  self.registerTemplate(type,newTemplate);
                  //call current callback of resource
                  if( $.isFunction(callback) ) {
                    callback(_templates[type]);
                  }
                  //call other cached callbacks
                  for ( uri in _callbacks ) {
                    _callbacks[uri](_templates[type]);
                  }
                },
                error: function(err,status,text) {
                  console.error(err);
                }
              });
            break;
          // incorrect parameter
          case 'typeError':
              console.error('False parameter type! Should be an instace of Resource or type uri.');
              return false;
            break;
        } 
      }
    },

    registerTemplate: function(type, templateObject) {
      try {
        if ( _templates[type] == true ) {
           _templates[type] = templateObject;
        } else {
          throw 'error'
        }
      } catch (er) {
        if (er == 'error') {
          console.info('Template for ' + type + ' already cached.');
        }
      }
    }
  } 
})(jQuery);
