import React from "react";

export default function LivePreview() {
  const frame = (
    <iframe width={"100%"} height={"100%"} src="https://simple-code-viewer.vercel.app/"></iframe>
  );

  return <div className="fixed left-0 flex justify-center items-center w-[430px] border-r border-[#ddd] dark:border-[#555] h-screen z-10">{frame}</div>;
}

//it is getting the site in mobile format