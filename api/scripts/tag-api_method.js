var util = require('hexo-util');

hexo.extend.tag.register('api_method', function(args) {
  if(args[2] === undefined) {
    args[2] = args[1];
    args[1] = '';
  }

  var signatures = args[1].split('|').map(i => `(${i})`).join('<br>');
  var inherited = '';
  var cpuDescription = {
    0: 'This method has insignificant CPU cost.',
    1: 'This method has low CPU cost.',
    2: 'This method has medium CPU cost.',
    3: 'This method has high CPU cost.',
    A: 'This method is an action that changes game state. It has additional 0.2 CPU cost added to its natural cost in case if OK code is returned.',
  };
  
  var name = args[0];
  var m = name.match(/^(.*?):(.*)$/);
  if(m) {
    name = m[2];
    inherited = `<div class="api-property__inherited">Inherited from <a href="#${m[1]}">${m[1]}</a></div>`;
  }
  var opts = {};
  if(args[3]) {
    opts = JSON.parse(args[3]);
  }

  const matches = /^<h1\sid=\"([^"]*)"/ig .exec(this.content);
  let headerId = matches ? matches[1] : null;
  var id = util.slugize(name.trim(), {
      separator: '.'
  });

  if (this.headerId) {
      headerId = this.headerId;
  }

  if (headerId) {
    headerId = headerId.replace('-', '.');
    id = id.replace(`${ headerId }.`, '');
    id = `${ headerId }.${ id }`;
  }

  var result = `<h2 id="${id}" class="api-property ${name == 'constructor' ? '' : 'api-property--method'} ${inherited ? 'api-property--inherited' : ''} ${opts.deprecated ? 'api-property--deprecated' : ''}">${inherited}<span class="api-property__name">${name}</span><span class="api-property__args">${signatures}</span>
        <div class="api-property__cpu api-property__cpu--${args[2]}" title="${cpuDescription[args[2]]}"></div>
        </h2>`;
  if(opts.deprecated) {
    var text = 'This method is deprecated and will be removed soon.';
    if(opts.deprecated !== true) {
      text += ' '+opts.deprecated;
    }
    text = hexo.render.renderSync({text, engine: 'markdown'});
    result += `\n<div class="api-deprecated">${text}</div>`
  }
  return result;
}, {async: false});