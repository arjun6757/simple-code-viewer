import ClockSpin from "./Spinner/ClockSpin";
import hljs from "highlight.js";
import { useEffect, useRef } from "react";

export default function Highlight({ loading, raw, ext, night }) {
  const codeRef = useRef(null);

  const time = new Date().getFullYear();

  useEffect(() => {
    const loadTheme = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = night
        ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/circus.min.css"
        // "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css"
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
    <ClockSpin sx2="h-[5rem] w-[5rem] border-t-[2rem] border-l-[2rem] border-b-[2rem]" />
  );

  const emoji = (
    <span className="select-none text-7xl text-[#888] flex h-screen place-content-center items-center">
      (┬┬﹏┬┬)
    </span>
  );

  const extension = (ext) => {
    switch (ext) {
      case "gitignore":
      case "env":
      case "npmrc":
        return "plaintext";
      default:
        return ext;
    }
  };

  const highlighted = (
    <pre className={`language-${extension(ext)}`}>
      <code ref={codeRef} className={`language-${extension(ext)} scrollbar-thin text-sm font-code`}>
        {raw}
      </code>
    </pre>
  );

  const empty = raw.length === 0;

  return loading ? spinner : empty ? emoji : highlighted;
}
