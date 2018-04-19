var util = require('hexo-util');

hexo.extend.tag.register('api_return_find', function(args, content) {
    var params = content.split("\n"),
        result = "<table class='api-api_return_find-table'><thead><tr><th>constant</th><th>type</th><th>description</th></tr></thead><tbody>\n",
        codesHtml = [];
  
    params.forEach(i => {
      var [code, type, desc] = i.split(" | ");
      desc = hexo.render.renderSync({text: desc.trim(), engine: 'markdown'});
      codesHtml.push(`<tr><td><code>${code}</code></td><td>${type}</td><td>${desc}</td></tr>\n`);
    });
  
    result += codesHtml.join('');
  
    result += "</tbody></table>\n";
  
    return result;
  
  }, {async: false, ends: true});