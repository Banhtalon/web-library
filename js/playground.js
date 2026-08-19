const FILE_LABELS = { html: "index.html", css: "styles.css", javascript: "script.js" };
const PREVIEW_MESSAGE_SOURCE = "webblocks-preview";

function escapeClosingTag(code, tagName) {
  const pattern = new RegExp(`</${tagName}`, "gi");
  return code.replace(pattern, `<\\/${tagName}`);
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function highlightHtml(code, focusTokens = []) {
  let safe = escapeHtml(code);
  safe = safe.replace(/(&lt;\/?)([a-zA-Z0-9-]+)/g, (_, open, tag) => {
    const cls = focusTokens.includes(tag.toLowerCase()) ? "syn-focus" : "syn-tag";
    return `<span class="syn-punc">${open}</span><span class="${cls}">${tag}</span>`;
  });
  safe = safe.replace(/\b([a-zA-Z-]+)=(&quot;|\")([^\"]*)(&quot;|\")/g,
    '<span class="syn-attr">$1</span>=<span class="syn-string">"$3"</span>');
  return safe;
}

function highlightCss(code, focusTokens = []) {
  let safe = escapeHtml(code);
  safe = safe.replace(/\/\*[\s\S]*?\*\//g, '<span class="syn-comment">$&</span>');
  safe = safe.replace(/([^{}]+)(\{)/g, '<span class="syn-selector">$1</span><span class="syn-punc">$2</span>');
  safe = safe.replace(/([\w-]+)(\s*:)/g, (_, prop, colon) => {
    const cls = focusTokens.includes(prop) ? "syn-focus" : "syn-property";
    return `<span class="${cls}">${prop}</span><span class="syn-punc">${colon}</span>`;
  });
  safe = safe.replace(/:\s*([\w-]+)(\s*;)/g, (_, value, semi) => {
    const cls = focusTokens.includes(value) ? "syn-focus" : "syn-value";
    return `: <span class="${cls}">${value}</span><span class="syn-punc">${semi}</span>`;
  });
  return safe;
}

function highlightJs(code, focusTokens = []) {
  let safe = escapeHtml(code);
  safe = safe.replace(/\/\/.*$/gm, '<span class="syn-comment">$&</span>');
  safe = safe.replace(/\b(const|let|var|function|return|if|else|for|while|new|class|async|await)\b/g, (_, word) => {
    const cls = focusTokens.includes(word) ? "syn-focus" : "syn-keyword";
    return `<span class="${cls}">${word}</span>`;
  });
  safe = safe.replace(/(["'`])([^"'`]*?)\1/g, '<span class="syn-string">$&</span>');
  return safe;
}

function highlight(code, language, focusTokens = []) {
  if (language === "html") return highlightHtml(code, focusTokens);
  if (language === "css") return highlightCss(code, focusTokens);
  return highlightJs(code, focusTokens);
}

function formatHtml(code) {
  const lines = code.replace(/>\s*</g, ">\n<").split("\n");
  let depth = 0;
  const voidTags = /^(area|base|br|col|embed|hr|img|input|link|meta|source|track|wbr)$/i;
  return lines.map((line) => {
    const text = line.trim();
    if (!text) return "";
    if (/^<\//.test(text)) depth = Math.max(0, depth - 1);
    const output = `${"  ".repeat(depth)}${text}`;
    const match = text.match(/^<([a-z0-9-]+)/i);
    if (match && !text.includes(`</${match[1]}>`) && !text.endsWith("/>") && !voidTags.test(match[1])) depth += 1;
    return output;
  }).filter(Boolean).join("\n");
}

function formatCss(code) {
  return code
    .replace(/\s*\{\s*/g, " {\n  ")
    .replace(/;\s*/g, ";\n  ")
    .replace(/\s*\}\s*/g, "\n}\n\n")
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .replace(/\n  \}/g, "\n}")
    .trim();
}

function formatCode(code, language) {
  if (language === "html") return formatHtml(code);
  if (language === "css") return formatCss(code);
  return code.trim();
}

export function buildPreviewDocument({ html, css, javascript, renderId = "" }) {
  const safeCss = escapeClosingTag(css, "style");
  const safeJavaScript = escapeClosingTag(javascript, "script");
  return `<!doctype html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>html,body{min-height:100%}${safeCss}</style></head><body>${html}<script>${safeJavaScript}<\/script><script>window.parent.postMessage({source:${JSON.stringify(PREVIEW_MESSAGE_SOURCE)},type:"ready",renderId:${JSON.stringify(String(renderId))}},"*")<\/script></body></html>`;
}

export function createPlayground() {
  const frame = document.querySelector("#preview-frame");
  const editorLabel = document.querySelector("#editor-label");
  const actionStatus = document.querySelector("#action-status");
  const runButton = document.querySelector("#run-code");
  const formatButton = document.querySelector("#format-code");
  const resetButton = document.querySelector("#reset-code");
  const copyButton = document.querySelector("#copy-code");
  const tabButtons = [...document.querySelectorAll("[data-editor]")];
  const quickSection = document.querySelector("#quick-action-section");
  const quickList = document.querySelector("#quick-action-list");
  const quickTemplate = document.querySelector("#quick-action-template");
  const suggestionSection = document.querySelector("#suggestion-section");
  const suggestionList = document.querySelector("#suggestion-list");
  const suggestionTemplate = document.querySelector("#suggestion-template");

  const editors = Object.fromEntries(["html", "css", "javascript"].map((language) => [language, {
    textarea: document.querySelector(`[data-code-editor="${language}"]`),
    shell: document.querySelector(`[data-code-shell="${language}"]`),
    highlight: document.querySelector(`[data-code-highlight="${language}"]`)
  }]));

  let originalCode = { html: "", css: "", javascript: "" };
  let activeEditor = "html";
  let activeItem = null;
  let statusTimer;
  let renderVersion = 0;

  function setStatus(message, duration = 2200) {
    clearTimeout(statusTimer);
    actionStatus.textContent = message;
    if (duration) statusTimer = setTimeout(() => { actionStatus.textContent = ""; }, duration);
  }

  function getFocusTokens(language) {
    return activeItem?.focusTokens?.[language] || [];
  }

  function paint(language) {
    const editor = editors[language];
    editor.highlight.innerHTML = highlight(editor.textarea.value, language, getFocusTokens(language));
    editor.highlight.parentElement.scrollTop = editor.textarea.scrollTop;
    editor.highlight.parentElement.scrollLeft = editor.textarea.scrollLeft;
  }

  function getCurrentCode() {
    return Object.fromEntries(Object.entries(editors).map(([language, editor]) => [language, editor.textarea.value]));
  }

  function run() {
    const version = ++renderVersion;
    frame.srcdoc = buildPreviewDocument({ ...getCurrentCode(), renderId: version });
    setStatus("Đã cập nhật kết quả");
  }

  function selectEditor(language) {
    activeEditor = language;
    editorLabel.textContent = FILE_LABELS[language];
    tabButtons.forEach((button) => {
      const active = button.dataset.editor === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });
    Object.entries(editors).forEach(([name, editor]) => {
      const active = name === language;
      editor.shell.hidden = !active;
      editor.shell.classList.toggle("is-active", active);
    });
    paint(language);
  }

  function patchCssProperty(selector, property, value) {
    const editor = editors.css.textarea;
    const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const blockRegex = new RegExp(`(${escapedSelector}\\s*\\{[\\s\\S]*?${property}\\s*:\\s*)([^;]+)(;)`);
    editor.value = editor.value.replace(blockRegex, `$1${value}$3`);
    paint("css");
    selectEditor("css");
    run();
  }

  function renderQuickActions() {
    const actions = activeItem?.quickActions || [];
    quickSection.hidden = actions.length === 0;
    quickList.replaceChildren();
    actions.forEach((action) => {
      const fragment = quickTemplate.content.cloneNode(true);
      fragment.querySelector(".quick-action-label").textContent = action.label;
      fragment.querySelector(".quick-action-code").textContent = action.code;
      fragment.querySelector(".quick-action-description").textContent = action.description;
      fragment.querySelector(".quick-action-button").addEventListener("click", () => patchCssProperty(".item", "display", action.value));
      quickList.append(fragment);
    });
  }

  function renderSuggestions() {
    const suggestions = activeItem?.suggestions || [];
    suggestionSection.hidden = suggestions.length === 0;
    suggestionList.replaceChildren();
    suggestions.forEach((suggestion, index) => {
      const fragment = suggestionTemplate.content.cloneNode(true);
      fragment.querySelector(".suggestion-number").textContent = String(index + 1).padStart(2, "0");
      fragment.querySelector(".suggestion-name").textContent = suggestion.name;
      fragment.querySelector(".suggestion-language").textContent = suggestion.language.toUpperCase();
      fragment.querySelector(".suggestion-code").innerHTML = highlight(suggestion.code, suggestion.language, getFocusTokens(suggestion.language));
      const pasteButton = fragment.querySelector(".suggestion-paste");
      pasteButton.textContent = suggestion.language === "css" ? "Áp dụng vào CSS →" : "Dán vào HTML →";
      fragment.querySelector(".suggestion-copy").addEventListener("click", async () => {
        await navigator.clipboard.writeText(suggestion.code);
        setStatus("Đã sao chép đoạn code");
      });
      pasteButton.addEventListener("click", () => {
        if (suggestion.patch) {
          patchCssProperty(suggestion.patch.selector, suggestion.patch.property, suggestion.patch.value);
        } else {
          editors[suggestion.language].textarea.value = formatCode(suggestion.code, suggestion.language);
          paint(suggestion.language);
          selectEditor(suggestion.language);
          run();
        }
      });
      suggestionList.append(fragment);
    });
  }

  function load(item, preferredEditor = "html") {
    activeItem = item;
    originalCode = { html: item.htmlCode, css: item.cssCode, javascript: item.jsCode };
    Object.entries(originalCode).forEach(([language, code]) => {
      editors[language].textarea.value = code;
      paint(language);
    });
    selectEditor(preferredEditor);
    renderQuickActions();
    renderSuggestions();
    run();
  }

  function reset() {
    Object.entries(originalCode).forEach(([language, code]) => {
      editors[language].textarea.value = code;
      paint(language);
    });
    renderQuickActions();
    run();
    setStatus("Đã khôi phục code gốc");
  }

  function formatActive() {
    const editor = editors[activeEditor].textarea;
    editor.value = formatCode(editor.value, activeEditor);
    paint(activeEditor);
    setStatus(`Đã format ${FILE_LABELS[activeEditor]}`);
  }

  async function copyActiveEditor() {
    await navigator.clipboard.writeText(editors[activeEditor].textarea.value);
    setStatus(`Đã sao chép ${FILE_LABELS[activeEditor]}`);
  }

  tabButtons.forEach((button) => button.addEventListener("click", () => selectEditor(button.dataset.editor)));
  Object.entries(editors).forEach(([language, editor]) => {
    editor.textarea.addEventListener("input", () => paint(language));
    editor.textarea.addEventListener("scroll", () => paint(language));
    editor.textarea.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        editor.textarea.setRangeText("  ", editor.textarea.selectionStart, editor.textarea.selectionEnd, "end");
        paint(language);
      }
      if (event.shiftKey && event.altKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        formatActive();
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        run();
      }
    });
  });

  runButton.addEventListener("click", run);
  formatButton.addEventListener("click", formatActive);
  resetButton.addEventListener("click", reset);
  copyButton.addEventListener("click", copyActiveEditor);

  return { load, run, reset, selectEditor };
}
