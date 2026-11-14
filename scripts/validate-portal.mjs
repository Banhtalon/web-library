import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createPortalServer } from './serve-portal.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const portalRoot = path.resolve(__dirname, '..');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function walkHtml(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkHtml(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(fullPath);
    }
  }
  return out;
}

// 1. Validate original Code Library invariants
console.log('1/3 Running Code Library integrity check...');
const libCheck = spawnSync('node', [path.join(portalRoot, 'code-library', 'tests', 'validate-library.mjs')], {
  cwd: path.join(portalRoot, 'code-library'),
  stdio: 'inherit',
});
assert(libCheck.status === 0, 'code-library/tests/validate-library.mjs failed');

// 2. Validate files & HTML asset prefix hygiene
console.log('\n2/3 Checking Portal structure and asset prefix hygiene...');
const requiredPaths = [
  '.nojekyll',
  'index.html',
  'assets/portal.css',
  'assets/portal.js',
  'assets/portal-nav.js',
  'assets/illustrations/code-library.jpg',
  'assets/illustrations/ayroui.jpg',
  'assets/illustrations/goi-ten.jpg',
  'code-library/index.html',
  'ayroui/index.html',
  'ayroui/_next',
  'ayroui/bootstrap-components/index.html',
  'ayroui/docs/index.html',
  'ayroui/pricing/index.html',
  'goi-ten/index.html',
  'goi-ten/assets',
  'goi-ten/favicon.svg',
  'goi-ten/qr-momo.jpg',
];

for (const rel of requiredPaths) {
  assert(fs.existsSync(path.join(portalRoot, rel)), `Missing required portal path: ${rel}`);
}

const forbiddenEmojiIcons = ['🧩', '🎨', '🎲', '🌙', '☀️', '🏠'];
for (const rel of ['index.html', 'assets/portal.js', 'assets/portal-nav.js']) {
  const src = fs.readFileSync(path.join(portalRoot, rel), 'utf8');
  for (const emoji of forbiddenEmojiIcons) {
    assert(!src.includes(emoji), `Forbidden structural emoji icon (${emoji}) found in ${rel}`);
  }
}

const ayroHtmlFiles = walkHtml(path.join(portalRoot, 'ayroui'));
assert(ayroHtmlFiles.length >= 10, `Expected at least 10 HTML files in ayroui/, got ${ayroHtmlFiles.length}`);
for (const file of ayroHtmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  assert(!html.includes('"/_next/'), `Unprefixed "/_next/ found in ${path.relative(portalRoot, file)}`);
  assert(!html.includes('href="/favicon.png"'), `Unprefixed favicon href found in ${path.relative(portalRoot, file)}`);
  assert(!html.includes('src="/images/'), `Unprefixed src="/images/ found in ${path.relative(portalRoot, file)}`);
  assert(html.includes('portal-nav.js'), `Missing portal-nav.js injection in ${path.relative(portalRoot, file)}`);
}

const goiTenHtml = fs.readFileSync(path.join(portalRoot, 'goi-ten', 'index.html'), 'utf8');
assert(!goiTenHtml.includes('href="/favicon.svg"'), 'goi-ten/index.html still references root /favicon.svg');
assert(!goiTenHtml.includes('href="/icon-192.png"'), 'goi-ten/index.html still references root /icon-192.png');
assert(!goiTenHtml.includes('"/assets/'), 'goi-ten/index.html still references root /assets/');
assert(goiTenHtml.includes('portal-nav.js'), 'Missing portal-nav.js injection in goi-ten/index.html');

// 3. Real HTTP checks via GitHub Pages subpath simulator
console.log('\n3/3 Verifying live HTTP routes via serve-portal...');
const server = createPortalServer({ rootDir: portalRoot, basePath: '/web-library' });
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

try {
  const address = server.address();
  const origin = `http://127.0.0.1:${address.port}`;

  async function expectStatus(urlPath, expectedStatus, options = {}) {
    const res = await fetch(`${origin}${urlPath}`, { redirect: options.redirect ?? 'follow' });
    assert(res.status === expectedStatus, `GET ${urlPath} returned ${res.status}, expected ${expectedStatus}`);
    return res;
  }

  await expectStatus('/', 302, { redirect: 'manual' });
  await expectStatus('/web-library', 301, { redirect: 'manual' });
  await expectStatus('/web-library/ayroui', 301, { redirect: 'manual' });
  await expectStatus('/web-library/code-library', 301, { redirect: 'manual' });
  await expectStatus('/web-library/goi-ten', 301, { redirect: 'manual' });

  const portalRes = await expectStatus('/web-library/', 200);
  const portalHtml = await portalRes.text();
  assert(portalHtml.includes('./code-library/') && portalHtml.includes('./ayroui/') && portalHtml.includes('./goi-ten/'), 'Portal index missing links to all 3 apps');

  await expectStatus('/web-library/assets/portal.css', 200);
  await expectStatus('/web-library/assets/portal.js', 200);
  await expectStatus('/web-library/assets/portal-nav.js', 200);
  await expectStatus('/web-library/assets/illustrations/code-library.jpg', 200);
  await expectStatus('/web-library/assets/illustrations/ayroui.jpg', 200);
  await expectStatus('/web-library/assets/illustrations/goi-ten.jpg', 200);

  await expectStatus('/web-library/code-library/', 200);
  await expectStatus('/web-library/code-library/css/app.css', 200);
  await expectStatus('/web-library/code-library/data/components.js', 200);

  const ayroIndexRes = await expectStatus('/web-library/ayroui/', 200);
  const ayroIndexHtml = await ayroIndexRes.text();
  const nextAssetMatch = ayroIndexHtml.match(/\/web-library\/ayroui\/_next\/static\/[^"'\s<>]+/);
  assert(nextAssetMatch, 'Could not find /web-library/ayroui/_next/static asset reference in ayroui/index.html');
  await expectStatus(nextAssetMatch[0], 200);

  await expectStatus('/web-library/ayroui/bootstrap-components/', 200);
  await expectStatus('/web-library/ayroui/bootstrap-components/headers/', 200);
  await expectStatus('/web-library/ayroui/docs/', 200);
  await expectStatus('/web-library/ayroui/pricing/', 200);
  await expectStatus('/web-library/ayroui/styles/bootstrap.min.css', 200);
  await expectStatus('/web-library/ayroui/js/bootstrap.bundle.min.js', 200);
  await expectStatus('/web-library/ayroui/favicon.png', 200);

  const goiTenRes = await expectStatus('/web-library/goi-ten/', 200);
  const goiTenServedHtml = await goiTenRes.text();
  const goiTenJsMatch = goiTenServedHtml.match(/\.\/assets\/index-[^"'\s]+\.js/);
  const goiTenCssMatch = goiTenServedHtml.match(/\.\/assets\/index-[^"'\s]+\.css/);
  assert(goiTenJsMatch && goiTenCssMatch, 'Could not locate relative ./assets/index-* JS/CSS in goi-ten/index.html');
  await expectStatus(`/web-library/goi-ten/${goiTenJsMatch[0].slice(2)}`, 200);
  await expectStatus(`/web-library/goi-ten/${goiTenCssMatch[0].slice(2)}`, 200);
  await expectStatus('/web-library/goi-ten/favicon.svg', 200);
  await expectStatus('/web-library/goi-ten/qr-momo.jpg', 200);

  console.log('✓ All HTTP routes, redirects, and bundled assets verified (200/301/302).');
} finally {
  await new Promise((resolve) => server.close(resolve));
}
