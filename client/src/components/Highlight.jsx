import ClockSpin from "./ClockSpin";
import hljs from "highlight.js";
import "highlight.js/styles/intellij-light.css";
// import "highlight.js/styles/atom-one-dark.css";
import { useEffect, useRef } from "react";

export default function Highlight({ loading, raw, ext }) {
  
  const codeRef = useRef(null);

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
      <code ref={codeRef} className={`language-${extension(ext)}`}>
        {raw}
      </code>
    </pre>
  );

  const empty = raw.length === 0;

  return loading ? spinner : empty ? emoji : highlighted;
}
