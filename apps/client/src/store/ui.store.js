import { create } from "zustand";

export const useUI = create((set, get) => ({
	explorer: true,
	live: false,
	// togglebar:
	// 	localStorage.getItem("simple-code-viewer-wants-togglebar") || true,
	modal: false,
	activeModal: "",
	toggleExplorer: () => set((state) => ({ explorer: !state.explorer })),
	toggleLive: () => set((state) => ({ live: state.live ? false : true })),
	switchTo: (mode) => {
		try {
			if (typeof mode !== "string") throw new Error("Not a valid string");
			if (mode !== "PinnedItems" && mode !== "SearchItems") throw new Error("Not a valid mode");

			set({ activeModal: mode });
			get().toggleModal();
		} catch (err) {
			console.error(err.message || "Something went wrong!");
		}
	},
	toggleModal: () => set((state) => ({ modal: !state.modal })),
	setModalOpen: (booleanValue) => set({ modal: booleanValue })
}));
