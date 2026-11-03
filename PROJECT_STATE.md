# PROJECT_STATE.md — Trạng thái & Kiến trúc Dự án (Dành cho AI & Developer)

> **Hướng dẫn cho AI ở các phiên làm việc tiếp theo**:
> Hãy đọc file `PROJECT_STATE.md` này và `CHANGELOG.md` đầu tiên trước khi thêm Component/Template mới hoặc nâng cấp tính năng.

---

## 1. Thông tin Tổng quan Dự án
- **Tên dự án**: **Code Library** (Kho tra cứu Component & Template chuẩn HTML5 / CSS3 / Vanilla JS)
- **Thư mục làm việc**: `d:\MY PROJECT\REA\projects\code-library`
- **GitHub Repository**: `https://github.com/Banhtalon/web-library` (Nhánh chính: `main`)
- **GitHub Pages (Live Demo)**: `https://banhtalon.github.io/web-library/`
- **Phiên bản hiện tại**: `v1.1.0` (Cập nhật ngày `2026-11-03` — Cải tạo UI chuẩn bố cục CodeShikhi)

---

## 2. Triết lý & Nguyên tắc Thiết kế Cốt lõi
1. **100% Thuần Web (Zero Dependencies)**:
   - Không dùng Bootstrap, Tailwind, jQuery hay framework đóng gói.
   - Mọi Component/Template trong kho đều viết bằng **HTML5 ngữ nghĩa + CSS3 (Flexbox, Grid, CSS Variables) + Vanilla JavaScript**.
2. **Phong cách Giao diện Chuẩn CodeShikhi (Indigo Pill Buttons + Accordion Tree + Clear Borders)**:
   - Màu nhấn chủ đạo Tím Indigo (`#6c5ce7`), các nút bấm và bộ chuyển tab bo tròn dạng viên thuốc (`border-radius: 999px`).
   - Cột trái `CATEGORIES` là menu cây đóng/mở (Accordion): bấm vào danh mục sẽ xổ danh sách mẫu con và mở thẳng mẫu Component đầu tiên ở cột phải (1-click flow).
   - Cột phải gồm đúng 3 khối gọn gàng: **Header Component** (tối đa 3 pill tag) → **Live preview** (`Desktop / Mobile`, `Full preview`, `Open in new tab`) → **Source code** (chỉ 3 tab `HTML | CSS | JS` + thanh cửa sổ 3 chấm tròn macOS + 1 nút `Copy code` duy nhất, dừng ngay sau Source code).
3. **Không có tính năng Mua bán / Thương mại & Không có Form Upload trên Web**:
   - Việc thêm mới hoặc cập nhật Component/Template được thực hiện thông qua **AI trong cửa sổ chat** hoặc thả file nguyên liệu vào thư mục `inbox/`.

---

## 3. Cấu trúc Thư mục & Vai trò Từng File

```text
code-library/
├── index.html                  # Khung HTML SPA chính (Topbar, Sidebar, Main View, Fullscreen Modal)
├── package.json                # Khai báo script kiểm thử tự động (npm test)
├── README.md                   # Tài liệu giới thiệu chuẩn hiển thị trên GitHub
├── PROJECT_STATE.md            # File lưu trạng thái kiến trúc & quy trình chuẩn cho AI đọc lại
├── CHANGELOG.md                # Lịch sử cập nhật các phiên bản
├── css/
│   └── app.css                 # Hệ thống giao diện tối giản viền rõ nét + Dark/Light mode
├── js/
│   └── app.js                  # Hash Router, Tìm kiếm tiếng Việt không dấu, Live Editor 4 tab, Copy
├── data/
│   ├── categories.js           # Nguồn dữ liệu chính của 25 danh mục (window.CODE_LIBRARY_CATEGORIES)
│   ├── categories.json         # Bản JSON đồng bộ 100% từ categories.js
│   ├── components.js           # Nguồn dữ liệu chính của các mẫu (window.CODE_LIBRARY_COMPONENTS)
│   └── components/
│       └── index.json          # Bản JSON đồng bộ 100% từ components.js
├── inbox/
│   └── README.md               # Thư mục nơi người dùng thả file mẫu/ảnh/code mới để AI xử lý
└── tests/
    └── validate-library.mjs    # Script kiểm tra tính toàn vẹn dữ liệu 25 danh mục & các component
```

---

## 4. Schema Dữ liệu Chuẩn

### 4.1. Schema Danh mục (`data/categories.js`)
```js
{
  slug: "header",               // Mã định danh duy nhất (dùng trên URL #/category/<slug>)
  order: 1,                     // Thứ tự hiển thị (1 -> 25+)
  nameEn: "Header & Navbar",    // Tên tiếng Anh (chuẩn CodeShikhi)
  nameVi: "Thanh điều hướng",   // Tên tiếng Việt
  icon: "🧭",                   // Biểu tượng hiển thị
  description: "...",           // Mô tả ngắn gọn chức năng của danh mục
  keywords: ["navbar", "..."]   // Từ khóa tìm kiếm tiếng Anh & tiếng Việt không dấu
}
```

