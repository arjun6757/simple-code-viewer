import { useState } from "react";

export default function useFrame() {
    const [isLive, setIsLive] = useState(false);

    return {
        isLive,
        toggleIsLive: () => setIsLive((prev)=> !prev)
    }
}