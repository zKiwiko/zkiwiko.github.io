document.addEventListener('DOMContentLoaded', function () {
    // Handle main tabs
    document.querySelectorAll(".tab-button").forEach((button) => {
        button.addEventListener("click", () => {
            activateTab(button.dataset.tab);
            window.location.hash = button.dataset.tab; // Update hash
        });
    });

    // Function to activate tabs by ID
    function activateTab(tabId) {
        document
            .querySelectorAll(".tab-button")
            .forEach((btn) => btn.classList.remove("active"));
        document
            .querySelectorAll(".tab-content")
            .forEach((content) => content.classList.remove("active"));

        const button = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        const content = document.getElementById(tabId);

        if (button && content) {
            button.classList.add("active");
            content.classList.add("active");
        }
    }

    // Activate initial tab based on hash or default to 'what-is'
    const initialTab = window.location.hash ? window.location.hash.substring(1) : 'what-is';
    activateTab(initialTab);
});
