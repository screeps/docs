'use strict';

hexo.extend.generator.register('index', function(locals) {

  return {
    path: 'index.html',
    layout: 'index',
    data: {
      pages: Object.fromEntries(locals.pages.toArray().map(page => [page.source, page.content]))
    }
  }
});
