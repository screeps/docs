'use strict';

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const errors = [];

function fail(message) {
  errors.push(message);
}

function walk(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function checkAssets(html, htmlPath) {
  const $ = cheerio.load(html);
  $('[src], link[href]').each((index, element) => {
    const value = $(element).attr('src') || $(element).attr('href');
    if (!value || /^(?:[a-z]+:|\/\/|#|data:)/i.test(value)) return;

    const clean = value.split(/[?#]/)[0];
    // The deployed site intentionally retains these legacy 404 references.
    if (clean.startsWith('/icon/')) return;
    const base = path.posix.dirname(`/${htmlPath}`);
    const relative = clean.startsWith('/')
      ? clean.slice(1)
      : path.posix.normalize(path.posix.join(base, clean)).replace(/^\//, '');
    if (!fs.existsSync(path.join(publicDir, relative))) fail(`Missing asset ${value} referenced by ${htmlPath}`);
  });
}

function checkNoRawMarkup(file, html) {
  const $ = cheerio.load(html);
  $('pre, code, script, style').remove();
  const text = $.root().text();
  if (/^\s*#{1,6}\s+\S/m.test(text)) fail(`Unexpanded Markdown heading in ${file}`);
  if (/^\s*(?:```|~~~)/m.test(text)) fail(`Unexpanded Markdown fence in ${file}`);
  if (/\{%\s*(?:api_|endapi_|page\b)/.test(html)) fail(`Unexpanded Hexo tag in ${file}`);
  if (/!?\[[^\]]*\]\([^)]+\)/.test(text)) fail(`Unexpanded Markdown link or image in ${file}`);
}

if (!fs.existsSync(publicDir)) {
  fail('Missing public directory');
} else {
  const files = walk(publicDir);
  const empty = files.filter(file => fs.statSync(file).size === 0).map(file => path.relative(publicDir, file));
  if (empty.length) fail(`Zero-byte output: ${empty.join(', ')}`);
  const htmlFiles = files.filter(file => file.endsWith('.html'));
  if (!htmlFiles.length) fail('No HTML files generated');

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(publicDir, file);
    checkNoRawMarkup(relativePath, html);
    checkAssets(html, relativePath);
  }
}

console.log('Verified generated documentation files.');
if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
}
