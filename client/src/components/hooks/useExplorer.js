import { useState } from "react";

export default function useExplorer() {
    const [showExplorer, setShowExplorer] = useState(true);

    return {
        isOpen: showExplorer,
        openExplorer: () => setShowExplorer(true),
        closeExplorer: () => setShowExplorer(false),
        toggleExplorer: setShowExplorer(prev => !prev)
    }
}