const VOID_TAGS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
  "meta", "param", "source", "track", "wbr"
]);

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function token(className, value) {
  return `<span class="syntax-${className}">${escapeHtml(value)}</span>`;
}

function highlightHtmlAttributes(source) {
  const pattern = /(\s+)([^\s=/>]+)(?:(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+))?/g;
  let result = "";
  let cursor = 0;
  let match;

  while ((match = pattern.exec(source))) {
    result += escapeHtml(source.slice(cursor, match.index));
    result += escapeHtml(match[1]);
    result += token("attribute", match[2]);

    if (match[3]) {
      result += token("punctuation", match[3]);
      result += token("string", match[4]);
    }

    cursor = match.index + match[0].length;
  }

  return result + escapeHtml(source.slice(cursor));
}

function highlightHtml(code, focusTokens = []) {
  const focusSet = new Set(focusTokens.map((name) => String(name).toLowerCase()));
  const htmlPattern = /<!--[\s\S]*?-->|<![^>]*>|<\/?[A-Za-z][^>]*>/g;
  let result = "";
  let cursor = 0;
  let match;

  while ((match = htmlPattern.exec(code))) {
    result += escapeHtml(code.slice(cursor, match.index));
    const rawToken = match[0];

    if (rawToken.startsWith("<!--")) {
      result += token("comment", rawToken);
    } else if (rawToken.startsWith("<!")) {
      result += token("doctype", rawToken);
    } else {
      const tagMatch = rawToken.match(/^(<\/?)([A-Za-z][\w:-]*)([\s\S]*?)(\/?>)$/);

      if (!tagMatch) {
        result += escapeHtml(rawToken);
      } else {
        const [, opening, tagName, attributes, closing] = tagMatch;
        const tagClass = focusSet.has(tagName.toLowerCase()) ? "focus-tag" : "tag";

        result += token("punctuation", opening);
        result += token(tagClass, tagName);
        result += highlightHtmlAttributes(attributes);
        result += token("punctuation", closing);
      }
    }

    cursor = match.index + rawToken.length;
  }

  return result + escapeHtml(code.slice(cursor));
}

function highlightCss(code, focusTokens = []) {
  const focusSet = new Set(focusTokens.map((name) => String(name).toLowerCase()));
  const pattern = /(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(@[\w-]+)|(#(?:[\da-fA-F]{3,8})\b)|(\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|vmin|vmax|s|ms|deg)?\b)|([\w-]+)(?=\s*:)|([.#]?[A-Za-z_-][\w-]*)(?=\s*\{)|(\b[A-Za-z_-][\w-]*\b)/g;
  let result = "";
  let cursor = 0;
  let match;

  while ((match = pattern.exec(code))) {
    result += escapeHtml(code.slice(cursor, match.index));

    if (match[1]) result += token("comment", match[1]);
    else if (match[2]) result += token("string", match[2]);
    else if (match[3]) result += token("keyword", match[3]);
    else if (match[4]) result += token("color", match[4]);
    else if (match[5]) result += token("number", match[5]);
    else if (match[6]) {
      result += token(
        focusSet.has(match[6].toLowerCase()) ? "focus-css" : "property",
        match[6]
      );
    } else if (match[7]) result += token("selector", match[7]);
    else {
      result += token(
        focusSet.has(match[8].toLowerCase()) ? "focus-css" : "css-value",
        match[8]
      );
    }

    cursor = match.index + match[0].length;
  }

  return result + escapeHtml(code.slice(cursor));
}

function highlightJavaScript(code) {
  const keywords = new Set([
    "async", "await", "break", "case", "catch", "class", "const", "continue",
    "default", "delete", "do", "else", "export", "extends", "false", "finally",
    "for", "from", "function", "if", "import", "in", "instanceof", "let", "new",
    "null", "of", "return", "static", "super", "switch", "this", "throw", "true",
    "try", "typeof", "undefined", "var", "void", "while", "yield"
  ]);
  const pattern = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|(`(?:\\.|[^`\\])*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_$][\w$]*\b)/g;
  let result = "";
  let cursor = 0;
  let match;

  while ((match = pattern.exec(code))) {
    result += escapeHtml(code.slice(cursor, match.index));

    if (match[1]) result += token("comment", match[1]);
    else if (match[2]) result += token("string", match[2]);
    else if (match[3]) result += token("number", match[3]);
    else {
      const word = match[4];
      const isFunctionCall = /^\s*\(/.test(code.slice(match.index + word.length));
      if (keywords.has(word)) result += token("keyword", word);
      else if (isFunctionCall) result += token("function", word);
      else result += escapeHtml(word);
    }

    cursor = match.index + match[0].length;
  }

  return result + escapeHtml(code.slice(cursor));
}

