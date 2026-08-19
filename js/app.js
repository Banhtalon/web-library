import { cheats } from "../data/cheats.js";
import { searchCheats } from "./search.js";
import { createPlayground } from "./playground.js";

const LANGUAGE_LABELS = {
  html: "HTML",
  css: "CSS",
  javascript: "JAVASCRIPT"
};

const state = {
  query: "",
  language: "all",
  activeItemId: null
};

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
  detailDescription: document.querySelector("#detail-description"),
  detailNote: document.querySelector("#detail-note"),
  detailMistake: document.querySelector("#detail-mistake"),
  detailExercise: document.querySelector("#detail-exercise")
};

const playground = createPlayground();

function setLanguageBadge(element, language) {
  element.textContent = LANGUAGE_LABELS[language];
  element.dataset.language = language;
}

function updateFilterCounts() {
  const counts = cheats.reduce(
    (result, item) => {
      result.all += 1;
      result[item.language] += 1;
      return result;
    },
    { all: 0, html: 0, css: 0, javascript: 0 }
  );

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
  const results = searchCheats(cheats, {
    query: state.query,
    language: state.language
  });

  elements.cheatList.replaceChildren(...results.map(createCard));

  const hasQuery = state.query.trim().length > 0;
  const languageLabel =
    state.language === "all" ? "" : ` trong ${LANGUAGE_LABELS[state.language]}`;

  if (hasQuery) {
    elements.resultSummary.textContent = `${results.length} kết quả cho “${state.query.trim()}”${languageLabel}`;
  } else {
    elements.resultSummary.textContent = `Đang hiển thị ${results.length} chủ đề${languageLabel}`;
  }

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
  elements.detailNote.textContent = item.note;
  elements.detailMistake.textContent = item.commonMistake;
  elements.detailExercise.textContent = item.exercise;

  playground.load(item, item.language);
}

function safelyUpdateHistory(method, stateValue, url) {
  try {
    history[method](stateValue, "", url);
  } catch {
    // Một số môi trường preview dùng origin đặc biệt (ví dụ about:blank)
    // không cho phép thay đổi History API. Ứng dụng vẫn hoạt động bình thường.
  }
}

function openDetail(itemId, { updateHistory = true } = {}) {
  const item = cheats.find((entry) => entry.id === itemId);
  if (!item) return;

  state.activeItemId = item.id;

  // Mở dialog trước khi nạp playground để iframe có kích thước ổn định.
  // Một số trình duyệt có thể để iframe trắng nếu srcdoc được gán lúc dialog đóng.
  if (!elements.detailDialog.open) {
    elements.detailDialog.showModal();
  }

  fillDetail(item);

  if (updateHistory && window.location.hash !== `#${item.id}`) {
    safelyUpdateHistory("pushState", { itemId: item.id }, `#${item.id}`);
  }
}

function closeDetail({ updateHistory = true } = {}) {
  if (elements.detailDialog.open) {
    elements.detailDialog.close();
  }

  state.activeItemId = null;

  if (updateHistory && window.location.hash) {
    safelyUpdateHistory(
      "replaceState",
      null,
      `${window.location.pathname}${window.location.search}` || window.location.href.split("#")[0]
    );
  }
}

function syncDialogWithHash() {
  const itemId = decodeURIComponent(window.location.hash.slice(1));
  const itemExists = cheats.some((item) => item.id === itemId);

  if (itemId && itemExists) {
    openDetail(itemId, { updateHistory: false });
  } else if (elements.detailDialog.open) {
    closeDetail({ updateHistory: false });
  }
}

elements.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderCatalog();
});

elements.clearSearch.addEventListener("click", () => clearSearch());
elements.emptyReset.addEventListener("click", () => {
  state.language = "all";
  clearSearch({ focus: false });
  setLanguageFilter("all");
});

elements.filterButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguageFilter(button.dataset.language));
});

elements.closeDialog.addEventListener("click", () => closeDetail());

elements.detailDialog.addEventListener("click", (event) => {
  if (event.target === elements.detailDialog) {
    closeDetail();
  }
});

elements.detailDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeDetail();
});

window.addEventListener("popstate", syncDialogWithHash);
window.addEventListener("hashchange", syncDialogWithHash);

document.addEventListener("keydown", (event) => {
  const activeTag = document.activeElement?.tagName;
  const isTyping = activeTag === "INPUT" || activeTag === "TEXTAREA";

  if (event.key === "/" && !isTyping && !elements.detailDialog.open) {
    event.preventDefault();
    elements.searchInput.focus();
  }

  if (
    event.key === "Escape" &&
    document.activeElement === elements.searchInput &&
    elements.searchInput.value
  ) {
    clearSearch();
  }
});

updateFilterCounts();
setLanguageFilter("all");
syncDialogWithHash();
