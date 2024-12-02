import { useState } from "react";
import Code from "./components/Code";
import Highlight from "./components/Highlight";

export default function App() {
  const [ext, setExt] = useState("");
  const [raw, setRaw] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="grid grid-cols-[1fr_4fr] bg-[#242424] w-screen h-screen overflow-hidden">
      <Code
        press={handleFilePress}
        sx="bg-[#171717] text-[#f7f7f7] font-sans p-4 word-break break-all select-none"
      />

      <div id="code-view" className="overflow-y-scroll">
        <Highlight loading={loading} raw={raw} ext={ext} />
      </div>
    </div>
  );
}
