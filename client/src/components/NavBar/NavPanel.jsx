import {
  Sidebar,
  SidebarItemGroup,
  SidebarItems,
  SidebarItem,
} from "flowbite-react";

import { Files, Search, PinIcon } from "lucide-react";

export default function NavPanel(props) {
  const { isExplorerOpen, toggleExplorer, toggleModal } = props;

  return (
    <Sidebar
      theme={{
        root: {
          inner: "bg-white dark:bg-[#171717]",
        },
      }}
      collapsed="true"
      aria-label="Sidebar"
      className="text-sm relative h-screen w-14 bg-white dark:bg-[#171717] border-r border-[#ddd] dark:border-[#333] p-2 py-3"
    >
      <SidebarItems className="w-full">
        <SidebarItemGroup className="flex justify-center sm:flex-col gap-4 sm:gap-2 border-0">
          <SidebarItem
            as="button"
            onClick={() => toggleExplorer()}
            icon={() => <Files className="text-gray-600 dark:text-gray-300" />}
            className={`cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424] !rounded`}
          >
            Explorer
          </SidebarItem>

          <SidebarItem
            as="button"
            onClick={() => toggleModal()}
            icon={() => <Search className="text-gray-600 dark:text-gray-300" />}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424] !rounded"
          >
            Search
          </SidebarItem>
          <SidebarItem
            as="button"
            onClick={() => toggleModal()}
            icon={() => (
              <PinIcon className="text-gray-600 dark:text-gray-300" />
            )}
            className="cursor-pointer hover:bg-[#f0f0f0] dark:hover:bg-[#242424] !rounded"
          >
            Pinned
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
