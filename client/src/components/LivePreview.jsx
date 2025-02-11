import React, { useEffect, useState, useRef } from "react";
// import useFetch from "../components/hooks/useFetch.js";
import { Loader } from "./Spinner/Loader.jsx";
import { useRepo } from "../store/repo.js";
import Alert from "./Alert.jsx";

export default function LivePreview({ live, toggleIsLive }) {
  
  if (!live) return;

  // const { data, loading, error } = useFetch(
  //   "/api/current/homepage_url"
  // );
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
    <div onClick={() => toggleIsLive()} className="w-screen h-screen fixed backdrop-blur-sm">
      <div className="bg-gray-300 dark:bg-[#222] z-10 relative left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vw] flex justify-center items-center sm:w-[430px] border border-[#ddd] rounded dark:border-[#555] h-[90vh]">
        {loading ? spinner : frame}
        {error && <Alert error={error} />}                 
      </div>
    </div>
  );

  return framePanel;
}
