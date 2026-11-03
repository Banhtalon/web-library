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

// 1. Kiểm tra số lượng và tính duy nhất của 25 danh mục
assert.ok(Array.isArray(categories), "categories phải là một mảng");
assert.ok(categories.length >= 25, `Cần tối thiểu 25 danh mục, hiện có: ${categories.length}`);

const slugSet = new Set();
for (const cat of categories) {
  assert.ok(cat.slug && typeof cat.slug === "string", "Danh mục thiếu slug");
  assert.ok(!slugSet.has(cat.slug), `Trùng lặp category slug: ${cat.slug}`);
  slugSet.add(cat.slug);
  assert.ok(cat.nameEn && cat.nameVi, `Danh mục ${cat.slug} thiếu tên song ngữ`);
  assert.ok(cat.description, `Danh mục ${cat.slug} thiếu mô tả`);
  assert.ok(Array.isArray(cat.keywords) && cat.keywords.length > 0, `Danh mục ${cat.slug} thiếu keywords`);
}

// 2. Kiểm tra danh sách Component & Template
assert.ok(Array.isArray(components), "components phải là một mảng");
assert.ok(components.length >= 25, `Cần tối thiểu 25 component khởi đầu, hiện có: ${components.length}`);

const idSet = new Set();
const categoryCoverage = new Map(categories.map((c) => [c.slug, 0]));

for (const comp of components) {
  assert.ok(comp.id && typeof comp.id === "string", "Component thiếu id");
  assert.ok(!idSet.has(comp.id), `Trùng lặp component id: ${comp.id}`);
  idSet.add(comp.id);

  assert.ok(slugSet.has(comp.category), `Component ${comp.id} trỏ tới danh mục không tồn tại: ${comp.category}`);
  categoryCoverage.set(comp.category, (categoryCoverage.get(comp.category) || 0) + 1);

  assert.ok(comp.title && comp.titleVi, `Component ${comp.id} thiếu title hoặc titleVi`);
  assert.ok(comp.summary, `Component ${comp.id} thiếu summary`);
  assert.ok(comp.html && comp.html.trim().length > 20, `Component ${comp.id} có mã HTML quá ngắn hoặc rỗng`);
  assert.ok(comp.css && comp.css.trim().length > 20, `Component ${comp.id} có mã CSS quá ngắn hoặc rỗng`);
  assert.ok(typeof comp.js === "string" && comp.js.trim().length > 0, `Component ${comp.id} thiếu tương tác JS`);
  assert.ok(Array.isArray(comp.tags) && comp.tags.length > 0, `Component ${comp.id} thiếu tags`);

  // Đảm bảo không phụ thuộc Bootstrap
  assert.ok(
    !comp.html.includes("data-bs-") && !comp.html.includes("bootstrap.min"),
    `Component ${comp.id} không được chứa thuộc tính của Bootstrap`
  );
}

// 3. Đảm bảo tất cả 25 danh mục đều có ít nhất 1 mẫu
for (const [slug, count] of categoryCoverage.entries()) {
  assert.ok(count >= 1, `Danh mục '${slug}' chưa có mẫu component nào!`);
}

// 4. Đảm bảo đồng bộ 100% giữa file .js và file .json
assert.deepEqual(categories, categoriesJson, "data/categories.js và data/categories.json chưa đồng bộ!");
assert.deepEqual(components, componentsJson, "data/components.js và data/components/index.json chưa đồng bộ!");

// 5. Kiểm tra sự tồn tại của các tài liệu cốt lõi và các quy tắc bảo vệ UI
for (const relPath of ["index.html", "css/app.css", "js/app.js", "README.md", "PROJECT_STATE.md", "CHANGELOG.md", "inbox/README.md"]) {
  assert.ok(fs.existsSync(path.join(rootDir, relPath)), `Thiếu file bắt buộc: ${relPath}`);
}

const indexHtml = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
const appJs = fs.readFileSync(path.join(rootDir, "js", "app.js"), "utf8");
const appCss = fs.readFileSync(path.join(rootDir, "css", "app.css"), "utf8");

assert.ok(indexHtml.includes('sandbox="allow-scripts allow-forms"'), "index.html phải cho phép allow-forms trong sandbox preview");
assert.ok(appJs.includes('sandbox="allow-scripts allow-forms"'), "js/app.js phải cho phép allow-forms trong sandbox preview");
assert.ok(appJs.includes("cl-preview-escape"), "js/app.js phải chuyển tiếp phím Escape từ iframe toàn màn hình");
assert.ok(appJs.includes("skipToMainLink"), "js/app.js phải xử lý skipToMainLink không làm mất route");
assert.ok(appCss.includes("flex-wrap: wrap"), "css/app.css phải hỗ trợ xuống dòng cho thanh điều hướng trên mobile");

console.log(`✓ Kiểm thử thành công: ${categories.length} danh mục, ${components.length} mẫu Component/Template thuần HTML/CSS/JS, đồng bộ JSON 100%.`);
