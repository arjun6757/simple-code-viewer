import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { FaAngleDown, FaAngleUp, FaCode } from "react-icons/fa6";
import { AiOutlineGlobal } from "react-icons/ai";

export default function Header(props) {
  const [hide, setHide] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  // const { theme } = props;

  useEffect(() => {
    props.theme(darkMode);
  }, [darkMode, props.theme])

  const handleClick = () => {
    setDarkMode(prev=> !prev);
  }

  return (
    <div className="flex flex-col gap-4 items-center transition-transform ease-in-out duration-500">
      <div
        className={`flex flex-col items-center gap-4 overflow-hidden transition-all duration-500 ${
          hide ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <button
        title="Toggle"
          onClick={handleClick}
          className={`rounded-full dark:bg-[#333] bg-[#f0f0f0] text-[#555] text-2xl dark:text-[#888] p-2`}
        >
          <MdDarkMode className="rounded-full" />
        </button>
        <button title="Code" className="rounded-full dark:bg-[#333] bg-[#f0f0f0] text-[#555] text-2xl dark:text-[#888] p-2">
          <FaCode className="rounded-full" />
        </button>
        <button title="Live Demo" className="rounded-full dark:bg-[#333] bg-[#f0f0f0] text-[#555] text-2xl dark:text-[#888] p-2">
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
