import { create } from "zustand";
import { API } from "@/api";

export const useRepo = create((set, get) => ({
    prevUser: '',
    prevRepo: '',
    prevLink: '',
    prevDownloadLink: '',
    reponame: "image-carousel", // default owner
    owner: "arjun6757", // default user
    files: [],
    repos: [],
    loading: false,
    error: null,
    message: null,
    focusingFile: null,
    innerText: "",
    loadingInnerText: false,
    errorInnerText: null,
    loadingPinned: false,
    errorPinned: null,
    associatedLinkData: null,
    associatedLinkLoading: false,
    associatedLinkError: null,
    ext: null,
    setError: (message) => set({ error: message }),
    setExt: (value) => set({ ext: value }),
    setOwner: (owner) => set({ owner }),

    fetchFile: async (downloadLink) => {
        const { prevDownloadLink } = get();

        if (prevDownloadLink === downloadLink) {
            console.log('prev: '+ prevDownloadLink + 'download: ', downloadLink)
            return;
        } else {
            set({ prevDownloadLink: downloadLink });
        }

        set({ innerText: "", loadingInnerText: true, error: null });
        try {
            const response = await fetch(downloadLink);
            const text = await response.text();
            set({ innerText: text });
        } catch (err) {
            set({ errorInnerText: err.message || "Failed to fetch file" });
        } finally {
            set({ loadingInnerText: false });
        }
    },

    // not in use for now
    fetchDirectoryContent: async (name, path) => {
        set({ loading: true, error: null });
        try {
            const { owner, reponame } = get();
            // the logic is that only childrens has path but the root directory
            // is not a child of any other directory so
            const url = path
                ? `${API}/contents?owner=${owner}&repo=${reponame}&path=${path}`
                : `${API}/contents?owner=${owner}&repo=${reponame}&path=${name}`;

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
        const { owner, prevUser } = get();

        // this block of if-else code should actually allow fetching only one time
        if (owner === prevUser) {
            return;
        } else {
            set({ prevUser: owner });
        }

        set({ repos: [], loadingPinned: true, error: null });

        try {
            // const { owner } = get();
            const response = await fetch(`${API}/pinned?user=${owner}`);
            if (!response.ok) {
                set({ error: response.statusText })
                return;
            }
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
                `${API}/contents?owner=${owner}&repo=${reponame}`,
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

    fetchSelected: async ({ user, selected }) => {

        set({ owner: user, files: [], loading: true, error: null, message: null });

        try {
            // const { owner } = get();
            const response = await fetch(
                `${API}/contents?repo=${selected}&owner=${user}`,
            );
            const result = await response.json();
            set({ files: result, reponame: selected });
        } catch (err) {
            set({
                error: err.message || "Failed to fetch selected repository",
            });
        } finally {
            set({ loading: false, message: `${selected} fetched messagefully!` });
        }

    },

    fetchAssociatedLink: async () => {
        const { owner, reponame, prevLink, associatedLink } = get();

        if (prevLink === associatedLink) {
            return;
        } else {
            set({ prevLink: associatedLink });
        }

        set({ associatedLink: null, associatedLinkLoading: true });
        try {
            const response = await fetch(
                `${API}/homepage?repo=${reponame}&owner=${owner}`,
            );
            const result = await response.json();
            if (result.homepage_url === "") {
                return set({ associatedLinkError: "No associated link found in this project!" })
            }
            set({ associatedLinkData: result });

        } catch (err) {
            set({
                associatedLinkError: err.message || "Failed to fetch selected repository",
            });
        } finally {
            set({ associatedLinkLoading: false });
        }
    }
}));