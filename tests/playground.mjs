import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { cheats } from "../data/cheats.js";
import { buildPreviewDocument } from "../js/playground.js";

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
  assert.ok(
    previewDocument.includes(`const renderId = ${JSON.stringify(item.id)}`),
    `${item.id}: thiếu renderId`
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

const appSource = await readFile(new URL("../js/app.js", import.meta.url), "utf8");
const showDialogIndex = appSource.indexOf("elements.detailDialog.showModal()");
const fillDetailIndex = appSource.indexOf("fillDetail(item)", showDialogIndex);

assert.ok(showDialogIndex >= 0, "Thiếu thao tác mở dialog");
assert.ok(
  fillDetailIndex > showDialogIndex,
  "Dialog phải được mở trước khi playground nạp iframe"
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
  /window\.setTimeout\(\(\) =>/,
  "Playground cần đợi dialog hiển thị trước khi render"
);
assert.match(
  playgroundSource,
  /window\.addEventListener\("message", handlePreviewMessage\)/,
  "Trang chính cần nhận trạng thái ready/error từ preview"
);

console.log("PASS: tài liệu preview, renderId, sandbox và thứ tự mở dialog");
