import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);

const categories = require(path.join(rootDir, "data", "categories.js"));
const components = require(path.join(rootDir, "data", "components.js"));
const categoriesJson = JSON.parse(
  fs.readFileSync(path.join(rootDir, "data", "categories.json"), "utf8")
);
const componentsJson = JSON.parse(
  fs.readFileSync(path.join(rootDir, "data", "components", "index.json"), "utf8")
);

// 1. Validate 25 categories
assert.ok(Array.isArray(categories), "categories must be an array");
assert.equal(categories.length, 25, `Expected 25 categories, got: ${categories.length}`);

const slugSet = new Set();
for (const cat of categories) {
  assert.ok(cat.slug && typeof cat.slug === "string", "Category missing slug");
  assert.ok(!slugSet.has(cat.slug), `Duplicate category slug: ${cat.slug}`);
  slugSet.add(cat.slug);
  assert.ok(cat.nameEn && cat.nameVi, `Category ${cat.slug} missing bilingual names`);
  assert.ok(cat.description, `Category ${cat.slug} missing description`);
  assert.ok(Array.isArray(cat.keywords) && cat.keywords.length > 0, `Category ${cat.slug} missing keywords`);
}

// 2. Validate all 219 CodeShikhi components
assert.ok(Array.isArray(components), "components must be an array");
assert.equal(components.length, 219, `Expected 219 components from CodeShikhi, got: ${components.length}`);

const idSet = new Set();
const categoryCoverage = new Map(categories.map((c) => [c.slug, 0]));

for (const comp of components) {
  assert.ok(comp.id && typeof comp.id === "string", "Component missing id");
  assert.ok(!idSet.has(comp.id), `Duplicate component id: ${comp.id}`);
  idSet.add(comp.id);

  assert.ok(slugSet.has(comp.category), `Component ${comp.id} references unknown category: ${comp.category}`);
  categoryCoverage.set(comp.category, (categoryCoverage.get(comp.category) || 0) + 1);

  assert.ok(comp.title && comp.titleVi, `Component ${comp.id} missing title or titleVi`);
  assert.ok(comp.summary, `Component ${comp.id} missing summary`);
  assert.ok(comp.html && comp.html.trim().length >= 10, `Component ${comp.id} has empty HTML`);
  assert.ok(comp.css && comp.css.trim().length >= 10, `Component ${comp.id} has empty CSS`);
  assert.ok(typeof comp.js === "string" && comp.js.trim().length > 0, `Component ${comp.id} has empty JS`);
  assert.ok(Array.isArray(comp.tags) && comp.tags.length > 0, `Component ${comp.id} missing tags`);

  // Ensure HTML is clean (no embedded <style>, <script>, or external CDN script/link tags)
  assert.ok(
    !/<style[\s>]/i.test(comp.html) && !/<script[\s>]/i.test(comp.html),
    `Component ${comp.id} HTML must not contain inline <style> or <script> tags`
  );
  assert.ok(
    !comp.html.includes("bootstrap.min") && !comp.html.includes("jquery"),
    `Component ${comp.id} HTML must not reference external bootstrap.min or jquery`
  );

  // Ensure no duplicate customCss / customJs representations remain
  assert.equal(comp.customCss, undefined, `Component ${comp.id} must not have duplicate customCss field`);
  assert.equal(comp.customJs, undefined, `Component ${comp.id} must not have duplicate customJs field`);

  // Ensure comp.js is syntactically valid JavaScript (never misplaced CSS)
  assert.doesNotThrow(
    () => new Function(comp.js),
    `Component ${comp.id} has invalid JS syntax in comp.js`
  );

  // Ensure every getElementById('...') in comp.js exists in comp.html
  for (const m of comp.js.matchAll(/getElementById\(\s*['"]([^'"]+)['"]\s*\)/g)) {
    const targetId = m[1];
    assert.ok(
      comp.html.includes(`id="${targetId}"`) || comp.html.includes(`id='${targetId}'`),
      `Component ${comp.id} JS references missing #${targetId} in HTML`
    );
  }
}

