"use client";

import { useState } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { AiOutlineGlobal } from "react-icons/ai";
import { TbLayoutSidebarFilled, TbLayoutSidebar } from "react-icons/tb";
import { useTheme } from "../context/ThemeProvider";
import { useUI } from "@/store/ui.store";
import { useRepo } from "@/store/repo";
import toast from "react-hot-toast";

export default function ToggleBar() {
  const { toggleExplorer, explorer } = useUI();
  const { fetchAssociatedLink } = useRepo();
  const [hide, setHide] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  async function handleClickLive() {
    const tid = toast.loading("Opening live link for this repo")
    await fetchAssociatedLink();
    toast.dismiss(tid)
    if (useRepo.getState().homepage?.url) window.open(useRepo.getState().homepage?.url, '_blank');
  }

  return (
    <div className="fixed right-5 bottom-5 sm:right-8 sm:bottom-5 bg-transparent flex flex-col gap-3 items-center transition-transform ease-in-out duration-500 w-14">
      <div
        className={`flex flex-col items-center gap-4 transition-opacity duration-500 w-full p-1 ${hide
            ? " opacity-100 pointer-events-auto"
            : " opacity-0 pointer-events-none"
          }`}
        aria-hidden={!hide}
        tabIndex={hide ? 0 : -1}
      >
        <button
          title="Toggle Explorer"
          onClick={() => toggleExplorer()}
          className="rounded-full bg-[var(--primary-bg)] text-[#555] text-xl dark:text-[#888] p-2 active:scale-90 transition-transform duration-300 border border-[var(--primary-border)]"
          tabIndex={hide ? 0 : -1}
        >
          {explorer ? (
            <TbLayoutSidebarFilled className="rounded-full text-lg" />
          ) : (
            <TbLayoutSidebar className="rounded-full text-lg" />
          )}
        </button>
        <button
          title="Toggle Darkmode"
          onClick={() => toggleTheme()}
          className={`rounded-full bg-[var(--primary-bg)] text-[#555] text-xl dark:text-[#888] p-2 active:scale-90 transition-transform duration-300 border border-[var(--primary-border)]`}
          tabIndex={hide ? 0 : -1}
        >
          {isDark ? (
            <MdDarkMode className="rounded-full text-lg" />
          ) : (
            <MdOutlineDarkMode className="rounded-full text-lg" />
          )}
        </button>
        <button
          onClick={() => handleClickLive()}
          title="Live"
          className="rounded-full bg-[var(--primary-bg)] text-[#555] text-xl dark:text-[#888] p-2 active:scale-90 transition-transform duration-300 border border-[var(--primary-border)]"
          tabIndex={hide ? 0 : -1}
        >
          <AiOutlineGlobal className="rounded-full text-lg" />
        </button>
      </div>
      <button
        title={hide ? "Collapse" : "Expand"}
        onClick={() => setHide((prev) => !prev)}
        className="rounded-full bg-[var(--primary-bg)] text-xl text-[#555] dark:text-[#888] p-2 active:scale-90 transition-transform duration-300 border border-[var(--primary-border)]"
      >
        {hide ? (
          <FaAngleDown className="rounded-full text-lg" />
        ) : (
          <FaAngleUp className="rounded-full text-lg" />
        )}
      </button>
    </div>
  );
}
