import { create } from "zustand";
import toast from "react-hot-toast"

interface PinnedRepos {
    pinnedBy: string;
    data: []
}

class RepoNode {
    name: string;
    type: string;
    path: string;
    childs?: RepoNode[];
    download_url: string | null;
    expanded: boolean;
    loading: boolean | undefined;

    constructor(
        name: string,
        type: string,
        path: string,
        download_url: string | null = null,
    ) {
        this.name = name;
        this.type = type;
        this.path = path;
        this.childs = type === "dir" ? [] : undefined;
        this.download_url = download_url;
        this.expanded = path === "~" ? true : false;
        this.loading = type === "dir" ? false : undefined;
    }

    add(file: RepoNode) {
        this.childs?.push(file);
    }

    findByPath(
        path: string | undefined,
        node: RepoNode | undefined,
    ): RepoNode | null {
        if (!node || !path) return null;

        if (node.path === path) {
            return node;
        }

        if (node.childs) {
            for (const child of node.childs) {
                const found = this.findByPath(path, child);
                if (found) return found;
            }
        }

        // not found
        return null;
    }

    toggleExpanded() {
        this.expanded = this.expanded ? false : true;
    }

    toggleLoading() {
        this.loading !== undefined &&
            (this.loading = this.loading ? false : true);
    }
}

export interface store {
    prevDownloadLink: string;
    reponame: string;
    owner: string;
    repo: RepoNode | undefined;
    focusingFile: RepoNode | undefined;
    repos?: PinnedRepos;
    loading: boolean;
    innerText: string;
    loadingInnerText: boolean;
    loadingPinned: boolean;
    homepage?: { uid: string, url: string };
    ext: string | undefined;
    setExt: (value?: string) => void;
    
    fetchFile: (path: string, download_link: string) => Promise<void>;
    fetchPinned: () => Promise<void>;
    fetchDefault: () => Promise<void>;
    fetchAssociatedLink: () => Promise<void>;
    fetchSelected: (user: string, selected: string) => Promise<void>;
    fetchContents: (path: string) => Promise<void>;
}

export const useRepo = create<store>((set, get) => ({
    prevDownloadLink: "",
    reponame: "carousel", // default repo
    owner: "arjun6757", // default user
    repo: undefined,
    focusingFile: undefined,
    repos: undefined,
    loading: true,
    innerText: "",
    loadingInnerText: false,
    loadingPinned: false,
    homepage: undefined,
    ext: undefined,
    setExt: (value) => set({ ext: value }),

    fetchFile: async (path, downloadLink) => {
        const { prevDownloadLink, repo } = get();

        const file = repo?.findByPath(path, repo);

        if (!file) {
            console.error("Something wrong with file path");
            return;
        }

        if (prevDownloadLink === downloadLink) {
            return;
        } else {
            set({ prevDownloadLink: downloadLink });
        }

        set({ innerText: "", loadingInnerText: true });

        try {
            const response = await fetch(downloadLink);
            const text = await response.text();
            set({ innerText: text, repo });
        } catch (err: any) {
            toast.error((err.message as string) || "Failed to fetch file")
        } finally {
            set({ loadingInnerText: false, focusingFile: file });
        }
    },

    fetchPinned: async () => {
        const { owner, repos } = get();

        if (repos?.pinnedBy === owner) return;

        set({ loadingPinned: true });

        try {
            const response = await fetch(`/api/pinned?user=${owner}`);

            if (!response.ok) {
                throw new Error("Error while fetching pinned repositories")
            }

            const result = await response.json();

            if (!result.data) throw new Error("Failed to find pinned repositories for this user")

            set({ repos: { pinnedBy: owner, data: result.data } });
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch pinned repositories")
        } finally {
            set({ loadingPinned: false });
        }
    },

    fetchDefault: async () => {
        const { fetchFile, setExt } = get();

        set({ loading: true });
        try {
            const { owner, reponame } = get();
            const response = await fetch(
                `/api/contents?owner=${owner}&repo=${reponame}`,
            );

            if (!response.ok) {
                throw new Error("Error while fetching default repo");
            }

            const result = await response.json();
            const root = new RepoNode(reponame, "dir", "~", null);

            for (const each of result.data) {

                if (each.name.toLowerCase().includes("readme.md")) {
                    setTimeout(async () => {
                        setExt("md");
                        await fetchFile(each.path, each.download_url)
                    }, 700);
                }

                const temp = new RepoNode(
                    each.name,
                    each.type,
                    each.path,
                    each.download_url,
                );
                root.add(temp);
            }

            set({ repo: root });
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch default repository");
        } finally {
            set({ loading: false });
        }
    },

    fetchSelected: async (user, selected) => {

        set({
            owner: user,
            loading: true,
            innerText: ""
        });

        const { setExt, fetchFile } = get();
        const root = new RepoNode(selected, "dir", "~", null);

        try {
            const response = await fetch(
                `/api/contents?repo=${selected}&owner=${user}`,
            );

            if (!response.ok) {
                throw new Error("Error while fetching selected repo");
            }

            const result = await response.json();
            const childs = result.data;

            for (const each of childs) {
                if (each.name.toLowerCase().includes("readme.md")) {
                    setTimeout(async () => {
                        setExt("md");
                        await fetchFile(each.path, each.download_url)
                    }, 700);
                }

                const temp = new RepoNode(
                    each.name,
                    each.type,
                    each.path,
                    each.download_url,
                );
                root.add(temp);
            }

            set({ repo: root, reponame: selected });
            toast.success(`${selected} fetched successfully!`)

        } catch (err: any) {
            toast.error(err.message || "Failed to fetch selected repository");
        } finally {
            set({ loading: false });
        }
    },

    fetchAssociatedLink: async () => {
        const { owner, reponame, homepage } = get();

        if (homepage?.uid === `${owner}/${reponame}`) return;

        set({ homepage: undefined })

        try {
            const response = await fetch(
                `/api/homepage?repo=${reponame}&owner=${owner}`,
            );

            if (!response.ok) {
                throw new Error("Error while fetching live link");
            }

            const result = await response.json();

            if (!result.data) throw new Error("Failed to find live link for this repo")

            set({ homepage: { uid: `${owner}/${reponame}`, url: result.data as string } })
        } catch (err: any) {
            toast.error(err.message || "Failed to fetch live link")
        }
    },

    fetchContents: async (path) => {
        const { owner, reponame, repo } = get();

        const parent = repo?.findByPath(path, repo);

        if (!parent) return;

        if (parent.childs && parent.childs.length > 0) {
            parent.toggleExpanded();
            set({ repo });
            return;
        }

        parent.toggleLoading();
        set({ repo });

        try {
            const url = `/api/contents?owner=${owner}&repo=${reponame}&path=${path}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const result = await response.json();

            if (result.status === 404) {
                throw new Error("Not found");
            }

            const childs = result.data;

            for (const child of childs) {
                const temp = new RepoNode(
                    child.name,
                    child.type,
                    child.path,
                    child.download_url,
                );
                parent.add(temp);
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch contents");
        }

        parent.toggleLoading();
        parent.toggleExpanded();
        set({ repo });
    },
}));

export type Repo = InstanceType<typeof RepoNode>;
