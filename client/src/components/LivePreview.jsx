import React, { useEffect, useState, useRef } from "react";
import useFetch from "../components/hooks/useFetch.js";
import { Spinner } from "flowbite-react";

export default function LivePreview({ live, toggleIsLive }) {
  if (!live) return;

  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/code/repo/get/homepage_url"
  );

  if (error) {
    return <p className="text-center text-xl">{error.message}</p>;
  }

  const loadingAnimation = <Spinner />;

  const frame = (
    <iframe
      seamless
      width={"100%"}
      height={"100%"}
      src={data?.homepage_url}
    ></iframe>
  );

  const framePanel = (
    <div onClick={() => toggleIsLive()} className="w-screen h-screen fixed backdrop-blur-sm">
      <div className="bg-[#222] z-10 relative w-[80vw] flex justify-center items-center sm:w-[430px] border-r border-[#ddd] dark:border-[#555] h-screen">
        {loading ? loadingAnimation : frame}
      </div>
    </div>
  );

  return framePanel;
}
