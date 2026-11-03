/**
 * Code Library v1.1 — Giao diện Chuẩn Bố cục CodeShikhi
 * 1-Click Sidebar Tree • Live Preview • 3-Tab Source Code (HTML / CSS / JS)
 */
(function () {
  "use strict";

  const categories = Array.isArray(window.CODE_LIBRARY_CATEGORIES)
    ? window.CODE_LIBRARY_CATEGORIES
    : [];
  const components = Array.isArray(window.CODE_LIBRARY_COMPONENTS)
    ? window.CODE_LIBRARY_COMPONENTS
    : [];

  const categoryMap = new Map(categories.map((cat) => [cat.slug, cat]));
  const componentMap = new Map(components.map((comp) => [comp.id, comp]));

  // Lưu bản nháp chỉnh sửa trực tiếp trong phiên làm việc (theo component.id)
  const draftStore = new Map();

  // Trạng thái giao diện hiện tại
  const state = {
    activeCategorySlug: null,
    activeComponentId: null,
    expandedCategories: new Set([categories[0] ? categories[0].slug : "header"]),
    activeCodeTab: "html", // Chỉ 3 tab: "html" | "css" | "js"
    activeViewport: "100%", // "100%" (Desktop) | "375px" (Mobile)
    sidebarFilter: "",
    searchQuery: ""
  };

  // Khung HTML5 Boilerplate chuẩn
  const HTML5_BOILERPLATE = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dự án Web Chuẩn HTML5 / CSS3 / JS</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f8fafc;
      color: #0f172a;
      line-height: 1.5;
      padding: 24px;
    }
    /* Dán CSS của Component vào dưới đây */
  </style>
</head>
<body>
  <!-- Dán HTML của Component vào dưới đây -->

  <script>
    // Dán JS của Component vào dưới đây
  </script>
</body>
</html>`;

  // ==========================================================================
  // 1. HÀM TIỆN ÍCH CHUẨN HÓA TIẾNG VIỆT & BẢO MẬT CHUỖI
  // ==========================================================================

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalizeViText(input) {
    return String(input ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getComponentDraft(comp) {
    if (!comp) return { html: "", css: "", js: "" };
    if (!draftStore.has(comp.id)) {
      draftStore.set(comp.id, {
        html: comp.html || "",
        css: comp.css || "",
        js: comp.js || ""
      });
    }
    return draftStore.get(comp.id);
  }

  function sanitizeInlineStyle(cssText) {
    return String(cssText ?? "").replace(/<\/style/gi, "<\\/style");
  }

  function sanitizeInlineScript(jsText) {
    return String(jsText ?? "").replace(/<\/script/gi, "<\\/script");
  }

  function buildStandaloneHtml(title, draft) {
    const safeTitle = escapeHtml(title || "Component Preview");
    const safeCss = sanitizeInlineStyle(draft.css);
    const safeJs = sanitizeInlineScript(draft.js);
    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle}</title>
  <style>
*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }
body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #f8fafc;
  color: #0f172a;
}
${safeCss}
  </style>
</head>
<body>
${draft.html}

  <script>
${safeJs}
  </script>
</body>
</html>`;
  }

  function buildPreviewDoc(draft) {
    const safeCss = sanitizeInlineStyle(draft.css);
    const safeJs = sanitizeInlineScript(draft.js);
    return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }
body {
  margin: 0;
  padding: 14px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: transparent;
  color: #0f172a;
}
.cl-runtime-error {
  margin-top: 10px;
  padding: 8px 12px;
  background: #fef2f2;
  border: 1.5px solid #ef4444;
  border-radius: 6px;
  color: #991b1b;
  font-family: ui-monospace, monospace;
  font-size: 12px;
}
${safeCss}
  </style>
