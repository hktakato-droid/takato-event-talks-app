
const fs = require('fs');
const path = require('path');

const build = () => {
  const htmlPath = path.join(__dirname, 'index.html');
  const cssPath = path.join(__dirname, 'style.css');
  const jsPath = path.join(__dirname, 'script.js');
  const talksPath = path.join(__dirname, 'talks.json');
  const distPath = path.join(__dirname, 'dist', 'index.html');

  let html = fs.readFileSync(htmlPath, 'utf-8');
  const css = fs.readFileSync(cssPath, 'utf-8');
  let js = fs.readFileSync(jsPath, 'utf-8');
  const talks = fs.readFileSync(talksPath, 'utf-8');

  js = js.replace("fetch('talks.json')", `new Promise(resolve => resolve(${talks}))`);

  html = html.replace('</head>', `<style>${css}</style></head>`);
  html = html.replace('</body>', `<script>${js}</script></body>`);

  fs.writeFileSync(distPath, html);

  console.log('Website built successfully!');
};

build();
