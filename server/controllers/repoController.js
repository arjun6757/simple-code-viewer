// controllers/repoController.js

// Function to handle the /repo endpoint

let clickedRepo = "";
let defaultRepo = "";

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

const getRepoUrl = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.REPO_OWNER;
    const repo = process.env.REPO_NAME;
    defaultRepo = repo;

    // here we want to req github to access repo code

    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
    const data = await githubFetch(githubUrl, token);

    const files = data.map((file) => ({
        name: file.name,
        type: file.type,
        url: file.download_url
    }));

    return res.json(files);
};

const getDirData = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.REPO_OWNER;
    const repo = process.env.REPO_NAME;

    const path = req.params.path;

    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const data = await githubFetch(githubUrl, token);
    res.json(data);
}

const getQueryData = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.REPO_OWNER;
    const repo = clickedRepo === "" ? process.env.REPO_NAME : clickedRepo;
    const path = req.query.path;
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const data = await githubFetch(githubUrl, token);
    res.json(data);
}

const getPinnedRepos = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.REPO_OWNER;

    const GraphQLquery = `
    query {
        user (login: "${username}") {
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

const getSelectedRepoData = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.REPO_OWNER;
    const repo = req.params.selected_repo;
    clickedRepo = repo;

    // here we want to req github to access repo code
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
    const data = await githubFetch(githubUrl, token);
    
    const files = data.map((file) => ({
        name: file.name,
        type: file.type,
        url: file.download_url
    }));

    return res.json(files);
}

const getHomePageURL = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.REPO_OWNER;
    const repo = clickedRepo === "" ? defaultRepo : clickedRepo;
    const url = `https://api.github.com/repos/${owner}/${repo}`;
    const data = await githubFetch(url, token);
    res.json({ homepage_url: data.homepage })
}

export { getRepoUrl, getDirData, getQueryData, getPinnedRepos, getSelectedRepoData, getHomePageURL };