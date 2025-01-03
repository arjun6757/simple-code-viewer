import React, { useEffect, useState, useRef } from "react";

export default function LivePreview({ live, src }) {
  const frame = (
    <iframe seamless width={"100%"} height={"100%"} src={src}></iframe>
  );

  const framePanel = (
    <div className="z-10 fixed w-[80vw] sm:left-0 flex justify-center items-center sm:w-[430px] border-r border-[#ddd] dark:border-[#555] h-screen">
      {frame}
    </div>
  );

  return live && framePanel;
}
