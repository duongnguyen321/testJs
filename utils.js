// Hàm $ nhận vào một CSS selector và một thông báo lỗi (nếu có)
const $ = (selector, errorMessage) => {
    // Kiểm tra selector có phải là một chuỗi hợp lệ
    if (typeof selector !== "string" || selector.trim() === "") {
        throw new Error("Invalid selector");
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
        throw new Error("Invalid selector");
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
const html = (tag, text) => {
    // Nếu tên thẻ không hợp lệ, ném ra lỗi
    if (!tag || typeof tag !== "string") {
        throw new Error("Invalid tag name");
    }
    // Tạo một phần tử với tên thẻ được cung cấp
    const element = document.createElement(tag);
    // Nếu có chuỗi văn bản được cung cấp, thiết lập nội dung cho phần tử
    if (text) {
        element.textContent = text;
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
const RandomColor = () => {
    const colors = [
        "#bd93f9",
        "#ff6bcb",
        "#f8f8f2",
        "#20E3B2",
        "#9a86fd",
        "#8be9fd",
        "#ffb86c",
        "#f1fa8c"
    ]
    return colors[Math.floor(Math.random() * colors.length)];
};

const log = (data) => {
    if (data === undefined) {
        throw new Error("Giá trị không thể là undefined");
    } else {
        const preElement = html("pre");
        const codeElement = html("code");
        let Data;
        if (Array.isArray(data) || typeof data === "object") {
            Data = JSON.stringify(data, null, 2);
            codeElement.innerText = Data;
        } else {
            Data = String(data);
            preElement.classList.add("code");
            const words = {
                Error: { color: "#ff5555" },
                Array: { color: "#8be9fd" },
                innerHTML: { color: "#8be9fd" },
                innerText: { color: "#8be9fd" },
                Object: { color: "#8be9fd" },
                isArray: { color: "#20E3B2" },
                keys: { color: "#20E3B2" },
                join: { color: "#20E3B2" },
                replace: { color: "#20E3B2" },
                test: { color: "#20E3B2" },
                push: { color: "#20E3B2" },
                pop: { color: "#20E3B2" },
                stringify: { color: "#20E3B2" },
                appendChild: { color: "#20E3B2" },
                function: { color: "#20E3B2" },
                null: { color: "#8be9fd80" },
                true: { color: "#bd93f9" },
                false: { color: "#bd93f9" },
                new: { color: "#bd93f9" },
                throw: { color: "#bd93f9" },
                const: { color: "#bd93f9" },
                let: { color: "#bd93f9" },
                var: { color: "#bd93f9" },
                undefined: { color: "#ffb86c" },
                string: { color: "#f1fa8c" },
            };
            const regex = new RegExp(
                Object.keys(words).join("|") + "|[^\w\s]",
                "gi"
            );
            const stack = [];
            const highlightedData = Data.replace(regex, (match) => {
                if (words.hasOwnProperty(match)) {
                    return `<span style="color:${words[match].color}">${match}</span>`;
                } else if (/[(){}\[\]]/.test(match)) {
                    let randomColor = RandomColor();
                    if (match === "(" || match === "{" || match === "[") {
                        stack.push(randomColor);
                        return `<span style="color:${randomColor}">${match}</span>`;
                    } else {
                        let color = stack.pop() || RandomColor();
                        return `<span style="color:${color}">${match}</span>`;
                    }
                } else {
                    return match;
                }
            });
            codeElement.innerHTML = highlightedData;
        }
        preElement.appendChild(codeElement);
        $("body").appendChild(preElement);
    }
};

export { $, $$, html, css, log };