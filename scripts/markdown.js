'use strict';

const { Marked } = require('marked');
const Prism = require('prismjs');
const { slugize, stripHTML, unescapeHTML } = require('hexo-util');

require('../shared/markdown')(hexo, {
  Marked,
  Prism,
  slugize,
  stripHTML,
  unescapeHTML
});
