document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(".tab-button").forEach((button) => {
        button.addEventListener("click", () => {
            const tabId = button.dataset.tab;
            activateTab(tabId);
            history.pushState({ tabId }, "", `/${tabId}`);
        });
    });

    function activateTab(tabId) {
        document.querySelectorAll(".tab-button").forEach(btn => btn.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));

        const button = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        const content = document.getElementById(tabId);

        if (button && content) {
            button.classList.add("active");
            content.classList.add("active");
        }
    }

    function getInitialTabFromUrl() {
        const path = window.location.pathname.slice(1);
        return path || 'what-is'; // Default to "what-is" if no path
    }

    // Redirect if no path is set
    if (!window.location.pathname.slice(1)) {
        history.replaceState({}, "", "/what-is");
    }

    // Activate the initial tab
    activateTab(getInitialTabFromUrl());

    window.addEventListener('popstate', (event) => {
        const tabId = event.state?.tabId || getInitialTabFromUrl();
        activateTab(tabId);
    });
});
