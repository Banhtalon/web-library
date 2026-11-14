import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_ROOT_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function sendFile(res, filePath, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(statusCode, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
}

export function createPortalServer({
  rootDir = DEFAULT_ROOT_DIR,
  basePath = '/web-library',
} = {}) {
  const normalizedBase = basePath === '/' ? '' : `/${basePath.replace(/^\/+|\/+$/g, '')}`;

  return http.createServer((req, res) => {
    const rawUrl = req.url || '/';
    const parsedUrl = new URL(rawUrl, 'http://127.0.0.1');
    let pathname = decodeURIComponent(parsedUrl.pathname);

    if (normalizedBase && (pathname === '/' || pathname === normalizedBase)) {
      const target = `${normalizedBase}/${parsedUrl.search}`;
      res.writeHead(pathname === '/' ? 302 : 301, { Location: target });
      res.end();
      return;
    }

    if (normalizedBase) {
      if (!pathname.startsWith(`${normalizedBase}/`)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`Not Found. Try ${normalizedBase}/`);
        return;
      }
      pathname = pathname.slice(normalizedBase.length) || '/';
    }

    const relPath = pathname.replace(/^\/+/, '');
    const resolved = path.resolve(rootDir, relPath);
    if (!resolved.startsWith(rootDir)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Forbidden');
      return;
    }

    if (fs.existsSync(resolved)) {
      const stat = fs.statSync(resolved);
      if (stat.isDirectory()) {
        if (!parsedUrl.pathname.endsWith('/')) {
          res.writeHead(301, { Location: `${parsedUrl.pathname}/${parsedUrl.search}` });
          res.end();
          return;
        }
        const indexFile = path.join(resolved, 'index.html');
        if (fs.existsSync(indexFile)) {
          sendFile(res, indexFile);
          return;
        }
      } else if (stat.isFile()) {
        sendFile(res, resolved);
        return;
      }
    }

    const htmlCandidate = path.resolve(rootDir, `${relPath}.html`);
    if (htmlCandidate.startsWith(rootDir) && fs.existsSync(htmlCandidate) && fs.statSync(htmlCandidate).isFile()) {
      sendFile(res, htmlCandidate);
      return;
    }

    if (pathname.startsWith('/ayroui/')) {
      const ayro404 = path.join(rootDir, 'ayroui', '404.html');
      if (fs.existsSync(ayro404)) {
        sendFile(res, ayro404, 404);
        return;
      }
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  });
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isMain) {
  const port = Number(process.env.PORT || 3080);
  const host = process.env.HOST || '127.0.0.1';
  const server = createPortalServer();
  server.listen(port, host, () => {
    console.log(`Portal server running at http://${host}:${port}/web-library/`);
    console.log('Subpaths:');
    console.log(`  - Portal:       http://${host}:${port}/web-library/`);
    console.log(`  - Code Library: http://${host}:${port}/web-library/code-library/`);
    console.log(`  - Ayro UI:      http://${host}:${port}/web-library/ayroui/`);
    console.log(`  - Gọi Tên:      http://${host}:${port}/web-library/goi-ten/`);
  });
}
