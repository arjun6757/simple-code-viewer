import { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { Spinner } from "flowbite-react";
import ModalItems from "./Modal/PinnedItems";
import { useRepo } from "../store/repo";

export default function PinnedRepos() {
  // const [pinnedRepos, setPinnedRepos] = useState(null);
  // const { data, loading, error } = useFetch(
  //   "/api/pinned"
  // );

  const { repos: pinnedRepos, errorPinned: error, loadingPinned } = useRepo();

  // useEffect(() => {
  //   if (data) {
  //     //when data exist set it to the pinnedrepos state
  //     const edges = data.data.user.pinnedItems.edges;
  //     setPinnedRepos(edges);
  //   }
  // }, [data]);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const spinner = (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Spinner />
    </div>
  );

  return loading ? spinner : <ModalItems items={pinnedRepos} />;
}