### 4.2. Schema Component / Template (`data/components.js`)
```js
{
  id: "header-responsive-command", // Mã định danh duy nhất (dùng trên URL #/component/<id>)
  title: "Responsive Navbar...",   // Tên tiếng Anh
  titleVi: "Thanh điều hướng...",  // Tên tiếng Việt
  category: "header",              // Phải khớp với slug trong data/categories.js
  featured: true,                  // true nếu muốn đưa lên mục Nổi bật ở Trang chủ
  tags: ["navbar", "responsive"],  // Danh sách thẻ phục vụ tìm kiếm
  summary: "...",                  // Mô tả ngắn gọn vấn đề mà mẫu này giải quyết
  html: "<header class=\"cl-nav-wrap\">...</header>", // Mã HTML5 thuần
  css: ".cl-nav-wrap { ... }",                        // Mã CSS3 thuần (có tiền tố riêng tránh xung đột)
  js: "// Mã JavaScript thuần tương tác DOM"
}
```

---

## 5. Kiểm kê Trạng thái Hiện tại (`v1.0.0`)

Hiện tại kho đã có đủ **25 danh mục** và **25 mẫu khởi đầu** (100% danh mục đều có mẫu hoạt động):

| STT | Category Slug | Tên Danh mục (EN / VI) | Component ID Khởi đầu |
| :---: | :--- | :--- | :--- |
| 1 | `header` | Header & Navbar — Thanh điều hướng | `header-responsive-command` |
| 2 | `button` | Button — Nút bấm tương tác | `button-interactive-suite` |
| 3 | `hero` | Hero Sections — Khối mở đầu trang | `hero-developer-split` |
| 4 | `carousel` | Carousel — Trình chiếu trượt | `carousel-spotlight-slider` |
| 5 | `cards` | Cards — Thẻ nội dung | `cards-filterable-course-grid` |
| 6 | `services` | Services — Lưới dịch vụ | `services-solution-matrix` |
| 7 | `team` | Team Members — Đội ngũ nhân sự | `team-directory-cards` |
| 8 | `history-section` | History Section — Dòng thời gian & Lịch sử | `history-milestone-timeline` |
| 9 | `statistics-counters` | Statistics JS Counters — Bộ đếm số liệu JS | `statistics-animated-counters` |
| 10 | `notices` | Notices — Bảng thông báo & Tin chạy | `notices-board-filter` |
| 11 | `flash-sale` | Flash Sale — Khuyến mãi & Đếm ngược | `flash-sale-live-countdown` |
| 12 | `pricing` | Pricing — Bảng giá dịch vụ | `pricing-billing-toggle` |
| 13 | `testimonials` | Testimonials — Ý kiến khách hàng | `testimonials-switcher-cards` |
| 14 | `table-section` | Table Section — Bảng dữ liệu & Bộ lọc | `table-sortable-directory` |
| 15 | `form` | Form — Biểu mẫu nhập liệu | `form-admission-validator` |
| 16 | `calendar-section` | Calendar Section — Lịch học thuật & Sự kiện | `calendar-academic-planner` |
| 17 | `login` | Login & Signup — Đăng nhập & Đăng ký | `login-auth-switcher` |
| 18 | `contact` | Contact — Liên hệ & Hỗ trợ | `contact-support-split` |
| 19 | `faq` | FAQ — Câu hỏi thường gặp | `faq-collapsible-accordion` |
| 20 | `footer` | Footer & BigFooter — Chân trang đầy đủ | `footer-multicolumn-sitemap` |
| 21 | `newsletter` | Newsletter — Đăng ký nhận bản tin | `newsletter-topic-digest` |
| 22 | `reviews` | Reviews — Đánh giá xếp hạng sao | `reviews-star-rating-summary` |
| 23 | `video-cards` | Video Cards — Thẻ phát Video & Playlist | `video-cards-course-playlist` |
| 24 | `home-page-full` | Home Page Full Component — Mẫu Trang chủ | `home-page-full-saas-starter` |
| 25 | `full-page-com` | Full Page Component — Trang Web hoàn chỉnh | `full-page-education-portal` |

---

## 6. Quy trình Chuẩn (SOP) Khi AI Thêm Mẫu Mới hoặc Nâng Cấp Tính Năng

Mỗi khi người dùng yêu cầu thêm mẫu mới (từ chat hoặc từ thư mục `inbox/`) hay thêm tính năng mới:

1. **Bước 1 — Chuẩn hóa mã nguồn**:
   - Đảm bảo mẫu mới sử dụng **100% HTML/CSS/JS thuần** (nếu mẫu gốc dùng Bootstrap thì chuyển đổi sang CSS Flexbox/Grid và JS DOM thuần).
   - Đặt tiền tố class CSS riêng biệt (ví dụ `.cl-<ten-mau>-*`) và dùng đường viền rõ nét.
2. **Bước 2 — Cập nhật `data/components.js` (và `data/categories.js` nếu thêm danh mục mới)**:
   - Thêm object mới đúng Schema mục 4.
3. **Bước 3 — Đồng bộ sang JSON & Chạy kiểm thử**:
   - Chạy lệnh `npm test` (tức `node tests/validate-library.mjs` — script này vừa kiểm tra tính hợp lệ, vừa có thể hỗ trợ kiểm tra đồng bộ giữa `.js` và `.json`).
4. **Bước 4 — Cập nhật tài liệu**:
   - Ghi nhận thay đổi vào `CHANGELOG.md` và cập nhật bảng kiểm kê trong `PROJECT_STATE.md`.
5. **Bước 5 — Commit & Push lên GitHub**:
   - Thực hiện `git add .`, `git commit` và `git push origin main` để cập nhật GitHub Pages.