</head>
<body>
${draft.html}
<div id="__clErrorBox"></div>
<script>
window.addEventListener("keydown", function (ev) {
  if (ev.key === "Escape" && window.parent && window.parent !== window) {
    window.parent.postMessage({ type: "cl-preview-escape" }, "*");
  }
});
window.addEventListener("error", function (err) {
  var box = document.getElementById("__clErrorBox");
  if (box) {
    var msg = document.createElement("div");
    msg.className = "cl-runtime-error";
    msg.textContent = "Lỗi JavaScript: " + (err && err.message ? err.message : String(err));
    box.appendChild(msg);
  }
});
try {
${safeJs}
} catch (err) {
  var box = document.getElementById("__clErrorBox");
  if (box) {
    var msg = document.createElement("div");
    msg.className = "cl-runtime-error";
    msg.textContent = "Lỗi JavaScript: " + (err && err.message ? err.message : String(err));
    box.appendChild(msg);
  }
}
</script>
</body>
</html>`;
  }

  // ==========================================================================
  // 2. TRUY VẤN DANH MỤC & TÌM KIẾM TIẾNG VIỆT KHÔNG DẤU
  // ==========================================================================

  function getComponentsByCategory(slug) {
    return components.filter((c) => c.category === slug);
  }

  function searchComponents(rawQuery) {
    const normQuery = normalizeViText(rawQuery);
    if (!normQuery) return components.slice();
    const tokens = normQuery.split(" ").filter(Boolean);

    return components.filter((comp) => {
      const cat = categoryMap.get(comp.category);
      const haystack = normalizeViText(
        [
          comp.id,
          comp.title,
          comp.titleVi,
          comp.summary,
          ...(comp.tags || []),
          cat ? cat.nameEn : "",
          cat ? cat.nameVi : "",
          cat ? cat.description : "",
          ...(cat && cat.keywords ? cat.keywords : [])
        ].join(" ")
      );
      return tokens.every((tk) => haystack.includes(tk));
    });
  }

  function filterSidebarCategories(rawFilter) {
    const norm = normalizeViText(rawFilter);
    if (!norm) return categories.slice();
    return categories.filter((cat) => {
      const catComps = getComponentsByCategory(cat.slug);
      const compNames = catComps.map((c) => `${c.title} ${c.titleVi}`).join(" ");
      const hay = normalizeViText(
        [cat.slug, cat.nameEn, cat.nameVi, cat.description, compNames, ...(cat.keywords || [])].join(" ")
      );
      return hay.includes(norm);
    });
  }

  // ==========================================================================
  // 3. CLIPBOARD, OPEN IN NEW TAB & TOAST
  // ==========================================================================

  function showToast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;
    const item = document.createElement("div");
    item.className = "toast-item";
    item.textContent = message;
    container.appendChild(item);
    setTimeout(() => {
      item.remove();
    }, 2200);
  }

  async function copyTextToClipboard(text, label) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const temp = document.createElement("textarea");
        temp.value = text;
        temp.style.position = "fixed";
        temp.style.opacity = "0";
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        temp.remove();
      }
      showToast(`✓ Copied ${label}!`);
    } catch (_err) {
      showToast(`⚠ Không thể tự động copy ${label}.`);
    }
  }

  function openPreviewInNewTab(comp) {
    if (!comp) return;
    const srcdocAttr = escapeHtml(buildPreviewDoc(getComponentDraft(comp)));
    const safeTitle = escapeHtml(comp.title || "Live Preview");
    const wrapperHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle} — Live Preview</title>
  <style>
    html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #f8fafc; }
    iframe { width: 100%; height: 100%; border: none; display: block; background: #ffffff; }
  </style>
</head>
<body>
  <iframe sandbox="allow-scripts allow-forms" srcdoc="${srcdocAttr}" title="${safeTitle}"></iframe>
</body>
</html>`;
    const blob = new Blob([wrapperHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener");
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  // ==========================================================================
  // 4. RENDER SIDEBAR ACCORDION TREE (1-Click Mở Ngay Component)
  // ==========================================================================

  function renderSidebar() {
    const listEl = document.getElementById("sidebarCategoryList");
    if (!listEl) return;

    const filteredCats = filterSidebarCategories(state.sidebarFilter);
    if (filteredCats.length === 0) {
      listEl.innerHTML = `<p style="padding:10px;font-size:0.82rem;color:var(--text-muted);">Không tìm thấy mục phù hợp.</p>`;
      return;
    }

    const isFiltering = Boolean(state.sidebarFilter.trim());

    listEl.innerHTML = filteredCats
      .map((cat) => {
        const catComps = getComponentsByCategory(cat.slug);
        const isOpen = isFiltering || state.expandedCategories.has(cat.slug);
        const isAllCategoryView =
          !state.activeComponentId && state.activeCategorySlug === cat.slug;

        const subItemsHtml = catComps
          .map((comp) => {
            const isActive = state.activeComponentId === comp.id;
            return `
              <a
                href="#/component/${encodeURIComponent(comp.id)}"
                class="tree-sub-link ${isActive ? "is-active" : ""}"
                title="${escapeHtml(comp.titleVi)}"
              >
                ${escapeHtml(comp.title)}
              </a>
            `;
          })
          .join("");

        return `
          <div class="tree-group ${isOpen ? "is-open" : ""}" data-cat-group="${escapeHtml(cat.slug)}">
            <button
              type="button"
              class="tree-cat-btn"
              data-cat-toggle="${escapeHtml(cat.slug)}"
              aria-expanded="${isOpen ? "true" : "false"}"
            >
              <span>${escapeHtml(cat.nameEn)}</span>
              <span class="tree-cat-meta">
                <span>${catComps.length}</span>
                <span>${isOpen ? "⌄" : "›"}</span>
              </span>
            </button>

            <div class="tree-sublist">
              <a
                href="#/category/${encodeURIComponent(cat.slug)}"
                class="tree-sub-link is-all-link ${isAllCategoryView ? "is-active" : ""}"
              >
                All ${escapeHtml(cat.nameEn)}
              </a>
              ${subItemsHtml}
            </div>
          </div>
        `;
      })
      .join("");

    // Khi bấm vào tên Danh mục ở Sidebar:
    // Mở xổ danh sách con VÀ chuyển ngay sang mẫu Component đầu tiên của danh mục đó (chỉ 1 lần nhấp!)
    listEl.querySelectorAll("button[data-cat-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const slug = btn.getAttribute("data-cat-toggle");
        if (!slug) return;
        const catComps = getComponentsByCategory(slug);
        const firstComp = catComps[0];
        const targetHash = firstComp
          ? `#/component/${encodeURIComponent(firstComp.id)}`
          : `#/category/${encodeURIComponent(slug)}`;

        // Nếu đang đứng ở đúng danh mục này rồi thì cho phép đóng/mở nhánh cây tại chỗ
        if (state.activeCategorySlug === slug) {
          if (state.expandedCategories.has(slug)) {
            state.expandedCategories.delete(slug);
          } else {
            state.expandedCategories.add(slug);
          }
          renderSidebar();
          return;
        }

        // Nếu đang ở Trang chủ hoặc danh mục khác -> Mở nhánh và chuyển thẳng tới Component đầu tiên
        state.expandedCategories.add(slug);
        if (window.location.hash === targetHash) {
          handleRoute();
        } else {
          window.location.hash = targetHash;
        }
      });
    });
  }

  // ==========================================================================
  // 5. RENDER COMPONENT DETAIL VIEW (Chuẩn Khung Khoanh Đỏ CodeShikhi)
  // ==========================================================================

  function renderComponentDetailView(container, comp) {
    const cat = categoryMap.get(comp.category);
    const catNameEn = cat ? cat.nameEn : comp.category;
    const catEyebrow = cat ? `${cat.nameEn} • ${cat.nameVi}` : comp.category;

    // Chỉ lấy tối đa 3 pill tag gọn gàng như CodeShikhi
    const tagsHtml = (comp.tags || [])
      .slice(0, 3)
      .map((t) => `<span class="comp-pill-tag">#${escapeHtml(t)}</span>`)
      .join("");

    const activeTabUpper = state.activeCodeTab.toUpperCase();

    container.innerHTML = `
      <!-- 1. KHỐI HEADER TIÊU ĐỀ COMPONENT -->
      <section class="comp-hero-box">
        <a href="#/category/${encodeURIComponent(comp.category)}" class="comp-back-link">
          ← Back to ${escapeHtml(catNameEn)}
        </a>
        <span class="comp-cat-eyebrow">${escapeHtml(catEyebrow)}</span>
        <h1 class="comp-main-title">${escapeHtml(comp.title)}</h1>
        <p class="comp-subtitle">${escapeHtml(comp.titleVi)} — ${escapeHtml(comp.summary)}</p>
        <div class="comp-tags-row">${tagsHtml}</div>
      </section>

      <!-- 2. KHỐI LIVE PREVIEW -->
      <section class="comp-section">
        <div class="comp-section-head">
          <h2 class="comp-section-title">Live preview</h2>
          <button type="button" class="pill-btn pill-btn-purple" id="openFullscreenBtn">
            👁 Full preview
          </button>
        </div>

        <div class="preview-outer-card">
          <div class="preview-bar">
            <div class="preview-device-pills" role="group" aria-label="Chọn khung nhìn thiết bị">
              <button
                type="button"
                class="device-pill-btn ${state.activeViewport === "100%" ? "is-active" : ""}"
                data-vp="100%"
              >
                🖥 Desktop
              </button>
              <button
                type="button"
                class="device-pill-btn ${state.activeViewport === "375px" ? "is-active" : ""}"
                data-vp="375px"
              >
                📱 Mobile
              </button>
            </div>

            <div class="preview-bar-right">
              <button type="button" class="open-tab-link" id="openNewTabBtn">
                ↗ Open in new tab
              </button>
            </div>
          </div>

          <div class="preview-gray-stage">
            <div class="preview-inner-box" id="previewViewportFrame" style="width: ${escapeHtml(state.activeViewport)};">
              <iframe
                id="detailPreviewIframe"
                class="preview-iframe"
                sandbox="allow-scripts allow-forms"
                title="Live Preview cho ${escapeHtml(comp.title)}"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. KHỐI SOURCE CODE (Chỉ 3 tab HTML | CSS | JS và dừng tại đây) -->
      <section class="comp-section">
        <div class="comp-section-head">
          <h2 class="comp-section-title">Source code</h2>
          <div class="pill-switch-group" role="tablist" aria-label="Chọn ngôn ngữ mã nguồn">
            <button
              type="button"
              role="tab"
              class="pill-switch-btn ${state.activeCodeTab === "html" ? "is-active" : ""}"
              data-tab="html"
            >
              HTML
            </button>
            <button
              type="button"
              role="tab"
              class="pill-switch-btn ${state.activeCodeTab === "css" ? "is-active" : ""}"
              data-tab="css"
            >
              CSS
            </button>
            <button
              type="button"
              role="tab"
              class="pill-switch-btn ${state.activeCodeTab === "js" ? "is-active" : ""}"
              data-tab="js"
            >
              JS
            </button>
          </div>
        </div>

        <div class="source-card">
          <div class="source-winbar">
            <div class="source-winbar-left">
              <span class="win-dot win-dot-red"></span>
              <span class="win-dot win-dot-amber"></span>
              <span class="win-dot win-dot-green"></span>
              <span class="source-lang-label" id="sourceLangLabel">${escapeHtml(activeTabUpper)}</span>
            </div>
            <button type="button" class="pill-btn pill-btn-dark" id="copyCodeBtn">
              📋 Copy code
            </button>
          </div>

          <label for="liveCodeTextarea" class="sr-only">Mã nguồn ${escapeHtml(activeTabUpper)}</label>
          <textarea
            id="liveCodeTextarea"
            class="source-textarea"
            spellcheck="false"
          ></textarea>
        </div>
      </section>
    `;

    const iframe = document.getElementById("detailPreviewIframe");
    const viewportFrame = document.getElementById("previewViewportFrame");
    const textarea = document.getElementById("liveCodeTextarea");
    const langLabel = document.getElementById("sourceLangLabel");

    function updatePreviewIframe() {
      const currentDraft = getComponentDraft(comp);
      if (iframe) {
        iframe.srcdoc = buildPreviewDoc(currentDraft);
      }
    }

    function syncTextareaFromTab() {
      const currentDraft = getComponentDraft(comp);
      if (!textarea) return;
      textarea.value = currentDraft[state.activeCodeTab] || "";
      if (langLabel) {
        langLabel.textContent = state.activeCodeTab.toUpperCase();
      }
    }

    updatePreviewIframe();
    syncTextareaFromTab();

    // Khi sửa code trong khung Source code -> tự động cập nhật Live preview
    let debounceTimer = null;
    textarea?.addEventListener("input", () => {
      const currentDraft = getComponentDraft(comp);
      currentDraft[state.activeCodeTab] = textarea.value;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updatePreviewIframe, 220);
    });

    // Chuyển đổi 3 tab HTML | CSS | JS
    container.querySelectorAll("button[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeCodeTab = btn.getAttribute("data-tab") || "html";
        container.querySelectorAll("button[data-tab]").forEach((b) => {
          b.classList.toggle("is-active", b.getAttribute("data-tab") === state.activeCodeTab);
        });
        syncTextareaFromTab();
      });
    });

    // Chuyển đổi Desktop / Mobile
    container.querySelectorAll("button[data-vp]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeViewport = btn.getAttribute("data-vp") || "100%";
        container.querySelectorAll("button[data-vp]").forEach((b) => {
          b.classList.toggle("is-active", b.getAttribute("data-vp") === state.activeViewport);
        });
        if (viewportFrame) {
          viewportFrame.style.width = state.activeViewport;
        }
      });
    });

    // Nút Full preview, Open in new tab, Copy code
    document.getElementById("openFullscreenBtn")?.addEventListener("click", () => {
      openFullscreenModal(comp);
    });

    document.getElementById("openNewTabBtn")?.addEventListener("click", () => {
      openPreviewInNewTab(comp);
    });

    document.getElementById("copyCodeBtn")?.addEventListener("click", () => {
      copyTextToClipboard(textarea ? textarea.value : "", state.activeCodeTab.toUpperCase());
    });
  }

  // ==========================================================================
  // 6. RENDER TRANG CHỦ, DANH MỤC & BOILERPLATE
  // ==========================================================================

  function renderHomeView(container) {
    // Trên trang chủ, bấm vào thẻ Danh mục cũng mở thẳng mẫu Component đầu tiên của mục đó!
    const categoryCardsHtml = categories
      .map((cat) => {
        const catComps = getComponentsByCategory(cat.slug);
        const firstComp = catComps[0];
        const targetHref = firstComp
          ? `#/component/${encodeURIComponent(firstComp.id)}`
          : `#/category/${encodeURIComponent(cat.slug)}`;

        return `
          <a href="${targetHref}" class="category-card">
            <div>
              <div class="category-card-top">
                <span class="category-icon-pill" aria-hidden="true">${escapeHtml(cat.icon)}</span>
                <span class="category-count-badge">${catComps.length} designs</span>
              </div>
              <h3>${escapeHtml(cat.nameEn)}</h3>
              <span class="category-card-vi">${escapeHtml(cat.nameVi)}</span>
              <p>${escapeHtml(cat.description)}</p>
            </div>
          </a>
        `;
      })
      .join("");

    container.innerHTML = `
      <section class="home-banner">
        <span class="comp-cat-eyebrow">VANILLA HTML5 • CSS3 • JAVASCRIPT</span>
        <h1>Browse 25 Component Sections</h1>
        <p>
          Nhấp trực tiếp vào bất kỳ danh mục nào ở cột <strong>CATEGORIES</strong> bên trái hoặc lưới bên dưới để mở ngay mẫu giao diện, xem <strong>Live preview</strong> và sao chép <strong>Source code</strong>.
        </p>
        <div class="home-actions">
          <a href="#/component/header-responsive-command" class="pill-btn pill-btn-purple">
            🚀 Mở ngay Kho Component
          </a>
          <a href="#/boilerplate" class="pill-btn">
            📄 Lấy Khung HTML5 Starter
          </a>
        </div>
      </section>

      <section class="comp-section">
        <div class="comp-section-head">
          <h2 class="comp-section-title">Browse by section (25)</h2>
        </div>
        <div class="category-grid">
          ${categoryCardsHtml}
        </div>
      </section>
    `;
  }

  function renderCategoryOrSearchView(container, options) {
    const { eyebrow, title, subtitle, list } = options;

    const cardsHtml =
      list.length > 0
        ? `<div class="category-grid">
            ${list
              .map((comp) => {
                const cat = categoryMap.get(comp.category);
                return `
                  <a href="#/component/${encodeURIComponent(comp.id)}" class="category-card">
                    <div>
                      <div class="category-card-top">
                        <span class="category-icon-pill" aria-hidden="true">${escapeHtml(cat ? cat.icon : "🧩")}</span>
                        <span class="category-count-badge">Open →</span>
                      </div>
                      <h3>${escapeHtml(comp.title)}</h3>
                      <span class="category-card-vi">${escapeHtml(comp.titleVi)}</span>
                      <p>${escapeHtml(comp.summary)}</p>
                    </div>
                  </a>
                `;
              })
              .join("")}
          </div>`
        : `<div class="comp-hero-box"><p>Không tìm thấy mẫu nào khớp với từ khóa.</p></div>`;

    container.innerHTML = `
      <section class="comp-hero-box">
        <a href="#/" class="comp-back-link">← Back to Home</a>
        <span class="comp-cat-eyebrow">${escapeHtml(eyebrow)}</span>
        <h1 class="comp-main-title">${escapeHtml(title)}</h1>
        <p class="comp-subtitle">${escapeHtml(subtitle)}</p>
      </section>
      <section class="comp-section">
        ${cardsHtml}
      </section>
    `;
  }

  function renderBoilerplateView(container) {
    container.innerHTML = `
      <section class="comp-hero-box">
        <a href="#/" class="comp-back-link">← Back to Home</a>
        <span class="comp-cat-eyebrow">STARTER TEMPLATE</span>
        <h1 class="comp-main-title">HTML5 Starter Boilerplate</h1>
        <p class="comp-subtitle">Khung HTML5 chuẩn thay thế cho Bootstrap Starter Template — sẵn sàng dán HTML, CSS và JS.</p>
      </section>

      <section class="comp-section">
        <div class="source-card">
          <div class="source-winbar">
            <div class="source-winbar-left">
              <span class="win-dot win-dot-red"></span>
              <span class="win-dot win-dot-amber"></span>
              <span class="win-dot win-dot-green"></span>
              <span class="source-lang-label">INDEX.HTML</span>
            </div>
            <button type="button" class="pill-btn pill-btn-dark" id="copyBoilerplateBtn">
              📋 Copy code
            </button>
          </div>
          <textarea class="source-textarea" readonly>${escapeHtml(HTML5_BOILERPLATE)}</textarea>
        </div>
      </section>
    `;

    document.getElementById("copyBoilerplateBtn")?.addEventListener("click", () => {
      copyTextToClipboard(HTML5_BOILERPLATE, "HTML5 Starter");
    });
  }

  // ==========================================================================
  // 7. FULLSCREEN PREVIEW MODAL
  // ==========================================================================

  function openFullscreenModal(comp) {
    const modal = document.getElementById("fullscreenModal");
    const titleEl = document.getElementById("fsModalTitle");
    const catEl = document.getElementById("fsModalCategory");
    const fsIframe = document.getElementById("fullscreenIframe");
    if (!modal || !fsIframe || !comp) return;

    const cat = categoryMap.get(comp.category);
    if (titleEl) titleEl.textContent = comp.title;
    if (catEl) catEl.textContent = cat ? ` — ${cat.nameEn}` : "";

    fsIframe.style.width = "100%";
    fsIframe.srcdoc = buildPreviewDoc(getComponentDraft(comp));
    modal.hidden = false;
  }

  function closeFullscreenModal() {
    const modal = document.getElementById("fullscreenModal");
    if (modal && !modal.hidden) {
      modal.hidden = true;
    }
  }

  // ==========================================================================
  // 8. HASH ROUTER & SỰ KIỆN TOÀN CỤC
  // ==========================================================================

  function updateTopNavHighlight(activeKey) {
    document.querySelectorAll(".topnav-link").forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("data-nav") === activeKey);
    });
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById("categorySidebar");
    const backdrop = document.getElementById("sidebarBackdrop");
    const toggleBtn = document.getElementById("sidebarToggleBtn");
    sidebar?.classList.remove("is-open");
    if (backdrop) backdrop.hidden = true;
    toggleBtn?.setAttribute("aria-expanded", "false");
  }

  function handleRoute() {
    const viewContainer = document.getElementById("viewContainer");
    if (!viewContainer) return;

    const rawHash = window.location.hash || "#/";
    if (rawHash === "#mainContent") {
      document.getElementById("mainContent")?.focus();
      return;
    }
    closeMobileSidebar();

    // 1. Tìm kiếm (#/search?q=...)
    if (rawHash.startsWith("#/search")) {
      const queryPart = rawHash.split("?")[1] || "";
      const params = new URLSearchParams(queryPart);
      const q = params.get("q") || "";
      state.searchQuery = q;
      state.activeComponentId = null;

      const searchInput = document.getElementById("globalSearchInput");
      if (searchInput && searchInput.value !== q) {
        searchInput.value = q;
      }

      const results = searchComponents(q);
      state.activeCategorySlug = null;
      // Nếu chỉ có đúng 1 kết quả hoặc người dùng muốn mở nhanh: hiển thị danh sách gọn
      updateTopNavHighlight("components");
      renderSidebar();
      renderCategoryOrSearchView(viewContainer, {
        eyebrow: "SEARCH RESULTS",
        title: q ? `Kết quả cho "${q}" (${results.length})` : "All Components",
        subtitle: "Nhấp vào mẫu bất kỳ để xem ngay Live preview và Source code.",
        list: results
      });
      return;
    }

    // 2. Chi tiết Component (#/component/:id)
    if (rawHash.startsWith("#/component/")) {
      const compId = decodeURIComponent(rawHash.slice("#/component/".length).trim());
      const comp = componentMap.get(compId);
      if (comp) {
        state.activeComponentId = comp.id;
        state.activeCategorySlug = comp.category;
        state.expandedCategories.add(comp.category);
        updateTopNavHighlight("components");
        renderSidebar();
        renderComponentDetailView(viewContainer, comp);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    // 3. Xem tất cả mẫu trong 1 Danh mục (#/category/:slug)
    if (rawHash.startsWith("#/category/")) {
      const slug = decodeURIComponent(rawHash.slice("#/category/".length).trim());
      const cat = categoryMap.get(slug);
      if (cat) {
        state.activeCategorySlug = cat.slug;
        state.activeComponentId = null;
        state.expandedCategories.add(cat.slug);
        const list = getComponentsByCategory(cat.slug);
        updateTopNavHighlight("components");
        renderSidebar();
        renderCategoryOrSearchView(viewContainer, {
          eyebrow: cat.nameEn.toUpperCase(),
          title: `${cat.nameEn} (${cat.nameVi})`,
          subtitle: cat.description,
          list
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    // 4. Khung HTML5 Boilerplate (#/boilerplate)
    if (rawHash === "#/boilerplate") {
      state.activeCategorySlug = null;
      state.activeComponentId = null;
      updateTopNavHighlight("boilerplate");
      renderSidebar();
      renderBoilerplateView(viewContainer);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // 5. Trang chủ (#/)
    state.activeCategorySlug = null;
    state.activeComponentId = null;
    updateTopNavHighlight("home");
    renderSidebar();
    renderHomeView(viewContainer);
  }

  function initTheme() {
    const saved = localStorage.getItem("code_library_theme");
    const theme = saved === "dark" ? "dark" : "light";
    applyTheme(theme);

    document.getElementById("themeToggleBtn")?.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem("code_library_theme", next);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const iconEl = document.getElementById("themeIcon");
    const labelEl = document.getElementById("themeLabel");
    if (iconEl) iconEl.textContent = theme === "dark" ? "☀️" : "🌙";
    if (labelEl) labelEl.textContent = theme === "dark" ? "Light" : "Dark";
  }

  function initGlobalEvents() {
    const skipLink = document.getElementById("skipToMainLink");
    skipLink?.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("mainContent")?.focus();
    });

    window.addEventListener("message", (e) => {
      const fsIframe = document.getElementById("fullscreenIframe");
      if (
        e.data &&
        e.data.type === "cl-preview-escape" &&
        fsIframe &&
        e.source === fsIframe.contentWindow
      ) {
        closeFullscreenModal();
      }
    });

    const searchInput = document.getElementById("globalSearchInput");
    searchInput?.addEventListener("input", () => {
      const q = searchInput.value.trim();
      if (q) {
        window.location.hash = `#/search?q=${encodeURIComponent(q)}`;
      } else if (window.location.hash.startsWith("#/search")) {
        window.location.hash = "#/";
      }
    });

    const sidebarFilterInput = document.getElementById("sidebarFilterInput");
    sidebarFilterInput?.addEventListener("input", () => {
      state.sidebarFilter = sidebarFilterInput.value;
      renderSidebar();
    });

    const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
    const sidebar = document.getElementById("categorySidebar");
    const backdrop = document.getElementById("sidebarBackdrop");

    sidebarToggleBtn?.addEventListener("click", () => {
      const isOpen = sidebar?.classList.toggle("is-open");
      if (backdrop) backdrop.hidden = !isOpen;
      sidebarToggleBtn.setAttribute("aria-expanded", String(Boolean(isOpen)));
    });
    backdrop?.addEventListener("click", closeMobileSidebar);

    document.getElementById("closeFullscreenBtn")?.addEventListener("click", closeFullscreenModal);
    document.querySelectorAll("button[data-fsvp]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const vp = btn.getAttribute("data-fsvp") || "100%";
        document.querySelectorAll("button[data-fsvp]").forEach((b) => {
          b.classList.toggle("is-active", b.getAttribute("data-fsvp") === vp);
        });
        const fsIframe = document.getElementById("fullscreenIframe");
        if (fsIframe) fsIframe.style.width = vp;
      });
    });

    window.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) || "";
      const isTyping = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      if (e.key === "/" && !isTyping && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        searchInput?.focus();
        searchInput?.select();
        return;
      }

      if (e.key === "Escape") {
        const fsModal = document.getElementById("fullscreenModal");
        if (fsModal && !fsModal.hidden) {
          closeFullscreenModal();
          return;
        }
        if (document.activeElement === searchInput && searchInput.value) {
          searchInput.value = "";
          window.location.hash = "#/";
        }
      }
    });

    window.addEventListener("hashchange", handleRoute);
  }

  initTheme();
  initGlobalEvents();
  handleRoute();
})();
