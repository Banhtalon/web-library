import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { cheats } from "../data/cheats.js";
import { buildPreviewDocument } from "../js/playground.js";
import { highlightCode } from "../js/syntax.js";

for (const item of cheats) {
  const previewDocument = buildPreviewDocument({
    html: item.htmlCode,
    css: item.cssCode,
    javascript: item.jsCode,
    renderId: item.id
  });

  assert.match(previewDocument, /<!doctype html>/i, `${item.id}: thiếu doctype`);
  assert.ok(previewDocument.includes(item.htmlCode), `${item.id}: HTML chưa được ghép`);
  assert.ok(previewDocument.includes(item.cssCode), `${item.id}: CSS chưa được ghép`);
  assert.ok(
    previewDocument.includes(item.jsCode),
    `${item.id}: JavaScript chưa được ghép`
  );
  assert.match(
    previewDocument,
    /id="webblocks-error"/,
    `${item.id}: thiếu vùng hiển thị lỗi JavaScript`
  );
  assert.match(
    previewDocument,
    /type: "ready"/,
    `${item.id}: preview chưa gửi tín hiệu ready`
  );
}

const escapedDocument = buildPreviewDocument({
  html: "<h1>Kiểm tra</h1>",
  css: "body {} </style><p>Không được thoát style</p><style>",
  javascript:
    'console.log("test");</script><p>Không được thoát script</p><script>'
});

assert.ok(
  escapedDocument.includes("<\\/style>"),
  "Thẻ đóng style trong code người dùng phải được escape"
);
assert.ok(
  escapedDocument.includes("<\\/script>"),
  "Thẻ đóng script trong code người dùng phải được escape"
);

const highlightedHtml = highlightCode(
  '<main class="profile-card"><h1>Xin chào</h1></main>',
  "html",
  ["h1"]
);

assert.match(highlightedHtml, /syntax-focus-tag/);
assert.doesNotMatch(
  highlightedHtml,
  /class=&quot;syntax-/,
  "Highlighter không được highlight lại markup do chính nó sinh ra"
);
assert.doesNotMatch(
  highlightedHtml,
  />class="syntax-/,
  "Tên class nội bộ không được lộ ra như nội dung code"
);

const indexHtml = await readFile(new URL("../index.html", import.meta.url), "utf8");
assert.match(
  indexHtml,
  /sandbox="allow-scripts allow-forms"/,
  "Iframe cần cho phép script và form nhưng vẫn giữ sandbox"
);
assert.doesNotMatch(
  indexHtml,
  /allow-same-origin/,
  "Iframe không được cấp allow-same-origin"
);
assert.match(
  indexHtml,
  /\.\/css\/editor\.css/,
  "editor.css phải được load trực tiếp từ index.html"
);
assert.doesNotMatch(
  indexHtml,
  /cleanup\.css/,
  "Không được phụ thuộc cleanup.css sau khi đã dọn CSS"
);

const appSource = await readFile(new URL("../js/app.js", import.meta.url), "utf8");
assert.doesNotMatch(
  appSource,
  /DISPLAY_DEMO/,
  "app.js không được hard-code dữ liệu bài học trùng với data/cheats.js"
);
assert.doesNotMatch(
  appSource,
  /createElement\(["']link["']\)/,
  "app.js không được load CSS động"
);

const playgroundSource = await readFile(
  new URL("../js/playground.js", import.meta.url),
  "utf8"
);
assert.match(
  playgroundSource,
  /frame\.srcdoc = uniqueDocument/,
  "Playground cần nạp preview bằng srcdoc"
);
assert.match(
  playgroundSource,
  /window\.addEventListener\("message", handlePreviewMessage\)/,
  "Trang chính cần nhận trạng thái ready/error từ preview"
);

const editorCss = await readFile(new URL("../css/editor.css", import.meta.url), "utf8");
assert.match(
  editorCss,
  /\.dialog-header\s*\{[\s\S]*?position:\s*static;/,
  "Header của detail phải cuộn bình thường, không sticky"
);
assert.match(
  editorCss,
  /grid-template-columns:\s*repeat\(auto-fit,\s*minmax\(240px,\s*1fr\)\)/,
  "Grid gợi ý phải tự phân bố theo số lượng card"
);

console.log("PASS: preview, syntax highlighting, CSS cascade và cấu trúc playground");
