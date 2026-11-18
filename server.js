'use strict';

/*
 * Discorbit LLC website server.
 * The site is plain HTML, CSS and JavaScript. This small Express app only
 * serves those files, so the project can run as a Node.js app
 * (for example on Hostinger: npm install, then npm start).
 * Pages answer without ".html": /about, /wholesale, /contact ...
 */

const path = require('path');
const express = require('express');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
const PAGES = ['index', 'about', 'wholesale', 'contact', 'returns', 'privacy', 'terms'];
const FILES = ['robots.txt', 'sitemap.xml', 'site.webmanifest'];

const app = express();
app.disable('x-powered-by');

app.use('/assets', express.static(path.join(ROOT, 'assets'), { maxAge: '1h' }));

app.get('/', function (req, res) { res.sendFile(path.join(ROOT, 'index.html')); });
PAGES.forEach(function (name) {
  app.get('/' + name, function (req, res) { res.sendFile(path.join(ROOT, name + '.html')); });
  app.get('/' + name + '.html', function (req, res) { res.redirect(301, name === 'index' ? '/' : '/' + name); });
});
FILES.forEach(function (name) {
  app.get('/' + name, function (req, res) { res.sendFile(path.join(ROOT, name)); });
});

app.use(function (req, res) { res.status(404).sendFile(path.join(ROOT, '404.html')); });

app.listen(PORT, function () { console.log('Discorbit site is running on port ' + PORT); });
