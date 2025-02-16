import { useEffect } from "react";
import { createContext } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage.js";

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {

    const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false;

    const [isDark, setIsDark] = useLocalStorage("simple-code-viewer-wants-dark-theme", preferredColorScheme);

    const toggleTheme = () => setIsDark(prev => !prev);

    useEffect(() => {
        const html = document.documentElement; //gets a reference to the root node
        if (isDark) {
            html.classList.add("dark");
            html.style.colorScheme = "dark"; // one line fix for scrollbar issue
        } else {
            html.classList.remove("dark");
            html.style.colorScheme = "light";
        }
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}