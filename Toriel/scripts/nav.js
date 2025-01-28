document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll(".tab-button").forEach((button) => {
        button.addEventListener("click", () => {
            const tabId = button.dataset.tab;
            activateTab(tabId);
            location.hash = `#${tabId}`; // Use hash for navigation
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

    function getInitialTabFromHash() {
        const hash = window.location.hash.slice(1);
        return hash || 'what-is'; // Default to "what-is"
    }

    // Activate the initial tab on page load
    activateTab(getInitialTabFromHash());

    window.addEventListener('hashchange', () => {
        activateTab(getInitialTabFromHash());
    });
});
