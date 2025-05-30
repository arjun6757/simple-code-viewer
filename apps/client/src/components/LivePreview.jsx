import { useEffect } from "react";
import { Loader } from "./Loader.jsx";
import { useRepo } from "@/store/repo.store.js";
import Alert from "./Alert.jsx";
import { useUI } from "@/store/ui.store.js";

export default function LivePreview() {

  const { live: isLive, toggleLive: toggleIsLive } = useUI();

  const {
    associatedLinkData: data,
    associatedLinkLoading: loading,
    associatedLinkError: error,
    fetchAssociatedLink} = useRepo();

  useEffect(() => {
    fetchAssociatedLink();
  }, [isLive, fetchAssociatedLink]);

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
        {loading ? spinner : error ? <Alert message={error} /> : frame}
      </div>
    </div>
  );

  return isLive && framePanel;
}
