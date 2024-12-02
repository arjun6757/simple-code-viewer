import { useRef, useState, useEffect } from "react";
import Spin from "./LoadingAnimation";
import Icon from "./Icon";
import { nanoid } from "nanoid";

export default function FolderLogic(props) {
  const { name, path, type } = props.file;
  const { index, folderType } = props;
  // const nanoid = nanoid();

  const [dirLocation, setDirLocation] = useState([{}]);

  const [FolderStructure, setFolderStructure] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [currentClick, setCurrentClick] = useState(-1);
  // const folderRef = useRef(null);

  const [gettingChildFor, setGettingChildFor] = useState("");

  const handleFileClick = (url, name) => {
    const ext = String(name).split(".").pop();
    // console.log(url, name, ext);
    props.press(url, ext);
  };

  const getChilds = async (name, path, folderType) => {
    setLoading(true);
    setGettingChildFor(name);
    
    // if (byName(name) !== -1) {
    //   setDirLocation(name);
    // }

    if(folderType==="root") {
      setDirLocation(prev=> {
        const newEntry = {id: nanoid(), root: name, childPaths: []}
        return [...prev, newEntry];
      });
    } else if (folderType==="child") {
      setDirLocation(prev=> {
        prev.map(p2=> {
          if(p2.root===name) {
            return {...p2, childPaths: [...p2.childPaths, name]}
          }
        })
      })
    }
    

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
      console.log(dirLocation)
    }
  };

  const byName = (name) => {
    return FolderStructure.findIndex((folder) => folder.name === name);
  };

  const handleFoldersClick = async (name, path, id) => {
    // const exist = isThere(id) === -1 ? false : true;

    console.log(name, id);

    if (byId(id) !== -1) {
      FolderStructure[byId(id)].expanded = !FolderStructure[byId(id)].expanded;
      setFolderStructure([...FolderStructure]);
      return;
    }

    //does not exist

    handleFolderStructure(name, path);
  };

  // useEffect(() => {
  //   FolderStructure.map((folder) => {
  //     if (folder.folderRef.current) {
  //       folder.folderRef.current.setAttribute("data-id", folder.id);
  //       console.log('folder id: ', folder.folderRef.current.getAttribute("data-id"));
  //     }
  //   });
  // }, [FolderStructure]);

  const handleFolderStructure = async (name, path) => {
    if (path) {
      const data = await getChilds(name, path);
      setFolderStructure((prev) => [
        ...prev,
        { id: nanoid(), name, path, childs: data, expanded: true },
      ]); //setFolderStructure(data);
    } else {
      console.log(name);
      const data = await getChilds(name);
      setFolderStructure((prev) => [
        ...prev,
        { id: nanoid(), name, childs: data, expanded: true },
      ]);
    }
    // setLoading((prev) => !prev);
  };

  const handlerForClicks = (name, path, url, type, e) => {
    // const ID = e.target.getAttribute("data-id");

    // console.log('so first time will be null but second time it')

    if (type === "file") {
      // console.log('for file', url, name);
      handleFileClick(url, name);
    } else {
      //for each folder create a unique id
      handleFoldersClick(name, path);
    }
  };

  const clock = (
    <Spin sx2="border-r-[8px] border-t-[8px] border-l-[8px] h-[20px] w-[20px]" />
  );

  const renderChilds = (name, path, type, url, index, folderType) => {
    return (
      <div>
        {/* {dir === "root" ? console.log(dir, index) : null} */}
        {/* {dir === "child" ? console.log(dir, index) : null} */}
        <div
          className={`p-2 rounded-lg flex gap-2 place-content-between hover:bg-[#242424] cursor-pointer pr-3`}
          onClick={() => handlerForClicks(name, path, url, type, folderType, index)}
        >
          <div className="flex gap-2 items-center">
            <Icon name={name} type={type} />
            {name}
          </div>

          <div className={`pt-1`}>
            {loading &&
              (gettingChildFor === name) &&
              clock}
          </div>
        </div>

        {FolderStructure.length > 0 &&
          byName(name) !== -1 &&
          FolderStructure[byName(name)].expanded &&
          FolderStructure[byName(name)].childs.map((file, index) => (
            // child wrapper div

            <div
              key={`${file.path}${index}` || `${file.name}${index}`}
              // data-id={index}
              className={`ml-3 pl-2 border-l-[1px] border-[#555]`}
            >
              {/* {console.log("child: ", file)} */}
              {renderChilds(file.name, file.path, file.type, file.download_url, "child", index)}
            </div>
          ))}
      </div>
    );
  };

  const byId = (id) => {
    return FolderStructure.findIndex((properties) => properties.id === id);
  };

  const ext = (name) => {
    return String(name).split(".").pop();
  };

  return renderChilds(name, path, type, folderType, index);
}
