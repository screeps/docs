'use strict';

const { Marked } = require('marked');
const Prism = require('prismjs');
const { slugize, stripHTML, unescapeHTML } = require('hexo-util');

require('../../shared/markdown')(hexo, {
  Marked,
  Prism,
  slugize,
  stripHTML,
  unescapeHTML
});

// Resolve custom API tags before Markdown so their surrounding Markdown is
// parsed in the same pass, as it was by the legacy renderer.
hexo.extend.filter.register('before_post_render', async data => {
  if (!data.content.includes('{%')) return;

  if (!data.headerId) {
    const heading = /^#\s+(.+?)\s*$/m.exec(data.content);
    if (heading) data.headerId = slugize(heading[1].trim());
  }

  data.content = await hexo.extend.tag.render(data.content, data);
}, 20);
