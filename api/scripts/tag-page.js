'use strict';

const { readFile } = require('fs/promises');

hexo.extend.tag.register('page', async function(args) {

    const pages = hexo.locals.get('pages').toArray();
    const page = pages.find(item => item.source === args[0]);
    if (!page) throw new Error(`Could not find a page '${args[0]}'`);

    const data = page.toObject ? page.toObject() : Object.assign({}, page);
    data.full_source = page.full_source;
    data.source = page.source;

    if (!this.headerId) {
        const matches = /^<h1\sid=\"([^"]*)"/ig .exec(this.content);
        const headerId = matches ? matches[1] : null;

        if (headerId) {
            data.headerId = headerId;
        }
    } else {
        data.headerId = this.headerId;
    }

    const source = await readFile(page.full_source, 'utf8');
    data.content = source;

    // Included fragments need their nested tags resolved before their own
    // Markdown pass. Hexo 8 otherwise inserts raw fragment Markdown.
    const tagged = await hexo.extend.tag.render(source, data);
    return hexo.render.render({text: tagged, path: page.full_source, engine: 'md'});
}, {async: true});
