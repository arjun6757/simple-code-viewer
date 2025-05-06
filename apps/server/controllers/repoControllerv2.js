async function githubFetch(url, token, method = "GET", body = null) {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: body ? JSON.stringify(body) : null
        });

        if (!response.ok) {
            throw new Error(
                `GitHub API Error! status: ${response.status} ${response.statusText}`,
            );
        }
        return await response.json(); // returns promise made from response
    } catch (error) {
        console.error(`Error fetching from GitHub: ${error.message}`);
        throw error;
    }
};

export async function getDirectoryContent(req, res) {
    const token = process.env.GITHUB_TOKEN;
    const { repo, owner, path = "" } = req.query;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    try {
        const data = await githubFetch(url, token);
        res.status(200).json({ data });
    } catch (err) {
        console.error(err || "Error occured while fetching directory content");
        res.status(500).json({
            message:
                err.message ||
                "Something went wrong while fetching directory content",
        });
    }
}

export async function searchForQuery(req, res) {
    const token = process.env.GITHUB_TOKEN;
    const query = req.query.q;
    const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=asc&per_page=8`;

    try {
        const data = await githubFetch(url, token);
        const files = data.items.map((file) => ({
            owner: file.owner.login,
            name: file.name,
            full_name: file.full_name,
            url: file.url,
        }));
        res.status(200).json({ data: files });
    } catch (err) {
        console.error(err || "Error occured while fetching query");
        res.status(500).json({
            message: err.message || "Error occured while fetching query",
        });
    }
}

export async function getPinnedRepos(req, res) {
    const token = process.env.GITHUB_TOKEN;
    const { user } = req.query;

    const GraphQLquery = `
    query {
        user (login: "${user}") {
            pinnedItems(first: 6, types: [REPOSITORY]) {
                edges {
                    node {
                        ... on Repository {
                            name
                            url
                        }
                    }
                }
            }
        }
    }`;

    const url = "https://api.github.com/graphql";

    try {
        const responseData = await githubFetch(url, token, "POST", {
            query: GraphQLquery,
        });
        res.status(200).json({ data: responseData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || "Error while fetching pinned repos" })
    }
}

export async function getHomePageURL(req, res) {
    const token = process.env.GITHUB_TOKEN;
    const { owner, repo } = req.query;
    const url = `https://api.github.com/repos/${owner}/${repo}`;

    try {
        const data = await githubFetch(url, token);
        res.status(200).json({ data: { homepage_url: data.homepage } });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message || "Error while fetching homepage" })
    }
}
