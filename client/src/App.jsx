import { useState, useEffect, useRef } from "react";
import ExplorerPanel from "./components/Explorer/ExplorerPanel.jsx";
import Highlight from "./components/Highlight";
import ToggleBar from "./components/ToggleBar";
import LivePreview from "./components/LivePreview";
import { MdOutlineDone } from "react-icons/md";
import NavPanel from "./components/NavBar/NavPanel.jsx";
import SearchModal from "./components/Modal/SearchModal.jsx";
import useExplorer from "./components/hooks/useExplorer.js";
import useModal from "./components/hooks/useModal.js";
import useTheme from "./components/hooks/useTheme.js";
import useTogglebar from "./components/hooks/useTogglebar.js";
import useFrame from "./components/hooks/useFrame.js";
import PinnedRepos from "./components/PinnedRepos.jsx";

export default function App() {
  const [ext, setExt] = useState("");
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(false);
  const codeView = useRef(null);
  const [selectedRepo, setSelectedRepo] = useState("");
  const [success, setSuccess] = useState(false);
  const { toggleTogglebar, isTogglebarEnabled } = useTogglebar();
  const { toggleExplorer, isExplorerOpen } = useExplorer();
  const { toggleModal, isModalOpen } = useModal();
  const { toggleTheme, isDark } = useTheme();
  const { toggleIsLive, isLive } = useFrame();

  useEffect(() => {
    const html = document.documentElement; //gets a reference to the root node
    if (isDark) {
      html.classList.add("dark");
      html.style.colorScheme = "dark"; // one line fix for scrollbar issue
    } else {
      html.classList.remove("dark");
      html.style.colorScheme = "light";
    }
  }, [isDark]);

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

  const repoFetchedAlert = (
    <div
      className={`fixed z-50 capitalize text-[11px] sm:text-sm p-2 bottom-10 left-1/2 transform -translate-x-1/2 rounded-md text-[#333] dark:text-[#f9f9f9] bg-[#f0f0f0] dark:bg-[#242424] border border-[#ddd] dark:border-[#444] ${
        success ? "translate-y-0" : "translate-y-[400%]"
      } transition-transform delay-500`}
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
    <div className={`flex flex-col h-screen relative`}>
      {repoFetchedAlert}

      <SearchModal isModalOpen={isModalOpen} toggleModal={toggleModal} />

      <div className="flex overflow-hidden w-screen h-screen">
        <div>
          <NavPanel
            isExplorerOpen={isExplorerOpen}
            toggleExplorer={toggleExplorer}
            toggleModal={toggleModal}
          />
        </div>

        <div className="flex bg-white overflow-hidden flex-1 dark:bg-[#191919] h-full gap-4">
          <ExplorerPanel
            press={handleFilePress}
            reposelect={selectedRepo}
            success={onSuccessfullFetch}
            isExplorerOpen={isExplorerOpen}
          />

          <div
            id="code-view"
            ref={codeView}
            className="overflow-y-scroll scrollbar-thin flex-1 bg-white dark:bg-[#191919]"
          >
            <Highlight loading={loading} raw={raw} ext={ext} night={isDark} />
          </div>
        </div>
      </div>

      {isTogglebarEnabled && (
        <ToggleBar
          toggleTheme={toggleTheme}
          toggleExplorer={toggleExplorer}
          toggleIsLive={toggleIsLive}
          isExplorerOpen={isExplorerOpen}
          isDark={isDark}
        />
      )}

      <LivePreview live={isLive} toggleIsLive={toggleIsLive} />
    </div>
  );
}
