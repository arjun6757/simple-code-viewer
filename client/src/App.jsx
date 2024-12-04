import { useState, useEffect, useRef } from "react";
import Code from "./components/Code";
import Highlight from "./components/Highlight";
import Header from "./components/Header";

export default function App() {
  const [ext, setExt] = useState("");
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(false);
  const codeView = useRef(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (dark) => {
    dark ? setDarkMode(true) : setDarkMode(false);
  }

  useEffect(() => {
    const html = document.documentElement; //gets a reference to the root node
    if (darkMode) {
      html.classList.add("dark");
      if(codeView.current) {
        codeView.current.style.scrollbarColor = "#555 transparent";
      }
    } else {
      html.classList.remove("dark");
      if(codeView.current) {
        codeView.current.style.scrollbarColor = "";
      }
    }

    //save the user's preference
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]); //whenever darkmode changes it will automatically set it to the root

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);  //will run when the window loads maybe ?

  const getData = async (url) => {
    setLoading(true);
    try {
      // fetch raw text
      const response = await fetch(url, { method: "GET" });
      const textData = await response.text();
      return textData;
    } catch (error) {
      console.log("Error fetching data:", error);
      return `Error: ${error.message}`;
    } finally {
      setLoading(false);
    }
  };

  const handleFilePress = async (url, ext) => {
    setRaw("");
    setLoading(true);
    const fetchedData = await getData(url);
    setExt(ext);
    setRaw(fetchedData);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-[1fr_4fr] bg-white dark:bg-[#282c34] w-screen h-screen overflow-hidden">
      <div className="fixed right-8 bottom-5 bg-transparent">
        <Header theme={toggleDarkMode} />
      </div>

      <Code
        press={handleFilePress}
      />

      <div id="code-view" ref={codeView} className="overflow-y-scroll bg-white dark:bg-[#282c34]">
        <Highlight loading={loading} raw={raw} ext={ext} night={darkMode} />
      </div>
    </div>
  );
}
