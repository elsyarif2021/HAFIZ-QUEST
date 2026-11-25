// This fragment is consumed after a language selection. Shared language links open normally.
const languageChangeFragment = "#language-changed";
const skipOpeningForLanguageChange = location.hash === languageChangeFragment;
if (skipOpeningForLanguageChange) {
  const url = new URL(location.href);
  url.hash = "";
  history.replaceState(history.state, "", url);
}

const interfaceLanguage = (() => {
  const available = ["id", "en", "ar"];
  const requested = new URL(location.href).searchParams.get("lang");
  let saved;
  try { saved = localStorage.getItem("hq_language"); } catch { /* Storage may be unavailable. */ }
  const language = [requested, saved, navigator.language.split("-")[0]].find(value =>
    available.includes(value)
  ) ?? "id";
  if (available.includes(requested)) {
    try { localStorage.setItem("hq_language", language); } catch { /* The URL still preserves the choice. */ }
  }
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  return language;
})();

function tr(source, ...values) {
  const template = Array.isArray(source);
  const original = template
    ? source.map((part, index) => part + (index < values.length ? `QQ${index}QQ` : "")).join("")
    : source;
  const key = original.trim().replace(/\s+/g, " ");
  const translation = interfaceMessages[interfaceLanguage]?.[key];
  const localized = typeof translation === "string"
    ? original.replace(/\S[\s\S]*\S|\S/, () => translation)
    : original;
  return template ? localized.replace(/QQ(\d+)QQ/g, (_, index) => values[Number(index)]) : localized;
}

(() => {
  if (interfaceLanguage !== "id") {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement.closest("script, style, [data-no-i18n], [lang='ar']:not(html)")
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) walker.currentNode.data = tr(walker.currentNode.data);
    document.title = tr(document.title);
    document.querySelectorAll("[title], [placeholder], [aria-label]").forEach(element => {
      ["title", "placeholder", "aria-label"].forEach(attribute => {
        if (element.hasAttribute(attribute)) {
          element.setAttribute(attribute, tr(element.getAttribute(attribute)));
        }
      });
    });
  }

  document.querySelectorAll("[data-language-select]").forEach(select => {
    select.value = interfaceLanguage;
    select.setAttribute("aria-label", tr("Bahasa antarmuka"));
    select.addEventListener("change", () => {
      const url = new URL(location.href);
      url.searchParams.set("lang", select.value);
      url.hash = languageChangeFragment;
      location.replace(url);
    });
  });
  document.querySelectorAll("#toggle-music, #toggle-narrator").forEach(button => {
    button.dataset.labelOn = tr("Aktif");
    button.dataset.labelOff = tr("Mati");
  });
})();
