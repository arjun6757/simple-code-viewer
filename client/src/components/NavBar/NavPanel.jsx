import React from "react";
import {
  Sidebar,
  SidebarItemGroup,
  SidebarItems,
  SidebarItem,
} from "flowbite-react";

import { Files, Search, PinIcon, Settings } from "lucide-react";

export default function NavPanel() {
  return (
    <Sidebar
      collapsed="true"
      aria-label="Sidebar"
      className="fixed bottom-0 left-0 right-0 sm:relative sm:h-screen sm:w-14 bg-white dark:bg-[#171717] border-t sm:border-t-0 sm:border-r border-[#ddd] dark:border-[#333] p-2 sm:py-3"
    >
      <SidebarItems className="w-full">
        <SidebarItemGroup className="flex justify-center sm:flex-col gap-4 sm:gap-2 border-0">
          <SidebarItem
            icon={() => <Files className="text-gray-600 dark:text-gray-300" />}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424]"
          >
            <span className="sr-only">Home</span>
          </SidebarItem>

          <SidebarItem
            icon={() => <Search className="text-gray-600 dark:text-gray-300" />}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424]"
          >
            <span className="sr-only">Search</span>
          </SidebarItem>
          <SidebarItem
            icon={() => (
              <PinIcon className="text-gray-600 dark:text-gray-300" />
            )}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424]"
          >
            <span className="sr-only">Pinned</span>
          </SidebarItem>
          <SidebarItem
            icon={() => (
              <Settings className="text-gray-600 dark:text-gray-300" />
            )}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424]"
          >
            <span className="sr-only">Settings</span>
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
