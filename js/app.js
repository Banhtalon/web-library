import { cheats as sourceCheats } from "../data/cheats.js";
import { searchCheats } from "./search.js";
import { createPlayground } from "./playground.js";

const editorStyle = document.createElement("link");
editorStyle.rel = "stylesheet";
editorStyle.href = "./css/editor.css";
document.head.append(editorStyle);

const DISPLAY_DEMO = {
  id: "css-display",
  language: "css",
  category: "Display",
  title: "display",
  description:
    "So sánh trực quan block, inline, inline-block và none bằng cách sửa code và xem bố cục thay đổi ngay.",
  difficulty: "Cơ bản",
  tags: ["display", "block", "inline"],
  aliases: ["display css", "inline block", "ẩn phần tử", "an phan tu", "layout css"],
  focusTokens: {
    css: ["display", "block", "inline", "inline-block", "none"]
  },
  quickActions: [
    { label: "Block", value: "block", code: "display: block;", description: "Mỗi phần tử bắt đầu trên một dòng mới." },
    { label: "Inline", value: "inline", code: "display: inline;", description: "Các phần tử nằm cùng dòng; width/height không hoạt động như block." },
    { label: "Inline-block", value: "inline-block", code: "display: inline-block;", description: "Nằm cùng dòng nhưng vẫn nhận width, height và padding." },
    { label: "None", value: "none", code: "display: none;", description: "Ẩn phần tử và không giữ chỗ trong bố cục." }
  ],
  suggestions: [
    { name: "Block", language: "css", code: ".item {\n  display: block;\n}", patch: { property: "display", value: "block", selector: ".item" } },
    { name: "Inline", language: "css", code: ".item {\n  display: inline;\n}", patch: { property: "display", value: "inline", selector: ".item" } },
    { name: "Inline-block", language: "css", code: ".item {\n  display: inline-block;\n}", patch: { property: "display", value: "inline-block", selector: ".item" } },
    { name: "None", language: "css", code: ".item {\n  display: none;\n}", patch: { property: "display", value: "none", selector: ".item" } }
  ],
  htmlCode: `<section class="demo-area">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</section>
<p class="display-note"></p>`,
  cssCode: `body {
  margin: 0;
  padding: 28px;
  font-family: Arial, sans-serif;
  background: #f8fafc;
}

.demo-area {
  min-height: 310px;
  padding: 22px;
  border: 2px dashed #cbd5e1;
  border-radius: 14px;
  background: white;
}

.item {
  display: block;
  width: 110px;
  min-height: 70px;
  margin: 8px;
  padding: 20px;
  border-radius: 10px;
  color: white;
  background: royalblue;
  text-align: center;
  font-weight: bold;
}

.display-note {
  margin-top: 16px;
  color: #475569;
}`,
  jsCode: `const item = document.querySelector(".item");
const note = document.querySelector(".display-note");
const value = getComputedStyle(item).display;
note.textContent = "Giá trị hiện tại: display: " + value;`
};

const HEADING_ENHANCEMENTS = {
  focusTokens: { html: ["h1", "h2", "h3", "h4", "h5", "h6", "p"] },
  suggestions: [
    { name: "H1 kết hợp H3", language: "html", code: "<h1>Xin chào, mình là Minh</h1>\n<h3>Mình đang học lập trình web</h3>" },
    { name: "H1 kết hợp H5", language: "html", code: "<h1>Xin chào, mình là Minh</h1>\n<h5>Mình đang học lập trình web</h5>" },
    { name: "H2 kết hợp H3", language: "html", code: "<h2>Xin chào, mình là Minh</h2>\n<h3>Mình đang học lập trình web</h3>" }
  ]
};

const cheats = sourceCheats.map((item) => {
  if (item.id === "css-flexbox") return DISPLAY_DEMO;
  if (item.id === "html-heading-paragraph") return { ...item, ...HEADING_ENHANCEMENTS };
  return item;
});

const LANGUAGE_LABELS = { html: "HTML", css: "CSS", javascript: "JAVASCRIPT" };
const state = { query: "", language: "all", activeItemId: null };

const elements = {
  searchInput: document.querySelector("#search-input"),
  clearSearch: document.querySelector("#clear-search"),
  emptyReset: document.querySelector("#empty-reset"),
  resultSummary: document.querySelector("#result-summary"),
  cheatList: document.querySelector("#cheat-list"),
  emptyState: document.querySelector("#empty-state"),
  cardTemplate: document.querySelector("#card-template"),
  filterButtons: [...document.querySelectorAll("[data-language]")],
  detailDialog: document.querySelector("#detail-dialog"),
  closeDialog: document.querySelector("#close-dialog"),
  detailLanguage: document.querySelector("#detail-language"),
  detailCategory: document.querySelector("#detail-category"),
  detailLevel: document.querySelector("#detail-level"),
  detailTitle: document.querySelector("#detail-title"),
  detailDescription: document.querySelector("#detail-description")
};

const playground = createPlayground();

function setLanguageBadge(element, language) {
  element.textContent = LANGUAGE_LABELS[language];
  element.dataset.language = language;
}

