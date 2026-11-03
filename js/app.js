/**
 * Code Library — Ứng dụng SPA Tra cứu, Xem trước (Live Preview) & Chỉnh sửa Component
 * 100% Vanilla JavaScript — Không phụ thuộc thư viện ngoài
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
    activeCodeTab: "html", // "html" | "css" | "js" | "full"
    activeViewport: "100%", // "100%" | "768px" | "375px"
    sidebarFilter: "",
    searchQuery: ""
  };

  // Khung HTML5 Boilerplate chuẩn thay thế cho Bootstrap Starter Template
  const HTML5_BOILERPLATE = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dự án Web Chuẩn HTML5 / CSS3 / JS</title>
  <style>
    :root {
      --bg: #f8fafc;
      --surface: #ffffff;
      --text: #0f172a;
      --muted: #475569;
      --border: 2px solid #cbd5e1;
      --accent: #2563eb;
      --radius: 10px;
    }
    *, *::before, *::after {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
      padding: 24px;
    }
    .container {
      max-width: 1140px;
      margin: 0 auto;
    }
    /* Dán CSS của Component vào dưới đây */
  </style>
</head>
<body>
  <main class="container">
    <!-- Dán HTML của Component vào dưới đây -->
    <h1>Xin chào! Khung HTML5 Chuẩn đã sẵn sàng.</h1>
  </main>

  <script>
    // Dán JavaScript của Component vào dưới đây
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

  function resetComponentDraft(comp) {
    if (!comp) return { html: "", css: "", js: "" };
    const fresh = {
      html: comp.html || "",
      css: comp.css || "",
      js: comp.js || ""
    };
    draftStore.set(comp.id, fresh);
    return fresh;
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
  // 2. TÌM KIẾM TIẾNG VIỆT KHÔNG DẤU & THỐNG KÊ DANH MỤC
  // ==========================================================================

  function getCategoryComponentCount(slug) {
    return components.filter((c) => c.category === slug).length;
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
      const hay = normalizeViText(
        [cat.slug, cat.nameEn, cat.nameVi, cat.description, ...(cat.keywords || [])].join(" ")
      );
      return hay.includes(norm);
    });
  }

  // ==========================================================================
  // 3. SAO CHÉP CLIPBOARD, TẢI FILE & THÔNG BÁO TOAST
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
    }, 2400);
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
      showToast(`✓ Đã sao chép ${label} vào bộ nhớ tạm!`);
    } catch (_err) {
      showToast(`⚠ Không thể tự động sao chép ${label}. Hãy chọn và Ctrl+C.`);
    }
  }

  function downloadHtmlFile(filename, content) {
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 500);
    showToast(`✓ Đã tải xuống ${filename}`);
  }

  // ==========================================================================
  // 4. RENDER SIDEBAR 25 DANH MỤC
  // ==========================================================================

  function renderSidebar() {
    const listEl = document.getElementById("sidebarCategoryList");
    const totalEl = document.getElementById("navTotalCount");
    if (totalEl) totalEl.textContent = String(components.length);
    if (!listEl) return;

    const filteredCats = filterSidebarCategories(state.sidebarFilter);

    if (filteredCats.length === 0) {
      listEl.innerHTML = `<div class="empty-state"><p>Không tìm thấy danh mục phù hợp.</p></div>`;
      return;
    }

    const allItemHtml = `
      <a href="#/all" class="sidebar-item ${state.activeCategorySlug === "__all__" ? "is-active" : ""}">
        <div class="sidebar-item-left">
          <span class="sidebar-item-icon" aria-hidden="true">📚</span>
          <div class="sidebar-item-names">
            <span class="sidebar-item-en">All Components</span>
            <span class="sidebar-item-vi">Tất cả mẫu trong kho</span>
          </div>
        </div>
        <span class="sidebar-item-count">${components.length}</span>
      </a>
    `;

    const catsHtml = filteredCats
      .map((cat) => {
        const count = getCategoryComponentCount(cat.slug);
        const isActive = state.activeCategorySlug === cat.slug;
        return `
          <a href="#/category/${encodeURIComponent(cat.slug)}" class="sidebar-item ${isActive ? "is-active" : ""}">
            <div class="sidebar-item-left">
              <span class="sidebar-item-icon" aria-hidden="true">${escapeHtml(cat.icon)}</span>
              <div class="sidebar-item-names">
                <span class="sidebar-item-en">${escapeHtml(cat.order)}. ${escapeHtml(cat.nameEn)}</span>
                <span class="sidebar-item-vi">${escapeHtml(cat.nameVi)}</span>
              </div>
            </div>
            <span class="sidebar-item-count">${count}</span>
          </a>
        `;
      })
      .join("");

    listEl.innerHTML = (state.sidebarFilter ? "" : allItemHtml) + catsHtml;
  }

  // ==========================================================================
  // 5. RENDER CÁC MÀN HÌNH CHÍNH (HOME, CATEGORY/SEARCH, DETAIL, BOILERPLATE)
  // ==========================================================================

  function renderComponentCard(comp) {
    const cat = categoryMap.get(comp.category);
    const catLabel = cat ? `${cat.nameEn} • ${cat.nameVi}` : comp.category;
    const tagsHtml = (comp.tags || [])
      .slice(0, 4)
      .map((t) => `<span class="tag-chip">#${escapeHtml(t)}</span>`)
      .join("");

    return `
      <article class="component-card" data-comp-id="${escapeHtml(comp.id)}">
        <div class="component-card-header">
          <div>
            <h3 class="component-card-title">
              <a href="#/component/${encodeURIComponent(comp.id)}">${escapeHtml(comp.titleVi)}</a>
            </h3>
            <span class="component-card-sub">${escapeHtml(comp.title)} — ${escapeHtml(catLabel)}</span>
          </div>
          <span class="category-count-pill">${escapeHtml(cat ? cat.icon : "🧩")}</span>
        </div>

        <div class="component-preview-window">
          <iframe
            class="mini-preview-iframe"
            sandbox="allow-scripts allow-forms"
            loading="lazy"
            data-preview-id="${escapeHtml(comp.id)}"
            title="Xem trước ${escapeHtml(comp.titleVi)}"
          ></iframe>
        </div>

        <div class="component-card-body">
          <p class="component-card-summary">${escapeHtml(comp.summary)}</p>
          <div class="tag-list">${tagsHtml}</div>
          <div class="component-card-actions">
            <a href="#/component/${encodeURIComponent(comp.id)}" class="btn btn-primary">
              ⚡ Mở Live Editor &amp; 4 Tab Code
            </a>
            <button type="button" class="btn" data-copy-full="${escapeHtml(comp.id)}">
              📋 Copy 1-File HTML
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function hydrateMiniPreviews(container) {
    const iframes = container.querySelectorAll("iframe[data-preview-id]");
    iframes.forEach((iframe) => {
      const compId = iframe.getAttribute("data-preview-id");
      const comp = componentMap.get(compId);
      if (comp) {
        iframe.srcdoc = buildPreviewDoc(getComponentDraft(comp));
      }
    });

    const copyBtns = container.querySelectorAll("button[data-copy-full]");
    copyBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const compId = btn.getAttribute("data-copy-full");
        const comp = componentMap.get(compId);
        if (comp) {
          const fullHtml = buildStandaloneHtml(comp.titleVi, getComponentDraft(comp));
          copyTextToClipboard(fullHtml, `Full HTML (${comp.titleVi})`);
        }
      });
    });
  }

  function renderHomeView(container) {
    const featuredList = components.filter((c) => c.featured);

    const categoryCardsHtml = categories
      .map((cat) => {
        const count = getCategoryComponentCount(cat.slug);
        return `
          <a href="#/category/${encodeURIComponent(cat.slug)}" class="category-card">
            <div>
              <div class="category-card-top">
                <span class="category-icon-box" aria-hidden="true">${escapeHtml(cat.icon)}</span>
                <span class="category-count-pill">${count} mẫu</span>
              </div>
              <h3>${escapeHtml(cat.order)}. ${escapeHtml(cat.nameEn)}</h3>
              <span class="category-card-vi">${escapeHtml(cat.nameVi)}</span>
              <p>${escapeHtml(cat.description)}</p>
            </div>
          </a>
        `;
      })
      .join("");

    container.innerHTML = `
      <!-- HERO SECTION -->
      <section class="home-hero">
        <div class="hero-badge-row">
          <span class="pill-badge">✨ 100% Thuần HTML5 • CSS3 • Vanilla JS</span>
          <span class="pill-badge">🚫 Không phụ thuộc Bootstrap</span>
          <span class="pill-badge">🔲 Đường viền phân vùng rõ nét</span>
        </div>
        <h1>Kho Tra Cứu Component &amp; Template Chuẩn Web</h1>
        <p>
          Toàn bộ 25 danh mục giao diện được xây dựng bằng HTML5 ngữ nghĩa, biến CSS gốc và JavaScript thuần.
          Xem trước trực tiếp trên Desktop/Tablet/Mobile, chỉnh sửa thử ngay trên trình duyệt và sao chép từng phần hoặc gộp 1 file HTML chạy ngay.
        </p>
        <div class="hero-actions">
          <a href="#/all" class="btn btn-primary">📚 Khám phá toàn bộ ${components.length} mẫu →</a>
          <a href="#/boilerplate" class="btn">📄 Lấy khung HTML5 Chuẩn (Boilerplate)</a>
          <button type="button" class="btn" id="heroFocusSearchBtn">🔍 Tìm nhanh (Phím /)</button>
        </div>

        <div class="hero-stats-grid">
          <div class="stat-card">
            <strong>${categories.length} Danh mục</strong>
            <span>Đầy đủ từ Navbar, Hero đến Full Page</span>
          </div>
          <div class="stat-card">
            <strong>${components.length} Mẫu Khởi Đầu</strong>
            <span>Có sẵn tương tác JS thực tế</span>
          </div>
          <div class="stat-card">
            <strong>4 Tab Code</strong>
            <span>HTML • CSS • JS • Gộp 1 File HTML</span>
          </div>
          <div class="stat-card">
            <strong>0 KB Thư viện ngoài</strong>
            <span>Copy vào bất kỳ dự án nào cũng chạy</span>
          </div>
        </div>
      </section>

      <!-- BROWSE BY 25 CATEGORIES -->
      <section class="section-block">
        <div class="section-header">
          <div>
            <h2>Duyệt theo 25 Danh mục (Browse by Section)</h2>
            <p>Bấm vào bất kỳ danh mục nào để xem các mẫu thiết kế, Live Preview và lấy code tương ứng.</p>
          </div>
          <a href="#/all" class="btn">Xem tất cả ${components.length} mẫu →</a>
        </div>
        <div class="category-grid">
          ${categoryCardsHtml}
        </div>
      </section>

      <!-- FEATURED COMPONENTS (EDITOR'S PICKS) -->
      <section class="section-block">
        <div class="section-header">
          <div>
            <h2>Mẫu Giao diện Nổi bật (Editor's Picks)</h2>
            <p>Các mẫu tiêu biểu có đầy đủ tương tác JavaScript và bố cục đa thiết bị.</p>
          </div>
        </div>
        <div class="component-grid" id="homeFeaturedGrid">
          ${featuredList.map(renderComponentCard).join("")}
        </div>
      </section>
    `;

    hydrateMiniPreviews(container);

    document.getElementById("heroFocusSearchBtn")?.addEventListener("click", () => {
      const input = document.getElementById("globalSearchInput");
      if (input) {
        input.focus();
        input.select();
      }
    });
  }

  function renderBoilerplateView(container) {
    container.innerHTML = `
      <div class="breadcrumb-bar">
        <div class="breadcrumb-links">
          <a href="#/">← Trang chủ</a>
          <span>/</span>
          <span>Khung HTML5 Chuẩn (Starter Boilerplate)</span>
        </div>
        <button type="button" class="btn btn-primary" id="copyBoilerplateBtn">📋 Sao chép Khung HTML5</button>
      </div>

      <section class="section-block">
        <div class="section-header">
          <div>
            <h2>Khung Khởi Đầu HTML5 &amp; Biến CSS Chuẩn (Thay thế Bootstrap Starter)</h2>
            <p>Sao chép khung trang chuẩn dưới đây vào file <code>index.html</code> của bạn, sau đó dán mã HTML, CSS và JS của bất kỳ Component nào vào vị trí tương ứng.</p>
          </div>
        </div>
        <pre class="boilerplate-pre">${escapeHtml(HTML5_BOILERPLATE)}</pre>
      </section>
    `;

    document.getElementById("copyBoilerplateBtn")?.addEventListener("click", () => {
      copyTextToClipboard(HTML5_BOILERPLATE, "Khung HTML5 Boilerplate");
    });
  }

  function renderListView(container, options) {
    const { title, subtitle, list, badgeText } = options;

    const cardsHtml =
      list.length > 0
        ? `<div class="component-grid">${list.map(renderComponentCard).join("")}</div>`
        : `
          <div class="empty-state">
            <h3>Không tìm thấy mẫu nào khớp với yêu cầu</h3>
            <p>Hãy thử tìm với từ khóa khác (ví dụ: <code>navbar</code>, <code>bang gia</code>, <code>form</code>, <code>lich</code>) hoặc quay lại danh sách tất cả danh mục.</p>
            <a href="#/all" class="btn btn-primary">Xem toàn bộ ${components.length} mẫu</a>
          </div>
        `;

    container.innerHTML = `
      <div class="breadcrumb-bar">
        <div class="breadcrumb-links">
          <a href="#/">← Trang chủ</a>
          <span>/</span>
          <span>${escapeHtml(title)}</span>
        </div>
        <span class="pill-badge">${escapeHtml(badgeText)}</span>
      </div>

      <section class="section-block">
        <div class="section-header">
          <div>
            <h2>${escapeHtml(title)}</h2>
            <p>${escapeHtml(subtitle)}</p>
          </div>
        </div>
        ${cardsHtml}
      </section>
    `;

    hydrateMiniPreviews(container);
  }

  function renderComponentDetailView(container, comp) {
    const cat = categoryMap.get(comp.category);
    const draft = getComponentDraft(comp);

    // Tìm mẫu trước / tiếp theo để điều hướng nhanh
    const idx = components.findIndex((c) => c.id === comp.id);
    const prevComp = idx > 0 ? components[idx - 1] : null;
    const nextComp = idx >= 0 && idx < components.length - 1 ? components[idx + 1] : null;

    const tagsHtml = (comp.tags || [])
      .map((t) => `<span class="tag-chip">#${escapeHtml(t)}</span>`)
      .join("");

    container.innerHTML = `
      <!-- BREADCRUMB & QUICK NAVIGATION -->
      <div class="breadcrumb-bar">
        <div class="breadcrumb-links">
          <a href="#/">Trang chủ</a>
          <span>/</span>
          ${
            cat
              ? `<a href="#/category/${encodeURIComponent(cat.slug)}">${escapeHtml(cat.icon)} ${escapeHtml(cat.nameEn)} (${escapeHtml(cat.nameVi)})</a>`
              : `<span>Danh mục</span>`
          }
          <span>/</span>
          <span>${escapeHtml(comp.titleVi)}</span>
        </div>
        <div class="component-card-actions" style="border:none;padding:0;">
          ${
            prevComp
              ? `<a href="#/component/${encodeURIComponent(prevComp.id)}" class="btn" title="${escapeHtml(prevComp.titleVi)}">← Mẫu trước</a>`
              : ""
          }
          ${
            nextComp
              ? `<a href="#/component/${encodeURIComponent(nextComp.id)}" class="btn" title="${escapeHtml(nextComp.titleVi)}">Mẫu tiếp →</a>`
              : ""
          }
        </div>
      </div>

      <!-- HEADER INFO -->
      <section class="section-block">
        <div class="section-header">
          <div>
            <h2>${escapeHtml(comp.titleVi)}</h2>
            <p>${escapeHtml(comp.title)} — ${escapeHtml(comp.summary)}</p>
          </div>
          <div class="tag-list">${tagsHtml}</div>
        </div>

        <!-- LIVE PLAYGROUND BOX -->
        <div class="playground-box">
          <div class="playground-toolbar">
            <div class="viewport-group" role="group" aria-label="Chọn kích thước khung nhìn">
              <button type="button" class="vp-btn ${state.activeViewport === "100%" ? "is-active" : ""}" data-vp="100%">
                🖥️ Desktop (100%)
              </button>
              <button type="button" class="vp-btn ${state.activeViewport === "768px" ? "is-active" : ""}" data-vp="768px">
                📱 Tablet (768px)
              </button>
              <button type="button" class="vp-btn ${state.activeViewport === "375px" ? "is-active" : ""}" data-vp="375px">
                📲 Mobile (375px)
              </button>
            </div>

            <div class="component-card-actions" style="border:none;padding:0;">
              <button type="button" class="btn" id="runPreviewBtn" title="Phím tắt: Ctrl + Enter">
                ▶ Chạy lại (Ctrl+Enter)
              </button>
              <button type="button" class="btn" id="resetCodeBtn">
                ↺ Khôi phục gốc
              </button>
              <button type="button" class="btn btn-primary" id="openFullscreenBtn">
                ⛶ Toàn màn hình
              </button>
            </div>
          </div>

          <div class="playground-canvas">
            <div class="preview-viewport-frame" id="previewViewportFrame" style="width: ${escapeHtml(state.activeViewport)};">
              <iframe
                id="detailPreviewIframe"
                class="preview-iframe"
                sandbox="allow-scripts allow-forms"
                title="Live Preview cho ${escapeHtml(comp.titleVi)}"
              ></iframe>
            </div>
          </div>

          <!-- 4-TAB CODE INSPECTOR & LIVE EDITOR -->
          <div class="code-inspector">
            <div class="code-tabs-bar">
              <div class="code-tabs-list" role="tablist" aria-label="Các tab mã nguồn">
                <button type="button" role="tab" class="code-tab-btn ${state.activeCodeTab === "html" ? "is-active" : ""}" data-tab="html">
                  HTML
                </button>
                <button type="button" role="tab" class="code-tab-btn ${state.activeCodeTab === "css" ? "is-active" : ""}" data-tab="css">
                  CSS
                </button>
                <button type="button" role="tab" class="code-tab-btn ${state.activeCodeTab === "js" ? "is-active" : ""}" data-tab="js">
                  JavaScript
                </button>
                <button type="button" role="tab" class="code-tab-btn ${state.activeCodeTab === "full" ? "is-active" : ""}" data-tab="full">
                  ✨ Full HTML (Gộp 1 file chạy ngay)
                </button>
              </div>

              <div class="component-card-actions" style="border:none;padding:0;">
                <button type="button" class="btn" id="copyCurrentTabBtn">
                  📋 Copy Tab Hiện Tại
                </button>
                <button type="button" class="btn btn-primary" id="copyFullFileBtn">
                  ⚡ Copy Full HTML (1-File)
                </button>
                <button type="button" class="btn" id="downloadFileBtn">
                  ⬇ Tải file .html
                </button>
              </div>
            </div>

            <div class="code-editor-wrap">
              <label for="liveCodeTextarea" class="sr-only">Trình chỉnh sửa mã nguồn trực tiếp</label>
              <textarea
                id="liveCodeTextarea"
                class="code-editor-textarea"
                spellcheck="false"
              ></textarea>
            </div>

            <div class="code-status-bar">
              <span id="editorModeHint">
                💡 Bạn có thể sửa trực tiếp mã HTML, CSS hoặc JS ở trên — khung Live Preview sẽ tự động cập nhật!
              </span>
              <span id="editorSyncStatus">Trạng thái: Đã đồng bộ Live Preview ✓</span>
            </div>
          </div>
        </div>
      </section>
    `;

    const iframe = document.getElementById("detailPreviewIframe");
    const viewportFrame = document.getElementById("previewViewportFrame");
    const textarea = document.getElementById("liveCodeTextarea");
    const modeHint = document.getElementById("editorModeHint");
    const syncStatus = document.getElementById("editorSyncStatus");

    function updatePreviewIframe() {
      const currentDraft = getComponentDraft(comp);
      if (iframe) {
        iframe.srcdoc = buildPreviewDoc(currentDraft);
      }
      if (syncStatus) {
        syncStatus.textContent = "Trạng thái: Đã cập nhật Live Preview lúc " + new Date().toLocaleTimeString("vi-VN");
      }
    }

    function syncTextareaFromTab() {
      const currentDraft = getComponentDraft(comp);
      if (!textarea) return;
      if (state.activeCodeTab === "full") {
        textarea.value = buildStandaloneHtml(comp.titleVi, currentDraft);
        textarea.readOnly = true;
        if (modeHint) {
          modeHint.textContent =
            "📦 Tab Full HTML tự động gộp từ 3 tab HTML + CSS + JS để bạn copy 1 lần dán vào file .html là chạy ngay.";
        }
      } else {
        textarea.value = currentDraft[state.activeCodeTab] || "";
        textarea.readOnly = false;
        if (modeHint) {
          modeHint.textContent = `✏️ Đang sửa tab ${state.activeCodeTab.toUpperCase()} — gõ trực tiếp hoặc nhấn Ctrl + Enter để làm mới Preview.`;
        }
      }
    }

    // Khởi tạo lần đầu
    updatePreviewIframe();
    syncTextareaFromTab();

    // Lắng nghe gõ phím trong Live Editor (debounce 250ms)
    let debounceTimer = null;
    textarea?.addEventListener("input", () => {
      if (state.activeCodeTab === "full") return;
      const currentDraft = getComponentDraft(comp);
      currentDraft[state.activeCodeTab] = textarea.value;
      if (syncStatus) syncStatus.textContent = "Trạng thái: Đang đồng bộ...";
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updatePreviewIframe, 250);
    });

    // Chuyển đổi 4 tab code
    container.querySelectorAll(".code-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeCodeTab = btn.getAttribute("data-tab") || "html";
        container.querySelectorAll(".code-tab-btn").forEach((b) => {
          b.classList.toggle("is-active", b.getAttribute("data-tab") === state.activeCodeTab);
        });
        syncTextareaFromTab();
      });
    });

    // Chuyển đổi kích thước Viewport (Desktop / Tablet / Mobile)
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

    // Nút Chạy lại, Khôi phục gốc, Toàn màn hình, Copy, Download
    document.getElementById("runPreviewBtn")?.addEventListener("click", updatePreviewIframe);

    document.getElementById("resetCodeBtn")?.addEventListener("click", () => {
      resetComponentDraft(comp);
      syncTextareaFromTab();
      updatePreviewIframe();
      showToast("↺ Đã khôi phục mã nguồn về trạng thái gốc!");
    });

    document.getElementById("openFullscreenBtn")?.addEventListener("click", () => {
      openFullscreenModal(comp);
    });

    document.getElementById("copyCurrentTabBtn")?.addEventListener("click", () => {
      const labelMap = {
        html: "mã HTML",
        css: "mã CSS",
        js: "mã JavaScript",
        full: "Full HTML (1-File)"
      };
      copyTextToClipboard(textarea ? textarea.value : "", labelMap[state.activeCodeTab] || "mã nguồn");
    });

    document.getElementById("copyFullFileBtn")?.addEventListener("click", () => {
      const fullCode = buildStandaloneHtml(comp.titleVi, getComponentDraft(comp));
      copyTextToClipboard(fullCode, `Full HTML (${comp.titleVi})`);
    });

    document.getElementById("downloadFileBtn")?.addEventListener("click", () => {
      const fullCode = buildStandaloneHtml(comp.titleVi, getComponentDraft(comp));
      downloadHtmlFile(`${comp.id}.html`, fullCode);
    });
  }

  // ==========================================================================
  // 6. CHẾ ĐỘ XEM TOÀN MÀN HÌNH (FULLSCREEN MODAL)
  // ==========================================================================

  function openFullscreenModal(comp) {
    const modal = document.getElementById("fullscreenModal");
    const titleEl = document.getElementById("fsModalTitle");
    const catEl = document.getElementById("fsModalCategory");
    const fsIframe = document.getElementById("fullscreenIframe");
    if (!modal || !fsIframe || !comp) return;

    const cat = categoryMap.get(comp.category);
    if (titleEl) titleEl.textContent = comp.titleVi;
    if (catEl) catEl.textContent = cat ? ` — ${cat.nameEn} (${cat.nameVi})` : "";

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
  // 7. ĐIỀU HƯỚNG HASH ROUTER & ĐỒNG BỘ GIAO DIỆN
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
      state.activeCategorySlug = null;
      state.activeComponentId = null;

      const searchInput = document.getElementById("globalSearchInput");
      if (searchInput && searchInput.value !== q) {
        searchInput.value = q;
      }

      const results = searchComponents(q);
      updateTopNavHighlight("");
      renderSidebar();
      renderListView(viewContainer, {
        title: q ? `Kết quả tìm kiếm cho: "${q}"` : "Tất cả mẫu trong kho",
        subtitle: `Tìm thấy ${results.length} mẫu khớp với từ khóa (hỗ trợ tiếng Việt có dấu, không dấu và tiếng Anh).`,
        list: results,
        badgeText: `${results.length} kết quả`
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
        updateTopNavHighlight("");
        renderSidebar();
        renderComponentDetailView(viewContainer, comp);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    // 3. Xem theo Danh mục (#/category/:slug)
    if (rawHash.startsWith("#/category/")) {
      const slug = decodeURIComponent(rawHash.slice("#/category/".length).trim());
      const cat = categoryMap.get(slug);
      if (cat) {
        state.activeCategorySlug = cat.slug;
        state.activeComponentId = null;
        const list = components.filter((c) => c.category === cat.slug);
        updateTopNavHighlight("");
        renderSidebar();
        renderListView(viewContainer, {
          title: `${cat.icon} ${cat.order}. ${cat.nameEn} — ${cat.nameVi}`,
          subtitle: cat.description,
          list,
          badgeText: `${list.length} mẫu thiết kế`
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }

    // 4. Xem tất cả mẫu (#/all)
    if (rawHash === "#/all") {
      state.activeCategorySlug = "__all__";
      state.activeComponentId = null;
      updateTopNavHighlight("all");
      renderSidebar();
      renderListView(viewContainer, {
        title: "Tất cả Component & Template trong kho",
        subtitle: `Danh sách đầy đủ ${components.length} mẫu thuộc ${categories.length} danh mục chuẩn HTML/CSS/JS thuần.`,
        list: components,
        badgeText: `${components.length} mẫu`
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // 5. Khung HTML5 Boilerplate (#/boilerplate)
    if (rawHash === "#/boilerplate") {
      state.activeCategorySlug = null;
      state.activeComponentId = null;
      updateTopNavHighlight("boilerplate");
      renderSidebar();
      renderBoilerplateView(viewContainer);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // 6. Mặc định: Trang chủ (#/)
    state.activeCategorySlug = null;
    state.activeComponentId = null;
    updateTopNavHighlight("home");
    renderSidebar();
    renderHomeView(viewContainer);
  }

  // ==========================================================================
  // 8. KHỞI TẠO SỰ KIỆN TOÀN CỤC (THEME, SEARCH, PHÍM TẮT, DRAWER)
  // ==========================================================================

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
    if (labelEl) labelEl.textContent = theme === "dark" ? "Sáng" : "Tối";
  }

  function initGlobalEvents() {
    // Liên kết bỏ qua điều hướng tới nội dung chính (không làm mất route hiện tại)
    const skipLink = document.getElementById("skipToMainLink");
    skipLink?.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("mainContent")?.focus();
    });

    // Nhận sự kiện Escape từ bên trong iframe toàn màn hình
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

    // Ô tìm kiếm toàn cục
    const searchInput = document.getElementById("globalSearchInput");
    searchInput?.addEventListener("input", () => {
      const q = searchInput.value.trim();
      if (q) {
        window.location.hash = `#/search?q=${encodeURIComponent(q)}`;
      } else if (window.location.hash.startsWith("#/search")) {
        window.location.hash = "#/";
      }
    });

    // Ô lọc nhanh 25 danh mục ở Sidebar
    const sidebarFilterInput = document.getElementById("sidebarFilterInput");
    sidebarFilterInput?.addEventListener("input", () => {
      state.sidebarFilter = sidebarFilterInput.value;
      renderSidebar();
    });

    // Đóng/mở Sidebar trên màn hình nhỏ
    const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
    const sidebar = document.getElementById("categorySidebar");
    const backdrop = document.getElementById("sidebarBackdrop");

    sidebarToggleBtn?.addEventListener("click", () => {
      const isOpen = sidebar?.classList.toggle("is-open");
      if (backdrop) backdrop.hidden = !isOpen;
      sidebarToggleBtn.setAttribute("aria-expanded", String(Boolean(isOpen)));
    });
    backdrop?.addEventListener("click", closeMobileSidebar);

    // Sự kiện trong Fullscreen Modal
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

    // Phím tắt toàn cục: `/` tìm kiếm, `Ctrl+Enter` chạy lại preview, `Esc` đóng modal / xóa tìm kiếm
    window.addEventListener("keydown", (e) => {
      const tag = (e.target && e.target.tagName) || "";
      const isTyping = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";

      if (e.key === "/" && !isTyping && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        searchInput?.focus();
        searchInput?.select();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        const runBtn = document.getElementById("runPreviewBtn");
        if (runBtn) {
          e.preventDefault();
          runBtn.click();
          showToast("▶ Đã chạy lại Live Preview!");
        }
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

  // Khởi chạy ứng dụng
  initTheme();
  initGlobalEvents();
  handleRoute();
})();
