// controllers/repoController.js

// Function to handle the /repo endpoint
const getRepoUrl = async (req, res) => {
    const token = process.env.GITHUB_TOKEN;
    // const owner = process.env.REPO_OWNER;
    // const repo = 'todoappinreact';

    const owner = 'flowmodor'; const repo = 'flowmodor';


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
    console.log('im in the getDirData function');
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.REPO_OWNER;
    const repo = 'todoappinreact';
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
    // const owner = process.env.REPO_OWNER;
    // const repo = 'todoappinreact';
    const owner = 'flowmodor'; const repo = 'flowmodor';
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

export { getRepoUrl, getDirData, getQueryData };