export function highlightCode(code, language, focusTokens = []) {
  if (language === "html") return highlightHtml(code, focusTokens);
  if (language === "css") return highlightCss(code, focusTokens);
  if (language === "javascript") return highlightJavaScript(code);
  return escapeHtml(code);
}

function serializeAttributes(element) {
  return [...element.attributes]
    .map((attribute) => ` ${attribute.name}="${attribute.value}"`)
    .join("");
}

function serializeHtmlNode(node, depth = 0) {
  const indentation = "  ".repeat(depth);

  if (node.nodeType === Node.COMMENT_NODE) {
    return `${indentation}<!--${node.textContent.trim()}-->`;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.replace(/\s+/g, " ").trim();
    return text ? `${indentation}${text}` : "";
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return "";

  const tagName = node.tagName.toLowerCase();
  const attributes = serializeAttributes(node);
  const openingTag = `<${tagName}${attributes}>`;

  if (VOID_TAGS.has(tagName)) {
    return `${indentation}<${tagName}${attributes} />`;
  }

  const children = [...node.childNodes].filter(
    (child) => child.nodeType !== Node.TEXT_NODE || child.textContent.trim()
  );

  if (children.length === 0) return `${indentation}${openingTag}</${tagName}>`;

  const onlyText = children.every((child) => child.nodeType === Node.TEXT_NODE);
  const inlineText = node.textContent.replace(/\s+/g, " ").trim();
  if (onlyText && inlineText.length <= 100) {
    return `${indentation}${openingTag}${inlineText}</${tagName}>`;
  }

  const content = children
    .map((child) => serializeHtmlNode(child, depth + 1))
    .filter(Boolean)
    .join("\n");

  return `${indentation}${openingTag}\n${content}\n${indentation}</${tagName}>`;
}

function formatHtml(code) {
  const template = document.createElement("template");
  template.innerHTML = code.trim();
  return [...template.content.childNodes]
    .map((node) => serializeHtmlNode(node))
    .filter(Boolean)
    .join("\n");
}

function formatBraceLanguage(code) {
  let result = "";
  let indentLevel = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  let parenthesisDepth = 0;
  let atLineStart = true;

  const indent = () => "  ".repeat(Math.max(indentLevel, 0));
  const write = (value) => {
    if (atLineStart && value !== "\n") {
      result += indent();
      atLineStart = false;
    }
    result += value;
  };
  const newline = () => {
    result = result.replace(/[ \t]+$/g, "");
    if (!result.endsWith("\n")) result += "\n";
    atLineStart = true;
  };

  for (let index = 0; index < code.length; index += 1) {
    const char = code[index];
    const next = code[index + 1];

    if (lineComment) {
      write(char);
      if (char === "\n") {
        lineComment = false;
        atLineStart = true;
      }
      continue;
    }

    if (blockComment) {
      write(char);
      if (char === "*" && next === "/") {
        write(next);
        index += 1;
        blockComment = false;
      }
      continue;
    }

    if (quote) {
      write(char);
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }

    if (char === "/" && next === "/") {
      write("//");
      index += 1;
      lineComment = true;
      continue;
    }

    if (char === "/" && next === "*") {
      write("/*");
      index += 1;
      blockComment = true;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      write(char);
      continue;
    }

    if (char === "(") {
      parenthesisDepth += 1;
      write(char);
      continue;
    }

    if (char === ")") {
      parenthesisDepth = Math.max(parenthesisDepth - 1, 0);
      write(char);
      continue;
    }

    if (char === "{") {
      result = `${result.replace(/[ \t]+$/g, "")} {`;
      indentLevel += 1;
      newline();
      continue;
    }

    if (char === "}") {
      indentLevel = Math.max(indentLevel - 1, 0);
      newline();
      write("}");
      if (next && ![";", ",", ")", "]"].includes(next)) newline();
      continue;
    }

    if (char === ";" && parenthesisDepth === 0) {
      write(";");
      newline();
      continue;
    }

    if (char === "\n") {
      if (!atLineStart) newline();
      continue;
    }

    if (/\s/.test(char)) {
      if (!atLineStart && !result.endsWith(" ") && !result.endsWith("\n")) result += " ";
      continue;
    }

    write(char);
  }

  return result.trim();
}

export function formatCode(language, code) {
  if (!String(code).trim()) return "";
  if (language === "html") return formatHtml(code);
  if (language === "css" || language === "javascript") return formatBraceLanguage(code);
  return String(code).trim();
}
