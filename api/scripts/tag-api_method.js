var util = require('hexo-util');

hexo.extend.tag.register('api_method', function(args) {
  if(args[2] === undefined) {
    args[2] = args[1];
    args[1] = '';
  }
  var id = util.slugize(args[0].trim());
  var signatures = args[1].split('|').map(i => `(${i})`).join('<br>');
  var inherited = '';
  var cpuDescription = {
    0: '该方法的CPU开销很小。',
    1: '该方法具有较低的CPU开销。',
    2: '该方法的CPU开销中等。',
    3: '这种方法的CPU成本很高。',
    A: '这个方法是一个改变游戏状态的动作。在返回OK代码的情况下，它的自然成本增加了0.2个CPU成本。',
  };
  var m = args[0].match(/^(.*?):(.*)$/);
  if(m) {
    args[0] = m[2];
    inherited = `<div class="api-property__inherited">继承自 <a href="#${m[1]}">${m[1]}</a></div>`;
  }
  var opts = {};
  if(args[3]) {
    opts = JSON.parse(args[3]);
  }

  var result = `<h2 id="${id}" class="api-property ${args[0] == 'constructor' ? '' : 'api-property--method'} ${inherited ? 'api-property--inherited' : ''} ${opts.deprecated ? 'api-property--deprecated' : ''}">${inherited}<span class="api-property__name">${args[0]}</span><span class="api-property__args">${signatures}</span>
        <div class="api-property__cpu api-property__cpu--${args[2]}" title="${cpuDescription[args[2]]}"></div>
        </h2>`;
  if(opts.deprecated) {
    var text = '此方法已被弃用，不久将被删除。';
    if(opts.deprecated !== true) {
      text += ' '+opts.deprecated;
    }
    text = hexo.render.renderSync({text, engine: 'markdown'});
    result += `\n<div class="api-deprecated">${text}</div>`
  }
  return result;
}, {async: false});