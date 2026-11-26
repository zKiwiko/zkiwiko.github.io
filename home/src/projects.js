const project_list = document.querySelector("[data-project-list]");
const project_card_template = document.querySelector("#project-card-template");
const repository_ids = ["kiwiko/lush", "kiwiko/eura-nes"];
const language_icon_classes = {
    rust: "lang-icon fa-brands fa-rust fa-sm fs-width-auto",
};

function get_repository_path(repository_id) {
    const [owner, repository, ...extra] = repository_id.split("/");
    if (!owner || !repository || extra.length > 0) {
        throw new Error(`Invalid repository ID: ${repository_id}`);
    }

    return [owner, repository].map(encodeURIComponent).join("/");
}

async function fetch_repository(api_url, source, stars_key, expected_host) {
    const response = await fetch(api_url, {
        headers: { Accept: "application/json" },
    });
    if (!response.ok) {
        throw new Error(`${source} returned HTTP ${response.status}`);
    }

    const data = await response.json();
    const stars = data?.[stars_key];
    if (
        typeof data?.name !== "string" ||
        typeof data.html_url !== "string" ||
        !Number.isInteger(stars) ||
        !Number.isInteger(data.forks_count) ||
        !Number.isInteger(data.open_issues_count)
    ) {
        throw new Error(`${source} returned incomplete repository data`);
    }

    const repository_url = new URL(data.html_url);
    if (
        repository_url.protocol !== "https:" ||
        repository_url.hostname !== expected_host
    ) {
        throw new Error(`${source} returned an unexpected repository URL`);
    }

    return {
        name: data.name,
        description:
            typeof data.description === "string" ? data.description : "",
        language: typeof data.language === "string" ? data.language : "Unknown",
        stars,
        forks: data.forks_count,
        issues: data.open_issues_count,
        url: repository_url.href,
    };
}

function render_stat(card, key, value, singular, plural) {
    const formatted_count = value.toLocaleString();
    card.querySelector(`[data-repo-${key}]`).textContent = formatted_count;
    card.querySelector(`[data-repo-stat="${key}"]`).setAttribute(
        "aria-label",
        `${formatted_count} ${value === 1 ? singular : plural}`,
    );
}

function render_repository(card, repository) {
    card.querySelector("[data-repo-name]").textContent = repository.name;
    card.querySelector("[data-repo-description]").textContent =
        repository.description || "No description provided.";
    const language_icon = card.querySelector("[data-repo-language-icon]");
    const icon_classes =
        language_icon_classes[repository.language.toLowerCase()];
    language_icon.className = icon_classes || "";
    language_icon.hidden = !icon_classes;
    if (icon_classes) {
        language_icon.setAttribute("aria-label", repository.language);
        language_icon.title = repository.language;
    }

    render_stat(card, "stars", repository.stars, "star", "stars");
    render_stat(card, "forks", repository.forks, "fork", "forks");
    render_stat(card, "issues", repository.issues, "open issue", "open issues");
    card.querySelector("[data-repo-link]").href = repository.url;
}

async function load_repository(card) {
    const repository_id = card.dataset.repoId;

    try {
        const path = get_repository_path(repository_id);
        let repository;

        try {
            repository = await fetch_repository(
                `https://codeberg.org/api/v1/repos/${path}`,
                "Codeberg",
                "stars_count",
                "codeberg.org",
            );
        } catch (codeberg_error) {
            console.warn(
                `Codeberg repository "${repository_id}" was unavailable; trying GitHub.`,
                codeberg_error,
            );

            repository = await fetch_repository(
                `https://api.github.com/repos/${path}`,
                "GitHub",
                "stargazers_count",
                "github.com",
            );
        }

        render_repository(card, repository);
        card.hidden = false;
    } catch (error) {
        console.error(
            `Could not load "${repository_id}" from Codeberg or GitHub.`,
            error,
        );
        card.hidden = true;
    }
}

for (const repository_id of repository_ids) {
    const card =
        project_card_template.content.firstElementChild.cloneNode(true);
    card.dataset.repoId = repository_id;
    project_list.append(card);
    load_repository(card);
}
