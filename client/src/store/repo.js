import { create } from "zustand";

export const useRepo = create((set, get) => ({
    // currentlyFocusing: '',
    reponame: "todoappinreact",
    owner: "arjun6757", // by default these two values will be passed from the frontend
    files: [],
    repos: [],
    FolderStructure: [],
    setFolderStructure: (FolderStructure) => set({ FolderStructure: FolderStructure }),
    loading: false,
    error: null,
    focusingFile: null,
    innerText: "",
    loadingInnerText: false,
    errorInnerText: null,
    loadingPinned: false,
    errorPinned: null,
    setOwner: (owner) => set({ owner }),
    fetchFile: async (downloadLink) => {
        set({ innerText: "", loadingInnerText: true, error: null });
        try {
            const response = await fetch(`/api/file?link=${downloadLink}`);
            const text = await response.text();
            console.log(text);
            set({ innerText: text });
        } catch (err) {
            set({ errorInnerText: err.message || "Failed to fetch file" });
        } finally {
            set({ loadingInnerText: false });
        }
    },

    fetchDirectoryContent: async (name, path) => {
        set({ loading: true, error: null });
        try {
            const { owner, reponame } = get();
            // the logic is that only childrens has path but the root directory
            // is not a child of any other directory so
            const url = path
                ? `/api/contents?owner=${owner}&repo=${reponame}&path=${path}`
                : `/api/contents?owner=${owner}&repo=${reponame}&path=${name}`;

            const response = await fetch(url);
            const result = await response.json();
            set((state) => [...state.FolderStructure, result]);
        } catch (err) {
            set({
                error: err.message || "Failed to fetch directory content",
            });
        } finally {
            set({ loading: false });
        }
    },

    fetchPinned: async () => {
        set({ repos: [], loadingPinned: true, error: null });
        try {
            const { owner } = get();
            const response = await fetch(`/api/pinned?user=${owner}`);
            const result = await response.json();
            const edges = result.data.user.pinnedItems.edges;
            set({ repos: edges });
        } catch (err) {
            set({
                errorPinned: err.message || "Failed to fetch pinned repositories",
            });
        } finally {
            set({ loadingPinned: false });
        }
    },

    fetchDefault: async () => {
        set({ files: [], loading: true, error: null });
        try {
            const { owner, reponame } = get();
            const response = await fetch(
                `/api/contents?owner=${owner}&repo=${reponame}`,
            );
            const result = await response.json();
            set({ files: result });
        } catch (err) {
            set({
                error: err.message || "Failed to fetch default repository",
            });
        } finally {
            set({ loading: false });
        }
    },

    fetchSelected: async (selected) => {
        set({ files: [], loading: true, error: null });
        try {
            const { owner } = get();
            const response = await fetch(
                `/api/contents?repo=${selected}&owner=${owner}`,
            );
            const result = await response.json();
            set({ files: result });
        } catch (err) {
            set({
                error: err.message || "Failed to fetch selected repository",
            });
        } finally {
            set({ loading: false });
        }

    },
}));

/* 
import { create } from "zustand";

export const useRepo = create((set, get) => ({
    reponame: 'defaultreponame',
    owner: 'defaultownername', // Default values passed from the frontend
    files: [],
    repos: [],
    loading: false,
    error: null,
    focusingFile: null,
    innerText: '',
    loadingInnerText: false,
    loadingPinned: false,

    actions: {
        fetchFile: async (file) => {
            set({ innerText: '', loadingInnerText: true, error: null });
            try {
                const response = await fetch(file.url);
                const text = await response.text();
                set({ innerText: text });
            } catch (err) {
                set({ error: err.message || "Failed to fetch file" });
            } finally {
                set({ loadingInnerText: false });
            }
        },

        fetchDirectoryContent: async (name, path) => {
            set({ files: [], loading: true, error: null });
            try {
                const { owner, reponame } = get(); // Access current state
                const response = await fetch(`/api/contents?owner=${owner}&repo=${reponame}&path=${path}`);
                const result = await response.json();
                set({ files: result });
            } catch (err) {
                set({ error: err.message || "Failed to fetch directory content" });
            } finally {
                set({ loading: false });
            }
        },

        fetchPinned: async () => {
            set({ repos: [], loadingPinned: true, error: null });
            try {
                const response = await fetch('/api/pinned');
                const result = await response.json();
                set({ repos: result });
            } catch (err) {
                set({ error: err.message || "Failed to fetch pinned repositories" });
            } finally {
                set({ loadingPinned: false });
            }
        },

        fetchDefault: async () => {
            set({ files: [], loading: true, error: null });
            try {
                const { owner, reponame } = get(); // Access current state
                const response = await fetch(`/api/repo?owner=${owner}&repo=${reponame}`);
                const result = await response.json();
                set({ files: result });
            } catch (err) {
                set({ error: err.message || "Failed to fetch default repository" });
            } finally {
                set({ loading: false });
            }
        },

        fetchSelected: async (selectedRepo) => {  // Accept selectedRepo as a parameter
            set({ files: [], loading: true, error: null });
            try {
                const { owner } = get(); // Access current state
                const response = await fetch(`/api/contents?repo=${selectedRepo}&owner=${owner}`);
                const result = await response.json();
                set({ files: result });
            } catch (err) {
                set({ error: err.message || "Failed to fetch selected repository" });
            } finally {
                set({ loading: false });
            }
        }
    }
}));

*/

/*
chatgpt generated server code --> 
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GITHUB_API = "https://api.github.com";

// Middleware
app.use(cors());
app.use(express.json());

// GitHub API Authentication
const headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
};

// Fetch repository contents (files and directories)
app.get("/api/contents", async (req, res) => {
    const { owner, repo, path = "" } = req.query;
    if (!owner || !repo) return res.status(400).json({ error: "Missing owner or repo" });

    try {
        const response = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/contents/${path}`, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch specific file contents
app.get("/api/file", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Missing file URL" });

    try {
        const response = await axios.get(url, { headers });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch pinned repositories (Mocked)
app.get("/api/pinned", (req, res) => {
    const pinnedRepos = [
        { name: "project1", owner: "user1", url: "https://github.com/user1/project1" },
        { name: "project2", owner: "user2", url: "https://github.com/user2/project2" }
    ];
    res.json(pinnedRepos);
});

// Fetch default repository contents
app.get("/api/repo", async (req, res) => {
    const { owner, repo } = req.query;
    if (!owner || !repo) return res.status(400).json({ error: "Missing owner or repo" });

    try {
        const response = await axios.get(`${GITHUB_API}/repos/${owner}/${repo}/contents`, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

*/
