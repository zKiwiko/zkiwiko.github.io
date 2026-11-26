const tab_list = document.querySelector(".tab-list");
const buttons = tab_list.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".tab-content");

tab_list.addEventListener("click", (event) => {
    const button = event.target.closest(".tab-button");
    if (!button) return;

    for (const tab_button of buttons) {
        tab_button.setAttribute("aria-pressed", tab_button === button);
    }

    for (const panel of panels) {
        panel.classList.toggle("active", panel.dataset.tabContent === button.dataset.tab);
    }
});

const osu_mode_list = document.querySelector(".osu-mode-list");
const osu_mode_buttons = osu_mode_list.querySelectorAll(".osu-mode-button");
const osu_mode_panels = document.querySelectorAll(".osu-mode-panel");

osu_mode_list.addEventListener("click", (event) => {
    const button = event.target.closest(".osu-mode-button");
    if (!button) return;

    for (const mode_button of osu_mode_buttons) {
        mode_button.setAttribute("aria-pressed", mode_button === button);
    }

    for (const panel of osu_mode_panels) {
        panel.classList.toggle(
            "active",
            panel.dataset.osuModePanel === button.dataset.osuMode,
        );
    }
});
