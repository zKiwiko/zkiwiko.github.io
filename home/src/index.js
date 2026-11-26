import { i18n } from "./i18n.js";

const language_buttons = document.querySelectorAll(".languages button[data-lang]");

function set_language(language) {
    i18n.reload(language);
    document.documentElement.lang = language;

    for (const button of language_buttons) {
        button.setAttribute("aria-pressed", button.dataset.lang === language);
    }
}

for (const button of language_buttons) {
    button.addEventListener("click", () => {
        set_language(button.dataset.lang);
    });
}

set_language(i18n.get_language());
