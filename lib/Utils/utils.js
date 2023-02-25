import { colorsList, wordsList } from "../Themes/themes.js";
// Hàm $ nhận vào một CSS selector và một thông báo lỗi (nếu có)
const $ = (selector, errorMessage) => {
    // Kiểm tra selector có phải là một chuỗi hợp lệ
    if (typeof selector !== "string" || selector.trim() === "") {
        html("h1", "error", "Invalid selector");
    }
    const element = document.querySelector(selector);
    // Nếu không tìm thấy phần tử, ném ra lỗi với thông báo được cung cấp hoặc mặc định
    if (!element) {
        throw new Error(
            errorMessage || `No element found matching selector: ${selector}`
        );
    }
    // Trả về phần tử đầu tiên tìm thấy được
    return element;
};
// Hàm $$ nhận vào một CSS selector và một thông báo lỗi (nếu có)
const $$ = (selector, errorMessage) => {
    // Kiểm tra selector có phải là một chuỗi hợp lệ
    if (typeof selector !== "string" || selector.trim() === "") {
        html("h1", "error", "Invalid selector");
    }
    const elements = document.querySelectorAll(selector);
    // Nếu không tìm thấy phần tử, ném ra lỗi với thông báo được cung cấp hoặc mặc định
    if (elements.length === 0) {
        throw new Error(
            errorMessage || `No elements found matching selector: ${selector}`
        );
    }
    // Chuyển đổi NodeList thành một mảng và trả về mảng các phần tử tìm thấy
    return Array.from(elements);
};
// Hàm html nhận vào một tên thẻ HTML và một chuỗi văn bản (tùy chọn)
const html = (tag, className, text) => {
    // Nếu tên thẻ không hợp lệ, ném ra lỗi
    if (!tag || typeof tag !== "string") {
        html("h1", "error", "Invalid tag name");
    }
    // Tạo một phần tử với tên thẻ được cung cấp
    const element = document.createElement(tag);
    // Nếu có chuỗi văn bản được cung cấp, thiết lập nội dung cho phần tử
    if (text) {
        element.textContent = text;
    }
    // Nếu có tên lớp được cung cấp, thêm lớp cho phần tử
    if (className) {
        element.classList.add(className);
    }
    // Thêm phần tử vào cuối thẻ body và trả về phần tử
    $("body").appendChild(element);
    return element;
};
// Hàm css nhận vào một CSS selector, một thuộc tính CSS và một giá trị CSS
const css = (selector, property, value) => {
    // Lấy ra các phần tử tương ứng với selector
    const elements = $(
        selector,
        `No element matches the selector "${selector}"`
    );
    // Nếu các phần tử là một mảng (nghĩa là có nhiều phần tử khớp với selector),
    // áp dụng thuộc tính và giá trị của style vào từng phần tử trong mảng bằng forEach
    if (elements instanceof Array) {
        elements.forEach((el) => (el.style[property] = value));
    } else {
        // Nếu phần tử không phải là một mảng (nghĩa là chỉ có một phần tử khớp với selector),
        // áp dụng thuộc tính và giá trị của style trực tiếp vào phần tử
        elements.style[property] = value;
    }
};
// hàm RandomColor trả về một màu ngẫu nhiên từ một mảng các màu
const RandomColor = () => {
    const colors = colorsList
    return colors[Math.floor(Math.random() * colors.length)];
};
// Hàm log để in ra giá trị của một biến hoặc một đối tượng JSON dưới dạng code hiển thị trên website
const log = (data) => {
    if (data === undefined) {
        // Nếu giá trị truyền vào là undefined thì throw error
        html("h1", "error", "data cannot be undefined");
    } else {
        // Tạo phần tử pre và code để chứa dữ liệu
        const preElement = html("pre");
        const codeElement = html("code");
        let Data;
        // Kiểm tra xem data có phải là JSON hay không
        try {
            JSON.parse(data);
            Data = JSON.stringify(JSON.parse(data), null, 2);
        } catch (error) {
            // Nếu không phải JSON, kiểm tra xem data có phải là Array hoặc Object không
            if (Array.isArray(data) || typeof data === "object") {
                Data = JSON.stringify(data, null, 2);
            } else {
                Data = String(data);
            }
        }
        // Nếu data là Array hoặc Object, in ra theo định dạng JSON
        if (Array.isArray(data) || typeof data === "object") {
            codeElement.innerText = Data;
        } else {
            // Nếu không phải Array hoặc Object, chuyển đổi data sang String và highlight các từ khóa
            preElement.classList.add("code");
            const words = wordsList
            const regex = new RegExp(
                Object.keys(words).join("|") + "|[^\w\s]",
                "gi"
            );
            const stack = [];
            const highlightedData = Data.replace(regex, (match) => {
                if (words.hasOwnProperty(match)) {
                    // Nếu match là từ khóa thì highlight nó
                    return `<span style="color:${words[match].color}">${match}</span>`;
                } else if (/[(){}\[\]]/.test(match)) {
                    // Nếu match là dấu ngoặc hoặc dấu ngoặc vuông, tạo random màu cho chúng
                    let randomColor = RandomColor();
                    if (match === "(" || match === "{" || match === "[") {
                        stack.push(randomColor);
                        return `<span style="color:${randomColor}">${match}</span>`;
                    } else {
                        let color = stack.pop() || RandomColor();
                        return `<span style="color:${color}">${match}</span>`;
                    }
                } else {
                    // Nếu không phải trường hợp nào trên thì trả lại match
                    return match;
                }
            });
            codeElement.innerHTML = highlightedData;
        }
        // Append phần tử code vào phần tử pre, sau đó append pre vào body
        preElement.appendChild(codeElement);
        $("body").appendChild(preElement);
    }
};
export { $, $$, html, css, log };