export const cheats = [
  {
    id: "html-heading-paragraph",
    language: "html",
    category: "Văn bản",
    title: "h1 → h6 và p",
    description:
      "Tạo tiêu đề theo cấp độ và đoạn văn để nội dung có cấu trúc rõ ràng.",
    difficulty: "Cơ bản",
    tags: ["heading", "paragraph", "text"],
    aliases: [
      "tiêu đề",
      "đoạn văn",
      "văn bản",
      "title",
      "h1 h2 h3",
      "noi dung chu"
    ],
    note:
      "Mỗi trang thường chỉ nên có một h1 chính. Dùng h2, h3 theo đúng thứ bậc nội dung.",
    commonMistake:
      "Chọn thẻ heading chỉ vì kích thước chữ. Kích thước nên chỉnh bằng CSS, cấp độ heading dùng để thể hiện cấu trúc.",
    exercise:
      "Đổi tiêu đề phụ từ h2 thành h3 và thêm một đoạn p giới thiệu sở thích của em.",
    focusTokens: {
      html: ["h1", "h2", "h3", "h4", "h5", "h6", "p"]
    },
    suggestions: [
      {
        title: "H1 kết hợp H3",
        language: "html",
        code: `<h1>Xin chào, mình là Minh</h1>
<h3>Mình đang học lập trình web</h3>`
      },
      {
        title: "H1 kết hợp H5",
        language: "html",
        code: `<h1>Xin chào, mình là Minh</h1>
<h5>Mình đang học lập trình web</h5>`
      },
      {
        title: "H2 kết hợp H3",
        language: "html",
        code: `<h2>Xin chào, mình là Minh</h2>
<h3>Mình đang học lập trình web</h3>`
      }
    ],
    htmlCode: `<main class="profile-card">
  <h1>Xin chào, mình là Minh</h1>
  <h2>Mình đang học lập trình web</h2>
  <p>
    Mục tiêu của mình là tự xây dựng một website giới thiệu bản thân bằng HTML và CSS.
  </p>
</main>`,
    cssCode: `body {
  margin: 0;
  padding: 48px;
  background: #f3f6fb;
  color: #172033;
  font-family: Arial, sans-serif;
}

.profile-card {
  max-width: 620px;
  margin: 32px auto;
  padding: 36px;
  border: 1px solid #dce2eb;
  border-radius: 18px;
  background: white;
  box-shadow: 0 16px 40px rgba(23, 32, 51, 0.08);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0 0 14px;
}

h1 {
  font-size: 38px;
}

h2 {
  color: #586174;
  font-size: 23px;
}

p {
  margin: 22px 0 0;
  color: #42506a;
  font-size: 17px;
  line-height: 1.75;
}`,
    jsCode: `// Ví dụ HTML này chưa cần JavaScript.`
  },
  {
    id: "html-basic-form",
    language: "html",
    category: "Biểu mẫu",
    title: "form, label và input",
    description:
      "Thu thập dữ liệu người dùng bằng nhãn, ô nhập và nút gửi biểu mẫu.",
    difficulty: "Cơ bản",
    tags: ["form", "input", "button"],
    aliases: [
      "biểu mẫu",
      "ô nhập",
      "nhập tên",
      "nút gửi",
      "submit",
      "label"
    ],
    note:
      "Thuộc tính for của label phải trùng với id của input để người dùng bấm vào nhãn cũng chọn được ô nhập.",
    commonMistake:
      "Quên thuộc tính name hoặc đặt button ngoài form khiến dữ liệu không được gửi đúng cách.",
    exercise:
      "Thêm một ô nhập tuổi có type=number, sau đó hiển thị tuổi trong lời chào.",
    htmlCode: `<form id="welcome-form" class="form-card">
  <h1>Đăng ký câu lạc bộ Web</h1>

  <label for="student-name">Tên của em</label>
  <input
    id="student-name"
    name="studentName"
    type="text"
    placeholder="Ví dụ: Minh Anh"
    required
  />

  <button type="submit">Tạo lời chào</button>
  <p id="form-message" aria-live="polite"></p>
</form>`,
    cssCode: `body {
  margin: 0;
  padding: 32px;
  background: #f4f7fb;
  color: #172033;
  font-family: Arial, sans-serif;
}

.form-card {
  display: grid;
  gap: 12px;
  max-width: 420px;
  margin: 20px auto;
  padding: 28px;
  border: 1px solid #dce2eb;
  border-radius: 16px;
  background: white;
}

h1 {
  margin: 0 0 10px;
  font-size: 25px;
}

label {
  font-weight: bold;
}

input,
button {
  min-height: 44px;
  padding: 0 12px;
  border-radius: 9px;
  font-size: 16px;
}

input {
  border: 1px solid #bfc8d6;
}

button {
  margin-top: 6px;
  border: 0;
  color: white;
  background: #3056d3;
  font-weight: bold;
  cursor: pointer;
}

#form-message {
  min-height: 24px;
  margin: 4px 0 0;
  color: #147a4f;
  font-weight: bold;
}`,
    jsCode: `const form = document.querySelector("#welcome-form");
const nameInput = document.querySelector("#student-name");
const message = document.querySelector("#form-message");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const studentName = nameInput.value.trim();
  message.textContent = \`Chào mừng \${studentName} đến với câu lạc bộ!\`;
});`
  },
  {
    id: "css-box-model",
    language: "css",
    category: "Box Model",
    title: "margin · border · padding",
    description:
      "Quan sát khoảng cách bên ngoài, đường viền và khoảng cách bên trong của một phần tử.",
    difficulty: "Cơ bản",
    tags: ["box model", "padding", "margin"],
    aliases: [
      "khoảng cách",
      "viền",
      "border",
      "cách lề",
      "hop css",
      "spacing"
    ],
    note:
      "Thứ tự từ ngoài vào trong là margin → border → padding → content.",
    commonMistake:
      "Quên box-sizing: border-box làm width thực tế lớn hơn giá trị đã đặt khi phần tử có padding và border.",
    exercise:
      "Kéo thanh điều chỉnh, sau đó sửa border thành 8px và quan sát kích thước phần tử.",
    htmlCode: `<main class="demo">
  <label for="padding-control">
    Padding: <strong id="padding-value">24px</strong>
  </label>
  <input id="padding-control" type="range" min="0" max="60" value="24" />

  <div class="margin-area">
    <div id="box" class="box">
      <span>Content</span>
      <small>padding nằm quanh nội dung</small>
    </div>
  </div>

  <ul class="legend">
    <li><span class="margin-dot"></span> Margin</li>
    <li><span class="border-dot"></span> Border</li>
    <li><span class="padding-dot"></span> Padding</li>
  </ul>
</main>`,
    cssCode: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 28px;
  color: #172033;
  background: #f4f7fb;
  font-family: Arial, sans-serif;
}

.demo {
  max-width: 560px;
  margin: auto;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  margin-bottom: 24px;
}

.margin-area {
  padding: 28px;
  border: 2px dashed #e39a52;
  border-radius: 14px;
  background: #fff6ea;
}

.box {
  padding: 24px;
  border: 5px solid #3056d3;
  border-radius: 10px;
  background: #dce8ff;
  text-align: center;
}

.box span,
.box small {
  display: block;
}

.box span {
  padding: 14px;
  border-radius: 7px;
  background: white;
  font-weight: bold;
}

.box small {
  margin-top: 10px;
  color: #42506a;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 0;
  list-style: none;
  font-size: 14px;
}

.legend span {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
  border-radius: 50%;
}

.margin-dot { background: #e39a52; }
.border-dot { background: #3056d3; }
.padding-dot { background: #a9c5ff; }`,
    jsCode: `const control = document.querySelector("#padding-control");
const valueText = document.querySelector("#padding-value");
const box = document.querySelector("#box");

control.addEventListener("input", function () {
  const padding = control.value + "px";
  box.style.padding = padding;
  valueText.textContent = padding;
});`
  },
  {
    id: "css-display",
    language: "css",
    category: "Layout",
    title: "display",
    description:
      "So sánh trực quan cách block, inline, inline-block và none thay đổi cách phần tử chiếm không gian.",
    difficulty: "Cơ bản",
    tags: ["display", "block", "inline"],
    aliases: [
      "display css",
      "block inline",
      "inline block",
      "ẩn phần tử",
      "an phan tu",
      "cách hiển thị",
      "cach hien thi"
    ],
    focusTokens: {
      css: ["display", "block", "inline", "inline-block", "none"]
    },
    quickActions: [
      {
        label: "Block",
        value: "block",
        description: "Mỗi phần tử bắt đầu ở một dòng mới và giữ width/height.",
        patch: { selector: ".item", property: "display", value: "block" }
      },
      {
        label: "Inline",
        value: "inline",
        description: "Các phần tử nằm cùng dòng; width/height không còn tác dụng như block.",
        patch: { selector: ".item", property: "display", value: "inline" }
      },
      {
        label: "Inline-block",
        value: "inline-block",
        description: "Nằm cùng dòng nhưng vẫn giữ width và height.",
        patch: { selector: ".item", property: "display", value: "inline-block" }
      },
      {
        label: "None",
        value: "none",
        description: "Ẩn phần tử và loại nó khỏi bố cục.",
        patch: { selector: ".item", property: "display", value: "none" }
      }
    ],
    suggestions: [
      {
        title: "Block",
        language: "css",
        code: `.item {
  display: block;
}`,
        patch: { selector: ".item", property: "display", value: "block" }
      },
      {
        title: "Inline",
        language: "css",
        code: `.item {
  display: inline;
}`,
        patch: { selector: ".item", property: "display", value: "inline" }
      },
      {
        title: "Inline-block",
        language: "css",
        code: `.item {
  display: inline-block;
}`,
        patch: { selector: ".item", property: "display", value: "inline-block" }
      },
      {
        title: "Ẩn bằng none",
        language: "css",
        code: `.item {
  display: none;
}`,
        patch: { selector: ".item", property: "display", value: "none" }
      }
    ],
    htmlCode: `<main class="display-demo">
  <section class="display-stage" aria-label="Khu vực minh họa display">
    <div class="item">A</div>
    <div class="item">B</div>
    <div class="item">C</div>
  </section>
</main>`,
    cssCode: `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 36px;
  color: #172033;
  background: #f4f7fb;
  font-family: Arial, sans-serif;
}

.display-demo {
  max-width: 760px;
  margin: auto;
}

.display-stage {
  min-height: 330px;
  padding: 24px;
  border: 2px dashed #9eabc0;
  border-radius: 16px;
  background:
    linear-gradient(#eef2f8 1px, transparent 1px),
    linear-gradient(90deg, #eef2f8 1px, transparent 1px),
    white;
  background-size: 24px 24px;
}

.item {
  display: block;
  width: 110px;
  height: 70px;
  margin: 8px;
  padding: 22px 12px;
  border-radius: 12px;
  color: white;
  background: #3056d3;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}`,
    jsCode: `// Không cần JavaScript cho demo này.
// Chỉ cần đổi giá trị display trong CSS để xem bố cục thay đổi.`
  },
  {
    id: "css-flexbox",
    language: "css",
    category: "Layout",
    title: "display: flex",
    description:
      "Sắp xếp các phần tử con theo hàng hoặc cột và điều khiển cách phân bố khoảng trống.",
    difficulty: "Cơ bản",
    tags: ["flexbox", "layout", "center"],
    aliases: [
      "căn giữa",
      "can giua",
      "xếp hàng ngang",
      "justify content",
      "align items",
      "sap xep"
    ],
    note:
      "justify-content điều khiển theo trục chính; align-items điều khiển theo trục phụ.",
    commonMistake:
      "Đặt justify-content hoặc align-items cho phần tử con thay vì flex container.",
    exercise:
      "Sửa flex-direction thành column, sau đó thử align-items: flex-end.",
    htmlCode: `<main class="demo">
  <div class="controls" aria-label="Chọn cách căn các hộp">
    <button data-align="flex-start">Bên trái</button>
    <button data-align="center" class="active">Ở giữa</button>
    <button data-align="space-between">Giãn đều</button>
  </div>

  <div id="flex-container" class="flex-container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
  </div>

  <p id="current-value">justify-content: center;</p>
</main>`,
    cssCode: `body {
  margin: 0;
  padding: 28px;
  color: #172033;
  background: #f4f7fb;
  font-family: Arial, sans-serif;
}

.demo {
  max-width: 700px;
  margin: auto;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

button {
  padding: 9px 13px;
  border: 1px solid #bdc7d6;
  border-radius: 8px;
  background: white;
  cursor: pointer;
}

button.active {
  color: white;
  border-color: #3056d3;
  background: #3056d3;
}

.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  min-height: 250px;
  padding: 18px;
  border: 2px dashed #9aa6b8;
  border-radius: 14px;
  background: white;
}

.item {
  display: grid;
  width: 76px;
  height: 76px;
  place-items: center;
  border-radius: 12px;
  color: white;
  background: #3056d3;
  font-size: 24px;
  font-weight: bold;
}

#current-value {
  padding: 12px;
  border-radius: 8px;
  color: #2446b6;
  background: #eaf0ff;
  font-family: monospace;
  text-align: center;
}`,
    jsCode: `const container = document.querySelector("#flex-container");
const valueText = document.querySelector("#current-value");
const buttons = document.querySelectorAll("[data-align]");

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const newValue = button.dataset.align;
    container.style.justifyContent = newValue;
    valueText.textContent = \`justify-content: \${newValue};\`;

    buttons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");
  });
});`
  },
  {
    id: "js-if-else",
    language: "javascript",
    category: "Điều kiện",
    title: "if / else if / else",
    description:
      "Kiểm tra điều kiện để chương trình chọn một trong nhiều hướng xử lý.",
    difficulty: "Cơ bản",
    tags: ["if else", "condition", "logic"],
    aliases: [
      "điều kiện",
      "nếu thì",
      "kiểm tra điểm",
      "so sánh",
      "nhánh",
      "decision"
    ],
    note:
      "Điều kiện được kiểm tra từ trên xuống. Khi một nhánh đúng, các nhánh phía sau sẽ không chạy.",
    commonMistake:
      "Nhầm dấu gán = với phép so sánh === hoặc sắp xếp điều kiện khiến nhánh phía dưới không bao giờ được kiểm tra.",
    exercise:
      "Thêm mức Xuất sắc khi điểm từ 9 trở lên và mức Chưa đạt khi điểm dưới 5.",
    htmlCode: `<main class="score-card">
  <h1>Xếp loại kết quả</h1>
  <label for="score">Nhập điểm từ 0 đến 10</label>
  <div class="input-row">
    <input id="score" type="number" min="0" max="10" value="8" />
    <button id="check-score">Kiểm tra</button>
  </div>
  <div id="result" class="result">Nhấn “Kiểm tra” để xem kết quả.</div>
</main>`,
    cssCode: `body {
  margin: 0;
  padding: 32px;
  color: #172033;
  background: #f4f7fb;
  font-family: Arial, sans-serif;
}

.score-card {
  max-width: 460px;
  margin: 20px auto;
  padding: 28px;
  border: 1px solid #dce2eb;
  border-radius: 16px;
  background: white;
}

h1 {
  margin-top: 0;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.input-row {
  display: flex;
  gap: 8px;
}

input,
button {
  min-height: 44px;
  border-radius: 9px;
  font-size: 16px;
}

input {
  min-width: 0;
  flex: 1;
  padding: 0 12px;
  border: 1px solid #bfc8d6;
}

button {
  padding: 0 16px;
  border: 0;
  color: white;
  background: #3056d3;
  font-weight: bold;
  cursor: pointer;
}

.result {
  margin-top: 18px;
  padding: 16px;
  border-radius: 10px;
  background: #edf1f7;
  font-weight: bold;
}

.result.good { color: #126443; background: #e3f6ed; }
.result.ok { color: #765900; background: #fff5cc; }
.result.bad { color: #9b351d; background: #ffebe5; }`,
    jsCode: `const scoreInput = document.querySelector("#score");
const checkButton = document.querySelector("#check-score");
const result = document.querySelector("#result");

checkButton.addEventListener("click", function () {
  const score = Number(scoreInput.value);
  result.className = "result";

  if (score < 0 || score > 10) {
    result.textContent = "Điểm phải nằm trong khoảng 0 đến 10.";
    result.classList.add("bad");
  } else if (score >= 8) {
    result.textContent = "Kết quả: Tốt";
    result.classList.add("good");
  } else if (score >= 5) {
    result.textContent = "Kết quả: Đạt";
    result.classList.add("ok");
  } else {
    result.textContent = "Kết quả: Cần cố gắng thêm";
    result.classList.add("bad");
  }
});`
  },
  {
    id: "js-dom-click-event",
    language: "javascript",
    category: "DOM & Events",
    title: "querySelector + click",
    description:
      "Chọn phần tử trên trang và thay đổi giao diện khi người dùng bấm nút.",
    difficulty: "Cơ bản",
    tags: ["DOM", "click", "classList"],
    aliases: [
      "bấm nút",
      "sự kiện click",
      "lấy phần tử",
      "đổi màu",
      "query selector",
      "event listener"
    ],
    note:
      "querySelector trả về phần tử đầu tiên khớp selector. addEventListener đăng ký hành động khi sự kiện xảy ra.",
    commonMistake:
      "JavaScript chạy trước khi phần tử HTML được tạo hoặc selector viết sai nên querySelector trả về null.",
    exercise:
      "Thêm một nút thứ hai để đặt lại thẻ thông báo về trạng thái ban đầu.",
    htmlCode: `<main class="demo">
  <section id="message-card" class="message-card">
    <span class="status">CHƯA KÍCH HOẠT</span>
    <h1>DOM tương tác</h1>
    <p id="message">Hãy bấm nút để thay đổi nội dung và màu sắc.</p>
    <button id="toggle-button">Kích hoạt</button>
  </section>
</main>`,
    cssCode: `body {
  margin: 0;
  padding: 32px;
  color: #172033;
  background: #f4f7fb;
  font-family: Arial, sans-serif;
}

.message-card {
  max-width: 480px;
  margin: 20px auto;
  padding: 30px;
  border: 2px solid #d6dde8;
  border-radius: 18px;
  background: white;
  transition: 200ms ease;
}

.status {
  display: inline-block;
  padding: 5px 8px;
  border-radius: 6px;
  color: #6c7484;
  background: #edf0f4;
  font-size: 12px;
  font-weight: bold;
}

h1 {
  margin-bottom: 8px;
}

p {
  color: #586174;
  line-height: 1.6;
}

button {
  padding: 11px 16px;
  border: 0;
  border-radius: 9px;
  color: white;
  background: #3056d3;
  font-weight: bold;
  cursor: pointer;
}

.message-card.active {
  color: #0c5d3c;
  border-color: #32a476;
  background: #eaf8f2;
}

.message-card.active .status {
  color: #0c5d3c;
  background: #cceedd;
}`,
    jsCode: `const card = document.querySelector("#message-card");
const status = document.querySelector(".status");
const message = document.querySelector("#message");
const button = document.querySelector("#toggle-button");

button.addEventListener("click", function () {
  const isActive = card.classList.toggle("active");

  if (isActive) {
    status.textContent = "ĐÃ KÍCH HOẠT";
    message.textContent = "Tuyệt! JavaScript vừa thay đổi DOM.";
    button.textContent = "Tắt trạng thái";
  } else {
    status.textContent = "CHƯA KÍCH HOẠT";
    message.textContent = "Hãy bấm nút để thay đổi nội dung và màu sắc.";
    button.textContent = "Kích hoạt";
  }
});`
  }
];
