import {
  Sidebar,
  SidebarItemGroup,
  SidebarItems,
  SidebarItem,
} from "flowbite-react";

import { Files, Search, PinIcon, Settings } from "lucide-react";

export default function NavPanel(props) {
  const { isExplorerOpen, toggleExplorer, toggleModal } = props;

  const style = {};

  return (
    <Sidebar
      theme={{
        root: {
          inner: "bg-white dark:bg-[#171717]",
        },
      }}
      collapsed="true"
      aria-label="Sidebar"
      className="fixed bottom-0 left-0 right-0 sm:relative sm:h-screen sm:w-14 bg-white dark:bg-[#171717] border-t sm:border-t-0 sm:border-r border-[#ddd] dark:border-[#333] p-2 sm:py-3"
    >
      <SidebarItems className="w-full">
        <SidebarItemGroup className="flex justify-center sm:flex-col gap-4 sm:gap-2 border-0">
          <SidebarItem
            as="button"
            tabIndex={1}
            onClick={() => toggleExplorer()}
            icon={() => <Files className="text-gray-600 dark:text-gray-300" />}
            className={`${
              isExplorerOpen &&
              "border-l-2 border-blue-500 rounded-none rounded-r-lg"
            } cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424]`}
          >
            Explorer
          </SidebarItem>

          <SidebarItem
            as="button"
            tabIndex={2}
            onClick={() => toggleModal()}
            icon={() => <Search className="text-gray-600 dark:text-gray-300" />}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424]"
          >
            Search
          </SidebarItem>
          <SidebarItem
            as="button"
            tabIndex={3}
            onClick={() => toggleModal()}
            icon={() => (
              <PinIcon className="text-gray-600 dark:text-gray-300" />
            )}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424]"
          >
            Pinned
          </SidebarItem>
          <SidebarItem
            as="button"
            tabIndex={4}
            onClick={() => toggleModal()}
            icon={() => (
              <Settings className="text-gray-600 dark:text-gray-300" />
            )}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424]"
          >
            Settings
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
