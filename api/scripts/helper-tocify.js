'use strict';

const cheerio = require('cheerio');

const API_PROPERTY = 'api-property--property';
const API_METHOD = 'api-property--method';
const API_DEPRECATED = 'api-property--deprecated';
const API_INHERITED = 'api-property--inherited';

const TOCIFY_ITEM__API_PROPERTY = 'tocify-item--api-property';
const TOCIFY_ITEM__API_METHOD = 'tocify-item--api-method';
const TOCIFY_ITEM__API_DEPRECATED = 'tocify-item--api-deprecated';
const TOCIFY_ITEM__API_INHERITED = 'tocify-item--api-inherited';

hexo.extend.helper.register('tocify', function(page) {
    const $ = cheerio.load(page, { decodeEntities: false });

    let header = '';
    let headerText = '';

    $('h1').each(function() {
        const $this = $(this);

        const id = $this.attr('id');
        const text = headerText = $this.text();

        header = `<li class='tocify-item' data-unique='${ text }' style='cursor: pointer;'>
            <a href='#${ id }'>${ text }</a>
        </li>`;
    });

    const subheader = [];
    $('h2').each(function() {
        const $this = $(this);

        const id = $this.attr('id');
        let text = $this.find('.api-property__name').text();
        text = text.replace(`${ headerText }.`, '');

        const classes = [];
        if ($this.hasClass(API_PROPERTY)) {
            classes.push(TOCIFY_ITEM__API_PROPERTY);
        } else {
            classes.push(TOCIFY_ITEM__API_METHOD);
        }

        if ($this.hasClass(API_DEPRECATED)) {
            classes.push(TOCIFY_ITEM__API_DEPRECATED);
        }

        if ($this.hasClass(API_INHERITED)) {
            classes.push(TOCIFY_ITEM__API_INHERITED);
        }

        const item = `<li class='tocify-item ${ classes.join(' ') }' data-unique='${ text }' style='cursor: pointer;'>
            <a href='#${ id }'>${ text }</a>
        </li>`;

        subheader.push(item);
    });

    return `<ul class='tocify-header'>
        ${ header }
        ${ subheader.length ? 
            `<ul class='tocify-subheader' data-tag='2' style='display: none;'>
            ${ subheader.join('') }
            </ul>`
        : '' }
    </ul>`;
});
