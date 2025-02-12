import React, { useEffect } from "react";
import { Loader } from "./Spinner/Loader.jsx";
import { useRepo } from "../store/repo.js";
import Alert from "./Alert.jsx";

export default function LivePreview({ live, toggleIsLive }) {

  if (!live) return;

  const { associatedLinkData: data, associatedLinkLoading: loading, associatedLinkError: error, fetchAssociatedLink } = useRepo();

  useEffect(() => {
    fetchAssociatedLink();
  }, []);

  const spinner = <Loader size="md" />

  const frame = (
    <iframe
      seamless
      className="w-full h-full rounded"
      src={data?.homepage_url}
    ></iframe>
  );

  const framePanel = (
    <div tabIndex={live ? 0 : -1} onKeyDown={(e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        e.preventDefault();
        toggleIsLive();
      }
    }} onClick={() => toggleIsLive()} className="w-screen h-screen fixed backdrop-blur-sm">
      <div className="bg-gray-300 dark:bg-[#222] z-10 relative left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] flex justify-center items-center sm:w-[430px] border border-[#ddd] rounded dark:border-[#555] h-[90vh]">
        {loading ? spinner : error ? <Alert error={error} /> : frame}
      </div>
    </div>
  );

  return framePanel;
}
