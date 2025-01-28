import { useEffect, useState } from "react";

export default function useSearchResult() {
    const [searchResult, setSearchResult] = useState();
    const [query, setQuery] = useState("");
    const [mode, setMode] = useState({
        activeMode: "",
        searchAll: { enabled: false, data: [] },
        searchPinned: { enabled: false, data: [] },
        searchSettings: { enabled: false, data: [] },
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        //whenever mode sets any mode as active this will get the mode and then fetches the data accordingly and sets the searchResult according
        function fetchSearchAll() {
            // here i want to search by any github repo name
        }

        function fetchSearchPinned() {
            // here i want to search between pinned repos this may get changed to userRepos instead of pinned
        }

        function fetchSearchSettings() {
            // here i want to search for anything that i can do by just clicking or usign hooks that are easy to call
        }

        const { searchAll, searchPinned, searchSettings } = mode;
        if (searchAll.enabled) fetchSearchAll();
        if (searchPinned.enabled) fetchSearchPinned();
        if (searchSettings.enabled) fetchSearchSettings();
    }, [mode]);

    const switchMode = (specifiedKey) => {
        setMode((prev) => {
            const updatedMode = { ...prev };

            Object.keys(updatedMode).forEach((key) => {
                if (updatedMode[key].enabled) {
                    updatedMode[key].enabled = false;
                }
            });

            updatedMode[specifiedKey].enabled = true;
            updatedMode.activeMode = specifiedKey;
            return updatedMode;
        });
    };

    const setData = (specifiedKey, data) => {
        setMode((prev) => ({
            ...prev,
            [specifiedKey]: {
                ...prev[specifiedKey], //keep other value same for that key
                data: [...data], //keep previous value intact and copy new data
            },
        }));
    };

    return {
        isLoading,
        setMode,
        query,
        setQuery,
        searchResult,
    };
}
