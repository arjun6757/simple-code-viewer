import { useRepo } from "@/store/repo.store";
import { infer } from "zod";

export type FileType = 'dir' | 'file';
export type LoaderSize = 'sm' | 'md' | 'lg'

declare interface RepoFile {
	name: string;
	type: string;
	path: string;
	download_url: string;
};

declare type RepoFiles = RepoFile[]