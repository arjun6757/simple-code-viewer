import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import ClockSpin from "./ClockSpin";

export default function PinnedRepos(props) {
  const [pinnedRepos, setPinnedRepos] = useState([]);
  const [hamburgerClick, setHamburgerClick] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleHamburgerClick = () => {
    setHamburgerClick((prev) => !prev);
  };

  const handleRepoClick = (name) => {
    props.handleRepoClick(name);
  };

  useEffect(() => {
    const getPinnedData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/code/repo/usr/pinned"
        );

        // const response2 = await fetch()
        const responseData = await response.json();
        const edges = responseData.data.user.pinnedItems.edges;
        setPinnedRepos(edges);
      } catch (error) {
        console.error(
          "Error while getting pinned repo data from the server",
          error
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

      {loading && <ClockSpin />}

      {loading === false && (
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
                className={`font-sans sm:rounded hover:bg-[#f0f0f0] p-1 sm:p-2 cursor-pointer dark:hover:bg-[#242424] flex gap-2 lg:justify-center items-center h-full`}
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
