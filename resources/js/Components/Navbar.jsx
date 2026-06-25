import Dropdown from '@/Components/Dropdown';
import ThemeToggle from '@/Components/ThemeToggle';
import { usePage } from '@inertiajs/react';

export default function Navbar({ onMenuClick }) {
    const user = usePage().props.auth.user;
    const initials = user.name
        ?.split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/20">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="btn-secondary px-3 lg:hidden"
                        aria-label="Ouvrir le menu"
                    >
                        <span className="flex h-4 w-4 flex-col justify-center gap-1">
                            <span className="h-0.5 rounded-full bg-current" />
                            <span className="h-0.5 rounded-full bg-current" />
                            <span className="h-0.5 rounded-full bg-current" />
                        </span>
                    </button>
                    <div>
                        <p className="text-sm font-semibold text-slate-950 dark:text-white">Digitalisation des activites de recherche</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Pilotage laboratoire et IA</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button
                                type="button"
                                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm shadow-sm shadow-slate-200/60 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20 dark:hover:bg-slate-800"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-teal-50 text-xs font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-200">
                                    {initials || 'U'}
                                </span>
                                <span className="hidden min-w-0 sm:block">
                                    <span className="block truncate font-semibold text-slate-900 dark:text-white">{user.name}</span>
                                    <span className="block text-xs text-slate-500 dark:text-slate-400">{user.role}</span>
                                </span>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="right">
                            <Dropdown.Link href={route('profile.edit')}>Profil</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button">
                                Deconnexion
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}
