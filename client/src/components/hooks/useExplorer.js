import { useState } from "react";

export default function useExplorer() {
    const [isExplorerOpen, setIsExplorerOpen] = useState(true);

    return {
        isExplorerOpen,
        openExplorer: () => setIsExplorerOpen(true),
        closeExplorer: () => setIsExplorerOpen(false),
        toggleExplorer: () => setIsExplorerOpen((prev) => !prev),
    };
}
