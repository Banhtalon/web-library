/**
 * Pure Vanilla Preview Helpers (v2.1)
 * All 219 components carry self-contained Semantic HTML, Consolidated Vanilla CSS, and Vanilla JS
 * directly in data/components.js — no Bootstrap runtime or external stylesheet is needed.
 */
(function (root) {
  "use strict";

  root.CL_PREVIEW_BASE_CSS = "";
  root.CL_PREVIEW_BASE_JS = [
    'document.addEventListener("click", function (e) {',
    '  var a = e.target && e.target.closest ? e.target.closest(\'a[href="#"]\') : null;',
    '  if (a && !a.hasAttribute("data-toggle") && !a.hasAttribute("data-slide") && !a.hasAttribute("data-slide-to") && !a.hasAttribute("data-dismiss")) {',
    '    e.preventDefault();',
    '  }',
    '});'
  ].join("\n");
  root.CL_BUILD_COMPONENT_CSS = function (comp) {
    if (!comp) return "";
    return String(comp.css || comp.css_code || "").trim();
  };
})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this);
