// controllers/repoController.js

// Function to handle the /repo endpoint
const getRepoUrl = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.REPO_OWNER;
    const repo = process.env.REPO_NAME;

    // here we want to req github to access repo code

    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    }

    const result = await fetch(githubUrl, options);
    const data = await result.json();
    console.log(data);
    // res.send(data);

    const files = data.map((file) => ({
        name: file.name,
        type: file.type,
        url: file.download_url
    }));

    console.log(files);

    return res.json(files);
};

const getDirData = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.REPO_OWNER;
    const repo = process.env.REPO_NAME;

    const path = req.params.path;

    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    }

    const result = await fetch(githubUrl, options);
    const data = await result.json();
    res.json(data);
}

const getQueryData = async (req, res) => {
    console.log('im in the getQueryData function');
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.REPO_OWNER;
    const repo = process.env.REPO_NAME;

    const path = req.query.path;
    console.log(req.query);
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    }

    const result = await fetch(githubUrl, options);
    const data = await result.json();
    console.log(data);
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

    /*
        this query retrieves the first 5 pinned items in the user's profile and returns the name and url of the repositories
        using the GitHub GraphQL API
    */

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ query: GraphQLquery }),
        });

        if (!response.ok) {
            throw new Error(`Github API error: ${response.statusText}`)
        }

        const responseData = await response.json();
        // console.log(responseData);
        res.json(responseData);
        // return responseData.data.user.pinnedItems.edges.map(edge => edge.node);
    } catch (error) {
        console.error('Error fetching pinned repos: ', error);
        return null;
    }
}

export { getRepoUrl, getDirData, getQueryData, getPinnedRepos };