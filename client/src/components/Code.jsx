import { useState, useEffect } from "react";
import ClockSpin from "./ClockSpin";
import FolderLogic from "./FolderLogic.jsx";
import Icon from "./Icon";

export default function Code(props) {
  const [repoData, setRepoData] = useState([{}]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRepoData = async () => {
      setLoading(true);
      try {
        const result = await fetch(
          "https://simple-code-viewer.onrender.com/api/code/repo"
        );
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

  return (
    <div
      id="code-tree"
      className={props.sx ? props.sx : "flex flex-col text-white h-screen"}
    >
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
          ) : (
            <div
              key={index}
              onClick={() => handleClick(file.type, file.url, index, file.name)}
              className={`p-2 flex gap-2 place-items-center hover:bg-[#242424] rounded-lg cursor-pointer`}
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
          )
        )
      )}
    </div>
  );
}
