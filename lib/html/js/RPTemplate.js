var RPTemplate = (function ($) {
  /* var _templates = {
   *   <typeUri> : {
   *     init : 'ttt',
   *     <tmplName>: 'ttt',
   *         .
   *         .
   *     <tmplName>: 'ttt'
   *   }
   * }
   */
  var _templates = {};

  return {
    templateForResource: function(RPResourceOrType) {
      try {
        if ( RPResourceOrURI instanceof RPResource ) {
          return _templates[RPResourceOrURI.type()];
        } else if ( typeof(RPResourceOrURI) == 'string' ) {
          if ( typeof(_templates[RPResourceOrURI]) != 'undefined' ) {
            return _templates[RPResourceOrType];
          } else {
            throw 'noMatch';
          }
        }  else if ( typeof(RPResourceOrType) != 'string' ) {
          throw 'typeError';
        }
      } catch (er) {
        if (er == "noMatch") {
          console.error('No matched template!');
          return false;
        }
        if (er == "typeError") {
          console.error('False parameter type! Should be an instace of RPResource or uri.');
          return false;
        }
      }
      
    },

    registerTemplate: function(type, templateObject) {
      try {
           _templates[type] = templateObject;
        } else {
          throw 'error'
        }
      } catch (er) {
        if (er == 'error') {
          console.error('template already cached.');
        }
      }
    }

  }
})(jQuery);
