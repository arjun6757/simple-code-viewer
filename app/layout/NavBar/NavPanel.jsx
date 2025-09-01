"use client";
import { Files, Search, PinIcon } from "lucide-react";
import { useUI } from "@/store/ui.store";
import { useRepo } from "@/store/repo";
import toaster from "react-hot-toast"

export default function NavPanel() {

  const { switchTo, toggleExplorer } = useUI();
  const { fetchPinned, owner } = useRepo()

  return (
    <div
      aria-label="Sidebar"
      className="flex flex-col justify-between text-sm relative h-screen w-14 bg-white dark:bg-[#171717] border-r border-[#ddd] dark:border-[#333] p-2 py-3"
    >

      <div className="flex flex-col gap-4">
        <button
          onClick={() => toggleExplorer()}
          className={`cursor-pointer py-2 hover:bg-[#f0f0f0] flex justify-center dark:hover:bg-[#242424] rounded`}
        >
          <Files className="text-gray-600 dark:text-gray-300" />
        </button>

        <button
          onClick={() => switchTo("SearchItems")}
          className="cursor-pointer py-2 hover:bg-[#f0f0f0] flex justify-center dark:hover:bg-[#242424] rounded"
        >
          <Search className="text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={() => {
            switchTo("PinnedItems")
            fetchPinned()
          }}
          className="cursor-pointer py-2 hover:bg-[#f0f0f0] flex justify-center dark:hover:bg-[#242424] rounded"
        >
          <PinIcon className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <button onClick={() => toaster.success(owner)} className="mb-5 border border-[#ddd] dark:border-[#333] rounded-full p-2 flex justify-center items-center">
        {owner.substring(0, 1).toUpperCase()}
      </button>

    </div>
  );
}
