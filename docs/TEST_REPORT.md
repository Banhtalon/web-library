# Báo cáo kiểm thử Giai đoạn 0

## Tổng quan

WebBlocks hiện có hai lớp kiểm thử tự động:

1. Smoke/regression test chạy bằng Node.js qua `npm test`.
2. Browser E2E test chạy bằng Playwright qua `npm run test:e2e`.

Cả hai lớp được chạy tự động trong GitHub Actions khi có pull request vào `main` hoặc push lên `main`.

## 1. Smoke và regression test

### Dữ liệu và tìm kiếm

- Kiểm tra có đúng 7 chủ đề đại diện.
- Kiểm tra mỗi `id` là duy nhất.
- Kiểm tra các trường dữ liệu bắt buộc tồn tại.
- Tìm kiếm `can giua` trả về `display: flex`.
- Tìm kiếm `bấm nút` trả về `querySelector + click`.
- Bộ lọc trả về đúng 2 HTML, 3 CSS và 2 JavaScript.
- Kiểm tra `css-display` và `css-flexbox` không bị trùng nội dung.

### Playground và an toàn preview

- Ghép HTML, CSS và JavaScript thành tài liệu preview có `<!doctype html>`.
- Có vùng hiển thị lỗi JavaScript trong preview.
- Preview gửi trạng thái `ready` về trang chính.
- Escape thẻ đóng `</style>` và `</script>` trước khi ghép code người dùng vào `srcdoc`.
- Iframe dùng `sandbox="allow-scripts allow-forms"`.
- Không cấp `allow-same-origin` cho iframe.
- Playground nạp preview bằng `frame.srcdoc`.
- Trang chính lắng nghe thông báo `ready/error` từ preview.

### Syntax highlighting và cấu trúc source

- Highlight token HTML trọng tâm đúng class.
- Markup do highlighter sinh ra không bị highlight lặp lại.
- `app.js` không hard-code dữ liệu demo trùng với `data/cheats.js`.
- `editor.css` được load trực tiếp từ `index.html`.
- Không còn phụ thuộc vào `cleanup.css`.

## 2. Playwright E2E

Bộ E2E chạy trên trình duyệt thật và hiện có 8 test:

1. Tìm kiếm tiếng Việt không dấu: `can giua` trả về `display: flex`.
2. Lọc catalog theo HTML, CSS và JavaScript với số lượng đúng.
3. Mở dialog từ card, cập nhật URL hash và đóng dialog sạchly.
4. Mở trực tiếp chủ đề bằng URL hash.
5. Chuyển giữa ba tab editor HTML/CSS/JavaScript.
6. Sửa `display` trong CSS, chạy lại preview và reset về code ban đầu.
7. Gây lỗi JavaScript và xác nhận lỗi xuất hiện trong sandbox preview.
8. Kiểm tra catalog và dialog ở viewport mobile 390×844.

Các test thay đổi preview có cơ chế chờ iframe reload trước khi assertion để tránh race condition khi `srcdoc` được cập nhật.

## 3. GitHub Actions CI

Workflow: `.github/workflows/ci.yml`.

Môi trường kiểm thử hiện tại:

- GitHub-hosted runner: Ubuntu 24.04.
- `actions/checkout@v7`.
- `actions/setup-node@v7`.
- Node.js 24.
- Playwright chạy bằng Google Chrome có sẵn trên runner.
- Quyền `GITHUB_TOKEN` giới hạn ở `contents: read`.

Thứ tự quality gate:

```text
npm install
→ npm test
→ npm run test:e2e
```

Nếu Playwright thất bại, workflow upload `playwright-report/` và `test-results/` thành artifact trong 7 ngày để phục vụ debug.

## 4. Kết quả xác minh trên GitHub Actions

Run cuối đã xác minh thành công:

- Workflow run: `32280777875`.
- Smoke/regression: PASS.
- Playwright E2E: **8/8 PASS**.
- Thời gian Playwright trong run cuối: khoảng **11.8 giây**.
- `npm install`: 0 vulnerabilities được báo cáo trong run.
- Failure artifact step được skip đúng vì toàn bộ test đều đạt.

Trước khi đạt trạng thái xanh, E2E đã phát hiện hai vấn đề trong chính bài test: một race condition khi iframe reload và một assertion vượt quá hành vi UI thực tế. Hai test đã được chỉnh để đồng bộ với vòng đời iframe và kiểm tra đúng hành vi sản phẩm; không cần thay đổi logic ứng dụng.

## Kết luận

Quality gate của Giai đoạn 0 hiện đã hoạt động đầy đủ: kiểm tra cấu trúc/dữ liệu bằng Node.js và kiểm tra luồng người dùng chính bằng trình duyệt thật. Trạng thái CI cuối cùng trên branch kiểm thử là PASS.
