import { useState, useEffect } from "react";
import { Loader } from "@/app/components/Loader";
import { useRepo } from "@/store/repo";
import { useUI } from "@/store/ui.store";
import toast from "react-hot-toast";

export default function SearchItems({ query, selectedIndex, length, items, emptyTxt }) {
    const { fetchSelected } = useRepo();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const { toggleModal } = useUI();

    useEffect(() => {
        const search = async (trimmedQuery) => {
            setLoading(true);
            try {
                const response = await fetch(`/api/search?query=${trimmedQuery}`);
                if(!response.ok) {
                    throw new Error("Error while fetching query")
                }
                const result = await response.json();
                setFiles(result.data);
            } catch (error) {
                toast.error(error.message || "Failed to fetch SearchItems!");
            } finally {
                setLoading(false);
            }
        };

        const delay = setTimeout(() => {
            const trimmedQuery = query.trim();
            if (!trimmedQuery) return;
            search(trimmedQuery);
        }, 700);

        return () => clearTimeout(delay);
    }, [query]);

    const spinner = <Loader className="w-full h-full" center="xy" size="md" />;

    useEffect(() => {
        length(files.length);
        items(files);
    }, [length, items, files]);


    const searchULItems = (
        <>
            {files.length === 0 && emptyTxt}
            <ul className="flex flex-col gap-2 w-full">
            {files.map((item, index) => (
                    <li
                        key={index}
                        tabIndex={-1}
                        className={`${
                            selectedIndex === index ? "selected" : ""
                        } hover:bg-blue-500 hover:dark:bg-[#018749] hover:text-gray-100 hover:dark:text-gray-100 rounded-md cursor-pointer`}
                    >
                        <a
                            onKeyDown={(k) => {
                                if (k.key === "Enter") {
                                    fetchSelected(item.owner, item.name);
                                    toggleModal();
                                }
                            }}
                            onClick={(c) => {
                                c.preventDefault();
                                fetchSelected(item.owner, item.name);
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
        </>
    );

    return loading ? spinner : searchULItems;
}
