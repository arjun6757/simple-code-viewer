import { useEffect } from "react";
import { Repo, useRepo } from "@/store/repo";
import Icon from "@/components/Icon";
import { Loader } from "@/components/Loader";

export default function FileTree() {

  const { fetchContents, fetchDefault, fetchFile, setExt, repo, focusingFile } = useRepo();

  useEffect(() => {
    fetchDefault();
  }, [fetchDefault])

  function handleFolder(path: string) {
    if (path === '~') return;
    fetchContents(path);
  }

  function handleClick(type: string, path: string, url: string, name: string) {
    if (type === "dir") {
      handleFolder(path);
    } else {
      const ext = name.includes(".") ? name.split(".").pop() : "";
      setExt(ext);
      fetchFile(path, url);
    }
  };

  function renderFiles(node?: Repo) {

    if (!node) {
      return <Loader center="xy" size="md" className="w-full h-full" />;
    }

    const isRoot = node.path === '~';
    const isFocusing = focusingFile?.path === node.path;

    return (
      <div key={node.path}>
        <div
          tabIndex={isRoot ? -1 : 0}
          data-hidden={isRoot}
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              handleClick(node.type, node.path, node.download_url as string, node.name);
            }
          }}
          onClick={() => handleClick(node.type, node.path, node.download_url as string, node.name)}
          className={`py-1.5 ${node.loading ? 'justify-between' : '' } ${isRoot ? 'text-xs tracking-widest' : 'px-2 rounded flex items-center hover:bg-[#f0f0f0] active:bg-[#f0f0f0] dark:hover:bg-[#242424] dark:active:bg-[#242424] cursor-pointer'} ${isFocusing ? 'bg-[#f0f0f0] dark:bg-[#242424]' : ''}`}
        >
          <div className="flex gap-2 place-items-center">
            <Icon root={isRoot} type={node.type} />
            <span
              data-root={isRoot}
               className="select-none data-[root=true]:text-neutral-400"
             >
              {isRoot ? node.name.toUpperCase() : node.name}
            </span>
          </div>

          {node.loading && (
            <div>
              <Loader center="xy" size="sm" className="w-full h-full" />
            </div>
          )}
        </div>

        <div data-hidden={isRoot} className="data-[hidden=false]:ml-3 data-[hidden=false]:pl-2 data-[hidden=false]:border-l-[1px] border-[#ddd] dark:border-[#555]">
          {node.childs && node.expanded && node.childs.map((child: Repo | undefined) => renderFiles(child))}
        </div>

      </div>
    );
  }

  return renderFiles(repo)
}