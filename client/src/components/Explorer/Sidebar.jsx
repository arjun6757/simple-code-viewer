import { useState, useEffect } from "react";
import ClockSpin from "../Spinner/ClockSpin.jsx";
import FolderLogic from "./FolderLogic.jsx";
import Icon from "../Icon.jsx";
import useExplorer from "../hooks/useExplorer.js";
// import RepoSelector from "./RepoSelector.jsx";

export default function Sidebar(props) {
  const [repoData, setRepoData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const { hidesidebar } = props;
  useEffect(() => {
    const fetchRepoData = async () => {
      setLoading(true);
      try {
        const selectedRepo = props.reposelect;
        const result = await fetch(
          `http://localhost:3000/api/code/repo/select/${selectedRepo}`,
        );
        const data = await result.json();
        setRepoData(data);
        props.success(true);
      } catch (error) {
        console.error("Error fetching repo data:", error);
        setRepoData([{}]);
        props.success(false);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    if (props.reposelect === "") return;
    fetchRepoData();
  }, [props.reposelect]);

  useEffect(() => {
    const fetchRepoData = async () => {
      setLoading(true);
      try {
        const result = await fetch("http://localhost:3000/api/code/repo");
        const data = await result.json();
        setRepoData(data);
      } catch (error) {
        console.error("Error fetching repo data:", error);
        setRepoData([{}]);
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchRepoData(); // Call the fetch function when component mounts
  }, []); // Empty dependency array to run only once

  const hasDot = (name) => {
    const regex = /\./;
    return regex.test(name);
  };

  const handleClick = (type, url, index, name) => {
    if (type === "dir") {
      return;
    }

    const ext = hasDot(name) ? String(name).split(".").pop() : "plaintext";
    props.press(url, ext);
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

  return (
    <div
      id="code-tree"
      className={`${
        hidesidebar ? "hidden" : "flex"
      } fixed min-w-[75vw] max-w-[75vw] bg-white dark:bg-[#171717] sm:relative w-[75vw] sm:min-w-[18vw] sm:w-[20vw] sm:max-w-[30vw] border-r-[1px] border-[#ddd] dark:border-[#555] text-black dark:text-white font-sans select-none`}
    >
      <div
        id="dragger"
        onMouseDown={handleDrag}
        onTouchStart={handleTouchDrag}
        className="absolute top-0 right-0 w-1 min-h-full opacity-0 z-10 h-auto cursor-ew-resize hover:bg-[#888] hover:opacity-100 transition-opacity delay-300"
      ></div>

      <div className="overflow-scroll w-full p-4 overflow-x-hidden scrollbar-thin">
        {/*<div className="bg-[#333]">*/}
        {/*<RepoSelector />*/}
        {/*</div>*/}

        {loading ? (
          <ClockSpin sx2="w-[30px] h-[30px] border-r-[9px] border-t-[9px] border-l-[9px]" />
        ) : (
          repoData.map((file, index) =>
            file.type === "dir" ? (
              <FolderLogic
                key={index}
                index={index}
                file={file}
                press={props.press}
                folderType={"root"}
              />
            ) : file.type === "url" ? null : (
              <div
                key={index}
                onClick={() =>
                  handleClick(file.type, file.url, index, file.name)
                }
                className={`p-2 flex gap-2 place-items-center hover:bg-[#f0f0f0] dark:hover:bg-[#242424] rounded-lg cursor-pointer`}
              >
                <Icon name={file.name} type={file.type} />
                <a
                  onClick={(e) => e.preventDefault()}
                  href={file.url}
                  referrerPolicy="no-referrer"
                >
                  {file.name}
                </a>
              </div>
            ),
          )
        )}
      </div>
    </div>
  );
}
