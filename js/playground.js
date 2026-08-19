const FILE_LABELS = {
  html: "index.html",
  css: "styles.css",
  javascript: "script.js"
};

function escapeClosingTag(code, tagName) {
  const pattern = new RegExp(`</${tagName}`, "gi");
  return code.replace(pattern, `<\\/${tagName}`);
}

function buildPreviewDocument({ html, css, javascript }) {
  const safeCss = escapeClosingTag(css, "style");
  const safeJavaScript = escapeClosingTag(javascript, "script");

  return `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      html { min-height: 100%; }
      body { min-height: 100%; }
      #webblocks-error {
        position: fixed;
        right: 12px;
        bottom: 12px;
        left: 12px;
        z-index: 99999;
        display: none;
        padding: 12px 14px;
        border: 1px solid #e8a18f;
        border-radius: 9px;
        color: #7f2614;
        background: #fff0ec;
        font: 13px/1.5 ui-monospace, monospace;
        white-space: pre-wrap;
      }
      ${safeCss}
    </style>
  </head>
  <body>
    ${html}
    <pre id="webblocks-error" role="alert"></pre>
    <script>
      (function () {
        const errorBox = document.querySelector("#webblocks-error");

        function showError(message) {
          errorBox.style.display = "block";
          errorBox.textContent = "JavaScript Error: " + message;
        }

        window.addEventListener("error", function (event) {
          showError(event.message);
        });

        window.addEventListener("unhandledrejection", function (event) {
          showError(event.reason && event.reason.message ? event.reason.message : String(event.reason));
        });
      })();
    <\/script>
    <script>
      ${safeJavaScript}
    <\/script>
  </body>
</html>`;
}

export function createPlayground() {
  const frame = document.querySelector("#preview-frame");
  const editorLabel = document.querySelector("#editor-label");
  const actionStatus = document.querySelector("#action-status");
  const runButton = document.querySelector("#run-code");
  const resetButton = document.querySelector("#reset-code");
  const copyButton = document.querySelector("#copy-code");
  const tabButtons = [...document.querySelectorAll("[data-editor]")];
  const editors = {
    html: document.querySelector('[data-code-editor="html"]'),
    css: document.querySelector('[data-code-editor="css"]'),
    javascript: document.querySelector('[data-code-editor="javascript"]')
  };

  let originalCode = { html: "", css: "", javascript: "" };
  let activeEditor = "html";
  let statusTimer;

  function setStatus(message) {
    window.clearTimeout(statusTimer);
    actionStatus.textContent = message;

    statusTimer = window.setTimeout(() => {
      actionStatus.textContent = "";
    }, 2400);
  }

  function getCurrentCode() {
    return {
      html: editors.html.value,
      css: editors.css.value,
      javascript: editors.javascript.value
    };
  }

  function run() {
    frame.srcdoc = buildPreviewDocument(getCurrentCode());
    setStatus("Đã cập nhật kết quả");
  }

  function selectEditor(language) {
    if (!editors[language]) return;

    activeEditor = language;
    editorLabel.textContent = FILE_LABELS[language];

    tabButtons.forEach((button) => {
      const isActive = button.dataset.editor === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    Object.entries(editors).forEach(([name, editor]) => {
      const isActive = name === language;
      editor.hidden = !isActive;
      editor.classList.toggle("is-active", isActive);
    });
  }

  function load(item, preferredEditor = "html") {
    originalCode = {
      html: item.htmlCode,
      css: item.cssCode,
      javascript: item.jsCode
    };

    editors.html.value = originalCode.html;
    editors.css.value = originalCode.css;
    editors.javascript.value = originalCode.javascript;

    selectEditor(preferredEditor);
    run();
  }

  function reset() {
    editors.html.value = originalCode.html;
    editors.css.value = originalCode.css;
    editors.javascript.value = originalCode.javascript;
    run();
    setStatus("Đã khôi phục code gốc");
  }

  async function copyActiveEditor() {
    const text = editors[activeEditor].value;

    try {
      await navigator.clipboard.writeText(text);
      setStatus(`Đã sao chép ${FILE_LABELS[activeEditor]}`);
    } catch {
      editors[activeEditor].select();
      document.execCommand("copy");
      setStatus(`Đã sao chép ${FILE_LABELS[activeEditor]}`);
    }
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => selectEditor(button.dataset.editor));
  });

  Object.values(editors).forEach((editor) => {
    editor.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.setRangeText("  ", start, end, "end");
      }

      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        run();
      }
    });
  });

  runButton.addEventListener("click", run);
  resetButton.addEventListener("click", reset);
  copyButton.addEventListener("click", copyActiveEditor);

  return {
    load,
    run,
    reset,
    selectEditor
  };
}
