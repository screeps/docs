'use strict';

var _ = require('lodash');
var Promise = require('bluebird');

hexo.extend.tag.register('page', function(args) {

    var page = _.find(hexo.locals.get('pages').data, {source: args[0]});
    if (!page) throw new Error(`Could not find a page '${args[0]}`);
    page = _.cloneDeep(page);
    return hexo.post.render(page.full_source, page).then(data => {
        return data.content;
    });
}, {async: true});


