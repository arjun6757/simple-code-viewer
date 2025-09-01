"use client";

import React from "react";
import { createContext, useContext, useEffect, useState } from "react";

// this will be shown if wrapper is not used
export const ThemeContext = createContext({
    isDark: false,
    toggleTheme: () => {},
});

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const valid = ['dark', 'light'];
        const localTheme = localStorage.getItem("scv-theme") || 'light';
        if(valid.includes(localTheme)) setTheme(localTheme);
        // otherwise default is light
    }, []);

    const toggleTheme = () => setTheme(p => p === "light" ? "dark" : "light");

    useEffect(() => {
        // gets a reference to the root node
        const html = document.documentElement;

        if (theme==="dark") {
            html.classList.add("dark");
            html.style.colorScheme = "dark";
        } else {
            html.classList.remove("dark");
            html.style.colorScheme = "light";
        }

        localStorage.setItem("scv-theme", theme);

    }, [theme]);

    return (
        <ThemeContext.Provider value={{ isDark: theme === 'dark' ? true : false, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
