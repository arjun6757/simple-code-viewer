import React, { useState } from 'react';
import { Loader } from "../Spinner/Loader";
import { useEffect } from "react";
import { useRepo } from '../../store/repo';
import { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';

export default function SearchItems({
    query,
    selectedIndex,
    length,
    items,
}) {
    const { fetchSelected, error } = useRepo();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const { toggleModal } = useContext(ModalContext);

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
        }, 700);

        return () => clearTimeout(delay);

    }, [query])

    if (error) {
        return <p>Error: {error}</p>;
    }

    if(query.trim()==='') {
        return <p>Type username or reponame to get started.</p>
    }

    const spinner = (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <Loader size="md" />
        </div>
    );

    useEffect(() => {
        length(files.length);
        items(files);
    }, [files]);

    return loading ? (
        spinner
    ) : (
        <ul className="flex flex-col gap-2 w-full">
            {files.map((item, index) => (
                <li
                    key={index}
                    tabIndex={-1}
                    className={`${selectedIndex === index ? "selected" : ""
                        } hover:bg-blue-500 hover:dark:bg-green-500 hover:text-gray-100 hover:dark:text-gray-100 rounded-md cursor-pointer`}
                >
                    <a
                        // onKeyDown={(k) => {
                        //     if (k.key === "Enter") {
                        //         // k.preventDefault();
                        //         // repoPress(item.name);
                        //         fetchSelected({ user: item.owner, selected: item.name });
                        //         toggleModal();
                        //     }
                        //     return;
                        // }}
                        onClick={(c) => {
                            c.preventDefault();
                            // repoPress(item.name);
                            fetchSelected({ user: item.owner, selected: item.name });
                            toggleModal();
                        }}
                        tabIndex={0}
                        className="block px-4 py-2 w-full h-full"
                    >
                        {item.full_name}
                    </a>
                </li>
            ))}
        </ul>
    );
}