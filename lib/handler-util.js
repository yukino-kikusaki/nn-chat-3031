'use strict';
const fs = require('node:fs');
const Cookies = require('cookies');
const config = require('../config');

function handleLogout(req, res) {
  res.writeHead(401, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.end(
    `<!DOCTYPE html><html lang="ja">
        <body>
            <h1>ログアウトしました</h1>
            <a href="/posts">ログイン</a>
        </body>
    </html>`
  );
}

function handleNotFound(req, res) {
  res.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('ページがみつかりません');
}

function handleBadRequest(req, res) {
  res.writeHead(400, {
    'Content-Type': 'text/plain; charset=utf-8'
  });
  res.end('未対応のリクエストです');
}

function handleFavicon(req, res) {
  res.writeHead(200, {
    'Content-Type': 'image/vnd.microsoft.icon',
    'Cache-Control': 'public, max-age=604800'
  });
  const favicon = fs.readFileSync('./favicon.ico');
  res.end(favicon);
}

function handleChangeTheme(req, res) {
  const cookies = new Cookies(req, res);
  if (cookies.get(config.currentThemeKey) !== 'light') {
    cookies.set(config.currentThemeKey, 'light');
  } else {
    cookies.set(config.currentThemeKey, 'dark');
  } 
  res.writeHead(303, {
    'Location': '/posts'
  });
  res.end();
}

module.exports = {
  handleLogout,
  handleNotFound,
  handleBadRequest,
  handleFavicon,
  handleChangeTheme
};