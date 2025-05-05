import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage.js";

export const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
    const preferredColorScheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
    ).matches
        ? true
        : false;

    const [isDark, setIsDark] = useLocalStorage(
        "simple-code-viewer-wants-dark-theme",
        preferredColorScheme,
    );

    const toggleTheme = () => setIsDark((prev) => !prev);

    useEffect(() => {
        // gets a reference to the root node
        const html = document.documentElement;
        if (isDark) {
            html.classList.add("dark");
            html.style.colorScheme = "dark";
        } else {
            html.classList.remove("dark");
            html.style.colorScheme = "light";
        }
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
