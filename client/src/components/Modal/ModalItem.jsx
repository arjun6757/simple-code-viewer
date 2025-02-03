import { useEffect, useState } from "react";
import useModalItem from "../hooks/useModalItem.js";

export default function ModalItem({ data, index, url, itemsLength }) {
  const { ModalItemRefs, setFocusIndex, setSelectIndex } = useModalItem();

  // useEffect(() => {
  //   console.log(itemsLength);
  // }, [itemsLength]);

  // const handleKeyDown = (e) => {
  //   setFocusIndex((prev) => {
  //     if (e.key === "ArrowDown") {
  //       console.log("length: ", itemsLength);
  //       return (prev + 1) % itemsLength;
  //     } else if (e.key === "ArrowUp") {
  //       console.log("length: ", itemsLength);
  //       return (prev - 1 + itemsLength) % itemsLength; // ( -1 + 6 ) % 6 = 5 meaning last index
  //     }
  //     return prev; // for other keys
  //   });
  // };

  const handleKeyDown = (e) => {
    setSelectIndex((prev) => {
      if (e.key === "ArrowDown") {
        console.log("length: ", itemsLength);
        return (prev + 1) % itemsLength;
      } else if (e.key === "ArrowUp") {
        console.log("length: ", itemsLength);
        return (prev - 1 + itemsLength) % itemsLength; // ( -1 + 6 ) % 6 = 5 meaning last index
      }
      return prev; // for other keys
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    //cleanup function
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // old style --> focus:bg-blue-500 focus:dark:bg-green-500 focus:text-gray-100 focus:outline-0

  return (
    <li
      tabIndex={0}
      ref={(item) => (ModalItemRefs.current[index] = item)} //setting index for each item in itemRefs
      className="px-4 py-2 hover:bg-blue-500 hover:dark:bg-green-500 hover:text-gray-100 hover:dark:text-gray-100 rounded-md cursor-pointer"
    >
      <a tabIndex={-1} href={url} className="block w-full h-full">
        {data}
      </a>
    </li>
  );
}

//need the first one to be focus and should be able to navigate with arrow keys
