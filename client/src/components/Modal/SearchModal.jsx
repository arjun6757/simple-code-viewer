import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TextInput,
} from "flowbite-react";

import { Search } from "lucide-react";
import { useState } from "react";
import ModalItems from "./ModalItems";

export default function SearchComponent({
  isModalOpen,
  toggleModal,
  repoSelected,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [itemsLength, setItemsLength] = useState(0);
  const [mode, setMode] = useState({
    activeMode: "",
    pinned: { enabled: false },
    query: { enabled: false },
  });

  const [items, setItems] = useState(null);

  const handleRepoPress = (name) => {
    toggleModal();
    repoSelected(name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      setSelectedIndex((prev) => {
        if (e.key === "ArrowDown") {
          return (prev + 1) % itemsLength;
        } else if (e.key === "ArrowUp") {
          return (prev - 1 + itemsLength) % itemsLength;
        }
      });
    }

    if (e.key === "Enter" && items) {
      e.preventDefault()
      const name = items[selectedIndex].node.name;
      toggleModal();
      repoSelected(name);
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
          placeholder="Search commands"
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
        <ModalItems
          query={query}
          length={(value) => setItemsLength(value)}
          selectedIndex={selectedIndex}
          repoPress={handleRepoPress}
          items={(items) => setItems(items)}
        />
      </ModalBody>

      <ModalFooter className={styles.footer}>
        Created with flowbite if you are wondering.
      </ModalFooter>
    </Modal>
  );
}
