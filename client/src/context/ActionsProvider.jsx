import { useLocalStorage } from "@/hooks/useLocalStorage.js";
import { useState } from "react";
import { ActionsContext } from "./ActionsContext";

export default function ActionsProvider({ children }) {

    const [isExplorerOpen, setIsExplorerOpen] = useState(true);
    const [isLive, setIsLive] = useState(false);
    const [isTogglebarEnabled, setIsTogglebarEnabled] = useLocalStorage('simple-code-viewer-wants-togglebar', true);
    const [mode, setMode] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleExplorer = () => {
        setIsExplorerOpen(prev => !prev);
    }

    const toggleIsLive = () => setIsLive(prev => !prev);

    const toggleTogglebar = () => setIsTogglebarEnabled(prev => !prev)

    const switchTo = (mode) => {
        if (typeof (mode) !== "string") {
            console.log('cannot switch to type: ' + typeof (mode))
            return;
        }
        toggleModal();
        setMode(mode);
    }

    const toggleModal = () => {
        setModalOpen(prev => !prev);
    }

    return (
        <ActionsContext.Provider
            value={{
                isExplorerOpen,
                toggleExplorer,
                isLive,
                toggleIsLive,
                isTogglebarEnabled,
                toggleTogglebar,
                mode,
                switchTo,
                toggleModal,
                isModalOpen,
                setModalOpen
            }}
        >
            {children}
        </ActionsContext.Provider>
    )
}
