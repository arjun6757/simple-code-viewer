import { useEffect, useState } from "react";

export default function useModalItemsLength(items) {
    const [length, setLength] = useState(0);

    useEffect(() => {
        setLength(items?.length);
    }, [items])

    return {
        length
    }
}