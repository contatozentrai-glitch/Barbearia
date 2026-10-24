const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.svg':'image/svg+xml','.ttf':'font/ttf'};
http.createServer((req,res) => {
  let filename;
  try { filename = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); }
  catch { res.writeHead(400); return res.end(); }
  if (filename === root) filename = path.join(root,'index.html');
  if (!filename.startsWith(root + path.sep)) {res.writeHead(403); return res.end();}
  const relative = path.relative(root, filename).replaceAll(path.sep, '/');
  if (!['index.html','style.css','script.js'].includes(relative) && !relative.startsWith('assets/')) { res.writeHead(404); return res.end('Not found'); }
  fs.readFile(filename, (error,data) => {
    if (error) {res.writeHead(404);return res.end('Not found');}
    res.writeHead(200, {'Content-Type':mime[path.extname(filename)] || 'application/octet-stream','Cache-Control':'no-cache'});res.end(data);
  });
}).listen(4185,'127.0.0.1',() => console.log('Local: http://127.0.0.1:4185'));
