import React from "react";
import {
  Sidebar,
  SidebarItemGroup,
  SidebarItems,
  SidebarItem,
  Tooltip,
} from "flowbite-react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  CogIcon,
  BookmarkIcon
} from "@heroicons/react/24/outline";

export default function SidebarComponent() {
  return (
    <Sidebar
      collapsed="true"
      aria-label="Sidebar"
      className="fixed bottom-0 left-0 right-0 sm:relative sm:h-screen sm:w-14 bg-white dark:bg-[#171717] border-t sm:border-t-0 sm:border-r border-[#ddd] dark:border-[#333] p-2 sm:py-3"
    >
      <SidebarItems className="w-full">
        <SidebarItemGroup className="flex justify-center sm:flex-col gap-4 sm:gap-2 border-0">
          <SidebarItem
            icon={HomeIcon}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424] text-gray-700 dark:gray-300"
          >
            <span className="sr-only">Home</span>
          </SidebarItem>

          <SidebarItem
            icon={MagnifyingGlassIcon}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424] text-gray-700 dark:gray-300"
          >
            <span className="sr-only">Search</span>
          </SidebarItem>
          <SidebarItem
            icon={BookmarkIcon}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424] text-gray-700 dark:gray-300"
          >
            <span className="sr-only">Pinned</span>
          </SidebarItem>
          <SidebarItem
            icon={CogIcon}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424] text-gray-700 dark:gray-300"
          >
            <span className="sr-only">Settings</span>
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
