'use strict';

/*
 * Discorbit website server.
 * The site itself is plain HTML, CSS and JavaScript. This small Express app
 * only serves those files, so the project can run as a Node.js app
 * (for example on Hostinger: `npm install`, then `npm start`).
 */

const path = require('path');
const express = require('express');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const app = express();
app.disable('x-powered-by');

// Fonts, styles, scripts and images
app.use('/assets', express.static(path.join(ROOT, 'assets'), { maxAge: '7d' }));

// Only these top-level files are public; server code is never served
const PAGES = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/404.html': '404.html',
  '/robots.txt': 'robots.txt',
  '/sitemap.xml': 'sitemap.xml',
  '/site.webmanifest': 'site.webmanifest'
};

Object.keys(PAGES).forEach(function (route) {
  app.get(route, function (req, res) {
    res.sendFile(path.join(ROOT, PAGES[route]));
  });
});

// Everything else: the "page not found" page
app.use(function (req, res) {
  res.status(404).sendFile(path.join(ROOT, '404.html'));
});

app.listen(PORT, function () {
  console.log('Discorbit site is running on port ' + PORT);
});
