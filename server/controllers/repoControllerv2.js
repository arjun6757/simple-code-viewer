const githubFetch = async (url, token, method = "GET", body = null) => {
    const options = {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null, //will only be used for POST or PUT requests
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`GitHub API Error! status: ${response.status} ${response.statusText}`);
        }
        return await response.json(); // returns promise made from response
    } catch (error) {
        console.error(`Error fetching from GitHub: ${error.message}`);
        throw error;
    }
}

export const getDirectoryContent = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    const { repo, owner, path = "" } = req.query; //default value for path so that it works even if it isn't there
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const data = await githubFetch(url, token);
    res.json(data);
}


export const searchForQuery = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    const query = req.query.q;
    const url = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=asc&per_page=8`;
    const data = await githubFetch(url, token);

    const files = data.items.map((file) => ({
        owner: file.owner.login,
        name: file.name,
        full_name: file.full_name,
        url: file.url
    }));

    res.json(files);
}


export const getPinnedRepos = async (req, res) => {
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

    try {
        const url = 'https://api.github.com/graphql';
        const responseData = await githubFetch(url, token, "POST", { query: GraphQLquery });
        res.json(responseData);
    } catch (error) {
        console.error('Error fetching pinned repos: ', error);
        return null;
    }
}

export const getHomePageURL = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    const { owner, repo } = req.query;
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    const data = await githubFetch(url, token);
    res.json({ homepage_url: data.homepage })
}
