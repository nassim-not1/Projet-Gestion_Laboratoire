import { useEffect, useState } from 'react';

function currentTheme() {
    if (typeof window === 'undefined') {
        return 'light';
    }

    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
        return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
}

export default function ThemeToggle({ className = '' }) {
    const [theme, setTheme] = useState(currentTheme);
    const dark = theme === 'dark';

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    return (
        <button
            type="button"
            onClick={() => setTheme(dark ? 'light' : 'dark')}
            className={`btn-secondary w-10 px-0 ${className}`}
            aria-label={dark ? 'Activer le mode clair' : 'Activer le mode sombre'}
            title={dark ? 'Mode clair' : 'Mode sombre'}
        >
            {dark ? <SunIcon /> : <MoonIcon />}
        </button>
    );
}

function SunIcon() {
    return (
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.99 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 20.99 12.79Z" />
        </svg>
    );
}
