import data from "./data/i18n.json" with { type: "json" };

export class i18n {
    static get_language() {
        const locale = navigator.language;
        if (locale.toLowerCase().startsWith("zh")) {
            return /-(?:hant|tw|hk|mo)(?:-|$)/i.test(locale)
                ? "zh-Hant"
                : "zh-Hans";
        }

        const language = locale.split("-")[0].toLowerCase();
        return data.name[language] ? language : "en";
    }

    static reload(language = this.get_language()) {
        for (const [key, translations] of Object.entries(data)) {
            const element = document.getElementById(key);
            if (!element) {
                continue;
            }

            const translation = translations[language];
            if (typeof translation !== "string") {
                throw new Error(`Missing "${language}" translation for "${key}"`);
            }

            element.textContent = translation;
        }
    }
}
