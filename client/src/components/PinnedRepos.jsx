import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import ClockSpin from "./ClockSpin";

export default function PinnedRepos(props) {
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [hamburgerClick, setHamburgerClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState("");

  const handleHamburgerClick = () => {
    setHamburgerClick((prev) => !prev);
  };

  const handleRepoClick = (name) => {
    setClicked(name);
    props.handleRepoClick(name);
  };

  useEffect(() => {
    const getPinnedData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://simple-code-viewer.onrender.com/api/code/repo/usr/pinned",
        );

        const responseData = await response.json();
        const edges = responseData.data.user.pinnedItems.edges;
        setPinnedRepos(edges);
      } catch (error) {
        console.error(
          "Error while getting pinned repo data from the server",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    getPinnedData();
  }, []); //load once

  return (
    <div>
      <button
        className="hover:bg-[#f0f0f0] dark:hover:bg-[#171717] p-1 rounded-lg lg:hidden"
        onClick={handleHamburgerClick}
      >
        <RxHamburgerMenu className="text-2xl" />
      </button>

      {loading ? (
        <ClockSpin />
      ) : (
        <div
          id="pinned"
          className={`${
            hamburgerClick ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row h-full`}
        >
          {pinnedRepos.map((item, index) => {
            return (
              <div
                onClick={() => handleRepoClick(item.node.name)}
                key={index}
                style={{ fontFamily: "Noto Sans" }}
                className={`${
                  clicked === item.node.name
                    ? "bg-[#f0f0f0] dark:bg-[#242424]"
                    : ""
                } select-none font-sans sm:rounded hover:bg-[#f0f0f0] p-1 pl-12 lg:p-2 cursor-pointer dark:hover:bg-[#242424] flex gap-2 lg:justify-center items-center h-full`}
              >
                <div className="">
                  <a href={item.node.url}>
                    <FaGithub />
                  </a>
                </div>
                <a onClick={(e) => e.preventDefault()} href={item.node.url}>
                  {item.node.name}
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
