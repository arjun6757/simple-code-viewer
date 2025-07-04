import { useRepo } from "@/store/repo.store";
import { RepoFile } from "@/types/types";
import { JSX } from "react";

export default function File({ icon, file } : { icon: JSX.Element, file: RepoFile  }) {

	const { fetchFile, setExt } = useRepo();

	const handleClick = (type: string, url: string, name: string) => {
	    if(type==="dir") return;
	    const ext = name.includes(".") ? name.split(".").pop() : "";
	    setExt(ext);
	    fetchFile(url);
  };

	return (
			<div
          onClick={() => handleClick(file.type, file.download_url, file.name)}
                className='py-1.5 px-2 rounded flex gap-2 place-items-center hover:bg-[#f0f0f0] active:bg-[#f0f0f0] dark:hover:bg-[#242424] dark:active:bg-[#242424] cursor-pointer'
              >
                {icon}
                <span className="select-none">{file.name}</span>
			</div>
		)
}