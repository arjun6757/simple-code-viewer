import { useState } from "react";
import Spin from "./ClockSpin";
import Icon from "./Icon";

export default function FolderLogic(props) {
  const { name, path, type } = props.file;

  const [FolderStructure, setFolderStructure] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gettingChildFor, setGettingChildFor] = useState("");


  const handleFileClick = (url, name) => {
    const ext = String(name).split(".").pop();
    props.press(url, ext);
  };

  const getChilds = async (name, path) => {
    setLoading(true);
    setGettingChildFor(path ? path : name);

    try {
      const url = path
        ? `http://localhost:3000/api/code/repo/query?path=${path}`
        : `http://localhost:3000/api/code/repo/query?path=${name}`;
      const result = await fetch(url);
      const data = await result.json();
      if (data.status === 404) {
        console.error(data.message);
        alert(
          "error! either the requested resource was not found! or the server encountered an error."
        );
      }
      return data;
    } catch (error) {
      console.log(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleFoldersClick = async (name, path) => {
    console.log(name, path);
    const exist = findById(path, name);

    if (exist !== -1) {
      FolderStructure[exist].expanded = !FolderStructure[exist].expanded;
      setFolderStructure([...FolderStructure]);
      document.getElementById("dragger").style.height = `${document.getElementById("code-tree").offsetHeight}px`;
      return;
    }

    //does not exist
    handleFolderStructure(name, path);
  };

  const handleFolderStructure = async (name, path) => {
    console.log('in handlefolderstructure', name, path)
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

  const clock = (
    <Spin sx2="border-r-[6px] border-t-[6px] border-l-[6px] h-[20px] w-[20px]" />
  );

  const renderChilds = (name, path, type, url) => {
    return (
      <div>
        <div
          className={`p-2 rounded-lg flex gap-2 place-content-between hover:bg-[#f0f0f0] dark:hover:bg-[#242424] cursor-pointer pr-3`}
          onClick={() => handlerForClicks(name, path, url, type)}
        >
          <div className="flex gap-2 items-center">
            <Icon name={name} type={type} />
            {name}
          </div>

          <div className={`pt-1`}>
            {loading &&
              (gettingChildFor === path || gettingChildFor === name) &&
              clock}
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
      (properties) => properties.id === str
    );
    return idx;
  };

  return renderChilds(name, path, type);
}
