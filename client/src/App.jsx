import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Highlight from "./components/Highlight";
import ToggleBar from "./components/ToggleBar";
import PinnedRepos from "./components/PinnedRepos";
import LivePreview from "./components/LivePreview";
import { MdOutlineDone } from "react-icons/md";

export default function App() {
  const [ext, setExt] = useState("");
  const [raw, setRaw] = useState("");
  const [hideSidebar, setHideSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const codeView = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [liveDemo, setLiveDemo] = useState(false);
  const [homepage, setHomepage] = useState("");
  const [success, setSuccess] = useState(false);

  const toggleDarkMode = (dark) => {
    dark ? setDarkMode(true) : setDarkMode(false);
  };

  const handleSidebarToggle = (value) => {
    setHideSidebar(value);
  };

  useEffect(() => {
    const html = document.documentElement; //gets a reference to the root node
    if (darkMode) {
      html.classList.add("dark");
      html.style.colorScheme = "dark"; // one line fix for scrollbar issue
    } else {
      html.classList.remove("dark");
      html.style.colorScheme = "light";
    }
  }, [darkMode]);

  const getRepoData = (name) => {
    setSelectedRepo(name);
  };

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

  const handleLiveDemo = (truth) => {
    truth ? setLiveDemo(true) : setLiveDemo(false);
  };

  useEffect(() => {
    const fetch_homepage = async () => {
      try {
        const result = await fetch(
          "https://simple-code-viewer.onrender.com/api/code/repo/get/homepage_url",
        );
        const data = await result.json();
        setHomepage(data.homepage_url);
      } catch (error) {
        console.error("error fetching homepage url for the repo", error);
      }
    };

    if (liveDemo) {
      fetch_homepage();
    }
  }, [liveDemo]);

  const repoFetchedAlert = (
    <div
      className={`fixed z-50 capitalize text-[11px] sm:text-sm p-2 bottom-10 left-1/2 transform -translate-x-1/2 rounded-md text-[#333] dark:text-[#f9f9f9] bg-[#f0f0f0] dark:bg-[#242424] border border-[#ddd] dark:border-[#444] ${success ? "translate-y-0" : "translate-y-[400%]"} transition-transform delay-500`}
    >
      <p className="flex gap-2 justify-center items-center">
        <MdOutlineDone className="text-green-500 rounded-full text-xl" /> repo
        fetched successfully!
      </p>
    </div>
  );

  useEffect(() => {
    const displayAlert = () => {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    };

    if (!success) return;
    displayAlert();
  }, [success]);

  const onSuccessfullFetch = (boolean) => {
    setSuccess(boolean);
  };

  return (
    <div className={`flex flex-col h-screen`}>
      {repoFetchedAlert}

      <div className="p-2 bg-white dark:bg-[#333] border-b border-[#ddd] dark:border-[#3a3939] dark:text-[#eee]">
        <PinnedRepos handleRepoClick={getRepoData} />
      </div>

      <div className="flex bg-white dark:bg-[#282c34] w-screen h-full overflow-hidden gap-4">
        <Sidebar
          hidesidebar={hideSidebar}
          press={handleFilePress}
          reposelect={selectedRepo}
          success={onSuccessfullFetch}
        />

        <div
          id="code-view"
          ref={codeView}
          className="overflow-y-scroll flex-1 bg-white dark:bg-[#282c34]"
        >
          <Highlight loading={loading} raw={raw} ext={ext} night={darkMode} />
        </div>
      </div>

      <ToggleBar
        theme={toggleDarkMode}
        sidebar={handleSidebarToggle}
        livedemo={handleLiveDemo}
      />

      <LivePreview src={homepage} live={liveDemo} />
    </div>
  );
}
