import { useState, useEffect } from "react";
import FolderLogic from "./FolderLogic.jsx";
import Icon from "../Icon.jsx";
import { Loader } from "../Spinner/Loader.jsx";
import { useRepo } from "../../store/repo.js";
import Alert from "../Alert.jsx";

export default function ExplorerPanel(props) {

  const { fetchFile, fetchDefault, files, loading, error, setExt, successfulFetch, reponame } = useRepo();
  const { isExplorerOpen } = props;

  useEffect(() => {
    fetchDefault();
  }, [])

  const hasDot = (name) => {
    const regex = /\./;
    return regex.test(name);
  };

  const handleClick = (type, url, index, name) => {
    if (type === "dir") {
      return;
    }

    const ext = hasDot(name) ? String(name).split(".").pop() : "plaintext";
    setExt(ext);
    fetchFile(url);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    const codeTree = document.getElementById("code-tree");
    const startWidth = codeTree.offsetWidth;
    const startX = e.clientX;

    const mouseMove = (event) => {
      const newWidth = startWidth + (event.clientX - startX);
      codeTree.style.width = `${newWidth}px`;
    };

    const mouseUp = () => {
      //after releasing the drag this will be triggered
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };

    document.addEventListener("mousemove", mouseMove); //when cursor is moving
    document.addEventListener("mouseup", mouseUp); //when im releasing the dragging
  };

  const handleTouchDrag = (e) => {
    // e.preventDefault();
    const codeTree = document.getElementById("code-tree");
    const startWidth = codeTree.offsetWidth;
    const startX = e.touches[0].clientX;

    const touchMove = (event) => {
      const touch = event.touches[0];
      const newWidth = startWidth + (touch.clientX - startX);
      codeTree.style.width = `${newWidth}px`;
    };

    const touchRelease = () => {
      //after releasing the drag this will be triggered
      document.removeEventListener("touchmove", touchMove);
      document.removeEventListener("touchend", touchRelease);
    };

    document.addEventListener("touchmove", touchMove); //when cursor is moving
    document.addEventListener("touchend", touchRelease); //when im releasing the dragging
  };

  const spinner = (
    <div className="w-full h-full flex justify-center">
      <Loader size="md" />
    </div>
  );

  return (
    <div
      id="code-tree"
      className={`
      ${isExplorerOpen ? "flex" : "hidden"}
      min-w-[75vw] max-w-[75vw] bg-white dark:bg-[#171717] relative w-[50vw] sm:min-w-[18vw] sm:w-[20vw] sm:max-w-[30vw] border-r-[1px] border-[#ddd] dark:border-[#555] text-black dark:text-white text-sm select-none`}
    >
      <div
        id="dragger"
        onMouseDown={handleDrag}
        onTouchStart={handleTouchDrag}
        className="absolute top-0 right-0 w-[2px] min-h-full opacity-0 h-auto cursor-ew-resize hover:bg-gray-500 hover:opacity-100 transition-opacity delay-300"
      ></div>

      <div className="overflow-scroll w-full p-4 overflow-x-hidden scrollbar-thin">
        {error && <Alert error={error} />}

        {loading
          ? spinner
          : files.map((file, index) =>
            file.type === "dir" ? (
              <FolderLogic
                key={index}
                index={index}
                file={file}
                folderType={"root"}
              />
            ) : (
              <div
                key={index}
                onClick={() => handleClick(file.type, file.download_url, index, file.name)}
                className={`py-1.5 px-2 rounded flex gap-2 place-items-center hover:bg-[#f0f0f0] dark:hover:bg-[#242424] cursor-pointer`}
              >
                <Icon name={file.name} type={file.type} />
                <a
                  onClick={(e) => e.preventDefault()}
                  className="select-none"
                >
                  {file.name}
                </a>
              </div>
            )
          )}
      </div>
    </div >
  );
}
