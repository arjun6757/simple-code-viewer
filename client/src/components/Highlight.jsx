import { Loader } from "./Spinner/Loader";
import hljs from "highlight.js";
import { useEffect, useRef } from "react";
import { useRepo } from "../store/repo";

export default function Highlight({ loading, raw, night }) {
  const codeRef = useRef(null);
  const { ext } = useRepo();

  useEffect(() => {
    const loadTheme = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = night
        ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/circus.min.css"
        : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/intellij-light.min.css";

      document.head.appendChild(link);
    };

    loadTheme();
  }, [night]);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [raw]);

  const spinner = (
    <div className="w-full h-full flex justify-center">
      <Loader size="lg" />
    </div>
  );

  const projectName = (
    <span className=" border-l-2 py-0 rounded-md rounded-l-none border-l-gray-500 dark:border-l-gray-300 bg-slate-200 dark:bg-slate-700 dark:text-gray-400 pr-2">
      simple-code-viewer
    </span>
  );

  const Intro = (
    <div className="select-none font-code gap-3 text-[#888] flex flex-col h-screen place-content-center items-center">
      <div className="text-2xl flex gap-3">
        Inspect with ease at {projectName}
      </div>
      <p className="text-xs font-inter">
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
        {raw}
      </code>
    </pre>
  );

  const empty = raw.length === 0;

  return loading ? spinner : empty ? Intro : highlighted;
}
