 var util = require('hexo-util');

 var codes = {
   OK: 0,
   ERR_NOT_OWNER: -1,
   ERR_NO_PATH: -2,
   ERR_NAME_EXISTS: -3,
   ERR_BUSY: -4,
   ERR_NOT_FOUND: -5,
   ERR_NOT_ENOUGH_ENERGY: -6,
   ERR_NOT_ENOUGH_RESOURCES: -6,
   ERR_INVALID_TARGET: -7,
   ERR_FULL: -8,
   ERR_NOT_IN_RANGE: -9,
   ERR_INVALID_ARGS: -10,
   ERR_TIRED: -11,
   ERR_NO_BODYPART: -12,
   ERR_NOT_ENOUGH_EXTENSIONS: -6,
   ERR_RCL_NOT_ENOUGH: -14,
   ERR_GCL_NOT_ENOUGH: -15,
 };

hexo.extend.tag.register('api_return_codes', function(args, content) {
  var params = content.split("\n"),
      result = "<table class='api-return-codes'><thead><tr><th>constant</th><th>value</th><th>description</th></tr></thead><tbody>\n",
      codesHtml = [];

  params.forEach(i => {
    var [code, desc] = i.split(" | ");
    desc = hexo.render.renderSync({text: desc.trim(), engine: 'markdown'});
    codesHtml.push({code: codes[code], html: `<tr><td><code>${code}</code></td><td>${codes[code]}</td><td>${desc}</td></tr>\n`});
  });

  codesHtml.sort((a,b) => b.code - a.code);

  result += codesHtml.map(i => i.html).join('');

  result += "</tbody></table>\n";

  return result;

}, {async: false, ends: true});