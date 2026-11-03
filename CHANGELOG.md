# Changelog

Mọi thay đổi quan trọng của dự án **Code Library** đều được ghi nhận tại tài liệu này.
Định dạng dựa trên chuẩn [Keep a Changelog](https://keepachangelog.com/vi/1.0.0/).

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
