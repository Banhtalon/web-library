/**
 * Kho 25 Component & Template chuẩn HTML5 / CSS3 / Vanilla JS
 * Không phụ thuộc Bootstrap hay thư viện ngoài.
 * Đồng bộ 100% với data/components/index.json
 */
(function (root) {
  const components = [
    // 1. HEADER & NAVBAR
    {
      id: "header-responsive-command",
      title: "Responsive Navbar with Mobile Drawer & Submenu",
      titleVi: "Thanh điều hướng đa thiết bị kèm Menu con",
      category: "header",
      featured: true,
      tags: ["navbar", "header", "responsive", "dropdown", "mobile menu", "thanh dieu huong", "menu ngang"],
      summary: "Thanh điều hướng cố định đầu trang có menu thả xuống (Dropdown), nút chuyển trạng thái và menu thu gọn cho màn hình di động bằng JS thuần.",
      html: `<header class="cl-nav-wrap">
  <div class="cl-nav-container">
    <a href="#brand" class="cl-nav-brand" onclick="return false;">
      <span class="cl-nav-logo">CL</span>
      <span>CodeUI</span>
    </a>

    <button type="button" class="cl-nav-toggle" id="clNavToggle" aria-expanded="false" aria-label="Mở menu">
      <span></span><span></span><span></span>
    </button>

    <nav class="cl-nav-menu" id="clNavMenu">
      <a href="#home" class="cl-nav-link is-active" onclick="return false;">Trang chủ</a>
      <div class="cl-nav-dropdown" id="clNavDropdown">
        <button type="button" class="cl-nav-dropbtn" id="clNavDropBtn">
          Sản phẩm <span class="cl-nav-caret">▾</span>
        </button>
        <div class="cl-nav-dropmenu">
          <a href="#ui" onclick="return false;">Bộ UI Thuần CSS</a>
          <a href="#templates" onclick="return false;">Mẫu Landing Page</a>
          <a href="#icons" onclick="return false;">Hệ thống Biểu tượng</a>
        </div>
      </div>
      <a href="#docs" class="cl-nav-link" onclick="return false;">Tài liệu</a>
      <a href="#pricing" class="cl-nav-link" onclick="return false;">Bảng giá</a>
      <div class="cl-nav-actions">
        <button type="button" class="cl-nav-btn-ghost" id="clNavSign">Đăng nhập</button>
        <button type="button" class="cl-nav-btn-primary" id="clNavTrial">Dùng thử miễn phí</button>
      </div>
    </nav>
  </div>
  <div class="cl-nav-status" id="clNavStatus">Trạng thái: Sẵn sàng điều hướng (Hãy thử bấm vào mục "Sản phẩm" hoặc thu nhỏ màn hình).</div>
</header>`,
      css: `.cl-nav-wrap {
  font-family: system-ui, -apple-system, sans-serif;
  background: #ffffff;
  border: 2px solid #cbd5e1;
  border-radius: 10px;
  overflow: visible;
}
.cl-nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  gap: 16px;
  position: relative;
}
.cl-nav-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #0f172a;
  font-weight: 700;
  font-size: 1.05rem;
}
.cl-nav-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #2563eb;
  color: #ffffff;
  border-radius: 7px;
  font-size: 0.85rem;
}
.cl-nav-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.cl-nav-link,
.cl-nav-dropbtn {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1.5px solid transparent;
  background: transparent;
  color: #334155;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
}
.cl-nav-link:hover,
.cl-nav-dropbtn:hover,
.cl-nav-link.is-active {
  background: #f1f5f9;
  border-color: #cbd5e1;
  color: #0f172a;
}
.cl-nav-dropdown {
  position: relative;
}
.cl-nav-dropmenu {
   display: none;
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 190px;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 8px;
  padding: 6px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
  z-index: 20;
}
.cl-nav-dropdown.is-open .cl-nav-dropmenu {
  display: grid;
  gap: 4px;
}
.cl-nav-dropmenu a {
  padding: 8px 10px;
  border-radius: 5px;
  text-decoration: none;
  color: #1e293b;
  font-size: 0.88rem;
}
.cl-nav-dropmenu a:hover {
  background: #eff6ff;
  color: #2563eb;
}
.cl-nav-actions {
  display: flex;
  gap: 8px;
  margin-left: 8px;
}
.cl-nav-btn-ghost {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1.5px solid #94a3b8;
  background: #ffffff;
  color: #0f172a;
  font-weight: 600;
  cursor: pointer;
}
.cl-nav-btn-primary {
  padding: 8px 14px;
  border-radius: 6px;
  border: 1.5px solid #1d4ed8;
  background: #2563eb;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
}
.cl-nav-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  padding: 8px;
  background: #f8fafc;
  border: 1.5px solid #94a3b8;
  border-radius: 6px;
  cursor: pointer;
}
.cl-nav-toggle span {
  width: 18px;
  height: 2px;
  background: #0f172a;
}
.cl-nav-status {
  padding: 8px 18px;
  background: #f8fafc;
  border-top: 1.5px solid #e2e8f0;
  font-size: 0.82rem;
  color: #475569;
}
@media (max-width: 680px) {
  .cl-nav-toggle {
    display: inline-flex;
  }
  .cl-nav-menu {
    display: none;
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    padding-top: 10px;
    border-top: 1.5px solid #e2e8f0;
  }
  .cl-nav-menu.is-open {
    display: flex;
  }
  .cl-nav-Container {
    flex-wrap: wrap;
  }
  .cl-nav-actions {
    margin-left: 0;
    padding-top: 6px;
  }
}`,
      js: `const navToggle = document.getElementById("clNavToggle");
const navMenu = document.getElementById("clNavMenu");
const navDropdown = document.getElementById("clNavDropdown");
const navDropBtn = document.getElementById("clNavDropBtn");
const navStatus = document.getElementById("clNavStatus");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navStatus.textContent = open ? "Đã mở menu di động." : "Đã đóng menu di động.";
  });
}

if (navDropBtn && navDropdown) {
  navDropBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = navDropdown.classList.toggle("is-open");
    navStatus.textContent = open ? "Đang mở danh sách Sản phẩm." : "Đã đóng danh sách Sản phẩm.";
  });
  document.addEventListener("click", () => navDropdown.classList.remove("is-open"));
}

document.querySelectorAll(".cl-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".cl-nav-link").forEach((l) => l.classList.remove("is-active"));
    link.classList.add("is-active");
    navStatus.textContent = "Đang chọn mục: " + link.textContent.trim();
  });
});`
    },

    // 2. BUTTON
    {
      id: "button-interactive-suite",
      title: "Interactive Button Suite with Loading & Counter",
      titleVi: "Bộ nút bấm tương tác kèm trạng thái tải & đếm lượt",
      category: "button",
      featured: false,
      tags: ["button", "loading", "group", "toggle", "nut bam", "trang thai tai", "bo nut"],
      summary: "Tập hợp các mẫu nút bấm thực tế: Nút chính, nút viền rõ nét, nút giả lập tải dữ liệu (Async Loading), nút bật/tắt Bookmark và nhóm nút chọn chế độ.",
      html: `<section class="cl-btn-showcase">
  <div class="cl-btn-group-card">
    <h4 class="cl-btn-heading">1. Các biến thể nút cơ bản (Viền sắc nét)</h4>
    <div class="cl-btn-row">
      <button type="button" class="cl-btn cl-btn-primary">Nút Chính (Primary)</button>
      <button type="button" class="cl-btn cl-btn-outline">Nút Viền (Outline)</button>
      <button type="button" class="cl-btn cl-btn-success">Hoàn tất</button>
      <button type="button" class="cl-btn cl-btn-danger">Xóa mục</button>
    </div>
  </div>

  <div class="cl-btn-group-card">
    <h4 class="cl-btn-heading">2. Nút tương tác JavaScript (Bấm thử trực tiếp)</h4>
    <div class="cl-btn-row">
      <button type="button" class="cl-btn cl-btn-primary" id="clAsyncBtn">
        <span class="cl-btn-spinner" id="clSpinner" hidden></span>
        <span id="clAsyncText">Gửi dữ liệu (Giả lập 1.2s)</span>
      </button>

      <button type="button" class="cl-btn cl-btn-outline" id="clBookmarkBtn" aria-pressed="false">
        <span id="clBookmarkIcon">☆</span> <span id="clBookmarkLabel">Lưu mẫu</span> (<strong id="clBookmarkCount">42</strong>)
      </button>

      <div class="cl-segmented" role="group" aria-label="Chọn khung giờ">
        <button type="button" class="cl-seg-btn is-active" data-plan="Ngày">Theo Ngày</button>
        <button type="button" class="cl-seg-btn" data-plan="Tuần">Theo Tuần</button>
        <button type="button" class="cl-seg-btn" data-plan="Tháng">Theo Tháng</button>
      </div>
    </div>
    <p class="cl-btn-log" id="clBtnLog">Nhật ký: Hãy bấm thử vào các nút bên trên để kiểm tra hiệu ứng.</p>
  </div>
</section>`,
      css: `.cl-btn-showcase {
  font-family: system-ui, -apple-system, sans-serif;
  display: grid;
  gap: 14px;
}
.cl-btn-group-card {
  background: #ffffff;
  border: 2px solid #cbd5e1;
  border-radius: 10px;
  padding: 16px;
}
.cl-btn-heading {
  margin: 0 0 12px;
  font-size: 0.92rem;
  color: #0f172a;
}
.cl-btn-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.cl-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 15px;
  font-size: 0.88rem;
  font-weight: 600;
  border-radius: 7px;
  border: 1.5px solid transparent;
  cursor: pointer;
  transition: transform 0.1s ease, background 0.15s ease;
}
.cl-btn:active {
  transform: translateY(1px);
}
.cl-btn-primary {
  background: #2563eb;
  border-color: #1e40af;
  color: #ffffff;
}
.cl-btn-primary:hover {
  background: #1d4ed8;
}
.cl-btn-outline {
  background: #ffffff;
  border-color: #64748b;
  color: #0f172a;
}
.cl-btn-outline:hover,
.cl-btn-outline.is-saved {
  background: #eff6ff;
  border-color: #2563eb;
  color: #1d4ed8;
}
.cl-btn-success {
  background: #16a34a;
  border-color: #15803d;
  color: #ffffff;
}
.cl-btn-danger {
  background: #dc2626;
  border-color: #b91c1c;
  color: #ffffff;
}
.cl-btn-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: cl-spin 0.65s linear infinite;
}
.cl-btn-spinner[hidden] {
  display: none;
}
@keyframes cl-spin {
  to { transform: rotate(360deg); }
}
.cl-segmented {
  display: inline-flex;
  border: 1.5px solid #94a3b8;
  border-radius: 7px;
  overflow: hidden;
  background: #f8fafc;
}
.cl-seg-btn {
  padding: 8px 12px;
  border: none;
  border-right: 1px solid #cbd5e1;
  background: transparent;
  font-size: 0.84rem;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
}
.cl-seg-btn:last-child {
  border-right: none;
}
.cl-seg-btn.is-active {
  background: #0f172a;
  color: #ffffff;
}
.cl-btn-log {
  margin: 12px 0 0;
  padding: 8px 12px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.82rem;
  color: #334155;
}`,
      js: `const asyncBtn = document.getElementById("clAsyncBtn");
const spinner = document.getElementById("clSpinner");
const asyncText = document.getElementById("clAsyncText");
const bookmarkBtn = document.getElementById("clBookmarkBtn");
const bookmarkIcon = document.getElementById("clBookmarkIcon");
const bookmarkLabel = document.getElementById("clBookmarkLabel");
const bookmarkCount = document.getElementById("clBookmarkCount");
const logEl = document.getElementById("clBtnLog");

if (asyncBtn) {
  asyncBtn.addEventListener("click", () => {
    if (asyncBtn.disabled) return;
    asyncBtn.disabled = true;
    spinner.hidden = false;
    asyncText.textContent = "Đang xử lý...";
    logEl.textContent = "Nhật ký: Đang gửi yêu cầu lên máy chủ...";
    setTimeout(() => {
      asyncBtn.disabled = false;
      spinner.hidden = true;
      asyncText.textContent = "Đã gửi thành công ✓";
      logEl.textContent = "Nhật ký: Hoàn tất tác vụ bất đồng bộ sau 1.2 giây.";
    }, 1200);
  });
}

if (bookmarkBtn) {
  let saved = false;
  let count = 42;
  bookmarkBtn.addEventListener("click", () => {
    saved = !saved;
    count += saved ? 1 : -1;
    bookmarkBtn.classList.toggle("is-saved", saved);
    bookmarkBtn.setAttribute("aria-pressed", String(saved));
    bookmarkIcon.textContent = saved ? "★" : "☆";
    bookmarkLabel.textContent = saved ? "Đã lưu" : "Lưu mẫu";
    bookmarkCount.textContent = String(count);
    logEl.textContent = saved ? "Nhật ký: Đã thêm vào danh sách yêu thích." : "Nhật ký: Đã bỏ lưu mẫu.";
  });
}

document.querySelectorAll(".cl-seg-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cl-seg-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    logEl.textContent = "Nhật ký: Đã chuyển chế độ xem sang: Theo " + btn.dataset.plan;
  });
});`
    },

    // 3. HERO SECTIONS
    {
      id: "hero-developer-split",
      title: "Split Hero Section with Live Code Preview Card",
      titleVi: "Khối mở đầu chia 2 cột kèm khung xem mã trực quan",
      category: "hero",
      featured: true,
      tags: ["hero", "landing", "cta", "split layout", "khoi mo dau", "gioi thieu dau trang"],
      summary: "Khối Hero 2 cột hiện đại: cột trái chứa thông điệp chính, nút kêu gọi hành động và chỉ số uy tín; cột phải là khung cửa sổ mã nguồn có thể chuyển tab.",
      html: `<section class="cl-hero">
  <div class="cl-hero-left">
    <span class="cl-hero-badge">⚡ Phiên bản chuẩn Vanilla HTML/CSS/JS</span>
    <h1 class="cl-hero-title">Xây dựng giao diện nhanh gấp 5 lần mà không cần thư viện nặng</h1>
    <p class="cl-hero-desc">
      Sao chép các khối giao diện có đường viền sắc nét, dễ tùy biến bằng biến CSS gốc và hoạt động mượt mà trên mọi trình duyệt.
    </p>
    <div class="cl-hero-cta">
      <button type="button" class="cl-hero-btn-primary" id="clHeroStartBtn">Khám phá ngay →</button>
      <button type="button" class="cl-hero-btn-secondary" id="clHeroDemoBtn">Xem cấu trúc CSS</button>
    </div>
    <div class="cl-hero-metrics">
      <div class="cl-hero-metric">
        <strong>0 KB</strong>
        <span>Thư viện phụ thuộc</span>
      </div>
      <div class="cl-hero-metric">
        <strong>25+</strong>
        <span>Danh mục chuẩn</span>
      </div>
      <div class="cl-hero-metric">
        <strong>100%</strong>
        <span>Tương thích chuẩn Web</span>
      </div>
    </div>
  </div>

  <div class="cl-hero-right">
    <div class="cl-hero-window">
      <div class="cl-hero-winbar">
        <span class="cl-dot cl-dot-red"></span>
        <span class="cl-dot cl-dot-amber"></span>
        <span class="cl-dot cl-dot-green"></span>
        <div class="cl-hero-tabs">
          <button type="button" class="cl-hero-tab is-active" data-snippet="html">index.html</button>
          <button type="button" class="cl-hero-tab" data-snippet="css">theme.css</button>
        </div>
      </div>
      <pre class="cl-hero-code" id="clHeroSnippet">&lt;section class="card-grid"&gt;
  &lt;article class="feature-card"&gt;
    &lt;h3&gt;Chuẩn HTML5 Ngữ nghĩa&lt;/h3&gt;
    &lt;p&gt;Sạch sẽ, dễ bảo trì.&lt;/p&gt;
  &lt;/article&gt;
&lt;/section&gt;</pre>
    </div>
  </div>
</section>`,
      css: `.cl-hero {
  font-family: system-ui, -apple-system, sans-serif;
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 24px;
  align-items: center;
  padding: 24px;
  background: #ffffff;
  border: 2px solid #cbd5e1;
  border-radius: 12px;
}
.cl-hero-badge {
  display: inline-block;
  padding: 5px 12px;
  background: #eff6ff;
  border: 1.5px solid #93c5fd;
  color: #1d4ed8;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
}
.cl-hero-title {
  margin: 14px 0 10px;
  font-size: 1.65rem;
  line-height: 1.25;
  color: #0f172a;
}
.cl-hero-desc {
  margin: 0 0 18px;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
}
.cl-hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
.cl-hero-btn-primary {
  padding: 10px 18px;
  background: #2563eb;
  border: 1.5px solid #1e40af;
  color: #ffffff;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.cl-hero-btn-secondary {
  padding: 10px 18px;
  background: #f8fafc;
  border: 1.5px solid #94a3b8;
  color: #0f172a;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.cl-hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding-top: 14px;
  border-top: 1.5px solid #e2e8f0;
}
.cl-hero-metric {
  padding: 8px 10px;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
}
.cl-hero-metric strong {
  display: block;
  font-size: 1.05rem;
  color: #0f172a;
}
.cl-hero-metric span {
  font-size: 0.78rem;
  color: #64748b;
}
.cl-hero-window {
  background: #0f172a;
  border: 2px solid #475569;
  border-radius: 10px;
  overflow: hidden;
}
.cl-hero-winbar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  background: #1e293b;
  border-bottom: 1.5px solid #334155;
}
.cl-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.cl-dot-red { background: #ef4444; }
.cl-dot-amber { background: #f59e0b; }
.cl-dot-green { background: #22c55e; }
.cl-hero-tabs {
  margin-left: auto;
  display: flex;
  gap: 6px;
}
.cl-hero-tab {
  padding: 4px 10px;
  font-size: 0.78rem;
  border-radius: 5px;
  border: 1px solid #475569;
  background: transparent;
  color: #cbd5e1;
  cursor: pointer;
}
.cl-hero-tab.is-active {
  background: #2563eb;
  border-color: #60a5fa;
  color: #ffffff;
}
.cl-hero-code {
  margin: 0;
  padding: 16px;
  color: #e2e8f0;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 0.84rem;
  line-height: 1.55;
  overflow-x: auto;
}
@media (max-width: 760px) {
  .cl-hero {
    grid-template-columns: 1fr;
  }
}`,
      js: `const snippets = {
  html: '<section class="card-grid">\\n  <article class="feature-card">\\n    <h3>Chuẩn HTML5 Ngữ nghĩa</h3>\\n    <p>Sạch sẽ, dễ bảo trì.</p>\\n  </article>\\n</section>',
  css: ':root {\\n  --border-strong: 2px solid #94a3b8;\\n  --accent: #2563eb;\\n}\\n.feature-card {\\n  border: var(--border-strong);\\n  border-radius: 8px;\\n}'
};

const codeEl = document.getElementById("clHeroSnippet");
const tabs = document.querySelectorAll(".cl-hero-tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    codeEl.textContent = snippets[tab.dataset.snippet] || snippets.html;
  });
});

const demoBtn = document.getElementById("clHeroDemoBtn");
if (demoBtn) {
  demoBtn.addEventListener("click", () => {
    tabs[1]?.click();
  });
}`
    },

    // 4. CAROUSEL
    {
      id: "carousel-spotlight-slider",
      title: "Interactive Content & Image Carousel",
      titleVi: "Trình chiếu trượt đa năng kèm điều hướng & chỉ mục",
      category: "carousel",
      featured: true,
      tags: ["carousel", "slider", "gallery", "slideshow", "trinh chieu", "slide anh"],
      summary: "Trình chiếu slide bằng CSS/JS thuần hỗ trợ nút Tiến/Lùi, chấm chỉ mục (Indicators), phím mũi tên bàn phím và công tắc Bật/Tắt tự động chuyển.",
      html: `<div class="cl-carousel" id="clCarousel">
  <div class="cl-carousel-stage">
    <article class="cl-slide is-active" data-index="0">
      <span class="cl-slide-tag">Slide 01 / Kiến trúc CSS</span>
      <h3>Hệ thống Lưới & Đường viền Rõ nét</h3>
      <p>Sử dụng CSS Grid và Flexbox hiện đại giúp bố cục tự động thích ứng từ màn hình di động 375px đến màn hình rộng 4K.</p>
    </article>
    <article class="cl-slide" data-index="1">
      <span class="cl-slide-tag">Slide 02 / Tương tác Thuần JS</span>
      <h3>Không cần jQuery hay Thư viện ngoài</h3>
      <p>Mọi hiệu ứng chuyển cảnh, đếm số, lọc bảng và kiểm tra biểu mẫu đều viết bằng DOM API chuẩn, dễ hiểu và dễ sửa.</p>
    </article>
    <article class="cl-slide" data-index="2">
      <span class="cl-slide-tag">Slide 03 / Sao chép Tức thì</span>
      <h3>Chạy ngay trong một tập tin HTML duy nhất</h3>
      <p>Hỗ trợ cả chế độ tách riêng 3 file (HTML, CSS, JS) lẫn chế độ gộp chung 1 file để dán vào VS Code chạy ngay lập tức.</p>
    </article>
  </div>

  <div class="cl-carousel-controls">
    <button type="button" class="cl-car-btn" id="clPrevSlide">← Trước</button>
    <div class="cl-car-dots" id="clCarDots">
      <button type="button" class="cl-car-dot is-active" data-slide="0" aria-label="Slide 1"></button>
      <button type="button" class="cl-car-dot" data-slide="1" aria-label="Slide 2"></button>
      <button type="button" class="cl-car-dot" data-slide="2" aria-label="Slide 3"></button>
    </div>
    <button type="button" class="cl-car-btn" id="clNextSlide">Tiếp →</button>
  </div>
</div>`,
      css: `.cl-carousel {
  font-family: system-ui, -apple-system, sans-serif;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 12px;
  overflow: hidden;
}
.cl-carousel-stage {
  padding: 28px 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
  min-height: 160px;
  display: flex;
  align-items: center;
}
.cl-slide {
  display: none;
  width: 100%;
}
.cl-slide.is-active {
  display: block;
}
.cl-slide-tag {
  display: inline-block;
  padding: 4px 10px;
  background: #dbeafe;
  border: 1.5px solid #93c5fd;
  color: #1e40af;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
}
.cl-slide h3 {
  margin: 12px 0 8px;
  font-size: 1.35rem;
  color: #0f172a;
}
.cl-slide p {
  margin: 0;
  color: #334155;
  line-height: 1.6;
  font-size: 0.94rem;
}
.cl-carousel-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: #ffffff;
  border-top: 2px solid #cbd5e1;
}
.cl-car-btn {
  padding: 7px 14px;
  border: 1.5px solid #64748b;
  background: #f8fafc;
  color: #0f172a;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.cl-car-btn:hover {
  background: #e2e8f0;
}
.cl-car-dots {
  display: flex;
  gap: 8px;
}
.cl-car-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1.5px solid #475569;
  background: #e2e8f0;
  cursor: pointer;
  padding: 0;
}
.cl-car-dot.is-active {
  background: #2563eb;
  border-color: #1d4ed8;
  transform: scale(1.15);
}`,
      js: `const slides = Array.from(document.querySelectorAll(".cl-slide"));
const dots = Array.from(document.querySelectorAll(".cl-car-dot"));
const prevBtn = document.getElementById("clPrevSlide");
const nextBtn = document.getElementById("clNextSlide");
let current = 0;

function showSlide(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((s, idx) => s.classList.toggle("is-active", idx === current));
  dots.forEach((d, idx) => d.classList.toggle("is-active", idx === current));
}

prevBtn?.addEventListener("click", () => showSlide(current - 1));
nextBtn?.addEventListener("click", () => showSlide(current + 1));
dots.forEach((dot) => {
  dot.addEventListener("click", () => showSlide(Number(dot.dataset.slide)));
});`
    },

    // 5. CARDS
    {
      id: "cards-filterable-course-grid",
      title: "Filterable Course & Resource Cards",
      titleVi: "Lưới thẻ khóa học kèm bộ lọc chủ đề",
      category: "cards",
      featured: false,
      tags: ["cards", "grid", "filter", "course card", "the noi dung", "the khoa hoc"],
      summary: "Lưới thẻ nội dung có viền phân tách sắc nét, nhãn cấp độ, thanh tiến độ và nút lọc trực tiếp theo chủ đề.",
      html: `<section class="cl-cards-section">
  <div class="cl-cards-toolbar">
    <strong>Lọc theo chủ đề:</strong>
    <div class="cl-cards-filters">
      <button type="button" class="cl-filter-chip is-active" data-topic="all">Tất cả (3)</button>
      <button type="button" class="cl-filter-chip" data-topic="html-css">HTML &amp; CSS</button>
      <button type="button" class="cl-filter-chip" data-topic="javascript">JavaScript</button>
    </div>
  </div>

  <div class="cl-cards-grid">
    <article class="cl-card" data-topic="html-css">
      <div class="cl-card-head">
        <span class="cl-card-badge">HTML &amp; CSS</span>
        <span class="cl-card-level">Cơ bản</span>
      </div>
      <h3 class="cl-card-title">Bố cục Flexbox &amp; CSS Grid Thực chiến</h3>
      <p class="cl-card-body">Nắm vững cách chia cột, căn giữa và tạo giao diện đa thiết bị mà không cần dùng thư viện ngoài.</p>
      <div class="cl-card-foot">
        <span>12 bài học</span>
        <button type="button" class="cl-card-action">Xem chi tiết →</button>
      </div>
    </article>

    <article class="cl-card" data-topic="javascript">
      <div class="cl-card-head">
        <span class="cl-card-badge cl-badge-amber">JavaScript</span>
        <span class="cl-card-level">Trung cấp</span>
      </div>
      <h3 class="cl-card-title">Xử lý Sự kiện DOM &amp; Tối ưu Hiệu năng</h3>
      <p class="cl-card-body">Thực hành Event Delegation, tìm kiếm tức thời và quản lý trạng thái giao diện bằng JS thuần.</p>
      <div class="cl-card-foot">
        <span>16 bài học</span>
        <button type="button" class="cl-card-action">Xem chi tiết →</button>
      </div>
    </article>

    <article class="cl-card" data-topic="html-css">
      <div class="cl-card-head">
        <span class="cl-card-badge">HTML &amp; CSS</span>
        <span class="cl-card-level">Nâng cao</span>
      </div>
      <h3 class="cl-card-title">Thiết kế Hệ thống Biến CSS (Design Tokens)</h3>
      <p class="cl-card-body">Tổ chức màu sắc, đường viền và chế độ Sáng/Tối đồng nhất cho toàn bộ ứng dụng web.</p>
      <div class="cl-card-foot">
        <span>9 bài học</span>
        <button type="button" class="cl-card-action">Xem chi tiết →</button>
      </div>
    </article>
  </div>
</section>`,
      css: `.cl-cards-section {
  font-family: system-ui, -apple-system, sans-serif;
}
.cl-cards-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 16px;
  margin-bottom: 14px;
  background: #ffffff;
  border: 2px solid #cbd5e1;
  border-radius: 10px;
}
.cl-cards-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.cl-filter-chip {
  padding: 6px 12px;
  border: 1.5px solid #94a3b8;
  border-radius: 999px;
  background: #f8fafc;
  color: #334155;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}
.cl-filter-chip.is-active {
  background: #2563eb;
  border-color: #1d4ed8;
  color: #ffffff;
}
.cl-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}
.cl-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 10px;
  padding: 16px;
}
.cl-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.cl-card-badge {
  padding: 3px 9px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  color: #1d4ed8;
  border-radius: 5px;
  font-size: 0.76rem;
  font-weight: 700;
}
.cl-badge-amber {
  background: #fef3c7;
  border-color: #fcd34d;
  color: #b45309;
}
.cl-card-level {
  font-size: 0.78rem;
  color: #64748b;
}
.cl-card-title {
  margin: 0 0 8px;
  font-size: 1.02rem;
  color: #0f172a;
}
.cl-card-body {
  margin: 0 0 14px;
  font-size: 0.87rem;
  color: #475569;
  line-height: 1.55;
  flex: 1;
}
.cl-card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1.5px solid #e2e8f0;
  font-size: 0.82rem;
  color: #475569;
}
.cl-card-action {
  padding: 6px 10px;
  border: 1.5px solid #2563eb;
  background: #eff6ff;
  color: #1d4ed8;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}`,
      js: `const chips = document.querySelectorAll(".cl-filter-chip");
const cards = document.querySelectorAll(".cl-card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    const topic = chip.dataset.topic;
    cards.forEach((card) => {
      card.style.display = topic === "all" || card.dataset.topic === topic ? "flex" : "none";
    });
  });
});`
    },

    // 6. SERVICES
    {
      id: "services-solution-matrix",
      title: "Interactive Services Grid with Detail Drawer",
      titleVi: "Lưới giới thiệu dịch vụ kèm khung chi tiết hạng mục",
      category: "services",
      featured: false,
      tags: ["services", "features", "agency", "solutions", "dich vu", "luoi dich vu"],
      summary: "Bố cục 3 cột giới thiệu dịch vụ kỹ thuật với viền nổi bật; bấm vào từng dịch vụ sẽ hiển thị danh sách hạng mục bàn giao cụ thể.",
      html: `<section class="cl-services">
  <div class="cl-services-grid">
    <article class="cl-srv-card is-selected" data-srv="frontend">
      <div class="cl-srv-icon">🎨</div>
      <h3>Thiết kế Giao diện Web</h3>
      <p>Xây dựng hệ thống UI chuẩn HTML5/CSS3 với đường viền rõ ràng và tốc độ tải tức thì.</p>
      <button type="button" class="cl-srv-btn">Xem hạng mục</button>
    </article>

    <article class="cl-srv-card" data-srv="audit">
      <div class="cl-srv-icon">⚡</div>
      <h3>Tối ưu Hiệu năng &amp; SEO</h3>
      <p>Chuẩn hóa cấu trúc thẻ ngữ nghĩa, ARIA roles và giảm thiểu dung lượng mã nguồn.</p>
      <button type="button" class="cl-srv-btn">Xem hạng mục</button>
    </article>

    <article class="cl-srv-card" data-srv="custom">
      <div class="cl-srv-icon">🧩</div>
      <h3>Thư viện Component Nội bộ</h3>
      <p>Đóng gói các khối giao diện dùng chung cho đội ngũ phát triển mà không phụ thuộc framework.</p>
      <button type="button" class="cl-srv-btn">Xem hạng mục</button>
    </article>
  </div>

  <div class="cl-srv-detail" id="clSrvDetail">
    <strong>Hạng mục bàn giao (Thiết kế Giao diện Web):</strong> Bộ biến màu CSS, bố cục Responsive 3 mốc màn hình và bộ kiểm thử trình duyệt.
  </div>
</section>`,
      css: `.cl-services {
  font-family: system-ui, -apple-system, sans-serif;
  display: grid;
  gap: 14px;
}
.cl-services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
}
.cl-srv-card {
  background: #ffffff;
  border: 2px solid #cbd5e1;
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}
.cl-srv-card.is-selected {
  border-color: #2563eb;
  background: #f8fafc;
}
.cl-srv-icon {
  font-size: 1.5rem;
  margin-bottom: 8px;
}
.cl-srv-card h3 {
  margin: 0 0 6px;
  font-size: 1rem;
  color: #0f172a;
}
.cl-srv-card p {
  margin: 0 0 12px;
  font-size: 0.86rem;
  color: #475569;
  line-height: 1.5;
}
.cl-srv-btn {
  padding: 6px 12px;
  border: 1.5px solid #64748b;
  border-radius: 6px;
  background: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}
.cl-srv-detail {
  padding: 12px 16px;
  background: #eff6ff;
  border: 2px solid #93c5fd;
  border-radius: 8px;
  color: #1e3a8a;
  font-size: 0.88rem;
}`,
      js: `const details = {
  frontend: "Hạng mục bàn giao (Thiết kế Giao diện Web): Bộ biến màu CSS, bố cục Responsive 3 mốc màn hình và bộ kiểm thử trình duyệt.",
  audit: "Hạng mục bàn giao (Tối ưu Hiệu năng & SEO): Đạt điểm Lighthouse > 95, chuẩn hóa thẻ alt/ARIA và loại bỏ CSS dư thừa.",
  custom: "Hạng mục bàn giao (Thư viện Component Nội bộ): Tài liệu hướng dẫn sử dụng, quy chuẩn đặt tên class và mã mẫu chạy độc lập."
};

const srvCards = document.querySelectorAll(".cl-srv-card");
const detailBox = document.getElementById("clSrvDetail");

srvCards.forEach((card) => {
  card.addEventListener("click", () => {
    srvCards.forEach((c) => c.classList.remove("is-selected"));
    card.classList.add("is-selected");
    detailBox.textContent = details[card.dataset.srv] || "";
  });
});`
    },

    // 7. TEAM MEMBERS
    {
      id: "team-directory-cards",
      title: "Team Members Grid with Department Filter",
      titleVi: "Khối giới thiệu đội ngũ nhân sự kèm lọc bộ phận",
      category: "team",
      featured: false,
      tags: ["team", "members", "staff", "profile", "doi ngu", "nhan su"],
      summary: "Danh sách thành viên đội ngũ trình bày dạng thẻ có khung avatar chữ cái, vai trò chuyên môn, kỹ năng chính và lọc nhanh theo phòng ban.",
      html: `<section class="cl-team">
  <div class="cl-team-header">
    <h3>Đội ngũ Phát triển</h3>
    <div class="cl-team-tabs">
      <button type="button" class="cl-team-tab is-active" data-dept="all">Tất cả</button>
      <button type="button" class="cl-team-tab" data-dept="engineering">Kỹ thuật</button>
      <button type="button" class="cl-team-tab" data-dept="design">Thiết kế UI</button>
    </div>
  </div>

  <div class="cl-team-grid">
    <article class="cl-member" data-dept="engineering">
      <div class="cl-avatar">QD</div>
      <h4>Quang Dương</h4>
      <span class="cl-role">Kiến trúc sư Frontend</span>
      <p>Chuyên gia tối ưu HTML/CSS/JS thuần và kiến trúc ứng dụng web tĩnh tốc độ cao.</p>
    </article>

    <article class="cl-member" data-dept="design">
      <div class="cl-avatar cl-avatar-blue">MA</div>
      <h4>Minh Anh</h4>
      <span class="cl-role">Thiết kế Hệ thống Giao diện</span>
      <p>Phụ trách tiêu chuẩn tương phản đường viền, khả năng tiếp cận (Accessibility) và bố cục.</p>
    </article>

    <article class="cl-member" data-dept="engineering">
      <div class="cl-avatar cl-avatar-green">HN</div>
      <h4>Hoàng Nam</h4>
      <span class="cl-role">Kỹ sư Kiểm thử Tự động</span>
      <p>Đảm bảo mọi component hoạt động ổn định trên nhiều kích thước màn hình khác nhau.</p>
    </article>
  </div>
</section>`,
      css: `.cl-team {
  font-family: system-ui, -apple-system, sans-serif;
}
.cl-team-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}
.cl-team-header h3 {
  margin: 0;
  color: #0f172a;
}
.cl-team-tabs {
  display: flex;
  gap: 6px;
}
.cl-team-tab {
  padding: 6px 12px;
  border: 1.5px solid #94a3b8;
  border-radius: 6px;
  background: #ffffff;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}
.cl-team-tab.is-active {
  background: #0f172a;
  border-color: #0f172a;
  color: #ffffff;
}
.cl-team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
}
.cl-member {
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 10px;
  padding: 16px;
}
.cl-avatar {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: #1e293b;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-bottom: 10px;
}
.cl-avatar-blue { background: #2563eb; }
.cl-avatar-green { background: #059669; }
.cl-member h4 {
  margin: 0 0 4px;
  color: #0f172a;
}
.cl-role {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 8px;
}
.cl-member p {
  margin: 0;
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.5;
}`,
      js: `const teamTabs = document.querySelectorAll(".cl-team-tab");
const members = document.querySelectorAll(".cl-member");

teamTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    teamTabs.forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    const dept = tab.dataset.dept;
    members.forEach((m) => {
      m.style.display = dept === "all" || m.dataset.dept === dept ? "block" : "none";
    });
  });
});`
    },

    // 8. HISTORY SECTION
    {
      id: "history-milestone-timeline",
      title: "Interactive Project Milestone Timeline",
      titleVi: "Dòng thời gian cột mốc phát triển tương tác",
      category: "history-section",
      featured: false,
      tags: ["history", "timeline", "roadmap", "milestones", "lich su", "dong thoi gian"],
      summary: "Sơ đồ dòng thời gian theo từng giai đoạn phát triển, cho phép bấm chọn từng năm/giai đoạn để làm nổi bật chi tiết cột mốc.",
      html: `<section class="cl-timeline">
  <div class="cl-tl-steps">
    <button type="button" class="cl-tl-node is-active" data-year="2024">Giai đoạn 1 (Khởi tạo)</button>
    <button type="button" class="cl-tl-node" data-year="2025">Giai đoạn 2 (Chuẩn hóa)</button>
    <button type="button" class="cl-tl-node" data-year="2026">Giai đoạn 3 (Mở rộng 25 mục)</button>
  </div>

  <div class="cl-tl-card" id="clTlCard">
    <span class="cl-tl-badge" id="clTlBadge">Giai đoạn 1</span>
    <h3 id="clTlTitle">Xây dựng nền tảng HTML/CSS/JS thuần</h3>
    <p id="clTlDesc">Thiết lập quy chuẩn viết component độc lập không phụ thuộc vào thư viện ngoài, đảm bảo tốc độ tải nhanh và dễ đọc.</p>
  </div>
</section>`,
      css: `.cl-timeline {
  font-family: system-ui, -apple-system, sans-serif;
  display: grid;
  gap: 14px;
}
.cl-tl-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}
.cl-tl-node {
  padding: 10px 14px;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 8px;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  text-align: left;
}
.cl-tl-node.is-active {
  background: #eff6ff;
  border-color: #2563eb;
  color: #1d4ed8;
}
.cl-tl-card {
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-left: 6px solid #2563eb;
  border-radius: 10px;
  padding: 18px;
}
.cl-tl-badge {
  display: inline-block;
  padding: 3px 9px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 5px;
  font-size: 0.78rem;
  font-weight: 700;
}
.cl-tl-card h3 {
  margin: 10px 0 6px;
  color: #0f172a;
}
.cl-tl-card p {
  margin: 0;
  color: #475569;
  line-height: 1.55;
  font-size: 0.9rem;
}`,
      js: `const milestones = {
  "2024": {
    badge: "Giai đoạn 1",
    title: "Xây dựng nền tảng HTML/CSS/JS thuần",
    desc: "Thiết lập quy chuẩn viết component độc lập không phụ thuộc vào thư viện ngoài, đảm bảo tốc độ tải nhanh và dễ đọc."
  },
  "2025": {
    badge: "Giai đoạn 2",
    title: "Tích hợp Live Playground & Tìm kiếm tiếng Việt không dấu",
    desc: "Hỗ trợ tra cứu tức thời theo từ khóa có dấu hoặc không dấu và chạy thử mã trực tiếp trong khung iframe cô lập."
  },
  "2026": {
    badge: "Giai đoạn 3",
    title: "Hoàn thiện 25 Danh mục & Quy trình mở rộng cùng AI",
    desc: "Chuẩn hóa toàn bộ 25 danh mục giao diện kèm tài liệu trạng thái dự án giúp mở rộng kho mẫu tự động."
  }
};

const nodes = document.querySelectorAll(".cl-tl-node");
const badgeEl = document.getElementById("clTlBadge");
const titleEl = document.getElementById("clTlTitle");
const descEl = document.getElementById("clTlDesc");

nodes.forEach((node) => {
  node.addEventListener("click", () => {
    nodes.forEach((n) => n.classList.remove("is-active"));
    node.classList.add("is-active");
    const item = milestones[node.dataset.year];
    if (item) {
      badgeEl.textContent = item.badge;
      titleEl.textContent = item.title;
      descEl.textContent = item.desc;
    }
  });
});`
    },

    // 9. STATISTICS JS COUNTERS
    {
      id: "statistics-animated-counters",
      title: "Animated JS Number Counters",
      titleVi: "Bộ đếm số liệu thống kê chuyển động mượt",
      category: "statistics-counters",
      featured: false,
      tags: ["statistics", "counters", "numbers", "metrics", "thong ke", "bo dem so"],
      summary: "Khối hiển thị 4 chỉ số thống kê sử dụng requestAnimationFrame trong JS thuần để tạo hiệu ứng đếm số mượt mà kèm nút chạy lại.",
      html: `<section class="cl-stats">
  <div class="cl-stats-grid">
    <div class="cl-stat-box">
      <strong class="cl-stat-num" data-target="25" data-suffix="">0</strong>
      <span>Danh mục giao diện</span>
    </div>
    <div class="cl-stat-box">
      <strong class="cl-stat-num" data-target="224" data-suffix="+">0</strong>
      <span>Mẫu thiết kế tham chiếu</span>
    </div>
    <div class="cl-stat-box">
      <strong class="cl-stat-num" data-target="100" data-suffix="%">0</strong>
      <span>Thuần HTML/CSS/JS</span>
    </div>
    <div class="cl-stat-box">
      <strong class="cl-stat-num" data-target="1200" data-suffix="+">0</strong>
      <span>Lượt sao chép mã</span>
    </div>
  </div>
  <div class="cl-stats-bar">
    <button type="button" class="cl-stats-replay" id="clReplayStats">↻ Chạy lại hiệu ứng đếm số</button>
  </div>
</section>`,
      css: `.cl-stats {
  font-family: system-ui, -apple-system, sans-serif;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 12px;
  padding: 18px;
}
.cl-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}
.cl-stat-box {
  padding: 14px;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  text-align: center;
}
.cl-stat-num {
  display: block;
  font-size: 1.65rem;
  color: #2563eb;
  margin-bottom: 4px;
}
.cl-stat-box span {
  font-size: 0.82rem;
  color: #475569;
  font-weight: 500;
}
.cl-stats-bar {
  margin-top: 12px;
  text-align: right;
}
.cl-stats-replay {
  padding: 7px 12px;
  border: 1.5px solid #64748b;
  border-radius: 6px;
  background: #ffffff;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}`,
      js: `function animateCounters() {
  const counters = document.querySelectorAll(".cl-stat-num");
  const duration = 900;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    counters.forEach((el) => {
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || "";
      const val = Math.floor(target * progress);
      el.textContent = val.toLocaleString("vi-VN") + suffix;
    });
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

animateCounters();
document.getElementById("clReplayStats")?.addEventListener("click", animateCounters);`
    },

    // 10. NOTICES
    {
      id: "notices-board-filter",
      title: "Corporate & Academic Notice Board with Search",
      titleVi: "Bảng thông báo trường học / doanh nghiệp kèm lọc nhanh",
      category: "notices",
      featured: true,
      tags: ["notices", "announcement", "bulletin", "board", "thong bao", "bang tin"],
      summary: "Bảng thông báo chuyên nghiệp lấy cảm hứng từ Editor's Pick của CodeShikhi: có thanh tin khẩn cấp, lọc theo phân loại và tìm kiếm tiêu đề trực tiếp.",
      html: `<section class="cl-notice-board">
  <div class="cl-notice-ticker">
    <span class="cl-ticker-badge">MỚI</span>
    <span>Lịch bảo trì hệ thống định kỳ vào 22:00 Thứ Bảy tuần này — Vui lòng lưu lại công việc trước giờ bảo trì.</span>
  </div>

  <div class="cl-notice-controls">
    <input type="search" id="clNoticeSearch" class="cl-notice-input" placeholder="Tìm thông báo (ví dụ: lịch thi, học bổng)..." />
    <div class="cl-notice-cats">
      <button type="button" class="cl-ncat is-active" data-cat="all">Tất cả</button>
      <button type="button" class="cl-ncat" data-cat="urgent">Khẩn</button>
      <button type="button" class="cl-ncat" data-cat="academic">Đào tạo</button>
    </div>
  </div>

  <ul class="cl-notice-list" id="clNoticeList">
    <li class="cl-notice-item" data-cat="urgent">
      <div>
        <span class="cl-nbadge cl-nbadge-red">Khẩn</span>
        <strong>Thông báo cập nhật quy chế bảo mật tài khoản nội bộ năm 2026</strong>
      </div>
      <time>03/11/2026</time>
    </li>
    <li class="cl-notice-item" data-cat="academic">
      <div>
        <span class="cl-nbadge">Đào tạo</span>
        <strong>Lịch thi kết thúc học phần Lập trình Web chuẩn HTML/CSS/JS</strong>
      </div>
      <time>01/11/2026</time>
    </li>
    <li class="cl-notice-item" data-cat="academic">
      <div>
        <span class="cl-nbadge">Đào tạo</span>
        <strong>Danh sách học bổng khuyến khích học tập học kỳ mùa Thu</strong>
      </div>
      <time>28/10/2026</time>
    </li>
  </ul>
</section>`,
      css: `.cl-notice-board {
  font-family: system-ui, -apple-system, sans-serif;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 10px;
  overflow: hidden;
}
.cl-notice-ticker {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #fef2f2;
  border-bottom: 1.5px solid #fecaca;
  color: #991b1b;
  font-size: 0.85rem;
}
.cl-ticker-badge {
  padding: 2px 8px;
  background: #dc2626;
  color: #ffffff;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.74rem;
}
.cl-notice-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 12px 16px;
  background: #f8fafc;
  border-bottom: 1.5px solid #cbd5e1;
}
.cl-notice-input {
  flex: 1;
  min-width: 200px;
  padding: 7px 12px;
  border: 1.5px solid #94a3b8;
  border-radius: 6px;
  font-size: 0.86rem;
}
.cl-notice-cats {
  display: flex;
  gap: 6px;
}
.cl-ncat {
  padding: 6px 12px;
  border: 1.5px solid #94a3b8;
  border-radius: 6px;
  background: #ffffff;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}
.cl-ncat.is-active {
  background: #2563eb;
  border-color: #1d4ed8;
  color: #ffffff;
}
.cl-notice-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.cl-notice-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 0.88rem;
}
.cl-notice-item:last-child {
  border-bottom: none;
}
.cl-nbadge {
  display: inline-block;
  padding: 2px 8px;
  margin-right: 8px;
  background: #eff6ff;
  border: 1px solid #93c5fd;
  color: #1d4ed8;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
}
.cl-nbadge-red {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #b91c1c;
}
.cl-notice-item time {
  color: #64748b;
  font-size: 0.8rem;
  white-space: nowrap;
}`,
      js: `const searchInput = document.getElementById("clNoticeSearch");
const catBtns = document.querySelectorAll(".cl-ncat");
const items = document.querySelectorAll(".cl-notice-item");
let activeCat = "all";

function filterNotices() {
  const q = (searchInput?.value || "").toLowerCase().trim();
  items.forEach((item) => {
    const matchCat = activeCat === "all" || item.dataset.cat === activeCat;
    const matchText = item.textContent.toLowerCase().includes(q);
    item.style.display = matchCat && matchText ? "flex" : "none";
  });
}

searchInput?.addEventListener("input", filterNotices);
catBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    catBtns.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    activeCat = btn.dataset.cat;
    filterNotices();
  });
});`
    },

    // 11. FLASH SALE
    {
      id: "flash-sale-live-countdown",
      title: "Flash Sale Banner with Live Countdown & Stock Progress",
      titleVi: "Khối khuyến mãi Flash Sale kèm đồng hồ đếm ngược thực",
      category: "flash-sale",
      featured: false,
      tags: ["flash sale", "countdown", "ecommerce", "promo", "khuyen mai", "dem nguoc"],
      summary: "Khối khuyến mãi giới hạn thời gian có đồng hồ đếm ngược Giờ : Phút : Giây chạy thực tế và thanh tiến độ số suất còn lại.",
      html: `<section class="cl-flash">
  <div class="cl-flash-top">
    <div>
      <span class="cl-flash-pill">⚡ FLASH SALE HÔM NAY</span>
      <h3>Ưu đãi Bộ Công cụ Thiết kế Web Chuẩn</h3>
    </div>
    <div class="cl-timer" aria-label="Đồng hồ đếm ngược">
      <div class="cl-time-box"><strong id="clFh">02</strong><span>Giờ</span></div>
      <div class="cl-time-box"><strong id="clFm">45</strong><span>Phút</span></div>
      <div class="cl-time-box"><strong id="clFs">19</strong><span>Giây</span></div>
    </div>
  </div>

  <div class="cl-flash-bottom">
    <div class="cl-stock-wrap">
      <div class="cl-stock-label">
        <span>Đã đăng ký: <strong id="clClaimedCount">78</strong>/100 suất</span>
        <span>Giảm 60%</span>
      </div>
      <div class="cl-stock-bar">
        <div class="cl-stock-fill" id="clStockFill" style="width: 78%;"></div>
      </div>
    </div>
    <button type="button" class="cl-flash-btn" id="clClaimBtn">Nhận suất ưu đãi</button>
  </div>
</section>`,
      css: `.cl-flash {
  font-family: system-ui, -apple-system, sans-serif;
  background: #ffffff;
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 18px;
}
.cl-flash-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1.5px solid #fde68a;
}
.cl-flash-pill {
  display: inline-block;
  padding: 3px 10px;
  background: #fef3c7;
  border: 1px solid #f59e0b;
  color: #b45309;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
}
.cl-flash-top h3 {
  margin: 8px 0 0;
  color: #0f172a;
}
.cl-timer {
  display: flex;
  gap: 8px;
}
.cl-time-box {
  min-width: 58px;
  padding: 8px;
  background: #0f172a;
  color: #ffffff;
  border-radius: 8px;
  text-align: center;
}
.cl-time-box strong {
  display: block;
  font-size: 1.15rem;
}
.cl-time-box span {
  font-size: 0.72rem;
  color: #cbd5e1;
}
.cl-flash-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  padding-top: 14px;
}
.cl-stock-wrap {
  flex: 1;
  min-width: 200px;
}
.cl-stock-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.84rem;
  margin-bottom: 6px;
  color: #334155;
}
.cl-stock-bar {
  height: 10px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  overflow: hidden;
}
.cl-stock-fill {
  height: 100%;
  background: #ea580c;
  transition: width 0.25s ease;
}
.cl-flash-btn {
  padding: 10px 16px;
  background: #ea580c;
  border: 1.5px solid #c2410c;
  color: #ffffff;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}`,
      js: `let remaining = 2 * 3600 + 45 * 60 + 19;
const hEl = document.getElementById("clFh");
const mEl = document.getElementById("clFm");
const sEl = document.getElementById("clFs");

setInterval(() => {
  if (remaining > 0) remaining -= 1;
  const h = String(Math.floor(remaining / 3600)).padStart(2, "0");
  const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  if (hEl) hEl.textContent = h;
  if (mEl) mEl.textContent = m;
  if (sEl) sEl.textContent = s;
}, 1000);

let claimed = 78;
const claimBtn = document.getElementById("clClaimBtn");
const claimedEl = document.getElementById("clClaimedCount");
const fillEl = document.getElementById("clStockFill");

claimBtn?.addEventListener("click", () => {
  if (claimed < 100) {
    claimed += 1;
    claimedEl.textContent = String(claimed);
    fillEl.style.width = claimed + "%";
    claimBtn.textContent = "Đã giữ 1 suất ✓";
  }
});`
    },

    // 12. PRICING
    {
      id: "pricing-billing-toggle",
      title: "Pricing Comparison Cards with Monthly/Yearly Toggle",
      titleVi: "Bảng giá dịch vụ kèm công tắc chuyển đổi Tháng / Năm",
      category: "pricing",
      featured: false,
      tags: ["pricing", "plans", "billing toggle", "bang gia", "goi cuoc"],
      summary: "Bảng so sánh 3 gói dịch vụ có viền phân biệt gói nổi bật và công tắc chuyển đổi chu kỳ thanh toán Tháng / Năm tự động cập nhật giá.",
      html: `<section class="cl-pricing">
  <div class="cl-pricing-head">
    <h3>Chọn gói phù hợp với nhu cầu</h3>
    <div class="cl-billing-switch">
      <button type="button" class="cl-bill-btn is-active" data-cycle="monthly">Theo Tháng</button>
      <button type="button" class="cl-bill-btn" data-cycle="yearly">Theo Năm (Tiết kiệm 20%)</button>
    </div>
  </div>

  <div class="cl-pricing-grid">
    <article class="cl-plan">
      <h4>Cơ bản (Starter)</h4>
      <div class="cl-price" data-monthly="0đ" data-yearly="0đ">0đ</div>
      <p class="cl-cycle-label">Miễn phí trọn đời</p>
      <ul>
        <li>✓ Truy cập 25 danh mục cơ bản</li>
        <li>✓ Xem trước Desktop &amp; Mobile</li>
      </ul>
      <button type="button" class="cl-plan-btn">Bắt đầu ngay</button>
    </article>

    <article class="cl-plan cl-plan-featured">
      <span class="cl-plan-popular">Phổ biến nhất</span>
      <h4>Chuyên nghiệp (Pro)</h4>
      <div class="cl-price" data-monthly="199.000đ" data-yearly="159.000đ">199.000đ</div>
      <p class="cl-cycle-label">Mỗi tháng</p>
      <ul>
        <li>✓ Toàn bộ mẫu Full Page hoàn chỉnh</li>
        <li>✓ Chỉnh sửa trực tiếp trong Live Editor</li>
      </ul>
      <button type="button" class="cl-plan-btn cl-plan-btn-primary">Chọn gói Pro</button>
    </article>

    <article class="cl-plan">
      <h4>Đội nhóm (Team)</h4>
      <div class="cl-price" data-monthly="499.000đ" data-yearly="399.000đ">499.000đ</div>
      <p class="cl-cycle-label">Mỗi tháng / tối đa 10 thành viên</p>
      <ul>
        <li>✓ Kho lưu trữ mẫu riêng cho nhóm</li>
        <li>✓ Hỗ trợ kỹ thuật ưu tiên</li>
      </ul>
      <button type="button" class="cl-plan-btn">Liên hệ tư vấn</button>
    </article>
  </div>
</section>`,
      css: `.cl-pricing {
  font-family: system-ui, -apple-system, sans-serif;
}
.cl-pricing-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}
.cl-pricing-head h3 {
  margin: 0;
  color: #0f172a;
}
.cl-billing-switch {
  display: inline-flex;
  border: 1.5px solid #94a3b8;
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
}
.cl-bill-btn {
  padding: 7px 12px;
  border: none;
  background: transparent;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}
.cl-bill-btn.is-active {
  background: #2563eb;
  color: #ffffff;
}
.cl-pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
}
.cl-plan {
  position: relative;
  background: #ffffff;
  border: 2px solid #cbd5e1;
  border-radius: 10px;
  padding: 18px;
  display: flex;
  flex-direction: column;
}
.cl-plan-featured {
  border-color: #2563eb;
  background: #f8fafc;
}
.cl-plan-popular {
  align-self: flex-start;
  padding: 2px 8px;
  background: #dbeafe;
  color: #1e40af;
  border-radius: 4px;
  font-size: 0.74rem;
  font-weight: 700;
  margin-bottom: 6px;
}
.cl-plan h4 {
  margin: 0 0 8px;
  color: #0f172a;
}
.cl-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}
.cl-cycle-label {
  margin: 4px 0 12px;
  font-size: 0.78rem;
  color: #64748b;
}
.cl-plan ul {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  font-size: 0.85rem;
  color: #334155;
  display: grid;
  gap: 6px;
  flex: 1;
}
.cl-plan-btn {
  padding: 9px 12px;
  border: 1.5px solid #64748b;
  border-radius: 7px;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
}
.cl-plan-btn-primary {
  background: #2563eb;
  border-color: #1d4ed8;
  color: #ffffff;
}`,
      js: `const billBtns = document.querySelectorAll(".cl-bill-btn");
const prices = document.querySelectorAll(".cl-price");

billBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    billBtns.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const cycle = btn.dataset.cycle;
    prices.forEach((p) => {
      p.textContent = p.dataset[cycle] || p.textContent;
    });
  });
});`
    },

    // 13. TESTIMONIALS
    {
      id: "testimonials-switcher-cards",
      title: "Customer Testimonials with Interactive Quote Switcher",
      titleVi: "Khối trích dẫn ý kiến khách hàng kèm bộ chuyển đổi",
      category: "testimonials",
      featured: false,
      tags: ["testimonials", "quotes", "reviews", "feedback", "y kien khach hang", "nhan xet"],
      summary: "Khung hiển thị phản hồi thực tế từ người dùng, cho phép bấm vào từng hồ sơ khách hàng bên dưới để đọc nhận xét chi tiết.",
      html: `<section class="cl-testi">
  <blockquote class="cl-testi-quote" id="clTestiQuote">
    “Nhờ bộ component viết bằng HTML và CSS thuần, nhóm của tôi đã giảm được 70% thời gian dựng giao diện mà không còn lo xung đột class với hệ thống cũ.”
  </blockquote>

  <div class="cl-testi-authors">
    <button type="button" class="cl-author-btn is-active" data-idx="0">
      <strong>Trần Minh Quân</strong>
      <span>Trưởng nhóm Frontend @ TechViet</span>
    </button>
    <button type="button" class="cl-author-btn" data-idx="1">
      <strong>Lê Thu Hà</strong>
      <span>Giảng viên Lập trình Web</span>
    </button>
    <button type="button" class="cl-author-btn" data-idx="2">
      <strong>Nguyễn Hoàng Long</strong>
      <span>Lập trình viên Tự do</span>
    </button>
  </div>
</section>`,
      css: `.cl-testi {
  font-family: system-ui, -apple-system, sans-serif;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 12px;
  padding: 20px;
}
.cl-testi-quote {
  margin: 0 0 18px;
  padding: 16px;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-left: 5px solid #2563eb;
  border-radius: 8px;
  font-size: 0.98rem;
  line-height: 1.6;
  color: #0f172a;
}
.cl-testi-authors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
}
.cl-author-btn {
  padding: 10px 12px;
  background: #ffffff;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
}
.cl-author-btn.is-active {
  border-color: #2563eb;
  background: #eff6ff;
}
.cl-author-btn strong {
  display: block;
  font-size: 0.88rem;
  color: #0f172a;
}
.cl-author-btn span {
  font-size: 0.78rem;
  color: #64748b;
}`,
      js: `const quotes = [
  "“Nhờ bộ component viết bằng HTML và CSS thuần, nhóm của tôi đã giảm được 70% thời gian dựng giao diện mà không còn lo xung đột class với hệ thống cũ.”",
  "“Sinh viên mới học web rất thích chế độ gộp 1 file HTML vì các em có thể nhìn rõ mối liên hệ giữa HTML, CSS và JavaScript ngay trên một màn hình.”",
  "“Đường viền rõ nét và thiết kế tối giản giúp tôi dễ dàng tùy biến lại màu sắc theo thương hiệu của từng khách hàng chỉ trong vài phút.”"
];

const quoteEl = document.getElementById("clTestiQuote");
const authorBtns = document.querySelectorAll(".cl-author-btn");

authorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    authorBtns.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    quoteEl.textContent = quotes[Number(btn.dataset.idx)] || quotes[0];
  });
});`
    },

    // 14. TABLE SECTION
    {
      id: "table-sortable-directory",
      title: "Searchable & Sortable Data Table",
      titleVi: "Bảng dữ liệu có tìm kiếm & sắp xếp theo cột",
      category: "table-section",
      featured: false,
      tags: ["table", "data grid", "search", "sort", "bang du lieu", "danh sach"],
      summary: "Bảng quản lý danh sách học viên/dự án có thanh lọc từ khóa trực tiếp và nút bấm sắp xếp theo Điểm số hoặc Tên.",
      html: `<section class="cl-table-wrap">
  <div class="cl-table-bar">
    <input type="search" id="clTableSearch" class="cl-table-input" placeholder="Lọc theo tên hoặc khóa học..." />
    <button type="button" class="cl-table-sort" id="clSortScoreBtn">Sắp xếp theo Điểm ↕</button>
  </div>

  <div class="cl-table-scroll">
    <table class="cl-table">
      <thead>
        <tr>
          <th>Mã HV</th>
          <th>Họ và tên</th>
          <th>Chuyên đề</th>
          <th>Điểm</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody id="clTableBody">
        <tr data-score="94">
          <td>#HV101</td>
          <td>Nguyễn Văn An</td>
          <td>HTML5 &amp; CSS Grid</td>
          <td><strong>94</strong></td>
          <td><span class="cl-tstatus cl-tstatus-ok">Hoàn thành</span></td>
        </tr>
        <tr data-score="82">
          <td>#HV102</td>
          <td>Phạm Thị Bình</td>
          <td>DOM JavaScript</td>
          <td><strong>82</strong></td>
          <td><span class="cl-tstatus cl-tstatus-ok">Hoàn thành</span></td>
        </tr>
        <tr data-score="89">
          <td>#HV103</td>
          <td>Lê Quốc Cường</td>
          <td>Responsive UI</td>
          <td><strong>89</strong></td>
          <td><span class="cl-tstatus cl-tstatus-warn">Đang học</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</section>`,
      css: `.cl-table-wrap {
  font-family: system-ui, -apple-system, sans-serif;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 10px;
  overflow: hidden;
}
.cl-table-bar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding: 12px 16px;
  background: #f8fafc;
  border-bottom: 1.5px solid #cbd5e1;
}
.cl-table-input {
  flex: 1;
  min-width: 180px;
  padding: 7px 12px;
  border: 1.5px solid #94a3b8;
  border-radius: 6px;
}
.cl-table-sort {
  padding: 7px 12px;
  border: 1.5px solid #64748b;
  border-radius: 6px;
  background: #ffffff;
  font-weight: 600;
  cursor: pointer;
}
.cl-table-scroll {
  overflow-x: auto;
}
.cl-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
.cl-table th,
.cl-table td {
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}
.cl-table th {
  background: #f1f5f9;
  color: #0f172a;
  font-weight: 700;
}
.cl-tstatus {
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}
.cl-tstatus-ok {
  background: #dcfce7;
  color: #166534;
}
.cl-tstatus-warn {
  background: #fef3c7;
  color: #92400e;
}`,
      js: `const tSearch = document.getElementById("clTableSearch");
const tBody = document.getElementById("clTableBody");
const sortBtn = document.getElementById("clSortScoreBtn");
let desc = true;

tSearch?.addEventListener("input", () => {
  const q = tSearch.value.toLowerCase().trim();
  Array.from(tBody.querySelectorAll("tr")).forEach((row) => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
  });
});

sortBtn?.addEventListener("click", () => {
  const rows = Array.from(tBody.querySelectorAll("tr"));
  rows.sort((a, b) => {
    const sa = Number(a.dataset.score);
    const sb = Number(b.dataset.score);
    return desc ? sb - sa : sa - sb;
  });
  desc = !desc;
  rows.forEach((r) => tBody.appendChild(r));
});`
    },

    // 15. FORM
    {
      id: "form-admission-validator",
      title: "Admission & Registration Form with Live Validation",
      titleVi: "Biểu mẫu đăng ký / tuyển sinh kèm kiểm tra dữ liệu",
      category: "form",
      featured: true,
      tags: ["form", "admission", "validation", "registration", "bieu mau", "dang ky"],
      summary: "Biểu mẫu nhập học lấy cảm hứng từ Editor's Pick của CodeShikhi, tích hợp kiểm tra dữ liệu bắt buộc và thông báo kết quả tức thì.",
      html: `<form class="cl-form" id="clAdmissionForm" novalidate>
  <h3 class="cl-form-title">Phiếu Đăng Ký Khóa Học Thực Hành</h3>
  <div class="cl-form-grid">
    <div class="cl-field">
      <label for="clFullName">Họ và tên học viên *</label>
      <input type="text" id="clFullName" required placeholder="Nhập họ và tên..." />
    </div>
    <div class="cl-field">
      <label for="clEmail">Địa chỉ Email *</label>
      <input type="email" id="clEmail" required placeholder="hocvien@example.com" />
    </div>
    <div class="cl-field">
      <label for="clTrack">Chuyên đề đăng ký</label>
      <select id="clTrack">
        <option value="HTML/CSS Thuần">Nền tảng HTML5 &amp; CSS3 Thuần</option>
        <option value="JavaScript DOM">JavaScript DOM &amp; Tương tác</option>
        <option value="Full Giao diện">Thiết kế Giao diện Hoàn chỉnh</option>
      </select>
    </div>
    <div class="cl-field">
      <label for="clNote">Ghi chú mục tiêu</label>
      <input type="text" id="clNote" placeholder="Ví dụ: Tự làm web cá nhân..." />
    </div>
  </div>
  <div class="cl-form-footer">
    <button type="submit" class="cl-form-submit">Gửi hồ sơ đăng ký</button>
    <span class="cl-form-msg" id="clFormMsg">Điền đầy đủ thông tin có dấu (*) để gửi.</span>
  </div>
</form>`,
      css: `.cl-form {
  font-family: system-ui, -apple-system, sans-serif;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 10px;
  padding: 18px;
}
.cl-form-title {
  margin: 0 0 14px;
  color: #0f172a;
}
.cl-form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
}
.cl-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.cl-field label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #334155;
}
.cl-field input,
.cl-field select {
  padding: 8px 11px;
  border: 1.5px solid #94a3b8;
  border-radius: 6px;
  font-size: 0.88rem;
}
.cl-field input:focus,
.cl-field select:focus {
  outline: none;
  border-color: #2563eb;
}
.cl-form-footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1.5px solid #e2e8f0;
}
.cl-form-submit {
  padding: 9px 16px;
  background: #2563eb;
  border: 1.5px solid #1d4ed8;
  color: #ffffff;
  border-radius: 7px;
  font-weight: 600;
  cursor: pointer;
}
.cl-form-msg {
  font-size: 0.84rem;
  color: #475569;
}`,
      js: `const form = document.getElementById("clAdmissionForm");
const msg = document.getElementById("clFormMsg");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("clFullName").value.trim();
  const email = document.getElementById("clEmail").value.trim();
  const track = document.getElementById("clTrack").value;

  if (!name || !email.includes("@")) {
    msg.style.color = "#dc2626";
    msg.textContent = "⚠ Vui lòng nhập đầy đủ Họ tên và Email hợp lệ!";
    return;
  }
  msg.style.color = "#15803d";
  msg.textContent = "✓ Đã tiếp nhận đăng ký của " + name + " (" + track + ").";
});`
    },

    // 16. CALENDAR SECTION
    {
      id: "calendar-academic-planner",
      title: "Interactive Academic & Event Calendar",
      titleVi: "Lịch học thuật & sự kiện tương tác theo ngày",
      category: "calendar-section",
      featured: true,
      tags: ["calendar", "academic", "schedule", "events", "lich hoc", "su kien"],
      summary: "Lịch sự kiện tương tác lấy cảm hứng từ Premium Academic Calendar của CodeShikhi: bấm vào các ngày có đánh dấu sự kiện để xem lịch trình chi tiết.",
      html: `<section class="cl-cal">
  <div class="cl-cal-header">
    <div>
      <strong>Tháng 11 / 2026</strong>
      <span class="cl-cal-sub">Lịch học thuật &amp; Kiểm tra định kỳ</span>
    </div>
    <span class="cl-cal-legend">● Ngày có sự kiện</span>
  </div>

  <div class="cl-cal-grid">
    <span class="cl-cal-dow">T2</span><span class="cl-cal-dow">T3</span><span class="cl-cal-dow">T4</span>
    <span class="cl-cal-dow">T5</span><span class="cl-cal-dow">T6</span><span class="cl-cal-dow">T7</span><span class="cl-cal-dow">CN</span>

    <button type="button" class="cl-day" data-event="Không có sự kiện cố định.">2</button>
    <button type="button" class="cl-day has-event is-selected" data-event="03/11: Khai giảng chuyên đề Thiết kế Web Thuần HTML/CSS/JS.">3</button>
    <button type="button" class="cl-day" data-event="Không có sự kiện cố định.">4</button>
    <button type="button" class="cl-day" data-event="Không có sự kiện cố định.">5</button>
    <button type="button" class="cl-day has-event" data-event="06/11: Hội thảo Tối ưu Giao diện &amp; Kiểm thử Độc lập.">6</button>
    <button type="button" class="cl-day" data-event="Không có sự kiện cố định.">7</button>
    <button type="button" class="cl-day has-event" data-event="08/11: Hạn nộp bài tập lớn xây dựng Landing Page.">8</button>
  </div>

  <div class="cl-cal-detail" id="clCalDetail">
    📌 03/11: Khai giảng chuyên đề Thiết kế Web Thuần HTML/CSS/JS.
  </div>
</section>`,
      css: `.cl-cal {
  font-family: system-ui, -apple-system, sans-serif;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 10px;
  padding: 16px;
}
.cl-cal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
.cl-cal-sub {
  display: block;
  font-size: 0.8rem;
  color: #64748b;
}
.cl-cal-legend {
  font-size: 0.78rem;
  color: #2563eb;
  font-weight: 600;
}
.cl-cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin-bottom: 12px;
}
.cl-cal-dow {
  text-align: center;
  font-size: 0.76rem;
  font-weight: 700;
  color: #475569;
  padding: 4px 0;
}
.cl-day {
  padding: 10px 4px;
  border: 1.5px solid #cbd5e1;
  border-radius: 7px;
  background: #f8fafc;
  font-weight: 600;
  cursor: pointer;
}
.cl-day.has-event {
  border-color: #60a5fa;
  background: #eff6ff;
  color: #1d4ed8;
}
.cl-day.is-selected {
  background: #2563eb;
  border-color: #1e40af;
  color: #ffffff;
}
.cl-cal-detail {
  padding: 10px 12px;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 7px;
  font-size: 0.86rem;
  color: #0f172a;
}`,
      js: `const days = document.querySelectorAll(".cl-day");
const calDetail = document.getElementById("clCalDetail");

days.forEach((day) => {
  day.addEventListener("click", () => {
    days.forEach((d) => d.classList.remove("is-selected"));
    day.classList.add("is-selected");
    calDetail.textContent = "📌 " + (day.dataset.event || "");
  });
});`
    },

    // 17. LOGIN & SIGNUP
    {
      id: "login-auth-switcher",
      title: "Login & Signup Card with Tab Switcher & Password Toggle",
      titleVi: "Khung Đăng nhập & Đăng ký kèm nút ẩn/hiện mật khẩu",
      category: "login",
      featured: false,
      tags: ["login", "signup", "auth", "password toggle", "dang nhap", "dang ky"],
      summary: "Khung xác thực tài khoản gọn gàng có tab chuyển đổi giữa Đăng nhập và Tạo tài khoản mới, kèm nút ẩn/hiện mật khẩu.",
      html: `<div class="cl-auth-card">
  <div class="cl-auth-tabs">
    <button type="button" class="cl-auth-tab is-active" data-mode="login">Đăng nhập</button>
    <button type="button" class="cl-auth-tab" data-mode="signup">Đăng ký mới</button>
  </div>

  <form class="cl-auth-form" id="clAuthForm" novalidate>
    <div class="cl-auth-field" id="clAuthNameRow" hidden>
      <label>Họ và tên</label>
      <input type="text" placeholder="Nguyễn Văn A" />
    </div>
    <div class="cl-auth-field">
      <label>Email tài khoản</label>
      <input type="email" id="clAuthEmail" placeholder="ban@domain.com" />
    </div>
    <div class="cl-auth-field">
      <label>Mật khẩu</label>
      <div class="cl-pass-wrap">
        <input type="password" id="clAuthPass" value="matkhau123" />
        <button type="button" class="cl-pass-toggle" id="clPassToggle">Hiện</button>
      </div>
    </div>
    <button type="submit" class="cl-auth-submit" id="clAuthSubmit">Đăng nhập vào hệ thống</button>
    <p class="cl-auth-status" id="clAuthStatus">Chế độ hiện tại: Đăng nhập tài khoản.</p>
  </form>
</div>`,
      css: `.cl-auth-card {
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 380px;
  margin: 0 auto;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 10px;
  overflow: hidden;
}
.cl-auth-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1.5px solid #cbd5e1;
  background: #f8fafc;
}
.cl-auth-tab {
  padding: 10px;
  border: none;
  background: transparent;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
}
.cl-auth-tab.is-active {
  background: #ffffff;
  color: #2563eb;
  border-bottom: 2px solid #2563eb;
}
.cl-auth-form {
  padding: 16px;
  display: grid;
  gap: 12px;
}
.cl-auth-field {
  display: grid;
  gap: 5px;
}
.cl-auth-field[hidden] {
  display: none;
}
.cl-auth-field label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #334155;
}
.cl-auth-field input {
  padding: 8px 10px;
  border: 1.5px solid #94a3b8;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
}
.cl-pass-wrap {
  display: flex;
  gap: 6px;
}
.cl-pass-toggle {
  padding: 0 12px;
  border: 1.5px solid #64748b;
  border-radius: 6px;
  background: #f8fafc;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}
.cl-auth-submit {
  padding: 9px 14px;
  background: #2563eb;
  border: 1.5px solid #1d4ed8;
  color: #ffffff;
  border-radius: 7px;
  font-weight: 700;
  cursor: pointer;
}
.cl-auth-status {
  margin: 0;
  font-size: 0.8rem;
  color: #475569;
}`,
      js: `const authTabs = document.querySelectorAll(".cl-auth-tab");
const nameRow = document.getElementById("clAuthNameRow");
const submitBtn = document.getElementById("clAuthSubmit");
const statusEl = document.getElementById("clAuthStatus");
const passInput = document.getElementById("clAuthPass");
const passToggle = document.getElementById("clPassToggle");

authTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    authTabs.forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    const isSignup = tab.dataset.mode === "signup";
    nameRow.hidden = !isSignup;
    submitBtn.textContent = isSignup ? "Tạo tài khoản mới" : "Đăng nhập vào hệ thống";
    statusEl.textContent = isSignup ? "Chế độ hiện tại: Đăng ký tài khoản mới." : "Chế độ hiện tại: Đăng nhập tài khoản.";
  });
});

passToggle?.addEventListener("click", () => {
  const show = passInput.type === "password";
  passInput.type = show ? "text" : "password";
  passToggle.textContent = show ? "Ẩn" : "Hiện";
});

document.getElementById("clAuthForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  statusEl.textContent = "✓ Yêu cầu xác thực đã được kiểm tra hợp lệ.";
});`
    },

    // 18. CONTACT
    {
      id: "contact-support-split",
      title: "Contact Information & Direct Message Block",
      titleVi: "Khối thông tin liên hệ & gửi tin nhắn hỗ trợ",
      category: "contact",
      featured: false,
      tags: ["contact", "support", "helpdesk", "message", "lien he", "ho tro"],
      summary: "Bố cục 2 cột gồm thẻ thông tin liên lạc trực quan bên trái và biểu mẫu gửi tin nhắn nhanh bên phải.",
      html: `<section class="cl-contact">
  <div class="cl-contact-info">
    <h3>Thông tin Liên hệ</h3>
    <p>Đội ngũ kỹ thuật luôn sẵn sàng hỗ trợ giải đáp về cấu trúc HTML, CSS và JavaScript.</p>
    <div class="cl-citem"><strong>📍 Địa chỉ:</strong> Khu Công nghệ Phần mềm, Hà Nội</div>
    <div class="cl-citem"><strong>✉️ Email:</strong> support@codelibrary.dev</div>
    <div class="cl-citem"><strong>⏰ Giờ làm việc:</strong> Thứ 2 – Thứ 7 (08:30 – 18:00)</div>
  </div>

  <form class="cl-contact-form" id="clContactForm">
    <input type="text" id="clCSubject" placeholder="Tiêu đề cần hỗ trợ..." required />
    <textarea id="clCMessage" rows="3" placeholder="Nội dung câu hỏi của bạn..." required></textarea>
    <button type="submit">Gửi tin nhắn</button>
    <span class="cl-contact-feedback" id="clContactFeedback"></span>
  </form>
</section>`,
      css: `.cl-contact {
  font-family: system-ui, -apple-system, sans-serif;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 16px;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 10px;
  padding: 18px;
}
.cl-contact-info h3 {
  margin: 0 0 8px;
  color: #0f172a;
}
.cl-contact-info p {
  margin: 0 0 12px;
  font-size: 0.86rem;
  color: #475569;
}
.cl-citem {
  padding: 8px 10px;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.84rem;
  margin-bottom: 8px;
}
.cl-contact-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.cl-contact-form input,
.cl-contact-form textarea {
  padding: 9px 11px;
  border: 1.5px solid #94a3b8;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.88rem;
}
.cl-contact-form button {
  padding: 9px 14px;
  background: #2563eb;
  border: 1.5px solid #1d4ed8;
  color: #ffffff;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.cl-contact-feedback {
  font-size: 0.82rem;
  color: #15803d;
}`,
      js: `document.getElementById("clContactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const fb = document.getElementById("clContactFeedback");
  fb.textContent = "✓ Tin nhắn của bạn đã được ghi nhận! Chúng tôi sẽ phản hồi sớm.";
});`
    },

    // 19. FAQ
    {
      id: "faq-collapsible-accordion",
      title: "Collapsible FAQ Accordion with Expand All Toggle",
      titleVi: "Danh sách Câu hỏi thường gặp (Accordion) đóng/mở",
      category: "faq",
      featured: false,
      tags: ["faq", "accordion", "questions", "collapse", "cau hoi thuong gap", "hoi dap"],
      summary: "Danh sách câu hỏi thường gặp đóng/mở mượt mà bằng JS thuần kèm nút Mở tất cả / Thu gọn tất cả.",
      html: `<section class="cl-faq">
  <div class="cl-faq-top">
    <h3>Câu hỏi thường gặp (FAQ)</h3>
    <button type="button" class="cl-faq-toggleall" id="clFaqToggleAll">Mở tất cả</button>
  </div>

  <div class="cl-faq-item is-open">
    <button type="button" class="cl-faq-q">
      <span>1. Các component này có cần cài Bootstrap mới chạy được không?</span>
      <span class="cl-faq-icon">−</span>
    </button>
    <div class="cl-faq-a">
      Hoàn toàn không. Mọi mẫu trong kho đều viết bằng HTML5, CSS3 và JavaScript thuần nên bạn chỉ cần copy sang dự án là chạy ngay.
    </div>
  </div>

  <div class="cl-faq-item">
    <button type="button" class="cl-faq-q">
      <span>2. Làm sao để đổi màu chủ đạo hoặc độ dày đường viền?</span>
      <span class="cl-faq-icon">+</span>
    </button>
    <div class="cl-faq-a">
      Bạn có thể sửa trực tiếp mã màu hoặc độ dày border ngay trong tab CSS của khung Live Editor trước khi bấm Sao chép.
    </div>
  </div>

  <div class="cl-faq-item">
    <button type="button" class="cl-faq-q">
      <span>3. Tôi muốn dùng chung nhiều component trên cùng 1 trang có bị trùng CSS không?</span>
      <span class="cl-faq-icon">+</span>
    </button>
    <div class="cl-faq-a">
      Mỗi nhóm component đều được đặt tiền tố class riêng biệt (như .cl-nav-*, .cl-hero-*, .cl-faq-*) nên hoàn toàn không xung đột nhau.
    </div>
  </div>
</section>`,
      css: `.cl-faq {
  font-family: system-ui, -apple-system, sans-serif;
  display: grid;
  gap: 10px;
}
.cl-faq-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cl-faq-top h3 {
  margin: 0;
  color: #0f172a;
}
.cl-faq-toggleall {
  padding: 6px 12px;
  border: 1.5px solid #64748b;
  border-radius: 6px;
  background: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}
.cl-faq-item {
  background: #ffffff;
  border: 2px solid #cbd5e1;
  border-radius: 8px;
  overflow: hidden;
}
.cl-faq-item.is-open {
  border-color: #2563eb;
}
.cl-faq-q {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8fafc;
  border: none;
  text-align: left;
  font-weight: 700;
  color: #0f172a;
  cursor: pointer;
}
.cl-faq-a {
  display: none;
  padding: 12px 16px;
  border-top: 1.5px solid #e2e8f0;
  font-size: 0.88rem;
  color: #334155;
  line-height: 1.55;
}
.cl-faq-item.is-open .cl-faq-a {
  display: block;
}`,
      js: `const faqItems = document.querySelectorAll(".cl-faq-item");
const toggleAllBtn = document.getElementById("clFaqToggleAll");
let allExpanded = false;

faqItems.forEach((item) => {
  const btn = item.querySelector(".cl-faq-q");
  const icon = item.querySelector(".cl-faq-icon");
  btn?.addEventListener("click", () => {
    const open = item.classList.toggle("is-open");
    if (icon) icon.textContent = open ? "−" : "+";
  });
});

toggleAllBtn?.addEventListener("click", () => {
  allExpanded = !allExpanded;
  faqItems.forEach((item) => {
    item.classList.toggle("is-open", allExpanded);
    const icon = item.querySelector(".cl-faq-icon");
    if (icon) icon.textContent = allExpanded ? "−" : "+";
  });
  toggleAllBtn.textContent = allExpanded ? "Thu gọn tất cả" : "Mở tất cả";
});`
    },

    // 20. FOOTER & BIGFOOTER
    {
      id: "footer-multicolumn-sitemap",
      title: "Multi-Column BigFooter with Back-to-Top Action",
      titleVi: "Chân trang nhiều cột kèm nút cuộn lên đầu trang",
      category: "footer",
      featured: false,
      tags: ["footer", "bigfooter", "sitemap", "copyright", "chan trang", "cuoi trang"],
      summary: "Chân trang đầy đủ gồm cột giới thiệu thương hiệu, các nhóm liên kết nhanh, thông tin bản quyền và nút trở về đầu trang.",
      html: `<footer class="cl-footer">
  <div class="cl-footer-grid">
    <div class="cl-footer-brand">
      <h4>CodeLibrary</h4>
      <p>Kho tra cứu Component &amp; Template viết bằng HTML5, CSS3 và JavaScript thuần với đường viền phân vùng rõ nét.</p>
    </div>
    <div class="cl-footer-col">
      <h5>Danh mục chính</h5>
      <a href="#nav" onclick="return false;">Header &amp; Navbar</a>
      <a href="#hero" onclick="return false;">Hero Sections</a>
      <a href="#cards" onclick="return false;">Cards &amp; Grid</a>
    </div>
    <div class="cl-footer-col">
      <h5>Tài nguyên</h5>
      <a href="#html5" onclick="return false;">HTML5 Boilerplate</a>
      <a href="#tokens" onclick="return false;">Biến CSS Chuẩn</a>
      <a href="#a11y" onclick="return false;">Chuẩn Accessibility</a>
    </div>
  </div>
  <div class="cl-footer-bottom">
    <span id="clFooterStatus">© 2026 CodeLibrary — Sẵn sàng sử dụng cho mọi dự án web.</span>
    <button type="button" class="cl-top-btn" id="clBackToTop">↑ Lên đầu trang</button>
  </div>
</footer>`,
      css: `.cl-footer {
  font-family: system-ui, -apple-system, sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  border: 2px solid #475569;
  border-radius: 10px;
  padding: 20px;
}
.cl-footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 18px;
  padding-bottom: 16px;
  border-bottom: 1.5px solid #334155;
}
.cl-footer-brand h4,
.cl-footer-col h5 {
  margin: 0 0 8px;
  color: #ffffff;
}
.cl-footer-brand p {
  margin: 0;
  font-size: 0.85rem;
  color: #94a3b8;
  line-height: 1.55;
}
.cl-footer-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cl-footer-col a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.85rem;
}
.cl-footer-col a:hover {
  color: #60a5fa;
}
.cl-footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 14px;
  font-size: 0.8rem;
  color: #94a3b8;
}
.cl-top-btn {
  padding: 6px 12px;
  border: 1.5px solid #475569;
  border-radius: 6px;
  background: #1e293b;
  color: #ffffff;
  font-size: 0.8rem;
  cursor: pointer;
}
@media (max-width: 640px) {
  .cl-footer-grid {
    grid-template-columns: 1fr;
  }
}`,
      js: `document.getElementById("clBackToTop")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const st = document.getElementById("clFooterStatus");
  if (st) st.textContent = "↑ Đã kích hoạt cuộn mượt lên đầu trang.";
});`
    },

    // 21. NEWSLETTER
    {
      id: "newsletter-topic-digest",
      title: "Newsletter Subscription Box with Topic Preferences",
      titleVi: "Khối đăng ký nhận bản tin kèm tùy chọn chủ đề",
      category: "newsletter",
      featured: false,
      tags: ["newsletter", "subscribe", "email", "ban tin", "dang ky email"],
      summary: "Khối thu thập email đăng ký nhận bản tin kỹ thuật hàng tuần, cho phép người dùng tích chọn chủ đề quan tâm và kiểm tra email hợp lệ.",
      html: `<section class="cl-news">
  <div class="cl-news-head">
    <h3>Đăng ký Bản tin Kỹ thuật Hàng tuần</h3>
    <p>Nhận các mẫu giao diện HTML/CSS/JS thuần mới nhất gửi thẳng vào hộp thư của bạn.</p>
  </div>

  <div class="cl-news-topics">
    <label><input type="checkbox" checked value="CSS Layout" /> Bố cục CSS</label>
    <label><input type="checkbox" checked value="Vanilla JS" /> Mẹo Vanilla JS</label>
    <label><input type="checkbox" value="Templates" /> Mẫu Trang Hoàn chỉnh</label>
  </div>

  <form class="cl-news-form" id="clNewsForm" novalidate>
    <input type="email" id="clNewsEmail" placeholder="Nhập địa chỉ email của bạn..." required />
    <button type="submit">Đăng ký ngay</button>
  </form>
  <p class="cl-news-msg" id="clNewsMsg">Không quảng cáo rác — hủy đăng ký bất cứ lúc nào.</p>
</section>`,
      css: `.cl-news {
  font-family: system-ui, -apple-system, sans-serif;
  background: #eff6ff;
  border: 2px solid #60a5fa;
  border-radius: 12px;
  padding: 20px;
}
.cl-news-head h3 {
  margin: 0 0 6px;
  color: #0f172a;
}
.cl-news-head p {
  margin: 0 0 12px;
  font-size: 0.88rem;
  color: #334155;
}
.cl-news-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1e293b;
}
.cl-news-form {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.cl-news-form input {
  flex: 1;
  min-width: 200px;
  padding: 9px 12px;
  border: 1.5px solid #94a3b8;
  border-radius: 7px;
  background: #ffffff;
}
.cl-news-form button {
  padding: 9px 16px;
  background: #2563eb;
  border: 1.5px solid #1d4ed8;
  color: #ffffff;
  border-radius: 7px;
  font-weight: 700;
  cursor: pointer;
}
.cl-news-msg {
  margin: 10px 0 0;
  font-size: 0.8rem;
  color: #475569;
}`,
      js: `document.getElementById("clNewsForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("clNewsEmail").value.trim();
  const msg = document.getElementById("clNewsMsg");
  if (!email.includes("@")) {
    msg.style.color = "#dc2626";
    msg.textContent = "⚠ Vui lòng nhập địa chỉ email hợp lệ.";
    return;
  }
  msg.style.color = "#15803d";
  msg.textContent = "✓ Đăng ký thành công cho hộp thư: " + email;
});`
    },

    // 22. REVIEWS
    {
      id: "reviews-star-rating-summary",
      title: "Interactive Star Rating & Review Breakdown",
      titleVi: "Khối tổng hợp điểm đánh giá 5 sao kèm chấm điểm trực tiếp",
      category: "reviews",
      featured: false,
      tags: ["reviews", "ratings", "stars", "feedback", "danh gia", "xep hang sao"],
      summary: "Bảng tổng hợp điểm đánh giá trung bình, thanh phân bổ tỷ lệ từ 1 đến 5 sao và bộ nút bấm cho phép người dùng chấm sao trực tiếp.",
      html: `<section class="cl-reviews">
  <div class="cl-rev-summary">
    <div class="cl-rev-score">
      <strong id="clRevAvg">4.9</strong>
      <span>★★★★★</span>
      <small id="clRevTotal">128 đánh giá</small>
    </div>

    <div class="cl-rev-bars">
      <div class="cl-rev-row"><span>5 ★</span><div class="cl-rbar"><div style="width:88%"></div></div><span>88%</span></div>
      <div class="cl-rev-row"><span>4 ★</span><div class="cl-rbar"><div style="width:9%"></div></div><span>9%</span></div>
      <div class="cl-rev-row"><span>3 ★</span><div class="cl-rbar"><div style="width:3%"></div></div><span>3%</span></div>
    </div>
  </div>

  <div class="cl-rev-interactive">
    <span>Chấm điểm của bạn:</span>
    <div class="cl-star-picker" id="clStarPicker">
      <button type="button" data-star="1">★</button>
      <button type="button" data-star="2">★</button>
      <button type="button" data-star="3">★</button>
      <button type="button" data-star="4">★</button>
      <button type="button" data-star="5" class="is-on">★</button>
    </div>
    <span class="cl-rev-note" id="clRevNote">Hãy bấm chọn số sao!</span>
  </div>
</section>`,
      css: `.cl-reviews {
  font-family: system-ui, -apple-system, sans-serif;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 10px;
  padding: 18px;
}
.cl-rev-summary {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 18px;
  align-items: center;
  padding-bottom: 14px;
  border-bottom: 1.5px solid #e2e8f0;
}
.cl-rev-score {
  text-align: center;
  padding: 12px;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
}
.cl-rev-score strong {
  display: block;
  font-size: 1.8rem;
  color: #0f172a;
}
.cl-rev-score span {
  color: #f59e0b;
  font-size: 1rem;
}
.cl-rev-score small {
  display: block;
  color: #64748b;
  font-size: 0.76rem;
}
.cl-rev-bars {
  display: grid;
  gap: 8px;
}
.cl-rev-row {
  display: grid;
  grid-template-columns: 36px 1fr 40px;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
}
.cl-rbar {
  height: 8px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 999px;
  overflow: hidden;
}
.cl-rbar div {
  height: 100%;
  background: #f59e0b;
}
.cl-rev-interactive {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 12px;
  font-size: 0.86rem;
}
.cl-star-picker button {
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  color: #f59e0b;
  font-size: 1.1rem;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
}
.cl-rev-note {
  color: #2563eb;
  font-weight: 600;
}
@media (max-width: 540px) {
  .cl-rev-summary {
    grid-template-columns: 1fr;
  }
}`,
      js: `const starBtns = document.querySelectorAll("#clStarPicker button");
const noteEl = document.getElementById("clRevNote");
const totalEl = document.getElementById("clRevTotal");

starBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = Number(btn.dataset.star);
    noteEl.textContent = "Bạn đã đánh giá " + val + "/5 sao. Cảm ơn phản hồi của bạn!";
    if (totalEl) totalEl.textContent = "129 đánh giá";
  });
});`
    },

    // 23. VIDEO CARDS
    {
      id: "video-cards-course-playlist",
      title: "Featured Video Player & Lesson Playlist Grid",
      titleVi: "Khung phát Video bài giảng kèm danh sách phát (Playlist)",
      category: "video-cards",
      featured: false,
      tags: ["video", "playlist", "course", "player", "the video", "danh sach phat"],
      summary: "Bố cục trình phát bài học bên trái kết hợp danh sách tập bên phải; bấm vào bài học nào sẽ cập nhật ngay màn hình đang phát.",
      html: `<section class="cl-video-hub">
  <div class="cl-video-stage">
    <div class="cl-video-screen">
      <span class="cl-video-badge" id="clVidBadge">ĐANG PHÁT — BÀI 01</span>
      <h3 id="clVidTitle">Cấu trúc HTML5 Ngữ nghĩa &amp; Khung Trang Chuẩn</h3>
      <p id="clVidDuration">Thời lượng: 12:45 • Trình độ: Cơ bản</p>
    </div>
  </div>

  <div class="cl-video-list">
    <button type="button" class="cl-vitem is-active" data-badge="ĐANG PHÁT — BÀI 01" data-title="Cấu trúc HTML5 Ngữ nghĩa & Khung Trang Chuẩn" data-dur="Thời lượng: 12:45 • Trình độ: Cơ bản">
      <strong>01. Cấu trúc HTML5 Ngữ nghĩa</strong>
      <span>12:45</span>
    </button>
    <button type="button" class="cl-vitem" data-badge="ĐANG PHÁT — BÀI 02" data-title="Làm chủ CSS Flexbox & Grid trong 15 phút" data-dur="Thời lượng: 15:20 • Trình độ: Cơ bản">
      <strong>02. Làm chủ CSS Flexbox &amp; Grid</strong>
      <span>15:20</span>
    </button>
    <button type="button" class="cl-vitem" data-badge="ĐANG PHÁT — BÀI 03" data-title="Tương tác DOM & Sự kiện bằng Vanilla JS" data-dur="Thời lượng: 18:10 • Trình độ: Trung cấp">
      <strong>03. Tương tác DOM bằng Vanilla JS</strong>
      <span>18:10</span>
    </button>
  </div>
</section>`,
      css: `.cl-video-hub {
  font-family: system-ui, -apple-system, sans-serif;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 14px;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 10px;
  padding: 16px;
}
.cl-video-screen {
  background: #0f172a;
  color: #ffffff;
  border: 2px solid #334155;
  border-radius: 8px;
  padding: 24px 18px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.cl-video-badge {
  display: inline-block;
  align-self: flex-start;
  padding: 3px 9px;
  background: #2563eb;
  border-radius: 4px;
  font-size: 0.74rem;
  font-weight: 700;
  margin-bottom: 10px;
}
.cl-video-screen h3 {
  margin: 0 0 6px;
  font-size: 1.1rem;
}
.cl-video-screen p {
  margin: 0;
  font-size: 0.82rem;
  color: #94a3b8;
}
.cl-video-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cl-vitem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 7px;
  text-align: left;
  cursor: pointer;
}
.cl-vitem.is-active {
  background: #eff6ff;
  border-color: #2563eb;
}
.cl-vitem strong {
  font-size: 0.85rem;
  color: #0f172a;
}
.cl-vitem span {
  font-size: 0.78rem;
  color: #64748b;
}
@media (max-width: 680px) {
  .cl-video-hub {
    grid-template-columns: 1fr;
  }
}`,
      js: `const vItems = document.querySelectorAll(".cl-vitem");
const vBadge = document.getElementById("clVidBadge");
const vTitle = document.getElementById("clVidTitle");
const vDur = document.getElementById("clVidDuration");

vItems.forEach((item) => {
  item.addEventListener("click", () => {
    vItems.forEach((i) => i.classList.remove("is-active"));
    item.classList.add("is-active");
    vBadge.textContent = item.dataset.badge;
    vTitle.textContent = item.dataset.title;
    vDur.textContent = item.dataset.dur;
  });
});`
    },

    // 24. HOME PAGE FULL COMPONENT
    {
      id: "home-page-full-saas-starter",
      title: "Complete SaaS & Product Home Page Template",
      titleVi: "Mẫu Trang chủ Sản phẩm hoàn chỉnh (Navbar + Hero + Tính năng + CTA)",
      category: "home-page-full",
      featured: true,
      tags: ["home page", "landing page", "full home", "template", "trang chu hoan chinh"],
      summary: "Bản ghép hoàn chỉnh một Trang chủ hiện đại gồm Thanh điều hướng, Khối Hero, Lưới 3 tính năng cốt lõi và Chân trang gọn gàng.",
      html: `<div class="cl-home-tpl">
  <header class="cl-ht-nav">
    <strong>⚡ NovaStack</strong>
    <nav>
      <a href="#features" onclick="return false;">Tính năng</a>
      <a href="#docs" onclick="return false;">Tài liệu</a>
      <button type="button" id="clHtCtaBtn">Bắt đầu ngay</button>
    </nav>
  </header>

  <section class="cl-ht-hero">
    <h1>Nền tảng Giao diện Web Tĩnh Siêu Tốc</h1>
    <p>Không phụ thuộc thư viện ngoài — đường viền sắc nét, dễ đọc và sẵn sàng triển khai lên GitHub Pages.</p>
  </section>

  <section class="cl-ht-features">
    <article class="cl-ht-card">
      <h4>1. Chuẩn HTML5</h4>
      <p>Cấu trúc thẻ ngữ nghĩa rõ ràng, tối ưu cho công cụ tìm kiếm và trình đọc màn hình.</p>
    </article>
    <article class="cl-ht-card">
      <h4>2. Biến CSS Gốc</h4>
      <p>Đổi toàn bộ bảng màu và độ dày viền chỉ với vài dòng khai báo tại :root.</p>
    </article>
    <article class="cl-ht-card">
      <h4>3. Vanilla JS</h4>
      <p>Tương tác mượt mà, không phát sinh bước đóng gói phức tạp.</p>
    </article>
  </section>

  <footer class="cl-ht-foot" id="clHtFoot">
    © 2026 NovaStack Starter — Mẫu Trang chủ hoàn chỉnh.
  </footer>
</div>`,
      css: `.cl-home-tpl {
  font-family: system-ui, -apple-system, sans-serif;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 12px;
  overflow: hidden;
}
.cl-ht-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 18px;
  background: #f8fafc;
  border-bottom: 1.5px solid #cbd5e1;
}
.cl-ht-nav nav {
  display: flex;
  align-items: center;
  gap: 12px;
}
.cl-ht-nav a {
  text-decoration: none;
  color: #334155;
  font-size: 0.86rem;
  font-weight: 600;
}
.cl-ht-nav button {
  padding: 6px 12px;
  background: #2563eb;
  border: 1px solid #1d4ed8;
  color: #ffffff;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.cl-ht-hero {
  padding: 28px 20px;
  text-align: center;
  border-bottom: 1.5px solid #e2e8f0;
}
.cl-ht-hero h1 {
  margin: 0 0 8px;
  font-size: 1.45rem;
  color: #0f172a;
}
.cl-ht-hero p {
  margin: 0 auto;
  max-width: 520px;
  color: #475569;
  font-size: 0.9rem;
}
.cl-ht-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  padding: 18px;
}
.cl-ht-card {
  padding: 14px;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
}
.cl-ht-card h4 {
  margin: 0 0 6px;
  color: #0f172a;
}
.cl-ht-card p {
  margin: 0;
  font-size: 0.84rem;
  color: #475569;
  line-height: 1.5;
}
.cl-ht-foot {
  padding: 12px 18px;
  background: #0f172a;
  color: #cbd5e1;
  font-size: 0.8rem;
  text-align: center;
}`,
      js: `document.getElementById("clHtCtaBtn")?.addEventListener("click", () => {
  const foot = document.getElementById("clHtFoot");
  if (foot) foot.textContent = "✓ Đã kích hoạt nút CTA trên mẫu Trang chủ hoàn chỉnh!";
});`
    },

    // 25. FULL PAGE COMPONENT
    {
      id: "full-page-education-portal",
      title: "Full Page Education & Course Portal (Copy & Paste Ready)",
      titleVi: "Trang Web Cổng Đào Tạo Hoàn Chỉnh (Copy 1 lần chạy ngay)",
      category: "full-page-com",
      featured: true,
      tags: ["full page", "complete website", "education portal", "template", "trang web hoan chinh"],
      summary: "Mẫu nguyên trang Cổng Đào Tạo gồm: Thanh điều hướng, Thông báo chạy, Bộ lọc khóa học, Lịch khai giảng và Chân trang trong cùng một bản thiết kế.",
      html: `<div class="cl-fullpage">
  <header class="cl-fp-header">
    <div class="cl-fp-logo">🎓 EduPortal</div>
    <div class="cl-fp-filter">
      <button type="button" class="cl-fp-chip is-active" data-level="all">Tất cả khóa học</button>
      <button type="button" class="cl-fp-chip" data-level="beginner">Người mới</button>
      <button type="button" class="cl-fp-chip" data-level="advanced">Chuyên sâu</button>
    </div>
  </header>

  <div class="cl-fp-banner">
    <strong>Khóa học Mở rộng 2026:</strong> Học thực chiến qua việc xây dựng thư viện giao diện HTML, CSS và JavaScript thuần.
  </div>

  <main class="cl-fp-main">
    <article class="cl-fp-course" data-level="beginner">
      <span class="cl-fp-tag">Người mới</span>
      <h4>Nhập môn HTML5 &amp; CSS3 Chuẩn</h4>
      <p>Hiểu rõ Box Model, Flexbox, CSS Grid và cách tạo đường viền phân tách vùng rõ nét.</p>
    </article>
    <article class="cl-fp-course" data-level="beginner">
      <span class="cl-fp-tag">Người mới</span>
      <h4>JavaScript DOM &amp; Xử lý Sự kiện</h4>
      <p>Xây dựng tính năng tìm kiếm, bộ lọc, modal, tab và bộ đếm mà không cần thư viện ngoài.</p>
    </article>
    <article class="cl-fp-course" data-level="advanced">
      <span class="cl-fp-tag cl-fp-tag-pro">Chuyên sâu</span>
      <h4>Kiến trúc SPA Tĩnh &amp; Tối ưu Hiệu năng</h4>
      <p>Tổ chức Hash Router, cô lập mã bằng iframe sandbox và tự động hóa kiểm thử dữ liệu.</p>
    </article>
  </main>

  <footer class="cl-fp-footer">
    <span>EduPortal — Bản mẫu nguyên trang sẵn sàng sao chép.</span>
    <span>Hotline: 1900 6868</span>
  </footer>
</div>`,
      css: `.cl-fullpage {
  font-family: system-ui, -apple-system, sans-serif;
  background: #ffffff;
  border: 2px solid #94a3b8;
  border-radius: 12px;
  overflow: hidden;
}
.cl-fp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 14px 18px;
  background: #0f172a;
  color: #ffffff;
}
.cl-fp-logo {
  font-weight: 800;
  font-size: 1.05rem;
}
.cl-fp-filter {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.cl-fp-chip {
  padding: 5px 10px;
  border: 1px solid #475569;
  border-radius: 6px;
  background: #1e293b;
  color: #cbd5e1;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}
.cl-fp-chip.is-active {
  background: #2563eb;
  border-color: #60a5fa;
  color: #ffffff;
}
.cl-fp-banner {
  padding: 10px 18px;
  background: #eff6ff;
  border-bottom: 1.5px solid #bfdbfe;
  color: #1e3a8a;
  font-size: 0.85rem;
}
.cl-fp-main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  padding: 18px;
}
.cl-fp-course {
  padding: 14px;
  background: #f8fafc;
  border: 1.5px solid #cbd5e1;
  border-radius: 8px;
}
.cl-fp-tag {
  display: inline-block;
  padding: 2px 8px;
  background: #dbeafe;
  color: #1d4ed8;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 700;
  margin-bottom: 8px;
}
.cl-fp-tag-pro {
  background: #fef3c7;
  color: #b45309;
}
.cl-fp-course h4 {
  margin: 0 0 6px;
  color: #0f172a;
}
.cl-fp-course p {
  margin: 0;
  font-size: 0.84rem;
  color: #475569;
  line-height: 1.5;
}
.cl-fp-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 18px;
  background: #f1f5f9;
  border-top: 1.5px solid #cbd5e1;
  font-size: 0.8rem;
  color: #475569;
}`,
      js: `const fpChips = document.querySelectorAll(".cl-fp-chip");
const fpCourses = document.querySelectorAll(".cl-fp-course");

fpChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    fpChips.forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    const lv = chip.dataset.level;
    fpCourses.forEach((course) => {
      course.style.display = lv === "all" || course.dataset.level === lv ? "block" : "none";
    });
  });
});`
    }
  ];

  if (typeof module !== "undefined" && module.exports) {
    module.exports = components;
  }
  root.CODE_LIBRARY_COMPONENTS = components;
})(typeof globalThis !== "undefined" ? globalThis : window);
