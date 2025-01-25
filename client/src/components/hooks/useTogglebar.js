import { useLocalStorage } from "../../useLocalStorage";

export default function useTogglebar() {

    const [isTogglebarEnabled, setIsTogglebarEnabled] = useLocalStorage('simple-code-viewer-wants-togglebar', false);

    return {
        isTogglebarEnabled,
        toggleTogglebar: () => setIsTogglebarEnabled(prev=> !prev)
    }
}
