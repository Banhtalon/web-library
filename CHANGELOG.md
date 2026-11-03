# Changelog

Mọi thay đổi quan trọng của dự án **Code Library** đều được ghi nhận tại tài liệu này.
Định dạng dựa trên chuẩn [Keep a Changelog](https://keepachangelog.com/vi/1.0.0/).

---

## [2.0.0] - 2026-11-03

### Đã thêm & Nâng cấp (Added & Changed)
- **Import Toàn bộ 219 Component & Template từ CodeShikhi trên cả 25 Danh mục (`data/categories.js`, `data/components.js`)**:
  - Đưa vào đầy đủ 100% số lượng thiết kế của từng danh mục: `Header & Navbar` (9 mẫu), `Button` (8 mẫu), `Hero Sections` (11 mẫu), `Carousel` (8 mẫu), `Cards` (8 mẫu), `Services` (9 mẫu), `Team Members` (9 mẫu), `History Section` (8 mẫu), `Statistics JS counters Section` (8 mẫu), `Notices` (8 mẫu), `Flash Sale` (8 mẫu), `Pricing` (8 mẫu), `Testimonials` (8 mẫu), `Table Section` (8 mẫu), `Form` (8 mẫu), `Calendar Section` (8 mẫu), `Login & Signup` (9 mẫu), `Contact` (8 mẫu), `FAQ` (8 mẫu), `Footer & BigFooter` (8 mẫu), `Newsletter` (8 mẫu), `Reviews` (10 mẫu), `Video Cards` (8 mẫu), `Home Page Full Component` (8 mẫu), `Full Page Component` (18 mẫu).
  - Tự động tách các thẻ `<style>` và `<script>` nhúng lẫn trong HTML sang đúng tab `CSS` và `JS`, loại bỏ phụ thuộc jQuery / OwlCarousel / Bootstrap JS ngoài, đồng thời bổ sung mã CSS & Vanilla JS tường minh cho từng mẫu.
- **Engine Live Preview Offline 100% Giống Hệt CodeShikhi (`js/preview-base.js`, `js/app.js`)**:
  - Tích hợp bộ CSS utility/component cục bộ + toàn bộ 152 biểu tượng `bi-*` dưới dạng SVG mask nội tuyến + bộ điều khiển tương tác Vanilla JS (`collapse`, `dropdown`, `carousel`, `tabs`, `modal`, `alert`, `toast`).
  - Hỗ trợ co giãn tỷ lệ khung nhìn Desktop (`1280px` scaled) / Mobile (`380px`) và tự động đo chiều cao nội dung (`autoHeight` bao gồm cả khi mở menu Dropdown/Collapse).
- **Khung Source Code Tô Màu Cú Pháp (Syntax Highlighting) & Định Dạng Chuẩn (`js/code-formatter.js`, `css/app.css`)**:
  - Định dạng mã nguồn 2 dấu cách (`js-beautify`) và tô màu cú pháp (`highlight.js` bảng màu GitHub Light / Dark) cho cả 3 tab `HTML`, `CSS`, `JS` kèm thanh cuộn ngang/dọc và nút `Copy code` phản hồi trạng thái `✓ Copied!`.

---

## [1.1.0] - 2026-11-03

### Đã thay đổi & Cải tiến (Changed)
- **Cải tạo Giao diện Chuẩn Bố cục CodeShikhi (`index.html`, `css/app.css`, `js/app.js`)**:
  - **Sidebar Cây Danh mục Đóng/Mở (`CATEGORIES` Accordion Tree)**: Nhấp vào tên danh mục lập tức xổ danh sách các mẫu con ngay tại cột bên trái và mở thẳng mẫu Component đầu tiên ở bên phải (trải nghiệm 1-click, không cần bấm qua nhiều trang trung gian). Mẫu đang chọn được tô nổi bật bằng nút viên thuốc màu tím Indigo (`#6c5ce7`).
  - **Thiết kế Nút Bo tròn (`border-radius: 999px`) & Tông màu Indigo (`#6c5ce7`)**: Đồng bộ hệ thống nút bấm dạng pill (`👁 Full preview`, `🖥 Desktop` / `📱 Mobile`, bộ chuyển 3 tab `HTML | CSS | JS` và nút `📋 Copy code` nền tối) kèm đường viền phân vùng thanh thoát.
  - **Tinh gọn Khu vực Chi tiết Component & Source Code**:
    - Loại bỏ nút `Tất cả mẫu (25)` trên Topbar, loại bỏ tab thứ 4 (`Full HTML`) và 2 nút thừa (`Copy Full HTML`, `Tải file .html`).
    - Thu gọn hàng tag còn tối đa 3 pill tag nhỏ gọn trong khối tiêu đề.
    - Khối `Source code` chỉ giữ đúng 3 tab (`HTML`, `CSS`, `JS`), thanh cửa sổ 3 chấm tròn macOS kèm 1 nút `📋 Copy code` duy nhất và kết thúc trang gọn gàng ngay sau khối Source code.

---

## [1.0.0] - 2026-11-03

### Đã thêm (Added)
- **Kiến trúc Web App SPA Tĩnh (`index.html`, `css/app.css`, `js/app.js`)**:
  - Thiết kế tối giản lấy cảm hứng từ CodeShikhi với **hệ thống đường viền phân vùng rõ nét (`1.5px` / `2px`)** giúp tách biệt trực quan giữa Topbar, Sidebar, Thẻ danh mục, Khung Live Preview và Khung Code.
  - Chuyển đổi giao diện **Sáng / Tối (Light / Dark Mode)** tự động lưu trạng thái trong trình duyệt.
  - Định tuyến trực tiếp bằng URL Hash (`#/`, `#/all`, `#/boilerplate`, `#/category/<slug>`, `#/component/<id>`, `#/search?q=...`) giúp tải lại trang không mất trạng thái và chia sẻ link trực tiếp trên GitHub Pages.
- **Hệ thống 25 Danh mục Song ngữ Anh – Việt (`data/categories.js`, `data/categories.json`)**:
  - Bao phủ toàn bộ 25 nhóm giao diện chuẩn: `Header & Navbar`, `Button`, `Hero Sections`, `Carousel`, `Cards`, `Services`, `Team Members`, `History Section`, `Statistics JS Counters`, `Notices`, `Flash Sale`, `Pricing`, `Testimonials`, `Table Section`, `Form`, `Calendar Section`, `Login & Signup`, `Contact`, `FAQ`, `Footer & BigFooter`, `Newsletter`, `Reviews`, `Video Cards`, `Home Page Full Component`, `Full Page Component`.
- **Kho 25 Mẫu Component & Template Khởi đầu (`data/components.js`, `data/components/index.json`)**:
  - 100% viết bằng **HTML5, CSS3 và Vanilla JavaScript** (không phụ thuộc Bootstrap hay bất kỳ thư viện ngoài nào).
  - Mỗi mẫu đều có tương tác JavaScript thực tế (đóng/mở menu mobile, trượt slide, đếm số, lọc bảng, đồng hồ đếm ngược, kiểm tra form, chuyển đổi tháng/lịch, chấm sao...).
- **Live Playground & 4 Tab Code Inspector**:
  - Khung xem trước trực tiếp trong `iframe` cô lập kèm nút chuyển đổi kích thước **Desktop (`100%`) / Tablet (`768px`) / Mobile (`375px`)** và chế độ **Toàn màn hình (Fullscreen)**.
  - **4 Tab mã nguồn**: `HTML`, `CSS`, `JavaScript` (cho phép sửa trực tiếp và cập nhật Live Preview tức thì) + tab **`Full HTML (Gộp 1 file chạy ngay)`** kèm nút **Copy** và **Tải file `.html`**.
- **Tìm kiếm Tiếng Việt Không Dấu & Phím tắt**:
  - Tìm kiếm tức thời khớp cả tiếng Việt có dấu, không dấu (`"thanh dieu huong"`, `"bang gia"`, `"dem nguoc"`) và tiếng Anh (`"navbar"`, `"pricing"`, `"countdown"`).
  - Phím tắt `/`: Nhảy vào ô tìm kiếm; `Ctrl + Enter`: Chạy lại Live Preview; `Esc`: Đóng Fullscreen hoặc xóa tìm kiếm.
- **Tài liệu Quản lý Trạng thái cho AI & Kiểm thử Tự động**:
  - Bổ sung `PROJECT_STATE.md`, `inbox/README.md` và bộ kiểm thử `tests/validate-library.mjs`.
