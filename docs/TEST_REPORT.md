# Báo cáo kiểm thử Giai đoạn 0

## Kiểm thử tự động hiện có

Bộ test hiện tại chạy bằng Node.js qua `npm test`, gồm smoke test và regression test cho dữ liệu, search, playground và syntax highlighting.

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

## Chưa được kiểm thử E2E tự động

Các luồng sau hiện mới được kiểm tra thủ công hoặc chưa có browser automation chính thức:

- Render card trên trình duyệt thật ở desktop/mobile.
- Click mở/đóng dialog chi tiết.
- Điều hướng trực tiếp bằng URL hash.
- Tương tác nút bên trong sandbox iframe.
- Sửa CSS rồi xác nhận preview thay đổi bằng browser assertion.
- Reset code rồi xác nhận preview trở về trạng thái ban đầu.
- Kiểm tra DOM click bằng thao tác người dùng thực tế.

Các luồng này sẽ được bổ sung bằng Playwright ở bước kiểm thử E2E.

## Kết quả hiện tại

Bộ smoke/regression test hiện tại đạt theo phạm vi kiểm tra nói trên.
