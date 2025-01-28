const username = "zkiwiko";
const apiUrl = `https://api.github.com/users/${username}`;

const pinnedReposC = document.querySelector('.pinned-repos');
const newestReposC = document.querySelector('.newest-repos');
const githubStats = document.querySelector('.github-stats');

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const avatarUrl = data.avatar_url;
        document.getElementById("git_avatar").src = avatarUrl;
    })
    .catch(error => {
        console.error("Error fetching GitHub data:", error);
    });

async function fetchAllRepos() {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc`);
    const data = await response.json();
    return data;
}

function getPinnedRepos(allRepos) {
    const pinnedRepoNames = ["Toriel-IDE", "vscode-gpc-extension"];
    return allRepos.filter(repo => pinnedRepoNames.includes(repo.name));
}

async function fetchNewestRepos() {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=created&direction=desc`);
    const data = await response.json();
    return data.slice(0, 4);
}

async function fetchUserStats() {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    return {
        stars: data.public_repos,
        followers: data.followers
    };
}

async function displayData() {
    const allRepos = await fetchAllRepos();
    const pinnedRepos = getPinnedRepos(allRepos);

    pinnedReposC.innerHTML = pinnedRepos
        .map(repo => `
            <div class="repo-card">
                <div class="repo-header">
                    <a href="${repo.html_url}" target="_blank" class="repo-title">${repo.name}</a>
                    <p class="repo-description">${repo.description || ""}</p>
                </div>
                <div class="repo-stats">
                    ${repo.language ? `
                        <span class="repo-language" style="color: ${getLanguageColor(repo.language)}">
                            ${repo.language}
                        </span>
                    ` : ''}
                    ${repo.stargazers_count > 0 ? `
                        <span class="repo-stars">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                                <path fill="currentColor" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
                            </svg>
                            ${repo.stargazers_count}
                        </span>
                    ` : ''}
                    ${repo.forks_count > 0 ? `
                        <span class="repo-forks">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                                <path fill="currentColor" d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                            </svg>
                            ${repo.forks_count}
                        </span>
                    ` : ''}
                </div>
            </div>
        `)
        .join("");

    const newestRepos = await fetchNewestRepos();
    newestReposC.innerHTML = newestRepos
        .map(repo => `
            <div class="repo-card">
                <div class="repo-header">
                    <a href="${repo.html_url}" target="_blank" class="repo-title">${repo.name}</a>
                    <p class="repo-description">${repo.description || ""}</p>
                </div>
                <div class="repo-stats">
                    ${repo.language ? `
                        <span class="repo-language" style="color: ${getLanguageColor(repo.language)}">
                            ${repo.language}
                        </span>
                    ` : ''}
                    ${repo.stargazers_count > 0 ? `
                        <span class="repo-stars">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                                <path fill="currentColor" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
                            </svg>
                            ${repo.stargazers_count}
                        </span>
                    ` : ''}
                    ${repo.forks_count > 0 ? `
                        <span class="repo-forks">
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16">
                                <path fill="currentColor" d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                            </svg>
                            ${repo.forks_count}
                        </span>
                    ` : ''}
                </div>
            </div>
        `)
        .join("");

    const stats = await fetchUserStats();
    githubStats.innerHTML = `
        <p>Total Stars: ${stats.stars}</p>
        <p>Followers: ${stats.followers}</p>
    `;
}

function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'C++': '#f34b7d',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Julia': '#a270ba',
        'Rust': '#dea584'
    };
    return colors[language] || '#8B949E';
}

displayData();
