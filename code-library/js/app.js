/**
 * Code Library v2.0 — Full 219 CodeShikhi Components & 25 Categories
 * 1-Click Sidebar Tree • Scaled Live Preview with AutoHeight • Syntax-Highlighted Source Code (HTML / CSS / JS)
 */
(function () {
  "use strict";

  const categories = Array.isArray(window.CODE_LIBRARY_CATEGORIES)
    ? window.CODE_LIBRARY_CATEGORIES
    : Array.isArray(window.CL_CATEGORIES)
      ? window.CL_CATEGORIES
      : [];

  const components = Array.isArray(window.CODE_LIBRARY_COMPONENTS)
    ? window.CODE_LIBRARY_COMPONENTS
    : Array.isArray(window.CL_COMPONENTS)
      ? window.CL_COMPONENTS
      : [];

  const categoryMap = new Map();
  categories.forEach((cat) => {
    categoryMap.set(cat.slug, cat);
    categoryMap.set(cat.slug.toLowerCase(), cat);
  });

  const componentMap = new Map();
  components.forEach((comp) => {
    componentMap.set(comp.id, comp);
    componentMap.set(comp.id.toLowerCase(), comp);
  });

  const state = {
    activeCategorySlug: null,
    activeComponentId: null,
    expandedCategories: new Set([categories[0] ? categories[0].slug : "header"]),
    activeCodeTab: "html", // "html" | "css" | "js"
    activeViewport: "desktop", // "desktop" (1280px scaled) | "mobile" (380px)
    sidebarFilter: "",
    searchQuery: ""
  };

  let activeResizeCleanup = null;

  const HTML5_BOILERPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pure HTML5 / CSS3 / JS Component</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #ffffff;
      color: #212529;
      line-height: 1.5;
    }
    /* Paste component CSS below */
  </style>
</head>
<body>
  <!-- Paste component HTML below -->

  <script>
    // Paste component JS below
  </script>
</body>
</html>`;

  // ==========================================================================
  // 1. UTILITIES & SAFE FORMATTING / HIGHLIGHTING
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

  function sanitizeInlineStyle(cssText) {
    return String(cssText ?? "").replace(/<\/style/gi, "<\\/style");
  }

  function sanitizeInlineScript(jsText) {
    return String(jsText ?? "").replace(/<\/script/gi, "<\\/script");
  }

  function getComponentTabCode(comp, tab) {
    if (!comp) return "";
    const cleanTab = (tab || "html").toLowerCase();
    if (cleanTab === "css") {
      return window.CL_BUILD_COMPONENT_CSS
        ? window.CL_BUILD_COMPONENT_CSS(comp)
        : comp.css || "";
    }
    if (cleanTab === "js") {
      return comp.js || "";
    }
    return comp.html || "";
  }

  function formatAndHighlightCode(rawCode, lang) {
    const cleanLang = (lang || "html").toLowerCase();
    const fallbackText =
      cleanLang === "css"
        ? "/* empty */"
        : cleanLang === "js"
          ? "// no JavaScript needed"
          : "<!-- empty -->";
    const source = String(rawCode ?? "").trim() || fallbackText;

    if (window.CL_CODE_TOOLS) {
      const formatted = window.CL_CODE_TOOLS.beautify(source, cleanLang) || source;
      const highlighted = window.CL_CODE_TOOLS.highlight(formatted, cleanLang);
      return { formatted: formatted.trimEnd(), highlighted };
    }
    return {
      formatted: source,
      highlighted: escapeHtml(source)
    };
  }

  // ==========================================================================
  // 2. LIVE PREVIEW DOCUMENT BUILDER (100% Identical Output + AutoHeight)
  // ==========================================================================

  const AUTO_HEIGHT_SCRIPT = `
(function(){
  var last = 0;
  function measure(){
    var body = document.body;
    if(!body) return 0;
    var max = 0;
    for (var i = 0; i < body.children.length; i++) {
      var el = body.children[i];
      if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE' || el.id === '__clErrorBox') continue;
      var r = el.getBoundingClientRect();
      var b = r.top + r.height + (parseFloat(getComputedStyle(el).marginBottom)||0);
      if (b > max) max = b;
    }
    var openMenus = document.querySelectorAll('.dropdown-menu.show, .nav-collapse.show, .accordion-collapse.show, .collapse.show, .modal.show');
    for (var j = 0; j < openMenus.length; j++) {
      var mr = openMenus[j].getBoundingClientRect();
      if (mr.bottom + 16 > max) max = mr.bottom + 16;
    }
    return Math.ceil(max);
  }
  function post(){
    try{
      var h = measure();
      if (h > 0 && Math.abs(h - last) > 2) {
        last = h;
        parent.postMessage({ __lp_h: h }, '*');
      }
    }catch(e){}
  }
  window.addEventListener('load', function(){
    post();
    [80, 220, 600, 1400, 2500].forEach(function(t){ setTimeout(post, t); });
  });
  window.addEventListener('resize', function(){
    last = 0;
    post();
    setTimeout(post, 80);
  });
  document.addEventListener('click', function(){
    setTimeout(post, 40);
    setTimeout(post, 220);
  });
})();
`.trim();

  function buildPreviewDoc(comp, enableAutoHeight) {
    if (!comp) return "";
    const rawHtml = getComponentTabCode(comp, "html");
    const rawCss = getComponentTabCode(comp, "css");
    const rawJs = getComponentTabCode(comp, "js");

    const htmlForPreview = enableAutoHeight
      ? rawHtml.replace(/(style\s*=\s*["'][^"']*?)100vh/gi, "$1640px")
      : rawHtml;
    const cssForPreview = sanitizeInlineStyle(
      enableAutoHeight ? rawCss.replace(/100vh/g, "640px") : rawCss
    );
    const vhGuardCss = enableAutoHeight
      ? ".vh-100{height:640px!important}.min-vh-100{min-height:640px!important}"
      : "";
    const baseJs = sanitizeInlineScript(window.CL_PREVIEW_BASE_JS || "");
    const compJs = sanitizeInlineScript(rawJs);

    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>html,body{margin:0;background:#fff;color:#212529}${cssForPreview}${vhGuardCss}</style>
</head>
<body>
${htmlForPreview}
<script>
window.addEventListener('keydown', function(ev){
  if (ev.key === 'Escape' && window.parent && window.parent !== window) {
    window.parent.postMessage({ type: 'cl-preview-escape' }, '*');
  }
});
${baseJs}
<\/script>
<script>
try {
${compJs}
} catch (_err) {}
<\/script>
${enableAutoHeight ? `<script>${AUTO_HEIGHT_SCRIPT}<\/script>` : ""}
</body>
</html>`;
  }

  // ==========================================================================
  // 3. CATEGORY & SEARCH QUERIES
  // ==========================================================================

  function getComponentsByCategory(slug) {
    if (!slug) return [];
    const target = slug.toLowerCase();
    return components.filter(
      (c) => (c.category || c.categoryId || "").toLowerCase() === target
    );
  }

  function searchComponents(rawQuery) {
    const normQuery = normalizeViText(rawQuery);
    if (!normQuery) return components.slice();
    const tokens = normQuery.split(" ").filter(Boolean);

    return components.filter((comp) => {
      const cat = categoryMap.get(comp.category || comp.categoryId);
      const haystack = normalizeViText(
        [
          comp.id,
          comp.slug,
          comp.title,
          comp.titleVi,
          comp.summary,
          comp.description,
          comp.sectionName,
          ...(comp.tags || []),
          cat ? cat.nameEn || cat.name : "",
          cat ? cat.nameVi : "",
          cat ? cat.description : ""
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
      const compNames = catComps.map((c) => `${c.title} ${c.slug}`).join(" ");
      const hay = normalizeViText(
        [cat.slug, cat.nameEn || cat.name, cat.nameVi, cat.description, compNames].join(" ")
      );
      return hay.includes(norm);
    });
  }

  // ==========================================================================
  // 4. CLIPBOARD, NEW TAB PREVIEW & TOAST
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
    }, 2000);
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
      return true;
    } catch (_err) {
      showToast(`⚠ Could not copy ${label}.`);
      return false;
    }
  }

  function openPreviewInNewTab(comp) {
    if (!comp) return;
    const htmlDoc = buildPreviewDoc(comp, false);
    const blob = new Blob([htmlDoc], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener");
    setTimeout(() => URL.revokeObjectURL(url), 15000);
  }

  // ==========================================================================
  // 5. SIDEBAR ACCORDION TREE (Exact CodeShikhi 25 Categories & 219 Designs)
  // ==========================================================================

  function renderSidebar() {
    const listEl = document.getElementById("sidebarCategoryList");
    if (!listEl) return;

    const filteredCats = filterSidebarCategories(state.sidebarFilter);
    if (filteredCats.length === 0) {
      listEl.innerHTML = `<p style="padding:10px;font-size:0.82rem;color:var(--text-muted);">No matching categories.</p>`;
      return;
    }

    const isFiltering = Boolean(state.sidebarFilter.trim());
    const normFilter = normalizeViText(state.sidebarFilter);

    listEl.innerHTML = filteredCats
      .map((cat) => {
        const catComps = getComponentsByCategory(cat.slug);
        const visibleComps = isFiltering
          ? catComps.filter((c) => {
              const catMatch = normalizeViText(`${cat.nameEn || cat.name} ${cat.nameVi}`).includes(normFilter);
              if (catMatch) return true;
              return normalizeViText(`${c.title} ${c.slug}`).includes(normFilter);
            })
          : catComps;

        const isOpen = isFiltering || state.expandedCategories.has(cat.slug);
        const isAllCategoryView =
          !state.activeComponentId &&
          state.activeCategorySlug &&
          state.activeCategorySlug.toLowerCase() === cat.slug.toLowerCase();

        const subItemsHtml = visibleComps
          .map((comp) => {
            const isActive =
              state.activeComponentId &&
              state.activeComponentId.toLowerCase() === comp.id.toLowerCase();
            return `
              <a
                href="#/component/${encodeURIComponent(comp.id)}"
                class="tree-sub-link ${isActive ? "is-active" : ""}"
                title="${escapeHtml(comp.title)}"
              >
                ${escapeHtml(comp.title)}
              </a>
            `;
          })
          .join("");

        const catDisplayName = cat.nameEn || cat.name;

        return `
          <div class="tree-group ${isOpen ? "is-open" : ""}" data-cat-group="${escapeHtml(cat.slug)}">
            <button
              type="button"
              class="tree-cat-btn"
              data-cat-toggle="${escapeHtml(cat.slug)}"
              aria-expanded="${isOpen ? "true" : "false"}"
            >
              <span>${escapeHtml(catDisplayName)}</span>
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
                All ${escapeHtml(catDisplayName)}
              </a>
              ${subItemsHtml}
            </div>
          </div>
        `;
      })
      .join("");

    // Clicking a category in the sidebar expands its items AND opens its first component right away
    listEl.querySelectorAll("button[data-cat-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const slug = btn.getAttribute("data-cat-toggle");
        if (!slug) return;
        const catComps = getComponentsByCategory(slug);
        const firstComp = catComps[0];
        const targetHash = firstComp
          ? `#/component/${encodeURIComponent(firstComp.id)}`
          : `#/category/${encodeURIComponent(slug)}`;

        if (
          state.activeCategorySlug &&
          state.activeCategorySlug.toLowerCase() === slug.toLowerCase()
        ) {
          if (state.expandedCategories.has(slug)) {
            state.expandedCategories.delete(slug);
          } else {
            state.expandedCategories.add(slug);
          }
          renderSidebar();
          return;
        }

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
  // 6. COMPONENT DETAIL VIEW (CodeShikhi LivePreview + Highlighted CodeBlock)
  // ==========================================================================

  function setupScaledLivePreview(stageEl, outerBoxEl, scaleWrapEl, iframeEl, comp, initialHeight) {
    if (activeResizeCleanup) {
      activeResizeCleanup();
      activeResizeCleanup = null;
    }

    let rawHeight = initialHeight || 240;

    function applyScale() {
      if (!stageEl || !outerBoxEl || !scaleWrapEl || !iframeEl) return;
      const isMobile = state.activeViewport === "mobile";
      const targetW = isMobile ? 380 : 1280;
      const availW = Math.max(260, stageEl.clientWidth - 28);
      const scale = isMobile
        ? Math.min(1, availW / 380)
        : availW > 0
          ? Math.min(1, availW / 1280)
          : 1;

      const scaledH = Math.round(rawHeight * scale);
      outerBoxEl.style.width = isMobile ? `${Math.min(380, availW)}px` : "100%";
      outerBoxEl.style.maxWidth = isMobile ? "380px" : "100%";
      outerBoxEl.style.height = `${scaledH}px`;

      scaleWrapEl.style.width = `${targetW}px`;
      scaleWrapEl.style.height = `${Math.round(rawHeight)}px`;
      scaleWrapEl.style.transform = `scale(${scale})`;

      iframeEl.style.width = `${targetW}px`;
      iframeEl.style.height = `${Math.round(rawHeight)}px`;
    }

    function onMessage(ev) {
      const data = ev.data;
      if (
        data &&
        typeof data.__lp_h === "number" &&
        iframeEl &&
        ev.source === iframeEl.contentWindow
      ) {
        rawHeight = Math.min(Math.max(data.__lp_h + 6, 120), 20000);
        applyScale();
      }
    }

    window.addEventListener("message", onMessage);

    let ro = null;
    if (typeof ResizeObserver !== "undefined" && stageEl) {
      ro = new ResizeObserver(applyScale);
      ro.observe(stageEl);
    } else {
      window.addEventListener("resize", applyScale);
    }

    iframeEl.srcdoc = buildPreviewDoc(comp, true);
    applyScale();

    activeResizeCleanup = () => {
      window.removeEventListener("message", onMessage);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", applyScale);
    };

    return {
      refreshScale: applyScale
    };
  }

  function renderComponentDetailView(container, comp) {
    const catSlug = comp.category || comp.categoryId;
    const cat = categoryMap.get(catSlug);
    const catName = cat ? cat.nameEn || cat.name : catSlug;
    const sectionEyebrow = comp.sectionName || catName;

    const tagsHtml = (comp.tags || [])
      .map((t) => `<span class="comp-pill-tag">#${escapeHtml(t)}</span>`)
      .join("");

    const relatedComps = getComponentsByCategory(catSlug).filter(
      (item) => item.id !== comp.id
    );

    const moreDesignsHtml =
      relatedComps.length > 0
        ? `
          <section class="comp-section">
            <div class="comp-section-head">
              <h2 class="comp-section-title">More designs in ${escapeHtml(catName)} (${relatedComps.length})</h2>
            </div>
            <div class="more-designs-grid">
              ${relatedComps
                .map(
                  (rel) => `
                  <a href="#/component/${encodeURIComponent(rel.id)}" class="more-design-card">
                    <div class="more-design-eyebrow">${escapeHtml(rel.sectionName || catName)}</div>
                    <div class="more-design-title">${escapeHtml(rel.title)}</div>
                  </a>
                `
                )
                .join("")}
            </div>
          </section>
        `
        : "";

    const activeTabUpper = state.activeCodeTab.toUpperCase();

    container.innerHTML = `
      <!-- 1. COMPONENT HEADER -->
      <section class="comp-hero-box">
        <a href="#/category/${encodeURIComponent(catSlug)}" class="comp-back-link">
          ← Back to ${escapeHtml(catName)}
        </a>
        <span class="comp-cat-eyebrow">${escapeHtml(sectionEyebrow)}</span>
        <h1 class="comp-main-title">${escapeHtml(comp.title)}</h1>
        <p class="comp-subtitle">${escapeHtml(comp.description || comp.summary || "")}</p>
        ${tagsHtml ? `<div class="comp-tags-row">${tagsHtml}</div>` : ""}
      </section>

      <!-- 2. LIVE PREVIEW -->
      <section class="comp-section">
        <div class="comp-section-head">
          <h2 class="comp-section-title">Live preview</h2>
          <button type="button" class="pill-btn pill-btn-purple" id="openFullscreenBtn">
            👁 Full preview
          </button>
        </div>

        <div class="preview-outer-card">
          <div class="preview-bar">
            <div class="preview-device-pills" role="group" aria-label="Preview viewport size">
              <button
                type="button"
                class="device-pill-btn ${state.activeViewport === "desktop" ? "is-active" : ""}"
                data-vp="desktop"
              >
                🖥 Desktop
              </button>
              <button
                type="button"
                class="device-pill-btn ${state.activeViewport === "mobile" ? "is-active" : ""}"
                data-vp="mobile"
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

          <div class="preview-gray-stage" id="previewGrayStage">
            <div class="preview-inner-box" id="previewViewportFrame">
              <div class="preview-scale-wrap" id="previewScaleWrap">
                <iframe
                  id="detailPreviewIframe"
                  class="preview-iframe"
                  sandbox="allow-scripts allow-forms"
                  title="Live Preview — ${escapeHtml(comp.title)}"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. SOURCE CODE (Syntax-Highlighted HTML | CSS | JS) -->
      <section class="comp-section">
        <div class="comp-section-head">
          <h2 class="comp-section-title">Source code</h2>
          <div class="pill-switch-group" role="tablist" aria-label="Source code language">
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
            <button type="button" class="copy-code-btn" id="copyCodeBtn">
              <span id="copyCodeBtnText">📋 Copy code</span>
            </button>
          </div>

          <pre class="source-pre"><code id="highlightedCodeEl" class="hljs language-${escapeHtml(state.activeCodeTab)}"></code></pre>
        </div>
      </section>

      ${moreDesignsHtml}
    `;

    const stageEl = document.getElementById("previewGrayStage");
    const outerBoxEl = document.getElementById("previewViewportFrame");
    const scaleWrapEl = document.getElementById("previewScaleWrap");
    const iframeEl = document.getElementById("detailPreviewIframe");
    const codeEl = document.getElementById("highlightedCodeEl");
    const langLabel = document.getElementById("sourceLangLabel");
    const copyBtn = document.getElementById("copyCodeBtn");
    const copyBtnText = document.getElementById("copyCodeBtnText");

    const previewController = setupScaledLivePreview(
      stageEl,
      outerBoxEl,
      scaleWrapEl,
      iframeEl,
      comp,
      240
    );

    let currentFormattedCode = "";

    function syncHighlightedCodeFromTab() {
      const tab = state.activeCodeTab;
      const rawCode = getComponentTabCode(comp, tab);
      const { formatted, highlighted } = formatAndHighlightCode(rawCode, tab);
      currentFormattedCode = formatted;
      if (codeEl) {
        codeEl.className = `hljs language-${tab}`;
        codeEl.innerHTML = highlighted;
      }
      if (langLabel) {
        langLabel.textContent = tab.toUpperCase();
      }
    }

    syncHighlightedCodeFromTab();

    // Switch HTML | CSS | JS tabs
    container.querySelectorAll("button[data-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeCodeTab = btn.getAttribute("data-tab") || "html";
        container.querySelectorAll("button[data-tab]").forEach((b) => {
          b.classList.toggle("is-active", b.getAttribute("data-tab") === state.activeCodeTab);
        });
        syncHighlightedCodeFromTab();
      });
    });

    // Switch Desktop / Mobile viewport
    container.querySelectorAll("button[data-vp]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeViewport = btn.getAttribute("data-vp") || "desktop";
        container.querySelectorAll("button[data-vp]").forEach((b) => {
          b.classList.toggle("is-active", b.getAttribute("data-vp") === state.activeViewport);
        });
        previewController.refreshScale();
      });
    });

    // Full preview, Open in new tab, Copy code
    document.getElementById("openFullscreenBtn")?.addEventListener("click", () => {
      openFullscreenModal(comp);
    });

    document.getElementById("openNewTabBtn")?.addEventListener("click", () => {
      openPreviewInNewTab(comp);
    });

    copyBtn?.addEventListener("click", async () => {
      const ok = await copyTextToClipboard(
        currentFormattedCode,
        state.activeCodeTab.toUpperCase()
      );
      if (ok && copyBtn && copyBtnText) {
        copyBtn.classList.add("is-copied");
        copyBtnText.textContent = "✓ Copied!";
        setTimeout(() => {
          copyBtn.classList.remove("is-copied");
          copyBtnText.textContent = "📋 Copy code";
        }, 1800);
      }
    });
  }

  // ==========================================================================
  // 7. HOME, ALL-CATEGORY DESIGNS & BOILERPLATE VIEWS
  // ==========================================================================

  function renderHomeView(container) {
    if (activeResizeCleanup) {
      activeResizeCleanup();
      activeResizeCleanup = null;
    }

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
                <span class="category-icon-pill" aria-hidden="true">${escapeHtml(cat.icon || "🧩")}</span>
                <span class="category-count-badge">${catComps.length} designs</span>
              </div>
              <h3>${escapeHtml(cat.nameEn || cat.name)}</h3>
              <span class="category-card-vi">${escapeHtml(cat.nameVi)}</span>
              <p>${escapeHtml(cat.description)}</p>
            </div>
          </a>
        `;
      })
      .join("");

    const firstCompId = components[0] ? components[0].id : "Navbar-with-Current-Date-Time";

    container.innerHTML = `
      <section class="home-banner">
        <span class="comp-cat-eyebrow">PURE HTML5 • CSS3 • JAVASCRIPT (${components.length} DESIGNS)</span>
        <h1>Browse ${categories.length} Component Sections (${components.length} Templates)</h1>
        <p>
          Full collection of <strong>${components.length} components</strong> across <strong>${categories.length} categories</strong>. Click any category in the left <strong>CATEGORIES</strong> sidebar or below to preview live and copy syntax-highlighted <strong>HTML, CSS &amp; JS</strong>.
        </p>
        <div class="home-actions">
          <a href="#/component/${encodeURIComponent(firstCompId)}" class="pill-btn pill-btn-purple">
            🚀 Explore All ${components.length} Components
          </a>
          <a href="#/boilerplate" class="pill-btn">
            📄 HTML5 Starter Template
          </a>
        </div>
      </section>

      <section class="comp-section">
        <div class="comp-section-head">
          <h2 class="comp-section-title">All Categories (${categories.length})</h2>
        </div>
        <div class="category-grid">
          ${categoryCardsHtml}
        </div>
      </section>
    `;
  }

  function renderCategoryOrSearchView(container, options) {
    if (activeResizeCleanup) {
      activeResizeCleanup();
      activeResizeCleanup = null;
    }

    const { eyebrow, title, subtitle, list } = options;

    const cardsHtml =
      list.length > 0
        ? `<div class="category-grid">
            ${list
              .map((comp) => {
                const cat = categoryMap.get(comp.category || comp.categoryId);
                return `
                  <a href="#/component/${encodeURIComponent(comp.id)}" class="category-card">
                    <div>
                      <div class="category-card-top">
                        <span class="category-icon-pill" aria-hidden="true">${escapeHtml(cat ? cat.icon : "🧩")}</span>
                        <span class="category-count-badge">Preview &amp; Code →</span>
                      </div>
                      <h3>${escapeHtml(comp.title)}</h3>
                      <span class="category-card-vi">${escapeHtml(comp.sectionName || (cat ? cat.nameEn || cat.name : ""))}</span>
                      <p>${escapeHtml(comp.description || comp.summary || "")}</p>
                    </div>
                  </a>
                `;
              })
              .join("")}
          </div>`
        : `<div class="comp-hero-box"><p>No matching components found.</p></div>`;

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
    if (activeResizeCleanup) {
      activeResizeCleanup();
      activeResizeCleanup = null;
    }

    const { formatted, highlighted } = formatAndHighlightCode(HTML5_BOILERPLATE, "html");

    container.innerHTML = `
      <section class="comp-hero-box">
        <a href="#/" class="comp-back-link">← Back to Home</a>
        <span class="comp-cat-eyebrow">STARTER TEMPLATE</span>
        <h1 class="comp-main-title">HTML5 Starter Boilerplate</h1>
        <p class="comp-subtitle">Clean HTML5 starter page ready for pasting any component's HTML, CSS, and JS.</p>
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
            <button type="button" class="copy-code-btn" id="copyBoilerplateBtn">
              📋 Copy code
            </button>
          </div>
          <pre class="source-pre"><code class="hljs language-html">${highlighted}</code></pre>
        </div>
      </section>
    `;

    document.getElementById("copyBoilerplateBtn")?.addEventListener("click", () => {
      copyTextToClipboard(formatted, "HTML5 Starter");
    });
  }

  // ==========================================================================
  // 8. FULLSCREEN PREVIEW MODAL
  // ==========================================================================

  function openFullscreenModal(comp) {
    const modal = document.getElementById("fullscreenModal");
    const titleEl = document.getElementById("fsModalTitle");
    const catEl = document.getElementById("fsModalCategory");
    const fsIframe = document.getElementById("fullscreenIframe");
    if (!modal || !fsIframe || !comp) return;

    const cat = categoryMap.get(comp.category || comp.categoryId);
    if (titleEl) titleEl.textContent = comp.title;
    if (catEl) catEl.textContent = cat ? ` — ${cat.nameEn || cat.name}` : "";

    fsIframe.style.width = "100%";
    fsIframe.srcdoc = buildPreviewDoc(comp, false);
    modal.hidden = false;
  }

  function closeFullscreenModal() {
    const modal = document.getElementById("fullscreenModal");
    if (modal && !modal.hidden) {
      modal.hidden = true;
    }
  }

  // ==========================================================================
  // 9. ROUTER & GLOBAL EVENTS
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

    // 1. Search (#/search?q=...)
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
      updateTopNavHighlight("components");
      renderSidebar();
      renderCategoryOrSearchView(viewContainer, {
        eyebrow: "SEARCH RESULTS",
        title: q ? `Results for "${q}" (${results.length})` : `All Components (${results.length})`,
        subtitle: "Click any component to open its live preview and syntax-highlighted source code.",
        list: results
      });
      return;
    }

    // 2. Component Detail (#/component/:id)
    if (rawHash.startsWith("#/component/")) {
      const compId = decodeURIComponent(rawHash.slice("#/component/".length).trim());
      const comp = componentMap.get(compId) || componentMap.get(compId.toLowerCase());
      if (comp) {
        const catSlug = comp.category || comp.categoryId;
        state.activeComponentId = comp.id;
        state.activeCategorySlug = catSlug;
        state.expandedCategories.add(catSlug);
        updateTopNavHighlight("components");
        renderSidebar();
        renderComponentDetailView(viewContainer, comp);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    // 3. Category Overview (#/category/:slug)
    if (rawHash.startsWith("#/category/")) {
      const slug = decodeURIComponent(rawHash.slice("#/category/".length).trim());
      const cat = categoryMap.get(slug) || categoryMap.get(slug.toLowerCase());
      if (cat) {
        state.activeCategorySlug = cat.slug;
        state.activeComponentId = null;
        state.expandedCategories.add(cat.slug);
        const list = getComponentsByCategory(cat.slug);
        const catName = cat.nameEn || cat.name;
        updateTopNavHighlight("components");
        renderSidebar();
        renderCategoryOrSearchView(viewContainer, {
          eyebrow: `${catName.toUpperCase()} • ${list.length} DESIGNS`,
          title: `${catName} (${cat.nameVi})`,
          subtitle: cat.description,
          list
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    // 4. HTML5 Starter Boilerplate (#/boilerplate)
    if (rawHash === "#/boilerplate") {
      state.activeCategorySlug = null;
      state.activeComponentId = null;
      updateTopNavHighlight("boilerplate");
      renderSidebar();
      renderBoilerplateView(viewContainer);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // 5. Home (#/)
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
