import { useEffect } from "react";
import { Loader } from "@/components/Loader";
import { useRepo } from "@/store/repo";
import { useUI } from "@/store/ui.store";

export default function PinnedItems({ query, selectedIndex, length, items, emptyTxt }) {
  const {
    loadingPinned: loading,
    errorPinned: error,
    repos: pinnedRepos,
    fetchPinned,
    fetchSelected,
    owner,
  } = useRepo();

  const { toggleModal } = useUI();

  const errText = <p>Error: {error}</p>;

  useEffect(() => {
    fetchPinned();
  }, [owner]);

  const filterItems = pinnedRepos?.filter((item) =>
      item.node.name.toLowerCase().includes(query.toLowerCase()),
    ) || [];

  const spinner = <Loader className="w-full h-full" center="xy" size="md" />;

  useEffect(() => {
    length(filterItems.length);
    items(filterItems);
  }, [filterItems.length]);


  const ulistItems = (
    <>
      <ul className="flex flex-col gap-2 w-full">
        {filterItems.length === 0
          ? emptyTxt
          : filterItems.map((item, index) => (
              <li
                key={item.node.name}
                tabIndex={-1}
                className={`${
                  selectedIndex === index ? "selected" : ""
                } hover:bg-blue-500 hover:dark:bg-[#018749] hover:text-gray-100 hover:dark:text-gray-200 rounded-md cursor-pointer`}
              >
                <a
                  onKeyDown={(k) => {
                    if (k.key === "Enter") {
                      // TODO: clear or improve this part as it doesn't seems to work
                      console.log('enter detected');
                      fetchSelected(owner, item.node.name);
                      toggleModal();
                    }
                  }}
                  onClick={(c) => {
                    c.preventDefault();
                    fetchSelected(owner, item.node.name);
                    toggleModal();
                  }}
                  tabIndex={0}
                  className="block px-4 py-2 w-full h-full"
                >
                  {item.node.name}
                </a>
              </li>
            ))}
      </ul>
    </>
  );

  return loading ? spinner : ulistItems;
}
