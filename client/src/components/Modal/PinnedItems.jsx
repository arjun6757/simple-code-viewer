import { Loader } from "../Spinner/Loader";
import { useEffect } from "react";
import { useRepo } from "../../store/repo";
import { ModalContext } from "../../context/ModalContext";
import { useContext } from "react";

export default function ModalItems({
  query,
  selectedIndex,
  length,
  items,
}) {

  const { loadingPinned: loading,
    errorPinned: error,
    repos: pinnedRepos,
    fetchPinned,
    fetchSelected,
    owner } = useRepo();
  const { toggleModal } = useContext(ModalContext);

  if (error) {
    return <p>Error: {error}</p>;
  }

  useEffect(() => {
    fetchPinned();
  }, [])


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
          className={`${selectedIndex === index ? "selected" : ""
            } hover:bg-blue-500 hover:dark:bg-green-500 hover:text-gray-100 hover:dark:text-gray-100 rounded-md cursor-pointer`}
        >
          <a
          onKeyDown={(k) => {
            if(k.key==='Enter'){
              fetchSelected({ user: owner, selected: item.node.name })
              toggleModal();
            }
          }}
            onClick={(c) => {
              c.preventDefault();
              fetchSelected({ user: owner, selected: item.node.name });
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
  );
}
