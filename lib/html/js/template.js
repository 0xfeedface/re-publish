//Class Template
var Template = function () {
  // Private variables
  var _template = {};

  // Public methods
  this.setInit = function (initTemplate) {
    _template['init'] = initTemplate;
  }

  this.setPartial = function (name, partialTemplate) {
    _template[name] = partialTemplate;
  }

  this.toJSON = function () {
    return _template;
  }
}

Template.prototype.toHTML = function (resource, append) {
  for (var template in this.toJSON()) {
    $.template(template,this.toJSON()[template]);
  }
  return $.tmpl('init', {'resource' : resource}).appendTo(append);
}

