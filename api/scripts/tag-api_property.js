var util = require('hexo-util');

hexo.extend.tag.register('api_property', function(args) {
  var name = args[0], inherited = '';
  var m = name.match(/^(.*?):(.*)$/);
  if(m) {
    name = m[2];
    inherited = `<div class="api-property__inherited">Inherited from <a href="#${m[1]}">${m[1]}</a></div>`;
  }

  var id = util.slugize(name.trim());
  return `<h2 id="${id}" class="api-property api-property--property ${inherited ? 'api-property--inherited' : ''}">${inherited}<span class="api-property__name">${name}</span><span class="api-property__type">${args[1]}</span></h2>`;
}, {async: false});