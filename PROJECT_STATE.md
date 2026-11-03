# PROJECT_STATE.md — Trạng thái & Kiến trúc Dự án (Dành cho AI & Developer)

> **Hướng dẫn cho AI ở các phiên làm việc tiếp theo**:
> Hãy đọc file `PROJECT_STATE.md` này và `CHANGELOG.md` đầu tiên trước khi thêm Component/Template mới hoặc nâng cấp tính năng.

---

## 1. Thông tin Tổng quan Dự án
- **Tên dự án**: **Code Library** (Kho 219 Component & Template trên 25 danh mục chuẩn HTML5 / CSS3 / Vanilla JS)
- **Thư mục làm việc**: `d:\MY PROJECT\REA\projects\code-library`
- **GitHub Repository**: `https://github.com/Banhtalon/web-library` (Nhánh chính: `main`)
- **GitHub Pages (Live Demo)**: `https://banhtalon.github.io/web-library/`
- **Phiên bản hiện tại**: `v2.0.0` (Cập nhật ngày `2026-11-03` — Import trọn bộ 219 Component của CodeShikhi + Syntax Highlighted Source Code)

---

## 2. Triết lý & Nguyên tắc Thiết kế Cốt lõi
1. **Đầy đủ 219 Mẫu trên 25 Danh mục & Chạy Offline 100%**:
   - Toàn bộ 219 thiết kế từ 25 danh mục của CodeShikhi đã được chuẩn hóa sạch sẽ thành 3 phần `HTML`, `CSS`, `JS` riêng biệt (không còn thẻ `<style>` hay `<script>` trộn lẫn trong HTML, không phụ thuộc jQuery hay CDN bên ngoài).
   - `js/preview-base.js` đóng gói sẵn hệ thống CSS layout, 152 biểu tượng SVG (`bi-*`) nội tuyến và bộ xử lý tương tác Vanilla JS (`collapse`, `dropdown`, `carousel`, `tabs`, `modal`, `toast`, `alert`) giúp **output hiển thị trong Live Preview giống hệt 100% với bản gốc**.
2. **Giao diện Chuẩn Bố cục CodeShikhi & Khung Code Tô Màu Cú Pháp Đẹp Mắt**:
   - Cột trái `CATEGORIES` hiển thị cây 25 danh mục kèm số lượng mẫu thực tế (`Header & Navbar 9`, `Button 8`, `Hero Sections 11`...). Bấm vào danh mục sẽ xổ danh sách mẫu con và mở ngay mẫu đầu tiên (1-click flow).
   - Khung **Live preview** hỗ trợ co giãn khung nhìn Desktop (`1280px` scaled) / Mobile (`380px`) và tự động co giãn chiều cao (`autoHeight`).
   - Khung **Source code** sử dụng `js/code-formatter.js` (`js-beautify` 2 spaces + `highlight.js`) để hiển thị mã nguồn có màu sắc cú pháp chuẩn GitHub Light / Dark kèm thanh cuộn ngang/dọc và nút `Copy code`.

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
│   └── app.css                 # Hệ thống giao diện + bảng màu Syntax Highlighting (.hljs-*)
├── js/
│   ├── preview-base.js         # Bộ CSS cơ sở, 152 SVG icons & Vanilla JS interactive runtime cho Live Preview
│   ├── code-formatter.js       # Bộ định dạng code (js-beautify) & tô màu cú pháp (highlight.js)
│   └── app.js                  # Hash Router, Cây danh mục 219 mẫu, Scaled LivePreview, Copy code
├── data/
│   ├── categories.js           # Dữ liệu 25 danh mục (UMD: window.CODE_LIBRARY_CATEGORIES & module.exports)
│   ├── categories.json         # Bản JSON đồng bộ 100% từ categories.js
│   ├── components.js           # Dữ liệu 219 mẫu (UMD: window.CODE_LIBRARY_COMPONENTS & module.exports)
│   └── components/
│       └── index.json          # Bản JSON đồng bộ 100% từ components.js
├── inbox/
│   └── README.md               # Thư mục nơi người dùng thả file mẫu/ảnh/code mới để AI xử lý
└── tests/
    └── validate-library.mjs    # Script kiểm tra tính toàn vẹn 25 danh mục & 219 component
```

---

## 4. Kiểm kê 25 Danh mục & 219 Mẫu (`v2.0.0`)

| STT | Category Slug | Tên Danh mục (EN — VI) | Số lượng mẫu |
| :---: | :--- | :--- | :---: |
| 1 | `header` | Header & Navbar — Thanh điều hướng & Header | **9** |
| 2 | `button` | Button — Nút bấm tương tác | **8** |
| 3 | `hero` | Hero Sections — Khối mở đầu trang (Hero) | **11** |
| 4 | `Carousel` | Carousel — Trình chiếu ảnh trượt | **8** |
| 5 | `cards` | Cards — Thẻ nội dung (Cards) | **8** |
| 6 | `services` | Services — Khối Dịch vụ & Tính năng | **9** |
| 7 | `team` | Team Members — Đội ngũ nhân sự | **9** |
| 8 | `history-section` | History Section — Dòng thời gian & Lịch sử | **8** |
| 9 | `Statistics-JS-counters-Section` | Statistics JS counters Section — Bộ đếm số liệu JS | **8** |
| 10 | `Notices` | Notices — Bảng thông báo & Tin chạy | **8** |
| 11 | `flash-sale` | Flash Sale — Khuyến mãi chớp nhoáng | **8** |
| 12 | `pricing` | Pricing — Bảng giá dịch vụ | **8** |
| 13 | `testimonials` | Testimonials — Đánh giá khách hàng | **8** |
| 14 | `Table-Section` | Table Section — Bảng dữ liệu | **8** |
| 15 | `form` | Form — Biểu mẫu nhập liệu | **8** |
| 16 | `Calendar-Section` | Calendar Section — Lịch & Sự kiện | **8** |
| 17 | `login` | Login & Signup — Đăng nhập & Đăng ký | **9** |
| 18 | `contact` | Contact — Liên hệ & Bản đồ | **8** |
| 19 | `faq` | FAQ — Câu hỏi thường gặp (FAQ) | **8** |
| 20 | `footer` | Footer & BigFooter — Chân trang (Footer) | **8** |
| 21 | `newsletter` | Newsletter — Đăng ký nhận bản tin | **8** |
| 22 | `reviews` | Reviews — Xếp hạng & Nhận xét | **10** |
| 23 | `video-cards` | Video Cards — Thẻ trình chiếu Video | **8** |
| 24 | `Home-Page-Full-Component` | Home Page Full Component — Bố cục Trang chủ đầy đủ | **8** |
| 25 | `full-page-com` | Full Page Component — Mẫu Trang Web hoàn chỉnh | **18** |
| **Tổng** | **25 Danh mục** | **Đầy đủ 100% kho mẫu CodeShikhi** | **219 mẫu** |
