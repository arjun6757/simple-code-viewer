import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : initialValue;
        } catch (error) {
            console.error('Error getting data from local storage', error);
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving data to local storage', error);
        }
    }, [key, value])

    return [value, setValue];
}