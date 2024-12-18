const username = "zkiwiko";
const apiUrl = `https://api.github.com/users/${username}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const avatarUrl = data.avatar_url;
        document.getElementById("git_avatar").src = avatarUrl;

    })
    .catch(error => {
        console.error("Error fetching GitHub data:", error);
    });