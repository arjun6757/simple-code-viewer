"use client";

import { Files, Search, PinIcon } from "lucide-react";
import { useUI } from "@/store/ui.store";
import { useRepo } from "@/store/repo";
import { useState } from "react";
import { BsGithub } from "react-icons/bs";

export default function NavPanel() {

  const { switchTo, toggleExplorer } = useUI();
  const { fetchPinned, owner } = useRepo()
  const [displayUser, setDisplayUser] = useState(false)

  return (
    <div
      aria-label="Sidebar"
      className="flex flex-col justify-between text-sm relative h-screen w-14 bg-gray-50 dark:bg-[#171717] border-r border-[#ddd] dark:border-[#333] p-2 py-3"
    >

      <div className="flex flex-col gap-4">
        <button
          onClick={() => toggleExplorer()}
          className={`cursor-pointer py-2 hover:bg-[#f0f0f0] flex justify-center dark:hover:bg-[#242424] rounded`}
        >
          <Files className="text-gray-600 dark:text-gray-300" />
        </button>

        <button
          onClick={() => switchTo("SearchItems")}
          className="cursor-pointer py-2 hover:bg-[#f0f0f0] flex justify-center dark:hover:bg-[#242424] rounded"
        >
          <Search className="text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={() => {
            switchTo("PinnedItems")
            fetchPinned()
          }}
          className="cursor-pointer py-2 hover:bg-[#f0f0f0] flex justify-center dark:hover:bg-[#242424] rounded"
        >
          <PinIcon className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>


      <div className="mb-8 relative">
        <button
          className="border border-[#ddd] dark:border-[#333] rounded-full w-10 p-2 flex justify-center items-center"
          onClick={() => setDisplayUser(true)}
        >
          {owner.substring(0, 1).toUpperCase()}
        </button >

        {displayUser && (
          <>
            {/* wrapper */}
            <div
              onClick={(e) => {
                setDisplayUser(false)
              }}
              className="fixed inset-0 z-20" />


            {/* popover */}
            <div
              className="w-[10rem] z-30 absolute -top-15 left-10 flex flex-col gap-0 bg-white text-neutral-900 rounded-lg shadow-lg border border-[#ddd] dark:bg-[#222] dark:text-gray-300 dark:border-[#444]"
            >
              <span className="max-w-30 hover:max-w-50 truncate text-sm font-medium py-2 px-4">{owner}</span>

              <a
                className="flex py-2 px-4 items-center gap-2 text-xs border-t border-[#ccc] dark:border-[#444]"
                href={`https://github.com/${owner}`}
                target="_blank"
                rel="noopener noreferrer"
              >Find on Github <BsGithub /></a>
            </div>
          </>
        )}
      </div>

    </div >
  );
}
