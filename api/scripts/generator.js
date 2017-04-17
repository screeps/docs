'use strict';

var _ = require('lodash');

hexo.extend.generator.register('index', function(locals) {

  return {
    path: 'index.html',
    layout: 'index',
    data: {
      pages: _.reduce(locals.pages.data, (result, i) => (result[i.source] = i.content, result), {})
    }
  }
});
