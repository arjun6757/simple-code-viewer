import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TextInput,
} from "flowbite-react";

import { Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import PinnedItems from "./PinnedItems";
import { ModalContext } from "../../context/ModalContext";
import SearchItems from "./SearchItems";
import { useRepo } from "../../store/repo";
import Alert from "../Alert";

export default function SearchComponent() {
  
  const { mode, isModalOpen, toggleModal, setModalOpen } = useContext(ModalContext);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [itemsLength, setItemsLength] = useState(0);
  const [items, setItems] = useState(null);
  const { fetchSelected, error, owner: currentUser } = useRepo();

  if (error) {
    <Alert error={error} />
  }

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
      let name = '';
      let owner = '';
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
    >
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
          />
        ) : mode === "SearchItems" && (
          <SearchItems
            query={query}
            length={(value) => setItemsLength(value)}
            selectedIndex={selectedIndex}
            items={(items) => setItems(items)}
          />
        )}

      </ModalBody>

      {mode === "PinnedItems" && (
        <ModalFooter className={styles.footer}>
          Created with flowbite if you are wondering.
        </ModalFooter>
      )}
    </Modal>
  );
}
