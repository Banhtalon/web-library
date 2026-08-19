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
- Playwright E2E kiểm tra các luồng chính trên trình duyệt thật.
- GitHub Actions tự động chạy smoke/regression và E2E trên pull request vào `main` và khi push lên `main`.

## Tải và chạy dự án

Dự án dùng ES modules nên cần mở qua local server, không mở trực tiếp bằng `file://`.

```bash
git clone https://github.com/Banhtalon/web-library.git
cd web-library
npm install
npm run serve
```

Hoặc chỉ chạy web bằng Python:

```bash
cd web-library
python3 -m http.server 5500
```

Sau đó truy cập:

```text
http://localhost:5500
```

Phần ứng dụng không cần package JavaScript runtime bên ngoài; dependency npm hiện dùng cho kiểm thử E2E.

## Chạy kiểm thử

### Smoke và regression

```bash
npm test
```

Các kiểm tra chính gồm:

- Có đúng bảy chủ đề mẫu và mỗi `id` là duy nhất.
- Schema dữ liệu bắt buộc tồn tại.
- Tìm kiếm tiếng Việt không dấu hoạt động.
- Bộ lọc trả về 2 HTML, 3 CSS và 2 JavaScript.
- Preview ghép HTML/CSS/JavaScript đúng cấu trúc.
- `</style>` và `</script>` trong code người dùng được escape trước khi ghép vào `srcdoc`.
- Iframe giữ sandbox và không cấp `allow-same-origin`.
- Syntax highlighting không làm lộ markup nội bộ.
- Playground nhận trạng thái `ready/error` từ iframe.

### Playwright E2E

Cài browser Playwright khi chạy E2E lần đầu ở máy cá nhân:

```bash
npx playwright install chromium
```

Sau đó chạy:

```bash
npm run test:e2e
```

Bộ E2E hiện kiểm tra 8 luồng:

1. Tìm kiếm tiếng Việt không dấu.
2. Bộ lọc HTML/CSS/JavaScript.
3. Mở/đóng dialog và cập nhật URL hash.
4. Mở trực tiếp chủ đề từ URL hash.
5. Chuyển tab editor HTML/CSS/JavaScript.
6. Sửa CSS, chạy preview và reset code.
7. Hiển thị lỗi JavaScript bên trong sandbox preview.
8. Khả năng sử dụng catalog/dialog ở viewport mobile.

## GitHub Actions CI

Workflow `.github/workflows/ci.yml` chạy tự động khi:

- Có pull request vào `main`.
- Có push lên `main`.

Quality gate chạy theo thứ tự:

```text
npm install
→ npm test
→ npm run test:e2e
```

CI dùng Node.js 24 và Google Chrome có sẵn trên GitHub-hosted runner. Nếu E2E thất bại, Playwright report và test results được upload thành artifact để phục vụ debug.

## Cấu trúc thư mục

```text
web-library/
├── .github/
│   └── workflows/
│       └── ci.yml
├── index.html
├── package.json
├── playwright.config.mjs
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
│   ├── e2e/
│   │   └── webblocks.spec.mjs
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
