# WebBlocks — Giai đoạn 0

Prototype website cheatsheet HTML, CSS và JavaScript bằng công nghệ thuần. Giai đoạn này tập trung kiểm chứng ba phần quan trọng trước khi mở rộng nội dung:

1. Hiển thị card từ dữ liệu có cấu trúc.
2. Tìm kiếm theo tiêu đề, mô tả, tag và từ đồng nghĩa tiếng Việt/không dấu.
3. Sửa và chạy HTML, CSS, JavaScript trong `iframe` có `sandbox="allow-scripts"`.

## Chức năng đã có

- Sáu chủ đề đại diện: hai HTML, hai CSS và hai JavaScript.
- Tìm kiếm được cả `căn giữa`, `can giua`, `click`, `bấm nút`...
- Lọc theo HTML, CSS và JavaScript.
- Card được render tự động từ `data/cheats.js`.
- Màn hình chi tiết gồm ghi nhớ, lỗi thường gặp và thử thách nhỏ.
- Ba editor HTML/CSS/JavaScript.
- Chạy code, đặt lại và sao chép tab hiện tại.
- Preview tương tác thật trong sandbox iframe.
- URL trực tiếp theo dạng `#css-flexbox` hoặc `#js-dom-click-event`.
- Responsive cho desktop và mobile.
- Hiển thị lỗi JavaScript ngay trong khu vực preview.

## Tải và chạy dự án

Dự án dùng ES modules nên cần mở qua local server, không mở trực tiếp bằng `file://`.

```bash
git clone https://github.com/Banhtalon/web-library.git
cd web-library
npm run serve
```

Hoặc không dùng npm:

```bash
cd web-library
python3 -m http.server 5500
```

Sau đó truy cập:

```text
http://localhost:5500
```

Dự án không cần cài package JavaScript nào.

## Chạy kiểm thử

```bash
npm test
```

Bài kiểm thử xác nhận:

- Có đúng sáu chủ đề mẫu.
- Mỗi `id` là duy nhất.
- Các trường dữ liệu bắt buộc tồn tại.
- Tìm kiếm tiếng Việt không dấu hoạt động.
- Mỗi ngôn ngữ có đúng hai nội dung mẫu.

## Cấu trúc thư mục

```text
web-library/
├── index.html
├── package.json
├── README.md
├── css/
│   └── styles.css
├── data/
│   └── cheats.js
├── js/
│   ├── app.js
│   ├── playground.js
│   └── search.js
├── tests/
│   └── smoke.mjs
└── docs/
    └── TEST_REPORT.md
```

## Cách thêm một chủ đề mới

Thêm một object mới vào mảng `cheats` trong `data/cheats.js`. Giao diện, bộ lọc và tìm kiếm sẽ tự nhận nội dung mới.

Các trường đang sử dụng:

- `id`: mã duy nhất, đồng thời dùng cho URL hash.
- `language`: `html`, `css` hoặc `javascript`.
- `category`: nhóm kiến thức.
- `title`, `description`, `difficulty`.
- `tags`, `aliases`: phục vụ tìm kiếm.
- `note`, `commonMistake`, `exercise`.
- `htmlCode`, `cssCode`, `jsCode`: mã chạy trong playground.

## Phím tắt

- `/`: đưa con trỏ vào ô tìm kiếm.
- `Ctrl + Enter` hoặc `Cmd + Enter`: chạy lại code khi đang ở editor.
- `Esc`: đóng cửa sổ chi tiết; khi đang ở ô tìm kiếm sẽ xóa từ khóa.

## Phạm vi Giai đoạn 0

Chưa có backend, đăng nhập, database, đồng bộ tài khoản hay trang quản trị nội dung. Đây là chủ đích để kiểm chứng trải nghiệm cốt lõi trước khi mở rộng lên MVP.
