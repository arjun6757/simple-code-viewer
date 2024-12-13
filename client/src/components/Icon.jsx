import React from "react";

import { SiReact, SiBrandfolder, SiVite } from "@icons-pack/react-simple-icons";
import { FaCss3Alt, FaHtml5, FaJs, FaMarkdown } from "react-icons/fa6";
import { LuFileJson } from "react-icons/lu";
import { TbBrandCpp, TbSvg } from "react-icons/tb";
import { RiTailwindCssFill } from "react-icons/ri";
import { BsFiletypeSvg } from "react-icons/bs";
import { SiTypescript } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa";
import { AiFillFile, AiFillFolder } from "react-icons/ai";

export default function Icon(props) {
  const { name, type } = props;

  const checkConfig = (name) => {
    switch (name) {
      case "tailwind.config.js":
        return <RiTailwindCssFill className="text-teal-400 text-2xl" />;
      case "vite.config.js":
        return <SiVite className="text-purple-400 text-2xl" />;
    }
  };

  const getIcon = (name, type) => {

    if (type === "dir") {
      return <AiFillFolder className="text-yellow-500 text-2xl" />;
    } else if (checkConfig(name)) {
      return checkConfig(name);
    }

    const ext = String(name).split(".").pop(); // extract the last item (file extension)

    switch (ext) {
      case "html":
        return <FaHtml5 className="text-orange-600 text-2xl" />;
      case "css":
        return <FaCss3Alt className="text-blue-600 text-2xl" />;
      case "js":
        return <FaJs className="text-yellow-400 text-2xl" />;
      case "jsx":
      case "tsx":
        return <SiReact className="text-cyan-400 text-2xl" />;
      case "json":
        return <LuFileJson className="text-yellow-500 text-2xl" />;
      case "cpp":
        return <TbBrandCpp className="text-blue-700 text-2xl" />;
      case "md":
        return <FaMarkdown className="text-indigo-600 text-2xl" />;
      case "svg":
        return <BsFiletypeSvg className="text-orange-500 text-2xl" />;
      case "ts":
        return <SiTypescript className="text-blue-500 text-2xl" />;
      case "gitignore":
        return <FaGitAlt className="text-red-500 text-2xl" />;
      default:
        return <AiFillFile className="text-gray-500 text-2xl" />;
    }
  };

  return getIcon(name, type);
}
