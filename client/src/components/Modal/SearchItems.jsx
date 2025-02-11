import React, { useState } from 'react';
import { Loader } from "../Spinner/Loader";
import { useEffect } from "react";

export default function SearchItems({
    query,
    selectedIndex,
    length,
    repoPress,
    items,
}) {

    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const search = async (trimmedQuery) => {
            setLoading(true);
            try {
                const response = await fetch(`/api/search?q=${trimmedQuery}`)
                const result = await response.json();
                setFiles(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }


        const delay = setTimeout(() => {
            const trimmedQuery = query.trim()
            if (!trimmedQuery) return;
            search(trimmedQuery);
        }, 500);

        return () => clearTimeout(delay);

    }, [query])

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    const filterItems =
        files?.filter((file) =>
            file.name.toLowerCase().includes(query.toLowerCase())
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
                    key={index}
                    tabIndex={-1}
                    className={`${selectedIndex === index ? "selected" : ""
                        } hover:bg-blue-500 hover:dark:bg-green-500 hover:text-gray-100 hover:dark:text-gray-100 rounded-md cursor-pointer`}
                >
                    <a
                        onKeyDown={(k) => {
                            if (k.key === "Enter") {
                                repoPress(item.name);
                            }
                            return;
                        }}
                        onClick={(c) => {
                            c.preventDefault();
                            repoPress(item.name);
                        }}
                        tabIndex={0}
                        className="block px-4 py-2 w-full h-full"
                    >
                        {item.name}
                    </a>
                </li>
            ))}
        </ul>
    );
}