var util = require('hexo-util');

hexo.extend.tag.register('api_method_params', function(args, content) {
  var params = content.split("\n===\n"),
      result = "<table><thead><tr><th>parameter</th><th>type</th><th>description</th></tr></thead><tbody>\n";

  params.forEach(i => {
    var m = i.trim().match(/^(.*?) : (.*?)\n/);
    if(!m) {
      throw new Error('invalid method_params syntax in "'+i+'"');
    }
    var desc = hexo.render.renderSync({text: i.substring(m[0].length).trim(), engine: 'markdown'});
    var optional = '';
    if(/ \(optional\)/.test(m[1])) {
      m[1] = m[1].replace(" (optional)", "");
      optional = '<br><em>optional</em>';
    }
    result += `<tr><td><code>${m[1]}</code>${optional}</td><td>${m[2]}</td><td>${desc}</td>\n`;
  });

  result += "</tbody></table>\n";

  return result;

}, {async: false, ends: true});