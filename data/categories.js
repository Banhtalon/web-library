/**
 * Danh sách 25 danh mục chuẩn của Code Library (Song ngữ Anh - Việt)
 * Đồng bộ với data/categories.json
 */
(function (root) {
  const categories = [
    {
      slug: "header",
      order: 1,
      nameEn: "Header & Navbar",
      nameVi: "Thanh điều hướng",
      icon: "🧭",
      description: "Thanh menu đầu trang đa năng, hỗ trợ menu con và nút hamburger cho thiết bị di động.",
      keywords: ["header", "navbar", "navigation", "menu", "top bar", "thanh dieu huong", "menu ngang", "dau trang"]
    },
    {
      slug: "button",
      order: 2,
      nameEn: "Button",
      nameVi: "Nút bấm tương tác",
      icon: "🔘",
      description: "Bộ sưu tập các kiểu nút bấm hiện đại: nút chính, viền mảnh, hiệu ứng sóng (ripple) và trạng thái tải.",
      keywords: ["button", "cta", "click", "ripple", "loading button", "nut bam", "nut nhan", "hanh dong"]
    },
    {
      slug: "hero",
      order: 3,
      nameEn: "Hero Sections",
      nameVi: "Khối mở đầu trang",
      icon: "🚀",
      description: "Khối giới thiệu nổi bật đầu trang kèm tiêu đề lớn, nút kêu gọi hành động (CTA) và thẻ số liệu.",
      keywords: ["hero", "banner", "intro", "landing", "cta", "khoi mo dau", "gioi thieu dau trang", "bia trang"]
    },
    {
      slug: "carousel",
      order: 4,
      nameEn: "Carousel",
      nameVi: "Trình chiếu trượt",
      icon: "🎠",
      description: "Khung trình chiếu ảnh và nội dung chuyển động mượt mà kèm nút điều hướng, chấm chỉ mục và tự động chạy.",
      keywords: ["carousel", "slider", "slideshow", "gallery", "trinh chieu", "slide anh", "truot ngang"]
    },
    {
      slug: "cards",
      order: 5,
      nameEn: "Cards",
      nameVi: "Thẻ nội dung",
      icon: "🗂️",
      description: "Khung thẻ chứa nội dung linh hoạt cho bài viết, khóa học, sản phẩm kèm nhãn trạng thái và bộ lọc.",
      keywords: ["card", "box", "product card", "blog card", "grid", "the noi dung", "the san pham", "khung the"]
    },
    {
      slug: "services",
      order: 6,
      nameEn: "Services",
      nameVi: "Lưới dịch vụ",
      icon: "🛠️",
      description: "Bố cục lưới giới thiệu các dịch vụ, giải pháp chuyên nghiệp kèm biểu tượng và bảng chi tiết.",
      keywords: ["services", "features", "solutions", "grid", "dich vu", "tinh nang", "giai phap"]
    },
    {
      slug: "team",
      order: 7,
      nameEn: "Team Members",
      nameVi: "Đội ngũ nhân sự",
      icon: "👥",
      description: "Khối giới thiệu thành viên đội ngũ với ảnh đại diện, vai trò, bộ lọc phòng ban và liên kết hồ sơ.",
      keywords: ["team", "members", "staff", "profile", "authors", "doi ngu", "nhan su", "thanh vien"]
    },
    {
      slug: "history-section",
      order: 8,
      nameEn: "History Section",
      nameVi: "Dòng thời gian & Lịch sử",
      icon: "⏳",
      description: "Dòng thời gian (Timeline) trình bày các cột mốc phát triển, lịch sử hình thành hoặc lộ trình dự án.",
      keywords: ["history", "timeline", "milestones", "roadmap", "lich su", "dong thoi gian", "cot moc", "lo trinh"]
    },
    {
      slug: "statistics-counters",
      order: 9,
      nameEn: "Statistics JS Counters",
      nameVi: "Bộ đếm số liệu JS",
      icon: "📈",
      description: "Khối thống kê số liệu ấn tượng với hiệu ứng nhảy số tự động bằng JavaScript thuần.",
      keywords: ["statistics", "counter", "numbers", "metrics", "kpi", "thong ke", "bo dem so", "nhay so"]
    },
    {
      slug: "notices",
      order: 10,
      nameEn: "Notices",
      nameVi: "Bảng thông báo & Tin chạy",
      icon: "📢",
      description: "Bảng thông báo cho trường học, doanh nghiệp kèm thanh chữ chạy (ticker), lọc loại tin và tìm kiếm.",
      keywords: ["notices", "announcement", "bulletin", "ticker", "alert", "thong bao", "bang tin", "tin chay"]
    },
    {
      slug: "flash-sale",
      order: 11,
      nameEn: "Flash Sale",
      nameVi: "Khuyến mãi & Đếm ngược",
      icon: "⚡",
      description: "Khối chương trình giảm giá chớp nhoáng kèm đồng hồ đếm ngược thời gian thực và thanh tiến độ số lượng.",
      keywords: ["flash sale", "countdown", "discount", "offer", "promo", "khuyen mai", "dem nguoc", "giam gia"]
    },
    {
      slug: "pricing",
      order: 12,
      nameEn: "Pricing",
      nameVi: "Bảng giá dịch vụ",
      icon: "💳",
      description: "Bảng so sánh các gói cước dịch vụ có công tắc chuyển đổi thanh toán theo Tháng / Năm tự động tính giá.",
      keywords: ["pricing", "plans", "subscription", "billing", "packages", "bang gia", "goi cuoc", "chi phi"]
    },
    {
      slug: "testimonials",
      order: 13,
      nameEn: "Testimonials",
      nameVi: "Ý kiến khách hàng",
      icon: "💬",
      description: "Khối trích dẫn đánh giá, nhận xét thực tế từ học viên và khách hàng kèm bộ lọc chuyển đổi.",
      keywords: ["testimonials", "quotes", "feedback", "client stories", "y kien khach hang", "nhan xet", "phan hoi"]
    },
    {
      slug: "table-section",
      order: 14,
      nameEn: "Table Section",
      nameVi: "Bảng dữ liệu & Bộ lọc",
      icon: "📊",
      description: "Bảng dữ liệu chuẩn mực có thanh tìm kiếm nhanh, sắp xếp theo cột và nhãn trạng thái trực quan.",
      keywords: ["table", "data grid", "sort", "filter", "list", "bang du lieu", "danh sach", "sap xep"]
    },
    {
      slug: "form",
      order: 15,
      nameEn: "Form",
      nameVi: "Biểu mẫu nhập liệu",
      icon: "📝",
      description: "Biểu mẫu đăng ký/tuyển sinh đa trường kèm kiểm tra dữ liệu hợp lệ (validation) trực tiếp bằng JS.",
      keywords: ["form", "input", "validation", "admission", "registration", "bieu mau", "nhap lieu", "dang ky"]
    },
    {
      slug: "calendar-section",
      order: 16,
      nameEn: "Calendar Section",
      nameVi: "Lịch học thuật & Sự kiện",
      icon: "📅",
      description: "Lịch tháng tương tác cho phép chuyển tháng/năm và xem danh sách sự kiện, lịch thi hoặc ngày nghỉ.",
      keywords: ["calendar", "schedule", "events", "academic calendar", "planner", "lich", "su kien", "lich hoc"]
    },
    {
      slug: "login",
      order: 17,
      nameEn: "Login & Signup",
      nameVi: "Đăng nhập & Đăng ký",
      icon: "🔐",
      description: "Khung xác thực tài khoản cho phép chuyển tab Đăng nhập / Đăng ký, ẩn/hiện mật khẩu và kiểm tra lỗi.",
      keywords: ["login", "signup", "register", "auth", "password", "dang nhap", "dang ky", "tai khoan"]
    },
    {
      slug: "contact",
      order: 18,
      nameEn: "Contact",
      nameVi: "Liên hệ & Hỗ trợ",
      icon: "📬",
      description: "Khối thông tin liên hệ kết hợp biểu mẫu gửi tin nhắn trực tiếp kèm thông báo trạng thái phản hồi.",
      keywords: ["contact", "support", "message", "address", "helpdesk", "lien he", "gui tin nhan", "ho tro"]
    },
    {
      slug: "faq",
      order: 19,
      nameEn: "FAQ",
      nameVi: "Câu hỏi thường gặp",
      icon: "❓",
      description: "Danh sách câu hỏi thường gặp dạng đóng/mở (Accordion) mượt mà kèm ô lọc câu hỏi nhanh.",
      keywords: ["faq", "accordion", "questions", "answers", "help", "cau hoi thuong gap", "hoi dap", "dong mo"]
    },
    {
      slug: "footer",
      order: 20,
      nameEn: "Footer & BigFooter",
      nameVi: "Chân trang đầy đủ",
      icon: "⚓",
      description: "Chân trang nhiều cột chứa liên kết điều hướng, thông tin bản quyền, chọn ngôn ngữ và nút lên đầu trang.",
      keywords: ["footer", "bigfooter", "bottom", "sitemap", "copyright", "chan trang", "cuoi trang", "ban quyen"]
    },
    {
      slug: "newsletter",
      order: 21,
      nameEn: "Newsletter",
      nameVi: "Đăng ký nhận bản tin",
      icon: "✉️",
      description: "Khối thu thập email nhận bản tin cập nhật kèm chọn chủ đề quan tâm và kiểm tra định dạng email.",
      keywords: ["newsletter", "subscribe", "email capture", "digest", "ban tin", "nhan email", "dang ky tin"]
    },
    {
      slug: "reviews",
      order: 22,
      nameEn: "Reviews",
      nameVi: "Đánh giá xếp hạng sao",
      icon: "⭐",
      description: "Hệ thống tổng hợp điểm xếp hạng 5 sao, thanh tỷ lệ phần trăm từng mức sao và khung gửi đánh giá mới.",
      keywords: ["reviews", "ratings", "stars", "score", "product review", "danh gia", "xep hang sao", "cham diem"]
    },
    {
      slug: "video-cards",
      order: 23,
      nameEn: "Video Cards",
      nameVi: "Thẻ phát Video & Playlist",
      icon: "🎬",
      description: "Bố cục trình phát video nổi bật kết hợp danh sách bài học (Playlist) chuyển đổi trực tiếp khi bấm.",
      keywords: ["video", "playlist", "media", "player", "course video", "the video", "danh sach phat", "bai giang"]
    },
    {
      slug: "home-page-full",
      order: 24,
      nameEn: "Home Page Full Component",
      nameVi: "Mẫu Trang chủ hoàn chỉnh",
      icon: "🏠",
      description: "Bản ghép hoàn chỉnh một Trang chủ gồm Header, Hero, Số liệu, Lưới tính năng và Footer trong một mẫu.",
      keywords: ["home page", "landing page", "full home", "starter page", "trang chu hoan chinh", "mau trang chu"]
    },
    {
      slug: "full-page-com",
      order: 25,
      nameEn: "Full Page Component",
      nameVi: "Trang Web hoàn chỉnh Copy & Paste",
      icon: "🌐",
      description: "Mẫu trang web cổng thông tin/khóa học hoàn chỉnh từ đầu đến cuối, sẵn sàng copy 1 lần và chạy ngay.",
      keywords: ["full page", "complete website", "template", "all in one", "trang web hoan chinh", "mau nguyen trang"]
    }
  ];

  if (typeof module !== "undefined" && module.exports) {
    module.exports = categories;
  }
  root.CODE_LIBRARY_CATEGORIES = categories;
})(typeof globalThis !== "undefined" ? globalThis : window);
