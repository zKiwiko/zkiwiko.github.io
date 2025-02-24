document.querySelectorAll('.dropdown-header').forEach(el => {
    el.addEventListener('click', e => {
        const dropdown = el.parentElement;
        dropdown.classList.toggle('active');
    })
});

function handleAnchor() {
    const anc = window.location.hash;
    if(anc) {
        const targetDropdown = document.querySelector(anc);
        if(targetDropdown) {
            targetDropdown.classList.add('active');
            targetDropdown.scrollIntoView({behavior: 'smooth'});
        }
    }
}

handleAnchor();

window.addEventListener('hashchange', handleAnchor);
