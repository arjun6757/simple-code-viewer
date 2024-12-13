import React, { useEffect, useState, useRef } from "react";
import ClockSpin from "./ClockSpin";

export default function LivePreview(props) {
  const { live, src } = props;

  const frame = (
    <iframe seamless width={"100%"} height={"100%"} src={src}></iframe>
  );

  return (
    live &&
    <div className="fixed left-0 flex justify-center items-center w-[430px] border-r border-[#ddd] dark:border-[#555] h-screen z-10">
      {frame}
    </div>
  );
}
