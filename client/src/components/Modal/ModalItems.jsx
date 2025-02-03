import usePinnedRepos from "../hooks/usePinnedRepos";
import ModalItem from "./ModalItem";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
export default function ModalItems({ query }) {
  const { pinnedRepos, loading, error } = usePinnedRepos();
  // const [filteredItems, setFilteredItems] = useState([]);

  // useEffect(() => {
  //   if (pinnedRepos) {
  //     setFilteredItems(
  //       pinnedRepos.filter((item) =>
  //         item.node.name.toLowerCase().includes(query.toLowerCase()),
  //       ),
  //     );
  //   }
  // }, [query]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const loader = (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Spinner />
    </div>
  );

  return loading ? (
    loader
  ) : (
    <ul className="flex flex-col gap-2 w-full">
      {pinnedRepos &&
        pinnedRepos
          .filter((item) =>
            item.node.name.toLowerCase().includes(query.toLowerCase()),
          )
          .map((item, index) => (
            <ModalItem
              index={index}
              data={item.node.name}
              url={item.node.url}
              key={index}
              // instead of pinnedRepos.length i need to use something like filteredItems.length for
              // getting filteredArray length value as i type
              itemsLength={pinnedRepos.length}
            />
          ))}
    </ul>
  );
}
