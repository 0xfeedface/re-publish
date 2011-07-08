var RPTemplate = (function ($) {
  var _templates = {};

  return {
    templateForResource: function(RPResourceOrURI) {
      try {
        if ( RPResourceOrURI instanceof RPResource ) {
          return _templates[RPResourceOrURI.resourceURI()];
        } else if ( typeof(RPResourceOrURI) == 'string' ) {
          return _templates[RPResourceOrURI];
        }  else if ( typeof(RPResourceOrURI) != 'string' ) {
          throw 'typeError';
        } else {
          throw 'noMatch';
        }
      } catch (er) {
        if (er == "noMatch") {
          alert('No matched template!');
        }
        if (er == "typeError") {
          alert('False parameter type! Should be an instace of RPResource or uri.');
        }
      }
      
    },

    registerTemplate: function(jQueryTemplate) {
      try {
        if ( jQueryTemplate instanceof jQuery ) {
          var uri = $(jQueryTemplate).tmplItem().data.resource.resourceURI();
          _templates[uri] = jQueryTemplate;
        } else {
          throw 'error'
        }
      } catch (er) {
        if (er == 'error') {
          alert('No jQueryTemplate!');
        }
      }
    }

  }
})(jQuery);
