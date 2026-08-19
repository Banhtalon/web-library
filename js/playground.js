import { formatCode, highlightCode } from "./syntax.js";

const FILE_LABELS = {
  html: "index.html",
  css: "styles.css",
  javascript: "script.js"
};

const PREVIEW_MESSAGE_SOURCE = "webblocks-preview";

function escapeClosingTag(code, tagName) {
  const pattern = new RegExp(`</${tagName}`, "gi");
  return String(code).replace(pattern, `<\\/${tagName}`);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildPreviewDocument({ html, css, javascript, renderId = "" }) {
  const safeCss = escapeClosingTag(css, "style");
  const safeJavaScript = escapeClosingTag(javascript, "script");
  const serializedRenderId = JSON.stringify(String(renderId));
  const serializedSource = JSON.stringify(PREVIEW_MESSAGE_SOURCE);

  return `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      html, body { min-height: 100%; }
      body { margin: 0; }
      #webblocks-error {
        position: fixed;
        right: 12px;
        bottom: 12px;
        left: 12px;
        z-index: 99999;
        display: none;
        max-height: 45vh;
        margin: 0;
        padding: 12px 14px;
        overflow: auto;
        border: 1px solid #e8a18f;
        border-radius: 10px;
        color: #7f2614;
        background: #fff0ec;
        font: 13px/1.5 ui-monospace, monospace;
        white-space: pre-wrap;
      }
      #current-value,
      .display-note {
        display: none !important;
      }
      ${safeCss}
    </style>
  </head>
  <body>
    ${html}
    <pre id="webblocks-error" role="alert"></pre>
    <script>
      (function () {
        const source = ${serializedSource};
        const renderId = ${serializedRenderId};
        const errorBox = document.querySelector("#webblocks-error");

        function notify(type, data) {
          window.parent.postMessage(
            Object.assign({ source, type, renderId }, data || {}),
            "*"
          );
        }

        function showError(message) {
          const readable = String(message || "Lỗi không xác định");
          errorBox.style.display = "block";
          errorBox.textContent = "JavaScript Error: " + readable;
          notify("error", { message: readable });
        }

        window.addEventListener("error", (event) => showError(event.message));
        window.addEventListener("unhandledrejection", (event) => {
          const reason = event.reason && event.reason.message
            ? event.reason.message
            : String(event.reason);
          showError(reason);
        });
      })();
    <\/script>
    <script>
      ${safeJavaScript}
    <\/script>
    <script>
      window.parent.postMessage(
        { source: ${serializedSource}, type: "ready", renderId: ${serializedRenderId} },
        "*"
      );
    <\/script>
  </body>
</html>`;
}

export function replaceCssPropertyInRule(css, selector, property, value) {
  const selectorPattern = new RegExp(
    `(${escapeRegExp(selector)}\\s*\\{)([\\s\\S]*?)(\\})`
  );

  if (!selectorPattern.test(css)) return css;

  return css.replace(selectorPattern, (fullRule, opening, body, closing) => {
    const propertyPattern = new RegExp(
      `(^|\\n)(\\s*)${escapeRegExp(property)}\\s*:\\s*[^;\\n}]+;?`,
      "m"
    );

    if (propertyPattern.test(body)) {
      const nextBody = body.replace(
        propertyPattern,
        (declaration, lineStart, indentation) =>
          `${lineStart}${indentation}${property}: ${value};`
      );
      return `${opening}${nextBody}${closing}`;
    }

    const trimmedBody = body.trimEnd();
    const separator = trimmedBody.trim() ? "\n" : "";
    return `${opening}${trimmedBody}${separator}  ${property}: ${value};\n${closing}`;
  });
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

  const editors = {
    html: document.querySelector('[data-code-editor="html"]'),
    css: document.querySelector('[data-code-editor="css"]'),
    javascript: document.querySelector('[data-code-editor="javascript"]')
  };

  const editorShells = {
    html: document.querySelector('[data-code-shell="html"]'),
    css: document.querySelector('[data-code-shell="css"]'),
    javascript: document.querySelector('[data-code-shell="javascript"]')
  };

  const highlights = {
    html: document.querySelector('[data-code-highlight="html"]'),
    css: document.querySelector('[data-code-highlight="css"]'),
    javascript: document.querySelector('[data-code-highlight="javascript"]')
  };

  let originalCode = { html: "", css: "", javascript: "" };
  let activeEditor = "html";
  let focusTokens = {};
  let statusTimer;
  let renderId = 0;

  function setStatus(message, duration = 2200) {
    window.clearTimeout(statusTimer);
    actionStatus.textContent = message;

    if (duration) {
      statusTimer = window.setTimeout(() => {
        actionStatus.textContent = "";
      }, duration);
    }
  }

  function getCurrentCode() {
    return {
      html: editors.html.value,
      css: editors.css.value,
      javascript: editors.javascript.value
    };
  }

  function getFocusTokens(language) {
    return Array.isArray(focusTokens?.[language]) ? focusTokens[language] : [];
  }

  function refreshHighlight(language) {
    const code = editors[language].value;
    highlights[language].innerHTML = `${highlightCode(
      code,
      language,
      getFocusTokens(language)
    )}\n`;

    const preview = highlights[language].parentElement;
    preview.scrollTop = editors[language].scrollTop;
    preview.scrollLeft = editors[language].scrollLeft;
  }

  function refreshAllHighlights() {
    Object.keys(editors).forEach(refreshHighlight);
  }

  function handlePreviewMessage(event) {
    const data = event.data;
    if (!data || data.source !== PREVIEW_MESSAGE_SOURCE) return;
    if (String(data.renderId) !== String(renderId)) return;

    if (data.type === "ready") {
      setStatus("Đã cập nhật kết quả");
    } else if (data.type === "error") {
      setStatus("Preview có lỗi JavaScript", 3200);
    }
  }

  function run() {
    renderId += 1;
    const uniqueDocument = buildPreviewDocument({
      ...getCurrentCode(),
      renderId
    });

    setStatus("Đang cập nhật kết quả...", 0);

    window.setTimeout(() => {
      frame.srcdoc = uniqueDocument;
    }, 0);
  }

  function selectEditor(language) {
    if (!editors[language]) return;

    activeEditor = language;
    if (editorLabel) editorLabel.textContent = FILE_LABELS[language];

    tabButtons.forEach((button) => {
      const isActive = button.dataset.editor === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    Object.entries(editorShells).forEach(([name, shell]) => {
      const isActive = name === language;
      shell.hidden = !isActive;
      shell.classList.toggle("is-active", isActive);
    });

    refreshHighlight(language);
  }

  function formatEditor(language, { runPreview = true, announce = true } = {}) {
    const editor = editors[language];
    const formattedCode = formatCode(language, editor.value);

    editor.value = formattedCode;
    refreshHighlight(language);
    editor.setSelectionRange(formattedCode.length, formattedCode.length);

    if (runPreview) run();
    if (announce) setStatus(`Đã format ${FILE_LABELS[language]}`);
  }

  function formatActiveEditor() {
    formatEditor(activeEditor);
  }

  function load(item, preferredEditor = "html") {
    focusTokens = item.focusTokens ?? {};
    originalCode = {
      html: formatCode("html", item.htmlCode),
      css: String(item.cssCode || "").trim(),
      javascript: String(item.jsCode || "").trim()
    };

    editors.html.value = originalCode.html;
    editors.css.value = originalCode.css;
    editors.javascript.value = originalCode.javascript;

    refreshAllHighlights();
    selectEditor(preferredEditor);
    run();
  }

  function replaceCode(language, code) {
    if (!editors[language]) return;

    selectEditor(language);
    editors[language].value = formatCode(language, code);
    refreshHighlight(language);
    editors[language].focus();
    editors[language].setSelectionRange(
      editors[language].value.length,
      editors[language].value.length
    );
    run();
    setStatus(`Đã dán mẫu vào ${FILE_LABELS[language]}`);
  }

  function patchCssProperty({ selector, property, value } = {}) {
    if (!selector || !property || value == null) return false;

    const currentCss = editors.css.value;
    const selectorExists = new RegExp(`${escapeRegExp(selector)}\\s*\\{`).test(
      currentCss
    );

    if (!selectorExists) {
      setStatus(`Không tìm thấy ${selector} trong styles.css`);
      return false;
    }

    const updatedCss = replaceCssPropertyInRule(currentCss, selector, property, value);
    selectEditor("css");

    if (updatedCss === currentCss) {
      setStatus(`Đang dùng ${property}: ${value}`);
      return true;
    }

    editors.css.value = formatCode("css", updatedCss);
    refreshHighlight("css");
    editors.css.focus();
    run();
    setStatus(`Đã đổi ${property}: ${value}`);
    return true;
  }

  function reset() {
    editors.html.value = originalCode.html;
    editors.css.value = originalCode.css;
    editors.javascript.value = originalCode.javascript;
    refreshAllHighlights();
    run();
    setStatus("Đã khôi phục code gốc");
  }

  async function copyText(text, successMessage = "Đã sao chép code") {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(successMessage);
    } catch {
      const temporaryInput = document.createElement("textarea");
      temporaryInput.value = text;
      temporaryInput.style.position = "fixed";
      temporaryInput.style.opacity = "0";
      document.body.append(temporaryInput);
      temporaryInput.select();
      document.execCommand("copy");
      temporaryInput.remove();
      setStatus(successMessage);
    }
  }

  function copyActiveEditor() {
    return copyText(
      editors[activeEditor].value,
      `Đã sao chép ${FILE_LABELS[activeEditor]}`
    );
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => selectEditor(button.dataset.editor));
  });

  Object.entries(editors).forEach(([language, editor]) => {
    editor.addEventListener("input", () => refreshHighlight(language));

    editor.addEventListener("scroll", () => {
      const preview = highlights[language].parentElement;
      preview.scrollTop = editor.scrollTop;
      preview.scrollLeft = editor.scrollLeft;
    });

    editor.addEventListener("paste", () => {
      window.setTimeout(() => {
        formatEditor(language, { runPreview: false, announce: false });
        setStatus(`Đã tự động format ${FILE_LABELS[language]}`);
      }, 0);
    });

    editor.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.setRangeText("  ", start, end, "end");
        refreshHighlight(language);
      }

      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        run();
      }

      if (event.shiftKey && event.altKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        formatEditor(language);
      }
    });
  });

  window.addEventListener("message", handlePreviewMessage);
  runButton.addEventListener("click", run);
  formatButton.addEventListener("click", formatActiveEditor);
  resetButton.addEventListener("click", reset);
  copyButton.addEventListener("click", copyActiveEditor);

  return {
    load,
    run,
    reset,
    selectEditor,
    replaceCode,
    patchCssProperty,
    copyText
  };
}
