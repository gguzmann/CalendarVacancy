'use client';
import { useEffect, useState } from 'react';

export const ToogleButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        const initialDarkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

        setDarkMode(initialDarkMode);
        root.classList.toggle('dark', initialDarkMode);
    }, []);

    const toggleDarkMode = () => {
        const root = document.documentElement;
        if (darkMode) {
            setDarkMode(false);
            root.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            setDarkMode(true);
            root.classList.add('dark');
            localStorage.theme = 'dark';
        }
    };

    return (
        <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
            {darkMode ? '☀️' : '🌙'}
        </button>
    );
};
