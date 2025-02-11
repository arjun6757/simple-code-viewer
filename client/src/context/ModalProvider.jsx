import { useState } from "react"
import { ModalContext } from "./ModalContext";

export default function ModalProvider({ children }) {
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
        // if(isModalOpen) {
            document.body.focus(); // set focus to body again
        // }
        setModalOpen(prev => !prev);
    }

    return (
        <ModalContext.Provider value={{ mode, switchTo, isModalOpen, toggleModal }}>
            {children}
        </ModalContext.Provider>
    )
}