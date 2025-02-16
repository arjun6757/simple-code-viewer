import { Loader } from "./Loader";
import hljs from "highlight.js";
import { useEffect, useRef } from "react";
import { useRepo } from "../store/repo";

export default function Highlight({ loading, text, isDark, error }) {

  const codeRef = useRef(null);
  const { ext } = useRepo();

  if (error) {
    <Alert message={error} />
  }

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

  const spinner = (
    <div className="w-full h-full flex justify-center">
      <Loader size="lg" />
    </div>
  );

  const styledProjectName = (
    <span className=" border-l-2 py-0 rounded-md rounded-l-none border-l-gray-500 dark:border-l-gray-300 bg-slate-200 dark:bg-slate-700 dark:text-gray-400 pr-2">
      simple-code-viewer
    </span>
  );

  const Intro = (
    <div className="select-none font-code gap-1 sm:gap-3 text-[#888] flex flex-col h-screen place-content-center items-center text-nowrap">
      <div className="text-xs sm:text-sm md:text-lg lg:text-2xl flex gap-1 sm:gap-3">
        Inspect with ease at {styledProjectName}
      </div>
      <p className="text-[10px] sm:text-xs font-inter">
        Created with ❤️ by{" "}
        <a href="https://github.com/arjun6757" className="hover:underline">
          arjun6757
        </a>
      </p>
    </div>
  );

  const purify = (extension) => {
    switch (extension) {
      case 'gitignore':
      case 'env':
      case 'bashrc':
      case 'npmrc':
        return "plaintext";
      default:
        return extension;
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
