'use strict';

const nunjucksRenderer = require('hexo-renderer-nunjucks');

// The renderer's compile hook loses its configured environment and enables
// autoescaping. Use its correctly configured render path for theme views.
hexo.extend.renderer.register('njk', 'html', function(data, locals) {
  return nunjucksRenderer.render(data, locals);
}, true);

hexo.extend.filter.register('template_locals', function(locals) {
  if (locals.page && locals.page.archive) locals.page.title = 'News';
  return locals;
});
