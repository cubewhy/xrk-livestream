import {useEffect, useState} from "react";

export function useLocalStorage(key: string) {
    const [value, setValue] = useState(() => {
        // Get the initial value from localStorage or set it to null if not found
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    });

    useEffect(() => {
        if (value !== null) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.removeItem(key);
        }

        window.dispatchEvent(new StorageEvent("storage", { key, newValue: value ? JSON.stringify(value) : null }));
    }, [value, key]);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key) {
                setValue(event.newValue ? JSON.parse(event.newValue) : null);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [key]);

    return [value, setValue];
}