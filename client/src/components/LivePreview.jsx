import React, { useContext, useEffect } from "react";
import { Loader } from "./Spinner/Loader.jsx";
import { useRepo } from "../store/repo.js";
import Alert from "./Alert.jsx";
import { ActionsContext } from "../context/ActionsContext.js";

export default function LivePreview() {

  const { isLive, toggleIsLive } = useContext(ActionsContext);

  const {
    associatedLinkData: data,
    associatedLinkLoading: loading,
    associatedLinkError: error,
    fetchAssociatedLink} = useRepo();

  useEffect(() => {
    fetchAssociatedLink();
  }, [isLive]);

  const spinner = <Loader size="md" />

  const frame = (
    <iframe
      seamless
      className="w-full h-full rounded-lg sm:rounded"
      src={data?.homepage_url}
    ></iframe>
  );

  const framePanel = (
    <div onClick={() => toggleIsLive()} className="w-screen h-dvh fixed backdrop-blur-sm">
      <div className="bg-gray-300 dark:bg-[#222] z-10 relative left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] flex justify-center items-center sm:w-[430px] border border-[#ddd] rounded-lg sm:rounded dark:border-[#555] h-[80vh] sm:h-[90vh]">
        {loading ? spinner : error ? <Alert error={error} /> : frame}
      </div>
    </div>
  );

  return isLive && framePanel;
}
