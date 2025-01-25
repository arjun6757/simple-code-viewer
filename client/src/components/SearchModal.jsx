import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TextInput,
} from "flowbite-react";

import { Search } from "lucide-react";

import { useState } from "react";

export default function SearchComponent(props) {
  const { isSettingsOpen, toggleSettings } = props;
  const [query, setQuery] = useState("");

  const handleSearch = () => {};

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
          inner: "bg-white dark:!bg-[#222] rounded-lg",
        },
      }}
      dismissible
      size="xl"
      show={isSettingsOpen}
      onClose={() => toggleSettings()}
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
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum quidem,
        magnam quae voluptatem assumenda aspernatur, iusto est sed ipsam unde
        sint rerum odit dignissimos tempore, itaque minus cupiditate eum
        distinctio.
      </ModalBody>

      <ModalFooter className={styles.footer}>
        Created with flowbite if you are wondering.
      </ModalFooter>
    </Modal>
  );
}
