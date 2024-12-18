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

    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownMenu.classList.toggle('active');
    });
});