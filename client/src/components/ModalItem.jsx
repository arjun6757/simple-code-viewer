export default function ModalItem({ data, defaultIndex, index, url }) {
  return (
    <a
      href={url}
      tabIndex={index}
      className={`${
        index === defaultIndex ? "bg-blue-600" : null
      } text-gray-700 dark:text-gray-300 px-4 py-2 hover:bg-blue-600 rounded-md cursor-pointer`}
    >
      {data}
    </a>
  );
}

//need the first one to be selected and should be able to navigate with arrow keys
