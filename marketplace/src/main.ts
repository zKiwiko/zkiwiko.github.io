const sidebarButton = document.getElementById("sidebar_button");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar_overlay");

sidebarButton?.addEventListener('click', () => {
  sidebar?.classList.toggle('show');
  overlay?.classList.toggle('active');
});

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (
    sidebar?.classList.contains('show') &&
    !sidebar.contains(target) &&
    !sidebarButton?.contains(target)
  ) {
    sidebar.classList.remove('show');
    overlay?.classList.remove('active');
  }
});

document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", () => {
    document
        .querySelectorAll(".tab-button")
        .forEach((btn) => btn.classList.remove("active"));
    document
        .querySelectorAll(".tab-content")
        .forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");

    sidebar.classList.remove('show');
    overlay?.classList.remove('active');
  });
});
