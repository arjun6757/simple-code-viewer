import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TextInput,
} from "flowbite-react";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import ModalItems from "./ModalItems";

export default function SearchComponent({ isModalOpen, toggleModal }) {
  const [query, setQuery] = useState("");
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // const [itemsLength, setItemsLength] = useState(0);

  // const handleKeyDown = (e) => {
  //   if (e.key === "ArrowUp") {
  //     setSelectedIndex((prev) => prev - 1);
  //   } else if (e.key === "ArrowDown") {
  //     setSelectedIndex((prev) => prev + 1);
  //   }
  // };

  // const handleLength = (value) => {
  //   setItemsLength(value);
  // };

  // useEffect(() => {
  //   console.log(selectedIndex);
  // }, [selectedIndex]);

  // useEffect(() => {
  //   console.log("length: ", itemsLength);
  // }, [itemsLength]);

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
          // onKeyDown={handleKeyDown}
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
        <ModalItems query={query} />
      </ModalBody>

      <ModalFooter className={styles.footer}>
        Created with flowbite if you are wondering.
      </ModalFooter>
    </Modal>
  );
}
