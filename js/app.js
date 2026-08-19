import { cheats } from "../data/cheats.js";
import { searchCheats } from "./search.js";
import { createPlayground } from "./playground.js";
import { highlightCode } from "./syntax.js";

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
  filterButtons: [...document.querySelectorAll(".filters [data-language]")],
  detailDialog: document.querySelector("#detail-dialog"),
  dialogShell: document.querySelector(".dialog-shell"),
  closeDialog: document.querySelector("#close-dialog"),
  detailLanguage: document.querySelector("#detail-language"),
  detailCategory: document.querySelector("#detail-category"),
  detailLevel: document.querySelector("#detail-level"),
  detailTitle: document.querySelector("#detail-title"),
  detailDescription: document.querySelector("#detail-description"),
  playground: document.querySelector(".playground"),
  quickActionSection: document.querySelector("#quick-action-section"),
  quickActionList: document.querySelector("#quick-action-list"),
  quickActionTemplate: document.querySelector("#quick-action-template"),
  suggestionSection: document.querySelector("#suggestion-section"),
  suggestionDescription: document.querySelector("#suggestion-description"),
  suggestionList: document.querySelector("#suggestion-list"),
  suggestionTemplate: document.querySelector("#suggestion-template")
};

const playground = createPlayground();

function setLanguageBadge(element, language) {
  if (!element) return;
  element.textContent = LANGUAGE_LABELS[language] || language.toUpperCase();
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
    if (counter) counter.textContent = String(count);
  });

  const total = document.querySelector("#total-count");
  if (total) total.textContent = String(counts.all);
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
}

function setActiveQuickAction(value) {
  elements.quickActionList
    .querySelectorAll(".quick-action-button")
    .forEach((button) => {
      button.classList.toggle("is-active", button.dataset.value === value);
    });
}

function renderQuickActions(item) {
  const actions = Array.isArray(item.quickActions) ? item.quickActions : [];
  elements.quickActionList.replaceChildren();
  elements.quickActionSection.hidden = actions.length === 0;

  if (actions.length === 0) return;

  const buttons = actions.map((action, index) => {
    const fragment = elements.quickActionTemplate.content.cloneNode(true);
    const button = fragment.querySelector(".quick-action-button");
    const property = action.patch?.property || "display";
    const value = action.patch?.value || action.value;

    button.dataset.value = value;
    button.classList.toggle("is-active", index === 0);
    fragment.querySelector(".quick-action-label").textContent = action.label;
    fragment.querySelector(".quick-action-code").textContent = `${property}: ${value};`;
    fragment.querySelector(".quick-action-description").textContent = action.description;

    button.addEventListener("click", () => {
      if (playground.patchCssProperty(action.patch)) {
        setActiveQuickAction(value);
      }
    });

    return fragment;
  });

  elements.quickActionList.replaceChildren(...buttons);
}

function renderSuggestions(item) {
  const suggestions = Array.isArray(item.suggestions) ? item.suggestions : [];
  elements.suggestionList.replaceChildren();
  elements.suggestionSection.hidden = suggestions.length === 0;

  if (suggestions.length === 0) return;

  const defaultLanguage = suggestions[0]?.language ?? item.language;
  elements.suggestionDescription.textContent =
    `Chọn một mẫu để sao chép hoặc áp dụng vào editor ${LANGUAGE_LABELS[defaultLanguage]}.`;

  const cards = suggestions.map((suggestion, index) => {
    const fragment = elements.suggestionTemplate.content.cloneNode(true);
    const codeElement = fragment.querySelector(".suggestion-code");
    const languageBadge = fragment.querySelector(".suggestion-language");
    const pasteButton = fragment.querySelector(".suggestion-paste");
    const language = suggestion.language ?? item.language;
    const focusTokens = item.focusTokens?.[language] ?? [];
    const title = suggestion.title || `Gợi ý ${index + 1}`;

    fragment.querySelector(".suggestion-number").textContent = String(index + 1).padStart(2, "0");
    fragment.querySelector(".suggestion-name").textContent = title;
    languageBadge.textContent = LANGUAGE_LABELS[language];
    languageBadge.dataset.language = language;
    codeElement.innerHTML = highlightCode(suggestion.code, language, focusTokens);
    pasteButton.textContent = suggestion.patch
      ? `Áp dụng vào ${LANGUAGE_LABELS[language]} →`
      : `Dán vào ${LANGUAGE_LABELS[language]} →`;

    fragment.querySelector(".suggestion-copy").addEventListener("click", () => {
      playground.copyText(suggestion.code, `Đã sao chép ${title}`);
    });

    pasteButton.addEventListener("click", () => {
      if (suggestion.patch) {
        playground.patchCssProperty(suggestion.patch);
        setActiveQuickAction(suggestion.patch.value);
      } else {
        playground.replaceCode(language, suggestion.code);
      }

      elements.playground.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return fragment;
  });

  elements.suggestionList.replaceChildren(...cards);
}

function safelyUpdateHistory(method, stateValue, url) {
  try {
    history[method](stateValue, "", url);
  } catch {
    // Một số môi trường preview không cho đổi History API.
  }
}

function openDetail(itemId, { updateHistory = true } = {}) {
  const item = cheats.find((entry) => entry.id === itemId);
  if (!item) return;

  state.activeItemId = item.id;
  fillDetail(item);
  renderQuickActions(item);
  renderSuggestions(item);

  if (!elements.detailDialog.open) {
    elements.detailDialog.showModal();
    document.body.classList.add("dialog-open");
  }

  elements.dialogShell.scrollTop = 0;
  window.requestAnimationFrame(() => playground.load(item, item.language));

  if (updateHistory && window.location.hash !== `#${item.id}`) {
    safelyUpdateHistory("pushState", { itemId: item.id }, `#${item.id}`);
  }
}

function closeDetail({ updateHistory = true } = {}) {
  if (elements.detailDialog.open) elements.detailDialog.close();

  state.activeItemId = null;
  document.body.classList.remove("dialog-open");

  if (updateHistory && window.location.hash) {
    safelyUpdateHistory(
      "replaceState",
      null,
      `${window.location.pathname}${window.location.search}`
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
  setLanguageFilter("all");
  clearSearch({ focus: false });
});

elements.filterButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguageFilter(button.dataset.language));
});

elements.closeDialog.addEventListener("click", () => closeDetail());

elements.detailDialog.addEventListener("click", (event) => {
  if (event.target === elements.detailDialog) closeDetail();
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
