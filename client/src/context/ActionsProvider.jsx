import { useLocalStorage } from "../../useLocalStorage";
import { useState } from "react"
import { ActionsContext } from "./ActionsContext"

export default function ActionsProvider({ children }) {

    const [isExplorerOpen, setIsExplorerOpen] = useState(true);

    const toggleExplorer = () => setIsExplorerOpen((prev) => !prev);

    const [isLive, setIsLive] = useState(false);

    const toggleIsLive = () => setIsLive(prev => !prev);

    const [isDark, setIsDark] = useLocalStorage("simple-code-viewer-wants-dark-theme", true);

    const toggleTheme = () => setIsDark(prev => !prev);


    const [isTogglebarEnabled, setIsTogglebarEnabled] = useLocalStorage('simple-code-viewer-wants-togglebar', true);

    const toggleTogglebar = () => setIsTogglebarEnabled(prev => !prev)

    const [mode, setMode] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);

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
                isDark,
                toggleTheme,
                isTogglebarEnabled,
                toggleTogglebar,
                mode,
                switchTo,
                toggleModal,
                isModalOpen
            }}
        >
            {children}
        </ActionsContext.Provider>
    )
}
