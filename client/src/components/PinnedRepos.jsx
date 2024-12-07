import React, { useEffect, useState } from "react";

export default function PinnedRepos() {
  const [pinnedRepos, setPinnedRepos] = useState([]);

  useEffect(() => {
    const getPinnedData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/code/repo/usr/pinned"
        );
        const responseData = await response.json();
        const edges = responseData.data.user.pinnedItems.edges;
        setPinnedRepos(edges);
      } catch (error) {
        console.error(
          "Error while getting pinned repo data from the server",
          error
        );
      }
    };

    getPinnedData();
  }, []); //load once

  return (
    <div id="pinned" className="grid grid-cols-6 text-center h-full">
      {pinnedRepos.map((item, index) => {
        return (
        <div key={index} className="hover:bg-[#f0f0f0] cursor-pointer dark:hover:bg-[#242424] font-sans flex justify-center items-center h-full border-r border-[#ddd] dark:border-[#242424]">
            <a href={item.node.url}>{item.node.name}</a>
        </div>
    );
      })}
    </div>
  );
}
