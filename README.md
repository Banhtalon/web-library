# Web Library Hub (`Banhtalon/web-library`)

Cổng tổng hợp **3 ứng dụng web tĩnh** trên cùng một repository và GitHub Pages (`https://banhtalon.github.io/web-library/`):

| Đường dẫn | Ứng dụng | Công nghệ | Mô tả |
| :--- | :--- | :--- | :--- |
| `/` (`./`) | **Trang chủ Portal** | HTML · CSS · Vanilla JS | Giới thiệu tổng quan, lọc nhanh và mở từng web app |
| `/code-library/` | **Code Library** | Pure Vanilla HTML/CSS/JS | Kho 220 component thuần (25 danh mục), LivePreview sandbox & HTML5 Starter |
| `/ayroui/` | **Ayro UI Library** | Next.js 14 (static export) · Bootstrap 5 | 31 danh mục, 259 biến thể component Bootstrap 5, Docs & Pricing |
| `/goi-ten/` | **Gọi Tên Ngẫu Nhiên** | React 18 · Vite 6 · Tailwind CSS v4 | Ứng dụng gọi tên học sinh ngẫu nhiên, trò chơi lớp học & chia nhóm |

## Cấu trúc thư mục

```text
code-library/ (repo Banhtalon/web-library)
├── .nojekyll               # Cho phép GitHub Pages phục vụ ayroui/_next/
├── index.html              # Trang chủ Portal giới thiệu 3 web
├── assets/
│   ├── portal.css
│   ├── portal.js
│   └── portal-nav.js       # Thanh nút "Portal" nổi chuyển nhanh giữa 3 web
├── code-library/           # Web 1: Vanilla Component Library (220 mẫu)
├── ayroui/                 # Web 2: Static export từ ../code-library-ayroui/out
├── goi-ten/                # Web 3: Build từ ../Web_goi_ten/dist
└── scripts/
    ├── build-portal.mjs    # Build lại ayroui & goi-ten rồi đồng bộ vào repo
    ├── serve-portal.mjs    # Server local mô phỏng GitHub Pages (/web-library/)
    └── validate-portal.mjs # Kiểm tra thư viện + HTML + toàn bộ HTTP route
```

## Lệnh phát triển & kiểm thử

Chạy trong thư mục `code-library/`:

```bash
npm run build   # Build ../code-library-ayroui & ../Web_goi_ten và đồng bộ vào ./ayroui, ./goi-ten
npm test        # Chạy validate-library.mjs + kiểm tra đường dẫn & HTTP route
npm start       # Mở local preview tại http://127.0.0.1:3080/web-library/
```
