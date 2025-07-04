"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PinnedItems from "./PinnedItems";
import SearchItems from "./SearchItems";
import Alert from "@/components/Alert";
import { useRepo } from "@/store/repo.store";
import { useUI } from "@/store/ui.store";

export default function SearchModal() {
  const {
    activeModal: mode,
    modal: isModalOpen,
    toggleModal,
    setModalOpen,
  } = useUI();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [itemsLength, setItemsLength] = useState(0);
  const [items, setItems] = useState(null);
  const { fetchSelected, error, owner: currentUser } = useRepo();
  const inputRef = useRef(null);

  useEffect(() => {
    if(isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen])

  const emptyTxt = (
    <p className="flex justify-center items-center">It&apos;s empty here</p>
  );

  if (error) {
    <Alert message={error} />;
  }

  useEffect(() => {
    setQuery("");
  }, [mode]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => {
        if (e.key === "ArrowDown") {
          return (prev + 1) % itemsLength;
        } else if (e.key === "ArrowUp") {
          return (prev - 1 + itemsLength) % itemsLength;
        }
      });
    }

    if (e.key === "Enter") {
      e.stopPropagation();
      e.preventDefault();
      let name = "";
      let owner = "";
      if (mode === "PinnedItems") {
        name = items[selectedIndex].node.name;
        owner = currentUser;
      } else if (mode === "SearchItems") {
        name = items[selectedIndex].name;
        owner = items[selectedIndex].owner;
      }

      fetchSelected({ user: owner, selected: name });
      setModalOpen(false);
    }
  };

  return (
    <div
      onClick={() => toggleModal()}
      data-open={isModalOpen}
      className="data-[open=true]:flex data-[open=false]:hidden fixed top-0 left-0 z-1 select-none w-full h-full justify-center items-center bg-gray-900/50 dark:bg-[#171717]/70 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl lg:min-w-xl bg-white dark:bg-[#222] rounded-lg shadow-lg z-10"
      >
        <button
          onClick={() => toggleModal()}
          className="flex md:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 rounded-full w-12 h-12 shadow-sm bg-white dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#272727] active:bg-gray-300 dark:active:bg-[#333] transition-colors text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <X className="w-fit mx-auto h-fit self-center" />
        </button>

        <div className="text-sm p-4 border-b border-[#ddd] dark:border-[#333]">
          <div tabIndex={0} className="border-none bg-transparent w-full font-inter text-gray-600 dark:text-gray-400 flex gap-4">
            <Search />
            <input
              ref={inputRef}
              className="w-full outline-none placeholder:text-inherit"
              type="text"
              onKeyDown={handleKeyDown}
              placeholder="Type here to search"
              autoFocus={isModalOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="p-4 font-inter text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
          {mode === "PinnedItems" ? (
            <PinnedItems
              query={query}
              length={(value) => setItemsLength(value)}
              selectedIndex={selectedIndex}
              items={(items) => setItems(items)}
              emptyTxt={emptyTxt}
            />
          ) : (
            mode === "SearchItems" && (
              <SearchItems
                query={query}
                length={(value) => setItemsLength(value)}
                selectedIndex={selectedIndex}
                items={(items) => setItems(items)}
                emptyTxt={emptyTxt}
              />
            )
          )}
        </div>

        <div className="p-4 text-sm font-inter text-gray-600 dark:text-gray-400 border-t border-[#ddd] dark:border-[#333]">
          Copyright &copy; {new Date().getFullYear()} Arjun Banerjee
        </div>
      </div>
    </div>
  );
}
