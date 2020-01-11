var util = require('hexo-util');
var fs = require('fs');

hexo.extend.tag.register('api_property', function (args) {
    var name = args[0], inherited = '';
    var m = name.match(/^(.*?):(.*)$/);
    if (m) {
        name = m[2];
        inherited = `<div class="api-property__inherited">Inherited from <a href="#${m[1]}">${m[1]}</a></div>`;
    }

    var opts = {};
    if(args[2]) {
        opts = JSON.parse(args[2]);
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

    var result = `<h2 id="${id}" class="api-property api-property--property ${inherited ? 'api-property--inherited' : ''} ${opts.deprecated ? 'api-property--deprecated' : ''}">${inherited}<span class="api-property__name">${name}</span><span class="api-property__type">${args[1]}</span></h2>`;
    if (opts.deprecated) {
        var text = 'This property is deprecated and will be removed soon.';
        if (opts.deprecated !== true) {
            text += ' ' + opts.deprecated;
        }
        text = hexo.render.renderSync({text, engine: 'markdown'});
        result += `<div class="api-deprecated">${text}</div>`
    }
    return result;
}, {async: false});