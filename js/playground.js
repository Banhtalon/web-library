const FILE_LABELS = {
  html: "index.html",
  css: "styles.css",
  javascript: "script.js"
};

const PREVIEW_MESSAGE_SOURCE = "webblocks-preview";

function escapeClosingTag(code, tagName) {
  const pattern = new RegExp(`</${tagName}`, "gi");
  return code.replace(pattern, `<\\/${tagName}`);
}

export function buildPreviewDocument({
  html,
  css,
  javascript,
  renderId = ""
}) {
  const safeCss = escapeClosingTag(css, "style");
  const safeJavaScript = escapeClosingTag(javascript, "script");
  const serializedRenderId = JSON.stringify(String(renderId));
  const serializedMessageSource = JSON.stringify(PREVIEW_MESSAGE_SOURCE);

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
        max-height: 45vh;
        margin: 0;
        padding: 12px 14px;
        overflow: auto;
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
        const messageSource = ${serializedMessageSource};
        const renderId = ${serializedRenderId};
        const errorBox = document.querySelector("#webblocks-error");

        function notifyParent(type, extraData) {
          window.parent.postMessage(
            Object.assign(
              { source: messageSource, type: type, renderId: renderId },
              extraData || {}
            ),
            "*"
          );
        }

        function showError(message) {
          const readableMessage = String(message || "Lỗi không xác định");
          errorBox.style.display = "block";
          errorBox.textContent = "JavaScript Error: " + readableMessage;
          notifyParent("error", { message: readableMessage });
        }

        window.addEventListener("error", function (event) {
          showError(event.message);
        });

        window.addEventListener("unhandledrejection", function (event) {
          const reason =
            event.reason && event.reason.message
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
        {
          source: ${serializedMessageSource},
          type: "ready",
          renderId: ${serializedRenderId}
        },
        "*"
      );
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
  let renderTimer;
  let readyTimer;
  let renderVersion = 0;
  let currentRenderHasError = false;

  function setStatus(message, duration = 2400) {
    window.clearTimeout(statusTimer);
    actionStatus.textContent = message;

    if (duration > 0) {
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

  function renderPreview(previewDocument, version) {
    // srcdoc hoạt động ổn định cả khi website đang nằm trong một iframe sandbox.
    // Gắn render id để việc chạy lại cùng một đoạn code vẫn tạo navigation mới.
    const uniqueDocument = previewDocument.replace(
      "</html>",
      `<!-- webblocks-render:${version} --></html>`
    );

    frame.removeAttribute("src");
    frame.srcdoc = uniqueDocument;
  }

  function run() {
    const currentRender = ++renderVersion;
    const previewDocument = buildPreviewDocument({
      ...getCurrentCode(),
      renderId: currentRender
    });

    currentRenderHasError = false;
    window.clearTimeout(renderTimer);
    window.clearTimeout(readyTimer);
    frame.setAttribute("aria-busy", "true");
    setStatus("Đang cập nhật kết quả...", 0);

    // Đợi task kế tiếp để <dialog> được mở và có kích thước trước khi nạp iframe.
    // Điều này tránh preview trắng trên một số trình duyệt/môi trường nhúng.
    renderTimer = window.setTimeout(() => {
      if (currentRender !== renderVersion) return;

      renderPreview(previewDocument, currentRender);

      readyTimer = window.setTimeout(() => {
        if (currentRender !== renderVersion) return;
        frame.removeAttribute("aria-busy");
        setStatus("Preview chưa phản hồi — hãy bấm Chạy code để thử lại", 5000);
      }, 3000);
    }, 0);
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
    setStatus("Đã khôi phục code gốc", 1200);
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

  function handlePreviewMessage(event) {
    if (event.source !== frame.contentWindow) return;

    const data = event.data;
    if (!data || data.source !== PREVIEW_MESSAGE_SOURCE) return;
    if (String(data.renderId) !== String(renderVersion)) return;

    if (data.type === "error") {
      currentRenderHasError = true;
      window.clearTimeout(readyTimer);
      frame.removeAttribute("aria-busy");
      setStatus("Ví dụ có lỗi JavaScript — xem thông báo trong preview", 5000);
      return;
    }

    if (data.type === "ready") {
      window.clearTimeout(readyTimer);
      frame.removeAttribute("aria-busy");

      if (!currentRenderHasError) {
        setStatus("Đã cập nhật kết quả");
      }
    }
  }

  window.addEventListener("message", handlePreviewMessage);

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
