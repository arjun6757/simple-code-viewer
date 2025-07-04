"use client";

import { TouchEvent, useRef } from "react";
import { useUI } from "@/store/ui.store.js";
import FileTree from "./FileTree";

export default function ExplorerPanel() {
  const { explorer: isExplorerOpen } = useUI();
  const treeRef = useRef<HTMLDivElement | null>(null);

  const handleDrag = (e: any) => {
    e.preventDefault();
    const codeTree = treeRef.current;
    if(!codeTree) return;
    const startWidth = codeTree.offsetWidth;
    const startX = e.clientX;

    const mouseMove = (event: any) => {
      const newWidth = startWidth + (event.clientX - startX);
      codeTree.style.width = `${newWidth}px`;
    };

    const mouseUp = () => {
      //after releasing the drag this will be triggered
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };

    document.addEventListener("mousemove", mouseMove); //when cursor is moving
    document.addEventListener("mouseup", mouseUp); //when im releasing the dragging
  };

  const handleTouchDrag = (e: TouchEvent) => {
    // e.preventDefault();
    const codeTree = treeRef.current;
    if(!codeTree) return;
    const startWidth = codeTree.offsetWidth;
    const startX = e.touches[0].clientX;

    const touchMove = (event: any) => {
      const touch = event.touches[0];
      const newWidth = startWidth + (touch.clientX - startX);
      codeTree.style.width = `${newWidth}px`;
    };

    const touchRelease = () => {
      document.removeEventListener("touchmove", touchMove);
      document.removeEventListener("touchend", touchRelease);
    };

    document.addEventListener("touchmove", touchMove); //when cursor is moving
    document.addEventListener("touchend", touchRelease); //when im releasing the dragging
  };

  return (
    <div
      id="code-tree"
      ref={treeRef}
      data-open={isExplorerOpen}
      className="data-[open=true]:flex data-[open=false]:hidden bg-white dark:bg-[#171717] transition-transform duration-700 relative min-w-[10vw] sm:min-w-[18vw] lg:w-[20vw] max-w-[80vw] sm:max-w-[40vw] border-r-[1px] border-[#ddd] dark:border-[#555] text-black dark:text-white text-xs sm:text-sm select-none text-nowrap"
    >
      <div
        id="dragger"
        onMouseDown={handleDrag}
        onTouchStart={handleTouchDrag}
        className="absolute top-0 right-0 w-[2px] h-full bg-gray-500 opacity-0 cursor-ew-resize  hover:opacity-100 active:bg-opacity-100 transition-colors"
      />

      <div className="overflow-scroll w-full p-4 overflow-x-hidden">
        <FileTree />
      </div>
    </div >
  );
}
