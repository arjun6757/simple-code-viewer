import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TextInput,
} from "flowbite-react";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
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

  const styles = {
    header: "!p-2 dark:border-[#333]",
    body: "!p-4 font-inter text-gray-600 dark:text-gray-400 text-sm leading-relaxed",
    footer:
      "!p-4 font-inter text-gray-600 dark:text-gray-400 text-sm dark:border-[#333]",
  };

  return (
    <Modal
      theme={{
        root: {
          base: "dark:!bg-[#171717] dark:!bg-opacity-70 backdrop-blur-sm",
        },
        content: {
          inner: "bg-white dark:!bg-[#222] !rounded-lg !transition-transform",
        },
      }}
      dismissible
      size="2xl"
      show={isModalOpen}
      onClose={() => toggleModal()}
      className="relative"
    >
      <button
        onClick={() => toggleModal()}
        className="flex md:hidden absolute bottom-20 left-1/2 transform -translate-x-1/2 rounded-full w-12 h-12 shadow-sm bg-white dark:bg-[#222] hover:bg-gray-200 dark:hover:bg-[#272727] active:bg-gray-300 dark:active:bg-[#333] transition-colors text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <X className="w-fit mx-auto h-fit self-center" />
      </button>
      <ModalHeader
        theme={{
          base: "!w-full border-b",
          close: {
            base: "!hidden",
          },
        }}
        className={styles.header}
      >
        <TextInput
          icon={Search}
          type="text"
          onKeyDown={handleKeyDown}
          placeholder="Type here to search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          theme={{
            field: {
              input: {
                base: "!border-none !bg-transparent !w-full !outline-none focus:!ring-0 !font-inter !text-gray-600 dark:!text-gray-400",
              },
            },
          }}
        ></TextInput>
      </ModalHeader>

      <ModalBody className={styles.body}>
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
      </ModalBody>

      <ModalFooter className={styles.footer}>
        This modal was made by modifying the existing flowbite modal.
      </ModalFooter>
    </Modal>
  );
}