function updateFilterCounts() {
  const counts = cheats.reduce((result, item) => {
    result.all += 1;
    result[item.language] += 1;
    return result;
  }, { all: 0, html: 0, css: 0, javascript: 0 });

  Object.entries(counts).forEach(([language, count]) => {
    const counter = document.querySelector(`[data-filter-count="${language}"]`);
    if (counter) counter.textContent = count;
  });
  document.querySelector("#total-count").textContent = counts.all;
}

function createCard(item) {
  const fragment = elements.cardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".cheat-card");
  const badge = fragment.querySelector(".card-language");
  const openButton = fragment.querySelector(".open-card-button");
  card.dataset.language = item.language;
  setLanguageBadge(badge, item.language);
  fragment.querySelector(".card-level").textContent = item.difficulty;
  fragment.querySelector(".card-category").textContent = item.category;
  fragment.querySelector(".card-title").textContent = item.title;
  fragment.querySelector(".card-description").textContent = item.description;
  const tagList = fragment.querySelector(".tag-list");
  item.tags.slice(0, 3).forEach((tagText) => {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = tagText;
    tagList.append(tag);
  });
  openButton.setAttribute("aria-label", `Mở ví dụ ${item.title}`);
  openButton.addEventListener("click", () => openDetail(item.id));
  return fragment;
}

function renderCatalog() {
  const results = searchCheats(cheats, { query: state.query, language: state.language });
  elements.cheatList.replaceChildren(...results.map(createCard));
  const hasQuery = state.query.trim().length > 0;
  const languageLabel = state.language === "all" ? "" : ` trong ${LANGUAGE_LABELS[state.language]}`;
  elements.resultSummary.textContent = hasQuery
    ? `${results.length} kết quả cho “${state.query.trim()}”${languageLabel}`
    : `Đang hiển thị ${results.length} chủ đề${languageLabel}`;
  elements.clearSearch.hidden = !hasQuery;
  elements.cheatList.hidden = results.length === 0;
  elements.emptyState.hidden = results.length !== 0;
}

function setLanguageFilter(language) {
  state.language = language;
  elements.filterButtons.forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderCatalog();
}

function clearSearch({ focus = true } = {}) {
  state.query = "";
  elements.searchInput.value = "";
  renderCatalog();
  if (focus) elements.searchInput.focus();
}

function fillDetail(item) {
  setLanguageBadge(elements.detailLanguage, item.language);
  elements.detailCategory.textContent = item.category;
  elements.detailLevel.textContent = item.difficulty;
  elements.detailTitle.textContent = item.title;
  elements.detailDescription.textContent = item.description;
  playground.load(item, item.language);
}

function safelyUpdateHistory(method, stateValue, url) {
  try { history[method](stateValue, "", url); } catch {}
}

function openDetail(itemId, { updateHistory = true } = {}) {
  const item = cheats.find((entry) => entry.id === itemId);
  if (!item) return;
  state.activeItemId = item.id;
  if (!elements.detailDialog.open) elements.detailDialog.showModal();
  fillDetail(item);
  if (updateHistory && window.location.hash !== `#${item.id}`) {
    safelyUpdateHistory("pushState", { itemId: item.id }, `#${item.id}`);
  }
}

function closeDetail({ updateHistory = true } = {}) {
  if (elements.detailDialog.open) elements.detailDialog.close();
  state.activeItemId = null;
  if (updateHistory && window.location.hash) {
    safelyUpdateHistory("replaceState", null, `${window.location.pathname}${window.location.search}` || window.location.href.split("#")[0]);
  }
}

function syncDialogWithHash() {
  const itemId = decodeURIComponent(window.location.hash.slice(1));
  const itemExists = cheats.some((item) => item.id === itemId);
  if (itemId && itemExists) openDetail(itemId, { updateHistory: false });
  else if (elements.detailDialog.open) closeDetail({ updateHistory: false });
}

elements.searchInput.addEventListener("input", (event) => { state.query = event.target.value; renderCatalog(); });
elements.clearSearch.addEventListener("click", () => clearSearch());
elements.emptyReset.addEventListener("click", () => { state.language = "all"; clearSearch({ focus: false }); setLanguageFilter("all"); });
elements.filterButtons.forEach((button) => button.addEventListener("click", () => setLanguageFilter(button.dataset.language)));
elements.closeDialog.addEventListener("click", () => closeDetail());
elements.detailDialog.addEventListener("click", (event) => { if (event.target === elements.detailDialog) closeDetail(); });
elements.detailDialog.addEventListener("cancel", (event) => { event.preventDefault(); closeDetail(); });
window.addEventListener("popstate", syncDialogWithHash);
window.addEventListener("hashchange", syncDialogWithHash);

document.addEventListener("keydown", (event) => {
  const activeTag = document.activeElement?.tagName;
  const isTyping = activeTag === "INPUT" || activeTag === "TEXTAREA";
  if (event.key === "/" && !isTyping && !elements.detailDialog.open) { event.preventDefault(); elements.searchInput.focus(); }
  if (event.key === "Escape" && document.activeElement === elements.searchInput && elements.searchInput.value) clearSearch();
});

updateFilterCounts();
setLanguageFilter("all");
syncDialogWithHash();
