document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('menu-button');
    const sidebar = document.getElementById('sidebar');
    const body = document.body;

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body.appendChild(overlay);

    button.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });

    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = this.closest('.dropdown').querySelector('.dropdown-menu');
            dropdownMenu.classList.toggle('active');
        });
    });
});