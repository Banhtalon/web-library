# WebBlocks — Giai đoạn 0

Prototype website cheatsheet HTML, CSS và JavaScript bằng công nghệ thuần. Giai đoạn này tập trung kiểm chứng ba phần quan trọng trước khi mở rộng nội dung:

1. Hiển thị card từ dữ liệu có cấu trúc.
2. Tìm kiếm theo tiêu đề, mô tả, tag và từ đồng nghĩa tiếng Việt/không dấu.
3. Sửa và chạy HTML, CSS, JavaScript trong `iframe` có `sandbox="allow-scripts allow-forms"`.

## Chức năng đã có

- Bảy chủ đề đại diện: hai HTML, ba CSS và hai JavaScript.
- Tìm kiếm được cả `căn giữa`, `can giua`, `click`, `bấm nút`...
- Lọc theo HTML, CSS và JavaScript.
- Card được render tự động từ `data/cheats.js`.
- Hỗ trợ quick actions và các đoạn code gợi ý ở những chủ đề phù hợp.
- Ba editor HTML/CSS/JavaScript có syntax highlighting.
- Chạy code, format, đặt lại và sao chép tab hiện tại.
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

Ở Giai đoạn 0, phần ứng dụng không cần package JavaScript runtime bên ngoài.

## Chạy kiểm thử

```bash
npm test
```

Bộ test hiện tại là smoke/regression test chạy bằng Node.js. Các kiểm tra chính gồm:

- Có đúng bảy chủ đề mẫu và mỗi `id` là duy nhất.
- Schema dữ liệu bắt buộc tồn tại.
- Tìm kiếm tiếng Việt không dấu hoạt động.
- Bộ lọc trả về 2 HTML, 3 CSS và 2 JavaScript.
- Preview ghép HTML/CSS/JavaScript đúng cấu trúc.
- `</style>` và `</script>` trong code người dùng được escape trước khi ghép vào `srcdoc`.
- Iframe giữ sandbox và không cấp `allow-same-origin`.
- Syntax highlighting không làm lộ markup nội bộ.
- Playground nhận trạng thái `ready/error` từ iframe.

> Kiểm thử trình duyệt E2E cho các thao tác click, responsive và tương tác iframe chưa nằm trong Giai đoạn 0.

## Cấu trúc thư mục

```text
web-library/
├── index.html
├── package.json
├── README.md
├── css/
│   ├── styles.css
│   └── editor.css
├── data/
│   └── cheats.js
├── js/
│   ├── app.js
│   ├── playground.js
│   ├── search.js
│   └── syntax.js
├── tests/
│   ├── smoke.mjs
│   └── playground.mjs
└── docs/
    └── TEST_REPORT.md
```

## Cách thêm một chủ đề mới

Thêm một object mới vào mảng `cheats` trong `data/cheats.js`. Giao diện, bộ lọc và tìm kiếm sẽ tự nhận nội dung mới.

Các trường giao diện đang sử dụng:

- `id`: mã duy nhất, đồng thời dùng cho URL hash.
- `language`: `html`, `css` hoặc `javascript`.
- `category`: nhóm kiến thức.
- `title`, `description`, `difficulty`.
- `tags`, `aliases`: phục vụ tìm kiếm.
- `focusTokens`: token cần nhấn mạnh trong editor.
- `quickActions`, `suggestions`: thao tác thử nhanh và mẫu code gợi ý.
- `htmlCode`, `cssCode`, `jsCode`: mã chạy trong playground.

## Phím tắt

- `/`: đưa con trỏ vào ô tìm kiếm.
- `Ctrl + Enter` hoặc `Cmd + Enter`: chạy lại code khi đang ở editor.
- `Shift + Alt + F`: format tab code hiện tại.
- `Esc`: đóng cửa sổ chi tiết; khi đang ở ô tìm kiếm sẽ xóa từ khóa.

## Phạm vi Giai đoạn 0

Chưa có backend, đăng nhập, database, đồng bộ tài khoản hay trang quản trị nội dung. Đây là chủ đích để kiểm chứng trải nghiệm cốt lõi trước khi mở rộng lên MVP.
