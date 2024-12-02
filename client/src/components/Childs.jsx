import React, { useEffect, useState } from "react";
import Spin from "./ClockSpin";

export default function Childs({ data}) {

  const childs = data;

  console.log(childs);
  return (
    <div>
      {childs.map((file, index) => {
        // <div
        //   key={`${file.path}${index}` || `${file.name}${index}`}
        //   data-id={index}
        //   className={`ml-3 pl-2 border-l-[1px] border-[#555]`}
        // >
        //   {file.name}
        // </div>;
        
        <p className="text-white text-6xl">file.name</p>

      })}
    </div>
  );
}
