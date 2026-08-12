'use strict';

module.exports = function registerScreepsMarkdown(hexo, dependencies) {
  const { Marked, Prism, slugize, stripHTML, unescapeHTML } = dependencies;
  const inlineMarked = new Marked({ gfm: true, breaks: false });
  const markdownInTableCell = /(!?\[[^\]]*\]\([^)]*\)|`[^`]+`|\*\*[^*]+\*\*|__[^_]+__)/;
  const markdownLinkOrImage = /!?\[[^\]]*\]\([^)]*\)/;

  function renderCode(code, inputLanguage) {
    let language = inputLanguage == null ? 'undefined' : inputLanguage;
    let noSidebar = '';

    if (/-content/.test(language)) {
      language = language.replace('-content', '');
      noSidebar = 'nosidebar';
    }

    const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');
    return `<pre class="highlight ${language} tab-${language} ${noSidebar}"><code>${html}</code></pre>`;
  }

  function renderTableCellMarkdown(html) {
    if (!/<table\b/i.test(html)) return html;

    return html.replace(/<(td|th)(\s[^>]*)?>([\s\S]*?)<\/\1>/gi, (match, tag, attributes = '', content) => {
      if (!markdownInTableCell.test(content)) return match;
      return `<${tag}${attributes}>${inlineMarked.parseInline(content)}</${tag}>`;
    });
  }

  function renderEmbeddedMarkdown(html) {
    const rendered = renderTableCellMarkdown(html);
    return markdownLinkOrImage.test(rendered) ? inlineMarked.parseInline(rendered) : rendered;
  }

  hexo.extend.highlight.register('screeps-prism', (code, options) => renderCode(code, options.lang));

  hexo.extend.filter.register('marked:renderer', renderer => {
    renderer.code = function code(token) {
      return renderCode(token.text, token.lang);
    };

    renderer.heading = function heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      let id = slugize(stripHTML(unescapeHTML(text)).trim());
      const headingIds = this.options._headingId;

      if (id !== 'constructor') {
        if (headingIds[id]) {
          id += `-${headingIds[id]++}`;
        } else {
          headingIds[id] = 1;
        }
      }

      return `<h${depth} id="${id}"><a href="#${id}" class="headerlink" title="${stripHTML(text)}"></a>${text}</h${depth}>`;
    };

    renderer.html = function html(token) {
      const html = token.text || token.raw;
      if (token.block && /^<img\b[^>]*\/?>\s*$/i.test(html.trim())) {
        return `<p>${html.trim()}</p>\n`;
      }
      return renderEmbeddedMarkdown(html);
    };
  });
};
