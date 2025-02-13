import { useContext, useEffect } from "react";
import FolderLogic from "./FolderLogic.jsx";
import Icon from "../Icon.jsx";
import { Loader } from "../Spinner/Loader.jsx";
import { useRepo } from "../../store/repo.js";
import Alert from "../Alert.jsx";
import { ActionsContext } from "../../context/ActionsContext.js";

export default function ExplorerPanel() {

  const { fetchFile, fetchDefault, files, loading, error, setExt } = useRepo();
  const { isExplorerOpen } = useContext(ActionsContext);

  useEffect(() => {
    fetchDefault();
  }, [])

  const hasDot = (name) => {
    const regex = /\./;
    return regex.test(name);
  };

  const handleClick = (type, url, name) => {
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
      bg-white dark:bg-[#171717] relative min-w-[10vw] sm:min-w-[18vw] lg:w-[20vw] max-w-[80vw] sm:max-w-[40vw] border-r-[1px] border-[#ddd] dark:border-[#555] text-black dark:text-white text-xs sm:text-sm select-none text-nowrap`}
    >
      <div
        id="dragger"
        onMouseDown={handleDrag}
        onTouchStart={handleTouchDrag}
        className="absolute top-0 right-0 w-[2px] h-full bg-gray-500 bg-opacity-0 cursor-ew-resize  hover:bg-opacity-100 active:bg-opacity-100 transition-colors"
      ></div>

      <div className="overflow-scroll w-full p-4 overflow-x-hidden scrollbar-thin">
        {error && <Alert message={error} />}

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
                onClick={() => handleClick(file.type, file.download_url, file.name)}
                className={`py-1.5 px-2 rounded flex gap-2 place-items-center hover:bg-[#f0f0f0] active:bg-[#f0f0f0] dark:hover:bg-[#242424] dark:active:bg-[#242424] cursor-pointer`}
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
