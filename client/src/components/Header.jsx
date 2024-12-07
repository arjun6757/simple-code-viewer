import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { FaAngleDown, FaAngleUp, FaCode } from "react-icons/fa6";
import { AiOutlineGlobal } from "react-icons/ai";
import { GoSidebarCollapse } from "react-icons/go";
import { GoSidebarExpand } from "react-icons/go";

export default function Header(props) {
  const [hide, setHide] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    localStorage.getItem("theme1") === "dark" ? true : false;
  });
  const [hideSidebar, setHideSidebar] = useState(false);

  useEffect(() => {
    props.theme(darkMode);
  }, [darkMode, props.theme]);

  useEffect(() => {
    props.sidebar(hideSidebar);  
  }, [hideSidebar, props.sidebar])

  const handleToggleSidebar = () => {
    setHideSidebar(prev=> !prev);
  }

  const handleClick = () => {
    setDarkMode((prev) => !prev);
    localStorage.setItem("theme1", darkMode ? "dark" : "light");
  };

  return (
    <div className="flex flex-col gap-4 items-center transition-transform ease-in-out duration-500">
      <div
        className={`flex flex-col items-center gap-4 overflow-hidden transition-all duration-500 ${
          hide ? " opacity-100" : " opacity-0"
        }`}
      >
        <button
          title={`Collapse`}
          onClick={handleToggleSidebar}
          className="rounded-full dark:bg-[#333] bg-[#f0f0f0] text-[#555] text-2xl dark:text-[#888] p-2"
        >
          <GoSidebarCollapse />
          {/* <GoSidebarExpand /> */}
        </button>
        <button
          title="Toggle"
          onClick={handleClick}
          className={`rounded-full dark:bg-[#333] bg-[#f0f0f0] text-[#555] text-2xl dark:text-[#888] p-2`}
        >
          <MdDarkMode className="rounded-full" />
        </button>
        <button
          title="Code"
          className="rounded-full dark:bg-[#333] bg-[#f0f0f0] text-[#555] text-2xl dark:text-[#888] p-2"
        >
          <FaCode className="rounded-full" />
        </button>
        <button
          title="Live Demo"
          className="rounded-full dark:bg-[#333] bg-[#f0f0f0] text-[#555] text-2xl dark:text-[#888] p-2"
        >
          <AiOutlineGlobal className="rounded-full" />
        </button>
      </div>
      <button
        onClick={() => setHide(!hide)}
        className="rounded-full dark:bg-[#333] bg-[#f0f0f0] text-2xl text-[#555] dark:text-[#888] p-2"
      >
        {hide ? (
          <FaAngleDown title="Hide" className="rounded-full" />
        ) : (
          <FaAngleUp title="Show" className="rounded-full" />
        )}
      </button>
    </div>
  );
}
