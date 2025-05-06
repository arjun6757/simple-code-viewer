import { useState } from "react";
import Icon from "@/components/Icon";
import { Loader } from "@/components/Loader";
import { useRepo } from "@/store/repo.store";
import { API } from "@/api";
import Alert from "@/components/Alert";

export default function FolderLogic(props) {
  const { name, path, type } = props.file;
  const [FolderStructure, setFolderStructure] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gettingChildFor, setGettingChildFor] = useState("");
  const { owner, reponame, fetchFile, setExt } = useRepo();

  const handleFileClick = (url, name) => {
    const ext = String(name).split(".").pop();
    setExt(ext);
    fetchFile(url);
  };

  const getChilds = async (name, path) => {
    setLoading(true);
    setGettingChildFor(path ? path : name);
    try {
      const url = path
        ? `${API}/contents?owner=${owner}&repo=${reponame}&path=${path}`
        : `${API}/contents?owner=${owner}&repo=${reponame}&path=${name}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json();
      if (result.status === 404) {
        <Alert message={result.message} />;
      }
      return result.data;
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleFoldersClick = async (name, path) => {
    const exist = findById(path, name);

    if (exist !== -1) {
      FolderStructure[exist].expanded = !FolderStructure[exist].expanded;
      setFolderStructure([...FolderStructure]);
      return;
    }

    //does not exist
    handleFolderStructure(name, path);
  };

  const handleFolderStructure = async (name, path) => {
    if (path) {
      //meaning it is definitely a child
      const data = await getChilds(name, path);
      setFolderStructure((prev) => [
        ...prev,
        { id: `root/${path}`, name, path, childs: data, expanded: true },
      ]);
    } else {
      //meaning it is definitely a root
      const data = await getChilds(name);
      setFolderStructure((prev) => [
        ...prev,
        { id: `root/${name}`, name, childs: data, expanded: true },
      ]);
    }
  };

  const handlerForClicks = (name, path, url, type) => {
    if (type === "file") {
      handleFileClick(url, name);
    } else {
      handleFoldersClick(name, path);
    }
  };

  const spinner = (
    <div className="w-fit h-full flex items-center">
      <Loader size="sm" />
    </div>
  );

  const renderChilds = (name, path, type, url) => {
    return (
      <div>
        <div
          className={`py-1.5 px-2 rounded flex gap-2 place-content-between hover:bg-[#f0f0f0] dark:hover:bg-[#242424] active:bg-[#f0f0f0] dark:active:bg-[#242424] cursor-pointer pr-3`}
          onClick={() => handlerForClicks(name, path, url, type)}
        >
          <div className="flex gap-2 items-center">
            <Icon name={name} type={type} />
            {name}
          </div>

          <div>
            {loading &&
              (gettingChildFor === path || gettingChildFor === name) &&
              spinner}
          </div>
        </div>

        {FolderStructure.length > 0 &&
          findById(path, name) !== -1 &&
          FolderStructure[findById(path, name)].expanded &&
          FolderStructure[findById(path, name)].childs.map((file, index) => (
            // child wrapper div

            <div
              key={`${file.path}${index}` || `${file.name}${index}`}
              className={`ml-3 pl-2 border-l-[1px] border-[#ddd] dark:border-[#555]`}
            >
              {renderChilds(file.name, file.path, file.type, file.download_url)}
            </div>
          ))}
      </div>
    );
  };

  const findById = (path, name) => {
    const str = path ? `root/${path}` : `root/${name}`;
    const idx = FolderStructure.findIndex(
      (properties) => properties.id === str,
    );
    return idx;
  };

  return renderChilds(name, path, type);
}
