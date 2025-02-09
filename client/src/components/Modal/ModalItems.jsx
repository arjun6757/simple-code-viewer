import usePinnedRepos from "../hooks/usePinnedRepos";
import { Loader } from "../Spinner/Loader";
import ModalItem from "./ModalItem";
import { useEffect } from "react";

export default function ModalItems({ query, selectedIndex, length, repoPress }) {
  const { pinnedRepos, loading, error } = usePinnedRepos();

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const filterItems =
    pinnedRepos?.filter((item) =>
      item.node.name.toLowerCase().includes(query.toLowerCase())
    ) || [];

  const spinner = (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Loader size="md" />
    </div>
  );
  
  useEffect(() => {
    length(filterItems.length)
  }, [filterItems.length])

  return loading ? spinner : (
    <ul className="flex flex-col gap-2 w-full">
      {filterItems.map((item, index) => (
        <li
          key={item.node.name}
          tabIndex={0}
          className={`${selectedIndex === index ? "selected": ""} px-4 py-2 hover:bg-blue-500 hover:dark:bg-green-500 hover:text-gray-100 hover:dark:text-gray-100 rounded-md cursor-pointer`}
        >
          <ModalItem itemPress={repoPress} data={item.node.name} url={item.node.url} />
        </li>
      ))}
    </ul>
  );
}
