import assert from "node:assert/strict";
import { cheats } from "../data/cheats.js";
import { normalizeText, searchCheats } from "../js/search.js";

assert.equal(cheats.length, 6, "Prototype phải có đúng 6 chủ đề đại diện");
assert.equal(new Set(cheats.map((item) => item.id)).size, cheats.length, "id phải duy nhất");

for (const item of cheats) {
  assert.ok(item.id, "Thiếu id");
  assert.ok(["html", "css", "javascript"].includes(item.language), "language không hợp lệ");
  assert.ok(item.title && item.description, "Thiếu tiêu đề hoặc mô tả");
  assert.ok(Array.isArray(item.tags) && item.tags.length > 0, "Thiếu tags");
  assert.ok(Array.isArray(item.aliases) && item.aliases.length > 0, "Thiếu aliases");
  assert.equal(typeof item.htmlCode, "string");
  assert.equal(typeof item.cssCode, "string");
  assert.equal(typeof item.jsCode, "string");
}

assert.equal(normalizeText("Căn giữa"), "can giua");
assert.equal(searchCheats(cheats, { query: "can giua" })[0].id, "css-flexbox");
assert.equal(searchCheats(cheats, { query: "bấm nút" })[0].id, "js-dom-click-event");
assert.equal(searchCheats(cheats, { language: "html" }).length, 2);
assert.equal(searchCheats(cheats, { language: "css" }).length, 2);
assert.equal(searchCheats(cheats, { language: "javascript" }).length, 2);

console.log("PASS: dữ liệu, id, tìm kiếm không dấu và bộ lọc ngôn ngữ");
