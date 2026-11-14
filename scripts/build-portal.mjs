import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const portalRoot = path.resolve(__dirname, '..');
const projectsRoot = path.resolve(portalRoot, '..');

const ayroDir = path.join(projectsRoot, 'code-library-ayroui');
const goiTenDir = path.join(projectsRoot, 'Web_goi_ten');

function runBuild(label, cwd, extraEnv = {}) {
  console.log(`\n▶ Building ${label} in ${cwd}...`);
  if (!fs.existsSync(cwd)) {
    throw new Error(`Missing source project directory: ${cwd}`);
  }
  const result = spawnSync('npm', ['run', 'build'], {
    cwd,
    env: { ...process.env, ...extraEnv },
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) {
    throw new Error(`Build failed for ${label} (exit code ${result.status ?? 'unknown'})`);
  }
}

function walkHtmlFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

function injectPortalNav(targetDir) {
  const htmlFiles = walkHtmlFiles(targetDir);
  let patched = 0;
  for (const htmlFile of htmlFiles) {
    const raw = fs.readFileSync(htmlFile, 'utf8');
    if (raw.includes('portal-nav.js') || !raw.includes('</body>')) {
      continue;
    }
    const rel = path.relative(path.dirname(htmlFile), portalRoot).replace(/\\/g, '/');
    const scriptSrc = `${rel ? `${rel}/` : ''}assets/portal-nav.js`;
    const tag = `<script src="${scriptSrc}" defer></script>\n</body>`;
    const updated = raw.replace('</body>', tag);
    fs.writeFileSync(htmlFile, updated, 'utf8');
    patched += 1;
  }
  return { totalHtml: htmlFiles.length, patched };
}

function getDirStats(dir) {
  let files = 0;
  let bytes = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = getDirStats(fullPath);
      files += sub.files;
      bytes += sub.bytes;
    } else if (entry.isFile()) {
      files += 1;
      bytes += fs.statSync(fullPath).size;
    }
  }
  return { files, bytes };
}

function syncStaticOutput(srcDir, destDir, label) {
  if (!fs.existsSync(srcDir)) {
    throw new Error(`Expected build output missing for ${label}: ${srcDir}`);
  }
  fs.rmSync(destDir, { recursive: true, force: true });
  fs.cpSync(srcDir, destDir, { recursive: true });
  const navStats = injectPortalNav(destDir);
  const sizeStats = getDirStats(destDir);
  const mb = (sizeStats.bytes / (1024 * 1024)).toFixed(2);
  console.log(
    `✓ Synced ${label} -> ${path.relative(portalRoot, destDir)} (${sizeStats.files} files, ${mb} MB, injected portal-nav into ${navStats.patched}/${navStats.totalHtml} HTML files)`
  );
}

runBuild('Ayro UI Library (code-library-ayroui)', ayroDir, {
  NEXT_PUBLIC_BASE_PATH: '/web-library/ayroui',
});
runBuild('Gọi Tên Ngẫu Nhiên (Web_goi_ten)', goiTenDir);

syncStaticOutput(path.join(ayroDir, 'out'), path.join(portalRoot, 'ayroui'), 'ayroui');
syncStaticOutput(path.join(goiTenDir, 'dist'), path.join(portalRoot, 'goi-ten'), 'goi-ten');

console.log('\n✓ Portal static build sync complete.');
