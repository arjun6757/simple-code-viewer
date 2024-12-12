import React from "react";

export default function LivePreview(props) {
  const frame = props.src ? (
    <iframe width={"100%"} height={"100%"} src={props.src}></iframe>
  ) : (
    <p className="bg-white text-black h-full w-full flex justify-center items-center">
      Something wrong ...(*￣０￣)ノ
    </p>
  );

  return (
    <div className="fixed left-0 flex justify-center items-center w-[430px] border-r border-[#ddd] dark:border-[#555] h-screen z-10">
      {frame}
    </div>
  );
}
