import { useEffect, useState } from "react";
import useFetch from "./useFetch";

export default function usePinnedRepos() {
    const [pinnedRepos, setPinnedRepos] = useState(null);
    const { data, loading, error } = useFetch(
        "http://localhost:3000/api/code/repo/usr/pinned",
    );

    useEffect(() => {
        if (data) {
            //when data exist set it to the pinnedrepos state
            const edges = data.data.user.pinnedItems.edges;
            setPinnedRepos(edges);
        }
    }, [data]);

    return {
        pinnedRepos,
        setPinnedRepos,
        loading,
        error,
    };
}