// 3. Validate exact category counts (e.g. Header & Navbar has 9 designs)
assert.equal(categoryCoverage.get("header"), 9, "Header & Navbar must have all 9 designs");
assert.equal(categoryCoverage.get("button"), 8, "Button must have all 8 designs");
assert.equal(categoryCoverage.get("hero"), 11, "Hero Sections must have all 11 designs");
assert.equal(categoryCoverage.get("full-page-com"), 18, "Full Page Component must have all 18 designs");

for (const [slug, count] of categoryCoverage.entries()) {
  assert.ok(count >= 8, `Category '${slug}' expected at least 8 designs, got ${count}`);
}

// 4. Ensure 100% sync between .js and .json files
assert.deepEqual(categories, categoriesJson, "data/categories.js and data/categories.json out of sync!");
assert.deepEqual(components, componentsJson, "data/components.js and data/components/index.json out of sync!");

// 5. Verify required files, syntax highlighter, and offline preview runtime
for (const relPath of [
  "index.html",
  "css/app.css",
  "js/app.js",
  "js/preview-base.js",
  "js/code-formatter.js",
  "README.md",
  "PROJECT_STATE.md",
  "CHANGELOG.md",
  "inbox/README.md"
]) {
  assert.ok(fs.existsSync(path.join(rootDir, relPath)), `Missing required file: ${relPath}`);
}

const indexHtml = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
const appJs = fs.readFileSync(path.join(rootDir, "js", "app.js"), "utf8");
const appCss = fs.readFileSync(path.join(rootDir, "css", "app.css"), "utf8");

assert.ok(indexHtml.includes('sandbox="allow-scripts allow-forms"'), "index.html must include allow-forms in preview sandbox");
assert.ok(appJs.includes('sandbox="allow-scripts allow-forms"'), "js/app.js must include allow-forms in preview sandbox");
assert.ok(appJs.includes("cl-preview-escape"), "js/app.js must forward Escape from fullscreen iframe");
assert.ok(appJs.includes("window.addEventListener('resize'"), "js/app.js autoHeight must re-measure on iframe resize");
assert.ok(appJs.includes(".vh-100{height:640px!important}"), "js/app.js autoHeight must guard vh-100 from feedback loops");
assert.ok(appJs.includes("getComponentTabCode"), "js/app.js must use shared getComponentTabCode for preview and copy");
assert.ok(appJs.includes("skipToMainLink"), "js/app.js must handle skipToMainLink without breaking routing");
assert.ok(appJs.includes("data-cat-toggle"), "js/app.js must support accordion category tree");
assert.ok(appJs.includes("highlightedCodeEl"), "js/app.js must render syntax-highlighted source code");
assert.ok(!appJs.includes('data-tab="full"'), "js/app.js must only show 3 tabs: HTML, CSS, JS");
assert.ok(appCss.includes("--hljs-tag: #22863a"), "css/app.css must include CodeShikhi hljs syntax colors");

// 6. Verify CL_BUILD_COMPONENT_CSS produces complete CSS for services-3col
globalThis.window = globalThis;
eval(fs.readFileSync(path.join(rootDir, "js", "code-formatter.js"), "utf8"));
eval(fs.readFileSync(path.join(rootDir, "js", "preview-base.js"), "utf8"));
const services3Col = components.find((c) => c.id === "services-3col");
const builtCss = globalThis.CL_BUILD_COMPONENT_CSS(services3Col);
assert.ok(builtCss.includes(".col-lg-4") && builtCss.includes(".card") && builtCss.includes(".bi-laptop") && builtCss.includes(".service-card:hover"), "CL_BUILD_COMPONENT_CSS must include layout, card, icon, and custom hover rules for services-3col");

console.log(`✓ Validation passed: ${categories.length} categories, ${components.length} components (9 Header designs), syntax-highlighted source code, and offline LivePreview runtime.`);
