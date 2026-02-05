"use client";

import { Files, Search, PinIcon } from "lucide-react";
import { useUI } from "@/store/ui.store";
import { useRepo } from "@/store/repo";
import { useState, useEffect } from "react";
import { BsGithub } from "react-icons/bs";
import Tooltip from "@/app/components/tooltip";

export default function NavPanel() {
  const { switchTo, toggleExplorer } = useUI();
  const { fetchPinned, owner, reponame } = useRepo();
  const [displayUser, setDisplayUser] = useState(false);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      // removed e.stopPropagation() from here as window object itself is the topmost parent so listener won't get bubbled up to any other parent
      if (e.ctrlKey && e.key === "k" && e.code === "KeyK") {
        e.preventDefault();
        switchTo("SearchItems");
      }

      if (e.ctrlKey && e.key === "p" && e.code === "KeyP") {
        e.preventDefault();
        switchTo("PinnedItems");
        fetchPinned();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <div
      aria-label="Sidebar"
      className="flex flex-col justify-between text-sm relative h-screen w-14 bg-[var(--primary-bg)] border-r border-[var(--primary-border)] p-2 py-3"
    >
      <div className="flex flex-col gap-4">
        <button
          onClick={() => toggleExplorer()}
          className={`cursor-pointer py-2 flex justify-center rounded-md`}
        >
          <Files className="text-gray-600 dark:text-gray-300" />
        </button>

        <button
          onClick={() => switchTo("SearchItems")}
          className="cursor-pointer py-2 flex justify-center rounded-md"
        >
          <Tooltip content="Ctrl + K" position="right">
            <Search className="text-gray-600 dark:text-gray-300" />
          </Tooltip>
        </button>
        <button
          onClick={() => {
            switchTo("PinnedItems");
            fetchPinned();
          }}
          className="cursor-pointer py-2 flex justify-center rounded-md"
        >
          <Tooltip content="Ctrl + P" position="right">
          <PinIcon className="text-gray-600 dark:text-gray-300" />
          </Tooltip>
        </button>
      </div>

      <div className="mb-8 relative">
        <button
          className="border border-[var(--primary-border)] rounded-full w-10 p-2 flex justify-center items-center"
          onClick={() => setDisplayUser(true)}
        >
          {owner.substring(0, 1).toUpperCase()}
        </button>

        {displayUser && (
          <>
            {/* wrapper */}
            <div
              onClick={(e) => {
                setDisplayUser(false);
              }}
              className="fixed inset-0 z-20"
            />

            {/* popover */}
            <div className="w-[10rem] z-30 absolute -top-15 left-10 flex flex-col gap-0 bg-white text-neutral-900 rounded-lg shadow-lg border border-[var(--primary-border)] dark:bg-[#222] dark:text-gray-300">
              <span className="max-w-30 hover:max-w-50 truncate text-sm font-medium py-2 px-4">
                {owner}
              </span>

              <a
                className="flex py-2 px-4 items-center gap-2 text-xs border-t border-[var(--primary-border)]"
                href={`https://github.com/${owner}/${reponame}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Find on Github <BsGithub />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
