const git_pfp = document.getElementById("git-pfp");

git_pfp.addEventListener("click", () => {
    window.open("https://github.com/zkiwiko", "_blank", "noopener,noreferrer");
});

const transflag = document.querySelector(".transgender-flag");
transflag.addEventListener("click", () => {
    window.open(
        "https://lgbtqia.wiki/wiki/Transgender",
        "_blank",
        "noopener,noreferrer",
    );
});

const demigirlflag = document.querySelector(".demi-girl-flag");
demigirlflag.addEventListener("click", () => {
    window.open(
        "https://lgbtqia.wiki/wiki/Demigirl",
        "_blank",
        "noopener,noreferrer",
    );
});

const demisexualflag = document.querySelector(".demi-sexual-flag");
demisexualflag.addEventListener("click", () => {
    window.open(
        "https://lgbtqia.wiki/wiki/Demisexual",
        "_blank",
        "noopener,noreferrer",
    );
});

const demiromanticflag = document.querySelector(".demi-romantic-flag");
demiromanticflag.addEventListener("click", () => {
    window.open(
        "https://lgbtqia.wiki/wiki/Demiromantic",
        "_blank",
        "noopener,noreferrer",
    );
});
