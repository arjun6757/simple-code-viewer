import React, { useEffect, useState } from "react";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { FaAngleDown, FaAngleUp, FaCode } from "react-icons/fa6";
import { AiOutlineGlobal } from "react-icons/ai";
import { TbLayoutSidebar, TbLayoutSidebarFilled } from "react-icons/tb";
import { useLocalStorage } from "../useLocalStorage";

export default function ToggleBar(props) {
  const [hide, setHide] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage('simple-code-viewer--dark-theme', false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [LivePreview, setLivePreview] = useState(false);

  useEffect(() => {
    props.theme(darkMode);
  }, [darkMode, props.theme]);

  useEffect(() => {
    props.livedemo(LivePreview);
  }, [LivePreview, props.livedemo]);

  useEffect(() => {
    props.sidebar(hideSidebar);
  }, [hideSidebar, props.sidebar]);

  const handleToggleSidebar = () => {
    setHideSidebar((prev) => !prev);
  };

  const handleClick = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="fixed right-5 bottom-5 sm:right-8 sm:bottom-5 bg-transparent flex flex-col gap-4 items-center transition-transform ease-in-out duration-500 w-14">
      <div
        className={`flex flex-col items-center gap-4 transition-opacity duration-500 w-full p-1 ${
          hide ? " opacity-100 pointer-events-auto" : " opacity-0 pointer-events-none"
        }`}
        aria-hidden={!hide}
        tabIndex={hide ? 0 : -1}
      >
        <button
          title={hideSidebar ? "Open Sidebar" : "Close Sidebar"}
          onClick={handleToggleSidebar}
          className="rounded-full dark:bg-[#333] bg-[#f0f0f0] text-[#555] text-2xl dark:text-[#888] p-2"
          tabIndex={hide ? 0 : -1}
        >
          {hideSidebar ? (
            <TbLayoutSidebar className="rounded-full" />
          ) : (
            <TbLayoutSidebarFilled className="rounded-full" />
          )}
        </button>
        <button
          title="Toggle Darkmode"
          onClick={handleClick}
          className={`rounded-full dark:bg-[#333] bg-[#f0f0f0] text-[#555] text-2xl dark:text-[#888] p-2`}
          tabIndex={hide ? 0 : -1}
        >
          {darkMode ? (
            <MdDarkMode className="rounded-full" />
          ) : (
            <MdOutlineDarkMode className="rounded-full" />
          )}
        </button>
        <button
        onClick={()=> setLivePreview(prev=> !prev)}
          title="Live Demo"
          className="rounded-full dark:bg-[#333] bg-[#f0f0f0] text-[#555] text-2xl dark:text-[#888] p-2"
          tabIndex={hide ? 0 : -1}
        >
          <AiOutlineGlobal className="rounded-full" />
        </button>
      </div>
      <button
        title={hide ? 'Collapse' : 'Expand'}
        onClick={() => setHide(!hide)}
        className="rounded-full dark:bg-[#333] bg-[#f0f0f0] text-2xl text-[#555] dark:text-[#888] p-2"
      >
        {hide ? (
          <FaAngleDown className="rounded-full" />
        ) : (
          <FaAngleUp className="rounded-full" />
        )}
      </button>
    </div>
  );
}
