'use client';

import { Loader } from "./Loader";
import hljs from "highlight.js";
import { useEffect, useRef } from "react";
import { useRepo } from "@/store/repo";
import { useTheme } from "@/app/context/ThemeProvider";

export default function Highlight() {

  const codeRef = useRef(null);
  const { ext, loadingInnerText: loading, innerText: text } = useRepo();
  const { isDark } = useTheme();

  useEffect(() => {
    const loadTheme = () => {

      const exist = document.getElementById('highlightjs-cdn');

      if (exist) {
        exist.remove();
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = isDark
        ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/circus.min.css"
        : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/intellij-light.min.css";

      link.id = 'highlightjs-cdn';

      document.head.appendChild(link);
    };

    loadTheme();
  }, [isDark]);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [text]);

  const spinner = <Loader className="w-full h-full" center="xy" size="lg" />;

  const styledProjectName = (
    <span className=" border-l-2 py-0 rounded-md rounded-l-none border-l-gray-500 dark:border-l-gray-300 bg-slate-200 dark:bg-slate-700 dark:text-gray-400 pr-2">
      simple-code-viewer
    </span>
  );

  const Intro = (
    <div className="select-none font-code gap-1 sm:gap-3 text-[#888] flex flex-col h-screen place-content-center items-center text-nowrap">
      <div className="text-xs sm:text-sm md:text-lg lg:text-2xl flex gap-1 sm:gap-3">
        Read code with ease at {styledProjectName}
      </div>
      <p className="text-[10px] sm:text-xs font-inter">
        Created with ❤️ by{" "}
        <a href="https://github.com/arjun6757" className="hover:underline">
          arjun6757
        </a>
      </p>
    </div>
  );

  const langExtensions = [
    "js", "mjs", "cjs",
    "ts", "tsx",
    "jsx",
    "json",
    "py",
    "c", "h",
    "cpp", "cc", "cxx", "hpp",
    "java",
    "cs",
    "rb",
    "go",
    "rs",
    "php",
    "html", "htm",
    "css", "scss", "sass",
    "md",
    "sh", "bash",
    "yml", "yaml",
    "xml",
    "toml",
    "ini",
    "vue",
    "svelte",
    "kt", "kts",
    "swift",
    "dart",
    "sql",
    "r",
    "lua",
    "make", "mk",
    "Dockerfile",
    "bat", "cmd",
    "pl",
    "coffee",
    "erl", "ex", "exs",
    "zig",
    "asm",
    "lock"
  ];

  const purify = (extension) => {
    if (langExtensions.includes(extension)) {
      return extension;
    } else {
      return "plaintext";
    }

  }

  const highlighted = (
    <pre className={`language-${purify(ext)}`}>
      <code
        ref={codeRef}
        className={`language-${purify(ext)} scrollbar-thin text-sm font-code`}
      >
        {text}
      </code>
    </pre>
  );

  const empty = text.length === 0;

  return loading ? spinner : empty ? Intro : highlighted;
}
