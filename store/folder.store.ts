import { create } from "zustand";

export type FileType = {
	id: string;
	name: string;
} & (FileProps | FolderProps);

type FileProps = {
	type: "file";
	download_url: string;
	focusing: boolean;
};

type FolderProps = {
	type: "dir";
	path?: string;
	expanded: boolean;
	childs: FileType[];
	expanding: boolean;
};

interface State {
	focusingFile?: FileType & FileProps;
	files: FileType[];
}

interface FileActions {
	findById: (path: string | undefined, name: string) => number;
	ext: (filename: string) => string | undefined;
}

interface Store extends State {
	actions: FileActions;
}

export const fileStore = create<Store>((set, get) => ({
	focusingFile: undefined,
	files: [],
	actions: {
		findById: (path, name) => {
			const { files } = get();
			const id = path ? `root/${path}` : `root/${name}`;
			return files.findIndex(p => p.id === id);
		},
		ext: (filename: string): string | undefined => {
			if(!filename.includes(".")) return undefined;
			return filename.split(".").pop();
		},
	},
}));

// current implementation is like this =>
// client -|
// 		  -|- src -| not expanded
// src (expanded)
// what it does ? => creates new entry each time a folder is expanded

// what i want is
// client -|
//		  -|- src -|
// 		  		  -|- components -|
// 								 -|- loader.jsx