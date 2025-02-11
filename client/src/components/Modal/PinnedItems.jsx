import usePinnedRepos from "../hooks/usePinnedRepos";
import { Loader } from "../Spinner/Loader";
import { useEffect } from "react";
import { useRepo } from "../../store/repo";

export default function ModalItems({
  query,
  selectedIndex,
  length,
  repoPress,
  items,
}) {
  // const { pinnedRepos, loading, error } = usePinnedRepos();
  const { loadingPinned: loading, errorPinned: error, repos: pinnedRepos, fetchPinned, fetchSelected } = useRepo();

  useEffect(() => {
    fetchPinned();
  }, [])

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const filterItems = pinnedRepos?.filter((item) =>
      item.node.name.toLowerCase().includes(query.toLowerCase())
    ) || [];

  const spinner = (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Loader size="md" />
    </div>
  );

  useEffect(() => {
    length(filterItems.length);
    items(filterItems);
  }, [filterItems.length]);

  return loading ? (
    spinner
  ) : (
    <ul className="flex flex-col gap-2 w-full">
      {filterItems.map((item, index) => (
        <li
          key={item.node.name}
          tabIndex={-1}
          className={`${
            selectedIndex === index ? "selected" : ""
          } hover:bg-blue-500 hover:dark:bg-green-500 hover:text-gray-100 hover:dark:text-gray-100 rounded-md cursor-pointer`}
        >
          <a
            onKeyDown={(k) => {
              if (k.key === "Enter") {
                // repoPress(item.node.name);
                fetchSelected(item.node.name);
              }
              return;
            }}
            onClick={(c) => {
              c.preventDefault();
              // repoPress(item.node.name);
              fetchSelected(item.node.name);
            }}
            tabIndex={0}
            className="block px-4 py-2 w-full h-full"
          >
            {item.node.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

{
  /* <ModalItem
  itemPress={repoPress}
  data={item.node.name}
  url={item.node.url}
/> */
}
